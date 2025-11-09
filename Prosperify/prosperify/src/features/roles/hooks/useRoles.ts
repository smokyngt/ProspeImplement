import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type {
  Role,
  RoleScope,
  AssistantScope,
  RoleListParams,
  RoleMutationPayload,
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

    /**
     * Liste des rôles
     */
    useList: (params: RoleListParams = {}) => {
      return useQuery({
        queryKey: roleKeys.list(params),
        queryFn: async () => {
          const response = await prosperify.roles.postV1RolesList(params);
          const roles = (response?.data?.roles ?? []) as Role[];
          return roles;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
      });
    },

    /**
     * Détail d'un rôle
     */
    useDetail: (id: string, enabled = true) => {
      return useQuery({
        queryKey: roleKeys.detail(id),
        queryFn: async () => {
          const response = await prosperify.roles.getV1Roles(id);
          const role = response?.data?.role as Role | undefined;

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

    /**
     * Créer un rôle
     */
    useCreate: () => {
      return useMutation({
        mutationFn: async (payload: RoleMutationPayload) => {
          const response = await prosperify.roles.postV1RolesNew(payload);
          const role = response?.data?.role as Role | undefined;

          if (!role) {
            throw new Error('Failed to create role: Invalid API response');
          }

          return role;
        },
        onSuccess: (newRole) => {
          // ✅ Invalider toutes les listes
          queryClient.invalidateQueries({ queryKey: roleKeys.lists() });

          // ✅ Mettre en cache le nouveau rôle
          queryClient.setQueryData<Role>(roleKeys.detail(newRole.id), newRole);
        },
      });
    },

    /**
     * Mettre à jour un rôle
     */
    useUpdate: (id: string) => {
      return useMutation({
        mutationFn: async (payload: Partial<RoleMutationPayload>) => {
          const response = await prosperify.roles.putV1Roles(id, payload);
          
          // ⚠️ L'API retourne { data: { success: true } }, pas le rôle complet
          // On invalide le cache pour forcer un refetch
          return { id, ...payload };
        },
        onMutate: async (payload) => {
          // ✅ Annuler les requêtes en cours
          await queryClient.cancelQueries({ queryKey: roleKeys.detail(id) });

          // ✅ Sauvegarder l'état précédent
          const previousRole = queryClient.getQueryData<Role>(roleKeys.detail(id));

          // ✅ Update optimiste
          if (previousRole) {
            queryClient.setQueryData<Role>(roleKeys.detail(id), {
              ...previousRole,
              ...payload,
            });
          }

          return { previousRole };
        },
        onError: (err, payload, context) => {
          // ✅ Rollback en cas d'erreur
          if (context?.previousRole) {
            queryClient.setQueryData(roleKeys.detail(id), context.previousRole);
          }
        },
        onSuccess: () => {
          // ✅ Invalider les listes et le détail
          queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
          queryClient.invalidateQueries({ queryKey: roleKeys.detail(id) });
        },
      });
    },

    /**
     * Supprimer un rôle
     */
    useDelete: () => {
      return useMutation({
        mutationFn: async (id: string) => {
          await prosperify.roles.deleteV1Roles(id);
          return id;
        },
        onSuccess: (deletedId) => {
          // ✅ Retirer du cache
          queryClient.removeQueries({ queryKey: roleKeys.detail(deletedId) });

          // ✅ Invalider les listes
          queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
        },
      });
    },
  };
}

// ✅ Ré-exporter les types
export type { Role, RoleScope, AssistantScope, RoleListParams, RoleMutationPayload };