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

  // Expose tous les services (proxied)
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
  lang = 'en',
}: {
  token?: string;
  apiKey?: string;
  baseUrl?: string;
  lang?: Lang;
}) {
    this.token = token;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.lang = lang;

    // Configure OpenAPI
    OpenAPI.BASE = baseUrl;
    OpenAPI.TOKEN = async () => this.token || '';
    OpenAPI.HEADERS = async () => ({
      'x-api-key': this.apiKey || '',
    });

    // Création des services proxy
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
    const status =
      err?.status ?? err?.response?.status ?? err?.statusCode ?? 500;
    return {
      original: err,
      status,
      message: getErrorMessage(status, this.lang),
    };
  }

  /** 🔧 Détecte et mappe toutes les méthodes du service SDK */
  private wrapService(ServiceClass: any) {
    const methods = Object.getOwnPropertyNames(ServiceClass).filter(
      (k) => typeof (ServiceClass as any)[k] === 'function'
    );

    const proxy: any = {};

    for (const method of methods) {
      proxy[method] = async (...args: any[]) => {
        try {
          const res = await (ServiceClass as any)[method](...args);
          return this.formatResponse(res);
        } catch (e) {
          throw this.formatError(e);
        }
      };
    }

    // ✅ Supporte les aliases simples (create, delete, etc.)
    const pickMethod = (name: string) => {
      const key = name.toLowerCase();
      return (
        methods.find((m) => m.toLowerCase().includes(key)) ??
        methods.find((m) => m.toLowerCase().startsWith(key)) ??
        null
      );
    };

    return new Proxy(proxy, {
      get: (target, prop: string) => {
        if (target[prop]) return target[prop];
        const mapped = pickMethod(prop);
        if (mapped) return target[mapped];
        return undefined;
      },
    });
  }

  /** 🔒 Met à jour dynamiquement le token JWT */
  setToken(token: string) {
    this.token = token;
  }

  /** 🔑 Met à jour dynamiquement la clé API */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    OpenAPI.HEADERS = async () => ({
      'x-api-key': this.apiKey || '',
    });
  }

  /** ⚙️ Change dynamiquement l’URL du backend */
  setBaseUrl(url: string) {
    this.baseUrl = url;
    OpenAPI.BASE = url;
  }

  /** 🧠 Gestion simple des erreurs */
  handleError(error: any) {
    const formatted = this.formatError(error);
    console.error(`[ProsperifyClient] ${formatted.message}`);
    throw new Error(formatted.message);
  }
}

/* ------------------------------------------------------------------
   ✅ Instance unique globale de ProsperifyClient
   → Tu peux importer directement `prosperify` n'importe où :
      import { prosperify } from '@/core/ProsperifyClient'
------------------------------------------------------------------ */

const token = localStorage.getItem('access_token');
const apiKey = import.meta.env['VITE_API_KEY'];
const baseUrl = import.meta.env['VITE_API_URL'] || 'https://api.prosperify.app';
const lang = (localStorage.getItem('lang') as Lang) || 'fr';

export const prosperify = new ProsperifyClient({
  ...(token && { token }),
  ...(apiKey && { apiKey }),
  baseUrl,
  lang,
});

console.log('🧩 ProsperifyClient initialisé →', prosperify);
