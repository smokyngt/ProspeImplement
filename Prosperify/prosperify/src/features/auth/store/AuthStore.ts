import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { prosperify } from '@/core/ProsperifyClient';

interface User {
  id: string;
  email: string;
  name: string;
  organization?: string;
  emailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  
  // ✅ Nouvelle méthode pour set les données depuis React Query
  setAuthData: (user: User, token: string, refreshToken: string) => void;
  
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
      isAuthenticated: false,

      // ✅ Set les données d'auth depuis React Query
      setAuthData: (user: User, token: string, refreshToken: string) => {
        set({ user, token, refreshToken, isAuthenticated: true });
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

        set({
          user: null,
          token: null,
          refreshToken: null,
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
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;