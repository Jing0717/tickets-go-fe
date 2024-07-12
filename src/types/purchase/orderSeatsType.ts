import { SeatsType } from './seatsType'

export type OrderSeatsType = {
  sessionId: string,
  areaName: string,
  seats: SeatsType[]
}

export type AreaInfo = {
  areaName: string;
  count: number;
}
