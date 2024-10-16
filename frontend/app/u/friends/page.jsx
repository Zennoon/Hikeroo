'use client'
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Friend from '@/components/u/friend';
import SkeletonFriend from '@/components/u/friend_skeleton';

export default function FriendsPage() {
  let userToken;
  const [friends, setFriends] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        userToken = session.user.token;
        fetch('http://localhost:5000/friends', {
          headers: {
            'X-Hikeroo-Token': userToken,
          },
          credentials: 'include',
        }).then((res) => {
          if (res.ok) {
            res.json().then((content) => {
              setFriends(content);
            });
          }
        });
      }
    });
  }, []);

  return (
    <div className='px-5 py-3 gap-y-10 flex flex-col'>
      <h1 className='text-lg font-semibold'>Friends</h1>
      <div className='flex flex-col gap-y-3'>{ friends ? friends.map((friend, index) => <Friend token={ userToken } friend={ friend } key={ index }/>) : new Array(10).fill(null).map((_, index) => <SkeletonFriend key={ index }/>) }</div>
    </div>
  )
}
