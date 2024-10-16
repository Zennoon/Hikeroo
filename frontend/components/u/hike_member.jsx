import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import FriendRequestButton from './f_request_button';

export default function HikeMember({ hiker, userId }) {
  return (
    <div className='bg-white border-2 flex justify-between px-5 py-3 items-center rounded-md'>
      <div className='flex gap-x-1 items-center'>
        <Avatar className='h-20 w-20'>
          <AvatarImage src={ hiker.image ? `http://localhost:5000/profile_pics/${hiker.image}` : '/images/default_hiker.jpg' } alt="Profile picture of hiker"/>
          <AvatarFallback>{ hiker.firstName[0] }{ hiker.lastName[0] }</AvatarFallback>
        </Avatar>
        <p className='font-light'>{ hiker.firstName.concat(' '.concat(hiker.lastName)) }</p>
      </div>
      {(hiker.id !== userId) && <FriendRequestButton id={hiker.id}/>}
    </div>
  )
}
