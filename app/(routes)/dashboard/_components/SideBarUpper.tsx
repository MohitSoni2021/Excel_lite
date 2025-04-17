import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Link from 'next/link'


export interface Team {
  _id: string;
  teamName: string;
  createdBy: string;
}
const SideBarUpperDashboard = ({ user, setActiveTeamInfo }: any) => {

  const menu = [
    {
      id: 1,
      name: "Create Team",
      icon: Users,
      path: "/teams/create",
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings
    }
  ]

  const convex = useConvex();
  const [teamList, setTeamList] = useState<Team[]>();
  const [activeTeam, setActiveTeam] = useState<Team>();

  const getTeamList = async () => {
    const results = await convex.query(api.teams.getTeam, { email: user?.email });
    console.log('Team List', results);
    setTeamList(results);
    setActiveTeam(results[0]);
  }

  useEffect(() => {
    user && getTeamList();
  }, [user])

  useEffect(()=>{
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam])

  return (
    <>

      <div className="">
        <Popover>
          <PopoverTrigger className='w-full'>
            <div className="p-3 hover:bg-gray-200 rounded-md cursor-pointer">
              <h2 className='flex gap-2 items-center justify-between font-bold'>
                {activeTeam?.teamName} <ChevronDown />
              </h2>
            </div>
          </PopoverTrigger>

          <PopoverContent className='ml-6 p-4'>
            <div className="">
              {/* Contains all the Created Team Names */}
              <div className="flex flex-col gap-2">
                {
                  teamList?.map((team) => (
                    <h2 key={team._id}
                      onClick={() => setActiveTeam(team)}
                      className={`flex gap-2 items-center hover:bg-blue-500 hover:text-white p-2 rounded-md cursor-pointer font-semibold
                  ${activeTeam?._id === team._id ? 'bg-blue-500 text-white' : ''}
                  `}>
                      <span className=''>{team.teamName}</span>
                    </h2>
                  ))
                }
              </div>
              <Separator className='mt-2 ' />
              {/* Contains all the Menu Options */}
              <div className="flex flex-col gap-2  mt-4">
                {
                  menu.map((item) => (
                    <Link href={item.path} key={item.id}>
                      <div key={item.id} className="flex gap-2 items-center text-xs">
                        <item.icon className="w-5 h-5 text-gray-700" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))
                }

                <LogoutLink>
                  <div className="flex gap-2 items-center text-xs">
                    <LogOut className="w-5 h-5 text-gray-700" />
                    <span>Logout</span>
                  </div>
                </LogoutLink>

                <Separator className='mt-2 ' />
                {/* user information section  */}
                {
                  user && (
                    <div className="flex gap-3 ">
                      <Image className='rounded-full aspect-square' src={user?.picture} width={30} height={30} alt='user profile image' />
                      <div className="">
                        <h2 className="text-xs font-bold">{user?.given_name} {user?.family_name}</h2>
                        <h2 className="text-xs text-gray-700">{user?.email}</h2>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Files section */}
      <Button variant={'outline'} className='w-full justify-start bg-gray-100' >
        <LayoutGrid /> All Files
      </Button>

    </>
  )
}

export default SideBarUpperDashboard