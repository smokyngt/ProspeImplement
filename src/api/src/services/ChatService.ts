/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatService {
    /**
     * @param requestBody Request body for sending a message to an AI assistant
     * @returns any Message Sent Successfully
     * @throws ApiError
     */
    public static postV1ChatSend(
        requestBody: {
            /**
             * Processing limits and constraints
             */
            limits?: {
                /**
                 * Maximum number of document chunks to process
                 */
                chunks?: number;
                /**
                 * Maximum number of document pages to process
                 */
                pages?: number;
                /**
                 * Maximum number of final results to use for AI context
                 */
                results?: number;
            };
            /**
             * Scope and filtering parameters
             */
            scope?: {
                /**
                 * Whether to include archived content
                 */
                archived?: boolean;
                /**
                 * Array of specific file IDs to include in the context
                 */
                files?: Array<string>;
                /**
                 * Array of folder IDs to include files from in the context
                 */
                folders?: Array<string>;
                /**
                 * Array of content types to include
                 */
                types?: Array<'entity' | 'figure_caption' | 'image' | 'table' | 'table_caption' | 'text'>;
            };
            /**
             * Search configuration parameters
             */
            search?: {
                /**
                 * Number of search candidates to retrieve
                 */
                candidates?: number;
                /**
                 * Whether to enable entity-based search enhancement
                 */
                entities?: boolean;
                /**
                 * Strategy for combining different search results
                 */
                fusion?: 'rrf' | 'simple' | 'max' | 'min';
                /**
                 * Whether to include image search
                 */
                images?: boolean;
                /**
                 * Maximum number of search results to return
                 */
                limit?: number;
                /**
                 * Strategy for generating embeddings for semantic search
                 */
                mode?: 'dense' | 'hybrid' | 'image' | 'sparse';
            };
            /**
             * Whether to stream the response in real-time
             */
            stream?: boolean;
            /**
             * The message content to send to the assistant
             */
            text: string;
            /**
             * UUID of the conversation thread
             */
            thread: string;
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
            url: '/v1/chat/send',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Unauthorized`,
                404: `Resource Not Found`,
                500: `Chat Send Failed`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody Request body for regenerating an AI assistant message response
     * @returns any Message Regenerated Successfully
     * @throws ApiError
     */
    public static postV1ChatRegenerate(
        id: string,
        requestBody?: {
            /**
             * Processing limits and constraints
             */
            limits?: {
                /**
                 * Maximum number of document chunks to process
                 */
                chunks?: number;
                /**
                 * Maximum number of document pages to process
                 */
                pages?: number;
                /**
                 * Maximum number of final results to use for AI context
                 */
                results?: number;
            };
            /**
             * Scope and filtering parameters
             */
            scope?: {
                /**
                 * Whether to include archived content
                 */
                archived?: boolean;
                /**
                 * Array of specific file IDs to include in the context
                 */
                files?: Array<string>;
                /**
                 * Array of folder IDs to include files from in the context
                 */
                folders?: Array<string>;
                /**
                 * Array of content types to include
                 */
                types?: Array<'entity' | 'figure_caption' | 'image' | 'table' | 'table_caption' | 'text'>;
            };
            /**
             * Search configuration parameters
             */
            search?: {
                /**
                 * Number of search candidates to retrieve
                 */
                candidates?: number;
                /**
                 * Whether to enable entity-based search enhancement
                 */
                entities?: boolean;
                /**
                 * Strategy for combining different search results
                 */
                fusion?: 'none' | 'rrf' | 'weighted';
                /**
                 * Whether to include image search
                 */
                images?: boolean;
                /**
                 * Maximum number of search results to return
                 */
                limit?: number;
                /**
                 * Strategy for generating embeddings for semantic search
                 */
                mode?: 'dense' | 'hybrid' | 'image' | 'sparse';
            };
            /**
             * Whether to stream the regenerated response in real-time
             */
            stream?: boolean;
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
            url: '/v1/chat/regenerate/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Validation Error`,
                401: `Unauthorized`,
                404: `Resource Not Found`,
                500: `Chat Regenerate Failed`,
            },
        });
    }
}
