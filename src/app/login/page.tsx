'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginInUser } from '@/redux/auth/authSlice';

export default function Page() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    if(isAuthenticated) return;
    dispatch(loginInUser());
  };


  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
