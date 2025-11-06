export interface UserSummary {
  id: string;
  email: string;
  name: string;
  organization?: string | null;
  roles?: string[];
  preferences?: {
    language?: string;
    theme?: 'light' | 'dark' | 'auto';
  };
  createdAt?: number;
  object?: 'user';
}

export interface UsersListParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
  roleId?: string;
}

export interface CreateUserPayload {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserPayload {
  email?: string;
  name?: string;
  password?: string;
  preferences?: {
    language?: string;
    theme?: 'light' | 'dark' | 'auto';
  };
  verified?: boolean;
}

export interface RoleMutationPayload {
  userId: string;
  roleId: string;
}

// @deprecated alias conservé pour les anciens imports.
export type DeprecatedUserSummary = UserSummary;
