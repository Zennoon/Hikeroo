'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SkeletonHikes from '@/components/u/hikes_skeleton';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import HikesCard from '@/components/u/hikes_card';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [page, setPage] = useState(0);
  const [hikes, setHikes] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState({
    country: '',
    city: '',
    after: undefined,
    before: undefined,
    durationLessThan: '',
    durationGreaterThan: '',
  });
  const [onSubmit, setOnSubmit] = useState(() => () => {});

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
      fetch(`http://localhost:5000/get_hikes?page=${page}`, {
        method: 'POST',
        headers: {
          'X-Hikeroo-Token': session.user.token,
	  'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter),
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          res.json().then((hikesJson) => {
            setHikes(hikesJson.map((hike) => <HikesCard hike={ hike } key={ hike.id }/>));
          });
        }
      });
    }
  }, [session, page, reload]);

  useEffect(() => {
    if (session) {
      setOnSubmit(() => (e, reload) => {
        e.preventDefault();
        setPage(0);
        setHikes(null);
        setReload(!reload);
      });
    }
  }, [session]);

  const skeletons = new Array(6).fill(null).map((_, index) => <SkeletonHikes key={ index }/>);

  return (
    <div className='px-5 py-3 space-y-10 flex flex-col'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Available Hikes</h1>
        <Button asChild className='bg-green-600 hover:bg-green-500'>
          <Link href='/u/home/new'>Create new</Link>
        </Button>
      </div>
      <Button className={`self-end ${showFilter ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`} onClick={() => setShowFilter((prevVal) => !prevVal)}><SlidersHorizontal/></Button>
      { showFilter && <form onSubmit={(e) => {onSubmit(e, reload)}} className="flex flex-col gap-y-3 items-center">
        <div className='flex flex-wrap items-center gap-x-4 gap-y-3'>
          <div className='flex items-center gap-x-1'>
            <h2>Location</h2>
            <div className="flex flex-col gap-y-2">
              <input
                id="country"
                name="country"
                type="text"
                value={filter.country}
                placeholder='Country'
                autoComplete="country"
                onChange={(e) => {setFilter((prevFilter) => {
                  return { ...prevFilter, country: e.target.value };
                })}}
                className="px-2 outline-none block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              <input
                id="city"
                name="city"
                type="text"
                value={filter.city}
                placeholder='City'
                autoComplete="city"
                onChange={(e) => {setFilter((prevFilter) => {
                  return { ...prevFilter, city: e.target.value };
                })}}
                className="px-2 outline-none block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className='flex items-center gap-x-1'>
            <h2>Date</h2>
            <div className='flex flex-col gap-y-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !filter.before && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filter.before ? format(filter.before, "PPP") : <span>Starts before...</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filter.before}
                    onSelect={(date) => setFilter((prevFilter) => {
                      return { ...prevFilter, before: date }
                    })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !filter.after && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filter.after ? format(filter.after, "PPP") : <span>Starts after...</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filter.after}
                    onSelect={(date) => setFilter((prevFilter) => {
                      return { ...prevFilter, after: date }
                    })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className='flex items-center gap-x-1'>
            <h2>Duration</h2>
            <div className="flex flex-col gap-y-2">
              <input
                id="durationGreaterThan"
                name="durationGreaterThan"
                type="number"
                value={filter.durationGreaterThan}
                placeholder='Minimum number of days'
                autoComplete="durationGreaterThan"
                onChange={(e) => {setFilter((prevFilter) => {
                  return { ...prevFilter, durationGreaterThan: e.target.value }
                })}}
                className="px-2 outline-none block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              <input
                id="durationLessThan"
                name="durationLessThan"
                type="number"
                value={filter.durationLessThan}
                placeholder='Maximum number of days'
                autoComplete="durationLessThan"
                onChange={(e) => {setFilter((prevFilter) => {
                  return { ...prevFilter, durationLessThan: e.target.value }
                })}}
                className="px-2 outline-none block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Filter
          </button>
        </div>
      </form>}
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
