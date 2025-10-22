/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationsService {
    /**
     * @param requestBody Request body for creating a new organization
     * @returns any Organization Created Successfully
     * @throws ApiError
     */
    public static postV1OrganizationsNew(
        requestBody: {
            /**
             * Name of the organization
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
            url: '/v1/organizations/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Organization Authentication Failed`,
                500: `Organization Create Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Organization Deleted Successfully
     * @throws ApiError
     */
    public static deleteV1Organizations(
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
            url: '/v1/organizations/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Organization Authentication Failed`,
                404: `Organization Not Found`,
                500: `Organization Delete Failed`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody Request body for updating an existing organization
     * @returns any Organization Updated Successfully
     * @throws ApiError
     */
    public static putV1Organizations(
        id: string,
        requestBody?: {
            /**
             * New name for the organization
             */
            name?: string;
            /**
             * Whether the organization is allowed to exceed usage limits
             */
            overage?: boolean;
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
            url: '/v1/organizations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Organization Authentication Failed`,
                404: `Organization Not Found`,
                500: `Organization Update Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Organization Retrieved Successfully
     * @throws ApiError
     */
    public static getV1Organizations(
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
            url: '/v1/organizations/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Organization Authentication Failed`,
                404: `Organization Not Found`,
                500: `Organization Retrieve Failed`,
            },
        });
    }
    /**
     * @param id
     * @param userId
     * @returns any Member Removed Successfully
     * @throws ApiError
     */
    public static deleteV1OrganizationsMembersRemove(
        id: string,
        userId: string,
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
            url: '/v1/organizations/{id}/members/{userId}/remove',
            path: {
                'id': id,
                'userId': userId,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Organization Authentication Failed`,
                404: `Organization Not Found`,
                500: `Member Remove Failed`,
            },
        });
    }
}
