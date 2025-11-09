import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { prosperify } from '@/core/ProsperifyClient';
import { useAuthStore } from '../store/AuthStore';
import type {
  AuthUser,
  LoginResponse,
  RefreshTokenResponse,
  VerifyEmailResponse,
  SendEmailResponse,
  ResetPasswordResponse,
} from '../types/authType';

/* ==========================================================================
   🔐 useAuth — Centralized authentication hook
   ==========================================================================
   Handles:
   - Login / Register
   - Refresh tokens
   - Email verification / resend
   - Password recovery
   - SSO flows
   All fully typed using authTypes.ts
   ========================================================================== */

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuthData, clearAuth, updateToken, user, isAuthenticated } = useAuthStore();

  /* ════════════════════════════════════════════════════════════════
     LOGIN
  ════════════════════════════════════════════════════════════════ */
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await prosperify.users.postV1UsersLogin(credentials);
      const data = response?.data as unknown as LoginResponse;

      if (!data?.user || !data?.accessToken) {
        throw new Error('Invalid login response');
      }

      const typedUser: AuthUser = {
        ...data.user,
        object: 'user',
        createdAt: new Date(data.user.createdAt).getTime(),
      };

      return { ...data, user: typedUser };
    },
    onSuccess: (data) => {
      setAuthData(data.user, data.accessToken, data.refreshToken, data.apiKey);
      prosperify.setToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });

  /* ════════════════════════════════════════════════════════════════
     REGISTER
  ════════════════════════════════════════════════════════════════ */
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await prosperify.users.postV1UsersNew(data);
      const userData = (response?.data as { user?: AuthUser })?.user;

      if (!userData) {
        throw new Error('Invalid register response');
      }

      return { userData, credentials: data };
    },
    onSuccess: async ({ userData, credentials }) => {
      try {
        await loginMutation.mutateAsync({
          email: credentials.email,
          password: credentials.password,
        });
        navigate('/dashboard-orga');
      } catch {
        navigate('/verify-email-prompt', {
          state: { email: credentials.email },
        });
      }
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
      const data = response?.data as unknown as RefreshTokenResponse;

      if (!data?.accessToken) throw new Error('Invalid refresh response');
      return data;
    },
    onSuccess: (data) => {
      updateToken(data.accessToken);
      prosperify.setToken(data.accessToken);
    },
    onError: () => {
      clearAuth();
      navigate('/login');
    },
  });

  /* ════════════════════════════════════════════════════════════════
     EMAIL VERIFICATION
  ════════════════════════════════════════════════════════════════ */
  const verifyEmailMutation = useMutation({
    mutationFn: async (data: { email: string; otp: string }) => {
      const response = await prosperify.auth.postV1AuthEmailVerify(data);
      return response?.data as unknown as VerifyEmailResponse;
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

  const resendVerificationMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await prosperify.auth.postV1AuthEmailSend({ email });
      return response?.data as unknown as SendEmailResponse;
    },
  });

  /* ════════════════════════════════════════════════════════════════
     PASSWORD MANAGEMENT
  ════════════════════════════════════════════════════════════════ */
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) =>
      prosperify.auth.postV1AuthPasswordSend({ email }),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { token: string; password: string }) => {
      const response = await prosperify.auth.postV1AuthPasswordReset(
        data.token,
        { password: data.password },
      );
      return response?.data as unknown as ResetPasswordResponse;
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
    }) => prosperify.auth.getV1AuthSsoStart(data.organizationId, data.mode, data.state),
  });

  const ssoCallbackMutation = useMutation({
    mutationFn: async (data: {
      code: string;
      state: string;
      organizationId: string;
    }) => {
      const response = await prosperify.auth.getV1AuthSsoCallback(
        data.code,
        data.state,
        data.organizationId,
      );

      const authData = response?.data as unknown as LoginResponse;

      if (!authData?.user || !authData?.accessToken) {
        throw new Error('Invalid SSO callback response');
      }

      return authData;
    },
    onSuccess: (data) => {
      const typedUser: AuthUser = {
        ...data.user,
        object: 'user',
        createdAt: new Date(data.user.createdAt).getTime(),
      };

      setAuthData(typedUser, data.accessToken, data.refreshToken);
      prosperify.setToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      navigate('/dashboard-orga');
    },
  });

  /* ════════════════════════════════════════════════════════════════
     RETURN API
  ════════════════════════════════════════════════════════════════ */
  return {
    user,
    isAuthenticated,

    // Auth mutations
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    loginMutation,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    registerMutation,

    logout: logoutMutation.mutate,
    logoutMutation,

    refreshToken: refreshMutation.mutate,
    refreshMutation,

    // Email verification
    verifyEmail: verifyEmailMutation.mutate,
    verifyEmailAsync: verifyEmailMutation.mutateAsync,
    verifyEmailMutation,

    resendVerification: resendVerificationMutation.mutate,
    resendVerificationMutation,

    // Password management
    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordMutation,

    resetPassword: resetPasswordMutation.mutate,
    resetPasswordMutation,

    // SSO
    startSSO: ssoStartMutation.mutate,
    ssoStartMutation,

    handleSSOCallback: ssoCallbackMutation.mutate,
    ssoCallbackMutation,
  };
}
