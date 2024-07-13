import { OrderCreateSeatType } from './orderCreateType'

export type OrderByIdType = {
  orderId: string,
  status: string,
  sessionName: string,
  areaName: string,
  eventImages: string,
  sessionStartDate: string,
  sessionStartTime: string,
  sessionEndTime: string,
  sessionPlace: string,
  seats: OrderCreateSeatType[]
}
