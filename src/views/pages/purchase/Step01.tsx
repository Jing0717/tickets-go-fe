import React from 'react'
import Image from 'next/image'

const Step01 = () => {
  return(
    <>
      <div className='bg-background'>
          <div className="container mx-auto pb-20">
            <Banner />
          </div>
        </div>
        <div className='bg-gray-04'>
          <div className="container mx-auto py-20">
            <TicketOrder />
          </div>
        </div>
        </>
  )
}

const Banner = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Image src="/event-info.png" alt="event info" width="0" height="0"sizes="100vw" className='col-span-3 lg:col-span-1 w-full h-auto' priority />
      <div className='col-span-3 lg:col-span-2 py-3'>
        <h3 className="h3">試映會-六角Node.js課程kick off</h3>
        <p className="fs-6">2024/05/11(周六) 19:30(+0800)</p>
        <p className="fs-6">高雄巨蛋 / 高雄市左營區博愛二路757號</p>
        <div className='max-h-[2px] overflow-hidden'>
          <div className="border-t-[12px] border-gray-03 border-dashed"></div>
        </div>
        <p>那些年，我們一起等待的這門課，是一段旅程，充滿了期待與不確定性。在長廊的每一個轉角，我們都希望能夠遇見彼此，分享那些無關緊要卻又無比珍貴的時光。課程如同一座橋樑，連接我們共同的夢想與現實，每一次課堂上的討論，每一個案例的分析，都深深烙印在我們的記憶中。這不僅是學習知識的過程，更是成長與自我發現的旅程。隨著季節的變換，我們也在不知不覺中改變，從青澀走向成熟，從懵懂走向明智。而現在回首，那些年我們一起等待的這門課，不僅教會了我們知識，更重要的是教會了我們如何去愛，如何去生活。</p>
      </div>
    </div>
  );
}

const TicketOrder = () => {
  const tickets = [
    {
      category: '全票',
      area: '一樓特 A 區、綠 212、綠 213、綠 214、綠 215',
      price: 'NTD 3,600',
      mount: 10,
    },
    {
      category: '全票',
      area: '紅 218、紅 219、紅 220、橙 207、橙 208、橙 209',
      price: 'NTD 3,200',
      mount: 10,
    },
    {
      category: '全票',
      area: '紅 216、紅 217、橙 210、橙 211',
      price: 'NTD 2,800',
      mount: 10,
    },
    {
      category: '全票',
      area: '紅 218、紅 219、紅 220、橙 207、橙 208、橙 209',
      price: 'NTD 2,600',
      mount: 10,
    },
    {
      category: '全票',
      area: '綠 406、綠 407、綠 408、綠 409、綠 410',
      price: 'NTD 1,800',
      mount: 0,
    },
    {
      category: '全票',
      area: '橙 512、綠 513、綠 514、綠 515、綠 516、綠 517、綠 518',
      price: 'NTD 1,400',
      mount: 0,
    },
    {
      category: '全票',
      area: '橙 509、橙 510、橙 511',
      price: 'NTD 800',
      mount: 8,
    },
    {
      category: '身障票',
      area: '紅 218',
      price: 'NTD 400',
      mount: 2,
    }
  ];

  const ticketBackground = (category: string) => {
    const color = category === '全票' ? '#FFECC8' : '#E1FFBA'

    return (
      <div className="px-4 py-2 text-center" style={{ backgroundColor: color }} >
        {category}
      </div>
    )
  }

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
                <div className="col-span-2 fs-6">{ticketBackground(ticket.category)}</div>
                <div className="col-span-4 fs-7">{ticket.area}</div>
                <div className="col-span-3 h5 text-[24px] text-brand-01 text-right">{ticket.price}</div>
                <div className="col-span-3 h7 text-brand-01 text-right">{ticket.mount}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='flex justify-end'>
        <button className="py-4 px-6 rounded-none bg-brand-01 h6 text-white">下一步</button>
      </div>
    </>
  );
}

export default Step01;