import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet';
import { Dialog, DialogClose } from '../ui/dialog';
import {
  Menu,
  HomeIcon,
  Mountain,
  Contact,
  MailQuestion,
  Send,
  UserPen,
} from 'lucide-react';

export default function DashboardNavbar({ children }) {
  return (
    <div className='flex flex-col'>
      <header className='flex h-14 lg:h-[55px] items-center gap-4 border-b px-3'>
        <Dialog>
          <SheetTrigger className='min-[1024px]:hidden p-2 transition'>
            <Menu/>
            <Link href='/u/home'>
              <span className='sr-only'>Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <Link href='/u/home'>
                <SheetTitle><Mountain className='text-green-600 inline mr-3'/>Hikeroo</SheetTitle>
              </Link>
            </SheetHeader>
            <div className='flex flex-col space-y-3 mt-[1rem]'>
              <DialogClose asChild>
                <Link href='/u/home'>
                  <Button variant='outline' className='w-full h-16'>
                    <HomeIcon className='mr-2 h-4 w-4'/>
                    Home
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href='/u/my_hikes'>
                  <Button variant='outline' className='w-full h-16'>
                    <Mountain className='mr-2 h-4 w-4'/>
                    My Hikes
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href='/u/friends'>
                  <Button variant='outline' className='w-full h-16'>
                    <Contact className='mr-2 h-4 w-4'/>
                    Friends
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href='/u/friend_requests'>
                  <Button variant='outline' className='w-full h-16'>
                    <MailQuestion className='mr-2 h-4 w-4'/>
                    Friend Requests
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href='/u/invites'>
                  <Button variant='outline' className='w-full h-16'>
                    <Send className='mr-2 h-4 w-4'/>
                    Invites
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href='/u/profile'>
                  <Button variant='outline' className='w-full h-16'>
                    <UserPen className='mr-2 h-4 w-4'/>
                    Profile
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
      </header>
      { children }
    </div>
  )
}
