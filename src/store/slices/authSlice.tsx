import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  isLogin: boolean;
  errorMessage: string | null;
};

const initialState: AuthState = {
  token: '',
  isLogin: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogin = true;
    },
    clearToken: (state) => {
      state.token = '';
      state.isLogin = false;
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
