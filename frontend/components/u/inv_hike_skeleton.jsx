import { Skeleton } from '../ui/skeleton'
 
export default function SkeletonHike() {
  return (
    <div className="flex flex-col gap-y-5 h-full p-8">
      <div className='bg-white p-10 flex justify-between items-center flex-wrap gap-y-4 rounded-xl'>
        <Skeleton className="h-64 w-64 rounded-full" />
        <div className='flex flex-col gap-y-5 items-start'>
          <Skeleton className='h-10 w-[200px]'/>
          <div className='flex flex-col gap-y-2'>
            <Skeleton className='h-6 w-[250px]'/>
            <Skeleton className='h-6 w-[250px]'/>
            <Skeleton className='h-6 w-[250px]'/>
          </div>
        </div>
      </div>
      <div className='flex justify-between bg-white p-3 flex-wrap gap-y-5'>
        <Skeleton className='h-10 w-[200px]'/>
        <Skeleton className='h-10 w-[200px]'/>
        <Skeleton className='h-10 w-[200px]'/>
      </div>
    </div>
  )
}