'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import SkeletonHikes from '@/components/u/hikes_skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HikesCard from '@/components/u/hikes_card';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [page, setPage] = useState(0);
  const [hikes, setHikes] = useState(null);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setSession(session);
      } else {
        router.push('/auth/login');
      }
    })
  }, []);

  useEffect(() => {
    if (session) {
      fetch(`http://localhost:5000/hikes?page=${page}`, {
        headers: {
          'X-Hikeroo-Token': session.user.token,
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
  }, [session, page]);

  const skeletons = new Array(6).fill(null).map((_, index) => <SkeletonHikes key={ index }/>);

  return (
    <div className='px-5 py-3 space-y-10 flex flex-col'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Available Hikes</h1>
        <Button asChild className='bg-green-600 hover:bg-green-500'>
          <Link href='/u/home/new'>Create new</Link>
        </Button>
      </div>
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
