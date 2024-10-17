'use client'

import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SkeletonSendInvite from './send_invite_skeleton';

export default function SendHikeInvite({ token, hikeId }) {
  const [open, setOpen] = useState(false);
  const [invited, setInvited] = useState(false);
  const [value, setValue] = useState('');
  const [friends, setFriends] = useState(null);

  const sendInvite = () => {
    getSession().then((session) => {
      fetch('http://localhost:5000/invites', {
        method: 'POST',
        headers: {
          'X-Hikeroo-Token': session.user.token,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          hikerId: value,
          hikeId,
        }),
      }).then((res) => {
        if (res.ok) {
          setInvited(true);
        }
      });
    });
  }

  useEffect(() => {
    fetch('http://localhost:5000/friends', {
      headers: {
        'X-Hikeroo-Token': token,
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        res.json().then(setFriends);
      }
    })
  }, []);

  return (
    <>
      { !friends ? <SkeletonSendInvite/> : <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[200px] justify-between'
            >
              {value
                ? (() => {
                  const selectedFriend = friends.find((friend) => friend.id === value);

                  if (selectedFriend) {
                    return selectedFriend.firstName.concat(' '.concat(selectedFriend.lastName));
                  }
                  return '';
                })()
                : 'Select friend...'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandInput placeholder='Search friend...' />
              <CommandList>
                <CommandEmpty>No friend found.</CommandEmpty>
                <CommandGroup>
                  {friends.map((friend) => (
                    <CommandItem
                      key={friend.id}
                      value={friend.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === friend.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      { friend.firstName.concat(' '.concat(friend.lastName)) }
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button className='h-10 self-center bg-green-500 hover:bg-green-600' onClick={sendInvite} disabled={ invited }>Send invite</Button>
      </div>
      }
    </>
  )
}
