import { Skeleton } from '../ui/skeleton'
 
export default function SkeletonHikes() {
  return (
    <div className="flex flex-col space-y-3 items-center bg-white shadow-md py-5 px-3 rounded-xl">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
    </div>
  )
}