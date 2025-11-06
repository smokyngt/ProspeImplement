import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import useAuthStore from '../store/AuthStore';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, setUser } = useAuthStore();

  // ✅ React Query mutation pour vérifier l'email
  const verifyEmailMutation = useMutation({
    mutationFn: async (token: string) => {
      const res = await prosperify.auth.postV1AuthEmailVerify({ token });

      // ✅ Mettre à jour le user dans Zustand
      if (user) {
        setUser({ ...user, emailVerified: true });
      }

      return { message: res.event?.code || 'Email verified successfully' };
    },
    onSuccess: (data) => {
      // ✅ Redirection après 3 secondes
      setTimeout(() => {
        navigate('/dashboard-orga');
      }, 3000);
    },
  });

  // ✅ Vérification automatique au chargement
  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      verifyEmailMutation.mutate(''); // Déclenche une erreur pour afficher le message
      return;
    }

    verifyEmailMutation.mutate(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          {/* Loading state */}
          {verifyEmailMutation.isPending && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Verifying your email...
              </h2>
              <p className="text-sm text-gray-600">Please wait a moment.</p>
            </div>
          )}

          {/* Success state */}
          {verifyEmailMutation.isSuccess && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Email Verified!
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Your email has been successfully verified.
              </p>
              <p className="text-xs text-gray-500">
                Redirecting to dashboard in 3 seconds...
              </p>
            </div>
          )}

          {/* Error state */}
          {verifyEmailMutation.isError && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Verification Failed
              </h2>
              <p className="text-sm text-red-600 mb-4">
                {(verifyEmailMutation.error as Error)?.message || 
                 'Invalid verification link. No token provided.'}
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;