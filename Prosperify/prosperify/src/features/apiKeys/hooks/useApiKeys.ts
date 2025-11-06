import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';

export type ApiKeyScope = 'assistants' | 'logs';
export type AssistantScope = 'files' | 'messages';

export interface ApiKey {
  id: string;
  name: string;
  scopes?: ApiKeyScope[];
  assistants?: Array<{
    id: string;
    scopes: AssistantScope[];
  }>;
  organization: string;
  createdBy: string;
  createdAt: number;
  object: 'apiKey';
}

interface FetchApiKeysParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
  date?: {
    start?: string | number;
    end?: string | number;
  };
}

/**
 * Hook pour récupérer toutes les API Keys
 */
export function useApiKeys(params: FetchApiKeysParams = {}) {
  return useQuery({
    queryKey: ['apiKeys', params],
    queryFn: async () => {
      const res = await prosperify.apiKeys.postV1KeysList(params);
      return (res?.data?.apiKeys || []) as ApiKey[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook pour récupérer une API Key par ID
 */
export function useApiKey(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['apiKeys', id],
    queryFn: async () => {
      const res = await prosperify.apiKeys.getV1Keys(id);
      return res?.data?.apiKey as ApiKey;
    },
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook pour créer une nouvelle API Key
 */
export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      scopes,
      assistants,
    }: {
      name: string;
      scopes?: ApiKeyScope[];
      assistants?: Array<{ id: string; scopes: AssistantScope[] }>;
    }) => {
      const res = await prosperify.apiKeys.postV1KeysNew({
        name,
        scopes,
        assistants,
      });

      if (!res?.data?.apiKey) {
        throw new Error('Invalid response from server');
      }

      return res.data.apiKey as ApiKey;
    },
    onSuccess: (newKey) => {
      // ✅ Invalider la liste pour forcer un refetch
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });

      // ✅ Ajouter au cache
      queryClient.setQueryData<ApiKey>(['apiKeys', newKey.id], newKey);
    },
  });
}

/**
 * Hook pour supprimer une API Key
 */
export function useDeleteApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await prosperify.apiKeys.deleteV1Keys(id);
      return id;
    },
    onSuccess: (deletedId) => {
      // ✅ Retirer du cache
      queryClient.removeQueries({ queryKey: ['apiKeys', deletedId] });

      // ✅ Invalider la liste
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
    },
  });
}

/**
 * Hook pour copier une clé API dans le presse-papiers
 */
export function useCopyApiKey() {
  return useMutation({
    mutationFn: async (key: string) => {
      await navigator.clipboard.writeText(key);
      return key;
    },
  });
}