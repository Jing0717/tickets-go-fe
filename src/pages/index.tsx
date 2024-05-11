// pages/index.js 或 pages/index.tsx
import { useGetUsersQuery } from '../store/authApi';

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.data?.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
