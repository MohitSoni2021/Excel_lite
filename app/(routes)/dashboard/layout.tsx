"use client"

import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SideBarDashboard from './_components/SideBar';
import { FilesListContext } from '@/app/_context/FilesListContext';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  const [fileList_, setFileList_] = useState<any>([]);

  useEffect(() => {
    user && checkTeam();
  }, [user])

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, { email: user?.email });

    if (!result?.length) {
      router.push('/teams/create');
    }
  }

  return (
    <>
      <div className="">
        <FilesListContext.Provider value={{fileList_, setFileList_}}>
          <div className="grid grid-cols-4">
            <div className="h-screen fixed w-72 ">
              <SideBarDashboard />
            </div>
            <div className="col-span-4 ml-72">
              {children}
            </div>
          </div>
        </FilesListContext.Provider>
      </div>
    </>
  )
}

export default DashboardLayout