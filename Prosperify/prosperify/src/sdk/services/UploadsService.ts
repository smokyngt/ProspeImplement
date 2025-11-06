/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UploadsService {
    /**
     * @param requestBody Request body for uploading text content
     * @returns any Text uploaded successfully
     * @throws ApiError
     */
    public static postV1UploadsText(
        requestBody: {
            /**
             * Text content to process
             */
            text: string;
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
            url: '/v1/uploads/text',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Upload Authentication Failed`,
                500: `Text Upload Failed`,
            },
        });
    }
    /**
     * @param assistantId UUID of the assistant to associate uploaded documents with
     * @param formData
     * @returns any Documents uploaded successfully
     * @throws ApiError
     */
    public static postV1UploadsDocuments(
        assistantId: string,
        formData?: {
            files: {
                /**
                 * File encoding type
                 */
                encoding: string;
                /**
                 * Form field name for the file
                 */
                fieldname: string;
                /**
                 * Original filename of the uploaded file
                 */
                filename: string;
                /**
                 * MIME type of the uploaded file
                 */
                mimetype: 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' | 'application/vnd.ms-powerpoint' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'application/vnd.oasis.opendocument.text' | 'text/plain' | 'text/csv' | 'text/markdown' | 'application/pdf';
            };
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
            url: '/v1/uploads/documents/{assistantId}',
            path: {
                'assistantId': assistantId,
            },
            ...(formData ? { formData } : {}),
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Upload Authentication Failed`,
                422: `Invalid File Type`,
                500: `File Upload Failed`,
            },
        });
    }
    /**
     * @param assistantId
     * @param formData
     * @returns any Assistant Profile Picture Uploaded Successfully
     * @throws ApiError
     */
    public static postV1UploadsPfpAssistant(
        assistantId: string,
        formData?: {
            /**
             * Profile picture file object from multipart upload
             */
            file: Record<string, any>;
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
            url: '/v1/uploads/pfp/assistant/{assistantId}',
            path: {
                'assistantId': assistantId,
            },
            ...(formData ? { formData } : {}),
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Upload Authentication Failed`,
                422: `Invalid File Type`,
                500: `Assistant Profile Picture Upload Failed`,
            },
        });
    }
    /**
     * @param userId
     * @param formData
     * @returns any User Profile Picture Uploaded Successfully
     * @throws ApiError
     */
    public static postV1UploadsPfpUser(
        userId: string,
        formData?: {
            /**
             * Profile picture file object from multipart upload
             */
            file: Record<string, any>;
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
            url: '/v1/uploads/pfp/user/{userId}',
            path: {
                'userId': userId,
            },
            ...(formData ? { formData } : {}),
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Upload Authentication Failed`,
                422: `Invalid File Type`,
                500: `Profile Picture Upload Failed`,
            },
        });
    }
    /**
     * @param organizationId
     * @param formData
     * @returns any Organization Profile Picture Uploaded Successfully
     * @throws ApiError
     */
    public static postV1UploadsPfpOrganization(
        organizationId: string,
        formData?: {
            /**
             * Profile picture file object from multipart upload
             */
            file: Record<string, any>;
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
            url: '/v1/uploads/pfp/organization/{organizationId}',
            path: {
                'organizationId': organizationId,
            },
            ...(formData ? { formData } : {}),
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Upload Authentication Failed`,
                422: `Invalid File Type`,
                500: `Organization Profile Picture Upload Failed`,
            },
        });
    }
}
