/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MetricsService {
    /**
     * @param requestBody Request body for listing metrics with filtering and pagination
     * @returns any Metrics listed successfully
     * @throws ApiError
     */
    public static postV1MetricsList(
        requestBody?: {
            /**
             * Filter for archived metrics. Defaults to false (non-archived only)
             */
            archived?: boolean;
            /**
             * Date range filter for metric timestamps
             */
            date?: {
                /**
                 * End date for filtering (ISO string, timestamp, or Date)
                 */
                end?: (string | number);
                /**
                 * Start date for filtering (ISO string, timestamp, or Date)
                 */
                start?: (string | number);
            };
            /**
             * Maximum number of metrics to return per page
             */
            limit?: number;
            /**
             * Number of metrics to skip for pagination
             */
            offset?: number;
            /**
             * UUID of the organization to list metrics for (must match authenticated user/API key organization)
             */
            organizationId?: string;
            /**
             * Filter metrics by specific resource ID
             */
            resourceId?: string;
            /**
             * Filter metrics by resource type
             */
            resourceType?: 'apiKey' | 'assistant' | 'file' | 'member' | 'message' | 'thread';
            /**
             * Sorting configuration for the results
             */
            sort?: {
                /**
                 * Field to sort by
                 */
                by?: 'createdAt' | 'timestamp';
                /**
                 * Sort order
                 */
                order?: 'asc' | 'desc';
            };
            /**
             * Timestamp range filter for metric events
             */
            timestamp?: {
                /**
                 * Maximum timestamp (Unix timestamp in milliseconds)
                 */
                max?: number;
                /**
                 * Minimum timestamp (Unix timestamp in milliseconds)
                 */
                min?: number;
            };
        },
    ): CancelablePromise<({
        /**
         * Response data payload containing the actual response content
         */
        data?: Record<string, any>;
        /**
         * Event information describing the operation performed
         */
        event: {
            /**
             * Event code identifying the specific operation that occurred
             */
            code: string;
            /**
             * Unique correlation ID linking this event to the original request for tracing
             */
            correlationId?: string;
            /**
             * Event-specific metadata providing additional context
             */
            metadata?: Record<string, any>;
            /**
             * Event payload containing detailed information about the event
             */
            payload?: Record<string, any>;
        };
        /**
         * UNIX timestamp when the response was generated
         */
        timestamp: number;
    } & {
        /**
         * Paginated list of metrics with metadata
         */
        data: {
            /**
             * Maximum number of metrics returned in this page
             */
            limit: number;
            /**
             * Array of metric objects
             */
            metrics: Array<{
                /**
                 * Whether the metric is archived
                 */
                archived?: boolean;
                /**
                 * UNIX timestamp (ms) when the metric was archived
                 */
                archivedAt?: number;
                /**
                 * ID of the user or API key that archived the metric
                 */
                archivedBy?: string;
                /**
                 * UNIX timestamp when the metric was created
                 */
                createdAt: number;
                /**
                 * Unique identifier for the metric
                 */
                id: string;
                /**
                 * Additional metadata associated with the metric
                 */
                metadata: Record<string, any>;
                /**
                 * Object type identifier
                 */
                object: 'metric';
                /**
                 * ID of the organization this metric belongs to
                 */
                organization: string;
                /**
                 * ID of the resource this metric is associated with
                 */
                resourceId: string;
                /**
                 * Type of resource this metric is associated with
                 */
                resourceType: 'apiKey' | 'assistant' | 'file' | 'member' | 'message' | 'thread';
                /**
                 * UNIX timestamp (ms) when the metric was recorded
                 */
                timestamp: number;
            }>;
            /**
             * Number of metrics skipped for pagination
             */
            offset: number;
            /**
             * Total number of metrics matching the filters
             */
            total: number;
        };
        event?: {
            code?: 'metrics.listed';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/metrics/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param id Unique identifier of the metric
     * @returns any Metric retrieved successfully
     * @throws ApiError
     */
    public static getV1Metrics(
        id: string,
    ): CancelablePromise<({
        /**
         * Response data payload containing the actual response content
         */
        data?: Record<string, any>;
        /**
         * Event information describing the operation performed
         */
        event: {
            /**
             * Event code identifying the specific operation that occurred
             */
            code: string;
            /**
             * Unique correlation ID linking this event to the original request for tracing
             */
            correlationId?: string;
            /**
             * Event-specific metadata providing additional context
             */
            metadata?: Record<string, any>;
            /**
             * Event payload containing detailed information about the event
             */
            payload?: Record<string, any>;
        };
        /**
         * UNIX timestamp when the response was generated
         */
        timestamp: number;
    } & {
        data?: {
            /**
             * Metric object representing a single measurement or event
             */
            metric: {
                /**
                 * Whether the metric is archived
                 */
                archived?: boolean;
                /**
                 * UNIX timestamp (ms) when the metric was archived
                 */
                archivedAt?: number;
                /**
                 * ID of the user or API key that archived the metric
                 */
                archivedBy?: string;
                /**
                 * UNIX timestamp when the metric was created
                 */
                createdAt: number;
                /**
                 * Unique identifier for the metric
                 */
                id: string;
                /**
                 * Additional metadata associated with the metric
                 */
                metadata: Record<string, any>;
                /**
                 * Object type identifier
                 */
                object: 'metric';
                /**
                 * ID of the organization this metric belongs to
                 */
                organization: string;
                /**
                 * ID of the resource this metric is associated with
                 */
                resourceId: string;
                /**
                 * Type of resource this metric is associated with
                 */
                resourceType: 'apiKey' | 'assistant' | 'file' | 'member' | 'message' | 'thread';
                /**
                 * UNIX timestamp (ms) when the metric was recorded
                 */
                timestamp: number;
            };
        };
        event?: {
            code?: 'metric.retrieved';
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/metrics/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Unauthorized`,
                404: `Metric Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
