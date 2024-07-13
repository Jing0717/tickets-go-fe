import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCouch } from '@fortawesome/free-solid-svg-icons'

import { usePostNewebpayCheckoutMutation } from '@/store/authApi';
import { NewebpayCheckout } from '@/types/purchase';

// interface StepsProps {
//   setCurrentStep: (step: number) => void;
// }

const Step04 = () => {
  const params = useSearchParams();
  const orderId = params.get('orderId') || "";
  console.log('orderId:', orderId)

  const [postNewebpayCheckout] = usePostNewebpayCheckoutMutation();
  const [newebpayCheckout, setNewebpayCheckout] = useState<NewebpayCheckout | undefined>();

  const handleSubmit = () => {

    // console.log('go to 金流')
    postNewebpay(orderId);
  }

  const postNewebpay= async (orderId: string) => {
    try {
      const data = await postNewebpayCheckout({ orderId }).unwrap();
      setNewebpayCheckout(data.data);
    } catch (error) {
      setNewebpayCheckout(undefined);
      console.error('Failed to fetch seats:', error);
    }
  }

  useEffect(() => {
    if (!!newebpayCheckout) {
      console.log('newebpayCheckout:', newebpayCheckout);
      createAndSubmitForm(newebpayCheckout);
    }
}, [newebpayCheckout]);

const createAndSubmitForm = (data: NewebpayCheckout) => {
    const form = document.createElement("form");
    form.method = "post";
    form.action = data.PayGateWay;

    const addField = (name: any, value: any) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
    };

    addField("MerchantID", data.MerchantID);
    addField("TradeSha", data.TradeSha);
    addField("TradeInfo", data.TradeInfo);
    addField("TimeStamp", data.TimeStamp);
    addField("Version", data.Version);
    addField("NotifyUrl", data.NotifyUrl);
    addField("ReturnUrl", data.ReturnUrl);
    addField("MerchantOrderNo", data.MerchantOrderNo);
    addField("Amt", data.Amt);
    addField("ItemDesc", data.ItemDesc);
    addField("Email", data.Email);

    document.body.appendChild(form);
    form.submit();
};

// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Pay</title>
//   </head>
//   <body>
//     <div id="app">
//       <form action="<%- PayGateWay %>" method="post">
//         <input type="text" name="MerchantID" value="<%- MerchantID %>" />
//         <input type="text" name="TradeSha" value="<%- ShaEncrypt %>" />
//         <input type="text" name="TradeInfo" value="<%- AesEncrypt %>" />
//         <input type="text" name="TimeStamp" value="<%- TimeStamp %>" />
//         <input type="text" name="Version" value="<%- Version %>" />
//         <input type="text" name="NotifyUrl" value="<%- NotifyUrl %>" />
//         <input type="text" name="ReturnUrl" value="<%- ReturnUrl %>" />
//         <input type="text" name="MerchantOrderNo" value="<%- MerchantOrderNo %>" />
//         <input type="text" name="Amt" value="<%- Amt %>" />
//         <input type="text" name="ItemDesc" value="<%- ItemDesc %>" />
//         <input type="email" name="Email" value="<%- Email %>" />
//         <button type="submit">送出</button>
//       </form>
//     </div>
//   </body>
// </html>

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