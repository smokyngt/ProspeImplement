import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { prosperify } from '@/core/ProsperifyClient';

interface User {
  id: string;
  email: string;
  name: string;
  organization?: string | null;
  emailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  apiKey: string | null;
  isAuthenticated: boolean;

  // ✅ Nouvelle méthode pour set les données depuis React Query
  setAuthData: (
    user: User,
    token: string,
    refreshToken?: string | null,
    apiKey?: string | null,
  ) => void;

  setApiKey: (apiKey: string | null) => void;

  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  setUser: (user: User | null) => void;
  
  verifyEmail: (token: string) => Promise<{ message: string }>;
  resendVerificationEmail: () => Promise<{ message: string }>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      apiKey: localStorage.getItem('api_key'),
      isAuthenticated: false,

      // ✅ Set les données d'auth depuis React Query
      setAuthData: (
        user: User,
        token: string,
        refreshToken?: string | null,
        apiKey?: string | null,
      ) => {
        prosperify.setToken(token);
        localStorage.setItem('access_token', token);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        if (apiKey) {
          prosperify.setApiKey(apiKey);
          localStorage.setItem('api_key', apiKey);
        }
        localStorage.setItem('current_user', JSON.stringify(user));

        set({
          user,
          token,
          refreshToken: refreshToken ?? null,
          apiKey: apiKey ?? get().apiKey ?? null,
          isAuthenticated: true,
        });
      },

      /**
       * Synchronise dynamiquement la clé API avec Prosperify et le stockage local.
       */
      setApiKey: (apiKey: string | null) => {
        if (apiKey) {
          prosperify.setApiKey(apiKey);
          localStorage.setItem('api_key', apiKey);
        } else {
          prosperify.setApiKey('');
          localStorage.removeItem('api_key');
        }
        set({ apiKey });
      },

      verifyEmail: async (token: string) => {
        try {
          const res = await prosperify.auth.postV1AuthEmailVerify({ token });

          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                emailVerified: true,
              },
            });
          }

          return { message: res.event?.code || 'Email verified successfully' };
        } catch (error: any) {
          console.error('❌ Email verification error:', error);
          throw new Error(error?.body?.message || error?.message || 'Email verification failed');
        }
      },

      resendVerificationEmail: async () => {
        try {
          const { token } = get();

          if (!token) {
            throw new Error('You must be logged in to resend verification email');
          }

          const res = await prosperify.auth.postV1AuthEmailSend();

          return { message: res.event?.code || 'Verification email sent successfully' };
        } catch (error: any) {
          console.error('❌ Resend verification error:', error);
          throw new Error(error?.body?.message || error?.message || 'Failed to send verification email');
        }
      },

      logout: async () => {
        const { token } = get();

        if (token) {
          try {
            await prosperify.auth.postV1AuthLogout();
          } catch (error) {
            console.error('❌ Logout error:', error);
          }
        }

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
        localStorage.removeItem('api_key');
        prosperify.setToken('');
        prosperify.setApiKey('');

        set({
          user: null,
          token: null,
          refreshToken: null,
          apiKey: null,
          isAuthenticated: false,
        });
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const res = await prosperify.auth.postV1AuthRefresh({ refreshToken });
          const { token: newToken, refreshToken: newRefreshToken } = res?.data || {};

          if (!newToken) {
            throw new Error('Invalid refresh response');
          }

          prosperify.setToken(newToken);
          localStorage.setItem('access_token', newToken);
          if (newRefreshToken) {
            localStorage.setItem('refresh_token', newRefreshToken);
          }

          set({
            token: newToken,
            refreshToken: newRefreshToken || refreshToken,
          });
        } catch (error: any) {
          get().logout();
          throw error;
        }
      },

      setUser: (user: User | null) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        apiKey: state.apiKey,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;