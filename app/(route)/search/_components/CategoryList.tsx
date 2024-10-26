"use client"
import React, {useEffect, useState} from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import {Command,CommandDialog,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,CommandSeparator,CommandShortcut,} from "@/components/ui/command"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


const CategoryList = () => {

    const [categoryList, setCategoryList] = useState<any | null>(null);
    const params = usePathname()
    const categgory = params.split("/")[2]

    const getCategoryList = () => {
      GlobalApi.getClinicCategories().then(resp => {
        setCategoryList(resp.data.data)
      })
    }
  
    useEffect(() => {
      getCategoryList()
    },[])

  return (
    <div> { categoryList ?
        <div className='h-96 w-80 flex flex-col mt-10 px-8'>
            <Command className='bg-white text-black'>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup className="overflow-visible ">
                    {categoryList&&categoryList.map((item: any,index: any) => (
                        <CommandItem key={index} className="hover:bg-light-200 cursor-pointer rounded-[1.2rem] mt-2">
                            <Link href={'/search/' + item?.Name} className={`p-2 flex gap-2 text-[14px]
                            text-blue-800 
                                rounded-md items-center w-full cursor-pointer ${categgory === item?.Name&& 'bg-blue-200'}`}>
                                <Image src={item?.Icon[0]?.url} alt='icon' width={25} height={25} />
                                <label> {item?.Name} </label>
                            </Link>
                        </CommandItem>
                    ))}

                </CommandGroup>
                </CommandList>
            </Command>
        </div>
        :
          [1,2,3].map((item,index) => (
            <div key={index} className='bg-slate-100
                w-full rounded-lg animate-pulse '>
                      
            </div>
          ))
      }
    </div>
  )
}

export default CategoryList