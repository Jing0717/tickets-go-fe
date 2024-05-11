import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tickets-go-server-dev.onrender.com/api/v1/',
    prepareHeaders: headers => {
      headers.set('authorization', `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`)
    }
  }),
  endpoints: builder => ({
    getUsers: builder.query<any, void>({
      query: () => 'auth/users'
    })
  })
})

export const { useGetUsersQuery } = authApi
