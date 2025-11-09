import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import{ useAuthStore }from '@/features/auth/store/AuthStore';
import type {
  CreateUserPayload,
  RoleMutationPayload,
  UpdateUserPayload,
  UserSummary,
  UsersListParams,
} from '@/features/user/types/types';

// @deprecated Préférez les types de '@/features/user/types'.
export type { UserSummary, UsersListParams } from '@/features/user/types/types';

const userKeys = {
  all: ['users'] as const,
  list: (params: UsersListParams = {}) => ['users', 'list', params] as const,
  detail: (id: string) => ['users', id] as const,
  scopes: (id: string) => ['users', id, 'scopes'] as const,
};

// -----------------------------------------------------------------------------
// 📋 QUERIES (Récupération de données)
// -----------------------------------------------------------------------------

/**
 * ✅ Liste tous les utilisateurs avec filtres et pagination
 */
export function useUsers(params: UsersListParams = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const res = await prosperify.users.postV1UsersList(params) as unknown as {
        data?: {
          users: UserSummary[];
          total?: number;
        };
      };
      return {
        users: res.data?.users ?? [],
        total: res.data?.total ?? res.data?.users?.length ?? 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * ✅ Récupère un utilisateur spécifique par ID
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const res = await prosperify.users.getV1Users(id) as {
        data?: { user?: UserSummary };
      };
      return res.data?.user ?? null;
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * ✅ Récupère les permissions (scopes) d'un utilisateur
 */
export function useUserScopes(id: string) {
  return useQuery({
    queryKey: userKeys.scopes(id),
    queryFn: async () => {
      const res = await prosperify.users.getV1UsersScopes(id) as {
        data?: { scopes?: string[] };
      };
      return res.data?.scopes ?? [];
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

// -----------------------------------------------------------------------------
// 🔧 MUTATIONS (Création, modification, suppression)
// -----------------------------------------------------------------------------

/**
 * ✅ Créer un nouvel utilisateur
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserPayload) => {
      const res = await prosperify.users.postV1UsersNew(payload) as {
        data?: { user?: UserSummary };
      };
      return res.data?.user ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (err) => console.error('[useCreateUser]', err),
  });
}

/**
 * ✅ Modifier un utilisateur existant
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserPayload }) => {
      const res = await prosperify.users.putV1Users(id, data) as {
        data?: { success?: boolean };
      };
      return res.data?.success ?? false;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(vars.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (err) => console.error('[useUpdateUser]', err),
  });
}

/**
 * ✅ Supprimer un utilisateur
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await prosperify.users.deleteV1Users(id) as {
        data?: { success?: boolean };
      };
      if (!res.data?.success) throw new Error('Delete failed');
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
    onError: (err) => console.error('[useDeleteUser]', err),
  });
}

/**
 * ✅ Ajouter un rôle à un utilisateur
 */
export function useAddUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RoleMutationPayload) => {
      const res = await prosperify.users.postV1UsersRoles(payload.userId, {
        roleId: payload.roleId,
      }) as { data?: { success?: boolean } };
      return res.data?.success ?? false;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(vars.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.scopes(vars.userId) });
    },
    onError: (err) => console.error('[useAddUserRole]', err),
  });
}

/**
 * ✅ Retirer un rôle à un utilisateur
 */
export function useRemoveUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RoleMutationPayload) => {
      const res = await prosperify.users.deleteV1UsersRoles(payload.userId, payload.roleId) as {
        data?: { success?: boolean };
      };
      return res.data?.success ?? false;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(vars.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.scopes(vars.userId) });
    },
    onError: (err) => console.error('[useRemoveUserRole]', err),
  });
}

// -----------------------------------------------------------------------------
// 🔐 AUTHENTIFICATION
// -----------------------------------------------------------------------------

/**
 * ✅ Connexion utilisateur (login)
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const setAuthData = useAuthStore((s) => s.setAuthData);

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await prosperify.users.postV1UsersLogin(credentials) as unknown as {
        data?: {
          accessToken: string;
          refreshToken?: string;
          user?: UserSummary;
          apiKey?: string;
        };
      };
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.user && data.accessToken) {
        setAuthData(
          data.user,
          data.accessToken,
          data.refreshToken ?? null,
          data.apiKey ?? null
        );
      }
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (err) => console.error('[useLogin]', err),
  });
}

/**
 * ✅ Déconnexion utilisateur (logout)
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const logout = useAuthStore.getState().logout;

  return async () => {
    await logout();
    queryClient.clear();
  };
}
