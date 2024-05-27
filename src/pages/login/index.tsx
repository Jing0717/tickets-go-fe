import React, { useState } from 'react';
import { useLoginUserMutation } from '@/store/authApi';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await loginUser({ email, password })
      if (result?.data?.data?.accessToken) {
        dispatch(setToken(result.data.data.accessToken))
        router.push('/')
      } else {
        // 處理回應成功卻未取得到 token 的異常錯誤
        setErrorMessage('無法取得驗證 token，請稍後再試')
      }
    } catch (error: unknown) {
      // 更精確的錯誤處理，取得 error.message 提示
      if (error instanceof Error) {
        console.error('登入失敗:', error)
        setErrorMessage(error.message || '無法連接到服務，請稍後再試')
      } else {
        // 非預期的錯誤
        console.error('發生了意外的錯誤:', error)
        setErrorMessage('發生了意外的錯誤，請稍後再試')
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className='ml-2'>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith@mail.com" />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
          </div>
        </div>
      </div>
      <button className='border-black border-2 mt-2' type="submit" disabled={isLoading}>
        Login
      </button>
      {errorMessage !== '' && <p>Error logging in: {errorMessage}</p>}
    </form>
  );
};

export default Login;
