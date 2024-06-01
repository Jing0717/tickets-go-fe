import React, { useReducer } from 'react'
import { useRegisterUserMutation } from '@/store/authApi'
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/slices/authSlice'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import { ActionTypes, State, Action, InputFieldProps, ButtonProps } from '@/types/login'

enum ActionTypes {
  SET_NAME = 'SET_NAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_CONFIRM_PASSWORD = 'SET_CONFIRM_PASSWORD'
}

interface State {
  name: string
  email: string
  password: string
  passwordConfirm: string
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
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return { ...state, name: action.payload }
    case ActionTypes.SET_EMAIL:
      return { ...state, email: action.payload }
    case ActionTypes.SET_PASSWORD:
      return { ...state, password: action.payload }
    case ActionTypes.SET_CONFIRM_PASSWORD:
      return { ...state, passwordConfirm: action.payload }
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

const Signup: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const reduxDispatch = useDispatch()
  const router = useRouter()

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const result = await registerUser({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirm: state.passwordConfirm
      })
      if (result.data?.data?.accessToken) {
        reduxDispatch(setToken(result.data.data.accessToken))

        toast.success(result.data.message)
        router.push('/')
      } else if (result.error && 'data' in result.error) {
        const errorData = result.error.data as { message: string }
        toast.error(errorData.message)
      } else {
        toast.error('系統錯誤，請重新操作一次')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred during login')
      } else {
        toast.error('An error occurred during login')
      }
    }
  }

  const handleChange = (type: ActionTypes) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type, payload: event.target.value })
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#FFF5E1] w-full overflow-hidden'>
      <div className='relative flex justify-center items-center w-[700px] h-[700px]'>
        <i className='absolute inset-0 border-2 border-[#4A4A4A] rounded-[38%_62%_63%_37%/41%_44%_56%_59%] animate-spin1'></i>
        <i className='absolute inset-0 border-2 border-[#4A4A4A] rounded-[41%_44%_56%_59%/38%_62%_63%_37%] animate-spin2'></i>
        <i className='absolute inset-0 border-2 border-[#4A4A4A] rounded-[41%_44%_56%_59%/38%_62%_63%_37%] animate-spin3'></i>

        <form
          className='absolute flex flex-col items-center justify-center gap-5 w-[300px] h-full'
          onSubmit={handleSignup}
        >
          <h2 className='text-2xl text-gray-800'>註冊</h2>
          <div className='w-full'>
            <InputField
              id='name'
              type='text'
              label='姓名'
              value={state.name}
              onChange={handleChange(ActionTypes.SET_NAME)}
            />
          </div>
          <div className='w-full'>
            <InputField
              id='email'
              type='email'
              label='Email'
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
          <div className='w-full'>
            <InputField
              id='confirmPassword'
              type='password'
              label='確認密碼'
              value={state.passwordConfirm}
              onChange={handleChange(ActionTypes.SET_CONFIRM_PASSWORD)}
            />
          </div>
          <div className='w-full'>
            <Button label='註冊' isLoading={isLoading} />
          </div>
          <div className='flex justify-end items-center w-full pl-5'>
            <button className='text-gray-800' onClick={() => router.push('/login')}>
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
