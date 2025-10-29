/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InvitationsService {
    /**
     * @param requestBody Request body for creating a new invitation
     * @returns any Invitation Created Successfully
     * @throws ApiError
     */
    public static postV1InvitationsNew(
        requestBody?: {
            /**
             * Expiration time in seconds from creation (optional)
             */
            expiresIn?: number;
            /**
             * Maximum number of times this invitation can be used (optional)
             */
            maxUsage?: number;
            /**
             * Array of role IDs to assign to the invited user
             */
            roles?: Array<string>;
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
            url: '/v1/invitations/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Invitation Authentication Failed`,
                500: `Invitation Create Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Invitation Deleted Successfully
     * @throws ApiError
     */
    public static deleteV1Invitations(
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
            url: '/v1/invitations/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Invitation Authentication Failed`,
                404: `Invitation Not Found`,
                500: `Invitation Delete Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Invitation Retrieved Successfully
     * @throws ApiError
     */
    public static getV1Invitations(
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
            url: '/v1/invitations/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Invitation Authentication Failed`,
                404: `Invitation Not Found`,
                500: `Invitation Retrieve Failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for listing invitations with filtering and pagination
     * @returns any Invitations Listed Successfully
     * @throws ApiError
     */
    public static postV1InvitationsList(
        requestBody?: {
            /**
             * Date range filter for invitation creation
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
             * Maximum number of invitations to return per page
             */
            limit?: number;
            /**
             * Sort order for the results
             */
            order?: 'asc' | 'desc';
            /**
             * UUID of the organization to list invitations for
             */
            organizationId?: string;
            /**
             * Page number for pagination (1-based)
             */
            page?: number;
            /**
             * UUID of the user to filter invitations by (optional)
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
            url: '/v1/invitations/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Invitation Authentication Failed`,
                500: `Invitation List Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Invitation Accepted Successfully
     * @throws ApiError
     */
    public static getV1InvitationsAccept(
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
            url: '/v1/invitations/accept/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Invitation Authentication Failed`,
                404: `Invitation Not Found`,
                500: `Invitation Accept Failed`,
            },
        });
    }
}
