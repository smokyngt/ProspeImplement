/* ========================================================================== */
/*                         Auth Module – Type Definitions                      */
/* ========================================================================== */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  roles: string[];
  organization?: string | null;
  preferences?: {
    language?: 'en' | 'fr';
    theme?: 'light' | 'dark';
  };
  object: 'user';
  archived: boolean;
  createdAt: number;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  apiKey?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface VerifyEmailResponse {
  success: boolean;
}

export interface SendEmailResponse {
  success: boolean;
}

export interface ResetPasswordResponse {
  user: AuthUser;
}

export interface AuthError {
  message: string;
  status?: number;
}
