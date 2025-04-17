"use client"

import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import EditorSetion from '../_components/Editor'
import { useParams } from 'next/navigation'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/_components/FileList'
import Canvas from '../_components/Canvas'
 
const Workspace = () => {
  const [triggerSave, setTriggerSave] = useState<boolean>(false); 
  const {fileId} = useParams();
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any >(); 

  const getFileData = async() => {
    const result = await convex.query(api.files.getFileById, { fileId:fileId });
    console.log('File Data', result);
    setFileData(result);
  }

  useEffect(()=>{
     fileId && getFileData();
  }, [fileId])

  return (
    <div className="">
        <WorkspaceHeader onSave={()=>setTriggerSave(!triggerSave)} /> 

        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-screen">
                <EditorSetion 
                onDocumentSave={triggerSave} 
                fileId = {fileId} 
                fileData={fileData} 
                />
            </div>
            <div className=" h-screen border-l-2">
                <Canvas
                 onDocumentSave={triggerSave} 
                 fileId = {fileId}
                 fileData = {fileData}
                 />
            </div>
        </div>
    </div>
  )
}

export default Workspace