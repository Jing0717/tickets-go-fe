import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { useGetOrderTicketsMutation } from '@/store/authApi'
import { OrderTicketsType } from "@/types/purchase"

// Components
import { Stepper, Step01, Step02, Step03, Step04, Step05 } from '@/views/pages/purchase';

const Purchase = () => {
  const steps = [
    { label: '場次及數量' },
    { label: '座位' },
    { label: '購物車' },
    { label: '結帳' },
    { label: '完成訂購'}
  ];
  const [currentStep, setCurrentStep] = useState<number>(0);

  const params = useSearchParams();
  const eventId = params.get('eventId') || "";
  const sessionId = params.get('sessionId') || "";
  const [getOrderTickets] = useGetOrderTicketsMutation();
  const [orderTicket, setOrderTickets] = useState<OrderTicketsType  | undefined>();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // 使用 unwrap() 處理 Promise，並直接獲得數據
        const data = await getOrderTickets({ eventId: eventId, sessionId: sessionId }).unwrap();
        setOrderTickets(data.data);
      } catch (error) {
        // 錯誤處理：設置 tickets 為 undefined 或顯示錯誤消息
        setOrderTickets(undefined);
        console.error('Failed to fetch tickets:', error);
      }
    }

    if (!!eventId && !!sessionId) {
      fetchTickets();
    }

  },[eventId, sessionId, getOrderTickets])

  useEffect(()=> {console.log('orderTicket:', orderTicket)},[orderTicket])

  return (
    <>
      <div className='bg-background'>
        <div className="container mx-auto px-4">
          <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
      { orderTicket && <StepsContent currentStep={currentStep} setCurrentStep={setCurrentStep} orderTicket={orderTicket} /> }
    </>
  )
}

interface StepsContentrProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  orderTicket: OrderTicketsType;
}

  const StepsContent = ({ currentStep, setCurrentStep, orderTicket }: StepsContentrProps) => {
    switch (currentStep) {
      case 0:
        return <Step01 setCurrentStep={setCurrentStep} orderTicket={orderTicket} />;
      case 1:
        return <Step02 />;
      case 2:
        return <Step03 setCurrentStep={setCurrentStep} />;
      case 3:
        return <Step04 setCurrentStep={setCurrentStep} />;
      case 4:
        return <Step05 />;
      default:
        return <div>未知步驟</div>;
    }
  };


export default Purchase