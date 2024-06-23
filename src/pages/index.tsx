// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import { useGetUsersQuery } from '../store/authApi';
// import { clearToken } from '@/store/slices/authSlice';
// import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

// interface User {
//   id: number;
//   name: string;
// }

export default function Home() {
  // const { data, isLoading } = useGetUsersQuery();
  // const authToken = useSelector((state: any) => state.auth.token);
  // const dispatch = useDispatch();
  // const router = useRouter();

  // const handleLoginClick = () => {
  //   router.push('/login');
  // };

  // const handleLogout = async () => {
  //   try {
  //     dispatch(clearToken());
  //     router.push('/login');
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  // if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="relative pb-8 md:pb-0 w-full min-h-[625px] h-auto md:min-h-[807px] flex items-end md:items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm" style={{ backgroundImage: `url('/hero.jpeg')` }}></div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FFFBF5 0%, rgba(255, 251, 245, 0) 100%)' }}></div>

        <div className="container mx-auto flex flex-col-reverse md:flex-row relative z-10 ">
          <div className="w-full pt-6 mt-6 md:mt-0 md:w-1/2 md:pr-4">
            <div className="flex justify-between">
              <p className="text-gray-01 text-2xl leading-7 font-bold mb-4 mr-2 md:text-6xl md:leading-tight">SUPER JUNIOR-L.S.S.THE SHOW ： Th3ee Guys in TAIPEI</p>
              <button type="button" className='bg-white bg-opacity-70 w-[44px] h-[44px] md:w-14 md:h-14 flex justify-center items-center flex-shrink-0'>
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="w-[21px] h-[27px] text-[#DC4B4B] cursor-pointer"
                />
              </button>
            </div>
            <p className="text-base md:text-2xl md:leading-9">The Th3ee Guys are coming to Taipei with "style" Are you guys ready to 'Suit Up' for an awesome night??</p>
            <div className="flex font-medium justify-between mt-6 md:mt-20">
              <button type="button" className='bg-[#DC4B4B] py-4 px-16 leading-5 text-white mr-6'>立刻訂購</button>
              <button type="button" className='py-4 px-16 leading-5 border-2 border-black'>更多資訊</button>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-[2rem] w-full md:top-auto md:w-[50vw] h-[286px] md:h-[647px]">
          <div className="relative w-full h-full">
            <Image
              src="/hero.jpeg"
              layout="fill"
              objectFit="cover"
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
