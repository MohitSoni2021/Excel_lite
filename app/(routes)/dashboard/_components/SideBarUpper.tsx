import { ChevronDown, LayoutGrid, LogOut, Pyramid, Settings, Users } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
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
import SkeletonLoader from '@/app/_components/Loaders/SkeletonLoader'
import { MAX_FREE_TEAMS_CREATION_COUNT } from '@/app/_constants/UsagesCounts'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilesListContext } from '@/app/_context/FilesListContext'


export interface Team {
  _id: string;
  teamName: string;
  createdBy: string;
}
const SideBarUpperDashboard = ({ user, setActiveTeamInfo }: any) => {
  
  const convex = useConvex();
  const [teamList, setTeamList] = useState<Team[]>();
  const [activeTeam, setActiveTeam] = useState<Team>();
  const [teamListLength, setTeamListLength] = useState<number>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const team = searchParams.get('team');
  const { contextDisplayFileType, setContextDisplayFileType } = useContext(FilesListContext);
  const [selectedFiles, setSelectedFiles] = useState("allFiles");
  const [menu, setMenu] = useState<{ id: number; name: string; icon: any; path: string; disabled: boolean }[]>([
    {
      id: 1,
      name: "Create Team",
      icon: Users,
      path: ((teamListLength ?? 0) >= MAX_FREE_TEAMS_CREATION_COUNT) ? "/teams/create" : "plans",
      disabled: false
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
      disabled: false
    }
  ]);

  const getTeamList = async () => {
    const results = await convex.query(api.teams.getTeam, { email: user?.email });
    setTeamList(results);
    setTeamListLength(results?.length);
    
    // Handle team selection from URL or default to first team
    if (team) {
      const decodedTeamName = decodeURIComponent(team);
      const foundTeam = results?.find(teamItem => teamItem.teamName === decodedTeamName);
      setActiveTeam(foundTeam || results[0]);
    } else {
      setActiveTeam(results[0]);
    }
  }

  useEffect(() => {
    user && getTeamList();
  }, [user])

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
    if (activeTeam) {
      const encodedTeamName = encodeURIComponent(activeTeam.teamName);
      router.push(`/dashboard?team=${encodedTeamName}`);
    }
  }, [activeTeam])

  useEffect(() => {
    contextDisplayFileType && setContextDisplayFileType(contextDisplayFileType);
  }, [contextDisplayFileType])

  return (
    <>

      <div className="">
        <Popover>
          <PopoverTrigger className='w-full'>
            {
              activeTeam && <div className="p-3 hover:bg-gray-200 rounded-md cursor-pointer flex gap-2 items-center">
              <Pyramid />
                <h2 className='flex gap-2 items-center justify-between font-bold w-full'>
                  {activeTeam?.teamName} <ChevronDown />
                </h2>
              </div>
            }

            {
              !activeTeam && <SkeletonLoader className='w-full' height={30} />
            }
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
                      <button 
                      key={item.id}
                      disabled={item.disabled} 
                      className="flex gap-2 items-center text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        <item.icon className="w-5 h-5 text-gray-700" />
                        <span>{item.name}</span>
                      </button>
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
      <Button variant={'outline'} 
        onClick={() => setContextDisplayFileType('allFiles')} 
        className={`w-full justify-start ${(contextDisplayFileType == 'allFiles') ? "bg-gray-200" : ""}`} >
        <LayoutGrid /> All Files
      </Button>

    </>
  )
}

export default SideBarUpperDashboard