'use client';

import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 

export default function ProfilePage() {
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
          'X-Hikeroo-Token': session.user.token,
        },
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          res.json().then((content) => {
            setHiker(content);
          });
        }
      });
    }
  }, [session]);

  const logout = () => {
    signOut({
      callbackUrl: '/auth/login',
      redirect: true,
    });
  }

  return (
    <div>
      { hiker &&  <div className='bg-white flex justify-between px-5 py-3 items-center shadow-md rounded-md'>
        <div className='flex gap-x-1 items-center'>
          <Avatar className='h-20 w-20'>
            <AvatarImage src={ hiker.image ? `http://localhost:5000/profile_pics/${hiker.image}` : '/images/default_hiker.jpg' } alt="Profile picture of hiker"/>
            <AvatarFallback>{ hiker.firstName[0] }{ hiker.lastName[0] }</AvatarFallback>
          </Avatar>
          <p className='font-light'>{ hiker.firstName.concat(' '.concat(hiker.lastName)) }</p>
        </div>
        <Button variant='destructive' className='space-x-4' onClick={logout}><LogOut className='text-white'/> Logout</Button>
      </div> }
    </div>
  )
}

