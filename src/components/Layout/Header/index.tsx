import Image from 'next/image'
import React from 'react'
import Search from './Search'
import Notification from './Notification'
import UserProfile from './UserProfile'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='h-[80px] bg-background flex items-center'>
      <div className="container">
        <div className="flex justify-between items-center">
          <Image src="/logo.png" alt="Logo" width={154} height={48} priority />
          <div className="flex items-center justify-between flex-nowrap">
            <Search placeholder='搜尋活動' />
            <Notification />
            <UserProfile />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header