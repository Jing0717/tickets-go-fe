import { SeatsType } from "./seatsType";

export type OrderCreateParams = {
  userName: string;
  sessionId: string;
  count: number;
  areaName: string;
  seats: SeatsType[];
}

export type OrderCreateType = {
  ticketName: string,
  areaName: string,
  areaPrice: number,
  price: number,
  seats: OrderCreateSeatType[],
  ticketCount: number,
  userId: string,
  eventId: string,
  sessinId: string,
  orderStatus: string,
  _id: string,   // this is order id
  createdAt: string,
  updateAt: string,
}

export interface OrderCreateSeatType {
  seatRow: number
  seatNumber: number
  _id: string
}