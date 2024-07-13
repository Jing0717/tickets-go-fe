import React, { useState, useEffect } from 'react'
import { useGetUserOrdersMutation } from '@/store/authApi'
import CustomDatePicker from '@/components/CustomDatePicker'
import Spinner from '@/components/Spinner'

// import { formatDate } from '@/utils/dateUtils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faThumbsUp, IconDefinition } from '@fortawesome/free-solid-svg-icons'

import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';

interface Order {
  id: string
  ticketName: string
  ticketCount: number
  userId: string
  eventId: string
  sessinId: string
  orderStatus: string
}

interface Event {
  id: string
  eventName: string
  eventContent: string
  tags: string[]
  eventStartDate: number
  eventEndDate: string
  introImage: string
  bannerImage: string
}

interface OrderWithEvent {
  order: Order
  event: Event | null
}

const UserOrders: React.FC = () => {
  dayjs.locale('zh-cn');

  const [getUserOrders] = useGetUserOrdersMutation()

  // upcoming: 即將到來; finished: 已結束
  const [filter, setFilter] = useState<'upcoming' | 'finished'>('upcoming')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [orders, setOrders] = useState<OrderWithEvent[]>([])

  const iconMap: { [key: string]: IconDefinition } = {
    熱門: faFire,
    推薦: faThumbsUp
  }

  const defaultIcon = faFire

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res: any = await getUserOrders({ status: filter }).unwrap()
        if (res && res.status && res.data) {
          setOrders(res.data)
        } else {
          setOrders([])
        }
      } catch (error) {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filter, getUserOrders])

  return (
    <div className='bg-[#FFF5E1] w-full flex flex-col justify-start items-center py-10 flex-grow'>
      <div className='container mx-auto flex-grow flex flex-col'>
        <h1 className='text-3xl font-bold mb-6'>訂單查詢</h1>
        <div className='flex flex-col-reverse justify-start lg:flex-row md:justify-start xl:justify-between items-center mb-10'>
          <div className='flex w-full'>
            <button
              className={`border w-1/2 md:w-auto py-3 px-7 transition duration-300 transform ${
                filter === 'upcoming' ? 'border-[#DC4B4B] text-[#DC4B4B] scale-105' : 'border-transparent text-black'
              }`}
              onClick={() => setFilter('upcoming')}
            >
              即將到來
            </button>
            <button
              className={`border w-1/2 md:w-auto py-3 px-7 transition duration-300 transform ${
                filter === 'finished' ? 'border-[#DC4B4B] text-[#DC4B4B] scale-105' : 'border-transparent text-black'
              }`}
              onClick={() => setFilter('finished')}
            >
              已結束
            </button>
          </div>
          <div className='flex flex-col md:flex-row justify-between items-center w-full lg:w-auto mb-4 lg:mb-0'>
            <div className='flex items-center space-x-4 w-full md:w-auto'>
              <div className='w-full md:w-[250px]'>
                <CustomDatePicker
                  selected={startDate}
                  selectsStart
                  onChange={(date: Date | null) => {
                    setStartDate(date)
                    if (!endDate || (date && date > endDate)) {
                      setEndDate(null)
                    }
                  }}
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  placeholderText='選擇時間'
                />
              </div>
              <p className='m-0'>~</p>
              <div className='w-full md:w-[250px]'>
                <CustomDatePicker
                  selected={endDate}
                  selectsEnd
                  onChange={(date: Date | null) => setEndDate(date)}
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  minDate={startDate || undefined}
                  rangeColors={['#DC4B4B1A']}
                  placeholderText='選擇時間'
                />
              </div>
            </div>
            <div className='mt-4 md:mt-0 md:ml-4 w-full'>
              <button className='w-full md:w-20 h-11 bg-black text-white'>查詢</button>
            </div>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : orders.length === 0 ? (
          <div className='flex flex-col items-center justify-center flex-grow'>
            {/* <p className='text-[#DC4B4B] text-lg font-bold p-5'>目前尚無訂單</p> */}
            <img src='../noOrder.png' alt='目前尚無訂單' className='w-80 h-100' />
          </div>
        ) : (
          orders.map(({ order, event }) => (
            <div key={order.id} className='flex flex-col md:flex-row items-center mb-4 border-b pb-4'>
              <div className='w-full md:w-1/5'>
                <img
                  src={event?.bannerImage}
                  alt={event?.eventName}
                  className='w-full md:w-[250px] md:h-[200px] object-cover'
                />
              </div>
              <div className='flex-1 w-full md:w-4/5 bg-white p-6'>
                <div className='flex justify-between mb-3'>
                  <div className='flex flex-row'>
                    {event?.tags.map((tag, index) => (
                      <div key={index} className='bg-[#1E1E1ECC] text-white px-4 py-2 flex flex-row items-center mr-2'>
                        <FontAwesomeIcon icon={iconMap[tag] || defaultIcon} className='w-5 h-5 pr-1.5' />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                  <span className={`bg-[#F5F5F5] text-${order?.orderStatus === '2' ? '[#DC4B4B]' : 'black'} px-4 py-2`}>
                    {order.orderStatus === '2' ? '付款失敗' : '已付款'}
                  </span>
                </div>
                <div className='flex justify-between mb-3'>
                  <span className='text-[#4A4A4A] text-base tracking-wider'>
                    {dayjs(+(event?.eventStartDate || 0)).format('YYYY/MM/DD(dd) HH:mm(Z)')}
                    {}
                    {/*  ? formatDate(new Date(event.eventStartDate)) : '' */}
                  </span>
                </div>
                <div className='flex flex-col md:flex-row  justify-between'>
                  <div className='w-full mb-3 md:w-1/3 md:mb-0'>
                    <h2 className='text-xl text-[#1E1E1E] font-medium mb-3'>{event?.eventName}</h2>
                    <p className='overflow-hidden truncate'>{event?.eventContent}</p>
                  </div>
                  <div className='w-full md:w-2/3 flex justify-center md:justify-end items-center'>
                    <button className='bg-white text-black border-2 border-black p-2 w-full md:w-28 h-11 mr-4 hover:bg-black hover:text-white transition-colors duration-300'>
                      查看活動
                    </button>
                    {order.orderStatus === '2' ? (
                      <button className='bg-[#DC4B4B] text-white px-4 py-2 w-full md:w-28 h-11'>付款失敗</button>
                    ) : (
                      <button className='bg-white text-black border-2 border-black p-2 w-full md:w-28 h-11 hover:bg-black hover:text-white transition-colors duration-300'>
                        票券資訊
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserOrders
