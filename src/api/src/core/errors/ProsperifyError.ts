/**
 * Interface de base pour les propriétés d'une erreur Prosperify
 */
export interface ProsperifyErrorProps {
  /** Message lisible par un humain */
  message: string;

  /** Code d'erreur unique (ex: assistant.not.found, validation.error) */
  code: string;

  /** Code de statut HTTP (optionnel) */
  statusCode?: number;

  /** ID de corrélation pour le traçage des requêtes */
  correlationId?: string;

  /** Métadonnées additionnelles contextuelles */
  metadata?: Record<string, any>;
}

/**
 * Classe de base pour toutes les erreurs SDK Prosperify
 */
export class ProsperifyError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly correlationId?: string;
  public readonly metadata?: Record<string, any>;

  constructor({ message, code, statusCode, correlationId, metadata }: ProsperifyErrorProps) {
    super(message);
    this.name = "ProsperifyError";
    this.code = code;
    this.statusCode = statusCode;
    this.correlationId = correlationId;
    this.metadata = metadata;

    // Correction de la chaîne de prototypes pour les erreurs héritées
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Erreur de validation (400)
 */
export class ValidationError extends ProsperifyError {
  constructor(message: string, metadata?: Record<string, any>) {
    super({
      message,
      code: "validation.error",
      statusCode: 400,
      metadata
    });
    this.name = "ValidationError";
  }
}

/**
 * Erreur d’authentification / autorisation (401 / 403)
 */
export class AuthenticationError extends ProsperifyError {
  constructor(message: string) {
    super({
      message,
      code: "unauthorized",
      statusCode: 401
    });
    this.name = "AuthenticationError";
  }
}

/**
 * Erreur réseau / interne (timeout, 5xx, etc.)
 */
export class NetworkError extends ProsperifyError {
  constructor(message: string, statusCode?: number) {
    super({
      message,
      code: "network.error",
      statusCode
    });
    this.name = "NetworkError";
  }
}
