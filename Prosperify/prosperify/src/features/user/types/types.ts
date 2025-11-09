export interface UserPreferences {
  language?: 'en' | 'fr';
  theme?: 'light' | 'dark' | 'auto';
}

export interface UserSummary {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  organization?: string | null;
  roles: string[];
  archived: boolean;
  createdAt: number;
  lastLoginAt?: number | null;
  preferences?: UserPreferences;
}
