import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import { useAuthStore } from '@/features/auth/store/AuthStore';

/* ════════════════════════════════════════════════════════════════
   Query Keys
════════════════════════════════════════════════════════════════ */
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: any = {}) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  scopes: (id: string) => [...userKeys.detail(id), 'scopes'] as const,
};

/* ════════════════════════════════════════════════════════════════
   Helpers internes
════════════════════════════════════════════════════════════════ */
function extract<T = any>(res: any, key: string): T | undefined {
  return (res?.data && (res.data as Record<string, any>)[key]) as T | undefined;
}

/* ════════════════════════════════════════════════════════════════
   Hook Principal
════════════════════════════════════════════════════════════════ */
export function useUsers() {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuthStore();

  return {
    /* ════════════════════════════════════════════════════════════════
       QUERIES
    ════════════════════════════════════════════════════════════════ */

    /** 🔍 Liste des utilisateurs */
    useList: (params?: { limit?: number; order?: 'asc' | 'desc'; page?: number; roleId?: string }) =>
      useQuery({
        queryKey: userKeys.list(params),
        queryFn: async () => {
          const res = await prosperify.users.postV1UsersList(params);
          const users = extract<any[]>(res, 'users') ?? [];
          return users;
        },
        staleTime: 5 * 60 * 1000,
      }),

    /** 🔍 Détail d’un utilisateur */
    useDetail: (id: string, enabled = true) =>
      useQuery({
        queryKey: userKeys.detail(id),
        queryFn: async () => {
          const res = await prosperify.users.getV1Users(id);
          const user = extract<any>(res, 'user');
          return user;
        },
        enabled: !!id && enabled,
        staleTime: 5 * 60 * 1000,
      }),

    /** 🔍 Scopes d’un utilisateur */
    useScopes: (id: string, enabled = true) =>
      useQuery({
        queryKey: userKeys.scopes(id),
        queryFn: async () => {
          const res = await prosperify.users.getV1UsersScopes(id);
          const scopes = extract<string[]>(res, 'scopes') ?? [];
          return scopes;
        },
        enabled: !!id && enabled,
        staleTime: 5 * 60 * 1000,
      }),

    /** 👤 Utilisateur courant (moi) */
    useMe: () =>
      useQuery({
        queryKey: ['auth', 'me'],
        queryFn: async () => {
          if (!currentUser?.id) throw new Error('No user ID in store');
          const res = await prosperify.users.getV1Users(currentUser.id);
          const user = extract<any>(res, 'user');
          return user;
        },
        enabled: !!currentUser?.id,
        staleTime: 5 * 60 * 1000,
      }),

    /* ════════════════════════════════════════════════════════════════
       MUTATIONS
    ════════════════════════════════════════════════════════════════ */

    /** ➕ Créer un utilisateur (admin UI) */
    useCreate: () =>
      useMutation({
        mutationFn: async (data: { email: string; name: string; password: string }) => {
          const res = await prosperify.users.postV1UsersNew(data);
          const user = extract<any>(res, 'user');
          return user;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
      }),

    /** ✏️ Mettre à jour un utilisateur */
    useUpdate: (id: string) =>
      useMutation({
        mutationFn: async (data: {
          email?: string;
          name?: string;
          password?: string;
          preferences?: { language?: string; theme?: 'light' | 'dark' | 'auto' };
          verified?: boolean;
        }) => {
          const res = await prosperify.users.putV1Users(id, data);
          const result = extract<{ success?: boolean }>(res, 'success');
          return result;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
          queryClient.invalidateQueries({ queryKey: userKeys.lists() });
          if (id === currentUser?.id) {
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
          }
        },
      }),

    /** ❌ Supprimer un utilisateur */
    useDelete: () =>
      useMutation({
        mutationFn: async (id: string) => {
          await prosperify.users.deleteV1Users(id);
          return id;
        },
        onSuccess: (deletedId) => {
          queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) });
          queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
      }),

    /** 🎭 Ajouter un rôle à un utilisateur */
    useAddRole: (userId: string) =>
      useMutation({
        mutationFn: async (roleId: string) => {
          await prosperify.users.postV1UsersRoles(userId, { roleId });
          return { userId, roleId };
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
          queryClient.invalidateQueries({ queryKey: userKeys.scopes(userId) });
        },
      }),

    /** 🚫 Retirer un rôle d’un utilisateur */
    useRemoveRole: (userId: string) =>
      useMutation({
        mutationFn: async (roleId: string) => {
          await prosperify.users.deleteV1UsersRoles(userId, roleId);
          return { userId, roleId };
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
          queryClient.invalidateQueries({ queryKey: userKeys.scopes(userId) });
        },
      }),
  };
}
