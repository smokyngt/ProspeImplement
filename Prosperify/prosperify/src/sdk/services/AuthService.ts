/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param organizationId
     * @param mode
     * @param state
     * @returns any SSO Started Successfully
     * @throws ApiError
     */
    public static getV1AuthSsoStart(
        organizationId: string,
        mode?: 'json' | 'redirect',
        state?: string,
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
            enabled: boolean;
        } | {
            authorizationUrl: string;
            enabled: boolean;
            /**
             * Signed state token that must be provided to the callback.
             */
            state: string;
        });
        event?: {
            code?: 'auth.sso.authorization.url.generated';
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/auth/sso/{organizationId}/start',
            path: {
                'organizationId': organizationId,
            },
            query: {
                'mode': mode,
                'state': state,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Error`,
                403: `Authorization Error`,
                500: `SSO start operation failed`,
            },
        });
    }
    /**
     * @param code
     * @param state
     * @param organizationId
     * @returns any SSO Callback Processed Successfully
     * @throws ApiError
     */
    public static getV1AuthSsoCallback(
        code: string,
        state: string,
        organizationId: string,
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
        };
        event?: {
            code?: 'auth.sso.authorization.successful';
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/auth/sso/{organizationId}/callback',
            path: {
                'organizationId': organizationId,
            },
            query: {
                'code': code,
                'state': state,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Error`,
                403: `Authorization Error`,
                500: `SSO callback operation failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for email verification
     * @returns any Email Verified Successfully
     * @throws ApiError
     */
    public static postV1AuthEmailVerify(
        requestBody: {
            /**
             * Email address to verify
             */
            email: string;
            /**
             * One-time password received via email
             */
            otp: string;
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
            success: boolean;
        };
        event?: {
            code?: 'auth.email.verified';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/email/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Error`,
                403: `Authorization Error`,
                500: `Email verification operation failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for sending email verification
     * @returns any Verification Email Sent Successfully
     * @throws ApiError
     */
    public static postV1AuthEmailSend(
        requestBody: {
            /**
             * Email address to send verification email to
             */
            email: string;
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
            code?: 'auth.verification.email.sent';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/email/send',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Error`,
                403: `Authorization Error`,
                500: `Email send operation failed`,
            },
        });
    }
    /**
     * @param token
     * @param requestBody Request body for resetting user password
     * @returns any Password Reset Successfully
     * @throws ApiError
     */
    public static postV1AuthPasswordReset(
        token: string,
        requestBody: {
            /**
             * New password for the user account
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
            code?: 'auth.password.reset.successful';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/password/reset/{token}',
            path: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Error`,
                403: `Authorization Error`,
                500: `Password reset operation failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for sending email verification
     * @returns any Password Reset Email Sent Successfully
     * @throws ApiError
     */
    public static postV1AuthPasswordSend(
        requestBody: {
            /**
             * Email address to send verification email to
             */
            email: string;
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
            code?: 'auth.verification.email.sent';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/password/send',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Error`,
                403: `Authorization Error`,
                500: `Password reset email send operation failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for refreshing access token
     * @returns any Token Refreshed Successfully
     * @throws ApiError
     */
    public static postV1AuthTokenRefresh(
        requestBody: {
            /**
             * Valid refresh token to exchange for new access token
             */
            refreshToken: string;
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
             * New access token for API authentication
             */
            accessToken: string;
        };
        event?: {
            code?: 'auth.token.refreshed';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/token/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Error`,
                403: `Authorization Error`,
                500: `Token refresh operation failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for revoking user tokens
     * @returns any Token Revoked Successfully
     * @throws ApiError
     */
    public static postV1AuthTokenRevoke(
        requestBody: {
            /**
             * UUID of the user whose tokens to revoke
             */
            userId: string;
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
            code?: 'auth.token.revoked';
        };
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/token/revoke',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Authentication Error`,
                403: `Authorization Error`,
                500: `Token revoke operation failed`,
            },
        });
    }
}
