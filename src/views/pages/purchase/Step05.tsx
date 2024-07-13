import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCouch } from '@fortawesome/free-solid-svg-icons'

import { useGetOrderByIdMutation } from '@/store/authApi';
import { OrderByIdType } from '@/types/purchase';

interface TicketCardProps {
  areaName: string
  ticket: OrderByIdType
}

const TicketCard = ({ areaName, ticket }: TicketCardProps) => (
  <div className='flex flex-col md:flex-row items-center mb-4'>
    <div className='flex-none w-full md:w-48 h-[152px] relative'>
      <img
        src={ticket.eventImages}
        alt={ticket.sessionName}
        className='absolute inset-0 w-full h-full object-cover'
        loading='lazy'
      />
    </div>
    <div className='flex-auto p-6 bg-white'>
      <h2 className='text-xl text-[#1E1E1E] font-medium mb-5'>{ticket.sessionName}</h2>
      <div className='flex mb-3'>
        <FontAwesomeIcon icon={faCalendarDays} className='w-6 h-6 text-[#DC4B4B] me-4' />
        <span className='text-base'>{ticket.sessionStartDate}</span>
      </div>
      {ticket.seats.map((seat, index) => (
        <div key={index} className='flex'>
          <FontAwesomeIcon icon={faCouch} className='w-6 h-6 text-[#DC4B4B] me-4' />
          <span className='text-base'>
           {areaName}  第 {seat.row} 排 － {seat.number}
          </span>
        </div>
      ))}
    </div>
  </div>
)

const Step05 = () => {
  const router = useRouter();

  const [getOrderById] = useGetOrderByIdMutation();
  const [orderInfo, setOrderInfo] = useState<OrderByIdType | undefined>();

  useEffect(()=>{
    const orderId = router.query.orderId as string || "";

    const getOrderIdInfo = async (orderId: string) => {
      try {
        const data = await getOrderById({orderId}).unwrap();
        setOrderInfo(data.data);
      } catch (error) {

        setOrderInfo(undefined);
        console.error('Failed to fetch seats:', error);
      }
    }

    if (!!orderId) {
      getOrderIdInfo(orderId)
    }

  },[getOrderById, router, router.query]);

  useEffect(() => {
    if(!!orderInfo){
      console.log('orderInfo:', orderInfo)
    }
  },[orderInfo])

  const handleGoToOrders = () => {
    router.push('/user/orders');
  };

  const handleContinueBrowsing = () => {
    router.push('/');
  };

  return(
    <div className='bg-[#FFFBF5] w-full flex flex-col justify-start items-center pb-10 px-4 flex-grow'>
      <h1 className='text-2xl font-bold mb-6'>您已完成訂購！</h1>
      <div className='bg-[#DC4B4B1A] p-6 mb-10 rounded-full'>
        <img src='../celebration.png' width='35' height='35' alt='恭喜完成訂購' />
      </div>
      {orderInfo && <TicketCard areaName={orderInfo.areaName} ticket={orderInfo} />}
      <div className='flex items-center justify-center w-full md:w-auto mt-10'>
        <button className='bg-white text-black border-2 border-black p-2 w-full md:w-28 h-11 mr-4' onClick={handleGoToOrders}>會員中心</button>
        <button className='bg-[#DC4B4B] text-white p-2 w-full md:w-28 h-11' onClick={handleContinueBrowsing}>繼續逛逛</button>
      </div>
    </div>
  )
}

export default Step05
