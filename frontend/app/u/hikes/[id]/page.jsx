'use client'
import SkeletonHike from '@/components/u/hike_skeleton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import HikeDetails from '@/components/u/hike_details';

export default function HikePage({ params }) {
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
      { !hike && <SkeletonHike/> }
      { hike && <HikeDetails hike={ hike }/> }
    </div>
  )
}
