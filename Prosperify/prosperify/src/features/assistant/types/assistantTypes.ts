// ========================================
// ENTITÉS DOMAINE
// ========================================
export interface AssistantSummary {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  object: 'assistant';
}

export interface AssistantDetail extends AssistantSummary {
  instructions?: string;
  metadata?: Record<string, any>;
  model?: string;
  tools?: Array<{ type: string }>;
}

export interface AssistantSettings {
  instructions: string;
  temperature: number;
  precision: number;
  notifications: boolean;
  externalSources: boolean;
}

// ========================================
// RÉPONSES API
// ========================================
export interface AssistantsListResponse {
  assistants: AssistantSummary[];
  total?: number;
  hasMore?: boolean;
}

export interface AssistantDetailResponse {
  assistant: AssistantDetail;
}

export interface AssistantCreateResponse {
  assistant: AssistantSummary;
}

// ========================================
// PAYLOADS
// ========================================
export interface AssistantCreatePayload {
  name: string;
  description?: string;
  instructions?: string;
}

export interface AssistantUpdatePayload {
  name?: string;
  description?: string;
}

export interface AssistantListParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
}

// ========================================
// MÉTRIQUES
// ========================================
export interface Metric {
  name: string;
  value?: number | string | undefined;
  delta?: number | undefined;
}

export interface MetricsListResponse {
  items: Metric[];
  total?: number;
}

export interface MetricsMap {
  [key: string]: Metric;
}

// ========================================
// @deprecated (compatibilité)
// ========================================
export type DeprecatedAssistantSummary = AssistantSummary;