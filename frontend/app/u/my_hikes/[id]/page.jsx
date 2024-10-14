'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import SkeletonHike from '@/components/u/hike_skeleton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import HikeDetails from '@/components/u/hike_details';
import HikeMember from '@/components/u/hike_member';
import SkeletonHikeMember from '@/components/u/hike_member_skeleton';

export default function MyHikePage({ params }) {
  const { id } = params;
  const [hike, setHike] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tab, setTab] = useState('hikeDetails');
  const router = useRouter();
  const onTabChange = (value) => {
    setTab(value);
  }
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        setUserId(session.user.id);
        if (!hike) {
          fetch(`http://localhost:5000/hikes/${id}`, {
            headers: {
              'X-Hikeroo-Token': session.user.token,
            },
            credentials: 'include',
          }).then((res) => {
            if (res.ok) {
              res.json().then((content) => {
                console.log(content);
                setHike(content);
              });
            }
          });
        }
      }
    });
  }, []);
  const hikeMembersSkeletons = new Array(8).fill(null).map((_, index) => <SkeletonHikeMember key={ index }/>);

  return (
    <Tabs value={ tab } onValueChange={onTabChange} className='w-full'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='hikeDetails'>Details</TabsTrigger>
        <TabsTrigger value='hikeMembers'>Members</TabsTrigger>
        <TabsTrigger value='hikeChat'>Chat</TabsTrigger>
      </TabsList>
      <TabsContent value='hikeDetails'>
        <div className='h-full'>
          { !hike && <SkeletonHike/> }
          { hike && <HikeDetails hike={ hike }/> }
        </div>
      </TabsContent>
      <TabsContent value='hikeMembers'>
        <div className='mt-10 space-y-3'>
          { hike ? hike.hikers.map((hiker, index) => {
            console.log(hiker.id, userId);
            if (hiker.id !== userId) {
              return <HikeMember key={ index } hiker={ hiker }/>
            }
            return '';
          }) : hikeMembersSkeletons }
        </div>
      </TabsContent>
      <TabsContent value='hikeChat'>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='current'>Current password</Label>
              <Input id='current' type='password' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='new'>New password</Label>
              <Input id='new' type='password' />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
