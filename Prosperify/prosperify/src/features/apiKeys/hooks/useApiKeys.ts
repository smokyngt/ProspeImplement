import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import {
  type ApiKey,
  type ApiKeyListParams,
  type ApiKeyMutationPayload,
  type ApiKeyScope,
  type AssistantScope,
} from '@/features/apiKeys/types';

// @deprecated Les types sont désormais centralisés dans '@/features/apiKeys/types'.
export type {
  ApiKey,
  ApiKeyScope,
  AssistantScope,
  ApiKeyListParams,
  ApiKeyMutationPayload,
} from '@/features/apiKeys/types';

export const apiKeyKeys = {
  all: ['apiKeys'] as const,
  list: (params: ApiKeyListParams = {}) =>
    ['apiKeys', 'list', params] as const,
  detail: (id: string) => ['apiKeys', 'detail', id] as const,
};

/**
 * Récupère la liste des clés API en respectant le pattern de `useAssistants`.
 * @param params Filtres de pagination/tri.
 */
export function useApiKeys(params: ApiKeyListParams = {}) {
  return useQuery({
    queryKey: apiKeyKeys.list(params),
    queryFn: async () => {
      const response = await prosperify.apiKeys.postV1KeysList(params); // ✅ updated: direct SDK call
      return {
        items: (response.data?.apiKeys ?? []) as ApiKey[],
        total: response.data?.total ?? response.data?.apiKeys?.length ?? 0,
        eventMessage: response.eventMessage,
      };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Récupère une clé API spécifique.
 * @param id Identifiant de la clé.
 * @param enabled Permet de désactiver la requête conditionnellement.
 */
export function useApiKey(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: apiKeyKeys.detail(id),
    queryFn: async () => {
      const response = await prosperify.apiKeys.getV1Keys(id); // ✅ updated: direct SDK call
      return (response.data?.apiKey ?? null) as ApiKey | null;
    },
    enabled: Boolean(id) && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Crée une nouvelle clé API et synchronise le cache.
 */
export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ApiKeyMutationPayload) => {
      const response = await prosperify.apiKeys.postV1KeysNew(payload); // ✅ updated: direct SDK call
      if (!response.data?.apiKey) {
        throw new Error('Prosperify API did not return the created API key.');
      }
      return response.data.apiKey as ApiKey;
    },
    onSuccess: (createdKey) => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.all });
      queryClient.setQueryData<ApiKey>(apiKeyKeys.detail(createdKey.id), createdKey);
    },
  });
}

/**
 * Supprime une clé API et nettoie les caches associés.
 */
export function useDeleteApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await prosperify.apiKeys.deleteV1Keys(id); // ✅ updated: direct SDK call
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.removeQueries({ queryKey: apiKeyKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.all });
    },
  });
}

/**
 * Copie la clé API fournie dans le presse-papiers.
 */
export function useCopyApiKey() {
  return useMutation({
    mutationFn: async (key: string) => {
      await navigator.clipboard.writeText(key);
      return key;
    },
  });
}
