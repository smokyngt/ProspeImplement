/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiKeysService {
    /**
     * @param requestBody Request body for creating a new API key
     * @returns any Default Response
     * @throws ApiError
     */
    public static postV1KeysNew(
        requestBody: {
            /**
             * Assistant-level access to grant the key
             */
            assistants?: Array<{
                id: string;
                scopes: Array<'files' | 'messages'>;
            }>;
            /**
             * Display name for the API key
             */
            name: string;
            /**
             * Array of permission scopes to grant to this API key
             */
            scopes?: Array<'assistants' | 'logs'>;
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
        data?: {
            /**
             * API Key entity
             */
            apiKey: {
                /**
                 * Assistant-level access granted to the API key
                 */
                assistants?: Array<{
                    id: string;
                    scopes: Array<'files' | 'messages'>;
                }>;
                /**
                 * UNIX timestamp when the API key was created
                 */
                createdAt: number;
                /**
                 * UUID of the user who created this API key
                 */
                createdBy: string;
                /**
                 * Unique identifier for the API key
                 */
                id: string;
                /**
                 * Display name of the API key
                 */
                name: string;
                /**
                 * Object type identifier for this entity
                 */
                object: 'apiKey';
                /**
                 * UUID of the organization this API key is associated with
                 */
                organization: string;
                /**
                 * Array of global scopes granted to this API key
                 */
                scopes?: Array<'assistants' | 'logs'>;
            };
        };
        event?: {
            code?: 'api_key.created';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/keys/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Default Response`,
                401: `Default Response`,
                404: `Default Response`,
                500: `Default Response`,
            },
        });
    }
    /**
     * @param id Unique identifier of the API key
     * @returns any API Key Retrieved Successfully
     * @throws ApiError
     */
    public static getV1Keys(
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
            url: '/v1/keys/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `API Key Authentication Failed`,
                404: `API Key Not Found`,
                500: `API Key Operation Failed`,
            },
        });
    }
    /**
     * @param id Unique identifier of the API key
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteV1Keys(
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
            url: '/v1/keys/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Default Response`,
                401: `Default Response`,
                404: `Default Response`,
                500: `Default Response`,
            },
        });
    }
    /**
     * @param requestBody Request body for listing API keys with filtering and pagination
     * @returns any Default Response
     * @throws ApiError
     */
    public static postV1KeysList(
        requestBody?: {
            /**
             * Date range filter for API key creation
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
             * Maximum number of API keys to return
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
            url: '/v1/keys/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Default Response`,
                401: `Default Response`,
                404: `Default Response`,
                500: `Default Response`,
            },
        });
    }
}
