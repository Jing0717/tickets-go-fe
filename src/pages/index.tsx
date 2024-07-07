import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as solidfaBookmark } from '@fortawesome/free-solid-svg-icons'
import Card from '@/components/Card'
import { FC, useEffect, useState } from 'react'

interface AccordionItemProps {
  date: string
  title: string
  content: string
  img: string
  isOpen?: boolean
}

const AccordionItem: FC<AccordionItemProps> = ({ date, title, content, img, isOpen = false }) => {
  const [isItemOpen, setIsItemOpen] = useState(isOpen);

  useEffect(() => {
    setIsItemOpen(isOpen);
  }, [isOpen]);

  return (
    <div className='bg-background'>
      <div
        className='flex justify-between items-center p-4 cursor-pointer border-b-1 border-gray-03'
        onClick={() => setIsItemOpen(!isItemOpen)}
      >
        <div className='flex space-x-4 text-gray-01'>
          <span className='text-xl'>{date}</span>
          <h3 className='font-medium text-xl leading-6 font-noto-sans-tc whitespace-pre-line'>{title}</h3>
        </div>
      </div>
      {isItemOpen && (
        <div className='border-b-2 border-gray-03 p-7 bg-white'>
          <div className='flex flex-col md:flex-row items-start md:items-center'>
            <div className='relative w-full h-64 md:max-w-[526px] md:pr-4 mb-4 md:mb-0'>
              <Image src={img} alt='Event Image' className='' fill style={{ objectFit: 'cover' }} />
              <button
                type='button'
                className='absolute top-0 right-0 bg-white bg-opacity-70 w-[44px] h-[44px] flex justify-center items-center flex-shrink-0 z-10'
              >
                <FontAwesomeIcon icon={faBookmark} className='w-[21px] h-[27px] cursor-pointer' />
              </button>
            </div>
            <div className='md:w-1/2 ml-10'>
              <p className='text-gray-500 mb-2'>{date}</p>
              <h3 className='text-lg font-semibold mb-2'>{title}</h3>
              <p className='text-gray-500 mb-2'>{content}</p>
              <button type='button' className='bg-brand-01 py-2 px-4 text-white font-semibold'>
                前往查看
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface EventCardProps {
  img: string
  title: string
  index: number
}

const EventCard: FC<EventCardProps> = ({ img, title, index }) => {
  const marginStyle = index % 2 === 0 ? 'mb-20' : 'mt-20'

  return (
    <div
      className={`relative w-[306px] h-[400px] overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-95 ${marginStyle}`}
    >
      <Image src={img} layout='fill' objectFit='cover' alt={title} className='absolute inset-0 w-full h-full' />
      <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <h3 className='text-white text-xl font-bold'>{title}</h3>
      </div>
    </div>
  )
}

const events = [
  { img: '/event1.jpeg', title: '演唱會' },
  { img: '/event2.jpeg', title: '見面會' },
  { img: '/event3.jpeg', title: '音樂會' },
  { img: '/event4.jpeg', title: '試映會' }
]

export default function Home() {
  return (
    <>
      <div className='relative pb-8 md:pb-0 w-full min-h-[625px] h-auto md:min-h-[807px] flex items-end md:items-center overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center opacity-20 blur-sm'
          style={{ backgroundImage: `url('/hero.jpeg')` }}
        ></div>
        <div
          className='absolute inset-0'
          style={{ background: 'linear-gradient(180deg, #FFFBF5 0%, rgba(255, 251, 245, 0) 100%)' }}
        ></div>

        <div className='container mx-auto flex flex-col-reverse md:flex-row relative z-10 '>
          <div className='w-full pt-6 mt-6 md:mt-0 md:w-1/2 md:pr-4'>
            <div className='flex justify-between'>
              <p className='text-gray-01 text-2xl leading-7 font-bold mb-4 mr-2 md:text-6xl md:leading-tight'>
                SUPER JUNIOR-L.S.S.THE SHOW ： Th3ee Guys in TAIPEI
              </p>
              <button
                type='button'
                className='bg-white bg-opacity-70 w-[44px] h-[44px] md:w-14 md:h-14 flex justify-center items-center flex-shrink-0'
              >
                <FontAwesomeIcon icon={solidfaBookmark} className='w-[21px] h-[27px] text-[#DC4B4B] cursor-pointer' />
              </button>
            </div>
            <p className='text-base md:text-2xl md:leading-9'>
              The Th3ee Guys are coming to Taipei with "style" Are you guys ready to 'Suit Up' for an awesome night??
            </p>
            <div className='flex font-medium justify-between mt-6 md:mt-20'>
              <button type='button' className='bg-[#DC4B4B] py-4 px-16 leading-5 text-white mr-6'>
                立刻訂購
              </button>
              <button type='button' className='py-4 px-16 leading-5 border-2 border-black'>
                更多資訊
              </button>
            </div>
          </div>
        </div>

        <div className='absolute right-0 top-[2rem] w-full md:top-auto md:w-[50vw] h-[286px] md:h-[647px]'>
          <div className='relative w-full h-full'>
            <Image
              src='/hero.jpeg'
              alt='Hero Image'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
      <div className='bg-background pb-20'>
        <div className='container overflow-hidden py-20'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold text-3xl'>近期活動</h2>
            <span className='ml-2 border-b-2 border-red-500 w-20'></span>
          </div>
          <div className='flex space-x-6 justify-between'>
            <Card img={'/image14.jpg'} title={'ITZY 2ND WORLD TOUR'} />
            <Card img={'/image15.jpg'} title={'滅火器 Fire EX.《一生到底 One Life， One Shot》'} />
            <Card img={'/image16.jpg'} title={'JP Saxe：A Grey Area World Tour'} />
          </div>
        </div>
      </div>
      <div className='bg-background'>
        <div className='container py-20'>
          <div className='flex items-center justify-between mb-10'>
            <h2 className='font-bold text-3xl'>即將舉辦</h2>
            <span className='ml-2 border-b-2 border-red-500 w-20'></span>
          </div>
          <div className=''>
            <AccordionItem
              date='2025/02/30'
              title={`SUPER JUNIOR-L.S.S.THE SHOW ： \nTh3ee Guys in TAIPEI`}
              content="The Th3ee Guys are coming to Taipei with 'style'. Are you guys ready to 'Suit Up' for an awesome night??"
              img='/image14.jpg'
              isOpen={true}
            />
            <AccordionItem
              date='2025/02/30'
              title={`SUPER JUNIOR-L.S.S.THE SHOW ： \nTh3ee Guys in TAIPEI`}
              content="The Th3ee Guys are coming to Taipei with 'style'. Are you guys ready to 'Suit Up' for an awesome night??"
              img='/image15.jpg'
            />
            <AccordionItem
              date='2025/02/30'
              title={`SUPER JUNIOR-L.S.S.THE SHOW ： \nTh3ee Guys in TAIPEI`}
              content="The Th3ee Guys are coming to Taipei with 'style'. Are you guys ready to 'Suit Up' for an awesome night??"
              img='/image16.jpg'
            />
          </div>
        </div>
        <div className='container mx-auto py-20'>
          <div className='flex justify-between items-center mb-10'>
            <div className=''>
              <h2 className='font-bold text-3xl mb-4'>探索其他活動</h2>
              <p className='text-gray-01 text-2xl leading-9'>深入每個角落，找到你的下一個冒險</p>
            </div>
            <div className='border-b-1 border-red-500 w-20'></div>
          </div>
          <div className='flex overflow-x-auto scrollbar-hide space-x-6'>
            {events.map((event, index) => (
              <EventCard key={index} img={event.img} title={event.title} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
