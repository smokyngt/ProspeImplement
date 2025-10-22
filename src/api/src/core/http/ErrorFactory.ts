import {
  ProsperifyError,
  ValidationError,
  AuthenticationError,
  NetworkError
} from "../errors/ProsperifyError";

/**
 * Convertit la réponse d’erreur API Prosperify en une erreur SDK typée
 */
export function mapAPIError(error: any): ProsperifyError {
  // Si c’est déjà une instance connue, on la renvoie telle quelle
  if (error instanceof ProsperifyError) {
    return error;
  }

  const code = error?.code || "unknown.error";
  const status = error?.status || error?.statusCode || 500;
  const message = error?.message || "An unknown error occurred";
  const metadata = error?.metadata || {};
  const correlationId = error?.correlationId;

  // 🔍 Mappage spécifique aux codes définis dans ton OpenAPI
  switch (true) {
    case code === "validation.error" || status === 400:
      return new ValidationError(message, metadata);

    case code === "unauthorized" || status === 401 || status === 403:
      return new AuthenticationError(message);

    case code === "assistant.not.found" || status === 404:
      return new ProsperifyError({
        message,
        code: "assistant.not.found",
        statusCode: 404,
        correlationId,
        metadata,
      });

    case code === "assistant.creation.failed" || status === 500:
      return new ProsperifyError({
        message,
        code: "assistant.creation.failed",
        statusCode: 500,
        correlationId,
        metadata,
      });

    default:
      return new NetworkError(message, status);
  }
}


