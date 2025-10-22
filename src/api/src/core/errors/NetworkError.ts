import { ProsperifyError } from "./ProsperifyError";

export class NetworkError extends ProsperifyError {
  constructor(message: string = "Network error", statusCode?: number) {
    super({ message, code: "network.error", statusCode });
    this.name = "NetworkError";
  }
}
