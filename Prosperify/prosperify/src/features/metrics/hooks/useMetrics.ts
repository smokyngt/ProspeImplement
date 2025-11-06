import { useQuery } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
export interface MetricsListParams {
  archived?: boolean;
  date?: {
    end?: string | number;
    start?: string | number;
  };
  limit?: number;
  offset?: number;
  organizationId?: string;
  resourceId?: string;
  resourceType?: 'apiKey' | 'assistant' | 'file' | 'member' | 'message' | 'thread';
  sort?: {
    by?: 'createdAt' | 'timestamp';
    order?: 'asc' | 'desc';
  };
  timestamp?: {
    max?: number;
    min?: number;
  };
}

// ✅ Hook générique pour toutes les métriques
export function useMetrics(params: MetricsListParams = {}) {
  return useQuery({
    queryKey: ['metrics', params],
    queryFn: async () => {
      const res = await prosperify.metrics.postV1MetricsList(params);
      return {
        metrics: res?.data?.metrics || [],
        total: res?.data?.total || 0,
        limit: res?.data?.limit || 0,
        offset: res?.data?.offset || 0,
      };
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ✅ Hook pour une métrique spécifique
export function useMetric(id: string) {
  return useQuery({
    queryKey: ['metrics', id],
    queryFn: async () => {
      const res = await prosperify.metrics.getV1Metrics(id);
      return res?.data?.metric || null;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// 🔑 Hook pour les métriques API Keys
export function useApiKeyMetrics(
  apiKeyId?: string,
  options?: {
    date?: { start?: string | number; end?: string | number };
    limit?: number;
    archived?: boolean;
  }
) {
  return useQuery({
    queryKey: ['metrics', 'apiKey', apiKeyId, options],
    queryFn: async () => {
      const res = await prosperify.metrics.postV1MetricsList({
        resourceType: 'apiKey',
        ...(apiKeyId && { resourceId: apiKeyId }),
        date: options?.date,
        limit: options?.limit || 50,
        archived: options?.archived ?? false,
        sort: { by: 'timestamp', order: 'desc' },
      });
      return {
        metrics: res?.data?.metrics || [],
        total: res?.data?.total || 0,
      };
    },
    staleTime: 2 * 60 * 1000,
  });
}

// 🤖 Hook pour les métriques Assistants
export function useAssistantMetrics(
  assistantId?: string,
  options?: {
    date?: { start?: string | number; end?: string | number };
    limit?: number;
    archived?: boolean;
  }
) {
  return useQuery({
    queryKey: ['metrics', 'assistant', assistantId, options],
    queryFn: async () => {
      const res = await prosperify.metrics.postV1MetricsList({
        resourceType: 'assistant',
        ...(assistantId && { resourceId: assistantId }),
        date: options?.date,
        limit: options?.limit || 100,
        archived: options?.archived ?? false,
        sort: { by: 'timestamp', order: 'desc' },
      });
      return {
        metrics: res?.data?.metrics || [],
        total: res?.data?.total || 0,
      };
    },
    staleTime: 2 * 60 * 1000,
  });
}

// 💬 Hook pour les métriques Messages
export function useMessageMetrics(
  messageId?: string,
  options?: {
    date?: { start?: string | number; end?: string | number };
    timestamp?: { min?: number; max?: number };
    limit?: number;
  }
) {
  return useQuery({
    queryKey: ['metrics', 'message', messageId, options],
    queryFn: async () => {
      const res = await prosperify.metrics.postV1MetricsList({
        resourceType: 'message',
        ...(messageId && { resourceId: messageId }),
        date: options?.date,
        timestamp: options?.timestamp,
        limit: options?.limit || 100,
        sort: { by: 'timestamp', order: 'desc' },
      });
      return {
        metrics: res?.data?.metrics || [],
        total: res?.data?.total || 0,
      };
    },
    staleTime: 1 * 60 * 1000, // 1 min (messages = temps réel)
  });
}

// 🧵 Hook pour les métriques Threads
export function useThreadMetrics(
  threadId?: string,
  options?: {
    date?: { start?: string | number; end?: string | number };
    limit?: number;
  }
) {
  return useQuery({
    queryKey: ['metrics', 'thread', threadId, options],
    queryFn: async () => {
      const res = await prosperify.metrics.postV1MetricsList({
        resourceType: 'thread',
        ...(threadId && { resourceId: threadId }),
        date: options?.date,
        limit: options?.limit || 50,
        sort: { by: 'timestamp', order: 'desc' },
      });
      return {
        metrics: res?.data?.metrics || [],
        total: res?.data?.total || 0,
      };
    },
    staleTime: 2 * 60 * 1000,
  });
}

// 📁 Hook pour les métriques Files
export function useFileMetrics(
  fileId?: string,
  options?: {
    date?: { start?: string | number; end?: string | number };
    limit?: number;
    archived?: boolean;
  }
) {
  return useQuery({
    queryKey: ['metrics', 'file', fileId, options],
    queryFn: async () => {
      const res = await prosperify.metrics.postV1MetricsList({
        resourceType: 'file',
        ...(fileId && { resourceId: fileId }),
        date: options?.date,
        limit: options?.limit || 50,
        archived: options?.archived ?? false,
        sort: { by: 'timestamp', order: 'desc' },
      });
      return {
        metrics: res?.data?.metrics || [],
        total: res?.data?.total || 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

// 👥 Hook pour les métriques Members
export function useMemberMetrics(
  memberId?: string,
  options?: {
    date?: { start?: string | number; end?: string | number };
    limit?: number;
  }
) {
  return useQuery({
    queryKey: ['metrics', 'member', memberId, options],
    queryFn: async () => {
      const res = await prosperify.metrics.postV1MetricsList({
        resourceType: 'member',
        ...(memberId && { resourceId: memberId }),
        date: options?.date,
        limit: options?.limit || 50,
        sort: { by: 'timestamp', order: 'desc' },
      });
      return {
        metrics: res?.data?.metrics || [],
        total: res?.data?.total || 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ⏰ Hook pour les métriques récentes (dernières 24h)
export function useRecentMetrics(resourceType?: MetricsListParams['resourceType']) {
  const yesterday = Date.now() - 24 * 60 * 60 * 1000;
  
  return useQuery({
    queryKey: ['metrics', 'recent', resourceType],
    queryFn: async () => {
      const res = await prosperify.metrics.postV1MetricsList({
        ...(resourceType && { resourceType }),
        timestamp: {
          min: yesterday,
          max: Date.now(),
        },
        sort: { by: 'timestamp', order: 'desc' },
        limit: 100,
      });
      return {
        metrics: res?.data?.metrics || [],
        total: res?.data?.total || 0,
      };
    },
    staleTime: 1 * 60 * 1000, // 1 min
    refetchInterval: 5 * 60 * 1000, // Refresh toutes les 5 min
  });
}

// 📊 Hook pour statistiques agrégées par type de ressource
export function useMetricsSummary(
  options?: {
    date?: { start?: string | number; end?: string | number };
    organizationId?: string;
  }
) {
  return useQuery({
    queryKey: ['metrics', 'summary', options],
    queryFn: async () => {
      const types: MetricsListParams['resourceType'][] = [
        'apiKey',
        'assistant',
        'file',
        'member',
        'message',
        'thread',
      ];

      const results = await Promise.all(
        types.map(async (type) => {
          const res = await prosperify.metrics.postV1MetricsList({
            resourceType: type,
            date: options?.date,
            organizationId: options?.organizationId,
            limit: 1000,
          });
          return {
            type: type as NonNullable<typeof type>,
            total: res?.data?.total || 0,
            metrics: res?.data?.metrics || [],
          };
        })
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
        } as Record<string, any>
      );
    },
    staleTime: 5 * 60 * 1000,
  });
}