import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type {
  AssistantScope,
  Role,
  RoleListParams,
  RoleMutationPayload,
  RoleScope,
} from '@/features/roles/types';

// @deprecated Préférez importer les types depuis '@/features/roles/types'.
export type { Role, RoleScope, AssistantScope, RoleListParams } from '@/features/roles/types';

export const roleKeys = {
  all: ['roles'] as const,
  list: (params: RoleListParams = {}) => ['roles', 'list', params] as const,
  detail: (id: string) => ['roles', id] as const,
};

/**
 * Hook pour récupérer tous les rôles.
 */
export function useRoles(params: RoleListParams = {}) {
  return useQuery({
    queryKey: roleKeys.list(params),
    queryFn: async () => {
      const response = await prosperify.roles.postV1RolesList(params); // ✅ updated: direct SDK call
      return {
        items: (response.data?.roles ?? []) as Role[],
        eventMessage: response.eventMessage,
      };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook pour récupérer un rôle par ID.
 */
export function useRole(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: async () => {
      const response = await prosperify.roles.getV1Roles(id); // ✅ updated: direct SDK call
      return (response.data?.role ?? null) as Role | null;
    },
    enabled: Boolean(id) && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook pour créer un rôle.
 */
export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RoleMutationPayload) => {
      const response = await prosperify.roles.postV1RolesNew(payload); // ✅ updated: direct SDK call
      if (!response.data?.role) {
        throw new Error('Prosperify API did not return the created role.');
      }
      return response.data.role as Role;
    },
    onSuccess: (newRole) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
      queryClient.setQueryData(roleKeys.detail(newRole.id), newRole);
    },
  });
}

/**
 * Hook pour mettre à jour un rôle.
 */
export function useUpdateRole(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<RoleMutationPayload>) => {
      await prosperify.roles.putV1Roles(id, updates); // ✅ updated: direct SDK call
      const refreshed = await prosperify.roles.getV1Roles(id); // ✅ updated: direct SDK call
      const role = (refreshed.data?.role ?? null) as Role | null;
      if (!role) {
        throw new Error('Unable to reload role after update.');
      }
      return { ...role, ...updates } as Role;
    },
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: roleKeys.detail(id) });
      const previousRole = queryClient.getQueryData<Role>(roleKeys.detail(id));

      if (previousRole) {
        queryClient.setQueryData<Role>(roleKeys.detail(id), {
          ...previousRole,
          ...updates,
        });
      }

      return { previousRole };
    },
    onError: (_err, _updates, context) => {
      if (context?.previousRole) {
        queryClient.setQueryData(roleKeys.detail(id), context.previousRole);
      }
    },
    onSuccess: (role) => {
      queryClient.setQueryData(roleKeys.detail(id), role);
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
    },
  });
}

/**
 * Hook pour supprimer un rôle.
 */
export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await prosperify.roles.deleteV1Roles(id); // ✅ updated: direct SDK call
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.removeQueries({ queryKey: roleKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
    },
  });
}
