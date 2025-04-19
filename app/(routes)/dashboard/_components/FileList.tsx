import { FilesListContext } from '@/app/_context/FilesListContext';
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@/components/ui/button';
import { Archive, Delete, MoreHorizontalIcon } from 'lucide-react';
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

    const { fileList_, setFileList_ }: any = useContext(FilesListContext);
    const [fileList, setFileList] = useState<any>([]);
    const { user }: any = useKindeBrowserClient();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
            setIsLoading((pre)=>!pre)
        console.log(isLoading)
        fileList_ && setFileList(fileList_);
        console.log('fileList', fileList);
        setIsLoading((pre)=>!pre);
        console.log(isLoading)
    }, [fileList_])

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
                                    fileList && fileList.map((file: FILE, index: number) => (
                                        <tr className="*:text-gray-900 *:first:font-medium "
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
                                                        <DropdownMenuItem> <Archive />Archive</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            }

            {
                fileList.length === 0 && isLoading && <div className="flex justify-center items-center h-screen">
                    {/* <HashLoaderComp message="loadingFiles" style={"items-start"} /> */}
                    <FileListLoader />
                </div>
            }

            {
                fileList.length === 0 &&!isLoading && <div className="flex justify-center items-start mt-10 h-screen">
                    <h1 className="text-3xl font-semibold text-gray-800">No Files Found</h1>
                </div>
            }
        </>
    )
}

export default FileList