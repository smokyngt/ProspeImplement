import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type {
  AssistantSummary,
  AssistantDetail,
  AssistantSettings,
  AssistantsListResponse,
  AssistantDetailResponse,
  AssistantCreateResponse,
  AssistantCreatePayload,
  AssistantUpdatePayload,
  AssistantListParams,
  MetricsListResponse,
  MetricsMap,
} from '../types';

// ========================================
// CLÉS DE CACHE
// ========================================
export const assistantKeys = {
  all: ['assistants'] as const,
  lists: () => [...assistantKeys.all, 'list'] as const,
  list: (params: AssistantListParams = {}) => [...assistantKeys.lists(), params] as const,
  details: () => [...assistantKeys.all, 'detail'] as const,
  detail: (id: string) => [...assistantKeys.details(), id] as const,
  settings: (id: string) => [...assistantKeys.detail(id), 'settings'] as const,
  metrics: () => ['metrics'] as const,
  metricsList: (params = {}) => [...assistantKeys.metrics(), 'list', params] as const,
};

// ========================================
// HOOK PRINCIPAL
// ========================================
export function useAssistants() {
  const queryClient = useQueryClient();

  return {
    // ========================================
    // 📥 QUERIES (Lecture)
    // ========================================

    /**
     * Liste des assistants
     */
    useList: (params: AssistantListParams = {}) => {
      return useQuery({
        queryKey: assistantKeys.list(params),
        queryFn: async () => {
          const response = await prosperify.assistants.postV1AssistantsList({
            limit: 100,
            order: 'desc',
            ...params,
          });

          const data = response?.data as unknown as AssistantsListResponse;
          const assistants = Array.isArray(data?.assistants) ? data.assistants : [];

          return {
            assistants,
            total: data?.total ?? assistants.length,
          };
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
      });
    },

    /**
     * Détail d'un assistant
     */
    useDetail: (id: string, enabled: boolean = true) => {
      return useQuery({
        queryKey: assistantKeys.detail(id),
        queryFn: async () => {
          const response = await prosperify.assistants.getV1Assistants(id);
          const data = response?.data as unknown as AssistantDetailResponse;
          return data?.assistant ?? null;
        },
        enabled: Boolean(id) && enabled,
        staleTime: 5 * 60 * 1000,
      });
    },

    /**
     * Settings d'un assistant
     */
    useSettings: (assistantId: string, enabled: boolean = true) => {
      return useQuery({
        queryKey: assistantKeys.settings(assistantId),
        queryFn: async () => {
          const response = await prosperify.assistants.getV1Assistants(assistantId);
          const data = response?.data as unknown as AssistantDetailResponse;
          const assistant = data?.assistant;

          if (!assistant) {
            throw new Error('Assistant not found');
          }

          // Parse metadata ou description
          let parsedSettings: Partial<AssistantSettings> = {};

          if (assistant.description) {
            try {
              parsedSettings = JSON.parse(assistant.description);
            } catch {
              parsedSettings = { instructions: assistant.description };
            }
          }

          return {
            instructions: parsedSettings.instructions || assistant.instructions || '',
            temperature: parsedSettings.temperature ?? 0.5,
            precision: parsedSettings.precision ?? 0.5,
            notifications: parsedSettings.notifications ?? false,
            externalSources: parsedSettings.externalSources ?? false,
          } satisfies AssistantSettings;
        },
        enabled: Boolean(assistantId) && enabled,
        staleTime: 5 * 60 * 1000,
      });
    },

    /**
     * Métriques dashboard
     */
    useMetrics: (params: { limit?: number } = {}) => {
      return useQuery({
        queryKey: assistantKeys.metricsList(params),
        queryFn: async () => {
          const response = await prosperify.metrics.postV1MetricsList({
            limit: 10,
            order: 'desc',
            ...params,
          });

          const data = response?.data as unknown as MetricsListResponse;
          const items = Array.isArray(data?.items) ? data.items : [];

          // Transformation en objet clé-valeur
          const metricsMap: MetricsMap = {};
          items.forEach((metric) => {
            const key = metric.name?.toLowerCase() || 'unknown';
            metricsMap[key] = {
              name: metric.name || 'Unknown',
              value: metric.value,
              delta: metric.delta || 0,
            };
          });

          return metricsMap;
        },
        retry: false,
        staleTime: 60_000, // 1 minute
      });
    },

    // ========================================
    // ➕ MUTATIONS (Écriture)
    // ========================================

    /**
     * Créer un assistant
     */
    useCreate: () => {
      return useMutation({
        mutationFn: async (payload: AssistantCreatePayload) => {
          const response = await prosperify.assistants.postV1AssistantsNew(payload);
          const data = response?.data as unknown as AssistantCreateResponse;
          const assistant = data?.assistant;

          if (!assistant) {
            throw new Error('Failed to create assistant');
          }

          return assistant;
        },
        onSuccess: (newAssistant) => {
          queryClient.invalidateQueries({ queryKey: assistantKeys.lists() });
          queryClient.setQueryData(assistantKeys.detail(newAssistant.id), {
            assistant: newAssistant,
          });
        },
      });
    },

    /**
     * Mettre à jour un assistant
     */
    useUpdate: (id: string) => {
      return useMutation({
        mutationFn: async (payload: AssistantUpdatePayload) => {
          const response = await prosperify.assistants.putV1Assistants(id, payload);
          const data = response?.data as unknown as AssistantDetailResponse;
          return data?.assistant;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: assistantKeys.lists() });
          queryClient.invalidateQueries({ queryKey: assistantKeys.detail(id) });
        },
      });
    },

    /**
     * Mettre à jour les settings
     */
    useUpdateSettings: (assistantId: string) => {
      return useMutation({
        mutationFn: async (settings: AssistantSettings) => {
          const response = await prosperify.assistants.putV1Assistants(assistantId, {
            description: JSON.stringify(settings),
          });
          return response;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: assistantKeys.settings(assistantId) });
          queryClient.invalidateQueries({ queryKey: assistantKeys.detail(assistantId) });
        },
      });
    },

    /**
     * Supprimer un assistant
     */
    useDelete: () => {
      return useMutation({
        mutationFn: async (id: string) => {
          await prosperify.assistants.deleteV1Assistants(id);
          return id;
        },
        onSuccess: (deletedId) => {
          queryClient.invalidateQueries({ queryKey: assistantKeys.lists() });
          queryClient.removeQueries({ queryKey: assistantKeys.detail(deletedId) });
        },
      });
    },
  };
}