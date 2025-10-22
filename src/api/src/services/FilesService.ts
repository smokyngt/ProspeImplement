/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FilesService {
    /**
     * @param id
     * @returns any File Deleted Successfully
     * @throws ApiError
     */
    public static deleteV1Files(
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
            url: '/v1/files/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `File Authentication Failed`,
                404: `File Not Found`,
                500: `File Delete Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any File Retrieved Successfully
     * @throws ApiError
     */
    public static getV1Files(
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
            url: '/v1/files/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `File Authentication Failed`,
                404: `File Not Found`,
                500: `File Retrieve Failed`,
            },
        });
    }
    /**
     * @param requestBody Request body for listing files with filtering and pagination
     * @returns any Files Listed Successfully
     * @throws ApiError
     */
    public static postV1FilesList(
        requestBody?: {
            /**
             * Filter for archived files. Defaults to false (non-archived only)
             */
            archived?: boolean;
            /**
             * UUID of the assistant to filter files by
             */
            assistantId?: string;
            /**
             * Date range filter for file creation
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
             * UUID of the folder to list files from
             */
            folderId?: string;
            /**
             * Maximum number of files to return per page
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
             * Filter by number of pages in the file
             */
            pages?: {
                /**
                 * Maximum number of pages
                 */
                max?: number;
                /**
                 * Minimum number of pages
                 */
                min?: number;
            };
            /**
             * Search criteria for file names
             */
            search?: {
                /**
                 * Search term to match against file names
                 */
                name?: string;
            };
            /**
             * Filter by file size in bytes
             */
            size?: {
                /**
                 * Maximum file size in bytes
                 */
                max?: number;
                /**
                 * Minimum file size in bytes
                 */
                min?: number;
            };
            /**
             * Filter by file processing status
             */
            status?: 'complete' | 'error' | 'indexing';
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
            url: '/v1/files/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `File Authentication Failed`,
                404: `File Not Found`,
                500: `File List Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any File Repaired Successfully
     * @throws ApiError
     */
    public static postV1FilesRepair(
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
            url: '/v1/files/repair/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `File Authentication Failed`,
                404: `File Not Found`,
                500: `File Repair Failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any Default Response
     * @throws ApiError
     */
    public static getV1FilesDownload(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/files/download/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns any File Archived Successfully
     * @throws ApiError
     */
    public static postV1FilesArchive(
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
            url: '/v1/files/{id}/archive',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Unauthorized`,
                404: `File not found`,
                500: `File archive operation failed`,
            },
        });
    }
    /**
     * @param id
     * @returns any File Restored Successfully
     * @throws ApiError
     */
    public static postV1FilesRestore(
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
            url: '/v1/files/{id}/restore',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request - Validation Error`,
                401: `File Authentication Failed`,
                404: `File Not Found`,
                500: `File Restore Failed`,
            },
        });
    }
}
