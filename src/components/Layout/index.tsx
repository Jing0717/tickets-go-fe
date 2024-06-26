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
      <main className='flex-grow flex flex-col min-h-0'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
