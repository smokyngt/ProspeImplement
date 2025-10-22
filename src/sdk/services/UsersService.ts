/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @param requestBody Request body for creating a new user account
     * @returns any User created successfully
     * @throws ApiError
     */
    public static postV1UsersNew(
        requestBody: {
            /**
             * Email address for the new user (must be unique)
             */
            email: string;
            /**
             * Full display name for the new user
             */
            name: string;
            /**
             * Password for the new user account
             */
            password: string;
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
             * User entity representing a workspace member
             */
            user: {
                /**
                 * Whether the user account is archived
                 */
                archived: boolean;
                /**
                 * UNIX timestamp (ms) when the user was archived
                 */
                archivedAt?: number | null;
                /**
                 * UUID of the actor who archived the user
                 */
                archivedBy?: string | null;
                /**
                 * UNIX timestamp (ms) when the user was created
                 */
                createdAt: number;
                /**
                 * Primary email address
                 */
                email: string;
                /**
                 * Unique identifier for the user
                 */
                id: string;
                /**
                 * UUID of the inviter, if applicable
                 */
                invitedBy?: string | null;
                /**
                 * UNIX timestamp (ms) when the user joined the organization
                 */
                joinedAt?: number | null;
                /**
                 * UNIX timestamp (ms) of last successful login
                 */
                lastLoginAt?: number | null;
                /**
                 * UNIX timestamp (ms) of last token refresh
                 */
                lastRefreshAt?: number | null;
                /**
                 * Display name for the user
                 */
                name: string;
                /**
                 * Object type identifier
                 */
                object: 'user';
                /**
                 * UUID of the organization the user belongs to
                 */
                organization?: string | null;
                /**
                 * User interface preferences
                 */
                preferences?: {
                    /**
                     * Preferred language
                     */
                    language?: 'en' | 'fr';
                    /**
                     * Preferred theme
                     */
                    theme?: 'light' | 'dark';
                };
                /**
                 * Role identifiers assigned to the user
                 */
                roles: Array<string>;
                /**
                 * Whether the user email has been verified
                 */
                verified: boolean;
            };
        };
        event?: {
            code?: 'user.created';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                500: `User Create Failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for user authentication/login
     * @returns any User Authenticated Successfully
     * @throws ApiError
     */
    public static postV1UsersLogin(
        requestBody: {
            /**
             * User email address for authentication
             */
            email: string;
            /**
             * User password for authentication
             */
            password: string;
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
        data?: ({
            accessToken: string;
            refreshToken: string;
            /**
             * User entity representing a workspace member
             */
            user: {
                /**
                 * Whether the user account is archived
                 */
                archived: boolean;
                /**
                 * UNIX timestamp (ms) when the user was archived
                 */
                archivedAt?: number | null;
                /**
                 * UUID of the actor who archived the user
                 */
                archivedBy?: string | null;
                /**
                 * UNIX timestamp (ms) when the user was created
                 */
                createdAt: number;
                /**
                 * Primary email address
                 */
                email: string;
                /**
                 * Unique identifier for the user
                 */
                id: string;
                /**
                 * UUID of the inviter, if applicable
                 */
                invitedBy?: string | null;
                /**
                 * UNIX timestamp (ms) when the user joined the organization
                 */
                joinedAt?: number | null;
                /**
                 * UNIX timestamp (ms) of last successful login
                 */
                lastLoginAt?: number | null;
                /**
                 * UNIX timestamp (ms) of last token refresh
                 */
                lastRefreshAt?: number | null;
                /**
                 * Display name for the user
                 */
                name: string;
                /**
                 * Object type identifier
                 */
                object: 'user';
                /**
                 * UUID of the organization the user belongs to
                 */
                organization?: string | null;
                /**
                 * User interface preferences
                 */
                preferences?: {
                    /**
                     * Preferred language
                     */
                    language?: 'en' | 'fr';
                    /**
                     * Preferred theme
                     */
                    theme?: 'light' | 'dark';
                };
                /**
                 * Role identifiers assigned to the user
                 */
                roles: Array<string>;
                /**
                 * Whether the user email has been verified
                 */
                verified: boolean;
            };
        } | {
            success: any;
        });
        event?: ({
            code?: 'user.authenticated';
        } | {
            code?: 'auth.verification.email.sent';
        });
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Failed`,
            },
        });
    }
    /**
     * @param id Unique identifier of the user
     * @param requestBody Request body for updating user information
     * @returns any User updated successfully
     * @throws ApiError
     */
    public static putV1Users(
        id: string,
        requestBody?: {
            /**
             * New email address for the user (must be unique)
             */
            email?: string;
            /**
             * New display name for the user
             */
            name?: string;
            /**
             * New password for the user account
             */
            password?: string;
            /**
             * User preferences and settings
             */
            preferences?: {
                /**
                 * Preferred language code (ISO 639-1)
                 */
                language?: string;
                /**
                 * Preferred UI theme
                 */
                theme?: 'light' | 'dark' | 'auto';
            };
            /**
             * Whether the user email address has been verified
             */
            verified?: boolean;
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
            code?: 'user.updated';
        };
    })> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `User Authentication Failed`,
                404: `User Not Found`,
                500: `User Update Failed`,
            },
        });
    }
    /**
     * @param id Unique identifier of the user
     * @returns any User deleted successfully
     * @throws ApiError
     */
    public static deleteV1Users(
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
            code?: 'user.deleted';
        };
    })> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `User Authentication Failed`,
                404: `User Not Found`,
                500: `User Delete Failed`,
            },
        });
    }
    /**
     * @param id Unique identifier of the user
     * @returns any User retrieved successfully
     * @throws ApiError
     */
    public static getV1Users(
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
             * User entity representing a workspace member
             */
            user: {
                /**
                 * Whether the user account is archived
                 */
                archived: boolean;
                /**
                 * UNIX timestamp (ms) when the user was archived
                 */
                archivedAt?: number | null;
                /**
                 * UUID of the actor who archived the user
                 */
                archivedBy?: string | null;
                /**
                 * UNIX timestamp (ms) when the user was created
                 */
                createdAt: number;
                /**
                 * Primary email address
                 */
                email: string;
                /**
                 * Unique identifier for the user
                 */
                id: string;
                /**
                 * UUID of the inviter, if applicable
                 */
                invitedBy?: string | null;
                /**
                 * UNIX timestamp (ms) when the user joined the organization
                 */
                joinedAt?: number | null;
                /**
                 * UNIX timestamp (ms) of last successful login
                 */
                lastLoginAt?: number | null;
                /**
                 * UNIX timestamp (ms) of last token refresh
                 */
                lastRefreshAt?: number | null;
                /**
                 * Display name for the user
                 */
                name: string;
                /**
                 * Object type identifier
                 */
                object: 'user';
                /**
                 * UUID of the organization the user belongs to
                 */
                organization?: string | null;
                /**
                 * User interface preferences
                 */
                preferences?: {
                    /**
                     * Preferred language
                     */
                    language?: 'en' | 'fr';
                    /**
                     * Preferred theme
                     */
                    theme?: 'light' | 'dark';
                };
                /**
                 * Role identifiers assigned to the user
                 */
                roles: Array<string>;
                /**
                 * Whether the user email has been verified
                 */
                verified: boolean;
            };
        };
        event?: {
            code?: 'user.retrieved';
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `User Authentication Failed`,
                404: `User Not Found`,
                500: `User Retrieve Failed`,
            },
        });
    }
    /**
     * @param id Unique identifier of the user
     * @param requestBody Request body for adding a role to a user
     * @returns any User Role Added Successfully
     * @throws ApiError
     */
    public static postV1UsersRoles(
        id: string,
        requestBody: {
            /**
             * Unique identifier of the role to assign to the user
             */
            roleId: string;
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
            code?: 'user.role.added';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/{id}/roles',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `User Authentication Failed`,
                404: `User Not Found`,
                500: `User Role Add Failed`,
            },
        });
    }
    /**
     * @param id Unique identifier of the user
     * @param roleId Unique identifier of the role to remove from the user
     * @returns any User Role Removed Successfully
     * @throws ApiError
     */
    public static deleteV1UsersRoles(
        id: string,
        roleId: string,
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
            code?: 'user.role.removed';
        };
    })> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{id}/roles/{roleId}',
            path: {
                'id': id,
                'roleId': roleId,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `User Authentication Failed`,
                404: `User Not Found`,
            },
        });
    }
    /**
     * @param requestBody Request body for listing users with filtering and pagination
     * @returns any Users listed successfully
     * @throws ApiError
     */
    public static postV1UsersList(
        requestBody?: {
            /**
             * Maximum number of users to return
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
             * Filter users by role
             */
            roleId?: string;
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
            users: Array<{
                /**
                 * Whether the user account is archived
                 */
                archived: boolean;
                /**
                 * UNIX timestamp (ms) when the user was archived
                 */
                archivedAt?: number | null;
                /**
                 * UUID of the actor who archived the user
                 */
                archivedBy?: string | null;
                /**
                 * UNIX timestamp (ms) when the user was created
                 */
                createdAt: number;
                /**
                 * Primary email address
                 */
                email: string;
                /**
                 * Unique identifier for the user
                 */
                id: string;
                /**
                 * UUID of the inviter, if applicable
                 */
                invitedBy?: string | null;
                /**
                 * UNIX timestamp (ms) when the user joined the organization
                 */
                joinedAt?: number | null;
                /**
                 * UNIX timestamp (ms) of last successful login
                 */
                lastLoginAt?: number | null;
                /**
                 * UNIX timestamp (ms) of last token refresh
                 */
                lastRefreshAt?: number | null;
                /**
                 * Display name for the user
                 */
                name: string;
                /**
                 * Object type identifier
                 */
                object: 'user';
                /**
                 * UUID of the organization the user belongs to
                 */
                organization?: string | null;
                /**
                 * User interface preferences
                 */
                preferences?: {
                    /**
                     * Preferred language
                     */
                    language?: 'en' | 'fr';
                    /**
                     * Preferred theme
                     */
                    theme?: 'light' | 'dark';
                };
                /**
                 * Role identifiers assigned to the user
                 */
                roles: Array<string>;
                /**
                 * Whether the user email has been verified
                 */
                verified: boolean;
            }>;
        };
        event?: {
            code?: 'users.listed';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @param id Unique identifier of the user
     * @returns any User Scopes Retrieved Successfully
     * @throws ApiError
     */
    public static getV1UsersScopes(
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
             * Array of permission scopes assigned to this user
             */
            scopes: Array<'owner' | 'organization' | 'assistants' | 'roles' | 'members' | 'logs' | 'apiKeys' | 'invitations'>;
        };
        event?: {
            code?: 'user.scopes.retrieved';
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{id}/scopes',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `User Authentication Failed`,
                404: `User Not Found`,
                500: `User Retrieve Failed`,
            },
        });
    }
}
