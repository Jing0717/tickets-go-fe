import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useGetTagsMutation, useSearchEventsMutation } from '@/store/authApi'
import Spinner from '@/components/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Card from '@/components/Card'

interface Tags {
  _id: string
  tagName: string
  tagStatus: boolean
}

interface Event {
  id: string
  eventName: string
  eventIntro: string
  eventContent: string
  introImage: string
  bannerImage: string
  eventStartDate: string
  eventEndDate: string
  releaseDate: string
  tags: string[]
}

const SearchResults: React.FC = () => {
  const router = useRouter()
  const { query } = router.query

  const [getTags] = useGetTagsMutation()
  const [searchEvents] = useSearchEventsMutation()

  const [loading, setLoading] = useState<boolean>(false)
  const [tags, setTags] = useState<Tags[]>([])
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res: any = await getTags().unwrap()
        setTags(res && res.status && res.data ? res.data : [])
      } catch (error) {
        setTags([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [getTags])

  // useCallback 確保 fetchResults 只有在 searchEvents 發生改變時才會重新渲染，這樣 useEffect 就不會在每次渲染時都觸發
  const fetchResults = useCallback(
    async (searchQuery: string) => {
      setLoading(true)
      console.log(searchQuery)
      try {
        const res: any = await searchEvents({ query: searchQuery }).unwrap()
        if (res.status) {
          setEvents(res.data)
        } else {
          setEvents([])
        }
      } catch (error) {
        setEvents([])
      } finally {
        setLoading(false)
      }
    },
    [searchEvents]
  )

  useEffect(() => {
    if (query && typeof query === 'string') {
      console.log(query)
      setSearchQuery(query)
      fetchResults(query)
    }
  }, [query, fetchResults])

  const handleButtonClick = (id: string) => {
    setSelectedTags(prevSelectedTags => {
      const newSelectedTags = new Set(prevSelectedTags)
      if (newSelectedTags.has(id)) {
        newSelectedTags.delete(id)
      } else {
        newSelectedTags.add(id)
      }

      return newSelectedTags
    })
  }

  return (
    <div className='bg-[#FFFBF5]'>
      <section className='relative h-[286px] md:h-[480px]'>
        <div className='absolute inset-0 w-full h-full object-cover'>
          <Image src='/result.png' alt='banner image' fill style={{ objectFit: 'cover' }} loading='lazy' />
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className='bg-white container w-full mt-10 p-6'>
            <p className='mb-2 text-[#4A4A4A]'>活動類別</p>
            <div className='flex flex-row flex-wrap'>
              {tags.map(tag => (
                <button
                  key={tag._id}
                  className={`flex items-center px-4 py-2 mr-2 mb-2 transition duration-300  ${selectedTags.has(tag._id) ? 'bg-[#DC4B4B] border-[#DC4B4B]' : 'border border-black'}`}
                  onClick={() => handleButtonClick(tag._id)}
                >
                  <span
                    className={`transition duration-300 ${selectedTags.has(tag._id) ? ' text-white pr-2' : 'text-black'}`}
                  >
                    {tag.tagName}
                  </span>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`w-[10px] h-[10px] text-white transition duration-300 ${selectedTags.has(tag._id) ? 'inline-block' : 'hidden'}`}
                  />
                </button>
              ))}
            </div>
          </section>
          <section className='container overflow-hidden py-20'>
            <div className='flex items-center justify-between'>
              <h2 className='font-bold text-3xl'>{`' ${searchQuery} ' 搜尋結果`}</h2>
              <span className='ml-2 border-b-2 border-red-500 w-20'></span>
            </div>
            <div className='flex space-x-6 justify-between'>
              {events.length > 0 ? (
                events.map(event => (
                  <Card key={event.id} id={event.id} img={'/image14.jpg'} title={event.eventName} isMobileLayout={true} />
                ))
              ) : (
                <div className='text-center w-full pt-20'>
                  <p className='text-[#DC4B4B] text-2xl font-bold'>暫無活動，請重新搜尋 &gt;.0</p>
                </div>
              )}
            </div>
          </section>
          <section className={`bg-[#F5F5F5] py-20 bg-[url('/recommend.png')]`}>
            <div className='container overflow-hidden'>
              <div className='flex items-center'>
                <h2 className='font-bold text-3xl'>為您推薦</h2>
              </div>
              <div className='flex justify-center md:justify-between flex-col md:flex-row flex-wrap lg:space-x-6'>
                <Card id='1' img={'/image14.jpg'} title={'ITZY 2ND WORLD TOUR'} isMobileLayout={true} />
                <Card
                  id='2'
                  img={'/image15.jpg'}
                  title={'滅火器 Fire EX.《一生到底 One Life， One Shot》'}
                  isMobileLayout={true}
                />
                <Card
                  id='3'
                  img={'/image16.jpg'} title={'JP Saxe：A Grey Area World Tour'} isMobileLayout={true} />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default SearchResults
