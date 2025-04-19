
"use client"
import type { ToolConstructable } from '@editorjs/editorjs';
// @ts-ignore
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import HeaderTool from '@editorjs/header';
// @ts-ignore
import ListTool from '@editorjs/list';
// @ts-ignore
import ChecklistTool from '@editorjs/checklist';
// @ts-ignore
import ParagraphTool from '@editorjs/paragraph';
// @ts-ignore
import WarningTool from '@editorjs/warning';
import { useMutation } from 'convex/react';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Fullscreen } from 'lucide-react';

const Header = HeaderTool as unknown as ToolConstructable;
const List = ListTool as unknown as ToolConstructable;
const Checklist = ChecklistTool as unknown as ToolConstructable;
const Paragraph = ParagraphTool as unknown as ToolConstructable;
const Warning = WarningTool as unknown as ToolConstructable;



const rawDocument = {
    "time" : 1550476186479,
    "blocks" : [{
        data : {
            text : "Document Name",
            level : 2
        },
        id:222,
        type : "header"
    }],
    "version" : "2.8.1"
}

const EditorSetion = ({onDocumentSave, fileId, fileData}:any) => {
    const ref = useRef<EditorJS>(null);
    const updateDoument = useMutation(api.files.updateDoument); 
    const [editorContent, setEditorContent] = useState<any>(rawDocument);
    const [fullScreen, setIsFullscreen] = useState(false)

    const toggleFullscreenOption = () => {
        setIsFullscreen(!fullScreen)
    }

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
            tools: {
                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: 'Enter a Header'
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                warning: {
                    class: Warning,
                    inlineToolbar: true,
                },
            },
        });
    
        ref.current = editor;
    }
    

    const onSaveDoument = () => {
        if(ref.current) {
            ref.current .save().then((outputData) => {
                console.log('Article data: ', outputData)
                updateDoument({
                    _id: fileId,
                    document: JSON.stringify(outputData),
                })
              }).then((res:any)=>{
                toast("Document saved successfully");
              }, (err:any)=>{
                toast.error("Document save failed");
              })
        }
    }

    useEffect(() => {
        fileData&&initEditor();
    }, [fileData])

    useEffect(()=>{
        console.log("trigger value => ", onDocumentSave );
        onDocumentSave &&onSaveDoument();
    }, [onDocumentSave])

    return (
        <div className={`relative bg-white ${fullScreen ? "absolute top-0 left-0 w-screen overflow-x-hidden h-[calc(100vh-70px)] z-20" : ""}`}>
            <button className={`absolute cursor-pointer z-10 top-1 right-1 p-1 rounded-lg ${(fullScreen?"bg-black text-white":"bg-gray-200")}`} onClick={toggleFullscreenOption} ><Fullscreen className='p-1' /></button>
            <div className='w-full' id="editorjs"></div>
        </div>
    )
}

export default EditorSetion