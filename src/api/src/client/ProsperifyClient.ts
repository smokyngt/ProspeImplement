import { HttpClient } from '../core/http/HttpClient';
import { AuthManager } from '../core/auth/AuthManager';
import { AssistantsResource } from '../resources/assistants/AssistantsResource';
import { ChatResource } from '../resources/chat/ChatResource';
import { FilesResource } from '../resources/files/FilesResource';
import { OrganizationsResource } from '../resources/organizations/OrganizationsResource';
import { UsersResource } from '../resources/users/UsersResource';

/**
 * Configuration requise pour initialiser le SDK Prosperify
 */
export interface ProsperifyClientConfig {
  /** Clé API de service (x-prosperify-key) */
  apiKey: string;

  /** Base URL de l’API (ex: https://api.prosperify.io) */
  baseUrl?: string;

  /** JWT utilisateur (optionnel si authentification par login ensuite) */
  token?: string;
}

/**
 * Client principal Prosperify — point d'entrée du SDK
 */
export class ProsperifyClient {
  private httpClient: HttpClient;
  private authManager: AuthManager;

  public readonly assistants: AssistantsResource;
  public readonly chat: ChatResource;
  public readonly files: FilesResource;
  public readonly organizations: OrganizationsResource;
  public readonly users: UsersResource;

  constructor(config: ProsperifyClientConfig) {
    const { baseUrl = 'https://api.prosperify.io', apiKey, token } = config;

    // Instanciation du HttpClient avec auth intégrée
    this.httpClient = new HttpClient(baseUrl, apiKey, token);
    this.authManager = new AuthManager(this.httpClient);

    // Initialisation des ressources du SDK
    this.assistants = new AssistantsResource(this.httpClient);
    this.chat = new ChatResource(this.httpClient);
    this.files = new FilesResource(this.httpClient);
    this.organizations = new OrganizationsResource(this.httpClient);
    this.users = new UsersResource(this.httpClient);
  }

  /**
   * Authentifie un utilisateur et stocke le JWT pour les appels suivants
   */
  public async authenticate(username: string, password: string): Promise<void> {
    const token = await this.authManager.authenticate(username, password);
    this.httpClient.setToken(token);
  }

  /**
   * Déconnecte l'utilisateur (invalide le token JWT)
   */
  public async logout(): Promise<void> {
    await this.authManager.logout();
    this.httpClient.clearToken();
  }
}
