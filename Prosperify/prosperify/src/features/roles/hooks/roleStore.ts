import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';

export type RoleScope = 
  | 'owner' 
  | 'organization' 
  | 'assistants' 
  | 'roles' 
  | 'members' 
  | 'logs' 
  | 'apiKeys' 
  | 'invitations';

export type AssistantScope = 'files' | 'messages';

export interface Role {
  id: string;
  name: string;
  scopes?: RoleScope[];
  assistants?: Array<{
    id: string;
    scopes: AssistantScope[];
  }>;
  organization: string;
  createdBy: string;
  createdAt: number;
  object: 'role';
}

interface FetchRolesParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
}

/**
 * Hook pour récupérer tous les rôles
 */
export function useRoles(params?: FetchRolesParams) {
  const { limit, order, page } = params ?? {};

  return useQuery({
    queryKey: ['roles', 'list', limit ?? null, order ?? null, page ?? null],
    queryFn: async () => {
      const res = await prosperify.roles.postV1RolesList({
        ...(limit !== undefined ? { limit } : {}),
        ...(order ? { order } : {}),
        ...(page !== undefined ? { page } : {}),
      });
      return (res?.data?.roles || []) as Role[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook pour récupérer un rôle par ID
 */
export function useRole(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['roles', id],
    queryFn: async () => {
      const res = await prosperify.roles.getV1Roles(id);
      return res?.data?.role as Role;
    },
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook pour créer un rôle
 */
export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      scopes,
      assistants,
    }: {
      name: string;
      scopes?: RoleScope[];
      assistants?: Array<{ id: string; scopes: AssistantScope[] }>;
    }) => {
      const res = await prosperify.roles.postV1RolesNew({
        name,
        scopes,
        assistants,
      });

      if (!res?.data?.role) {
        throw new Error('Invalid response from server');
      }

      return res.data.role as Role;
    },
    onSuccess: (newRole) => {
      // ✅ Invalider la liste des rôles pour forcer un refetch
      queryClient.invalidateQueries({ queryKey: ['roles'] });

      // ✅ Ajouter le nouveau rôle au cache
      queryClient.setQueryData<Role>(['roles', newRole.id], newRole);
    },
  });
}

/**
 * Hook pour mettre à jour un rôle
 */
export function useUpdateRole(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: {
      name?: string;
      scopes?: RoleScope[];
      assistants?: Array<{ id: string; scopes: AssistantScope[] }>;
    }) => {
      await prosperify.roles.putV1Roles(id, updates);
      return updates;
    },
    onMutate: async (updates) => {
      // ✅ Annuler les refetch en cours
      await queryClient.cancelQueries({ queryKey: ['roles', id] });

      // ✅ Sauvegarder l'état actuel
      const previousRole = queryClient.getQueryData<Role>(['roles', id]);

      // ✅ Update optimiste
      if (previousRole) {
        queryClient.setQueryData<Role>(['roles', id], {
          ...previousRole,
          ...updates,
        });
      }

      return { previousRole };
    },
    onError: (err, updates, context) => {
      // ✅ Rollback en cas d'erreur
      if (context?.previousRole) {
        queryClient.setQueryData(['roles', id], context.previousRole);
      }
    },
    onSuccess: () => {
      // ✅ Invalider la liste des rôles
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}

/**
 * Hook pour supprimer un rôle
 */
export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await prosperify.roles.deleteV1Roles(id);
      return id;
    },
    onSuccess: (deletedId) => {
      // ✅ Retirer du cache
      queryClient.removeQueries({ queryKey: ['roles', deletedId] });

      // ✅ Invalider la liste
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}