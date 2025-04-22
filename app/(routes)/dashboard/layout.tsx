"use client"

import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SideBarDashboard from './_components/SideBar';
import { FilesListContext } from '@/app/_context/FilesListContext';
import { Team } from './_components/SideBarUpper';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  const [fileList_, setFileList_] = useState<any>([]);
  const [contextDisplayFileType, setContextDisplayFileType] = useState<string>('allFiles');
  const [Context_TotalFilesCount, setContext_TotalFiles] = useState<Number>();
  const [Context_activeTeam, setContext_ActiveTeam] = useState<Team>();

  const Context_UpdateFiles = async() => {
          setFileList_([]);
          const result = await convex.query(api.files.getFiles, { teamId : Context_activeTeam?._id || "" });
          setFileList_(result);
          setContext_TotalFiles(result?.length);
      }

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
        <FilesListContext.Provider value={{fileList_, setFileList_, contextDisplayFileType, setContextDisplayFileType, Context_TotalFilesCount, setContext_TotalFiles, Context_activeTeam, setContext_ActiveTeam, Context_UpdateFiles}}>
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