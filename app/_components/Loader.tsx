import React from 'react'
import { HashLoader } from 'react-spinners';

const HashLoaderComp = ({message, style}:any) => {
  return (
    <div className={`w-full h-screen flex justify-center items-center ${style}`}>
        <div className="flex flex-col items-center">
            <HashLoader />
            <p className="text-lg font-semibold text-gray-800 mt-4 animate-pulse">{message}</p>
        </div>
    </div>
  )
}

export default HashLoaderComp