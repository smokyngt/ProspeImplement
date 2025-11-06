import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import type { AssistantSettings } from '@/features/assistant/types';

export const assistantKeys = {
  settings: (id: string) => ['assistants', id, 'settings'] as const,
  detail: (id: string) => ['assistants', id] as const,
};

/**
 * Hook pour récupérer les settings d'un assistant.
 */
export function useAssistantSettings(assistantId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: assistantKeys.settings(assistantId),
    queryFn: async () => {
      const res = await prosperify.assistants.getV1Assistants(assistantId); // ✅ updated: direct SDK call
      const metadata = res?.data?.assistant?.metadata || {};
      const descriptionData = res?.data?.assistant?.description;

      let parsedMetadata = metadata;
      if (descriptionData) {
        try {
          parsedMetadata = JSON.parse(descriptionData);
        } catch {
          return {
            instructions: descriptionData,
            temperature: 0.5,
            precision: 0.5,
            notifications: false,
            externalSources: false,
          } satisfies AssistantSettings;
        }
      }

      return {
        instructions: parsedMetadata.instructions || '',
        temperature: parsedMetadata.temperature || 0.5,
        precision: parsedMetadata.precision || 0.5,
        notifications: parsedMetadata.notifications || false,
        externalSources: parsedMetadata.externalSources || false,
      } satisfies AssistantSettings;
    },
    enabled: Boolean(assistantId) && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook pour mettre à jour les settings d'un assistant.
 */
export function useUpdateAssistantSettings(assistantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: AssistantSettings) =>
      prosperify.assistants.putV1Assistants(assistantId, { // ✅ updated: direct SDK call
        description: JSON.stringify(settings),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assistantKeys.settings(assistantId) });
      queryClient.invalidateQueries({ queryKey: assistantKeys.detail(assistantId) });
    },
  });
}
