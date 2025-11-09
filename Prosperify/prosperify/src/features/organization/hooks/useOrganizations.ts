import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type {
  OrganizationCreatePayload,
  OrganizationSummary,
  OrganizationUpdatePayload,
} from '@/features/organization/types';

/* ════════════════════════════════════════════════════════════════
   Helpers & Types internes
════════════════════════════════════════════════════════════════ */

interface OrganizationMutationMeta {
  event?: unknown;
  eventMessage?: string;
  timestamp?: number;
}

/**
 * Structure possible de `response.data` renvoyée par l'API
 * (le SDK généré ne la décrit pas correctement, donc on la précise ici)
 */
interface OrganizationResponseData {
  organization?: Record<string, unknown>;
}

/* ════════════════════════════════════════════════════════════════
   React Query Keys
════════════════════════════════════════════════════════════════ */

const organizationKeys = {
  all: ['organizations'] as const,
  detail: (organizationId: string) => ['organizations', 'detail', organizationId] as const,
};

/* ════════════════════════════════════════════════════════════════
   Utilitaires
════════════════════════════════════════════════════════════════ */

function mapOrganizationSummary(entity: Record<string, unknown>): OrganizationSummary {
  const id = entity['id'];
  const name = entity['name'];

  if (!id || !name) {
    throw new Error('Prosperify API returned an organization without `id` or `name`.');
  }

  const result: OrganizationSummary = {
    id: String(id),
    name: String(name),
  };

  if (typeof entity['createdAt'] === 'number') {
    result.createdAt = entity['createdAt'];
  }

  if (typeof entity['overage'] === 'boolean') {
    result.overage = entity['overage'];
  }

  if (entity['object'] === 'organization') {
    result.object = 'organization';
  }

  return result;
}

function sanitizePayload<T extends Record<string, unknown>>(payload: T): T {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  ) as T;
}

/**
 * Extrait et typise la propriété `organization` de response.data
 */
function extractOrganization(response: { data?: Record<string, unknown> }): Record<string, unknown> | undefined {
  const data = response.data as OrganizationResponseData | undefined;
  return data?.organization;
}

/* ════════════════════════════════════════════════════════════════
   Hook principal `useOrganizations`
════════════════════════════════════════════════════════════════ */

export function useOrganizations() {
  const queryClient = useQueryClient();

  return {
    /**
     * 🔍 Récupère une organisation spécifique
     */
    useOrganization: (organizationId: string, options?: { enabled?: boolean }) => {
      return useQuery({
        queryKey: organizationKeys.detail(organizationId),
        queryFn: async () => {
          const response = await prosperify.organizations.getV1Organizations(organizationId);
          const raw = extractOrganization(response);
          return raw ? mapOrganizationSummary(raw) : null;
        },
        enabled: Boolean(organizationId) && (options?.enabled ?? true),
        staleTime: 5 * 60 * 1000,
      });
    },

    /**
     * 🏗️ Crée une nouvelle organisation
     */
    useCreate: () => {
      return useMutation({
        mutationFn: async (
          payload: OrganizationCreatePayload,
        ): Promise<{ organization: OrganizationSummary } & OrganizationMutationMeta> => {
          const response = await prosperify.organizations.postV1OrganizationsNew(payload);
          const raw = extractOrganization(response);

          if (!raw) {
            throw new Error('Prosperify API did not include the created organization payload.');
          }

          const organization = mapOrganizationSummary(raw);

          return {
            organization,
            ...(response.event !== undefined && { event: response.event }),
            ...((response as any)?.eventMessage !== undefined && { eventMessage: (response as any)?.eventMessage }),
            ...(response.timestamp !== undefined && { timestamp: response.timestamp }),
          };
        },
        onSuccess: ({ organization }) => {
          queryClient.invalidateQueries({ queryKey: organizationKeys.all });
          queryClient.setQueryData(organizationKeys.detail(organization.id), organization);
        },
      });
    },

    /**
     * ✏️ Met à jour une organisation
     */
    useUpdate: () => {
      return useMutation({
        mutationFn: async (variables: {
          organizationId: string;
          payload: OrganizationUpdatePayload;
        }): Promise<{ organization: OrganizationSummary } & OrganizationMutationMeta> => {
          const { organizationId, payload } = variables;
          const sanitized = sanitizePayload(payload as Record<string, unknown>);
          const response = await prosperify.organizations.putV1Organizations(organizationId, sanitized);
          const raw = extractOrganization(response);

          if (!raw) {
            throw new Error('Prosperify API did not include the updated organization payload.');
          }

          const organization = mapOrganizationSummary(raw);

          const result: { organization: OrganizationSummary } & OrganizationMutationMeta = {
            organization,
          };

          if (response.event !== undefined) {
            result.event = response.event;
          }
          if ((response as any)?.eventMessage !== undefined) {
            result.eventMessage = (response as any)?.eventMessage;
          }
          if (response.timestamp !== undefined) {
            result.timestamp = response.timestamp;
          }

          return result;
        },
        onSuccess: ({ organization }) => {
          queryClient.invalidateQueries({ queryKey: organizationKeys.all });
          queryClient.setQueryData(organizationKeys.detail(organization.id), organization);
        },
      });
    },

    /**
     * ❌ Supprime une organisation
     */
    useDelete: () => {
      return useMutation({
        mutationFn: async (
          organizationId: string,
        ): Promise<{ organizationId: string } & OrganizationMutationMeta> => {
          const response = await prosperify.organizations.deleteV1Organizations(organizationId);
          return {
            organizationId,
            ...(response.event !== undefined && { event: response.event }),
            ...((response as any)?.eventMessage !== undefined && { eventMessage: (response as any)?.eventMessage }),
            ...(response.timestamp !== undefined && { timestamp: response.timestamp }),
          };
        },
        onSuccess: ({ organizationId }) => {
          queryClient.removeQueries({ queryKey: organizationKeys.detail(organizationId) });
          queryClient.invalidateQueries({ queryKey: organizationKeys.all });
        },
      });
    },

    /**
     * 👋 Retire un membre de l'organisation
     */
    useRemoveMember: () => {
      return useMutation({
        mutationFn: async (variables: {
          organizationId: string;
          userId: string;
        }): Promise<{ organizationId: string; userId: string } & OrganizationMutationMeta> => {
          const { organizationId, userId } = variables;
          const response = await prosperify.organizations.deleteV1OrganizationsMembersRemove(
            organizationId,
            userId,
          );

          return {
            organizationId,
            userId,
            ...(response.event !== undefined && { event: response.event }),
            ...((response as any)?.eventMessage !== undefined && { eventMessage: (response as any)?.eventMessage }),
            ...(response.timestamp !== undefined && { timestamp: response.timestamp }),
          };
        },
        onSuccess: ({ organizationId }) => {
          queryClient.invalidateQueries({ queryKey: organizationKeys.detail(organizationId) });
        },
      });
    },
  };
}
