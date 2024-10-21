import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import FriendRequestButton from './f_request_button';

export default function HikeMember({ hiker, userId }) {
  return (
    <div className='bg-white flex justify-between px-8 py-5 items-center shadow-md rounded-md'>
      <div className='flex gap-x-3 items-center'>
        <Avatar className='h-14 w-14'>
          <AvatarImage src={ hiker.image ? `http://localhost:5000/profile_pics/${hiker.image}` : '/images/default_hiker.jpg' } alt="Profile picture of hiker"/>
          <AvatarFallback>{ hiker.firstName[0] }{ hiker.lastName[0] }</AvatarFallback>
        </Avatar>
        <p className='font-light'>{ hiker.firstName.concat(' '.concat(hiker.lastName)) }</p>
      </div>
      {(hiker.id !== userId) && <FriendRequestButton id={hiker.id}/>}
    </div>
  )
}
