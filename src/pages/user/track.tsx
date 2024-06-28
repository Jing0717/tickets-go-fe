import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useGetUserTrackingListMutation } from '@/store/authApi'
import Spinner from '@/components/Spinner'

// import CustomDatePicker from '@/components/CustomDatePicker'
// import { formatDate } from '@/utils/dateUtils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faThumbsUp, IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface Event {
  id: string
  eventName: string
  eventIntro: string
  eventContent: string
  tags: string[]
  introImage: string
  bannerImage: string
  eventStartDate: string
  eventEndDate: string
  releaseDate: string
}

interface TrackList {
  id: string
  eventId: Event
}

const iconMap: { [key: string]: IconDefinition } = {
  熱門: faFire,
  推薦: faThumbsUp
}

const defaultIcon = faFire

const eventStatus = ['processing', 'unstarted', 'finished']

const UserTrackList: React.FC = () => {
  const [getUserTrackingList] = useGetUserTrackingListMutation()

  // processing: 進行中; unstarted:尚未開始; completed: 已結束
  const [filter, setFilter] = useState<'processing' | 'unstarted' | 'finished'>('processing')
  const [loading, setLoading] = useState<boolean>(false)
  const [trackList, setTrackList] = useState<TrackList[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res: any = await getUserTrackingList({ status: filter }).unwrap()
        setTrackList(res && res.status && res.data ? res.data : [])
      } catch (error) {
        setTrackList([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filter, getUserTrackingList])

  const isTodayOrLater = (date: string) => {
    const today = new Date().setHours(0, 0, 0, 0)
    const givenDate = new Date(date).setHours(0, 0, 0, 0)

    return givenDate >= today
  }

  const isBeforeOrOn = (date: string, endDate: string) => {
    const givenDate = new Date(date).setHours(0, 0, 0, 0)
    const eventEndDate = new Date(endDate).setHours(0, 0, 0, 0)

    return givenDate <= eventEndDate
  }

  return (
    <Layout>
      <div className='bg-[#FFF5E1] w-full flex flex-col justify-start items-center py-10 flex-grow'>
        <div className='container mx-auto flex-grow flex flex-col'>
          <h1 className='text-3xl font-bold mb-6'>追蹤列表</h1>
          <div className='flex flex-col-reverse justify-start lg:flex-row md:justify-start xl:justify-between items-center mb-10'>
            <div className='flex w-full'>
              {eventStatus.map(status => (
                <button
                  key={status}
                  className={`border w-1/2 md:w-auto py-3 px-7 transition duration-300 transform ${
                    filter === status ? 'border-[#DC4B4B] text-[#DC4B4B] scale-105' : 'border-transparent text-black'
                  }`}
                  onClick={() => setFilter(status as 'processing' | 'unstarted' | 'finished')}
                >
                  {status === 'processing' ? '進行中' : status === 'unstarted' ? '尚未開始' : '已結束'}
                </button>
              ))}
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : trackList.length === 0 ? (
            <div className='flex flex-col items-center justify-center flex-grow'>
              {/* <p className='text-[#DC4B4B] text-lg font-bold p-5'>目前尚無訂單</p> */}
              <img src='../noOrder.png' alt='目前尚無訂單' className='w-80 h-100' />
            </div>
          ) : (
            trackList.map(item => (
              <div key={item.id} className='flex flex-col md:flex-row items-center mb-4 border-b pb-4'>
                <div className='w-full md:w-1/5'>
                  <img
                    src={item.eventId.bannerImage}
                    alt={item.eventId.eventName}
                    className='w-full md:w-[250px] md:h-[200px] object-cover'
                  />
                </div>
                <div className='flex-1 w-full md:w-4/5 bg-white p-6'>
                  <div className='flex justify-between mb-3'>
                    <div className='flex flex-row'>
                      {item.eventId.tags.map((tag, index) => (
                        <div
                          key={index}
                          className='bg-[#1E1E1ECC] text-white px-4 py-2 flex flex-row items-center mr-2'
                        >
                          <FontAwesomeIcon icon={iconMap[tag] || defaultIcon} className='w-5 h-5 pr-1.5' />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex justify-between mb-3'>
                    <span className='text-[#4A4A4A] text-base tracking-wider'>
                      {item.eventId.eventStartDate}
                      {/*  ? formatDate(item.eventRange.startDate) : '' */}
                    </span>
                  </div>
                  <div className='flex flex-col md:flex-row justify-between'>
                    <div className='w-full mb-3 md:w-1/3 md:mb-0'>
                      <h2 className='text-xl text-[#1E1E1E] font-medium mb-3'>{item.eventId.eventName}</h2>
                      <p className='overflow-hidden truncate'>{item.eventId.eventContent}</p>
                    </div>
                    <div className='w-full md:w-2/3 flex justify-center md:justify-end items-center'>
                      <button className='bg-white text-black border-2 border-black p-2 w-full md:w-28 h-11 mr-4'>
                        查看活動
                      </button>
                      {isTodayOrLater(item.eventId.releaseDate) &&
                      isBeforeOrOn(item.eventId.releaseDate, item.eventId.eventEndDate) ? (
                        <button className='bg-[#DC4B4B] text-white px-4 py-2 w-full md:w-28 h-11'>立即購票</button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default UserTrackList
