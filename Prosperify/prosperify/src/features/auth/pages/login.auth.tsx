//  import React, { useState, useCallback, FormEvent } from 'react'
//  import AlertError from '../../components/common/Alert/alertError.common'
//  import AlertSuccess from '../../components/common/Alert/alertSuccess.commo,'
//  import Navbar from '../../components/common/Navbar/navbar.common'
//  import useAuthStore from '../../store/auth.store'

//  const Login: React.FC = () => {
//     //State hooks for form fields, loading state, and error/success messages
//    const [email, setEmail] = useState('')
//    const [password, setPassword] = useState('')
//    const [isLoading, setIsLoading] = useState(false)
//    const [errors, setErrors] = useState({ email: null, password: null, general: null })
//    const [success, setSuccess] = useState<string | null>(null)

//    const { login, user } = useAuthStore()

//     //Redirect to dashboard if already logged in
//    if (user) {
//      window.location.replace('/dashboard')
//    }

//     //Reset error and success messages
//    const resetErrors = useCallback(() => {
//      setErrors({ email: null, password: null, general: null })
//      setSuccess(null)
//    }, [])

//     //Validate form fields
//    const validateFields = useCallback(() => {
//      const newErrors = {
//        email: email ? null : 'Please provide your email address',
//        password: password ? null : 'Password is required',
//        general: null
//      }
//      setErrors(newErrors)
//      return !Object.values(newErrors).some(Boolean)
//    }, [email, password])

//     //Handle form submission
//    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//      event.preventDefault()
//      setIsLoading(true)

//      resetErrors()

//      if (!validateFields()) {
//        setErrors((prevErrors) => ({ ...prevErrors, general: 'Please correct the errors in the form' }))
//        setIsLoading(false)
//        return
//      }

//      try {
//        const { message } = await login(email, password)
//        setSuccess(message)
//        window.location.replace('/dashboard')
//      } catch (error: any) {
//        setErrors((prevErrors) => ({ ...prevErrors, general: error.message ?? 'An error occurred. Please try again.' }))
//        setIsLoading(false)
//      }
//    }

//    return (
//      <>
//        <Navbar />
//        {errors.general && (
//          <div className="fixed top-4 right-4 z-50">
//            <AlertError message={errors.general} onClose={() => setErrors({ ...errors, general: null })} />
//          </div>
//        )}
//        {success && (
//          <div className="fixed top-4 right-4 z-50">
//            <AlertSuccess message={success} onClose={() => setSuccess(null)} />
//          </div>
//        )}
//        <div className="w-full flex justify-center items-center">
//          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm w-4/12 relative mb-20">
//            <div className="p-4 sm:p-7">
//              <div className="text-center">
//                <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
//                <p className="mt-2 text-sm text-gray-600">
//                  Don&apos;t have an account yet?{' '}
//                  <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/register">
//                    Sign up here
//                  </a>
//                </p>
//              </div>
//              <div className="mt-5">
//                <button
//                  type="button"
//                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
//                >
//                  <svg
//                    className="w-4 h-auto"
//                    width="46"
//                    height="47"
//                    viewBox="0 0 46 47"
//                    fill="none"
//                  >
//                    <path
//                      d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
//                      fill="#4285F4"
//                    />
//                    <path
//                      d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
//                      fill="#34A853"
//                    />
//                    <path
//                      d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
//                      fill="#FBBC05"
//                    />
//                    <path
//                      d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
//                      fill="#EB4335"
//                    />
//                  </svg>
//                  Sign in with Google
//                </button>
//                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
//                  Or
//                </div>
//              </div>
//              <form onSubmit={handleSubmit}>
//                <div className="mt-5">
//                  <div className="grid gap-y-4">
//                    <div>
//                      <label htmlFor="email" className="block text-sm mb-2">Email address</label>
//                      <input
//                        type="email"
//                        id="email"
//                        name="email"
//                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
//                          errors.email ? 'border-red-500' : ''
//                        }`}
//                        required
//                        value={email}
//                        onChange={(e) => setEmail(e.target.value)}
//                        aria-describedby="email-error"
//                      />
//                      {errors.email && (
//                        <p className="text-xs text-red-600 mt-1" id="email-error">
//                          {errors.email}
//                        </p>
//                      )}
//                    </div>
//                    <div className="relative">
//                      <div className="flex justify-between items-center">
//                        <label htmlFor="password" className="block text-sm mb-2">
//                          Password
//                        </label>
//                        <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="/lostPassword">
//                          Lost password?
//                        </a>
//                      </div>

//                      <input
//                        id="password"
//                        type="password"
//                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
//                          errors.password ? 'border-red-500' : ''
//                        }`}
//                        placeholder="Enter password"
//                        value={password}
//                        onChange={(e) => setPassword(e.target.value)}
//                      />

//                      <button type="button" data-hs-toggle-password='{
//                          "target": "#password"
//                        }' className="absolute top-0 end-0 p-3.5 rounded-e-md">
//                        <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                          <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
//                          <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
//                          <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
//                          <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
//                          <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
//                          <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
//                        </svg>
//                      </button>
//                      {errors.password && <p className="text-xs text-red-600 mt-1" id="password-error">{errors.password}</p>}
//                    </div>
//                    <button
//                      type="submit"
//                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
//                      disabled={isLoading}
//                    >
//                      {isLoading ? 'Loading...' : 'Sign in'}
//                    </button>
//                  </div>
//                </div>
//              </form>
//            </div>
//          </div>
//          {errors.general && (
//            <div className="absolute top-0 right-0 m-4">
//              <AlertError message={errors.general} onClose={() => setErrors({ ...errors, general: null })} />
//            </div>
//          )}
//          {success && (
//            <div className="absolute top-0 right-0 m-4">
//              <AlertSuccess message={success} onClose={() => setSuccess(null)} />
//            </div>
//          )}
//        </div>
//      </>
//    )
//  }

//  export default Login
