import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './authApi'
import authReducer from './slices/authSlice'
import { homeApi } from './homeApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware).concat(homeApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
