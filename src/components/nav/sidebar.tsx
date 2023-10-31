'use client'

import { dashboardConfig } from '@/config/dashboard'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { DashboardUserNav } from '@/components/nav/dashboard-user'
import { usePathname } from 'next/navigation'
import { Crown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/redux'

export function SidebarNav() {
  const pathname = usePathname()
  const [activeRoute, setActiveRoute] = useState(pathname)
  const { session } = useAppSelector((state) => state.auth)

  //TODO: import session

  useEffect(() => {
    setActiveRoute(pathname)
    console.log(session);
  }, [pathname])

  return (
    <aside className="hidden w-[250px] flex-shrink-0 select-none flex-col justify-between border-r border-border bg-border/10 md:flex">
      <section>
        <div className="flex h-[60px] flex-row items-center gap-2 px-4">
          LOGO
        </div>

        <nav className="mt-6 flex flex-col gap-6 px-4">
          {Object.values(dashboardConfig).map((category, i) => (
            <ul key={i} className="flex flex-col gap-2">
              <h2 className="text-xs uppercase text-muted-foreground/50">
                {category.title ?? ''}
              </h2>
              {category.routes.map((route) => (
                <li key={route.href}>
                  {route.disabled ? (
                    <div className="flex h-8 cursor-not-allowed items-center justify-between gap-2 rounded-md px-2 text-sm text-muted-foreground opacity-50 grayscale">
                      <div className="flex flex-row items-center gap-2 truncate">
                        <route.icon className="h-4 w-4" />
                        <p className="truncate">{route.label}</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        {route.premium && <Crown className="h-4 w-4" />}
                        {route.new && (
                          <Badge className="pointer-events-none h-4 rounded px-1.5 text-[0.65rem] text-muted">
                            new
                          </Badge>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={route.href}
                      onClick={() => setActiveRoute(route.href)}
                      className={cn(
                        'flex h-8 items-center justify-between rounded-md px-2 text-sm text-muted-foreground hover:bg-border/80 hover:text-foreground',
                        activeRoute === route.href
                          ? 'bg-border/80 text-foreground'
                          : '',
                      )}
                    >
                      <div className="flex flex-row items-center gap-2 truncate">
                        <route.icon className="h-4 w-4 text-primary" />
                        <p className="truncate">{route.label}</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        {route.premium && (
                          <Crown className="h-4 w-4 text-amber-500" />
                        )}
                        {route.new && (
                          <Badge className="pointer-events-none h-4 rounded px-1.5 text-[0.65rem] text-muted">
                            new
                          </Badge>
                        )}
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </section>

      <div className="px-4 py-6">
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <DashboardUserNav user={session} />
        </div>
      </div>
    </aside>
  )
}
