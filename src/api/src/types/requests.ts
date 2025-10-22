/**
 * Request types for Prosperify API operations
 * Based on the OpenAPI 3.0.3 specification
 */

/**
 * Request body for creating a new assistant
 */
export interface CreateAssistantRequest {
  /** Display name for the assistant (1-100 characters) */
  name: string;
}

/**
 * Parameters for retrieving a specific assistant
 */
export interface GetAssistantRequest {
  /** Unique identifier of the assistant */
  id: string;
}

/**
 * Request body for creating a new chat message
 */
export interface CreateChatRequest {
  /** Message content for the chat */
  message: string;
}

/**
 * Request body for creating a new user
 */
export interface CreateUserRequest {
  /** Username for the new user */
  username: string;
  /** Email address for the new user */
  email: string;
  /** Password for the new user */
  password: string;
}

/**
 * Request body for creating a new organization
 */
export interface CreateOrganizationRequest {
  /** Name of the organization */
  name: string;
}

/**
 * Request body for uploading a file
 */
export interface UploadFileRequest {
  /** The file to be uploaded */
  file: File;
  /** Optional description for the file */
  description?: string;
}