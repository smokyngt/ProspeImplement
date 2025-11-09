// import { OpenAPI } from '@/sdk/core/OpenAPI';
// import { ApiKeysService } from '@/sdk/services/ApiKeysService';
// import { AssistantsService } from '@/sdk/services/AssistantsService';
// import { AuthService } from '@/sdk/services/AuthService';
// import { ChatService } from '@/sdk/services/ChatService';
// import { FilesService } from '@/sdk/services/FilesService';
// import { FoldersService } from '@/sdk/services/FoldersService';
// import { InvitationsService } from '@/sdk/services/InvitationsService';
// import { LogsService } from '@/sdk/services/LogsService';
// import { MetricsService } from '@/sdk/services/MetricsService';
// import { OrganizationsService } from '@/sdk/services/OrganizationsService';
// import { RolesService } from '@/sdk/services/RolesService';
// import { ThreadsService } from '@/sdk/services/ThreadsService';
// import { UploadsService } from '@/sdk/services/UploadsService';
// import { UsersService } from '@/sdk/services/UsersService';

// import { getEventMessage, getErrorMessage } from '@/core/i18n';

// import type {
//   ProsperifyServices,
//   ProsperifyClientConfig,
//   ServiceResponse,
//   ServiceError,
//   WrappedService,
//   Lang,
// } from './types';

// /**
//  * Client principal Prosperify
//  * Gère la configuration OpenAPI et expose tous les services typés
//  */
// export class ProsperifyClient implements ProsperifyServices {
//   private token?: string | undefined;
//   private apiKey?: string | undefined;
//   private baseUrl: string;
//   private lang: Lang = 'en';

//   // ✅ Services typés automatiquement
//   public apiKeys!: WrappedService<typeof ApiKeysService>;
//   public assistants!: WrappedService<typeof AssistantsService>;
//   public auth!: any; // ✅ CHANGEMENT ICI : WrappedService<typeof AuthService> → any
//   public chat!: WrappedService<typeof ChatService>;
//   public files!: WrappedService<typeof FilesService>;
//   public folders!: WrappedService<typeof FoldersService>;
//   public invitations!: WrappedService<typeof InvitationsService>;
//   public logs!: WrappedService<typeof LogsService>;
//   public metrics!: WrappedService<typeof MetricsService>;
//   public organizations!: WrappedService<typeof OrganizationsService>;
//   public roles!: WrappedService<typeof RolesService>;
//   public threads!: WrappedService<typeof ThreadsService>;
//   public uploads!: WrappedService<typeof UploadsService>;
//   public users!: WrappedService<typeof UsersService>;

//   constructor(config: ProsperifyClientConfig) {
//     const {
//       token,
//       apiKey,
//       baseUrl = import.meta.env['VITE_API_URL'] || 'https://api.prosperify.app',
//       lang = 'en',
//     } = config;

//     this.token = token;
//     this.apiKey = apiKey;
//     this.baseUrl = baseUrl;
//     this.lang = lang;

//     this.syncOpenAPIConfig();

//     // ✅ Instanciation typée des services
//     this.apiKeys = this.wrapService(ApiKeysService);
//     this.assistants = this.wrapService(AssistantsService);
//     this.auth = this.wrapService(AuthService);
//     this.chat = this.wrapService(ChatService);
//     this.files = this.wrapService(FilesService);
//     this.folders = this.wrapService(FoldersService);
//     this.invitations = this.wrapService(InvitationsService);
//     this.logs = this.wrapService(LogsService);
//     this.metrics = this.wrapService(MetricsService);
//     this.organizations = this.wrapService(OrganizationsService);
//     this.roles = this.wrapService(RolesService);
//     this.threads = this.wrapService(ThreadsService);
//     this.uploads = this.wrapService(UploadsService);
//     this.users = this.wrapService(UsersService);
//   }

//   /* ════════════════════════════════════════════════════════════════
//      Configuration dynamique OpenAPI
//   ════════════════════════════════════════════════════════════════ */

//   private syncOpenAPIConfig(): void {
//     OpenAPI.BASE = this.baseUrl;
//     OpenAPI.TOKEN = async () => this.token || '';
//     OpenAPI.HEADERS = async () => ({
//       'x-api-key': this.apiKey || '',
//     });
//   }

//   /* ════════════════════════════════════════════════════════════════
//      Méthodes utilitaires
//   ════════════════════════════════════════════════════════════════ */

//   setLang(lang: Lang): void {
//     this.lang = lang;
//   }

//   setToken(token: string): void {
//     this.token = token;
//     this.syncOpenAPIConfig();
//   }

//   setApiKey(apiKey: string): void {
//     this.apiKey = apiKey;
//     this.syncOpenAPIConfig();
//   }

