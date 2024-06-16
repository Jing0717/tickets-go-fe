import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useGetUsersQuery } from '../store/authApi';
import { clearToken } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout';

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const { data, isLoading } = useGetUsersQuery();
  const authToken = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      dispatch(clearToken());
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;


  return (
    <Layout>
      <div>
        <h1>Welcome to Tickets Go!!</h1>
        <button onClick={() => router.push('/order')} className='ring-2 ring-black p-1 m-2'>訂單頁</button>
        <button onClick={() => router.push('/signup')} className='ring-2 ring-black p-1 m-2'>註冊頁面</button>
        <button onClick={() => router.push('/tags')} className='ring-2 ring-black p-1 m-2'>分類頁</button>
        {authToken ? (
          <>
            <p>已登入</p>
            <button onClick={handleLogout} className='ring-2 ring-black p-1 m-2'>登出</button>
            <ul>
              {data?.data?.map((user: User) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <button onClick={handleLoginClick} className='ring-2 ring-black p-1 m-2'>請登入</button>
        )}
      </div>
    </Layout>
  );
}
