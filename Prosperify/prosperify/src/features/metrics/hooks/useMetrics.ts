import { useQuery } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type { MetricsListParams } from '@/features/metrics/types';
// @deprecated Préférer importer depuis '@/features/metrics/types'.
export type { MetricsListParams } from '@/features/metrics/types';

const metricsKeys = {
  all: ['metrics'] as const,
  list: (params: MetricsListParams = {}) => ['metrics', 'list', params] as const,
  detail: (id: string) => ['metrics', 'detail', id] as const,
  resource: (
    resourceType: NonNullable<MetricsListParams['resourceType']>,
    id?: string,
    params?: MetricsListParams,
  ) => ['metrics', resourceType, id ?? 'all', params ?? {}] as const,
  summary: (params: Record<string, unknown> = {}) => ['metrics', 'summary', params] as const,
  recent: (resourceType?: MetricsListParams['resourceType']) =>
    ['metrics', 'recent', resourceType ?? 'all'] as const,
};

async function fetchMetrics(params: MetricsListParams = {}) {
  const response = await prosperify.metrics.postV1MetricsList(params); // ✅ updated: direct SDK call
  const data = response.data as any;
  return {
    metrics: data?.metrics ?? [],
    total: data?.total ?? 0,
    limit: data?.limit ?? params.limit ?? 0,
    offset: data?.offset ?? params.offset ?? 0,
    eventMessage: response.eventMessage,
  };
}

/**
 * Hook générique pour récupérer des métriques selon n'importe quel filtre.
 */
export function useMetrics(params: MetricsListParams = {}) {
  return useQuery({
    queryKey: metricsKeys.list(params),
    queryFn: () => fetchMetrics(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Charge une métrique spécifique.
 */
export function useMetric(id: string) {
  return useQuery({
    queryKey: metricsKeys.detail(id),
    queryFn: async () => {
      const response = await prosperify.metrics.getV1Metrics(id); // ✅ updated: direct SDK call
      const data = response.data as any;
      return data?.metric ?? null;
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Point d'entrée factorisé pour les ressources (API keys, assistants, etc.).
 */
function useResourceMetrics(
  resourceType: NonNullable<MetricsListParams['resourceType']>,
  resourceId?: string,
  options: MetricsListParams = {},
  staleTime = 2 * 60 * 1000,
) {
  const params: MetricsListParams = { ...options };
  params.resourceType = resourceType;
  if (resourceId) {
    params.resourceId = resourceId;
  } else {
    delete params.resourceId;
  }

  return useQuery({
    queryKey: metricsKeys.resource(resourceType, resourceId, params),
    queryFn: () => fetchMetrics(params),
    staleTime,
  });
}

/**
 * Métriques associées à une clé API.
 */
export function useApiKeyMetrics(
  apiKeyId?: string,
  options: MetricsListParams = {},
) {
  return useResourceMetrics('apiKey', apiKeyId, {
    limit: 50,
    sort: { by: 'timestamp', order: 'desc' },
    ...options,
  });
}

/**
 * Métriques associées à un assistant.
 */
export function useAssistantMetrics(
  assistantId?: string,
  options: MetricsListParams = {},
) {
  return useResourceMetrics('assistant', assistantId, {
    limit: 100,
    sort: { by: 'timestamp', order: 'desc' },
    ...options,
  });
}

/**
 * Métriques associées à un message.
 */
export function useMessageMetrics(
  messageId?: string,
  options: MetricsListParams = {},
) {
  return useResourceMetrics('message', messageId, {
    limit: 100,
    sort: { by: 'timestamp', order: 'desc' },
    ...options,
  }, 60 * 1000);
}

/**
 * Métriques associées à un thread.
 */
export function useThreadMetrics(
  threadId?: string,
  options: MetricsListParams = {},
) {
  return useResourceMetrics('thread', threadId, {
    limit: 50,
    sort: { by: 'timestamp', order: 'desc' },
    ...options,
  });
}

/**
 * Métriques associées à un fichier.
 */
export function useFileMetrics(
  fileId?: string,
  options: MetricsListParams = {},
) {
  return useResourceMetrics('file', fileId, {
    limit: 50,
    sort: { by: 'timestamp', order: 'desc' },
    ...options,
  });
}

/**
 * Métriques associées à un membre.
 */
export function useMemberMetrics(
  memberId?: string,
  options: MetricsListParams = {},
) {
  return useResourceMetrics('member', memberId, {
    limit: 50,
    sort: { by: 'timestamp', order: 'desc' },
    ...options,
  });
}

/**
 * Retourne les métriques des dernières 24h.
 */
export function useRecentMetrics(resourceType?: MetricsListParams['resourceType']) {
  const now = Date.now();
  const params: MetricsListParams = {
    timestamp: {
      min: now - 24 * 60 * 60 * 1000,
      max: now,
    },
    limit: 100,
    sort: { by: 'timestamp', order: 'desc' },
  };
  if (resourceType) {
    params.resourceType = resourceType;
  }

  return useQuery({
    queryKey: metricsKeys.recent(resourceType),
    queryFn: () => fetchMetrics(params),
    staleTime: 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}

/**
 * Agrège les métriques par type de ressource pour alimenter des dashboards.
 */
export function useMetricsSummary(options: {
  date?: { start?: string | number; end?: string | number };
  organizationId?: string;
} = {}) {
  return useQuery({
    queryKey: metricsKeys.summary(options),
    queryFn: async () => {
      const types: NonNullable<MetricsListParams['resourceType']>[] = [
        'apiKey',
        'assistant',
        'file',
        'member',
        'message',
        'thread',
      ];

      const results = await Promise.all(
        types.map(async (type) => {
          const filters: MetricsListParams = {
            resourceType: type,
            limit: 1000,
          };
          if (options.date) {
            filters.date = options.date;
          }
          if (options.organizationId) {
            filters.organizationId = options.organizationId;
          }

          const { metrics, total } = await fetchMetrics(filters);
          return {
            type,
            total,
            metrics,
          };
        }),
      );

      return results.reduce(
        (acc, curr) => {
          acc[curr.type] = {
            total: curr.total,
            count: curr.metrics.length,
          };
          acc['totalAll'] += curr.total;
          return acc;
        },
        {
          apiKey: { total: 0, count: 0 },
          assistant: { total: 0, count: 0 },
          file: { total: 0, count: 0 },
          member: { total: 0, count: 0 },
          message: { total: 0, count: 0 },
          thread: { total: 0, count: 0 },
          totalAll: 0,
        } as Record<string, any>,
      );
    },
    staleTime: 5 * 60 * 1000,
  });
}
