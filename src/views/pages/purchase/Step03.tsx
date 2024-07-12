import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCouch } from '@fortawesome/free-solid-svg-icons'

import { usePostOrderCreateMutation } from '@/store/authApi';
import { OrderTicketsType, AreaInfo, SeatsType as SeatsInfo, OrderCreateParams, OrderCreateType } from '@/types/purchase';

import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';


interface StepsProps {
  orderTicket: OrderTicketsType;
  setCurrentStep: (step: number) => void;
  areaInfo: AreaInfo | undefined;
  setAreaInfo: (areaInfo: AreaInfo | undefined) => void;
  seatsInfo: SeatsInfo[]| undefined;
  setSeatsInfo: (seatsInfo: SeatsInfo[] | undefined) => void;
}

const Step03 = ({
  orderTicket,
  setCurrentStep,
  areaInfo,
  setAreaInfo,
  seatsInfo,
  setSeatsInfo
}: StepsProps) => {
  const eventDate = dayjs(+orderTicket.sessionStartDate).format('YYYY/MM/DD(dd) HH:mm(Z)');
  const ticket = orderTicket.tickets.find(ticket => ticket.areaName === areaInfo?.areaName);
  const count = areaInfo?.count;
  const amount = ticket ? ticket.price * (count || 0) : 0;
  console.log('amount:', amount);

  return (
    <div className='bg-background'>
      <div className="container mx-auto px-4 max-w-[668px]">
        <h3 className="h3 font-bold lg:text-[28px] text-[24px] text-gray-01  mb-6">{orderTicket.eventName}</h3>
        <div className="lg:mb-10 mb-6 text-gray-02">
          <div className='flex gap-4 items-center mb-3'>
            <FontAwesomeIcon icon={faCalendarDays} className='w-5 h-5 text-brand-01' />
            <p className="fs-6 ">{eventDate}</p>
          </div>
          <div className='flex gap-4 items-center'>
            <FontAwesomeIcon icon={faCouch} className='w-5 h-5 text-brand-01' />
            <p className="fs-6">{`${areaInfo?.areaName} ${seatsInfo?.map(x => (` ${x.row}-${x.number}`))}`}</p>
          </div>
        </div>
        <div className='lg:mb-20 mb-8'>
          <PaymentForm
            amount={amount}
            setCurrentStep={setCurrentStep}
            areaInfo={areaInfo}
            setAreaInfo={setAreaInfo}
            seatsInfo={seatsInfo}
            setSeatsInfo={setSeatsInfo}
          />
        </div>
      </div>
    </div>
  )
}

interface Props {
  amount: number;
  setCurrentStep: (step: number) => void;
  areaInfo: AreaInfo | undefined;
  setAreaInfo: (areaInfo: AreaInfo | undefined) => void;
  seatsInfo: SeatsInfo[]| undefined;
  setSeatsInfo: (seatsInfo: SeatsInfo[] | undefined) => void;
}

interface FormInput {
  paymentType: string;
  amount: number;
}

const PaymentForm = ({
  amount,
  setCurrentStep,
  areaInfo,
  setAreaInfo,
  seatsInfo,
  setSeatsInfo
}: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const router = useRouter();

  // const [searchParams, setSearchParams] = useSearchParams();

  const [postOrderCreate] = usePostOrderCreateMutation();
  const [orderCreate, setOrderCreate] = useState<OrderCreateType>();

  const onSubmit: SubmitHandler<FormInput> = data => {
    console.log(data);
    const user = JSON.parse(localStorage.getItem("user") as string ?? "");
    const userName = !!user ? user.email as string : "";
    const sessionId = router.query.sessionId as string || "";
    const { count, areaName } = areaInfo as AreaInfo;
    const seats = seatsInfo as SeatsInfo[];

    const orderCreateReq = {
      userName,
      sessionId,
      count,
      areaName,
      seats
    }

    console.log('orderCreateReq:', orderCreateReq)
    postOrder(orderCreateReq)

    // setCurrentStep(3)
  };

  const postOrder = async (req: OrderCreateParams) => {
    try {
      const data = await postOrderCreate(req).unwrap();
      setOrderCreate(data.data);
    } catch (error) {

      setOrderCreate(undefined);
      console.error('Failed to fetch seats:', error);
    }
  }

  useEffect(() => {
    const addOrderId = (orderId: string) => {
      const newParams = { ...router.query, orderId };
      updateQueryParams(newParams);
    };

    const updateQueryParams = (newParams: any) => {
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, ...newParams }
      }, undefined, { shallow: true });
    };

    if (!!orderCreate) {
      console.log('orderCreate:', orderCreate);
      const orderId = orderCreate._id;
      addOrderId(orderId);
      setCurrentStep(3)
    }
  },[orderCreate, router, router.query, setCurrentStep]);

  // function addOrderId(orderId: string) {
  //   const currentParams = Object.fromEntries([...searchParams]);
  //   currentParams.orderId = orderId;

  //   const newQueryParams = new URLSearchParams(currentParams).toString();

  //   router.replace({
  //       pathname: router.pathname,
  //       query: newQueryParams,
  //   }, undefined, { shallow: true });
  // }

  const handlePrevStep = () => {
    setAreaInfo(undefined);
    setSeatsInfo(undefined);
    setCurrentStep(0)
  }

  useEffect(() => {
    if(!!areaInfo && !!areaInfo){
      console.log('areaInfo:', areaInfo)
      console.log('seatsInfo:', seatsInfo)
    }
  },[areaInfo, seatsInfo]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="lg:mb-6 mb-4">
        <label htmlFor="paymentType" className="block text-[14px] text-gray-02">付款方式 <span className="text-red-500 text-xs">  *僅提供信用卡</span></label>
        <select defaultValue={"1"} {...register("paymentType", { required: true })} className="mt-1 px-4 py-3 block w-full border-hidden shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="1" defaultChecked>Credit Card</option>
        </select>
        {errors.paymentType && <span className="text-red-500 text-xs">This field is required</span>}
      </div>
      <div className="lg:mb-6 mb-4">
        <label htmlFor="amount" className="block text-[14px] text-gray-02">付款金額</label>
        <input type="number" defaultValue={amount} readOnly={true} {...register("amount", { required: true })} className="mt-1 px-4 py-3 block w-full border-hidden shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div className='flex justify-center lg:mt-10 mt-6 lg:gap-6 gap-3'>
        <button className="bg-transparent border-2 border-gray-01 text-gray-01 font-[500] py-4 px-6 lg:flex-initial flex-1" onClick={handlePrevStep}>
          上一步
        </button>
        <button type="submit" className="bg-brand-01 text-white font-[500] py-4 px-6 lg:flex-initial flex-1">
          下一步
        </button>
      </div>
    </form>
  );
};


export default Step03;