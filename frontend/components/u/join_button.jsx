'use client';

import { Button } from '../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

import React from 'react'

export default function JoinButton({ id }) {
  const [joined, setJoined] = useState(false);
  const joinHike = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/my_hikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hikeroo-Token': session.user.token,
        },
        credentials: 'include',
        body: JSON.stringify({ hikeId: id }),
      }).then((res) => {
        if (res.ok) {
          setJoined(true);
        }
      })
    })
  }
  return (
    <Button className='h-10 self-center bg-green-500 hover:bg-green-600' onClick={joinHike} disabled={joined}>Join</Button>
  )
}

