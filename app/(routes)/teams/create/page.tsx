"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const CreateTeam = () => {

    const [teamName, setTeamName] = useState('');
    const createTeam = useMutation(api.teams.createTeam);
    const { user }:any = useKindeBrowserClient();
    const router = useRouter();

    const createNewTeam = async () => {
        createTeam({
            teamName,
            createdBy : user?.email,
        })
        .then((res)=>{
            console.log('Team Created', res);
            if(res){
                router.push('/dashboard'); 
                toast("team created successfully");
            }
        })
    }

  return (
    <>
        <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
  <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-prose text-center flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        What Should We Call Your Team ?
        
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
        You can always change it later.
      </p>

      <div className="mt-4 flex justify-center gap-6 sm:mt-6 flex-col">
        <label htmlFor="Email" className='flex flex-col gap-1'>
        <span className="text-sm font-medium text-gray-700 w-full dark:text-gray-200 text-start"> Team Name </span>

        <Input 
        placeholder='Enter your Team Name' 
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
         />
        </label>
        <Button 
        disabled={!(teamName && teamName?.length > 0 ) }
        className='w-fit cursor-pointer'
        onClick={createNewTeam}>
            Create Team
        </Button>
      </div>


    </div>
  </div>
</section>
    </>
  )
}

export default CreateTeam