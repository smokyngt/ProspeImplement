export interface StandardResponse<T> {
  event: {
    code: string;
    correlationId: string;
    metadata?: Record<string, any>;
    payload?: Record<string, any>;
  };
  timestamp: number;
  data: T;
}

export interface ErrorResponse {
  code: string;
  status: number;
  timestamp: number;
  message: string;
  correlationId: string;
  instance: string;
  metadata?: Record<string, any>;
}

export interface ValidationErrorResponse extends ErrorResponse {
  validation_errors: Array<{
    code: string;
    path: string;
    params: Record<string, any>;
  }>;
}