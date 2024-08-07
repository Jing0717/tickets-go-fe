import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ApiRes } from '@/types/apiType'
import { OrderTicketsType, OrderSeatsType, OrderCreateType, OrderCreateParams, NewebpayCheckout, OrderByIdType } from '@/types/purchase'

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
    getUserOrders: builder.mutation<any, { status: string | null }>({
      query: ({ status }) => ({
        url: `user/orders${status ? `?status=${status}` : ''}`
      })
    }),
    getUserTrackingList: builder.mutation<any, { status: string }>({
      query: ({ status }) => ({
        url: `event/follow?status=${status}`
      })
    }),
    getTags: builder.mutation<any, void>({
      query: () => ({
        url: 'tag/tags'
      })
    }),
    getTag: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `tag/${id}`
      })
    }),
    searchEvents: builder.mutation<any, { query: string }>({
      query: ({ query }) => ({
        url: `event/search?query=${query}`
      })
    }),
    getOrderTickets: builder.mutation<ApiRes<OrderTicketsType>, { eventId: string, sessionId: string }>({
      query: ({ eventId, sessionId }) => ({
        url: `order/tickets?eventId=${eventId}&sessionId=${sessionId}`
      })
    }),
    postOrderSeats: builder.mutation<ApiRes<OrderSeatsType>, { sessionId: string, areaName: string }>({
      query: ({ ...body }) => ({
        url: 'order/seats',
        method: 'POST',
        body
      })
    }),
    postOrderCreate: builder.mutation<ApiRes<OrderCreateType>, OrderCreateParams>({
      query: ({ ...body }) => ({
        url: 'order/create',
        method: 'POST',
        body
      })
    }),
    postNewebpayCheckout: builder.mutation<ApiRes<NewebpayCheckout>, { orderId: string }>({
      query: ({ ...body }) => ({
        url: 'newebpay/checkout',
        method: 'POST',
        body
      })
    }),
    getOrderById: builder.mutation<ApiRes<OrderByIdType>, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `order/${orderId}`
      })
    }),
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
  useGetUserTrackingListMutation,
  useGetTagsMutation,
  useGetTagMutation,
  useSearchEventsMutation,
  useGetOrderTicketsMutation,
  usePostOrderSeatsMutation,
  usePostOrderCreateMutation,
  usePostNewebpayCheckoutMutation,
  useGetOrderByIdMutation,
} = authApi
