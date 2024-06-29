import React, { useState } from 'react'

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
  const [currentStep, setCurrentStep] = useState(0);

  const StepsContent = ({stepIndex}: {stepIndex: number}) => {
    switch (stepIndex) {
      case 0:
        return <Step01 />;
      case 1:
        return <Step02 />;
      case 2:
        return <Step03 />;
      case 3:
        return <Step04 />;
      case 4:
        return <Step05 />;
      default:
        return <div>未知步驟</div>;
    }
  };

  return (
    <>
      <div className='bg-background'>
        <div className="container mx-auto p-4">
          <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
      <StepsContent stepIndex={currentStep}/>
    </>
  )
}

export default Purchase