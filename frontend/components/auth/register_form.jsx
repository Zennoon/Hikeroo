'use client'

import CardWrapper from './card_wrapper';
import RegisterSchema from '@/schema/register_schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AlertDestructive from './destructive_alert';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword :'',
      firstName: '',
      lastName: '',
      image: '',
    },
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    const { email, password, firstName, lastName, image } = values;
  
    formData.append('json', JSON.stringify({
      email,
      password,
      firstName,
      lastName,
    }));
    if (image) {
      formData.append('image', image);
    }
    const res = await fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      body: formData,
    });
    const content = await res.json();
    if (content.error) {
      setError(content.Error);
    } else {
      router.push('/home');
    }
  }

  return (
    <CardWrapper
    title='Create an account'
    backButtonHref='/auth/login'
    backButtonLabel='Already have an account? Login here.'
    >
      <Form {...form}>
        <form onSubmit={ form.handleSubmit(onSubmit) } className='space-y-2' encType='multipart/form-data'>
          <div className="space-y-2">
            { error &&  <AlertDestructive description={ error } />}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='johndoe@gmail.com' type='email' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex space-x-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder='Doe' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder='********' type='password' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Profile picture</FormLabel>
                  <FormControl>
                    <Input type='file' accept='image/*' {...fieldProps} placeholder='Picture' onChange={(event) => onChange(event.target.files && event.target.files[0])}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full'>Register</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
