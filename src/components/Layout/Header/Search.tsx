import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<InputProps> = ({ placeholder = '', onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleIconClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleInputBlur = () => {
    setTimeout(() => setIsInputFocused(false), 200)
  }

  const handleSearch = () => {
    const searchValue = inputRef.current?.value
    if (searchValue) {
      const formattedQuery = searchValue.trim().split(' ').join(',')
      router.push(`/searchResults?query=${encodeURIComponent(formattedQuery)}`)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event)
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center md:relative'>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className='w-6 h-6 m-2 text-[#1E1E1E] md:absolute cursor-pointer'
          onClick={handleIconClick}
        />
        <input
          type='text'
          placeholder={placeholder}
          ref={inputRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className='hidden md:block w-[351px] h-[44px] pl-10 opacity-100 border border-gray-300 rounded'
        />
        <div className='hidden md:block'>
          {isInputFocused && (
            <div className='max-w-[351px] mt-4 bg-[#4A4A4A] text-white absolute left-0 top-12 z-50 text-sm p-4'>
              <p className='text-[#D9D9D9] font-semibold'>最近搜尋</p>
              <div className='flex flex-wrap mt-2'>
                {['大港開唱', '大港開唱', '滅火器', '滅火器', '吳卓元', '吳卓元'].map((tag, index) => (
                  <span
                    key={index}
                    className='flex items-center text-[#D9D9D9] pl-4 pr-3 py-2 border-[#D9D9D9] border-[1px] mr-2 mb-2'
                  >
                    {tag}
                    <FontAwesomeIcon icon={faTimes} className='w-4 h-4 text-white cursor-pointer ml-1' />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex flex-col items-center p-4 bg-[#4A4A4A] text-white'>
          <div className='flex justify-end w-full'>
            <FontAwesomeIcon icon={faTimes} className='w-6 h-6 text-white cursor-pointer' onClick={handleCloseModal} />
          </div>
          <div className='w-full mt-4 relative' onClick={handleSearch}>
            <input
              type='text'
              placeholder={placeholder}
              ref={inputRef}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              className='w-full h-[44px] pl-10 opacity-100 border border-gray-300 rounded'
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='text-[#1E1E1E] absolute cursor-pointer left-3 top-[14px]'
            />
          </div>
          <div className='w-full mt-4'>
            <p className='text-[#D9D9D9] font-semibold'>最近搜尋</p>
            <div className='flex flex-wrap mt-2'>
              {['大港開唱', '大港開唱', '滅火器', '滅火器', '吳卓元', '吳卓元'].map((tag, index) => (
                <span
                  key={index}
                  className='flex items-center text-[#D9D9D9] px-2 py-1 border-[#D9D9D9] border-2 mr-2 mb-2'
                >
                  {tag}
                  <FontAwesomeIcon icon={faTimes} className='w-4 h-4 text-white cursor-pointer ml-2' />
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
