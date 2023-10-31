import { DashboardConfig } from '@/types'

import {
  AreaChart,
  ArrowBigUp,
  Dices,
  Gamepad2,
  Joystick,
  LayoutGrid,
  Lock,
  MessagesSquare,
  PiggyBank,
  Shield,
  Swords,
  MessageSquare,
} from 'lucide-react'

export const dashboardConfig: DashboardConfig = {
  overview: {
    routes: [
      {
        label: 'Overview',
        href: '/dashboard/overview',
        icon: LayoutGrid,
      },
    ],
  },

  twitch: {
    title: 'Twitch',
    routes: [
      {
        label: 'Commands',
        href: '/dashboard/twitch/commands',
        icon: MessageSquare,
      },
    ],
  },



  // admin: {
  //   title: 'Admin',
  //   routes: [
  //     {
  //       label: 'Admin Panel',
  //       href: '/dashboard/admin',
  //       icon: Lock,
  //     },
  //     {
  //       label: 'Analytics',
  //       href: '/dashboard/analytics',
  //       icon: AreaChart,
  //     },
  //   ],
  // },
}
