import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import styles from './Card.module.css'

interface CardProps {
  img: string
  title: string
}

const Card: React.FC<CardProps> = ({ img, title }) => {
  return (
    <div
      className={` w-[400px] mt-10 bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 relative flex-shrink-0 ${styles.card}`}
    >
      <button
        type='button'
        className='absolute top-2 right-2 bg-white bg-opacity-70 w-[44px] h-[44px] flex justify-center items-center flex-shrink-0 z-10'
      >
        <FontAwesomeIcon icon={faBookmark} className='w-[21px] h-[27px] cursor-pointer bg-transparent' />
      </button>
      <div className='relative w-full h-64 mb-4'>
        <Image src={img} layout='fill' objectFit='cover' alt='Event Image' className='' />
      </div>
      <div className='p-4'>
        <button type='button' className='bg-[#DC4B4B] py-2 px-4 text-white font-semibold rounded w-full mb-4'>
          立刻訂購
        </button>
        <div className=''>
          <h2 className='text-lg font-semibold mb-2'>{title}</h2>
          <div className='text-gray-500 mb-2'>
            <div>
              <span>2025/02/30</span>
              <span className='mx-2'>17:30</span>
            </div>
            <div>TAIWAN</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
