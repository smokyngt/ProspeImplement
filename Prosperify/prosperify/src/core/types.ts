import type { CancelablePromise } from '@/sdk/core/CancelablePromise';

/* ════════════════════════════════════════════════════════════════
   🌍 Langues disponibles
════════════════════════════════════════════════════════════════ */
export type Lang = 'en' | 'fr';

/* ════════════════════════════════════════════════════════════════
   📦 Structures de réponse standardisées
════════════════════════════════════════════════════════════════ */

export interface ApiEvent {
  code: string;
  correlationId?: string;
  metadata?: Record<string, any>;
  payload?: Record<string, any>;
}

export interface ServiceResponse<T = any> {
  data?: T;
  event?: ApiEvent;
  eventMessage?: string;
  timestamp?: number;
}

/**
 * Erreur normalisée par le ProsperifyClient.
 * Étendue pour inclure des informations additionnelles utiles au debugging.
 */
export interface ServiceError {
  original: any;
  status: number;
  message: string;
  code?: string;
  details?: any;
  url?: string;
  method?: string;
}

/* ════════════════════════════════════════════════════════════════
   🧱 Typage des méthodes de services OpenAPI
════════════════════════════════════════════════════════════════ */

export type ServiceMethod<TReturn = any, TArgs extends any[] = any[]> = (
  ...args: TArgs
) => CancelablePromise<TReturn>;

export type UnwrapServiceMethod<T> = T extends ServiceMethod<infer R, any[]> ? R : never;

export type WrappedServiceMethod<T extends ServiceMethod> = T extends ServiceMethod<
  infer R,
  infer Args
>
  ? (...args: Args) => Promise<ServiceResponse<R>>
  : never;

/**
 * Exclut `prototype` (propre aux classes JS) et ne garde que les méthodes statiques utiles.
 */
export type WrappedService<T> = {
  [K in keyof T as K extends 'prototype' ? never : K]:
    T[K] extends ServiceMethod ? WrappedServiceMethod<T[K]> : T[K];
};

/**
 * Représente un service généré par OpenAPI (ensemble de méthodes statiques asynchrones).
 */
export type ServiceClass = {
  [key: string]: ServiceMethod;
};

/**
 * Version strictement typée d’un service après wrapping.
 * Permet d’extraire uniquement les méthodes valides et d’y appliquer la structure ServiceResponse.
 */
export type StaticServiceMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any
    ? (K extends 'prototype' ? never : K)
    : never]: T[K] extends (...args: infer Args) => infer R
    ? (...args: Args) => Promise<ServiceResponse<Awaited<R>>>
    : never;
};

/* ════════════════════════════════════════════════════════════════
   ⚙️ Configuration du client SDK
════════════════════════════════════════════════════════════════ */

export interface ProsperifyClientConfig {
  token?: string;
  apiKey?: string;
  baseUrl?: string;
  lang?: Lang;
}

/* ════════════════════════════════════════════════════════════════
   🧩 Interface centralisant tous les services Prosperify
════════════════════════════════════════════════════════════════ */

import type { ApiKeysService } from '@/sdk/services/ApiKeysService';
import type { AssistantsService } from '@/sdk/services/AssistantsService';
import type { AuthService } from '@/sdk/services/AuthService';
import type { ChatService } from '@/sdk/services/ChatService';
import type { FilesService } from '@/sdk/services/FilesService';
import type { FoldersService } from '@/sdk/services/FoldersService';
import type { InvitationsService } from '@/sdk/services/InvitationsService';
import type { LogsService } from '@/sdk/services/LogsService';
import type { MetricsService } from '@/sdk/services/MetricsService';
import type { OrganizationsService } from '@/sdk/services/OrganizationsService';
import type { RolesService } from '@/sdk/services/RolesService';
import type { ThreadsService } from '@/sdk/services/ThreadsService';
import type { UploadsService } from '@/sdk/services/UploadsService';
import type { UsersService } from '@/sdk/services/UsersService';

/**
 * ✅ Interface typée de tous les services exposés par ProsperifyClient.
 * Le service `auth` reste volontairement flexible pour ajouter des méthodes custom.
 */
export interface ProsperifyServices {
  apiKeys: WrappedService<typeof ApiKeysService>;
  assistants: WrappedService<typeof AssistantsService>;
  auth: any;
  chat: WrappedService<typeof ChatService>;
  files: WrappedService<typeof FilesService>;
  folders: WrappedService<typeof FoldersService>;
  invitations: WrappedService<typeof InvitationsService>;
  logs: WrappedService<typeof LogsService>;
  metrics: WrappedService<typeof MetricsService>;
  organizations: WrappedService<typeof OrganizationsService>;
  roles: WrappedService<typeof RolesService>;
  threads: WrappedService<typeof ThreadsService>;
  uploads: WrappedService<typeof UploadsService>;
  users: WrappedService<typeof UsersService>;
}
