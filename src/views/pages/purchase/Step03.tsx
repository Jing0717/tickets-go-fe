import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCouch } from '@fortawesome/free-solid-svg-icons'

interface StepsProps {
  setCurrentStep: (step: number) => void;
}

const Step03 = ({ setCurrentStep }: StepsProps) => {
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
        <div className='lg:mb-20 mb-8'>
          <PaymentForm setCurrentStep={setCurrentStep} />
        </div>
      </div>
    </div>
  )
}

interface FormInput {
  paymentType: string;
  amount: number;
}

const PaymentForm = ({ setCurrentStep }: StepsProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = data => {
    console.log(data);
    setCurrentStep(3)
  };

  const handlePrevStep = () => {
    setCurrentStep(0)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="lg:mb-6 mb-4">
        <label htmlFor="paymentType" className="block text-[14px] text-gray-02">付款方式 <span className="text-red-500 text-xs">  *僅提供信用卡</span></label>
        <select disabled={true} defaultValue={"1"} {...register("paymentType", { required: true })} className="mt-1 px-4 py-3 block w-full border-hidden shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="1">Credit Card</option>
        </select>
        {errors.paymentType && <span className="text-red-500 text-xs">This field is required</span>}
      </div>
      <div className="lg:mb-6 mb-4">
        <label htmlFor="amount" className="block text-[14px] text-gray-02">付款金額</label>
        <input type="number" defaultValue={500} readOnly={true} {...register("amount", { required: true })} className="mt-1 px-4 py-3 block w-full border-hidden shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
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