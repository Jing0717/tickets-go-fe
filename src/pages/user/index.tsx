import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faFaceMehBlank } from '@fortawesome/free-regular-svg-icons'
import { useUpdateUserMutation } from '@/store/authApi'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const User: React.FC = () => {
  const [gender, setGender] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [userId, setUserId] = useState('')

  const [updateUser] = useUpdateUserMutation()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        setName(user.name)
        setAccount(user.email)
        setGender(user.gender)
        setUserId(user.id)
      }
    }
  }, [])

  useEffect(() => {
    const isFormFilled = !!(name && account && password && confirmPassword && password === confirmPassword)
    setIsFormValid(isFormFilled)
  }, [name, account, password, confirmPassword])

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender)
  }

  const handleFormSubmit = async () => {
    if (isFormValid) {
      console.log('驗證結果:', { name, account, password, confirmPassword, gender })

      try {
        const result = await updateUser({
          id: userId,
          name,
          account,
          password,
          confirmPassword,
          gender
        }).unwrap()
        console.log('更新成功:', result)

        toast.success(result.data.data.message)
      } catch (err) {
        console.error('更新失敗:', err)
      }

      setPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <Layout>
      <div className='bg-[#FFF5E1] w-full flex flex-col justify-center items-center py-10'>
        <div className=''>
          <h2 className='text-2xl font-bold pt-10 pb-4'>會員資料</h2>
        </div>

        <div className='rounded-lg w-full max-w-lg p-6'>
          <form>
            <div className='mb-4'>
              <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>
                姓名
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                  <FontAwesomeIcon icon={faUser} className='w-4 h-4' />
                </div>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5'
                  placeholder=''
                />
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='account' className='block mb-2 text-sm font-medium text-gray-900'>
                帳號
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                  <FontAwesomeIcon icon={faEnvelope} className='w-4 h-4' />
                </div>
                <input
                  type='text'
                  id='account'
                  value={account}
                  onChange={e => setAccount(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 cursor-not-allowed'
                  disabled
                  readOnly
                />
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                密碼
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                  <FontAwesomeIcon icon={faFaceMehBlank} className='w-4 h-4' />
                </div>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5'
                />
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                  <span className='font-medium'>Oops!</span> 密碼不一致
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='confirmPassword' className='block mb-2 text-sm font-medium text-gray-900'>
                確認密碼
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                  <FontAwesomeIcon icon={faFaceMehBlank} className='w-4 h-4' />
                </div>
                <input
                  type='password'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5'
                />
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                  <span className='font-medium'>Oops!</span> 密碼不一致
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block mb-2 text-sm font-medium'>性別</label>
              <div className='flex items-center space-x-4'>
                <button
                  type='button'
                  className={`text-red relative h-[50px] w-1/2 rounded overflow-hidden border border-[#DC4B4B] bg-white px-3 text-gray-900 shadow-2xl transition-all ${gender === '男' ? 'before:w-full text-[#DC4B4B]' : 'before:w-0'} before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:bg-[#FFF5E1] before:transition-all before:duration-500 hover:text-[#DC4B4B] hover:shadow-gray-900`}
                  onClick={() => handleGenderSelect('男')}
                >
                  <span className='relative z-10'>男</span>
                </button>
                <button
                  type='button'
                  className={`text-red relative h-[50px] w-1/2 rounded overflow-hidden border border-[#DC4B4B] bg-white px-3 text-gray-900 shadow-2xl transition-all ${gender === '女' ? 'before:w-full text-[#DC4B4B]' : 'before:w-0'} before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:bg-[#FFF5E1] before:transition-all before:duration-500 hover:text-[#DC4B4B] hover:shadow-gray-900`}
                  onClick={() => handleGenderSelect('女')}
                >
                  <span className='relative z-10'>女</span>
                </button>
              </div>
            </div>
            <div className='flex flex-end mt-6'>
              <button
                type='button'
                className={`w-full px-4 py-2 h-[50px] border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#DC4B4B] hover:bg-[#C24444] ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!isFormValid}
                onClick={handleFormSubmit}
              >
                <span>修改會員資料</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default User
