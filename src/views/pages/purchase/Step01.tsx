import React, { useState } from 'react'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons'

import { OrderTicketsType } from "@/types/purchase"

interface StepsProps {
  setCurrentStep: (step: number) => void;
  orderTicket: OrderTicketsType;
}

const Step01 = ({ setCurrentStep, orderTicket }: StepsProps) => {

  return(
    <>
      <div className='bg-background'>
        <div className="container mx-auto pb-20">
          <Banner orderTicket={orderTicket} />
        </div>
      </div>
      <div className='bg-gray-04'>
        <div className="container mx-auto py-20">
          <TicketOrder setCurrentStep={setCurrentStep} orderTicket={orderTicket}  />
        </div>
      </div>
    </>
  )
}

interface Props {
  orderTicket: OrderTicketsType
}

const Banner = ({ orderTicket }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* TODO: Image URL src={orderTicket.eventImages} */}
      <Image src="/event-info.png" alt="event info" width="0" height="0"sizes="100vw" className='col-span-3 lg:col-span-1 w-full h-auto' priority />
      <div className='col-span-3 lg:col-span-2 py-3 text-gray-02'>
        <h3 className="h3 font-bold text-gray-01 text-[24px] lg:text-[28px] mb-4 lg:mb-6">{orderTicket.eventName}</h3>
        <div className='flex gap-4 items-center mb-3'>
          <FontAwesomeIcon icon={faCalendarDays} className='w-5 h-5 text-brand-01' />
          {/* TODO: sessionDate 目前只有時間沒有日期 */}
          <p className="fs-6">{orderTicket.sessionDate}</p>
        </div>
        <div className='flex gap-4 items-center'>
          <FontAwesomeIcon icon={faLocationDot} className='w-5 h-5 text-brand-01' />
          <p className="fs-6">台北小巨蛋</p>
        </div>
        <div className='max-h-[2px] overflow-hidden my-4 lg:my-6'>
          <div className="border-t-[12px] border-gray-03 border-dashed"></div>
        </div>
        <p className="fs-6 text-[14px] lg:text-[16px]">{orderTicket.eventContent}</p>
      </div>
    </div>
  );
}

// interface Ticket {
//   category: string;
//   areaName: string;
//   price: string;
//   count: number;
// }

interface SelectedCount {
  [areaName: string]: number;
}

