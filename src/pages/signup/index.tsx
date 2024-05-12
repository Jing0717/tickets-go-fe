import { useRegisterUserMutation } from '@/store/authApi';
import React from 'react'

const SignUp = () => {
  const [error, isLoading] = useRegisterUserMutation();

  const handleRegister = async () => {
    console.log('onClick')
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <button className='ring-2 ring-black p-1 m-1' onClick={handleRegister}>Register</button>
    </div>
  );
}

SignUp.propTypes = {}

export default SignUp