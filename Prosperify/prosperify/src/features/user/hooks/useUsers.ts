import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import useAuthStore from '@/features/auth/store/AuthStore';

// ════════════════════════════════════════════════════════════════
// 📋 QUERIES (Récupération de données)
// ════════════════════════════════════════════════════════════════

/**
 * ✅ Liste tous les utilisateurs avec filtres et pagination
 * @example
 * const { data: users, isLoading } = useUsers({ limit: 50, order: 'desc' })
 */
export function useUsers(params?: {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
  roleId?: string;
}) {
  const { limit, order, page, roleId } = params ?? {};

  return useQuery({
    queryKey: ['users', 'list', limit ?? null, order ?? null, page ?? null, roleId ?? null],
    queryFn: async () => {
      const res = await prosperify.users.postV1UsersList({
        ...(limit !== undefined ? { limit } : {}),
        ...(order ? { order } : {}),
        ...(page !== undefined ? { page } : {}),
        ...(roleId ? { roleId } : {}),
      });
      return {
        users: res?.data?.users || [],
        total: res?.data?.total || 0,
        eventMessage: res?.eventMessage,
      };
    },
    staleTime: 5 * 60 * 1000, // Cache 5 minutes
  });
}

/**
 * ✅ Récupère un utilisateur spécifique par ID
 * @example
 * const { data: user } = useUser('user_123')
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const res = await prosperify.users.getV1Users(id);
      return {
        user: res?.data?.user || null,
        eventMessage: res?.eventMessage,
      };
    },
    enabled: !!id, // Ne lance la requête que si l'ID existe
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
    queryKey: ['users', id, 'scopes'],
    queryFn: async () => {
      const res = await prosperify.users.getV1UsersScopes(id);
      return {
        scopes: res?.data?.scopes || [],
        eventMessage: res?.eventMessage,
      };
    },
    enabled: !!id,
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
    mutationFn: async (payload: {
      email: string;
      name: string;
      password: string;
    }) => {
      const res = await prosperify.users.postV1UsersNew(payload);
      return {
        user: res?.data?.user,
        eventMessage: res?.eventMessage,
      };
    },
    onSuccess: () => {
      // ✅ Invalide le cache de la liste des utilisateurs
      queryClient.invalidateQueries({ queryKey: ['users'] });
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
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        email?: string;
        name?: string;
        password?: string;
        preferences?: {
          language?: string;
          theme?: 'light' | 'dark' | 'auto';
        };
        verified?: boolean;
      };
    }) => {
      const res = await prosperify.users.putV1Users(id, data);
      return {
        success: res?.data?.success || false,
        eventMessage: res?.eventMessage,
      };
    },
    onSuccess: (_, variables) => {
      // ✅ Invalide le cache de l'utilisateur modifié + la liste
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
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
      const res = await prosperify.users.deleteV1Users(id);
      return {
        success: res?.data?.success || false,
        eventMessage: res?.eventMessage,
      };
    },
    onSuccess: () => {
      // ✅ Invalide toutes les queries utilisateurs
      queryClient.invalidateQueries({ queryKey: ['users'] });
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
    mutationFn: async ({
      userId,
      roleId,
    }: {
      userId: string;
      roleId: string;
    }) => {
      const res = await prosperify.users.postV1UsersRoles(userId, { roleId });
      return {
        success: res?.data?.success || false,
        eventMessage: res?.eventMessage,
      };
    },
    onSuccess: (_, variables) => {
      // ✅ Invalide le cache de l'utilisateur + ses scopes
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
      queryClient.invalidateQueries({
        queryKey: ['users', variables.userId, 'scopes'],
      });
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
    mutationFn: async ({
      userId,
      roleId,
    }: {
      userId: string;
      roleId: string;
    }) => {
      const res = await prosperify.users.deleteV1UsersRoles(userId, roleId);
      return {
        success: res?.data?.success || false,
        eventMessage: res?.eventMessage,
      };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
      queryClient.invalidateQueries({
        queryKey: ['users', variables.userId, 'scopes'],
      });
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
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await prosperify.users.postV1UsersLogin(credentials);
      return {
        user: res?.data?.user,
        accessToken: res?.data?.accessToken,
        refreshToken: res?.data?.refreshToken,
        eventMessage: res?.eventMessage,
      };
    },
    onSuccess: (data) => {
      if (data?.user && data?.accessToken) {
        setAuthData(data.user, data.accessToken, data.refreshToken ?? null);
      }

      // ✅ Invalide les queries dépendantes de l'utilisateur connecté
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });

      console.log('✅ Login successful:', data.eventMessage);
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

    // ✅ Vide tout le cache React Query
    queryClient.clear();

    console.log('✅ Logged out successfully');
  };
}