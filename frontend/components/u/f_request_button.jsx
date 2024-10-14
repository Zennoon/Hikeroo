'use client';

import { Button } from '../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

import React from 'react'

export default function FriendRequestButton({ id }) {
  const [sent, setSent] = useState(false);
  const sendFriendRequest = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/friend_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hikeroo-Token': session.user.token,
        },
        credentials: 'include',
        body: JSON.stringify({ hikerId: id }),
      }).then((res) => {
        if (res.ok) {
          setSent(true);
        }
      })
    })
  }
  return (
    <Button className='h-10 self-center bg-green-500 hover:bg-green-600' onClick={sendFriendRequest} disabled={sent}>Send Friend Request</Button>
  )
}

