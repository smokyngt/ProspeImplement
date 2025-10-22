import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { mapAPIError } from "./ErrorFactory;
import { ProsperifyError } from "../errors";

/**
 * HTTP client utilisé par le SDK Prosperify
 * - ajoute les headers d’authentification
 * - mappe les erreurs API en objets d’erreurs custom
 * - gère automatiquement les réponses JSON
 */
export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(
    private baseURL: string,
    private apiKey: string,
    private token?: string
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "x-prosperify-key": this.apiKey,
        "Content-Type": "application/json",
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
      timeout: 10000,
    });

    // Intercepteur de réponse → gestion d’erreurs globale
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const data = error.response?.data;
        throw mapAPIError(data || error);
      }
    );
  }

  /** Méthodes HTTP génériques */
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.get<T>(url, config);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.post<T>(url, data, config);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.put<T>(url, data, config);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.delete<T>(url, config);
    } catch (err) {
      this.handleError(err);
    }
  }

  /** Gestion centralisée des erreurs */
  private handleError(err: any): never {
    if (err instanceof ProsperifyError) throw err;
    throw mapAPIError(err?.response?.data || err);
  }
}
