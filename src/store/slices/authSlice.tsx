import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  isLogin: boolean;
  errorMessage: string | null;
};

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLogin: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogin = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.isLogin = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setToken, clearToken, setErrorMessage, clearErrorMessage } = authSlice.actions;

export default authSlice.reducer;
