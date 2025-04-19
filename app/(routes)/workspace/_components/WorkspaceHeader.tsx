import { Button } from '@/components/ui/button';
import { Link, Save } from 'lucide-react';
import React from 'react'

const WorkspaceHeader = ({onSave, fileName}:any ) => {
  return (
    <div className="flex justify-between p-4 border-b-2 items-center ">
      <div className="">
        <h2 className='text-xl font-semibold'>{fileName}</h2>
      </div>
      <div className="sharebtn flex gap-2">
        <Button 
        className='cursor-pointer bg-blue-500' onClick={()=>onSave()}> 
          <Save /> Save
        </Button>
        <Button 
        className='cursor-pointer' > 
          <Link /> Share
        </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader;