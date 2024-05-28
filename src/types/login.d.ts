export enum ActionTypes {
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD'
}

export interface State {
  email: string
  password: string
}

export interface Action {
  type: ActionTypes
  payload: string
}

export interface InputFieldProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ButtonProps {
  label: string
  isLoading: boolean
}
