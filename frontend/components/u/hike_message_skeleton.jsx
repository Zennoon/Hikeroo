import { Skeleton } from "../ui/skeleton"

export default function SkeletonHikeMessage({ index }) {
  return (
    <Skeleton className={ `rounded-xl w-[300px] h-20 ${index % 3 === 0 ? 'self-end' : 'self-start'}` }/>
  )
}
  
