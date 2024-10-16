import { Skeleton } from '../ui/skeleton'
 
export default function SkeletonSendInvite() {
  return (
    <div className="flex flex-col gap-y-5 h-full p-8">
      <Skeleton className="h-10 w-[250px]" />
    </div>
  )
}