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
      const result = await loginUser({ email, password });
      if (result?.data?.data?.accessToken) {
        dispatch(setToken(result.data.data.accessToken));
        router.push('/');
      } else {
        // 假设我们处理一个非HTTP错误
        setErrorMessage('An unknown error occurred');
      }
    } catch (error) {
      // 使用 TypeScript 的类型守卫来检查错误是否是 Error 类型
      if (error instanceof Error) {
        console.error('Failed to login:', error);
        setErrorMessage(error.message || 'Failed to connect to the service');
      } else {
        // 如果不是一个 Error 对象，可能是其他类型的抛出
        console.error('An unexpected error occurred:', error);
        setErrorMessage('An unexpected error occurred');
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
