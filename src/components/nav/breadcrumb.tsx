'use client'

import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'

export function Breadcrumb() {
  const path = usePathname().replace('-', ' ')
  const paths = path.split('/').filter((p) => p !== '')
  return paths ? (
    <section className="mx-auto flex select-none items-center px-10 py-8">
      {paths.map((path: any, index: number) => (
        <Fragment key={index}>
          <h2
            className={cn(
              'text-lg',
              index !== paths.length - 1
                ? 'text-muted-foreground'
                : 'text-foreground'
            )}
          >
            {capitalizeFirstLetter(path)}
          </h2>
          {index !== paths.length - 1 && <ChevronRight className="h-4 w-5" />}
        </Fragment>
      ))}
    </section>
  ) : null
}