'use client'
import { Textarea } from '@/components/ui/textarea';
import { Mountain } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react'

export default function NewHikePage() {
  const [date, setDate] = useState();
  const [data, setData] = useState({
    title: '',
    description: '',
    country: '',
    city: '',
    duration: '',
    image: '',
  });
  const router = useRouter();
  
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('json', JSON.stringify({
      title: data.title,
      description: data.description,
      country: data.country,
      city: data.city,
      startDate: date,
      duration: data.duration,
    }));

    if (data.image) {
      formData.append('image', image);
    }
    // I should create a state for the session that gets assigned inside useEffect
    getSession().then((userSession) => {
      fetch('http://localhost:5000/hikes', {
        method: 'POST',
        headers: {
          'X-Hikeroo-Token': userSession?.user.token,
        },
        credentials: 'include',
        body: formData,
      }).then((res) => {
        if (res.ok) {
          router.push('/u/home');
        }
      })
    });
  }

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      }
    })
  }, []);

  return (
    <div>
      <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Mountain
            className="mx-auto h-10 w-auto text-green-600"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Hike
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6" encType='multipart/form-data'>
            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={data.title}
                  placeholder='An adventure to Mt. Ras Dashen'
                  required
                  autoComplete="title"
                  onChange={(e) => {setData({ ...data, title: e.target.value })}}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <Textarea
                  id="description"
                  name="description"
                  type="text"
                  value={data.description}
                  required
                  placeholder='Join us for a trip to remember to one of the tallest mountains in Africa, and the tallest in Ethiopia!'
                  autoComplete="description"
                  onChange={(e) => {setData({ ...data, description: e.target.value })}}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={data.country}
                  required
                  placeholder='Ethiopia'
                  autoComplete="country"
                  onChange={(e) => {setData({ ...data, country: e.target.value })}}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={data.city}
                  required
                  placeholder='Gondar'
                  autoComplete="city"
                  onChange={(e) => {setData({ ...data, city: e.target.value })}}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
                Duration (in days)
              </label>
              <div className="mt-2">
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  value={data.duration}
                  required
                  placeholder='1'
                  autoComplete="duration"
                  onChange={(e) => {setData({ ...data, duration: e.target.value })}}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Descriptive image (Optional)
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  autoComplete="image"
                  onChange={(e) => {setData({ ...data, image: e.target.files[0] })}}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
    </div>
  )
}
