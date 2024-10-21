'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mountain } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    image: undefined,
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('json', JSON.stringify({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    }));
    if (data.image) {
      formData.append('image', data.image);
    }
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: formData,
    });
    router.push('/auth/login');
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Mountain
            className="mx-auto h-10 w-auto text-green-600"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={registerUser} className="space-y-6" encType='multipart/form-data'>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  required
                  autoComplete="email"
                  onChange={(e) => {setData({ ...data, email: e.target.value })}}
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={data.firstName}
                  required
                  autoComplete="firstName"
                  onChange={(e) => {setData({ ...data, firstName: e.target.value })}}
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={data.lastName}
                  required
                  autoComplete="lastName"
                  onChange={(e) => {setData({ ...data, lastName: e.target.value })}}
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  required
                  autoComplete="password"
                  onChange={(e) => {setData({ ...data, password: e.target.value })}}
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Profile picture (Optional)
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  autoComplete="image"
                  onChange={(e) => {setData({ ...data, image: e.target.files[0] })}}
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link href="/auth/login" className="font-semibold leading-6 text-green-600 hover:text-green-500">
              Login to your account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
