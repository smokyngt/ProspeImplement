import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import useAuthStore from '@/features/auth/store/AuthStore';
import type {
  CreateUserPayload,
  RoleMutationPayload,
  UpdateUserPayload,
  UserSummary,
  UsersListParams,
} from '@/features/user/types';

// @deprecated Préférez les types de '@/features/user/types'.
export type { UserSummary, UsersListParams } from '@/features/user/types';

const userKeys = {
  all: ['users'] as const,
  list: (params: UsersListParams = {}) => ['users', 'list', params] as const,
  detail: (id: string) => ['users', id] as const,
  scopes: (id: string) => ['users', id, 'scopes'] as const,
};

// ════════════════════════════════════════════════════════════════
// 📋 QUERIES (Récupération de données)
// ════════════════════════════════════════════════════════════════

/**
 * ✅ Liste tous les utilisateurs avec filtres et pagination
 * @example
 * const { data: users, isLoading } = useUsers({ limit: 50, order: 'desc' })
 */
export function useUsers(params: UsersListParams = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const response = await prosperify.users.postV1UsersList(params); // ✅ updated: direct SDK call
      return {
        users: (response.data?.users ?? []) as UserSummary[],
        total: response.data?.total ?? response.data?.users?.length ?? 0,
        eventMessage: response.eventMessage,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * ✅ Récupère un utilisateur spécifique par ID
 * @example
 * const { data: user } = useUser('user_123')
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await prosperify.users.getV1Users(id); // ✅ updated: direct SDK call
      return (response.data?.user ?? null) as UserSummary | null;
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * ✅ Récupère les permissions (scopes) d'un utilisateur
 * @example
 * const { data: scopes } = useUserScopes('user_123')
 */
export function useUserScopes(id: string) {
  return useQuery({
    queryKey: userKeys.scopes(id),
    queryFn: async () => {
      const response = await prosperify.users.getV1UsersScopes(id); // ✅ updated: direct SDK call
      return (response.data?.scopes ?? []) as string[];
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

// ════════════════════════════════════════════════════════════════
// 🔧 MUTATIONS (Création, modification, suppression)
// ════════════════════════════════════════════════════════════════

/**
 * ✅ Créer un nouvel utilisateur
 * @example
 * const createUser = useCreateUser()
 * await createUser.mutateAsync({ email: 'test@test.com', name: 'Test', password: '123456' })
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserPayload) =>
      prosperify.users.postV1UsersNew(payload), // ✅ updated: direct SDK call
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error: any) => {
      console.error('[useCreateUser]', error?.message || error);
    },
  });
}

/**
 * ✅ Modifier un utilisateur existant
 * @example
 * const updateUser = useUpdateUser()
 * await updateUser.mutateAsync({ id: 'user_123', data: { name: 'New Name' } })
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserPayload }) =>
      prosperify.users.putV1Users(id, data), // ✅ updated: direct SDK call
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error: any) => {
      console.error('[useUpdateUser]', error?.message || error);
    },
  });
}

/**
 * ✅ Supprimer un utilisateur
 * @example
 * const deleteUser = useDeleteUser()
 * await deleteUser.mutateAsync('user_123')
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await prosperify.users.deleteV1Users(id); // ✅ updated: direct SDK call
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error: any) => {
      console.error('[useDeleteUser]', error?.message || error);
    },
  });
}

/**
 * ✅ Ajouter un rôle à un utilisateur
 * @example
 * const addRole = useAddUserRole()
 * await addRole.mutateAsync({ userId: 'user_123', roleId: 'role_456' })
 */
export function useAddUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RoleMutationPayload) =>
      prosperify.users.postV1UsersRoles(payload.userId, { roleId: payload.roleId }), // ✅ updated: direct SDK call
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.scopes(variables.userId) });
    },
    onError: (error: any) => {
      console.error('[useAddUserRole]', error?.message || error);
    },
  });
}

/**
 * ✅ Retirer un rôle à un utilisateur
 * @example
 * const removeRole = useRemoveUserRole()
 * await removeRole.mutateAsync({ userId: 'user_123', roleId: 'role_456' })
 */
export function useRemoveUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RoleMutationPayload) =>
      prosperify.users.deleteV1UsersRoles(payload.userId, payload.roleId), // ✅ updated: direct SDK call
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.scopes(variables.userId) });
    },
    onError: (error: any) => {
      console.error('[useRemoveUserRole]', error?.message || error);
    },
  });
}

// ════════════════════════════════════════════════════════════════
// 🔐 AUTHENTIFICATION
// ════════════════════════════════════════════════════════════════

/**
 * ✅ Connexion utilisateur (login)
 * @example
 * const login = useLogin()
 * const result = await login.mutateAsync({ email: 'test@test.com', password: '123456' })
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const setAuthData = useAuthStore((state) => state.setAuthData);

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      prosperify.users.postV1UsersLogin(credentials), // ✅ updated: direct SDK call
    onSuccess: (res) => {
      const user = (res as any)?.data?.user as UserSummary | undefined;
      const accessToken = (res as any)?.data?.accessToken as string | undefined;
      const refreshToken = (res as any)?.data?.refreshToken as string | undefined;
      const apiKey = (res as any)?.data?.apiKey as string | undefined;

      if (user && accessToken) {
        setAuthData(user, accessToken, refreshToken ?? null, apiKey ?? null);
      }

      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      queryClient.invalidateQueries({ queryKey: userKeys.all });

      console.log('✅ Login successful:', (res as any)?.eventMessage);
    },
    onError: (error: any) => {
      console.error('[useLogin]', error?.message || error);
    },
  });
}

/**
 * ✅ Déconnexion utilisateur (logout)
 * @example
 * const logout = useLogout()
 * logout()
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const logout = useAuthStore.getState().logout;

  return async () => {
    await logout();

    queryClient.clear();

    console.log('✅ Logged out successfully');
  };
}
