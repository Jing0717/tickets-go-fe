import { TicketsType } from './ticketsType'

export type OrderTicketsType = {
  eventId: string,
  eventName: string,
  eventContent: string,
  eventImages: string,
  sessionId: string,
  sessionStartDate: string,
  tickets: TicketsType[]
}
