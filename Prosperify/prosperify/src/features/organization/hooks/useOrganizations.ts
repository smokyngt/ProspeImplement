import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type {
  OrganizationCreatePayload,
  OrganizationSummary,
  OrganizationUpdatePayload,
} from '@/features/organization/types';

/**
 * Métadonnées communes renvoyées par les mutations d'organisation Prosperify.
 */
export interface OrganizationMutationMeta {
  event?: unknown;
  eventMessage?: string;
  timestamp?: number;
}

/**
 * @deprecated Préférer `OrganizationMutationMeta` pour typer les métadonnées de mutations.
 */
export type OrganizationOperationResult<T> = {
  data: T;
} & OrganizationMutationMeta;

export const organizationKeys = {
  all: ['organizations'] as const,
  detail: (organizationId: string) =>
    ['organizations', 'detail', organizationId] as const,
};

/**
 * Normalise l'entité renvoyée par Prosperify en conservant uniquement les champs utilisés par le front.
 * Cette fonction reste locale au hook pour respecter la consigne de ne plus externaliser la logique dans un service.
 */
function mapOrganizationSummary(entity: Record<string, unknown>): OrganizationSummary {
  const id = entity?.['id'];
  const name = entity?.['name'];

  if (!id || !name) {
    throw new Error('Prosperify API returned an organization without `id` or `name`.');
  }

  return {
    id: String(id),
    name: String(name),
    createdAt:
      typeof entity?.['createdAt'] === 'number'
        ? (entity['createdAt'] as number)
        : undefined,
    overage:
      typeof entity?.['overage'] === 'boolean'
        ? (entity['overage'] as boolean)
        : undefined,
    object: entity?.['object'] === 'organization' ? 'organization' : undefined,
  } satisfies OrganizationSummary;
}

/**
 * Supprime les propriétés `undefined` pour éviter d'écraser des valeurs côté API lors d'un update partiel.
 */
function sanitizePayload<T extends Record<string, unknown>>(payload: T): T {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  ) as T;
}

/**
 * Charge une organisation spécifique en s'alignant sur les patterns de `useAssistants`.
 */
export function useOrganization(organizationId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: organizationKeys.detail(organizationId),
    queryFn: async () => {
      const response = await prosperify.organizations.getV1Organizations(organizationId); // ✅ updated: direct SDK call
      const raw = response.data?.organization;
      return raw ? mapOrganizationSummary(raw as Record<string, unknown>) : null;
    },
    enabled: Boolean(organizationId) && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

interface UpdateOrganizationVariables {
  organizationId: string;
  payload: OrganizationUpdatePayload;
}

/**
 * Crée une nouvelle organisation et synchronise les caches concernés.
 */
export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: OrganizationCreatePayload,
    ): Promise<{ organization: OrganizationSummary; } & OrganizationMutationMeta> => {
      const response = await prosperify.organizations.postV1OrganizationsNew(payload); // ✅ updated: direct SDK call
      const raw = response.data?.organization;

      if (!raw) {
        throw new Error('Prosperify API did not include the created organization payload.');
      }

      const organization = mapOrganizationSummary(raw as Record<string, unknown>);

      return {
        organization,
        event: response.event,
        eventMessage: (response as any)?.eventMessage,
        timestamp: response.timestamp,
      };
    },
    onSuccess: ({ organization }) => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      queryClient.setQueryData(organizationKeys.detail(organization.id), organization);
    },
  });
}

/**
 * Met à jour partiellement une organisation en conservant les caches locaux synchronisés.
 */
export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      variables: UpdateOrganizationVariables,
    ): Promise<{ organization: OrganizationSummary; } & OrganizationMutationMeta> => {
      const { organizationId, payload } = variables;
      const sanitized = sanitizePayload(payload);
      const response = await prosperify.organizations.putV1Organizations(organizationId, sanitized); // ✅ updated: direct SDK call
      const raw = response.data?.organization;

      if (!raw) {
        throw new Error('Prosperify API did not include the updated organization payload.');
      }

      const organization = mapOrganizationSummary(raw as Record<string, unknown>);

      return {
        organization,
        event: response.event,
        eventMessage: (response as any)?.eventMessage,
        timestamp: response.timestamp,
      };
    },
    onSuccess: ({ organization }) => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      queryClient.setQueryData(organizationKeys.detail(organization.id), organization);
    },
  });
}

/**
 * Supprime une organisation et nettoie les caches associés.
 */
export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      organizationId: string,
    ): Promise<{ organizationId: string } & OrganizationMutationMeta> => {
      const response = await prosperify.organizations.deleteV1Organizations(organizationId); // ✅ updated: direct SDK call
      return {
        organizationId,
        event: response.event,
        eventMessage: (response as any)?.eventMessage,
        timestamp: response.timestamp,
      };
    },
    onSuccess: ({ organizationId }) => {
      queryClient.removeQueries({ queryKey: organizationKeys.detail(organizationId) });
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
}

interface RemoveMemberVariables {
  organizationId: string;
  userId: string;
}

/**
 * Retire un membre d'une organisation et force la mise à jour de l'entité côté cache.
 */
export function useRemoveOrganizationMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      variables: RemoveMemberVariables,
    ): Promise<RemoveMemberVariables & OrganizationMutationMeta> => {
      const { organizationId, userId } = variables;
      const response = await prosperify.organizations.deleteV1OrganizationsMembersRemove(
        organizationId,
        userId,
      ); // ✅ updated: direct SDK call

      return {
        organizationId,
        userId,
        event: response.event,
        eventMessage: (response as any)?.eventMessage,
        timestamp: response.timestamp,
      };
    },
    onSuccess: ({ organizationId }) => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.detail(organizationId) });
    },
  });
}
