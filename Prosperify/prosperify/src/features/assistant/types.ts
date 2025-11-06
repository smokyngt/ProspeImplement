export interface AssistantSummary {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  object: 'assistant';
}

export interface AssistantSettings {
  instructions: string;
  temperature: number;
  precision: number;
  notifications: boolean;
  externalSources: boolean;
}

// @deprecated alias pour compatibilité.
export type DeprecatedAssistantSummary = AssistantSummary;
