//  import React, { useState } from 'react'
//  import { useParams } from 'react-router-dom'
//  import AlertError from '../../components/common/Alert/alertError.common'
//  import AlertSuccess from '../../components/common/Alert/alertSuccess.commo,'
//  import Navbar from '../../components/common/Navbar/navbar.common'
//  import Password from '../../components/common/Password/password.common'
//   import authService from '../../services/auth.service'
//  const ChangePassword: React.FC = () => {
//     //State variables
//    const [isLoading, setIsLoading] = useState(false)
//    const [password, setPassword] = useState('')
//    const [confirmPassword, setConfirmPassword] = useState('')
//    const [errors, setErrors] = useState({
//      password: null as string | null,
//      confirmPassword: null as string | null,
//      general: null as string | null
//    })
//    const [success, setSuccess] = useState<string | null>(null)
//    // Get the token from the URL parameters
//    const { token } = useParams<{ token: string }>()
//    // Reset errors and success messages
//    const resetErrors = () => {
//      setErrors({
//        password: null,
//        confirmPassword: null,
//        general: null
//      })
//      setSuccess(null)
//    }
//     //Validate form fields
//    const validateFields = () => {
//      const newErrors = {
//        password: password ? null : 'Password is required',
//        confirmPassword: confirmPassword
//          ? password === confirmPassword
//            ? null
//            : 'Passwords do not match'
//          : 'Please confirm your password',
//        general: null
//      }
//      setErrors(newErrors)
//      return !Object.values(newErrors).some(Boolean)  //Return true if no errors
//    }
//     //Handle form submission
//    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//      event.preventDefault()
//      setIsLoading(true)
//      resetErrors()
//       //Validate fields before proceeding
//      if (!validateFields()) {
//        setErrors((prevErrors) => ({
//          ...prevErrors,
//          general: 'Please correct the errors in the form'
//        }))
//        setIsLoading(false)
//        return
//      }
//       //Attempt to reset the password
//      try {
//        const { message } = await authService.verifyResetPassword(token, password)
//        setSuccess(message)
//      } catch (error: any) {
//        setErrors((prevErrors) => ({
//          ...prevErrors,
//          general: error.message ?? 'An error occurred. Please try again.'
//        }))
//      } finally {
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
//        <section className="bg-white">
//          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//            <div className="w-full p-6 bg-white rounded-lg md:mt-0 sm:max-w-md sm:p-8 shadow-md border border-gray-200">
//              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
//                Change Password
//              </h2>
//              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
//                <div className="w-full p-4 bg-white rounded-lg">
//                  <label htmlFor="password" className="block text-sm mb-2">Password</label>
//                  <Password id="password" onChange={(password) => setPassword(password)} className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`} />
//                  {errors.password && <p className="text-xs text-red-600 mt-1" id="password-error">{errors.password}</p>}
//                </div>
//                <div className="w-full p-4 bg-white rounded-lg">
//                  <label htmlFor="confirm-password" className="block text-sm mb-2">Confirm Password</label>
//                  <Password id="confirm-password" onChange={(password) => setConfirmPassword(password)} className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`} />
//                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1" id="confirm-password-error">{errors.confirmPassword}</p>}
//                </div>
//                <div className="flex items-start">
//                  <div className="flex items-center h-5">
//                    <input
//                      id="newsletter"
//                      aria-describedby="newsletter"
//                      type="checkbox"
//                      className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-blue-300"
//                      required
//                    />
//                  </div>
//                </div>
//                <button
//                  type="submit"
//                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                  disabled={isLoading}
//                >
//                  {isLoading ? 'Loading...' : 'Reset Password'}
//                </button>
//              </form>
//            </div>
//          </div>
//        </section>
//      </>
//    )
//  }
//  export default ChangePassword