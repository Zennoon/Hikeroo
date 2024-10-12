"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().min(1, 'This field has to be filled').email('This is not a valid email'),
  password: z.string().min(8, 'Your password must be atleast 8 characters long'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'This field has to be filled'),
  lastName: z.string().min(1, 'This field has to be filled'),
  image: z.any().optional(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match',
      path: ['confirmPassword'],
    });
  }
});

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword :'',
      firstName: '',
      lastName: '',
      image: '',
    }
  });

  async function onSubmit(values) {
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
    console.log(formData.values());
    fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      body: formData,
    }).then(async (res) => {
      console.log(await res.json());
    });
  }

  return (
    <main>
      <div>
        <Form {...form} className='form signup-form'>
          <form onSubmit={ form.handleSubmit(onSubmit) } className='space-y-8' encType='multipart/form-data'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='email' {...field}/>
                  </FormControl>
                  <FormDescription>
                    This is your email.
                  </FormDescription>
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
                    <Input type='password' placeholder='password' {...field}/>
                  </FormControl>
                  <FormDescription>
                    This is your password.
                  </FormDescription>
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
                    <Input placeholder='Confirm Password' type='password' {...field}/>
                  </FormControl>
                  <FormDescription>
                    This is your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='firstname' {...field}/>
                  </FormControl>
                  <FormDescription>
                    This is your firstname.
                  </FormDescription>
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
                    <Input placeholder='lastname' {...field}/>
                  </FormControl>
                  <FormDescription>
                    This is your last name.
                  </FormDescription>
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
                  <FormDescription>
                    This is your profile picture.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
