import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type {
  InvitationCreatePayload,
  InvitationListParams,
  Invitation,
} from '@/features/invites/types';

// @deprecated Préférez importer les types depuis '@/features/invites/types'.
export type { InvitationCreatePayload, InvitationListParams } from '@/features/invites/types';

/* ════════════════════════════════════════════════════════════════
   Helpers internes
════════════════════════════════════════════════════════════════ */

interface InvitationResponseData {
  invitation?: Record<string, unknown>;
  invitations?: Record<string, unknown>[];
}

function extractInvitations(response: { data?: Record<string, unknown> }): Record<string, unknown>[] {
  const data = response.data as InvitationResponseData | undefined;
  return data?.invitations ?? [];
}

function extractInvitation(response: { data?: Record<string, unknown> }): Record<string, unknown> | undefined {
  const data = response.data as InvitationResponseData | undefined;
  return data?.invitation;
}

function mapInvitation(entity: Record<string, unknown>): Invitation {
  return {
    id: String(entity['id']),
    organizationId: String(entity['organizationId'] ?? ''),
    createdAt: typeof entity['createdAt'] === 'number' ? entity['createdAt'] : Date.now(),
    roles: Array.isArray(entity['roles']) ? (entity['roles'] as string[]) : [],
    maxUsage: entity['maxUsage'] as number | undefined,
    expiresIn: entity['expiresIn'] as number | undefined,
  };
}

/* ════════════════════════════════════════════════════════════════
   React Query Keys
════════════════════════════════════════════════════════════════ */

export const invitationKeys = {
  all: ['invitations'] as const,
  list: (params: InvitationListParams = {}) => ['invitations', 'list', params] as const,
};

/* ════════════════════════════════════════════════════════════════
   Hook principal `useInvitations`
════════════════════════════════════════════════════════════════ */

/**
 * 🔍 Liste les invitations existantes
 */
export function useInvitations(params: InvitationListParams = {}) {
  return useQuery({
    queryKey: invitationKeys.list(params),
    queryFn: async () => {
      const response = await prosperify.invitations.postV1InvitationsList(params);
      const rawList = extractInvitations(response);
      const invitations = rawList.map(mapInvitation);

      return {
        items: invitations,
        eventMessage: (response as any)?.eventMessage,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * 🏗️ Crée une nouvelle invitation et invalide la liste
 */
export function useCreateInvitation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: InvitationCreatePayload): Promise<Invitation> => {
      const response = await prosperify.invitations.postV1InvitationsNew(payload);
      const raw = extractInvitation(response);

      if (!raw) {
        throw new Error('Prosperify API did not return the created invitation.');
      }

      return mapInvitation(raw);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: invitationKeys.all });
    },
  });
}

/**
 * ❌ Supprime une invitation existante
 */
export function useDeleteInvitation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await prosperify.invitations.deleteV1Invitations(id);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: invitationKeys.all });
    },
  });
}

/**
 * ✅ Accepte une invitation publique
 */
export function useAcceptInvitation() {
  return useMutation({
    mutationFn: async (id: string): Promise<{ success: boolean }> => {
      const response = await prosperify.invitations.getV1InvitationsAccept(id);
      const success = !!((response.data as any)?.success ?? true);
      return { success };
    },
  });
}