//   setBaseUrl(url: string): void {
//     this.baseUrl = url;
//     this.syncOpenAPIConfig();
//   }

//   /* ════════════════════════════════════════════════════════════════
//      Formatage des réponses et erreurs
//   ════════════════════════════════════════════════════════════════ */

//   private formatResponse<T>(res: any): ServiceResponse<T> {
//     const eventCode = res?.event?.code;
//     const eventMessage = getEventMessage(eventCode, this.lang);

//     const response: ServiceResponse<T> = {
//       ...(res?.data !== undefined && { data: res.data }),
//       ...(res?.event !== undefined && { event: res.event }),
//       ...(eventMessage !== undefined && { eventMessage }),
//       ...(res?.timestamp !== undefined && { timestamp: res.timestamp }),
//     };

//     return response;
//   }

//   private formatError(err: any): ServiceError {
//     const status = err?.status ?? err?.response?.status ?? err?.statusCode ?? 500;
//     const errorMessage = getErrorMessage(status, this.lang);

//     return {
//       original: err,
//       status,
//       message: errorMessage ?? 'An error occurred',
//     };
//   }

//   /* ════════════════════════════════════════════════════════════════
//      Wrapper typé pour les services OpenAPI
//   ════════════════════════════════════════════════════════════════ */

//   private wrapService<T extends Record<string, any>>(ServiceClass: T): any {
//     const methods = Object.getOwnPropertyNames(ServiceClass).filter(
//       (k) => typeof (ServiceClass as any)[k] === 'function'
//     );

//     const proxy: any = {};

//     for (const method of methods) {
//       proxy[method] = async (...args: any[]) => {
//         try {
//           const res = await (ServiceClass as any)[method](...args);
//           return this.formatResponse(res);
//         } catch (e) {
//           throw this.formatError(e);
//         }
//       };
//     }

//     // 🔎 Proxy pour tolérer les alias de noms de méthode
//     const findMethod = (name: string) => {
//       const key = name.toLowerCase();
//       return (
//         methods.find((m) => m.toLowerCase().includes(key)) ??
//         methods.find((m) => m.toLowerCase().startsWith(key)) ??
//         null
//       );
//     };

//     return new Proxy(proxy, {
//       get: (target, prop: string) => {
//         if (target[prop]) {
//           return target[prop];
//         }
//         const mapped = findMethod(prop);
//         if (mapped) return target[mapped];
//         return undefined;
//       },
//     });
//   }
// }

// /* ════════════════════════════════════════════════════════════════
//    Instance globale (singleton)
// ════════════════════════════════════════════════════════════════ */

// let _instance: ProsperifyClient | undefined;

// export function getProsperifyClient(): ProsperifyClient {
//   if (_instance) return _instance;

//   const isBrowser = typeof window !== 'undefined';

//   const token = isBrowser ? localStorage.getItem('access_token') ?? undefined : undefined;
//   const storedApiKey = isBrowser ? localStorage.getItem('api_key') ?? undefined : undefined;
//   const apiKey = storedApiKey ?? import.meta.env['VITE_API_KEY'];
//   const baseUrl = import.meta.env['VITE_API_URL'] || 'https://api.prosperify.app';
//   const lang = (isBrowser ? (localStorage.getItem('lang') as Lang) : null) || 'fr';

//   _instance = new ProsperifyClient({
//     ...(token && { token }),
//     ...(apiKey && { apiKey }),
//     baseUrl,
//     lang,
//   });

//   if (isBrowser) {
//     console.log('🧩 ProsperifyClient initialisé');
//   }

//   return _instance;
// }

// export const prosperify = getProsperifyClient();



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


import { getEventMessage, getErrorMessage } from '@/core/i18n';
import type {
  ProsperifyServices,
  ProsperifyClientConfig,
  ServiceResponse,
  ServiceError,
  WrappedService,
  Lang,
  ServiceClass,
  StaticServiceMethods,
} from './types';

/**
 * 🧩 ProsperifyClient
 * SDK principal pour interagir avec l’API Prosperify.
 * Il gère :
 *  - la configuration OpenAPI (baseUrl, token, headers dynamiques)
 *  - la normalisation des réponses / erreurs
 *  - le wrapping typé de tous les services
 *  - un singleton global
 */
export class ProsperifyClient implements ProsperifyServices {
  private token: string | undefined;
  private apiKey: string | undefined;
  private baseUrl: string;
  private lang: Lang = 'en';

