import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      console.log('token:', token)
      console.log('getState:', getState())
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: builder => ({
    registerUser: builder.mutation<any, { name: string; email: string; password: string; passwordConfirm: string }>({
      query: body => ({
        url: 'auth/register',
        method: 'POST',
        body
      })
    }),
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      })
    }),
    handleGoogle: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/google',
        method: 'POST'
      })
    }),
    getUser: builder.mutation<any, void>({
      query: () => ({
        url: 'user'
      })
    }),
    updateUser: builder.mutation<
      any,
      { id: string; name: string; account: string; password: string; confirmPassword: string; gender: string | null }
    >({
      query: ({ id, ...body }) => ({
        url: `user/${id}`,
        method: 'PUT',
        body
      })
    }),
    getUsers: builder.mutation<any, void>({
      query: () => ({
        url: 'user/all'
      })
    }),
    getUserOrders: builder.mutation<any, { id: string; status: string | null }>({
      query: ({ id, status }) => ({
        url: `user/order/${id}${status ? `/${status}` : ''}`
      })
    }),
    getUserTrackingList: builder.mutation<any, { id: string; status: string | null }>({
      query: ({ id, status }) => ({
        url: `user/tracking/${id}${status ? `/${status}` : ''}`
      })
    })
  })
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useHandleGoogleMutation,
  useGetUserMutation,
  useGetUsersMutation,
  useUpdateUserMutation,
  useGetUserOrdersMutation,
  useGetUserTrackingListMutation
} = authApi
