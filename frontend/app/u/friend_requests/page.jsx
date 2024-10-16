'use client'

import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FriendRequest from '@/components/u/friend_request';
import SkeletonFRequest from '@/components/u/friend_request_skeleton';

export default function FriendRequestsPage() {
  let userToken;
  const [friendRequests, setFriendRequests] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        userToken = session.user.token;
        fetch('http://localhost:5000/friend_requests', {
          headers: {
            'X-Hikeroo-Token': userToken,
          },
          credentials: 'include',
        }).then((res) => {
          if (res.ok) {
            res.json().then((content) => {
              setFriendRequests(content);
            });
          }
        });
      }
    });
  }, []);

  return (
    <div className='px-5 py-3 gap-y-10 flex flex-col'>
      <h1 className='text-lg font-semibold'>Friend Requests</h1>
      <div className='flex flex-col gap-y-3'>{ friendRequests ? friendRequests.map((friendRequest, index) => <FriendRequest token={ userToken } fRequest={ friendRequest } key={ index }/>) : new Array(10).fill(null).map((_, index) => <SkeletonFRequest key={ index }/>) }</div>
    </div>
  )
}
