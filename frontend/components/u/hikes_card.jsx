import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function HikesCard({ hike }) {
  return (
    <div className="flex flex-col space-y-6 items-center shadow-md max-w-[400px] bg-white py-8 px-10 rounded-xl flex-grow" id={hike.id}>
      <img src='https://img.freepik.com/free-vector/hand-drawn-flat-design-mountain-landscape_23-2149158786.jpg?ga=GA1.1.451933470.1691582912&semt=ais_hybrid' alt="An image representing the hike" className='h-40 w-40 rounded-full'/>
      <div className="space-y-2 flex flex-col items-center">
        <h1 className='text-semibold'>{ hike.title }</h1>
        <div className="flex flex-col gap-y-2 items-center w-full text-muted-foreground">
          <p><span>Start date</span>:{' '.concat((new Date(hike.startDate)).toDateString())}</p>
          <p><span>Duration</span>:{' '.concat(hike.duration)} Days</p>
        </div>
      </div>
      <Link href={`/u/hikes/${hike.id}`}>
        <Button className='flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'>View</Button>
      </Link>
    </div>
  )
}
