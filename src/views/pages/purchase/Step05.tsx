import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCouch } from '@fortawesome/free-solid-svg-icons'

interface Seat {
  row: string
  number: string
}

interface Ticket {
  id: number
  eventName: string
  bannerImage: string
  eventStartDate: string
  seats: Seat[]
}

const tickets: Ticket[] = [
  {
    id: Math.random(),
    eventName: '2024 GMA SHOWCASE 金曲售票演唱會',
    bannerImage: 'https://fakeimg.pl/250x100/',
    eventStartDate: '2024/05/11(周六) 19:30(+0800)',
    seats: [{ row: '1', number: '2' }]
  }
]

interface TicketCardProps {
  ticket: Ticket
}

const TicketCard = ({ ticket }: TicketCardProps) => (
  <div className='flex flex-col md:flex-row items-center mb-4'>
    <div className='flex-none w-full md:w-48 h-[152px] relative'>
      <img
        src={ticket.bannerImage}
        alt={ticket.eventName}
        className='absolute inset-0 w-full h-full object-cover'
        loading='lazy'
      />
    </div>
    <div className='flex-auto p-6 bg-white'>
      <h2 className='text-xl text-[#1E1E1E] font-medium mb-5'>{ticket.eventName}</h2>
      <div className='flex mb-3'>
        <FontAwesomeIcon icon={faCalendarDays} className='w-6 h-6 text-[#DC4B4B] me-4' />
        <span className='text-base'>{ticket.eventStartDate}</span>
      </div>
      {ticket.seats.map((seat, index) => (
        <div key={index} className='flex'>
          <FontAwesomeIcon icon={faCouch} className='w-6 h-6 text-[#DC4B4B] me-4' />
          <span className='text-base'>
            第 {seat.row} 排 － {seat.number}
          </span>
        </div>
      ))}
    </div>
  </div>
)

const Step05 = () => (
  <div className='bg-[#FFFBF5] w-full flex flex-col justify-start items-center pb-10 px-4 flex-grow'>
    <h1 className='text-2xl font-bold mb-6'>您已完成訂購！</h1>
    <div className='bg-[#DC4B4B1A] p-6 mb-10 rounded-full'>
      <img src='../celebration.png' width='35' height='35' alt='恭喜完成訂購' />
    </div>
    {tickets.map(ticket => (
      <TicketCard key={ticket.id} ticket={ticket} />
    ))}
    <div className='flex items-center justify-center w-full md:w-auto mt-10'>
      <button className='bg-white text-black border-2 border-black p-2 w-full md:w-28 h-11 mr-4'>會員中心</button>
      <button className='bg-[#DC4B4B] text-white p-2 w-full md:w-28 h-11'>繼續逛逛</button>
    </div>
  </div>
)

export default Step05
