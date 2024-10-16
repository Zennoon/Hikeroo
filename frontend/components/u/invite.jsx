'use client'
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Invite({ token, invite }) {
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  const acceptInvite = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/accept_invite', {
        method: 'POST',
        headers: {
          'X-Hikeroo-Token': session.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hikeId: invite.hike.id }),
      }).then((res) => {
        if (res.ok) {
          setAccepted(true);
        }
      });
    });
  }

  const declineInvite = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/invites', {
        method: 'DELETE',
        headers: {
          'X-Hikeroo-Token': session.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hikeId: invite.hike.id,
          hikerId: invite.sender.id
        }),
      }).then((res) => {
        if (res.ok) {
          setDeclined(true);
        }
      });
    });
  }

  return (
    <div className='bg-white border-1 flex justify-between px-5 py-3 items-center rounded-md'>
      <div className='flex gap-x-1 items-center'>
        <Avatar className='h-20 w-20'>
          <AvatarImage src={ invite.hike.image ? `http://localhost:5000/hike_images/${fRequest.image}` : '/images/default_hiker.jpg' } alt="Profile picture of hike"/>
          <AvatarFallback>{ invite.hike.title[0] }</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-y-1'>
          <p className='font-light'>{ invite.hike.title }</p>
          <p className='font-light'>Sent by:{ ' '.concat(invite.sender.firstName.concat(' '.concat(invite.sender.lastName))) }</p>
        </div>
      </div>
      <Button asChild>
        <Link href={`/u/inv_hikes/${invite.hike.id}`}>View</Link>
      </Button>
      <div className='flex items-center gap-x-2'>
        <Button className='h-10 bg-green-500 hover:bg-green-600' onClick={ acceptInvite } disabled={ accepted || declined } >Accept</Button>
        <Button className='h-10' variant='destructive' onClick={ declineInvite } disabled={ accepted || declined } >Decline</Button>
      </div>
    </div>
  )
}