const TicketOrder = ({ setCurrentStep, orderTicket }: StepsProps) => {

  const tickets = orderTicket.tickets;

  // const tickets: Ticket[] = [
  //   {
  //     category: '全票',
  //     areaName: '一樓特 A 區、綠 212、綠 213、綠 214、綠 215',
  //     price: 'NTD 3,600',
  //     count: 10,
  //   },

  //   // {
  //   //   category: '全票',
  //   //   areaName: '紅 218、紅 219、紅 220、橙 207、橙 208、橙 209',
  //   //   price: 'NTD 3,200',
  //   //   count: 10,
  //   // },
  //   {
  //     category: '全票',
  //     areaName: '紅 216、紅 217、橙 210、橙 211',
  //     price: 'NTD 2,800',
  //     count: 10,
  //   },
  //   {
  //     category: '全票',
  //     areaName: '紅 218、紅 219、紅 220、橙 207、橙 208、橙 209',
  //     price: 'NTD 2,600',
  //     count: 10,
  //   },
  //   {
  //     category: '全票',
  //     areaName: '綠 406、綠 407、綠 408、綠 409、綠 410',
  //     price: 'NTD 1,800',
  //     count: 0,
  //   },
  //   {
  //     category: '全票',
  //     areaName: '橙 512、綠 513、綠 514、綠 515、綠 516、綠 517、綠 518',
  //     price: 'NTD 1,400',
  //     count: 0,
  //   },
  //   {
  //     category: '全票',
  //     areaName: '橙 509、橙 510、橙 511',
  //     price: 'NTD 800',
  //     count: 8,
  //   },

  //   // {
  //   //   category: '身障票',
  //   //   areaName: '紅 218',
  //   //   price: 'NTD 400',
  //   //   count: 2,
  //   // }
  // ];

  const [selected, setSelected] = useState<SelectedCount>({});

  const ticketBackground = (category: string): JSX.Element => {
    const color = category === '全票' ? '#FFECC8' : '#E1FFBA'

    return (
      <div className="px-4 py-2 text-center" style={{ backgroundColor: color }} >
        {category}
      </div>
    )
  }

  const handleNextStep = () => {
    setCurrentStep(2);
  }

  const ticketSelection = (areaName: string, count: number): JSX.Element => {
    const currentSelected = selected[areaName] || 0;
    const hasOtherSelections = Object.keys(selected).some(key => selected[key] > 0 && key !== areaName);
    const enabledPlus = !hasOtherSelections && currentSelected < count;
    const enabledMinus = currentSelected > 0;

    const handlePlus = (): void => {
      setSelected(prev => ({ ...prev, [areaName]: (prev[areaName] || 0) + 1 }));
    };

    const handleMinus = (): void => {
      setSelected(prev => ({ ...prev, [areaName]: prev[areaName] - 1 }));
    };

    return (
      count === 0
      ? <h5 className="h5 font-[500] lg:text-[20px] text-gray-03">已售完</h5>
      : <div className='flex items-center w-100 text-[24px] justify-end'>
          <button className={`border border-brand-01 w-10 h-10 ${!enabledMinus ? 'text-gray-03' : 'text-brand-01'}`} onClick={handleMinus} disabled={!enabledMinus}>-</button>
          <p className={`border-t border-b text-[14px] border-brand-01 w-12 h-10 flex justify-center items-center ${currentSelected === 0 ? 'text-gray-03' : 'text-gray-01'}`}>{currentSelected}</p>
          <button className={`border border-brand-01 w-10 h-10 ${!enabledPlus ? 'text-gray-03' : 'text-brand-01'}`} onClick={handlePlus} disabled={!enabledPlus}>+</button>
        </div>
    );
  };

  return (
    <>
      <h2 className='lg:text-[32px] text-[24px] font-bold text-gray-01 mb-10'>活動票券</h2>
      <div className="grid grid-cols-12 gap-10 mb-10">
        <div className='col-span-12 lg:col-span-5 bg-white flex items-center'>
          <Image src="/stage-info.png" alt="stage info" width="0" height="0"sizes="100vw" className='w-full h-auto' priority />
        </div>
        <div className='col-span-12 lg:col-span-7 text-gray-01'>
          <div className="grid grid-cols-12 gap-6 bg-white px-3 py-2">
            <div className="col-span-2 fs-6">票種</div>
            <div className="col-span-4 fs-6">座位區</div>
            <div className="col-span-3 fs-6 text-right">售票</div>
            <div className="col-span-3 fs-6 text-right">數量</div>
          </div>
          {tickets.map(ticket => (
            <React.Fragment key={JSON.stringify(ticket)}>
              <div className="grid grid-cols-12 gap-6 bg-white px-3 py-3 mt-2 items-center">
                {/* <div className="col-span-2 fs-6">{ticketBackground(ticket.category)}</div> */}
                <div className="col-span-2 fs-6">{ticketBackground("全票")}</div>
                <div className="col-span-4 fs-7">{ticket.areaName}</div>
                {/* <div className="col-span-3 h5 text-[24px] text-brand-01 text-right">{ticket.price}</div> */}
                {/* TODO: 缺少票價 */}
                <div className="col-span-3 h5 text-[24px] text-brand-01 text-right">{1500}</div>
                <div className="col-span-3 h7 text-brand-01 text-right">{ticketSelection(ticket.areaName, ticket.count)}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='flex justify-end'>
        <button className="py-4 px-6 rounded-none bg-brand-01 h6 text-white lg:flex-initial flex-1" onClick={handleNextStep}>下一步</button>
      </div>
    </>
  );
}

export default Step01;