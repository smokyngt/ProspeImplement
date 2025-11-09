import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { prosperify } from '@/core/ProsperifyClient';

// ✅ Type User cohérent avec le SDK
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  object: 'user';
  organization?: string | null;
  verified: boolean;
  archived: boolean;
  archivedAt?: number | null;
  archivedBy?: string | null;
  createdAt: number;
  invitedBy?: string | null;
  joinedAt?: number | null;
  lastLoginAt?: number | null;
  lastRefreshAt?: number | null;
  preferences?: {
    language?: 'en' | 'fr';
    theme?: 'light' | 'dark';
  };
  roles: string[];
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  apiKey: string | null;
  isAuthenticated: boolean;

  // ✅ Actions principales
  setAuthData: (
    user: AuthUser,
    accessToken: string,
    refreshToken?: string | null,
    apiKey?: string | null,
  ) => void;
  setUser: (user: AuthUser | null) => void;
  setApiKey: (apiKey: string | null) => void;
  updateToken: (accessToken: string, refreshToken?: string | null) => void;
  clearAuth: () => void;

  // ✅ Actions async (déléguées au hook useAuth)
  refreshAccessToken: () => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      apiKey: null,
      isAuthenticated: false,

      /* ════════════════════════════════════════════════════════════════
         SET AUTH DATA
      ════════════════════════════════════════════════════════════════ */
      setAuthData: (user, accessToken, refreshToken = null, apiKey = null) => {
        localStorage.setItem('access_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        if (apiKey) {
          localStorage.setItem('api_key', apiKey);
        }
        localStorage.setItem('current_user', JSON.stringify(user));

        // Sync avec ProsperifyClient
        prosperify.setToken(accessToken);
        if (apiKey) {
          prosperify.setApiKey(apiKey);
        }

        set({
          user,
          accessToken,
          refreshToken,
          apiKey,
          isAuthenticated: true,
        });
      },

      /* ════════════════════════════════════════════════════════════════
         SET USER
      ════════════════════════════════════════════════════════════════ */
      setUser: (user) => {
        if (user) {
          localStorage.setItem('current_user', JSON.stringify(user));
        }
        set({ user });
      },

      /* ════════════════════════════════════════════════════════════════
         SET API KEY
      ════════════════════════════════════════════════════════════════ */
      setApiKey: (apiKey) => {
        if (apiKey) {
          localStorage.setItem('api_key', apiKey);
          prosperify.setApiKey(apiKey);
        } else {
          localStorage.removeItem('api_key');
          prosperify.setApiKey('');
        }
        set({ apiKey });
      },

      /* ════════════════════════════════════════════════════════════════
         UPDATE TOKEN
      ════════════════════════════════════════════════════════════════ */
      updateToken: (accessToken, refreshToken = null) => {
        localStorage.setItem('access_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        prosperify.setToken(accessToken);

        set({
          accessToken,
          ...(refreshToken && { refreshToken }),
        });
      },

      /* ════════════════════════════════════════════════════════════════
         CLEAR AUTH
      ════════════════════════════════════════════════════════════════ */
      clearAuth: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
        localStorage.removeItem('api_key');

        prosperify.setToken('');
        prosperify.setApiKey('');

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          apiKey: null,
          isAuthenticated: false,
        });
      },

      /* ════════════════════════════════════════════════════════════════
         REFRESH ACCESS TOKEN
      ════════════════════════════════════════════════════════════════ */
      refreshAccessToken: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const res = await prosperify.auth.postV1AuthTokenRefresh({ refreshToken });
          const newToken = res?.data?.accessToken;

          if (!newToken) {
            throw new Error('Invalid refresh response');
          }

          get().updateToken(newToken);
        } catch (error: any) {
          get().clearAuth();
          throw error;
        }
      },

      /* ════════════════════════════════════════════════════════════════
         VERIFY EMAIL
      ════════════════════════════════════════════════════════════════ */
      verifyEmail: async (email: string, otp: string) => {
        try {
          const res = await prosperify.auth.postV1AuthEmailVerify({ email, otp });

          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                verified: true,
              },
            });
          }

          if (!res.data?.success) {
            throw new Error('Email verification failed');
          }
        } catch (error: any) {
          console.error('❌ Email verification error:', error);
          throw new Error(error?.message || 'Email verification failed');
        }
      },

      /* ════════════════════════════════════════════════════════════════
         RESEND VERIFICATION EMAIL
      ════════════════════════════════════════════════════════════════ */
      resendVerificationEmail: async (email: string) => {
        try {
          const res = await prosperify.auth.postV1AuthEmailSend({ email });

          if (!res.data?.success) {
            throw new Error('Failed to send verification email');
          }
        } catch (error: any) {
          console.error('❌ Resend verification error:', error);
          throw new Error(error?.message || 'Failed to send verification email');
        }
      },

      /* ════════════════════════════════════════════════════════════════
         LOGOUT
      ════════════════════════════════════════════════════════════════ */
      logout: async () => {
        const user = get().user;

        if (user?.id) {
          try {
            await prosperify.auth.postV1AuthTokenRevoke({ userId: user.id });
          } catch (error) {
            console.error('❌ Logout error:', error);
          }
        }

        get().clearAuth();
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        apiKey: state.apiKey,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);