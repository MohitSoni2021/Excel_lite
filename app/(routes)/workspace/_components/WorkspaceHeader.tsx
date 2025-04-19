import { Button } from '@/components/ui/button';
import { Link as LinkIcon, Pyramid, Save } from 'lucide-react';
import React from 'react'
import Link from 'next/link';

const WorkspaceHeader = ({onSave, fileName}:any ) => {
  return (
    <div className="flex justify-between p-4 border-b-2 items-center ">
      <div className="flex gap-2 items-center"> 
        <Pyramid />
        <h2 className='text-xl font-semibold'>{fileName}</h2>
      </div>
      <div className="sharebtn flex gap-2">
        <Button 
        className='cursor-pointer bg-blue-500' onClick={()=>onSave()}> 
          <Save /> 
        </Button>
        <Link href={`/dashboard`}><Button className='cursor-pointer' >Dashboard</Button></Link>
      </div>
    </div>
  )
}

export default WorkspaceHeader;