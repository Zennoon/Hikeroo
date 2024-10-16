import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function HikesCard({ hike }) {
  return (
    <div className="flex flex-col gap-y-6 items-center shadow-xl max-w-[400px] bg-white py-8 px-10 rounded-xl flex-grow" id={hike.id}>
      <img src={hike.image ? `http://localhost:5000/profile_pics/${hike.image}` : '/images/default_hike.avif'} alt="An image representing the hike" className='h-40 w-40 rounded-full'/>
      <div className="gap-y-5 flex flex-col items-center">
        <h1 className='text-semibold text-xl'>{ hike.title }</h1>
        <div className='rounded-3xl p-3 border border-green-300'>
          <p>{ hike.country.concat(', '.concat(hike.city)) }</p>
        </div>
        <div className="flex flex-col gap-y-2 items-center w-full text-muted-foreground mt-2">
          <p className='font-light'><span className='font-semibold text-black'>Start date</span>:{' '.concat((new Date(hike.startDate)).toDateString())}</p>
          <p className='font-light'><span className='font-semibold text-black'>Duration</span>:{' '.concat(hike.duration)} Days</p>
        </div>
      </div>
      <Button asChild className='flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'>
        <Link href={`/u/hikes/${hike.id}`}>View</Link>
      </Button>
    </div>
  )
}
