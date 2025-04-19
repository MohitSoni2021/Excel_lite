import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { MAX_FREE_FILES_CREATION_COUNT } from '@/app/_constants/UsagesCounts'
import SkeletonLoader from '@/app/_components/Loaders/SkeletonLoader'


const SideBarBottomDashboard = ({ onFileCreate, totalFiles }: any) => {

    const Menu = [
        {
            id: 1,
            name: "Getting Started",
            icon: Flag,
            path: "/",
        },
        {
            id: 2,
            name: "Github",
            icon: Github,
            path: "/",
        },
        {
            id: 3,
            name: "Archive",
            icon: Archive,
            path: "/",
        }
    ]

    const [FileName, setFileName] = useState('');

    const createNewFile = () => {
        console.log('File Name', FileName);
        setFileName('');
    }

    return (
        <div>

            <div className="">
                {Menu.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded-md cursor-pointer">
                        <item.icon className="w-5 h-5 text-gray-700" />
                        <span>{item.name}</span>
                    </div>
                ))}

            </div>

            <Dialog>
                <DialogTrigger className='w-full cursor-pointer' asChild>
                    <Button className='w-full flex justify-start mt-3'>
                        Add New File
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New File</DialogTitle>
                        <DialogDescription asChild>
                            <div className="">
                                <Input
                                    value={FileName} onChange={(e) => setFileName(e.target.value)} placeholder='Enter Your File Name' className='my-2 text-black ' />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                onClick={() => onFileCreate(FileName)}
                                className='cursor-pointer'
                                disabled={!(FileName && FileName?.length > 0)}
                            >
                                Create
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {
                totalFiles &&
                <>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4 overflow-hidden">
                        <div
                            className="bg-black h-2.5 rounded-full"
                            style={{ width: `${(totalFiles || 0) * MAX_FREE_FILES_CREATION_COUNT}%` }} // Adjust the percentage as needed
                        ></div>
                    </div>

                    <p>
                        <strong>{totalFiles}</strong> out of 10 files are Created
                    </p>
                </>
            }

            {
                !totalFiles && <SkeletonLoader className='w-full mt-4' height={30} />
            }



        </div>
    )
}

export default SideBarBottomDashboard