'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import SkeletonHikes from '@/components/u/hikes_skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HikesCard from '@/components/u/hikes_card';

export default function HomePage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [hikes, setHikes] = useState(null);


  function getHikes(session, pageNum) {
    fetch(`http://localhost:5000/hikes?page=${pageNum}`, {
      headers: {
        'X-Hikeroo-Token': session.user.token,
        'Cookie': `Hikeroo-Token=MyToken`,
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        res.json().then((hikesJson) => {
          setHikes(hikesJson.map((hike) => <HikesCard hike={ hike } key={ hike.id }/>));
        });
      }
    }); 
  }

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        getHikes(session, page);
      } else {
        router.push('/auth/login');
      }
    })
  }, [page]);

  const skeletons = new Array(10).fill(null).map((_, index) => <SkeletonHikes key={ index }/>);

  return (
    <div className='px-5 py-3 space-y-10 flex flex-col'>
      <h1 className='text-lg font-semibold'>Available Hikes</h1>
      <div className='flex flex-wrap gap-x-10 gap-y-10 justify-evenly'>
        { hikes ? hikes : skeletons }
      </div>
      <div className='self-center flex gap-x-6 items-center'>
        <Button onClick={() => {setPage(page - 1); setHikes(null);}} disabled={(!hikes) || (page <= 0)}><ChevronLeft className='inline'/>{' Previous'}</Button>
        <span className='font-semibold'>{ page + 1 }</span>
        <Button variant='outline' onClick={() => {setPage(page + 1); setHikes(null);}} disabled={(!hikes || (hikes.length < 20))}>{'Next '}<ChevronRight className='inline'/></Button>
      </div>
    </div>
  )
}
