import React, { useReducer, useState } from 'react'
import { useLoginUserMutation, useHandleGoogleMutation } from '@/store/authApi'
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/slices/authSlice'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import { ActionTypes, State, Action, InputFieldProps, ButtonProps } from '@/types/login'

enum ActionTypes {
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD'
}

interface State {
  email: string
  password: string
}

interface Action {
  type: ActionTypes
  payload: string
}

interface InputFieldProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface ButtonProps {
  label: string
  isLoading: boolean
}

const initialState: State = {
  email: '',
  password: ''
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_EMAIL:
      return { ...state, email: action.payload }
    case ActionTypes.SET_PASSWORD:
      return { ...state, password: action.payload }
    default:
      return state
  }
}

const InputField: React.FC<InputFieldProps> = React.memo(({ id, label, type, value, onChange }) => (
  <div>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
      value={value}
      onChange={onChange}
      required
    />
  </div>
))

const Button: React.FC<ButtonProps> = ({ label, isLoading }) => (
  <button
    type='submit'
    className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#DC4B4B] hover:bg-[#C24444] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : label}
  </button>
)

const ForgotPasswordModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setEmail(event.target.value)
  }

  // TODO: 串接ＡＰＩ
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      toast.success('重設密碼郵件已發送')
      onClose()
    } catch (error) {
      toast.error('重設密碼失敗，請稍後再試')
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 z-30  bg-background'>
      <div className='bg-white p-6 rounded-md shadow-md w-[300px]'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl'>重設密碼</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <InputField id='reset-email' type='email' label='帳號' value={email} onChange={handleChange} />
          </div>
          <div className='flex justify-end'>
            <Button label='重設密碼' isLoading={false} />
          </div>
        </form>
      </div>
    </div>
  )
}

const Login: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const [handleGoogle] = useHandleGoogleMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const reduxDispatch = useDispatch()
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await loginUser({ email: state.email, password: state.password })
      console.log('result:', result)
      if (result.data?.data?.accessToken) {
        const token = result.data.data.accessToken
        console.log('token:', token)
        const user = result.data.data.user
        reduxDispatch(setToken(token))

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        toast.success(result.data.data.message)
        router.push('/')
      } else if (result.error && 'data' in result.error) {
        const errorData = result.error.data as { message: string }
        toast.error(errorData.message)
      } else {
        toast.error('系統錯誤，請重新操作一次')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || '系統錯誤，請重新操作一次')
      } else {
        toast.error('系統錯誤，請重新操作一次')
      }
    }
  }

  const handleChange = (type: ActionTypes) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type, payload: event.target.value })
  }

  const handleGoogleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await handleGoogle().unwrap()
      router.push('/google/callback')
    } catch (error) {
      toast.error('Google 登入失敗，請重新操作一次')
    }
  }

  return (
    <>
      <Head>
        <title>TicketGo - 登入</title>
      </Head>
      <div className='flex justify-center items-center min-h-screen bg-[#FFF5E1] w-full overflow-hidden'>
        <div className='relative flex justify-center items-center w-[700px] h-[700px]'>
          <i className='absolute inset-0 border-2 border-[#4A4A4A] rounded-[38%_62%_63%_37%/41%_44%_56%_59%] animate-spin1 z-10'></i>
          <i className='absolute inset-0 border-2 border-[#4A4A4A] rounded-[41%_44%_56%_59%/38%_62%_63%_37%] animate-spin2 z-10'></i>
          <i className='absolute inset-0 border-2 border-[#4A4A4A] rounded-[41%_44%_56%_59%/38%_62%_63%_37%] animate-spin3 z-10'></i>

          <div className='relative z-20 flex flex-col items-center justify-center gap-5 w-[300px] h-full'>
            <h2 className='text-2xl text-gray-800'>登入</h2>
            <p>歡迎使用 TicketGo ，隨時隨地輕鬆購票！</p>
            <div className='w-full mt-4'>
              <div className='w-full mb-2 lg:mb-0'>
                <button
                  type='button'
                  className='w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300'
                  onClick={handleGoogleLogin}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='w-4' id='google'>
                    <path
                      fill='#fbbb00'
                      d='M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z'
                    ></path>
                    <path
                      fill='#518ef8'
                      d='M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z'
                    ></path>
                    <path
                      fill='#28b446'
                      d='m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z'
                    ></path>
                    <path
                      fill='#f14336'
                      d='m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z'
                    ></path>
                  </svg>
                  Login with Google
                </button>
              </div>
            </div>
            <p>或</p>
            <form className='flex flex-col items-center justify-center gap-5 w-[300px]' onSubmit={handleLogin}>
              <div className='w-full'>
                <InputField
                  id='email'
                  type='email'
                  label='帳號'
                  value={state.email}
                  onChange={handleChange(ActionTypes.SET_EMAIL)}
                />
              </div>
              <div className='w-full'>
                <InputField
                  id='password'
                  type='password'
                  label='密碼'
                  value={state.password}
                  onChange={handleChange(ActionTypes.SET_PASSWORD)}
                />
              </div>
              <div className='flex justify-end items-center w-full pl-5'>
                <button className='text-gray-700' onClick={() => setIsModalOpen(true)}>
                  忘記密碼
                </button>
              </div>
              <div className='w-full'>
                <Button label='登入' isLoading={isLoading} />
              </div>
            </form>
            <p>
              <span>還沒有帳號嗎？</span>
              <button className='text-gray-800' onClick={() => router.push('/signup')}>
                前往註冊
              </button>
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && <ForgotPasswordModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default Login
