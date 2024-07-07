import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCouch } from '@fortawesome/free-solid-svg-icons'

// interface StepsProps {
//   setCurrentStep: (step: number) => void;
// }

const Step04 = () => {

  const handleSubmit = () => {
    console.log('go to 金流')
  }

  return (
    <div className='bg-background'>
      <div className="container mx-auto px-4 max-w-[668px]">
        <h3 className="h3 font-bold lg:text-[28px] text-[24px] text-gray-01  mb-6">試映會-六角Node.js課程kick off</h3>
        <div className="lg:mb-10 mb-6 text-gray-02">
          <div className='flex gap-4 items-center mb-3'>
            <FontAwesomeIcon icon={faCalendarDays} className='w-5 h-5 text-brand-01' />
            <p className="fs-6 ">2024/05/11(周六) 19:30(+0800)</p>
          </div>
          <div className='flex gap-4 items-center'>
            <FontAwesomeIcon icon={faCouch} className='w-5 h-5 text-brand-01' />
            <p className="fs-6">E9、E10</p>
          </div>
        </div>
        <div className='lg:mb-20 mb-8 flex justify-center'>
          <a href="#" className='block h-[50px] max-w-[400px] w-full' style={{ backgroundImage: `url('/newebpay.png')`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}></a>
        </div>
        <div className='lg:mb-20 mb-8'>
          <div className='flex justify-center lg:mt-10 mt-6 lg:gap-6 gap-3'>
              <button className="bg-transparent border-2 border-gray-01 text-gray-01 font-[500] py-4 px-6 lg:flex-initial flex-1 disabled:bg-gray-04 disabled:border-hidden disabled:text-gray-03" disabled={true}>
                上一步
              </button>
              <button className="bg-brand-01 text-white font-[500] py-4 px-6 lg:flex-initial flex-1" onClick={handleSubmit}>
                下一步
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Step04;