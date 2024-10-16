import { Skeleton } from '../ui/skeleton';

export default function SkeletonFRequest() {
  return (
    <div className='bg-white shadow-lg flex justify-between px-3 py-2 items-center rounded-md'>
      <div className='flex gap-x-2 items-center'>
        <Skeleton className='rounded-full h-14 w-14'/>
        <Skeleton className='h-6 w-[150px]'/>
      </div>
      <div className='flex items-center gap-x-2'>
        <Skeleton className='h-10 w-[100px]'/>
        <Skeleton className='h-10 w-[100px]'/>
      </div>
    </div>
  )
}
