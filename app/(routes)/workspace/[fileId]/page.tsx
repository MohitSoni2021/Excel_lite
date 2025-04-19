"use client"

import React, {  Suspense, useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import EditorSetion from '../_components/Editor'
import { useParams } from 'next/navigation'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/_components/FileList'
// import Canvas from '../_components/Canvas'
import { Id } from '@/convex/_generated/dataModel'
import dynamic from 'next/dynamic';
import HashLoaderComp from '@/app/_components/Loader'
import CanvasLoader from '@/app/_components/Loaders/CanvasLoader'
import FileEditorLoader from '@/app/_components/Loaders/FileEditorLoader'
import WorkspaceLoader from '@/app/_components/Loaders/WorkspaceLoader'

// const EditorSetion = dynamic(() => import('../_components/Editor'), {
//   ssr: false,
//   loading: () => <FileEditorLoader />,
// });
const Canvas = dynamic(() => import('../_components/Canvas'), {
  ssr: false,
  loading: () => <CanvasLoader />,
});



const Workspace = ({ params }: any) => {
  const [triggerSave, setTriggerSave] = useState<boolean>(false);
  const { fileId } = useParams();
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();

  useEffect(() => {
    fileId && getFileData();
  }, [fileId])

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId })
    console.log('File Data', result);
    setFileData(result);
  }

  return (
    <Suspense fallback={<WorkspaceLoader />}>
      <div className="">
        {
          fileData && <>
            <WorkspaceHeader fileName={fileData?.fileName} onSave={() => setTriggerSave(!triggerSave)} />

            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="h-[calc(100vh-70px)]">
                <EditorSetion
                  onDocumentSave={triggerSave}
                  fileId={fileId}
                  fileData={fileData}
                />
              </div>
              <div className=" h-[calc(100vh-70px)] border-l-2">
                <Canvas
                  onDocumentSave={triggerSave}
                  fileId={fileId}
                  fileData={fileData}
                />
              </div>
            </div>
          </>
        }

        {
          !fileData && <div className="flex justify-center items-center h-screen bg-gray-100">
            <WorkspaceLoader />
          </div>
        }

      </div>
    </Suspense>
  )
}

export default Workspace




// "use client";

// import React, { useEffect, useState } from "react";
// import WorkspaceHeader from "../_components/WorkspaceHeader";
// import dynamic from "next/dynamic";
// import { useParams } from "next/navigation";
// import { useConvex } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { FILE } from "../../dashboard/_components/FileList";
// import { Id } from "@/convex/_generated/dataModel";
// import { motion } from "framer-motion";

// // Dynamically import heavy components
// const EditorSection = dynamic(() => import("../_components/Editor"), {
//   ssr: false,
//   loading: () => <p className="text-center mt-10">Loading Editor...</p>,
// });
// const Canvas = dynamic(() => import("../_components/Canvas"), {
//   ssr: false,
//   loading: () => <p className="text-center mt-10">Loading Canvas...</p>,
// });

// const Workspace = ({ params }: any) => {
//   const [triggerSave, setTriggerSave] = useState<boolean>(false);
//   const { fileId } = useParams();
//   const convex = useConvex();
//   const [fileData, setFileData] = useState<FILE | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (params?.fileId) getFileData(params.fileId);
//   }, [params?.fileId]);

//   const getFileData = async (id: Id<"files">) => {
//     try {
//       const result = await convex.query(api.files.getFileById, { _id: id });
//       setFileData(result);
//     } catch (error) {
//       console.error("Failed to fetch file data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading || !fileData) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <p className="text-xl font-semibold text-gray-800 animate-pulse">
//           Loading Workspace, please wait...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -15 }}
//       transition={{ duration: 0.3 }}
//       className="min-h-screen"
//     >
//       <WorkspaceHeader
//         fileName={fileData?.fileName}
//         onSave={() => setTriggerSave(!triggerSave)}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2">
//         <div className="h-screen overflow-y-auto">
//           <EditorSection
//             onDocumentSave={triggerSave}
//             fileId={params.fileId}
//             fileData={fileData}
//           />
//         </div>
//         <div className="h-screen border-l-2 overflow-y-auto">
//           <Canvas
//             onDocumentSave={triggerSave}
//             fileId={params.fileId}
//             fileData={fileData}
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Workspace;
