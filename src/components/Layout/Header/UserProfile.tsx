import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const UserProfile: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='relative'>
      <button
        className='flex justify-center items-center p-2 space-x-1 hover:cursor-pointer'
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
        <span className='font-noto-sans-tc'>Jacky</span>
        <FontAwesomeIcon
          icon={isDropdownOpen ? faAngleUp : faAngleDown}
          className="w-6 h-6"
        />
      </button>
      {isDropdownOpen && (
        <ul className='flex flex-col p-2 space-y-1 bg-[#4A4A4A] absolute top-[62px] right-0 min-w-[144px]'>
          <li className='hover:bg-[#C6C6C6] hover:text-black text-white py-2 px-4 cursor-pointer'>個人資料</li>
          <li className='hover:bg-[#C6C6C6] hover:text-black text-white py-2 px-4 cursor-pointer'>訂單資料</li>
          <li className='hover:bg-[#C6C6C6] hover:text-black text-white py-2 px-4 border-b-[1px] border-white cursor-pointer'>追蹤列表</li>
          <li className='hover:bg-[#C6C6C6] hover:text-black text-white py-2 px-4 cursor-pointer'>登出</li>
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
