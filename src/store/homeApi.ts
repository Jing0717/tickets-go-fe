// src/api/homeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL
  }),
  endpoints: builder => ({
    getHomeEvents: builder.query<any, void>({
      query: () => '/home/events'
    }),
    getEventContent: builder.query<any, string>({
      query: eventId => `/home/${eventId}`
    })
  })
})

export const { useGetHomeEventsQuery, useGetEventContentQuery } = homeApi
