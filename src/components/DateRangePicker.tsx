import React, { useState, useEffect, useRef, useCallback } from 'react'
import 'tailwindcss/tailwind.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const DateRangePicker: React.FC = () => {
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true)
  const [month, setMonth] = useState<number | null>(null)
  const [year, setYear] = useState<number | null>(null)
  const [noOfDays, setNoOfDays] = useState<number[]>([])
  const [blankDays, setBlankDays] = useState<number[]>([])
  const [trailingDays, setTrailingDays] = useState<number[]>([])
  const datepickerRef = useRef<HTMLDivElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)
  const endDateRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    initDate()
    getNoOfDays()
  }, [month, year])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datepickerRef.current && !datepickerRef.current.contains(event.target as Node)) {
        setShowDatepicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const initDate = () => {
    const today = new Date()
    setMonth(today.getMonth())
    setYear(today.getFullYear())
  }

  const isToday = (date: number, month: number, year: number): boolean => {
    const today = new Date()
    const d = new Date(year, month, date)

    return today.toDateString() === d.toDateString()
  }

  const isInRange = (date: number, month: number, year: number): boolean => {
    if (!startDate || !endDate) return false
    const d = new Date(year, month, date)

    return d >= startDate && d <= endDate
  }

  const getDateValue = (day: number, month: number, year: number) => {
    const selectedDate = new Date(year, month, day)
    if (isSelectingStartDate) {
      setStartDate(selectedDate)
      setIsSelectingStartDate(false)
    } else {
      setEndDate(selectedDate)
      setIsSelectingStartDate(true)
      setShowDatepicker(false)
    }
  }

  const getNoOfDays = () => {
    if (month === null || year === null) return

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const dayOfWeek = new Date(year, month, 1).getDay()
    const blankDaysArray = Array(dayOfWeek).fill(null)

    const prevMonthDays = new Date(year, month, 0).getDate()
    const leadingDaysArray = blankDaysArray.map((_, index) => prevMonthDays - index).reverse()

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    const nextMonthDays = 42 - (leadingDaysArray.length + daysArray.length)
    const trailingDaysArray = Array.from({ length: nextMonthDays }, (_, i) => i + 1)

    setBlankDays(leadingDaysArray)
    setNoOfDays(daysArray)
    setTrailingDays(trailingDaysArray)
  }

  const formatDate = (date: Date | null): string => {
    if (!date) return ''

    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`
  }

  const handleInputClick = useCallback((isStart: boolean) => {
    setIsSelectingStartDate(isStart)
    setShowDatepicker(true)
  }, [])

  const calculateTopPosition = (): number => {
    const ref = isSelectingStartDate ? startDateRef.current : endDateRef.current
    if (ref) {
      return ref.offsetTop + ref.offsetHeight + 4
    }

    return 0
  }

  const calculateLeftPosition = (): number => {
    const ref = isSelectingStartDate ? startDateRef.current : endDateRef.current
    if (ref) {
      return ref.offsetLeft
    }

    return 0
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='container px-4 py-2 mx-auto'>
        <div className='w-64'>
          <div className='relative'>
            <div className='flex items-center'>
              <div className='relative w-full'>
                <input
                  type='text'
                  readOnly
                  ref={startDateRef}
                  className='focus:outline-none focus:border-black border w-60 h-11 py-3 pl-4 pr-10 font-medium leading-none text-gray-600'
                  placeholder='選擇時間'
                  value={formatDate(startDate)}
                  onClick={() => handleInputClick(true)}
                />
                <div className='absolute top-1 right-0 px-3 py-2'>
                  <FontAwesomeIcon icon={faCalendarDays} className='w-4 h-4' />
                </div>
              </div>
              <span className='mx-2'>~</span>
              <div className='relative w-full'>
                <input
                  type='text'
                  readOnly
                  ref={endDateRef}
                  className='focus:outline-none focus:border-black border w-60 h-11 py-3 pl-4 pr-10 font-medium leading-none text-gray-600 shadow-sm'
                  placeholder='選擇時間'
                  value={formatDate(endDate)}
                  onClick={() => handleInputClick(false)}
                />
                <div className='absolute top-1 right-0 px-3 py-2'>
                  <FontAwesomeIcon icon={faCalendarDays} className='w-4 h-4' />
                </div>
              </div>
            </div>

            {showDatepicker && (
              <div
                ref={datepickerRef}
                className='absolute bg-white rounded-lg shadow'
                style={{
                  width: '17rem',
                  top: calculateTopPosition(),
                  left: calculateLeftPosition()
                }}
              >
                <div className='flex items-center justify-between mb-2'>
                  <div>
                    <button
                      type='button'
                      className='hover:bg-green-200 inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer'
                      onClick={() => {
                        if (month === 0) {
                          setMonth(11)
                          setYear(year! - 1)
                        } else {
                          setMonth(month! - 1)
                        }
                        getNoOfDays()
                      }}
                    >
                      <FontAwesomeIcon icon={faAnglesLeft} className='w-4 h-4' />
                    </button>
                  </div>
                  <div>
                    <span className='text-lg font-bold text-gray-800'>{MONTH_NAMES[month!]}</span>
                    <span className='ml-1 text-lg font-normal text-gray-600'>{year}</span>
                  </div>
                  <div>
                    <button
                      type='button'
                      className='hover:bg-green-200 inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer'
                      onClick={() => {
                        if (month === 11) {
                          setMonth(0)
                          setYear(year! + 1)
                        } else {
                          setMonth(month! + 1)
                        }
                        getNoOfDays()
                      }}
                    >
                      <FontAwesomeIcon icon={faAnglesRight} className='w-4 h-4' />
                    </button>
                  </div>
                </div>

                <div className='flex flex-wrap mb-3 -mx-1'>
                  {DAYS.map((day, index) => (
                    <div key={index} style={{ width: '14.26%' }} className='px-1'>
                      <div className='text-xs font-medium text-center text-gray-800'>{day}</div>
                    </div>
                  ))}
                </div>

                <div className='flex flex-wrap -mx-1'>
                  {blankDays.map((date, index) => (
                    <div key={index} style={{ width: '14.28%' }} className='px-1 mb-1'>
                      <div
                        onClick={() =>
                          getDateValue(date, month === 0 ? 11 : month! - 1, month === 0 ? year! - 1 : year!)
                        }
                        className={`text-sm leading-loose text-center transition duration-100 ease-in-out rounded-full cursor-pointer text-gray-400`}
                      >
                        {date}
                      </div>
                    </div>
                  ))}
                  {noOfDays.map((date, dateIndex) => (
                    <div key={dateIndex} style={{ width: '14.28%' }} className='px-1 mb-1'>
                      <div
                        onClick={() => getDateValue(date, month!, year!)}
                        className={`text-sm leading-loose text-center transition duration-100 ease-in-out rounded-full cursor-pointer ${
                          isToday(date, month!, year!)
                            ? 'bg-green-300 text-white'
                            : isInRange(date, month!, year!)
                              ? 'bg-green-200 text-gray-700'
                              : 'text-gray-700 hover:bg-green-200'
                        }`}
                      >
                        {date}
                      </div>
                    </div>
                  ))}
                  {trailingDays.map((date, index) => (
                    <div key={index} style={{ width: '14.28%' }} className='px-1 mb-1'>
                      <div
                        onClick={() =>
                          getDateValue(date, month === 11 ? 0 : month! + 1, month === 11 ? year! + 1 : year!)
                        }
                        className={`text-sm leading-loose text-center transition duration-100 ease-in-out rounded-full cursor-pointer text-gray-400`}
                      >
                        {date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker
