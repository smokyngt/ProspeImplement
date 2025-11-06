import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import AlertError from '@/components/ui/base/Alert/alertError';
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess';
import useAuthStore from '../store/AuthStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthData, user, isAuthenticated } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    email: string | null; 
    password: string | null; 
  }>({ 
    email: null, 
    password: null, 
  });
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ Redirection si déjà connecté
  React.useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/dashboard-orga');
    }
  }, [isAuthenticated, user, navigate]);

  // ✅ React Query mutation pour le login
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const res = await prosperify.auth.postV1AuthLogin({ email, password });
      const { token, refreshToken, user } = res?.data || {};

      if (!token || !user) {
        throw new Error('Invalid response from server');
      }

      return { token, refreshToken, user, message: res.event?.code || 'Login successful' };
    },
    onSuccess: (data) => {
      // ✅ Sauvegarder dans Zustand
      setAuthData(data.user, data.token, data.refreshToken);
      setSuccess(data.message);
      
      // ✅ Redirection après succès
      setTimeout(() => {
        navigate('/dashboard-orga');
      }, 1000);
    },
  });

  // ✅ Validation
  const validateFields = () => {
    const newErrors = {
      email: !email ? 'Please provide your email address' : null,
      password: !password ? 'Password is required' : null,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // ✅ Soumission du formulaire
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({ email: null, password: null });

    if (!validateFields()) {
      return;
    }

    await loginMutation.mutateAsync({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Alerts */}
      {loginMutation.error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError 
            message={(loginMutation.error as Error).message || 'An error occurred. Please try again.'} 
            onClose={() => loginMutation.reset()} 
            description=""
          />
        </div>
      )}
      
      {success && (
        <div className="fixed top-4 right-4 z-50">
          <AlertSuccess 
            message={success} 
            onClose={() => setSuccess(null)} 
          />
        </div>
      )}

      {/* Form Container */}
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account yet?{' '}
              <a 
                className="text-blue-600 decoration-2 hover:underline font-medium" 
                href="/register"
              >
                Sign up here
              </a>
            </p>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
              <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
              <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
              <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
              <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2 font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="you@example.com"
                  disabled={loginMutation.isPending}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <a 
                    className="text-sm text-blue-600 decoration-2 hover:underline font-medium" 
                    href="/forgot-password"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter password"
                  disabled={loginMutation.isPending}
                />
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;