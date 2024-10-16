'use client'
import SkeletonInvHike from '@/components/u/inv_hike_skeleton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import InvHikeDetails from '@/components/u/inv_hike_details';

export default function InvHikePage({ params }) {
  const { id } = params;
  const [hike, setHike] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        if (!hike) {
          fetch(`http://localhost:5000/hikes/${id}`, {
            headers: {
              'X-Hikeroo-Token': session.user.token,
            },
            credentials: 'include',
          }).then((res) => {
            if (res.ok) {
              res.json().then((content) => {
                setHike(content);
              });
            }
          });
        }
      }
    });
  }, []);

  return (
    <div className='h-full'>
      { !hike && <SkeletonInvHike/> }
      { hike && <InvHikeDetails hike={ hike }/> }
    </div>
  )
}
