export interface MetricsListParams {
  archived?: boolean;
  date?: {
    end?: string | number;
    start?: string | number;
  };
  limit?: number;
  offset?: number;
  organizationId?: string;
  resourceId?: string;
  resourceType?: 'apiKey' | 'assistant' | 'file' | 'member' | 'message' | 'thread';
  sort?: {
    by?: 'createdAt' | 'timestamp';
    order?: 'asc' | 'desc';
  };
  timestamp?: {
    max?: number;
    min?: number;
  };
}

// @deprecated Maintenu pour compatibilité : importer depuis ce fichier.
export type DeprecatedMetricsListParams = MetricsListParams;
