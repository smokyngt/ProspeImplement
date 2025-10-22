import { ProsperifyClient } from '../../client/ProsperifyClient';
import { CreateAssistantRequest, Assistant, AssistantResponse } from './types';
import { mapAPIError } from '../../core/http/ErrorFactory';

export class AssistantsResource {
  private client: ProsperifyClient;

  constructor(client: ProsperifyClient) {
    this.client = client;
  }

  /**
   * Crée un nouvel assistant
   * @param request Corps de la requête (nom obligatoire)
   * @returns L’assistant créé
   */
  async createAssistant(request: CreateAssistantRequest): Promise<Assistant> {
    try {
      const response = await this.client.post<AssistantResponse>('/v1/assistants/new', request);
      return response.data.data.assistant;
    } catch (error: any) {
      throw mapAPIError(error.response?.data || error);
    }
  }

  /**
   * Récupère un assistant existant par son ID
   * @param id Identifiant unique de l’assistant
   * @returns L’assistant trouvé
   */
  async getAssistant(id: string): Promise<Assistant> {
    try {
      const response = await this.client.get<AssistantResponse>(`/v1/assistants/${id}`);
      return response.data.data.assistant;
    } catch (error: any) {
      throw mapAPIError(error.response?.data || error);
    }
  }
}
