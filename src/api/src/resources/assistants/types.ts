/** Requête de création d’assistant */
export interface CreateAssistantRequest {
  name: string;
}

/** Entité Assistant */
export interface Assistant {
  id: string;
  name: string;
  object: "assistant";
  organization: string;
  createdAt: number;
  createdBy: string;
}

/** Enveloppe de réponse complète pour les endpoints assistants */
export interface AssistantResponse {
  data: {
    assistant: Assistant;
  };
  event: {
    code: string;
    correlationId?: string;
    metadata?: Record<string, any>;
    payload?: Record<string, any>;
  };
  timestamp: number;
}
