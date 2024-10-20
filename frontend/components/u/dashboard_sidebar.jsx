'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import clsx from 'clsx';
import {
  HomeIcon,
  Mountain,
  Contact,
  MailQuestion,
  Send,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  const [hiker, setHiker] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setSession(session);
      } else {
        router.push('/auth/login');
      }
    });
  }, []);

  useEffect(() => {
    if (session) {
      fetch('http://localhost:5000/me', {
        headers: {
          'X-Hikeroo-Token': session.user.token
        }
      }).then((res) => {
        if (res.ok) {
          res.json().then((content) => {
            setHiker(content);
          });
        }
      });
    }
  }, [session]);

  return (
    <div className='lg:block hidden border-r h-full'>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className='flex h-[55px] items-center justify-between border-b px-3 w-full'>
          <Link className='flex items-center gap-2 font-semibold ml-1' href='/'>
            <span><Mountain className='text-green-600 inline mr-3'/>Hikeroo</span>
          </Link>
        </div>
        <div className="h-full flex flex-col justify-between overflow-auto py-4">
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
          { hiker && <Link className={clsx('flex items-center gap-2 rounded-lg p-4 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-gray-50 h-16', {
              'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 h-16': pathname === '/u/profile'
            })} href='/u/profile'>
              <div className='w-full flex items-center gap-x-2'>
                <Avatar className='h-14 w-14'>
                  <AvatarImage src={ hiker.image ? `http://localhost:5000/profile_pics/${hiker.image}` : '/images/default_hiker.jpg' } alt="Profile picture of hiker"/>
                  <AvatarFallback>{ hiker.firstName[0] }{ hiker.lastName[0] }</AvatarFallback>
                </Avatar>
                <p className='font-light'>{ hiker.firstName.concat(' '.concat(hiker.lastName)) }</p>
              </div>
            </Link> }
        </div>
      </div>
    </div>
  )
}
