import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess';
import AlertError from '@/components/ui/base/Alert/alertError';

const EmailVerificationBanner: React.FC = () => {
  const { user, resendVerificationMutation } = useAuth();
  const [success, setSuccess] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleResend = async () => {
    if (!user?.email) return;
    
    try {
      await resendVerificationMutation.mutateAsync(user.email);
      setSuccess('Verification email sent!');
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      // L'erreur est déjà gérée par la mutation
    }
  };

  return (
    <>
      {/* Alerts */}
      {success && (
        <div className="fixed top-4 right-4 z-50">
          <AlertSuccess message={success} onClose={() => setSuccess(null)} />
        </div>
      )}
      
      {resendVerificationMutation.error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError 
            message={(resendVerificationMutation.error as Error).message || 'Failed to send verification email'} 
            onClose={() => resendVerificationMutation.reset()} 
            description="" 
          />
        </div>
      )}

      {/* Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Email not verified.</span> Please check
              your inbox and verify your email address to access all features.
            </p>
          </div>
          <div className="ml-3 flex gap-2">
            <button
              onClick={handleResend}
              disabled={resendVerificationMutation.isPending}
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600 disabled:opacity-50 flex items-center gap-1"
            >
              {resendVerificationMutation.isPending && (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-700"></div>
              )}
              {resendVerificationMutation.isPending ? 'Sending...' : 'Resend email'}
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationBanner;
