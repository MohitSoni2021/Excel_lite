import { FilesListContext } from '@/app/_context/FilesListContext';
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@/components/ui/button';
import { Archive, Delete, MoreHorizontalIcon, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import HashLoaderComp from '@/app/_components/Loader';
import { HashLoader } from 'react-spinners';
import FileListLoader from '@/app/_components/Loaders/FileListLoader';
import Link from 'next/link';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';



export interface FILE {
    fileName: string;
    createdBy: string;
    teamId: string;
    archived: boolean;
    document: string;
    whiteboard: string;
    _id: string;
    _creationTime: number;
}
const FileList = () => {

    const { fileList_, setFileList_, contextDisplayFileType, setContextDisplayFileType }: any = useContext(FilesListContext);
    const [fileList, setFileList] = useState<any>([]);
    const { user }: any = useKindeBrowserClient();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const archiveFile = useMutation(api.files.archiveFile);
    const deleteFile = useMutation(api.files.deleteFile);
    const [isArchiving, setIsArchiving] = useState("false");

    useEffect(() => {
        setIsLoading(true);
        fileList_ && setFileList(fileList_);
        console.log(fileList);
        setIsLoading(false);
    }, [fileList_, contextDisplayFileType]);

    const handleArchive = async (fileId: Id<"files">) => {
        try {
            await archiveFile({
                _id: fileId,
                archived: true
            });
            // Update the file's archived status in the fileList
            const updatedList = fileList.map((file: FILE) => 
                file._id === fileId ? { ...file, archived: true } : file
            );
            setFileList(updatedList);
            router.push('/processing/archive')
            
        } catch (error) {
            console.error('Error archiving file:', error);
        }
    };

    const handleDelete = async (fileId: Id<"files">) => {
        try {
            await deleteFile({
                _id: fileId
            });
            // Refresh the file list after archiving
            const updatedList = fileList.filter((file: FILE) => file._id !== fileId);
            setFileList(updatedList);
            router.push('/processing/delete')
        } catch (error) {
            console.error('Error archiving file:', error);
        }
    };

    return (
        <>
            {
                fileList && <div>
                    <div className="overflow-x-auto mt-10">
                        <table className="min-w-full divide-y-2 divide-gray-200">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr className="*:font-medium *:text-gray-900">
                                    <th className="px-3 py-2 whitespace-nowrap">File Name</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Created At</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Edited</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Author</th>
                                </tr>
                            </thead>


                            <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                                {
                                    fileList && fileList.map((file: FILE, index: number) => {
                                        if (contextDisplayFileType == 'archived' && file.archived) {
                                            return <tr className="*:text-gray-900 *:first:font-medium "
                                                key={index}
                                            >
                                                <td className="px-3 py-2 whitespace-nowrap" >
                                                    <Link href={`/workspace/${file._id}`} className='hover:bg-gray-50 hover:underline cursor-pointer'>
                                                        {file.fileName}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format("DD MMM YYYY")}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format("DD MMM YYYY")}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 ">
                                                        <img src={user?.picture} alt="" className='w-8 h-8 rounded-full' />
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 whitespace-nowrap">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <MoreHorizontalIcon />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem >
                                                                <button onClick={() => handleDelete(file._id as Id<"files">)} className='text-red-400 flex items-center justify-center gap-2'> <Trash2 /> Delete </button>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>

                                                </td>
                                            </tr>
                                        } else if (contextDisplayFileType == 'allFiles' && !file.archived) {
                                            return <tr className="*:text-gray-900 *:first:font-medium "
                                                key={index}
                                            >
                                                <td className="px-3 py-2 whitespace-nowrap" >
                                                    <Link href={`/workspace/${file._id}`} className='hover:bg-gray-50 hover:underline cursor-pointer'>
                                                        {file.fileName}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format("DD MMM YYYY")}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format("DD MMM YYYY")}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 ">
                                                        <img src={user?.picture} alt="" className='w-8 h-8 rounded-full' />
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 whitespace-nowrap">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <MoreHorizontalIcon />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem >
                                                                <button className='text-green-400 flex items-center justify-center gap-2' onClick={() => handleArchive(file._id as Id<"files">)}> <Archive /> Archive </button>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>

                                                </td>
                                            </tr>
                                        }
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            }

            {
                (fileList_.length === 0) && (fileList.length === 0) && isLoading && <div className="flex justify-center items-center h-screen">
                    {/* <HashLoaderComp message="loadingFiles" style={"items-start"} /> */}
                    <FileListLoader />
                </div>
            }

            {
                (fileList_.length === 0) && (fileList.length === 0) && !isLoading && <div className="flex justify-center items-start mt-10 h-screen">
                    <h1 className="text-3xl font-semibold text-gray-800">No Files Found</h1>
                </div>
            }
        </>
    )
}

export default FileList