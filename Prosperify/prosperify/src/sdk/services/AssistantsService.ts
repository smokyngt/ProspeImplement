/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AssistantsService {
    /**
     * @param requestBody Request body for creating a new assistant
     * @returns any Assistant Created Successfully
     * @throws ApiError
     */
    public static postV1AssistantsNew(
        requestBody: {
            /**
             * Display name for the assistant
             */
            name: string;
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
            url: '/v1/assistants/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Assistant Authentication Failed`,
                404: `Assistant Not Found`,
                500: `Assistant Create Failed`,
            },
        });
    }
    /**
     * @param id Unique identifier of the assistant
     * @returns any Assistant Retrieved Successfully
     * @throws ApiError
     */
    public static getV1Assistants(
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
            url: '/v1/assistants/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Unauthorized`,
                404: `Assistant not found`,
                500: `Assistant Retrieve Failed`,
            },
        });
    }
    /**
     * @param id Unique identifier of the assistant
     * @returns any Assistant deleted
     * @throws ApiError
     */
    public static deleteV1Assistants(
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
            url: '/v1/assistants/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Validation error`,
                401: `Unauthorized`,
                404: `Assistant not found`,
                500: `Assistant deletion error`,
            },
        });
    }
    /**
     * @param id Unique identifier of the assistant
     * @param requestBody Request body for updating an assistant
     * @returns any Assistant Updated Successfully
     * @throws ApiError
     */
    public static putV1Assistants(
        id: string,
        requestBody?: {
            /**
             * Description of the assistant
             */
            description?: string;
            /**
             * Display name for the assistant
             */
            name?: string;
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
            method: 'PUT',
            url: '/v1/assistants/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Unauthorized`,
                404: `Assistant not found`,
                500: `Assistant update error`,
            },
        });
    }
    /**
     * @param requestBody Request body for listing assistants with pagination
     * @returns any Assistants Listed Successfully
     * @throws ApiError
     */
    public static postV1AssistantsList(
        requestBody?: {
            /**
             * Maximum number of assistants to return
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
            url: '/v1/assistants/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Unauthorized`,
                404: `Assistant not found`,
                500: `Assistant List Failed`,
            },
        });
    }
}
