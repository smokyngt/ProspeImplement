import { ProsperifyError } from "./ProsperifyError";

export class ValidationError extends ProsperifyError {
  public readonly details: Record<string, any>;

  constructor(message: string, details: Record<string, any> = {}) {
    super({ message, code: "validation.error", statusCode: 400 });
    this.name = "ValidationError";
    this.details = details;
  }
}
