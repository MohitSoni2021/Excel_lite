import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import '@excalidraw/excalidraw/index.css';
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

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
      <div style={{ height: "100vh" }}>
        {
            fileData && <Excalidraw
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