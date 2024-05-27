import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterUserMutation } from '@/store/authApi'
import { RootState } from '@/store/store';
import { setErrorMessage, clearErrorMessage } from '@/store/slices/authSlice';

const SignUp = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [birthday, setBirthday] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state: RootState) => state.auth);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSuccessMessage(null)
    dispatch(clearErrorMessage())

    if (password !== passwordConfirm) {
      setErrorMessage('密碼不一致，請重新輸入')

      return
    }

    try {
      const result = await registerUser({ name, email, password, passwordConfirm, birthday }).unwrap();
      console.log('registerUser:', result);
      setSuccessMessage(`${result.message}`)
    } catch (error) {
      if (isErrorWithData(error)) {
        dispatch(setErrorMessage(error.data.message || '註冊失敗，請重新操作一次'));
      } else if (error instanceof Error) {
        dispatch(setErrorMessage(error.message || '註冊失敗，請重新操作一次'));
      } else {
        dispatch(setErrorMessage('註冊失敗，請重新操作一次'));
      }
    }
  }

  // 類型守衛，檢查 error 是否具有 data 屬性
  function isErrorWithData(error: any): error is { data: { message: string } } {
    return error && typeof error === 'object' && 'data' in error && typeof error.data === 'object' && 'message' in error.data;
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md'>
        <div className='font-medium self-center text-xl sm:text-3xl text-gray-800'>加入我們</div>
        <div className='mt-4 self-center text-xl sm:text-sm text-gray-800'>快來註冊屬於你的帳號吧</div>

        <div className='mt-10'>
          <form action='#' onSubmit={handleRegister}>
            <div className='flex flex-col mb-5'>
              <label htmlFor='name' className='mb-1 text-xs tracking-wide text-gray-600'>
                姓名:
              </label>
              <div className='relative'>
                <div
                  className='
              inline-flex
              items-center
              justify-center
              absolute
              left-0
              top-0
              h-full
              w-10
              text-gray-400
            '
                >
                  <i className='fas fa-user text-blue-500'></i>
                </div>

                <input
                  id='name'
                  type='name'
                  name='name'
                  className='
              text-sm
              placeholder-gray-500
              pl-10
              pr-4
              rounded-2xl
              border border-gray-400
              w-full
              py-2
              focus:outline-none focus:border-blue-400
            '
                  placeholder='Enter your name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-col mb-5'>
              <label htmlFor='email' className='mb-1 text-xs tracking-wide text-gray-600'>
                E-Mail:
              </label>
              <div className='relative'>
                <div
                  className='
              inline-flex
              items-center
              justify-center
              absolute
              left-0
              top-0
              h-full
              w-10
              text-gray-400
            '
                >
                  <i className='fas fa-at text-blue-500'></i>
                </div>

                <input
                  id='email'
                  type='email'
                  name='email'
                  className='
              text-sm
              placeholder-gray-500
              pl-10
              pr-4
              rounded-2xl
              border border-gray-400
              w-full
              py-2
              focus:outline-none focus:border-blue-400
            '
                  placeholder='Enter your email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-col mb-6'>
              <label htmlFor='password' className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'>
                密碼:
              </label>
              <div className='relative'>
                <div
                  className='
              inline-flex
              items-center
              justify-center
              absolute
              left-0
              top-0
              h-full
              w-10
              text-gray-400
            '
                >
                  <span>
                    <i className='fas fa-lock text-blue-500'></i>
                  </span>
                </div>

                <input
                  id='password'
                  type='password'
                  name='password'
                  className='
              text-sm
              placeholder-gray-500
              pl-10
              pr-4
              rounded-2xl
              border border-gray-400
              w-full
              py-2
              focus:outline-none focus:border-blue-400
            '
                  placeholder='Enter your password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-col mb-6'>
              <label htmlFor='passwordConfirm' className='mb-1 text-xs tracking-wide text-gray-600'>
                確認密碼:
              </label>
              <div className='relative'>
                <div className='inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400'>
                  <i className='fas fa-lock text-blue-500'></i>
                </div>
                <input
                  id='passwordConfirm'
                  type='password'
                  name='passwordConfirm'
                  className='text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                  placeholder='Confirm your password'
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='flex flex-col mb-5'>
              <label htmlFor='birthday' className='mb-1 text-xs tracking-wide text-gray-600'>
                生日:
              </label>
              <input
                id='birthday'
                type='date'
                name='birthday'
                className='text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400'
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
                required
              />
            </div>
            <div className='flex w-full'>
              <button
                type='submit'
                className='flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in'
              >
                <span className='mr-2 uppercase'>Sign Up</span>
                <span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='pt-4'>
        {errorMessage && <p className='text-red-600'>註冊 錯誤訊息: {errorMessage}</p>}
        {successMessage && <p className='text-green-600'>註冊 成功訊息: {successMessage}</p>}
      </div>
    </div>
  )
}

SignUp.propTypes = {}

export default SignUp
