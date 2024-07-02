import Layout from '@/components/Layout'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as solidfaBookmark } from '@fortawesome/free-solid-svg-icons'
import Card from '@/components/Card'

export default function Home() {
  return (
    <Layout>
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
            <Image src='/hero.jpeg' layout='fill' objectFit='cover' alt='Hero Image' />
          </div>
        </div>
      </div>
      <div className='bg-background pb-20'>
        <div className='container overflow-hidden'>
          <div className='flex space-x-6 justify-between'>
            <Card img={'/image14.jpg'} title={'ITZY 2ND WORLD TOUR'} />
            <Card img={'/image15.jpg'} title={'滅火器 Fire EX.《一生到底 One Life， One Shot》'} />
            <Card img={'/image16.jpg'} title={'JP Saxe：A Grey Area World Tour'} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
