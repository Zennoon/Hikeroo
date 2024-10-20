'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, Smile } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import SkeletonHike from '@/components/u/hike_skeleton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { io } from 'socket.io-client';
import MyHikeDetails from '@/components/u/my_hike_details';
import HikeMember from '@/components/u/hike_member';
import SkeletonHikeMember from '@/components/u/hike_member_skeleton';
import SkeletonSendInvite from '@/components/u/send_invite_skeleton';
import SendHikeInvite from '@/components/u/send_invite';
import HikeMessage from '@/components/u/hike_message';
import SkeletonHikeMessage from '@/components/u/hike_message_skeleton';
import EmojiPicker from 'emoji-picker-react';

export default function MyHikePage({ params }) {
  const { id } = params;
  const [hike, setHike] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [tab, setTab] = useState('hikeDetails');
  const router = useRouter();
  const onTabChange = (value) => {
    setTab(value);
  }
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        setUserId(session.user.id);
        setUserToken(session.user.token);
        if (!hike) {
          fetch(`http://localhost:5000/hikes/${id}`, {
            headers: {
              'X-Hikeroo-Token': session.user.token,
            },
            credentials: 'include',
          }).then((res) => {
            if (res.ok) {
              res.json().then((content) => {
                setHike(content);
                setMessages(content.messages);
                setSocket(io('http://localhost:5000'));
              });
            }
          });
        }
      }
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('join room', id);
      socket.on('chat message', ({ room, sender, text }) => {
        setMessages((prevMessages) => [...prevMessages, { sender, text }]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('chat message', {
        room: id,
        message,
        senderId: userId,
      });
      setMessage('');
    }
  };

  const onEmojiClick = (emojiObject, e) => {
    console.log(emojiObject, e);
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  }

  const hikeMembersSkeletons = new Array(8).fill(null).map((_, index) => <SkeletonHikeMember key={ index }/>);

  return (
    <Tabs value={ tab } onValueChange={onTabChange} className='w-full'>
      <TabsList className='grid w-full grid-cols-4'>
        <TabsTrigger value='hikeDetails'>Details</TabsTrigger>
        <TabsTrigger value='hikeMembers'>Members</TabsTrigger>
        <TabsTrigger value='hikeInvite'>Invite</TabsTrigger>
        <TabsTrigger value='hikeChat'>Chat</TabsTrigger>
      </TabsList>
      <TabsContent value='hikeDetails'>
        <div className='h-full'>
          { !hike && <SkeletonHike/> }
          { hike && <MyHikeDetails hike={ hike }/> }
        </div>
      </TabsContent>
      <TabsContent value='hikeMembers'>
        <div className='mt-10 space-y-3'>
          { hike ? hike.hikers.map((hiker, index) =>  <HikeMember key={ index } hiker={ hiker } userId={userId} />) : hikeMembersSkeletons }
        </div>
      </TabsContent>
      <TabsContent value='hikeInvite'>
        <div className='h-full'>
          { !hike && <SkeletonSendInvite/> }
          { hike && <SendHikeInvite token={ userToken } hikeId={ id }/> }
        </div>
      </TabsContent>
      <TabsContent value='hikeChat'>
        <Card>
          <CardHeader>
            <CardTitle>Hike chat</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col space-y-2 w-full'>
            <div className='p-2 border rounded-lg self-center flex flex-col w-full lg:w-1/2'>
              <ScrollArea className='p-2 h-72 w-full self-center'>
                <div className='flex flex-col gap-y-2 px-2 bg-white'>
                  { messages ? messages.map((message, index) => <HikeMessage className='m-3' key={ index } message={ message } userId={ userId } />) : new Array(8).fill(null).map((_, index) => <SkeletonHikeMessage key={ index } index={ index }/>) }
                </div>
              </ScrollArea>
              <div className="flex w-full max-w-sm items-center self-center space-x-2">
                <div className='flex border p-1.5 space-x-1 rounded-md'>
                  <Popover>
                    <PopoverTrigger>
                      <Smile className='text-gray-200 hover:text-gray-300'/>
                    </PopoverTrigger>
                    <PopoverContent className='p-0 shadow-none w-full'>
                      <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle='twitter' className='self-center'/>
                    </PopoverContent>
                  </Popover>
                  <Input className='px-2 w-full focus:border-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-green-500 focus:outline-none focus:ring-0' type="text" placeholder="Type a message" value={ message } onChange={(e) => {setMessage(e.target.value)}}/>
                </div>
                <Button className='bg-green-600 text-white hover:bg-green-400 h-12 w-12 py-0 rounded-full' onClick={sendMessage} disabled={ !message }>
                  <ArrowUp className='h-20'/>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
