// src/types/UserFromAPI.ts
export interface UserFromAPI {
  archived: boolean;
  archivedAt?: number | null;
  archivedBy?: string | null;
  createdAt: number;
  email: string;
  id: string;
  invitedBy?: string | null;
  joinedAt?: number | null;
  lastLoginAt?: number | null;
  lastRefreshAt?: number | null;
  name: string;
  object: 'user';
  organization?: string | null;
  preferences?: {
    language?: 'en' | 'fr';
    theme?: 'light' | 'dark';
  };
  roles: string[];
  verified: boolean;
}
