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

export interface ApiKeyListParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
  date?: {
    start?: string | number;
    end?: string | number;
  };
}

export interface ApiKeyMutationPayload {
  name: string;
  scopes?: ApiKeyScope[];
  assistants?: Array<{ id: string; scopes: AssistantScope[] }>;
}

// @deprecated Conserver pour rétro-compatibilité locale :
// préférez importer directement depuis ce module plutôt que depuis les hooks.
export type DeprecatedApiKeyScope = ApiKeyScope;
