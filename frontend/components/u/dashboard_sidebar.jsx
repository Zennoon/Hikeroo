'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  HomeIcon,
  Mountain,
  Contact,
  MailQuestion,
  Send,
} from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <div className='lg:block hidden border-r h-full'>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className='flex h-[55px] items-center justify-between border-b px-3 w-full'>
          <Link className='flex items-center gap-2 font-semibold ml-1' href='/'>
            <span><Mountain className='text-green-600 inline mr-3'/>Hikeroo</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className='grid items-start px-4 text-sm font-medium'>
            <Link className={clsx('flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-gray-50 h-16', {
              'flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 h-16': pathname === '/u/home'
            })} href='/u/home'>
              <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
                <HomeIcon className='h-3 w-3'/>
              </div>
              Home
            </Link>
            <Link className={clsx('flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-gray-50 h-16', {
              'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 h-16': pathname === '/u/my_hikes'
            })} href='/u/my_hikes'>
              <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
                <Mountain className='h-3 w-3'/>
              </div>
              My hikes
            </Link>
            <Link className={clsx('flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-gray-50 h-16', {
              'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 h-16': pathname === '/u/friends'
            })} href='/u/friends'>
              <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
                <Contact className='h-3 w-3'/>
              </div>
              Friends
            </Link>
            <Link className={clsx('flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-gray-50 h-16', {
              'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 h-16': pathname === '/u/friend_requests'
            })} href='/u/friend_requests'>
              <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
                <MailQuestion className='h-3 w-3'/>
              </div>
              Friend Requests
            </Link>
            <Link className={clsx('flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-gray-50 h-16', {
              'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 h-16': pathname === '/u/invites'
            })} href='/u/invites'>
              <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
                <Send className='h-3 w-3'/>
              </div>
              Invites
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
