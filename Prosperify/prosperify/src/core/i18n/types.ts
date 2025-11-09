/**
 * Langues supportées par l'application
 */
export type Lang = 'en' | 'fr';

/**
 * Codes d'événements possibles de l'API
 */
export type EventCode =
  // API Keys
  | 'api_key.created'
  // Auth
  | 'auth.sso.authorization.url.generated'
  | 'auth.sso.authorization.successful'
  | 'auth.email.verified'
  | 'auth.verification.email.sent'
  | 'auth.password.reset.successful'
  | 'auth.token.refreshed'
  | 'auth.token.revoked'
  // Users
  | 'user.created'
  | 'user.authenticated'
  | 'user.updated'
  | 'user.deleted'
  | 'user.retrieved'
  | 'user.role.added'
  | 'user.role.removed'
  | 'users.listed'
  | 'user.scopes.retrieved'
  // Roles
  | 'role.created'
  | 'role.deleted'
  | 'role.updated'
  | 'role.retrieved'
  | 'roles.listed'
  // Metrics
  | 'metrics.listed'
  | 'metric.retrieved'
  // Assistants
  | 'api.assistant.created'
  | 'assistant.created'
  // Files
  | 'files.listed'
  | 'file.deleted'
  | 'file.retrieved'
  // Folders
  | 'folders.listed'
  | 'folder.created'
  // Threads
  | 'thread.created'
  // Uploads
  | 'uploads.documents.uploaded';

/**
 * Codes d'erreur HTTP
 */
export type ErrorCode = 400 | 401 | 403 | 404 | 409 | 422 | 500;

/**
 * Structure d'un dictionnaire de messages
 */
export type MessageDictionary = Partial<Record<EventCode, string>>;

/**
 * Structure d'un dictionnaire d'erreurs
 */
export type ErrorDictionary = Record<string, string>;

/**
 * Messages i18n pour tous les événements
 */
export type EventMessages = Record<Lang, MessageDictionary>;

/**
 * Messages d'erreur i18n pour tous les codes HTTP
 */
export type ErrorMessages = Record<Lang, ErrorDictionary>;