'use client'
import { type ReactNode, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchCommandsData } from '@/redux/commands/commandActions'

type DashboardLayout = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayout) {
  const { session } = useAppSelector((state) => state.auth)
  const { loading } = useAppSelector((state) => state.commands)
  const dispatch = useAppDispatch()

  const init = async () => {
    await dispatch(fetchCommandsData({ channelID: session.channelID }))
  }

  useEffect(() => {
    init()
  }, [])

  if (loading === 'loading' || loading === 'idle') {
    // return <Loading />;
    return <h1>Loading...</h1>
  }

  if (loading === 'failed') {
    // router.push(`/?error=${auth.error}`);
    return <h1>Failed...</h1>
  }

  return <>{children}</>
}