  // ✅ Services typés automatiquement
  public apiKeys!: WrappedService<typeof ApiKeysService>;
  public assistants!: WrappedService<typeof AssistantsService>;
  public auth!: WrappedService<typeof AuthService>;
  public chat!: WrappedService<typeof ChatService>;
  public files!: WrappedService<typeof FilesService>;
  public folders!: WrappedService<typeof FoldersService>;
  public invitations!: WrappedService<typeof InvitationsService>;
  public logs!: WrappedService<typeof LogsService>;
  public metrics!: WrappedService<typeof MetricsService>;
  public organizations!: WrappedService<typeof OrganizationsService>;
  public roles!: WrappedService<typeof RolesService>;
  public threads!: WrappedService<typeof ThreadsService>;
  public uploads!: WrappedService<typeof UploadsService>;
  public users!: WrappedService<typeof UsersService>;

  constructor(config: ProsperifyClientConfig) {
    this.token = config.token ?? undefined;
    this.apiKey = config.apiKey ?? undefined;
    this.baseUrl = config.baseUrl ?? import.meta.env['VITE_API_URL'] ?? 'https://api.prosperify.app';
    this.lang = config.lang ?? 'en';

    this.syncOpenAPIConfig();

    // 🏗️ Instanciation typée de tous les services
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

  /* ════════════════════════════════════════════════════════════════
     ⚙️ Configuration dynamique OpenAPI
  ════════════════════════════════════════════════════════════════ */

  private syncOpenAPIConfig(): void {
    OpenAPI.BASE = this.baseUrl;
    OpenAPI.TOKEN = async () => this.token ?? '';
    OpenAPI.HEADERS = async () => ({
      'x-api-key': this.apiKey ?? '',
    });
  }

  /* ════════════════════════════════════════════════════════════════
     🧭 Méthodes utilitaires
  ════════════════════════════════════════════════════════════════ */

  setLang(lang: Lang): void {
    this.lang = lang;
  }

  setToken(token: string): void {
    this.token = token;
    this.syncOpenAPIConfig();
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.syncOpenAPIConfig();
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
    this.syncOpenAPIConfig();
  }

  /* ════════════════════════════════════════════════════════════════
     📦 Formatage des réponses / erreurs
  ════════════════════════════════════════════════════════════════ */

  private formatResponse<T>(res: any): ServiceResponse<T> {
    const eventCode = res?.event?.code;
    const eventMessage = getEventMessage(eventCode, this.lang);

    return {
      ...(res?.data !== undefined && { data: res.data }),
      ...(res?.event !== undefined && { event: res.event }),
      ...(eventMessage && { eventMessage }),
      ...(res?.timestamp && { timestamp: res.timestamp }),
    };
  }

  private formatError(err: any): ServiceError {
    const status = err?.status ?? err?.response?.status ?? 500;
    const message = getErrorMessage(status, this.lang) ?? 'An unexpected error occurred';
    return {
      original: err,
      status,
      message,
      code: err?.body?.code || err?.response?.data?.code,
      details: err?.body?.errors || err?.response?.data,
      url: err?.url || err?.config?.url,
      method: err?.config?.method,
    };
  }

  /* ════════════════════════════════════════════════════════════════
     🧱 Wrapper typé pour les services OpenAPI
  ════════════════════════════════════════════════════════════════ */

  private wrapService<T extends object>(ServiceClass: T): StaticServiceMethods<T> {
    const methods = Object.getOwnPropertyNames(ServiceClass).filter(
      (k) => typeof (ServiceClass as any)[k] === 'function'
    );

    const proxy: Record<string, any> = {};

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

    const findMethod = (name: string) => {
      const key = name.toLowerCase();
      return methods.find((m) => m.toLowerCase() === key) ?? null;
    };

    return new Proxy(proxy, {
      get: (target, prop: string) => {
        if (target[prop]) return target[prop];
        const mapped = findMethod(prop);
        return mapped ? target[mapped] : undefined;
      },
    }) as StaticServiceMethods<T>;
  }
}

/* ════════════════════════════════════════════════════════════════
   🧩 Singleton global : instance unique du ProsperifyClient
════════════════════════════════════════════════════════════════ */

let _instance: ProsperifyClient | undefined;

export function getProsperifyClient(): ProsperifyClient {
  if (_instance) return _instance;

  const isBrowser = typeof window !== 'undefined';
  const token = isBrowser ? localStorage.getItem('access_token') ?? undefined : undefined;
  const storedApiKey = isBrowser ? localStorage.getItem('api_key') ?? undefined : undefined;
  const apiKey = storedApiKey ?? import.meta.env['VITE_API_KEY'];
  const baseUrl = import.meta.env['VITE_API_URL'] || 'https://api.prosperify.app';
  const lang = (isBrowser ? (localStorage.getItem('lang') as Lang) : null) || 'fr';

  _instance = new ProsperifyClient({
    ...(token && { token }),
    ...(apiKey && { apiKey }),
    baseUrl,
    lang,
  });

  if (import.meta.env.DEV) {
    console.log('🧩 ProsperifyClient initialisé');
  }

  return _instance;
}

export const prosperify = getProsperifyClient();
