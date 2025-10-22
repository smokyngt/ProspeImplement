import { ProsperifyError } from "./ProsperifyError";

export class AuthenticationError extends ProsperifyError {
  constructor(message: string = "Authentication failed") {
    super({ message, code: "unauthorized", statusCode: 401 });
    this.name = "AuthenticationError";
  }
}
