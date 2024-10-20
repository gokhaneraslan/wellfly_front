"use client"
import React, { useEffect, useState } from 'react'
import { Button} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'

const CategorySearch = () => {
 
  const [categoryList, setCategoryList] = useState<any | null>(null);

  const getCategoryList = async () => {
    await GlobalApi.getClinicCategories().then(resp => {
      setCategoryList(resp.data.data)
    })
  }



  useEffect(() => {
    getCategoryList()
  },[])

  return ( 
    <div className='flex flex-col bg-white items-center gap-2 px-5'>
        <h2 className='font-bold text-blue-600 mt-5 text-4xl'> Search <span className='text-primary cursor-pointer'> Clinics</span> </h2>
        <h2 className='text-gray-500 text-xl'> Search Your Doctor and Book Appointment in one click</h2>
        <div className='grid gap-8 grid-cols-3 md:grid-cols-4 lg:grid-cols-3 mt-5'>
          {categoryList ? categoryList.map((item: any,index: any) => index<6&&(
              <Link href={"/search/" + item.Name} key={index} className='flex flex-col text-center items-center bg-blue-50 p-5 
              gap-8 m-2 rounded-lg hover:scale-110 transition-all ease-in-out cursor-pointer'>
                <Image src={item.Icon[0].url} alt='icon' width={150} height={120} />
                <label className='text-black text-sm' key={index}>{ item.Name }</label>
              </Link>
            ))
            :
            [1,2,3].map((item,index) => (
              <div key={index} className='h-[250px] bg-slate-200
              w-[200px] rounded-lg animate-pulse ml-5 '>
              
              </div>
            ))
          }
        </div>

    </div>
    
  )
}

export default CategorySearch