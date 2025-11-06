import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';

// ✅ Interface pour les settings
export interface AssistantSettings {
  instructions: string;
  temperature: number;
  precision: number;
  notifications: boolean;
  externalSources: boolean;
}

/**
 * Hook pour récupérer les settings d'un assistant
 */
export function useAssistantSettings(assistantId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['assistants', assistantId, 'settings'],
    queryFn: async () => {
      // ✅ Utilise l'instance globale prosperify
      const res = await prosperify.assistants.getV1Assistants(assistantId);

      const metadata = res?.data?.assistant?.metadata || {};
      const descriptionData = res?.data?.assistant?.description;

      let parsedMetadata = metadata;
      if (descriptionData) {
        try {
          parsedMetadata = JSON.parse(descriptionData);
        } catch {
          // Si description n'est pas JSON, utiliser comme instructions
          return {
            instructions: descriptionData,
            temperature: 0.5,
            precision: 0.5,
            notifications: false,
            externalSources: false,
          } as AssistantSettings;
        }
      }

      return {
        instructions: parsedMetadata.instructions || '',
        temperature: parsedMetadata.temperature || 0.5,
        precision: parsedMetadata.precision || 0.5,
        notifications: parsedMetadata.notifications || false,
        externalSources: parsedMetadata.externalSources || false,
      } as AssistantSettings;
    },
    enabled: !!assistantId && enabled,
    staleTime: 5 * 60 * 1000, // Cache 5 min
  });
}

/**
 * Hook pour mettre à jour les settings d'un assistant
 */
export function useUpdateAssistantSettings(assistantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: AssistantSettings) => {
      // ✅ Utilise l'instance globale prosperify
      const settingsData = JSON.stringify({
        instructions: settings.instructions,
        temperature: settings.temperature,
        precision: settings.precision,
        notifications: settings.notifications,
        externalSources: settings.externalSources,
      });

      await prosperify.assistants.putV1Assistants(assistantId, {
        description: settingsData,
      });

      return settings;
    },
    onSuccess: (updatedSettings) => {
      // ✅ Update optimiste du cache
      queryClient.setQueryData<AssistantSettings>(
        ['assistants', assistantId, 'settings'],
        updatedSettings
      );

      // ✅ Invalider aussi les autres caches liés
      queryClient.invalidateQueries({ queryKey: ['assistants', assistantId] });
    },
  });
}