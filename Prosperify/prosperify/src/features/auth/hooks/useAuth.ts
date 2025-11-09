import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { prosperify } from '@/core/ProsperifyClient';
import { useAuthStore, type AuthUser } from '../store/AuthStore';
import type { ServiceResponse } from '@/core/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  organization?: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  apiKey?: string;
  user: AuthUser;
}

// ✅ Interface pour la réponse de login
interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
  apiKey?: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    setAuthData,
    clearAuth,
    updateToken,
    user,
    isAuthenticated,
    accessToken,
  } = useAuthStore();

  /* ════════════════════════════════════════════════════════════════
     LOGIN - ✅ UN SEUL APPEL API ICI
  ════════════════════════════════════════════════════════════════ */
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // ✅ L'UNIQUE endroit où on appelle l'API
      const response = await prosperify.auth.postV1AuthLogin(credentials);
      
      // ✅ Extraction type-safe
      const data = response?.data as unknown as LoginResponse;
      
      if (!data?.user || !data?.accessToken) {
        throw new Error('Invalid login response');
      }
      
      return data;
    },
    onSuccess: (data) => {
      // ✅ Sauvegarde des données d'auth
      setAuthData(data.user, data.accessToken, data.refreshToken, data.apiKey);
      
      // ✅ Invalide le cache pour refresh
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });

  /* ════════════════════════════════════════════════════════════════
     REGISTER
  ════════════════════════════════════════════════════════════════ */
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await prosperify.auth.postV1AuthRegister(data);
      const authData = response?.data as unknown as LoginResponse;
      
      if (!authData?.user || !authData?.accessToken) {
        throw new Error('Invalid register response');
      }
      
      return authData;
    },
    onSuccess: (data) => {
      setAuthData(data.user, data.accessToken, data.refreshToken, data.apiKey);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      navigate('/dashboard-orga');
    },
  });

  /* ════════════════════════════════════════════════════════════════
     LOGOUT
  ════════════════════════════════════════════════════════════════ */
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (user?.id) {
        await prosperify.auth.postV1AuthTokenRevoke({ userId: user.id });
      }
    },
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      navigate('/login');
    },
  });

  /* ════════════════════════════════════════════════════════════════
     REFRESH TOKEN
  ════════════════════════════════════════════════════════════════ */
  const refreshMutation = useMutation({
    mutationFn: async (refreshToken: string) => {
      const response = await prosperify.auth.postV1AuthTokenRefresh({ refreshToken });
      const data = response?.data as unknown as { accessToken: string };
      
      if (!data?.accessToken) {
        throw new Error('Invalid refresh response');
      }
      
      return data;
    },
    onSuccess: (data) => {
      updateToken(data.accessToken);
    },
    onError: () => {
      clearAuth();
      navigate('/login');
    },
  });

  /* ════════════════════════════════════════════════════════════════
     VERIFY EMAIL
  ════════════════════════════════════════════════════════════════ */
  const verifyEmailMutation = useMutation({
    mutationFn: async (data: { email: string; otp: string }) => {
      return await prosperify.auth.postV1AuthEmailVerify(data);
    },
    onSuccess: () => {
      if (user) {
        useAuthStore.setState({
          user: { ...user, verified: true },
        });
      }
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });

  /* ════════════════════════════════════════════════════════════════
     PASSWORD MANAGEMENT
  ════════════════════════════════════════════════════════════════ */
  const resendVerificationMutation = useMutation({
    mutationFn: async (email: string) => {
      return await prosperify.auth.postV1AuthEmailSend({ email });
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      return await prosperify.auth.postV1AuthPasswordSend({ email });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { token: string; password: string }) => {
      return await prosperify.auth.postV1AuthPasswordReset(data.token, {
        password: data.password,
      });
    },
  });

  /* ════════════════════════════════════════════════════════════════
     SSO
  ════════════════════════════════════════════════════════════════ */
  const ssoStartMutation = useMutation({
    mutationFn: async (data: {
      organizationId: string;
      mode?: 'json' | 'redirect';
      state?: string;
    }) => {
      return await prosperify.auth.getV1AuthSsoStart(
        data.organizationId,
        data.mode,
        data.state
      );
    },
  });

  const ssoCallbackMutation = useMutation({
    mutationFn: async (data: { code: string; state: string; organizationId: string }) => {
      const response = await prosperify.auth.getV1AuthSsoCallback(
        data.code,
        data.state,
        data.organizationId
      );
      
      const authData = response?.data as unknown as LoginResponse;
      
      if (!authData?.user || !authData?.accessToken) {
        throw new Error('Invalid SSO callback response');
      }
      
      return authData;
    },
    onSuccess: (data) => {
      setAuthData(data.user, data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      navigate('/dashboard-orga');
    },
  });

  /* ════════════════════════════════════════════════════════════════
     CURRENT USER
  ════════════════════════════════════════════════════════════════ */
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      if (!accessToken) return null;
      return user;
    },
    enabled: !!accessToken && isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  /* ════════════════════════════════════════════════════════════════
     RETURN
  ════════════════════════════════════════════════════════════════ */
  return {
    // State
    user: currentUser || user,
    isAuthenticated,
    isLoading: isLoadingUser,

    // Mutations async (pour utilisation simple)
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    refreshToken: refreshMutation.mutateAsync,
    verifyEmail: verifyEmailMutation.mutateAsync,
    resendVerification: resendVerificationMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    ssoStart: ssoStartMutation.mutateAsync,
    ssoCallback: ssoCallbackMutation.mutateAsync,

    // Mutations objects (pour états isPending, error, etc.)
    loginMutation,
    registerMutation,
    logoutMutation,
    refreshMutation,
    verifyEmailMutation,
    resendVerificationMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    ssoStartMutation,
    ssoCallbackMutation,
  };
}