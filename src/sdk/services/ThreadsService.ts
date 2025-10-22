/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ThreadsService {
    /**
     * @param requestBody Request body for creating a new conversation thread
     * @returns any Thread created successfully
     * @throws ApiError
     */
    public static postV1ThreadsNew(
        requestBody: {
            /**
             * UUID of the assistant to create a thread with
             */
            assistantId: string;
        },
    ): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/threads/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Thread Authentication Failed`,
                500: `Thread Create Failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for listing conversation threads with filtering and pagination
     * @returns any Threads Listed Successfully
     * @throws ApiError
     */
    public static postV1ThreadsList(
        requestBody?: {
            /**
             * UUID of the assistant to filter threads by
             */
            assistantId?: string;
            /**
             * Date range filter for thread creation
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
             * Maximum number of threads to return per page
             */
            limit?: number;
            /**
             * Sort order for the results
             */
            order?: 'asc' | 'desc';
            /**
             * Page number for pagination (1-based)
             */
            page?: number;
            /**
             * UUID of the user to filter threads by
             */
            userId?: string;
        },
    ): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/threads/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Thread Authentication Failed`,
                500: `Thread List Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Thread Retrieved Successfully
     * @throws ApiError
     */
    public static getV1Threads(
        id: string,
    ): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/threads/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Thread Authentication Failed`,
                404: `Thread Not Found`,
                500: `Thread Retrieve Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Thread Deleted Successfully
     * @throws ApiError
     */
    public static deleteV1Threads(
        id: string,
    ): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/threads/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Thread Authentication Failed`,
                404: `Thread Not Found`,
                500: `Thread Delete Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Thread Archived Successfully
     * @throws ApiError
     */
    public static postV1ThreadsArchive(
        id: string,
    ): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/threads/{id}/archive',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Thread Authentication Failed`,
                404: `Thread Not Found`,
                500: `Thread Archive Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Thread Restored Successfully
     * @throws ApiError
     */
    public static postV1ThreadsRestore(
        id: string,
    ): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/threads/{id}/restore',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Thread Authentication Failed`,
                404: `Thread Not Found`,
                500: `Thread Restore Failed`,
            },
        });
    }
}
