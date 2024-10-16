'use client';

import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

import React from 'react'

export default function LeaveButton({ id }) {
  const [left, setLeft] = useState(false);
  const router = useRouter();
  const leaveHike = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/my_hikes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Hikeroo-Token': session.user.token,
        },
        credentials: 'include',
        body: JSON.stringify({ hikeId: id }),
      }).then((res) => {
        if (res.ok) {
          setLeft(true);
        }
      })
    })
  }

  useEffect(() => {
    if (left) {
      router.push('/u/my_hikes');
    }
  }, [left]);
  return (
    <Button className='h-10 self-center' variant='destructive' onClick={leaveHike} disabled={left}>Leave</Button>
  )
}

