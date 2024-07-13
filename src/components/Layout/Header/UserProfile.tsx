import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { clearToken } from '@/store/slices/authSlice'
import Image from 'next/image'

const UserProfile: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const parsedUser = JSON.parse(user)
      setUserName(parsedUser.name)
    }
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    dispatch(clearToken())
  }

  return (
    <div className='relative z-20'>
      <button className='flex justify-center items-center p-2 space-x-1 hover:cursor-pointer' onClick={toggleDropdown}>
        <div className='relative w-8 h-8'>
          <Image src='/avatar.jpeg' alt='Avatar' layout='fill' className='rounded-full object-cover' />
        </div>
        <span className='font-noto-sans-tc'>{userName}</span>
        <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className='w-6 h-6' />
      </button>
      {isDropdownOpen && (
        <ul className='flex flex-col p-2 space-y-1 bg-[#4A4A4A] absolute top-[62px] right-0 min-w-[144px] z-30'>
          <li
            className='hover:bg-[#C6C6C6] hover:text-black text-white py-2 px-4 cursor-pointer'
            onClick={() => handleNavigation('/user')}
          >
            個人資料
          </li>
          <li
            className='hover:bg-[#C6C6C6] hover:text-black text-white py-2 px-4 cursor-pointer'
            onClick={() => handleNavigation('/user/orders')}
          >
            訂單查詢
          </li>
          <li
            className='hover:bg-[#C6C6C6] hover:text-black text-white py-2 px-4 border-b-[1px] border-white cursor-pointer'
            onClick={() => handleNavigation('/user/track')}
          >
            追蹤列表
          </li>
          <li className='hover:bg-[#C6C6C6] hover:text-black text-white py-2 px-4 cursor-pointer' onClick={handleLogout}>登出</li>
        </ul>
      )}
    </div>
  )
}

export default UserProfile
