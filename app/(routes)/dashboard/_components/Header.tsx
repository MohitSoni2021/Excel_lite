import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search, Send } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

const Header = () => {

    const {user}:any = useKindeBrowserClient();

  return (
    <div className="flex justify-end items-center gap-2 ">
        <div className="searchbar w-fit border-2 border-gray-600 rounded-lg items-center p-2 flex gap-2">
            <Search />
            <input type="text" name="" placeholder='Search' className='border-none outline-none ' id="" />
        </div>
        <div className="">
            <div className="flex gap-2 items-center">
                {
                    user?.picture && <Image src={user?.picture} alt="user" width={30} height={30} className='rounded-full' />
                }
            </div>
        </div>
        <Button className='p-2 cursor-pointer'><Send /> Invite</Button>
    </div>
  )
}

export default Header