/**
 * Common types used across the Prosperify SDK
 * Based on the OpenAPI 3.0.3 specification
 */

/**
 * Event information describing the operation performed
 */
export interface ProsperifyEvent {
  /** Event code identifying the specific operation that occurred */
  code: string;
  /** Unique correlation ID linking this event to the original request for tracing */
  correlationId?: string;
  /** Event-specific metadata providing additional context */
  metadata?: Record<string, unknown>;
  /** Event payload containing detailed information about the event */
  payload?: Record<string, unknown>;
}

/**
 * Standard response envelope containing event information and data payload
 */
export interface ProsperifyResponse<T = unknown> {
  /** Response data payload containing the actual response content */
  data: T;
  /** Event information */
  event: ProsperifyEvent;
  /** UNIX timestamp when the response was generated */
  timestamp: number;
}

/**
 * Individual field validation error
 */
export interface ValidationErrorDetail {
  /** Specific validation error code for this field */
  code: string;
  /** JSON path to the field that failed validation */
  path: string;
  /** Validation parameters providing context for the error */
  params: Record<string, unknown>;
}

/**
 * Error-specific metadata providing additional context
 */
export interface ProsperifyErrorMetadata {
  /** Array of field-level validation errors */
  validation_errors?: ValidationErrorDetail[];
  /** Additional dynamic metadata fields */
  [key: string]: unknown;
}

/**
 * Standard error response structure
 */
export interface ErrorResponse {
  /** Error code identifying the specific error type */
  code: string;
  /** HTTP status code indicating the type of error */
  status: number;
  /** UNIX timestamp when the error occurred */
  timestamp: number;
  /** Human readable error message explaining what went wrong */
  message?: string;
  /** Request path where the error occurred */
  instance?: string;
  /** Error-specific metadata providing additional context */
  metadata?: ProsperifyErrorMetadata;
  /** Unique correlation ID linking this error to the original request for tracing */
  correlationId?: string;
  /** Error stack trace (only included in development environments) */
  stack?: string;
}

/**
 * Pagination parameters for list operations
 */
export interface PaginationParams {
  /** Number of items to return per page */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
  /** Cursor for cursor-based pagination */
  cursor?: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  /** Array of items */
  items: T[];
  /** Total count of items available */
  total: number;
  /** Whether there are more items available */
  hasMore: boolean;
  /** Cursor for next page */
  nextCursor?: string;
}

/**
 * Legacy pagination interface for backward compatibility
 */
export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Sort options for list operations
 */
export interface SortOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}