import React from 'react'
import Header from '../Layout/Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow bg-[#FFF5E1]'>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
