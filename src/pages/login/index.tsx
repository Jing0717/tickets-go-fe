import React, { useReducer } from 'react'
import { useLoginUserMutation } from '@/store/authApi'
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/slices/authSlice'
import { useRouter } from 'next/router'

// import { toast } from 'react-toastify'

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
    <label htmlFor={id} className='block text-sm font-medium text-white'>
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
    className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : label}
  </button>
)

const Login: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const reduxDispatch = useDispatch()
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await loginUser({ email: state.email, password: state.password })
      if (result.data?.data?.accessToken) {
        reduxDispatch(setToken(result.data.data.accessToken))

        // toast.success(result.data.data.message)
        router.push('/')
      } else {
        // toast.error(result.error?.data?.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        // toast.error(error.message || 'An error occurred during login')
      } else {
        toast.error('An error occurred during login')
      }
    }
  }

  const handleChange = (type: ActionTypes) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type, payload: event.target.value })
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#111] w-full overflow-hidden'>
      <div className='relative flex justify-center items-center w-[500px] h-[500px]'>
        <i className='absolute inset-0 border-2 border-white rounded-[38%_62%_63%_37%/41%_44%_56%_59%] animate-spin1'></i>
        <i className='absolute inset-0 border-2 border-white rounded-[41%_44%_56%_59%/38%_62%_63%_37%] animate-spin2'></i>
        <i className='absolute inset-0 border-2 border-white rounded-[41%_44%_56%_59%/38%_62%_63%_37%] animate-spin3'></i>

        <form
          className='absolute flex flex-col items-center justify-center gap-5 w-[300px] h-full'
          onSubmit={handleLogin}
        >
          <h2 className='text-2xl text-white'>登入</h2>
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
          <div className='flex justify-end items-center w-full px-5'>
            <button className='text-white'>忘記密碼</button>
          </div>
          <div className='w-full'>
            <Button label='登入' isLoading={isLoading} />
          </div>
          <div className='flex justify-end items-center w-full px-5'>
            <button className='text-white'>註冊</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
