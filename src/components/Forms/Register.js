import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from '../../redux/slice/users/usersSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  })
  //---Destructuring---
  const { fullname, email, password } = formData
  //---onchange handler----

  const dispatch = useDispatch()

  const { loading, userAuth } = useSelector((state) => state?.users)

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(registerUserAction(formData))
  };

  // Redirect user if already logged in
  if (userAuth?.userInfo?.status) {
    window.location.href = '/login'
  }

  return (
    <>
      <section className='relative py-16 bg-gray-50'>
        <div className='absolute top-0 left-0 w-full h-96 bg-gray-100' />
        <div className='relative container px-4 mx-auto'>
          <div className='max-w-xl mx-auto py-10 px-8 sm:px-20 bg-white rounded-md'>
            <div className='mb-6'>
              <h4 className='max-w-xs font-heading text-3xl sm:text-4xl mt-2'>
                Register Account
              </h4>
              <p className='text-gray-500 my-2'>
                Register an account to start tracking your expenses
              </p>

              {/* Display errors */}

              {
                userAuth?.error && (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                    <strong className='font-bold'>Holy smokes!</strong>
                    <span className='block sm:inline'> {userAuth?.error?.message}</span>
                    <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
                      <svg className='fill-current h-6 w-6 text-red-500' role='button' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <title>Close</title>
                        <path d='M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.93 2.93a1 1 0 1 1-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 1 1 1.414-1.414l2.93 2.93 2.93-2.93a1 1 0 1 1 1.414 1.414l-2.93 2.93 2.93 2.93a1 1 0 0 1 0 1.414z' />
                      </svg>
                    </span>
                  </div>
                )
              }

            </div>
            <form onSubmit={onSubmitHandler}>
              <div className='mb-4'>
                <label className='block text-sm leading-6 mb-2' htmlFor='true'>
                  Full Name
                </label>
                <input
                  name='fullname'
                  value={fullname}
                  onChange={onChangeHandler}
                  className='block w-full p-4 font-heading text-gray-500 placeholder-gray-300 bg-gray-50 rounded outline-none'
                  type='text'
                  placeholder='Enter full Name'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm leading-6 mb-2' htmlFor='true'>
                  Email
                </label>
                <input
                  name='email'
                  value={email}
                  onChange={onChangeHandler}
                  className='block w-full p-4 font-heading text-gray-500 placeholder-gray-300 bg-gray-50 rounded outline-none'
                  type='text'
                  placeholder='Enter Email Address'
                />
              </div>

              <div className='mb-6'>
                <label className='block text-sm leading-6 mb-2' htmlFor='true'>
                  Password
                </label>
                <input
                  className='block w-full p-4 font-heading text-gray-500 placeholder-gray-300 bg-gray-50 rounded outline-none'
                  type='password'
                  placeholder='Type Password'
                  name='password'
                  value={password}
                  onChange={onChangeHandler}
                />
              </div>

              <div className='text-right mb-6'>
                {loading ? (
                  <button
                    className='block w-full py-4 px-6 text-center font-heading font-medium text-base text-white bg-gray-500 hover:bg-green-600 border border-gray-500 hover:border-green-600 rounded-sm transition duration-200'
                    type='submit'
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    className='block w-full py-4 px-6 text-center font-heading font-medium text-base text-white bg-green-500 hover:bg-green-600 border border-green-500 hover:border-green-600 rounded-sm transition duration-200'
                    type='submit'
                  >
                    Register
                  </button>
                )}
              </div>

              <Link
                className='block font-heading text-indigo-600 text-center hover:underline mb-6'
                to={'/login'}
              >
                Login Instead
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
