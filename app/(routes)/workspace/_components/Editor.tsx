
"use client"

import React, { useEffect, useRef, useState } from 'react'
// @ts-ignore
import EditorJS from '@editorjs/editorjs'
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Warning from '@editorjs/warning';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';


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

    const initEditor = () => {
        const editor = new EditorJS({
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
                paragraph: Paragraph,
                warning: Warning,
            },
            holder: 'editorjs',
            data: fileData?.document ? JSON.parse(fileData?.document ) : rawDocument ,
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
        <div>
            <div id="editorjs"></div>
        </div>
    )
}

export default EditorSetion