import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useGetUserOrdersMutation } from '@/store/authApi'
import CustomDatePicker from '@/components/CustomDatePicker'
import Spinner from '@/components/Spinner'
import { formatDate } from '@/utils/dateUtils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faThumbsUp, IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface Order {
  id: number
  eventRange: {
    startDate: number
    endDate: number
  }
  name: string
  content: string
  status: 'comming' | 'completed'
  bannerImage: string
  type: string[]
  ticketStatus: string
}

const UserOrders: React.FC = () => {
  const [getUserOrders] = useGetUserOrdersMutation()

  // comming: 即將到來; completed: 已結束
  const [filter, setFilter] = useState<'comming' | 'completed'>('comming')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [orders, setOrders] = useState<Order[]>([])

  const iconMap: { [key: string]: IconDefinition } = {
    熱門: faFire,
    推薦: faThumbsUp
  }

  const defaultIcon = faFire

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)

      const res = getUserOrders({ id: user.id, status: filter })
      console.log(res)
      setLoading(true)

      // TODO: 串接 api
      setTimeout(() => {
        setOrders([])
        setLoading(false)
      }, 2000)
    }
  }, [filter, getUserOrders])

  const filteredOrders = orders.filter(order => order.status === filter)

  return (
    <Layout>
      <div className='bg-[#FFF5E1] w-full flex flex-col justify-start items-center py-10 flex-grow'>
        <div className='container mx-auto flex-grow flex flex-col'>
          <h1 className='text-3xl font-bold mb-6'>訂單查詢</h1>
          <div className='flex flex-col-reverse justify-start lg:flex-row md:justify-start xl:justify-between items-center mb-10'>
            <div className='flex w-full'>
              <button
                className={`border w-1/2 md:w-auto py-3 px-7 transition duration-300 transform ${
                  filter === 'comming' ? 'border-[#DC4B4B] text-[#DC4B4B] scale-105' : 'border-transparent text-black'
                }`}
                onClick={() => setFilter('comming')}
              >
                即將到來
              </button>
              <button
                className={`border w-1/2 md:w-auto py-3 px-7 transition duration-300 transform ${
                  filter === 'completed' ? 'border-[#DC4B4B] text-[#DC4B4B] scale-105' : 'border-transparent text-black'
                }`}
                onClick={() => setFilter('completed')}
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
          ) : filteredOrders.length === 0 ? (
            <div className='flex flex-col items-center justify-center flex-grow'>
              {/* <p className='text-[#DC4B4B] text-lg font-bold p-5'>目前尚無訂單</p> */}
              <img src='../noOrder.png' alt='目前尚無訂單' className='w-80 h-100' />
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className='flex items-center mb-4 border-b pb-4'>
                <div className='w-1/5'>
                  <img src={order.bannerImage} alt={order.name} className='w-[250px] h-[200px] object-cover' />
                </div>
                <div className='flex-1 w-4/5 bg-white p-6'>
                  <div className='flex justify-between mb-3'>
                    <div className='flex flex-row'>
                      {order.type.map((type, index) => (
                        <div
                          key={index}
                          className='bg-[#1E1E1ECC] text-white px-4 py-2 flex flex-row items-center mr-2'
                        >
                          <FontAwesomeIcon icon={iconMap[type] || defaultIcon} className='w-5 h-5 pr-1.5' />
                          <span>{type}</span>
                        </div>
                      ))}
                    </div>

                    <span
                      className={`bg-[#F5F5F5] text-${order.ticketStatus === '付款失敗' ? '[#DC4B4B]' : 'black'} px-4 py-2`}
                    >
                      {order.ticketStatus}
                    </span>
                  </div>
                  <div className='flex justify-between mb-3'>
                    <span className='text-[#4A4A4A] text-base tracking-wider'>
                      {order.eventRange?.startDate ? formatDate(order.eventRange.startDate) : ''}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <div className='w-1/3'>
                      <h2 className='text-xl text-[#1E1E1E] font-medium mb-3'>{order.name}</h2>
                      <p className='overflow-hidden truncate'>{order.content}</p>
                    </div>
                    <div className='w-2/3 flex justify-end items-center'>
                      <button className='bg-white text-black border-2 border-black p-2 w-28 h-11 mr-4'>查看活動</button>
                      {order.ticketStatus === '付款失敗' ? (
                        <button className='bg-[#DC4B4B] text-white px-4 py-2 w-28 h-11'>付款失敗</button>
                      ) : (
                        <button className='bg-white text-black border-2 border-black p-2 w-28 h-11'>票券資訊</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default UserOrders
