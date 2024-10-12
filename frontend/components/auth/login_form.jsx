'use client'

import CardWrapper from './card_wrapper';
import LoginSchema from '@/schema/login_schema';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AlertDestructive from './destructive_alert';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    const res = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });
    const content = await res.json();
  
    if (content.error) {
      setError(content.error);
    } else {
      router.push('/home');
    }
  }

  return (
    <CardWrapper
    title='Login to your account'
    backButtonHref='/auth/register'
    backButtonLabel="Don't have an account? Register Here."
    >
      <Form {...form}>
        <form onSubmit={ form.handleSubmit(onSubmit) } className='space-y-2'>
          <div className="space-y-2">
            { error && <AlertDestructive description={ error }/> }
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
          </div>
          <Button type='submit' className='w-full'>Login</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm;
