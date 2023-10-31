import { LinkIcon, LogOut, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { sessionData } from '@/types/database/user'
import { useAppDispatch } from '@/app/store'

// TODO: make user type!!!!!!!!!!!!!!!!!!
export function DashboardUserNav({ user }: { user: sessionData }) {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch({type: 'auth/logout'});
  }
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="items flex h-8 w-full select-none items-center justify-between rounded-md pl-3 pr-3 text-sm text-muted-foreground transition hover:cursor-pointer hover:bg-border/50">
          <div className="flex flex-row items-center gap-2.5">
            <Avatar className="h-6 w-6 truncate border border-border">
              <AvatarImage src={user.profileImage} alt={`@${user.username}`} />
              {/* <AvatarFallback>{user.username.at(0)}</AvatarFallback> */}
            </Avatar>
            <p className="max-w-[140px] truncate text-sm">{user.username}</p>
          </div>
          <MoreHorizontal className="h-3 w-3" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 select-none"
        align="center"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="truncate text-xs leading-none text-muted-foreground">
              {user.broadcasterType}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem className="cursor-pointer">
              <LinkIcon className="mr-2 h-3 w-3" />
              Home
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/dashboard/user/settings">
              <LinkIcon className="mr-2 h-3 w-3" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/dashboard/user/privacy">
              <LinkIcon className="mr-2 h-3 w-3" />
              Privacy
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive hover:cursor-pointer focus:bg-destructive focus:text-destructive-foreground"
          onClick={logout}
        >
          <LogOut className="mr-2 h-3 w-3"  />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null
}
