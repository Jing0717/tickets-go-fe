import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const Notification: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='relative'>
      <button
        className='flex justify-center items-center p-2 hover:cursor-pointer'
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
      </button>
      {isDropdownOpen && (
        <ul className='flex flex-col p-2 bg-[#4A4A4A] absolute top-[62px] right-0 max-w-[351px]'>
          <li className='group hover:bg-[#C6C6C6] text-white py-2 px-3 cursor-pointer border-b-[1px] border-white'>
            <p className='font-noto-sans-tc text-[14px] font-medium leading-[21px] truncate group-hover:text-[#1E1E1E]'>您追蹤的 Hush! 李多慧粉絲見面會 已開放訂購 ！</p>
            <p className='text-[#C6C6C6] font-noto-sans-tc text-[14px] font-normal leading-[16.8px] group-hover:text-[#4A4A4A]'>2025/02/30</p>
          </li>
          <li className='group hover:bg-[#C6C6C6] text-white py-2 px-3 cursor-pointer border-b-[1px] border-white'>
            <p className='font-noto-sans-tc text-[14px] font-medium leading-[21px] truncate group-hover:text-[#1E1E1E]'>宇宙人《α：回到未來》20週年演唱會 購買成功 ！</p>
            <p className='text-[#C6C6C6] font-noto-sans-tc text-[14px] font-normal leading-[16.8px] group-hover:text-[#4A4A4A]'>2025/02/30</p>
          </li>
          <li className='group hover:bg-[#C6C6C6] text-white py-2 px-3 cursor-pointer'>
            <p className='font-noto-sans-tc text-[14px] font-medium leading-[21px] truncate group-hover:text-[#1E1E1E]'>❬❬ 2024 大港開唱 ❭❭ 票券剩餘不多，請儘速搶購！！</p>
            <p className='text-[#C6C6C6] font-noto-sans-tc text-[14px] font-normal leading-[16.8px] group-hover:text-[#4A4A4A]'>2025/02/30</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Notification;
