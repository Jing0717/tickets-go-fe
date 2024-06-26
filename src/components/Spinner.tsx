import React from 'react'

const Spinner: React.FC = () => {
  return (
    <div className='flex justify-center items-center flex-grow'>
      <div className='relative'>
        <div
          className='w-12 h-12 rounded-full absolute
              border-4 border-solid border-[#DC4B4B1A]'
        ></div>
        <div
          className='w-12 h-12 rounded-full animate-spin absolute
              border-4 border-solid border-[#DC4B4B] border-t-transparent'
        ></div>
      </div>
    </div>
  )
}

export default Spinner
