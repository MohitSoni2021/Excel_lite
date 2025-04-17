import { ChevronDown } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import SideBarUpperDashboard, { Team } from './SideBarUpper'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideBarBottomDashboard from './SideBarBottom'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { FilesListContext } from '@/app/_context/FilesListContext'


const SideBarDashboard = () => {

    const { user }:any = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile);
    const [activeTeam, setActiveTeam] = useState<Team>();
    const convex = useConvex();
    const [totalFiles, setTotalFiles] = useState<Number>();

    const { fileList_, setFileList_ }:any = useContext(FilesListContext);

    const CreateNewFile = async(FileName:string) => {
        createFile({
            fileName: FileName,
            createdBy: user?.email,
            teamId: activeTeam?._id,
            archived: false,
            document: '',
            whiteboard: '',
        }).then((res)=>{
            if(res){
                getFile();
                toast("File Created Successfully");
            }
        }, (err)=>{
            toast.error("File Creation Failed");
        })
    }

    const getFile = async() => {
        const result = await convex.query(api.files.getFiles, { teamId : activeTeam?._id });
        setFileList_(result);
        setTotalFiles(result?.length);
    }


    useEffect(()=>{
        activeTeam&&getFile();
    }, [activeTeam])

  return (
    <div 
    className=' h-screen flex flex-col fixed w-72 border-r-2 p-6'
    >
        <div className="flex-1">
            <SideBarUpperDashboard 
            user={user}
            setActiveTeamInfo={(activeTeam:Team)=>setActiveTeam(activeTeam)}
            />
        </div>
        <div className="">
            <SideBarBottomDashboard 
            onFileCreate={CreateNewFile}
            totalFiles={totalFiles} 
            />
        </div>
    </div>
  )
}

export default SideBarDashboard