
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
} from '../types/assistantTypes';

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
  useList: (params: AssistantListParams = {}) =>
  useQuery({
    queryKey: assistantKeys.list(params),
    queryFn: async (): Promise<AssistantsListResponse> => {
      const response = await prosperify.assistants.postV1AssistantsList({
        limit: 100,
        order: 'desc',
        ...params,
      });

      // ✅ Extraction conforme au SDK et à ton interface
      const assistants: AssistantSummary[] = Array.isArray(response?.data?.assistants)
        ? response.data.assistants
        : [];

      const total = response?.data?.total ?? assistants.length;

      // ✅ Retourne un objet bien typé
      return {
        assistants,
        total,
        hasMore: total > assistants.length,
      };
    },
    staleTime: 5 * 60 * 1000, // cache 5 min
    gcTime: 30 * 60 * 1000,   // garbage collect 30 min
  }),

    /**
     * Détail d'un assistant
     */
    useDetail: (id: string, enabled = true) =>
      useQuery({
        queryKey: assistantKeys.detail(id),
        enabled: Boolean(id) && enabled,
        queryFn: async (): Promise<AssistantDetail | null> => {
          const res = await prosperify.assistants.getV1Assistants(id);
          const data = res?.data as { assistant?: AssistantDetail };
          return data?.assistant ?? null;
        },
        staleTime: 5 * 60 * 1000,
      }),

    /**
     * Settings d'un assistant (décrits dans la description JSON)
     */
    useSettings: (assistantId: string, enabled = true) =>
      useQuery({
        queryKey: assistantKeys.settings(assistantId),
        enabled: Boolean(assistantId) && enabled,
        queryFn: async (): Promise<AssistantSettings> => {
          const res = await prosperify.assistants.getV1Assistants(assistantId);
          const data = res?.data as { assistant?: AssistantDetail };
          const assistant = data?.assistant;

          if (!assistant) throw new Error('Assistant not found');

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
          };
        },
        staleTime: 5 * 60 * 1000,
      }),

    /**
     * Métriques dashboard
     */
    useMetrics: (params: { limit?: number } = {}) =>
      useQuery({
        queryKey: assistantKeys.metricsList(params),
        queryFn: async (): Promise<MetricsMap> => {
          const res = await prosperify.metrics.postV1MetricsList({
            limit: 10,
            ...params,
          });

          const data = res?.data as unknown as MetricsListResponse;
          const items = Array.isArray(data?.items) ? data.items : [];

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
        staleTime: 60_000,
      }),

    // ========================================
    // ➕ MUTATIONS (Écriture)
    // ========================================

    /**
     * Créer un assistant
     */
    useCreate: () =>
      useMutation({
        mutationFn: async (payload: AssistantCreatePayload): Promise<AssistantSummary> => {
          // Le SDK ne tape que { name }, mais on étend localement pour description/instructions
          const res = await prosperify.assistants.postV1AssistantsNew({
            name: payload.name,
            // champs additionnels (backend les supporte probablement)
            ...(payload.description && { description: payload.description }),
            ...(payload.instructions && { instructions: payload.instructions }),
          } as any);

          const data = res?.data as unknown as AssistantCreateResponse;
          const assistant = data?.assistant;

          if (!assistant) throw new Error('Failed to create assistant');
          return assistant;
        },
        onSuccess: (assistant) => {
          queryClient.invalidateQueries({ queryKey: assistantKeys.lists() });
          queryClient.setQueryData(assistantKeys.detail(assistant.id), assistant);
        },
      }),

    /**
     * Mettre à jour un assistant
     */
    useUpdate: (id: string) =>
      useMutation({
        mutationFn: async (payload: AssistantUpdatePayload): Promise<AssistantDetail | null> => {
          const res = await prosperify.assistants.putV1Assistants(id, payload);
          const data = res?.data as unknown as AssistantDetailResponse;
          return data?.assistant ?? null;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: assistantKeys.detail(id) });
          queryClient.invalidateQueries({ queryKey: assistantKeys.lists() });
        },
      }),

    /**
     * Mettre à jour les settings
     */
    useUpdateSettings: (assistantId: string) =>
      useMutation({
        mutationFn: async (settings: AssistantSettings) => {
          return await prosperify.assistants.putV1Assistants(assistantId, {
            description: JSON.stringify(settings),
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: assistantKeys.settings(assistantId) });
          queryClient.invalidateQueries({ queryKey: assistantKeys.detail(assistantId) });
        },
      }),

    /**
     * Supprimer un assistant
     */
    useDelete: () =>
      useMutation({
        mutationFn: async (id: string): Promise<string> => {
          await prosperify.assistants.deleteV1Assistants(id);
          return id;
        },
        onSuccess: (id) => {
          queryClient.invalidateQueries({ queryKey: assistantKeys.lists() });
          queryClient.removeQueries({ queryKey: assistantKeys.detail(id) });
        },
      }),
  };
}
