import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type {
  InvitationCreatePayload,
  InvitationListParams,
} from '@/features/invites/types';

// @deprecated Préférez importer les types depuis '@/features/invites/types'.
export type { InvitationCreatePayload, InvitationListParams } from '@/features/invites/types';

const invitationKeys = {
  all: ['invitations'] as const,
  list: (params: InvitationListParams = {}) => ['invitations', 'list', params] as const,
};

/**
 * Récupère la liste des invitations en cours.
 */
export function useInvitations(params: InvitationListParams = {}) {
  return useQuery({
    queryKey: invitationKeys.list(params),
    queryFn: async () => {
      const response = await prosperify.invitations.postV1InvitationsList(params); // ✅ updated: direct SDK call
      return {
        items: response.data?.invitations ?? [],
        eventMessage: response.eventMessage,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Crée une invitation et ré-invalide la liste.
 */
export function useCreateInvitation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: InvitationCreatePayload) =>
      prosperify.invitations.postV1InvitationsNew(payload), // ✅ updated: direct SDK call
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: invitationKeys.all });
    },
  });
}

/**
 * Supprime une invitation existante.
 */
export function useDeleteInvitation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await prosperify.invitations.deleteV1Invitations(id); // ✅ updated: direct SDK call
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: invitationKeys.all }),
  });
}

/**
 * Accepte une invitation publique.
 */
export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (id: string) => prosperify.invitations.getV1InvitationsAccept(id), // ✅ updated: direct SDK call
  });
}
