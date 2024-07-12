import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useRouter } from 'next/router';
import Search from './Search';
import Notification from './Notification';
import UserProfile from './UserProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    setIsClient(true);

    if (!isLogin && router.pathname !== '/') {
      router.push('/login');
    }
  }, [isLogin, router]);

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className='h-[80px] bg-background flex items-center'>
      <div className='container'>
        <div className='flex justify-between items-center'>
          <Image
            src='/logo.svg'
            alt='Logo'
            className='cursor-pointer'
            width={154}
            height={48}
            onClick={() => router.push('/')}
          />
          <div className='flex items-center justify-between flex-nowrap'>
            <Search placeholder='搜尋活動(以空白 區隔可多筆查詢)' />
            {isClient && isLogin ? (
              <>
                <Notification />
                <UserProfile />
              </>
            ) : (
              <button
                onClick={handleLogin}
                className='ml-6 bg-gray-01 text-white px-6 py-3 font-medium text-base leading-[19.2px]'
              >
                登入
              </button>
            )}
          </div>
        </div>
      </div>
      {showScrollToTop && (
        <div
          className='fixed z-10 bg-gray-03 right-6 bottom-[112px] md:right-[60px] md:bottom-[120px] w-[44px] h-[44px] flex justify-center items-center cursor-pointer'
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faAngleUp} className='w-7 h-7' />
        </div>
      )}
    </div>
  );
};

export default Header;
