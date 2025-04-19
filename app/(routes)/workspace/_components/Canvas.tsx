import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import '@excalidraw/excalidraw/index.css';
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Fullscreen } from 'lucide-react';



const UIOptions = {
  };

  const TopRightUI = ({active, toggleFullscreenOption}:any) => {
    return (
      <button className={` p-1 rounded-lg ${(active?"bg-black text-white":"bg-gray-50/10")}`} onClick={toggleFullscreenOption} ><Fullscreen className='p-1' /></button>
    )
  }

const Canvas = (
    {
        onDocumentSave, 
        fileId, 
        fileData
    }:
    {
        onDocumentSave:boolean|any, 
        fileId:string|any, 
        fileData:FILE|any
    }) => {

        const [whiteBoardData, setWhiteBoardData] = useState<any>()
        const updateWhiteboard = useMutation(api.files.updateWhiteboard); 
        const fullScreen = "absolute top-[70px] left-0 w-full z-20"
        const [isFullScreen, setIsFullscreen] = useState(false)

        const toggleFullscreen = () => {
            setIsFullscreen(!isFullScreen)
        }

        const saveWhiteboard = () => {
            console.log("saving the canvas....")
            updateWhiteboard({
                _id: fileId,
                whiteboard: JSON.stringify(whiteBoardData)  
            }).then((res)=>{
                console.log("THis is the respoonse success")
                console.log(whiteBoardData)
                console.log(res); 
            }, (err:any)=>{
                toast("Error in saving canvas")
            })
        }

        useEffect(()=>{
            onDocumentSave && saveWhiteboard()
        }, [onDocumentSave ])

  return (

    <>
      <div className={`h-[calc(100vh-70px)] ${isFullScreen ? fullScreen : ""}`}>
        {
            fileData && <Excalidraw
            renderTopRightUI={() => <TopRightUI active={isFullScreen} toggleFullscreenOption={toggleFullscreen} />}
            UIOptions={UIOptions}
            theme='light'
            initialData={{
                elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard)
            }}
            onChange={(excalidrawElement, appState, files)=>{
                setWhiteBoardData(excalidrawElement)
            }}
            >
          <MainMenu>
                <MainMenu.DefaultItems.ClearCanvas/>
                <MainMenu.DefaultItems.SaveAsImage/>
                <MainMenu.DefaultItems.ChangeCanvasBackground/>
            </MainMenu>
            <WelcomeScreen>
                <WelcomeScreen.Hints.MenuHint/>
                <WelcomeScreen.Hints.MenuHint/>
                <WelcomeScreen.Hints.ToolbarHint/>
                <WelcomeScreen.Center>
                    <WelcomeScreen.Center.MenuItemHelp/>
                </WelcomeScreen.Center>
            </WelcomeScreen>
            </Excalidraw> 
        }
      </div>
    </>
  )
}

export default Canvas