import { OpenAPI } from '@/sdk/core/OpenAPI';
import { ApiKeysService } from '@/sdk/services/ApiKeysService';
import { AssistantsService } from '@/sdk/services/AssistantsService';
import { AuthService } from '@/sdk/services/AuthService';
import { ChatService } from '@/sdk/services/ChatService';
import { FilesService } from '@/sdk/services/FilesService';
import { FoldersService } from '@/sdk/services/FoldersService';
import { InvitationsService } from '@/sdk/services/InvitationsService';
import { LogsService } from '@/sdk/services/LogsService';
import { MetricsService } from '@/sdk/services/MetricsService';
import { OrganizationsService } from '@/sdk/services/OrganizationsService';
import { RolesService } from '@/sdk/services/RolesService';
import { ThreadsService } from '@/sdk/services/ThreadsService';
import { UploadsService } from '@/sdk/services/UploadsService';
import { UsersService } from '@/sdk/services/UsersService';
import { getEventMessage, getErrorMessage, type Lang } from '@/core/messages';

// Tous les services auto-générés
export * from '../sdk/services/ApiKeysService';
export * from '../sdk/services/AssistantsService';
export * from '../sdk/services/AuthService';
export * from '../sdk/services/ChatService';
export * from '../sdk/services/FilesService';
export * from '../sdk/services/FoldersService';
export * from '../sdk/services/InvitationsService';
export * from '../sdk/services/LogsService';
export * from '../sdk/services/MetricsService';
export * from '../sdk/services/OrganizationsService';
export * from '../sdk/services/RolesService';
export * from '../sdk/services/ThreadsService';
export * from '../sdk/services/UploadsService';
export * from '../sdk/services/UsersService';
/**
 * Client principal Prosperify
 * Gère la configuration OpenAPI (token, apiKey, baseURL, langue)
 * et expose tous les services comme méthodes de classe.
 */
export class ProsperifyClient {
  private token: string | undefined;
  private apiKey: string | undefined;
  private baseUrl: string;
  private lang: Lang = 'en';

  // Expose tous les services (proxied so we can format responses/messages)
  public apiKeys: any;
  public assistants: any;
  public auth: any;
  public chat: any;
  public files: any;
  public folders: any;
  public invitations: any;
  public logs: any;
  public metrics: any;
  public organizations: any;
  public roles: any;
  public threads: any;
  public uploads: any;
  public users: any;

  constructor({
    token,
    apiKey,
    baseUrl = import.meta.env['VITE_API_URL'] || 'https://api.prosperify.app',
  }: {
    token?: string;
    apiKey?: string;
    baseUrl?: string;
    lang?: Lang;
  }) {
    this.token = token;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    if ((arguments[0] as any)?.lang) this.lang = (arguments[0] as any).lang;

    // Configure le SDK auto-généré
    OpenAPI.BASE = baseUrl;
    OpenAPI.TOKEN = async () => this.token || '';
    OpenAPI.HEADERS = {
      'x-api-key': this.apiKey || '',
    };

    // create proxied service wrappers
    this.apiKeys = this.wrapService(ApiKeysService);
    this.assistants = this.wrapService(AssistantsService);
    this.auth = this.wrapService(AuthService);
    this.chat = this.wrapService(ChatService);
    this.files = this.wrapService(FilesService);
    this.folders = this.wrapService(FoldersService);
    this.invitations = this.wrapService(InvitationsService);
    this.logs = this.wrapService(LogsService);
    this.metrics = this.wrapService(MetricsService);
    this.organizations = this.wrapService(OrganizationsService);
    this.roles = this.wrapService(RolesService);
    this.threads = this.wrapService(ThreadsService);
    this.uploads = this.wrapService(UploadsService);
    this.users = this.wrapService(UsersService);
  }

  /** Définit la langue pour les messages ("en" | "fr") */
  setLang(lang: Lang) {
    this.lang = lang;
  }

  private formatResponse<T>(res: any) {
    const eventCode = res?.event?.code;
    return {
      data: res?.data,
      event: res?.event,
      eventMessage: getEventMessage(eventCode, this.lang),
      timestamp: res?.timestamp,
    } as { data?: T; event?: any; eventMessage?: string; timestamp?: number };
  }

  private formatError(err: any) {
    const status = err?.status ?? err?.response?.status ?? err?.statusCode ?? 500;
    return {
      original: err,
      status,
      message: getErrorMessage(status, this.lang),
    };
  }

  /** Wrapper générique qui transforme une classe de service SDK en proxy friendly-methods */
  private wrapService(ServiceClass: any) {
    const methods = Object.keys(ServiceClass).filter(k => typeof ServiceClass[k] === 'function');

    const pickMethod = (name: string) => {
      const key = name.toLowerCase();
      // scoring heuristics
      const scores = methods.map((m: string) => {
        const ml = m.toLowerCase();
        let score = 0;
        if (ml.includes(key)) score += 50;
        if (key === 'create' && /new/.test(ml)) score += 30;
        if (key === 'get' && ml.startsWith('get')) score += 20;
        if (key === 'list' && ml.includes('list')) score += 20;
        if (key === 'update' && (ml.startsWith('put') || ml.includes('update'))) score += 20;
        if (key === 'delete' && ml.startsWith('delete')) score += 20;
        if (key === 'upload' && ml.includes('upload')) score += 20;
        return { m, score };
      });
      scores.sort((a, b) => b.score - a.score);
      return scores[0]?.score ? scores[0].m : null;
    };

    return new Proxy({}, {
      get: (_target, prop: string) => {
        // if the SDK has a method with the exact prop name, call it
        if (methods.includes(prop)) {
          return async (...args: any[]) => {
            try {
              const res = await ServiceClass[prop](...args);
              return this.formatResponse(res);
            } catch (e) {
              throw this.formatError(e);
            }
          };
        }

        // attempt to map friendly names to SDK method names (create/get/list/update/delete/upload)
        const mapped = pickMethod(prop);
        if (mapped) {
          return async (...args: any[]) => {
            try {
              const res = await ServiceClass[mapped](...args);
              return this.formatResponse(res);
            } catch (e) {
              throw this.formatError(e);
            }
          };
        }

        // fallback: undefined
        return undefined;
      }
    });
  }

  /** 🔒 Met à jour dynamiquement le token JWT */
  setToken(token: string) {
    this.token = token;
  }

  /** 🔑 Met à jour dynamiquement la clé API */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /** ⚙️ Change dynamiquement l’URL du backend */
  setBaseUrl(url: string) {
    this.baseUrl = url;
    OpenAPI.BASE = url;
  }

  /** 🧠 Gestion simple des erreurs */
  handleError(error: any) {
    // deprecated: prefer formatError/try-catch on wrapped service calls
    const formatted = this.formatError(error);
    console.error(`[ProsperifyClient] ${formatted.message || 'Unknown error'}`);
    throw new Error(formatted.message || 'Unknown error');
  }
}
