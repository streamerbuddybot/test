"use client";
import { use, type ReactNode, useEffect } from 'react'

import { Breadcrumb } from '../../components/nav/breadcrumb'
import { DashboardNav } from '../../components/nav/dashboard'
import { SidebarNav } from '../../components/nav/sidebar'
import { useAppSelector } from '../../hooks/redux'
import { getSessionData } from '../../redux/auth/AuthActions';
import { useAppDispatch } from '../store';

type DashboardLayout = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayout) {
  const { session, loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();

  const init = async () => {
    await dispatch(getSessionData());
  }


  useEffect(() => {
    init();
  }, [])


  if (loading === "loading") {
    // return <Loading />;
    return <h1>Loading...</h1>;
  }

  if (loading === "failed") {
    // router.push(`/?error=${auth.error}`);
    return <h1>Failed...</h1>;
  }







  return (
    <div className="flex">
      <SidebarNav />
      <div className="w-full">
        <DashboardNav />
        <div className="h-[calc(100vh-60px)] overflow-x-hidden overflow-y-scroll pb-10">
          <Breadcrumb />
          <div className="mx-auto px-10">{children}</div>
        </div>
      </div>
    </div>
  )
}