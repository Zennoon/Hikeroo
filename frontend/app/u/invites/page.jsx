'use client'

import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Invite from '@/components/u/invite';
import SkeletonInvite from '@/components/u/invite_skeleton';

export default function InvitesPage() {
  let userToken;
  const [invites, setInvites] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        userToken = session.user.token;
        fetch('http://localhost:5000/invites', {
          headers: {
            'X-Hikeroo-Token': userToken,
          },
          credentials: 'include',
        }).then((res) => {
          if (res.ok) {
            res.json().then((content) => {
              setInvites(content);
            });
          }
        });
      }
    });
  }, []);

  return (
    <div className='px-5 py-3 gap-y-10 flex flex-col'>
      <h1 className='text-lg font-semibold'>Invitations</h1>
      <div className='flex flex-col gap-y-3'>{ invites ? invites.map((invite, index) => <Invite token={ userToken } invite={ invite } key={ index }/>) : new Array(10).fill(null).map((_, index) => <SkeletonInvite key={ index }/>) }</div>
    </div>
  )
}
