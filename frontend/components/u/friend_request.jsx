'use client'
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '../ui/button';

export default function FriendRequest({ token, fRequest }) {
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  const acceptFriendRequest = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/friends', {
        method: 'POST',
        headers: {
          'X-Hikeroo-Token': session.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hikerId: fRequest.id }),
      }).then((res) => {
        if (res.ok) {
          setAccepted(true);
        }
      });
    });
  }

  const declineFriendRequest = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/friend_requests', {
        method: 'DELETE',
        headers: {
          'X-Hikeroo-Token': session.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hikerId: fRequest.id }),
      }).then((res) => {
        if (res.ok) {
          setDeclined(true);
        }
      });
    });
  }

  return (
    <div className='bg-white border-1 flex justify-between px-8 py-5 items-center rounded-md'>
      <div className='flex gap-x-3 items-center'>
        <Avatar className='h-14 w-14'>
          <AvatarImage src={ fRequest.image ? `http://localhost:5000/profile_pics/${fRequest.image}` : '/images/default_hiker.jpg' } alt="Profile picture of hiker"/>
          <AvatarFallback>{ fRequest.firstName[0] }{ fRequest.lastName[0] }</AvatarFallback>
        </Avatar>
        <p className='font-light'>{ fRequest.firstName.concat(' '.concat(fRequest.lastName)) }</p>
      </div>
      <div className='flex items-center gap-x-2'>
        <Button className='h-10 bg-green-500 hover:bg-green-600' onClick={ acceptFriendRequest } disabled={ accepted || declined } >Accept</Button>
        <Button className='h-10' variant='destructive' onClick={ declineFriendRequest } disabled={ accepted || declined } >Decline</Button>
      </div>
    </div>
  )
}
