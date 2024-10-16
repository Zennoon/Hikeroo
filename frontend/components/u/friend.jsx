'use client'
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '../ui/button';

export default function Friend({ token, friend }) {
  const [unfriended, setUnfriended] = useState(false);

  const unfriend = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/friends', {
        method: 'DELETE',
        headers: {
          'X-Hikeroo-Token': session.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId: friend.id }),
      }).then((res) => {
        if (res.ok) {
          setUnfriended(true);
        }
      });
    });
  }

  return (
    <div className='bg-white border-1 flex justify-between px-5 py-3 items-center rounded-md'>
      <div className='flex gap-x-1 items-center'>
        <Avatar className='h-20 w-20'>
          <AvatarImage src={ friend.image ? `http://localhost:5000/profile_pics/${friend.image}` : '/images/default_hiker.jpg' } alt="Profile picture of hiker"/>
          <AvatarFallback>{ friend.firstName[0] }{ friend.lastName[0] }</AvatarFallback>
        </Avatar>
        <p className='font-light'>{ friend.firstName.concat(' '.concat(friend.lastName)) }</p>
      </div>
      <Button className='h-10' variant='destructive' onClick={ unfriend } disabled={ unfriended } >Unfriend</Button>
    </div>
  )
}
