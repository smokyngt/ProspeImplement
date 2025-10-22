// import React, { useState, useCallback } from 'react'
// import AlertSuccess from '../../components/common/Alert/alertSuccess.commo,'
// import AlertError from '../../components/common/Alert/alertError.common'
// import Navbar from '../../components/common/Navbar/navbar.common'
// // import authService from '../../services/auth.service'
// import PasswordContent from '../../components/common/Dashboard/user/password.user'

// const Register: React.FC = () => {
//   // State variables for form data and status
//   const [isLoading, setIsLoading] = useState(false)
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [errors, setErrors] = useState({
//     name: null as string | null,
//     email: null as string | null,
//     password: null as string | null,
//     confirmPassword: null as string | null,
//     general: null as string | null
//   })
//   const [success, setSuccess] = useState<string | null>(null)
//   // Function to reset error and success messages
//   const resetErrors = useCallback(() => {
//     setErrors({
//       name: null,
//       email: null,
//       password: null,
//       confirmPassword: null,
//       general: null
//     })
//     setSuccess(null)
//   }, [])
//   // Function to validate form fields
//   const validateFields = useCallback(() => {
//     const newErrors = {
//       name: name ? null : 'Please provide your name',
//       email: email ? null : 'Please provide your email address',
//       password: password ? null : 'Password is required',
//       confirmPassword: confirmPassword ? (password === confirmPassword ? null : 'Passwords do not match') : 'Please confirm your password',
//       general: null
//     }
//     setErrors(newErrors)
//     return !Object.values(newErrors).some(Boolean) // Return true if no errors
//   }, [name, email, password, confirmPassword])
//   // Function to handle form submission
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     setIsLoading(true)
//     resetErrors()
//     if (!validateFields()) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         general: 'Please correct the errors in the form'
//       }))
//       setIsLoading(false)
//       return
//     }
//     try {
//       await authService.register(name, email, password)
//       setSuccess('Registration successful!')
//     } catch (error: any) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         general: 'An error occurred. Please try again.'
//       }))
//     } finally {
//       setIsLoading(false)
//     }
//   }
//   return (
//     <>
//       <Navbar />
//       <div className="w-full flex justify-center items-center">
//         <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm w-4/12 mb-20">
//           <div className="p-4 sm:p-7">
//             <div className="text-center">
//               <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
//               <p className="mt-2 text-sm text-gray-600">
//                 Already have an account?
//                 <a className="text-blue-600 decoration-2 hover:underline font-medium" href='/login'> Sign in here</a>
//               </p>
//             </div>
//             {success && <AlertSuccess message={success} onClose={() => setSuccess(null)} />}
//             {errors.general && <AlertError message={errors.general} onClose={() => setErrors({ ...errors, general: null })} />}
//             <form onSubmit={handleSubmit} className={success ? 'hidden' : 'block'}>
//               <div className="grid gap-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm mb-2">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${errors.name ? 'border-red-500' : ''}`}
//                     aria-describedby="name-error"
//                     required
//                   />
//                   {errors.name && <p className="text-xs text-red-600 mt-1" id="name-error">{errors.name}</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm mb-2">Email address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${errors.email ? 'border-red-500' : ''}`}
//                     aria-describedby="email-error"
//                     required
//                   />
//                   {errors.email && <p className="text-xs text-red-600 mt-1" id="email-error">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="password" className="block text-sm mb-2">Password</label>
//                   <Password id="password" onChange={(password) => setPassword(password)} className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}/>
//                   {errors.password && <p className="text-xs text-red-600 mt-1" id="password-error">{errors.password}</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="confirm-password" className="block text-sm mb-2">Confirm Password</label>
//                   <Password id="confirm-password" onChange={(password) => setConfirmPassword(password)} className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}/>
//                   {errors.confirmPassword && <p className="text-xs text-red-600 mt-1" id="confirm-password-error">{errors.confirmPassword}</p>}
//                 </div>
//                 <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" disabled={isLoading}>
//                   {isLoading ? 'Loading...' : 'Sign up'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// export default Register