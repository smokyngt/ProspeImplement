/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesService {
    /**
     * @param requestBody Request body for creating a role
     * @returns any Role Created Successfully
     * @throws ApiError
     */
    public static postV1RolesNew(
        requestBody: {
            /**
             * Assistant-specific permissions to grant
             */
            assistants?: Array<{
                id: string;
                scopes: Array<'files' | 'messages'>;
            }>;
            /**
             * Name of the role
             */
            name: string;
            scopes?: Array<'owner' | 'organization' | 'assistants' | 'roles' | 'members' | 'logs' | 'apiKeys' | 'invitations'>;
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
             * Role entity defining workspace permissions
             */
            role: {
                /**
                 * Assistant-specific permissions associated with the role
                 */
                assistants?: Array<{
                    id: string;
                    scopes: Array<'files' | 'messages'>;
                }>;
                /**
                 * UNIX timestamp (ms) when the role was created
                 */
                createdAt: number;
                /**
                 * UUID of the user or key that created the role
                 */
                createdBy: string;
                /**
                 * Unique identifier for the role
                 */
                id: string;
                /**
                 * Display name for the role
                 */
                name: string;
                /**
                 * Object type identifier
                 */
                object: 'role';
                /**
                 * UUID of the organization that owns the role
                 */
                organization: string;
                /**
                 * Global scopes granted by the role
                 */
                scopes?: Array<'owner' | 'organization' | 'assistants' | 'roles' | 'members' | 'logs' | 'apiKeys' | 'invitations'>;
            };
        };
        event?: {
            code?: 'role.created';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/roles/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Role Authentication Failed`,
                500: `Role Create Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Role Deleted Successfully
     * @throws ApiError
     */
    public static deleteV1Roles(
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
        /**
         * Simple success response for operations that do not return data
         */
        data?: {
            /**
             * Boolean flag indicating the operation completed successfully
             */
            success: boolean;
        };
        event?: {
            code?: 'role.deleted';
        };
    })> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/roles/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Role Authentication Failed`,
                404: `Role Not Found`,
                500: `Role Delete Failed`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody Request body for updating an existing role
     * @returns any Role Updated Successfully
     * @throws ApiError
     */
    public static putV1Roles(
        id: string,
        requestBody?: {
            /**
             * Assistant-specific permissions
             */
            assistants?: Array<{
                id: string;
                scopes: Array<'files' | 'messages'>;
            }>;
            /**
             * Updated role name
             */
            name?: string;
            scopes?: Array<'owner' | 'organization' | 'assistants' | 'roles' | 'members' | 'logs' | 'apiKeys' | 'invitations'>;
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
         * Simple success response for operations that do not return data
         */
        data?: {
            /**
             * Boolean flag indicating the operation completed successfully
             */
            success: boolean;
        };
        event?: {
            code?: 'role.updated';
        };
    })> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/roles/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Role Authentication Failed`,
                404: `Role Not Found`,
                500: `Role Update Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Role Retrieved Successfully
     * @throws ApiError
     */
    public static getV1Roles(
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
             * Role entity defining workspace permissions
             */
            role: {
                /**
                 * Assistant-specific permissions associated with the role
                 */
                assistants?: Array<{
                    id: string;
                    scopes: Array<'files' | 'messages'>;
                }>;
                /**
                 * UNIX timestamp (ms) when the role was created
                 */
                createdAt: number;
                /**
                 * UUID of the user or key that created the role
                 */
                createdBy: string;
                /**
                 * Unique identifier for the role
                 */
                id: string;
                /**
                 * Display name for the role
                 */
                name: string;
                /**
                 * Object type identifier
                 */
                object: 'role';
                /**
                 * UUID of the organization that owns the role
                 */
                organization: string;
                /**
                 * Global scopes granted by the role
                 */
                scopes?: Array<'owner' | 'organization' | 'assistants' | 'roles' | 'members' | 'logs' | 'apiKeys' | 'invitations'>;
            };
        };
        event?: {
            code?: 'role.retrieved';
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/roles/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Role Authentication Failed`,
                404: `Role Not Found`,
                500: `Role Retrieve Failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for listing roles with pagination
     * @returns any Roles Listed Successfully
     * @throws ApiError
     */
    public static postV1RolesList(
        requestBody?: {
            /**
             * Maximum number of roles to return
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
             * Filter roles created by a specific user
             */
            userId?: string;
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
            roles: Array<{
                /**
                 * Assistant-specific permissions associated with the role
                 */
                assistants?: Array<{
                    id: string;
                    scopes: Array<'files' | 'messages'>;
                }>;
                /**
                 * UNIX timestamp (ms) when the role was created
                 */
                createdAt: number;
                /**
                 * UUID of the user or key that created the role
                 */
                createdBy: string;
                /**
                 * Unique identifier for the role
                 */
                id: string;
                /**
                 * Display name for the role
                 */
                name: string;
                /**
                 * Object type identifier
                 */
                object: 'role';
                /**
                 * UUID of the organization that owns the role
                 */
                organization: string;
                /**
                 * Global scopes granted by the role
                 */
                scopes?: Array<'owner' | 'organization' | 'assistants' | 'roles' | 'members' | 'logs' | 'apiKeys' | 'invitations'>;
            }>;
        };
        event?: {
            code?: 'roles.listed';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/roles/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Role Authentication Failed`,
                500: `Role List Failed`,
            },
        });
    }
}
