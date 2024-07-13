import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { useGetOrderTicketsMutation } from '@/store/authApi'
import { OrderTicketsType } from "@/types/purchase"
import { AreaInfo, SeatsType as SeatsInfo} from '@/types/purchase';

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

  const router = useRouter();
  const eventId = router.query.eventId as string || "";
  const sessionId = router.query.sessionId as string || "";
  const [getOrderTickets] = useGetOrderTicketsMutation();
  const [orderTicket, setOrderTickets] = useState<OrderTicketsType | undefined>();
  const [areaInfo, setAreaInfo] = useState<AreaInfo | undefined>();
  const [seatsInfo, setSeatsInfo] = useState<SeatsInfo[] | undefined>();

  useEffect(() => {
    const step = router.query.step as string || "";
    const orderId = router.query.orderId as string || "";

    const addOrderId = (step: string, orderId: string) => {
      const newParams = { ...router.query, step, orderId };
      updateQueryParams(newParams);
    };

    const updateQueryParams = (newParams: any) => {
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, ...newParams }
      }, undefined, { shallow: true });
    };

    if (step === '4') {
      addOrderId(step, orderId);
      setCurrentStep(4)
    }
  },[router, router.query, setCurrentStep]);

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

  useEffect(()=> {
    if(!!orderTicket){
      console.log('orderTicket:', orderTicket)
    }
  },[orderTicket])



  return (
    <>
      <div className='bg-background'>
        <div className="container mx-auto px-4">
          <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
      { orderTicket &&
        <StepsContent
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          orderTicket={orderTicket}
          areaInfo={areaInfo}
          setAreaInfo={setAreaInfo}
          seatsInfo={seatsInfo}
          setSeatsInfo={setSeatsInfo}
        /> }
    </>
  )
}

interface StepsContentrProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  orderTicket: OrderTicketsType;
  areaInfo: AreaInfo | undefined;
  setAreaInfo: (areaInfo: AreaInfo | undefined) => void;
  seatsInfo: SeatsInfo[] | undefined;
  setSeatsInfo: (seatsInfo: SeatsInfo[] | undefined) => void;
}

  const StepsContent = ({
    currentStep,
    setCurrentStep,
    orderTicket,
    areaInfo,
    setAreaInfo,
    seatsInfo,
    setSeatsInfo
  }: StepsContentrProps) => {
    switch (currentStep) {
      case 0:
        return <Step01
                  setCurrentStep={setCurrentStep}
                  orderTicket={orderTicket}
                  areaInfo={areaInfo}
                  setAreaInfo={setAreaInfo}
                  seatsInfo={seatsInfo}
                  setSeatsInfo={setSeatsInfo}
                />;
      case 1:
        return <Step02 />;
      case 2:
        return <Step03
                  orderTicket={orderTicket}
                  setCurrentStep={setCurrentStep}
                  areaInfo={areaInfo}
                  setAreaInfo={setAreaInfo}
                  seatsInfo={seatsInfo}
                  setSeatsInfo={setSeatsInfo}
                />;
      case 3:
        return <Step04 />;
      case 4:
        return <Step05 />;
      default:
        return <div>未知步驟</div>;
    }
  };


export default Purchase