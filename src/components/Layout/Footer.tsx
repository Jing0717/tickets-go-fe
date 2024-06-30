import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className='bg-gray-02 py-6 font-noto-sans-tc relative'>
      <div className='container'>
        <div className='flex flex-col md:flex-row text-gray-03 text-sm'>
          <div className='mb-4 md:max-w-[429px] md:mr-10'>
            <Image src='/logo.svg' alt='Logo' width={154} height={48} priority />
            <p className='text-sm leading-4 mt-4'>
              在 TicketsGo，我們致力於為您提供無與倫比的購票體驗，讓您輕鬆訪問和購買各類活動的門票。
              無論您是音樂會的鐵杆粉絲，體育賽事的狂熱支援者，還是劇場和藝術表演的愛好者，TicketsGo 都能滿足您的需求。
            </p>
          </div>
          <div className='w-full md:flex'>
            <div className='flex space-x-4 mb-4 md:w-2/3'>
              <div className='w-1/2'>
                <p className='py-2 px-4'>探索活動</p>
                <ul className='flex flex-col border-t-1 border-gray-03 py-2 px-4 text-white'>
                  <li className='py-2 cursor-pointer hover:text-gray-03'>演唱會活動</li>
                  <li className='py-2 cursor-pointer hover:text-gray-03'>學習活動</li>
                  <li className='py-2 cursor-pointer hover:text-gray-03'>讀書會活動</li>
                </ul>
              </div>
              <div className='w-1/2'>
                <p className='py-2 px-4'>會員專區</p>
                <ul className='flex flex-col border-t-1 border-gray-03 py-2 px-4 text-white'>
                  <li className='py-2 cursor-pointer hover:text-gray-03' onClick={() => handleNavigation('/user')}>
                    個人資料
                  </li>
                  <li
                    className='py-2 cursor-pointer hover:text-gray-03'
                    onClick={() => handleNavigation('/user/orders')}
                  >
                    訂單查詢
                  </li>
                  <li
                    className='py-2 cursor-pointer hover:text-gray-03'
                    onClick={() => handleNavigation('/user/track')}
                  >
                    追蹤列表
                  </li>
                </ul>
              </div>
            </div>
            <div className='w-full md:ml-4 md:w-1/3'>
              <p className='py-2 px-4'>相關連結</p>
              <ul className='flex flex-col border-t-1 border-gray-03 py-2 px-4 text-white'>
                <li className='py-2 cursor-pointer hover:text-gray-03'>關於我們</li>
                <li className='py-2 cursor-pointer hover:text-gray-03'>購票說明</li>
                <li className='py-2 cursor-pointer hover:text-gray-03'>隱私權政策</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between mt-8 border-gray-03 border-t-1 pt-4'>
          <p className='text-gray-03'>Copyright © 2024 北六組 All Rights Reserved</p>
          <div className='flex space-x-4 mt-4 md:mt-0'>
            <Image src='/fb.svg' alt='Logo' width={24} height={24} priority />
            <Image src='/X.svg' alt='Logo' width={24} height={24} priority />
          </div>
        </div>
      </div>
      <div className='absolute bg-gray-03 right-6 bottom-[112px] md:right-[60px] md:bottom-[120px] w-[44px] h-[44px] flex justify-center items-center'>
        <FontAwesomeIcon icon={faAngleUp} className='w-7 h-7' />
      </div>
    </div>
  )
}

export default Footer
