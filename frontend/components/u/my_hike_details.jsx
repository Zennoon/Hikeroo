import React from 'react';
import { format } from 'date-fns';
import LeaveButton from './leave_button';

export default function MyHikeDetails({ hike }) {
  return (
    <div className="flex flex-col gap-y-5 h-full p-8">
      <div className='bg-white p-10 flex justify-between items-center rounded-xl flex-wrap gap-y-5'>
        <img className="h-64 w-64 rounded-full" src={ hike.image ? `http://localhost:5000/hike_images/${hike.image}` : '/images/default_hike.avif' } alt='An image representing the hike'/>
        <div className='flex flex-col gap-y-5 items-start'>
          <h1 className='text-3xl'>{ hike.title }</h1>
          <p className='font-light'>{ hike.description }</p>
          <p className='rounded-3xl p-3 border border-green-300'>{ hike.country.concat(', '.concat(hike.city)) }</p>
        </div>
      </div>
      <div className='flex justify-between flex-wrap gap-y-3'>
        <div className='flex flex-col p-5 bg-white rounded-xl'>
          <p className='font-light'>Members</p>
          <h2 className='text-3xl'>{ hike.hikers.length }</h2>
        </div>
        <div className='flex flex-col p-5 bg-white rounded-xl'>
          <p className='font-light'>Starts</p>
          <h2 className='text-3xl'>{ format(new Date(hike.startDate), "PPP") }</h2>
        </div>
        <div className='flex flex-col p-5 bg-white rounded-xl'>
          <p className='font-light'>Duration</p>
          <h2 className='text-3xl'>{ hike.duration }{' '.concat('days')}</h2>
        </div>
      </div>
      <LeaveButton id={ hike.id }/>
    </div>
  )
}
