/**
 * Type complet et fidèle à la structure "user" renvoyée par l’API Prosperify
 */
export interface UserSummary {
  id: string;
  object: 'user';
  name: string;
  email: string;
  organization?: string | null;
  verified: boolean;
  roles: string[];

  archived: boolean;
  archivedAt?: number | null;
  archivedBy?: string | null;
  createdAt: number;
  joinedAt?: number | null;
  invitedBy?: string | null;
  lastLoginAt?: number | null;
  lastRefreshAt?: number | null;

  preferences?: {
    language?: 'en' | 'fr';
    theme?: 'light' | 'dark';
  };
}
/**
 * Paramètres de filtrage/liste des utilisateurs
 */
export interface UsersListParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
  roleId?: string;
}

/**
 * Création d’un utilisateur
 */
export interface CreateUserPayload {
  email: string;
  name: string;
  password: string;
}

/**
 * Mise à jour d’un utilisateur
 */
export interface UpdateUserPayload {
  email?: string;
  name?: string;
  password?: string;
  preferences?: {
    language?: 'en' | 'fr';
    theme?: 'light' | 'dark';
  };
  verified?: boolean;
}

/**
 * Ajout ou retrait de rôle utilisateur
 */
export interface RoleMutationPayload {
  userId: string;
  roleId: string;
}

/** 
 * @deprecated (Compatibilité ancienne version)
 */
export type DeprecatedUserSummary = UserSummary;
