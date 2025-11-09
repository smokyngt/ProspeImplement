import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type {
  Role,
  RoleScope,
  AssistantScope,
  RoleListParams,
  RoleMutationPayload,
  RoleCreateResponse,
  RoleDetailResponse,
  RoleListResponse,
} from '../types/types';

/* ════════════════════════════════════════════════════════════════
   Query Keys
════════════════════════════════════════════════════════════════ */
export const roleKeys = {
  all: ['roles'] as const,
  lists: () => [...roleKeys.all, 'list'] as const,
  list: (params: RoleListParams = {}) => [...roleKeys.lists(), params] as const,
  details: () => [...roleKeys.all, 'detail'] as const,
  detail: (id: string) => [...roleKeys.details(), id] as const,
};

/* ════════════════════════════════════════════════════════════════
   Hook Principal
════════════════════════════════════════════════════════════════ */
export function useRoles() {
  const queryClient = useQueryClient();

  return {
    // ========================================
    // 📥 QUERIES (Lecture)
    // ========================================
useList: (params: RoleListParams = {}) => {
  return useQuery({
    queryKey: roleKeys.list(params),
    queryFn: async () => {
      const response = await prosperify.roles.postV1RolesList(params);

      const data = response.data as RoleListResponse | undefined;
      const roles = data?.roles ?? [];

      return roles;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
},


  useDetail: (id: string, enabled = true) => {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: async () => {
      const response = await prosperify.roles.getV1Roles(id);

      // ✅ Cast propre : on sait que response.data contient { role: Role }
      const data = response.data as RoleDetailResponse | undefined;
      const role = data?.role;

      if (!role) {
        throw new Error('Role not found');
      }

      return role;
    },
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
},
    // ========================================
    // ➕ MUTATIONS (Écriture)
    // ========================================

   useCreate: () => {
  return useMutation({
    mutationFn: async (payload: RoleMutationPayload) => {
      const response = await prosperify.roles.postV1RolesNew(payload);

      const data = response.data as RoleCreateResponse | undefined;
      const role = data?.role;

      if (!role) {
        throw new Error('Failed to create role: Invalid API response');
      }

      return role;
    },
    onSuccess: (newRole) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      queryClient.setQueryData<Role>(roleKeys.detail(newRole.id), newRole);
    },
  });
},

    useUpdate: (id: string) => {
      return useMutation({
        mutationFn: async (payload: Partial<RoleMutationPayload>) => {
          await prosperify.roles.putV1Roles(id, payload);
          // ⚠️ L’API ne retourne pas le rôle complet
          return { id, ...payload };
        },
        onMutate: async (payload) => {
          await queryClient.cancelQueries({ queryKey: roleKeys.detail(id) });

          const previousRole = queryClient.getQueryData<Role>(roleKeys.detail(id));

          if (previousRole) {
            queryClient.setQueryData<Role>(roleKeys.detail(id), {
              ...previousRole,
              ...payload,
            });
          }

          return { previousRole };
        },
        onError: (err, _payload, context) => {
          if (context?.previousRole) {
            queryClient.setQueryData(roleKeys.detail(id), context.previousRole);
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
          queryClient.invalidateQueries({ queryKey: roleKeys.detail(id) });
        },
      });
    },

    useDelete: () => {
      return useMutation({
        mutationFn: async (id: string) => {
          await prosperify.roles.deleteV1Roles(id);
          return id;
        },
        onSuccess: (deletedId) => {
          queryClient.removeQueries({ queryKey: roleKeys.detail(deletedId) });
          queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
        },
      });
    },
  };
}

// ✅ Ré-exporter les types
export type { Role, RoleScope, AssistantScope, RoleListParams, RoleMutationPayload };
