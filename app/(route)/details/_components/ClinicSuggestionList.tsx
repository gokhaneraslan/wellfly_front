"use client"
import GlobalApi from "@/app/_utils/GlobalApi";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ClinicSuggetionList = () => {

    const [clinicList, setClinicList] = useState<any | null>(null);

    const getClinicList = () => {
      GlobalApi.getClinicAll().then(resp => {
        setClinicList(resp.data.data)
      })
    }
  
    useEffect(() => {
      getClinicList()
    },[])

  return (
    <div className="p-4 border-[1px] mt-5 gap-3 md:ml-5 rounded-lg flex flex-col items-center" >
        <h2 className="mb-3 font-bold"> Suggestions </h2>
        <div>
        {clinicList && clinicList.map((clinic:any,index:any) => (
                <Link href={"/details/" + clinic?.documentId} className='mb-4 p-3 shadow-sm w-full cursor-pointer
                 hover:bg-light-200 border-[1px] 
                rounded-lg flex items-center gap-3' key={index}>
                    <Image key={index} src={clinic?.Image?.length > 0 ? 
                    clinic?.Image[0]?.url : "/assets/icons/user.svg"} 
                    alt='image' width={500} height={500}
                    className='h-[70px] w-[70px] object-cover rounded-full flex items-center'/>
                    <div className='mt-3 item-baseline flex flex-col gap-1'>
                        <h2 className='text-[15px] text-blue-800 pl-2 p-1 rounded-full'>
                            {clinic?.categories[0]?.Name}</h2>
                        <h2 className='font-bold pl-3 pt-2 text-black'> {clinic?.Name} </h2>
                        <h2 className='text-dark-600 pl-3 p-1 text-sm flex gap-1'> <MapPin /> {clinic?.Address}</h2>
                        <h2 className='text-dark-500 px-3 pt-2 text-[14px]'> <span className='w-16 p-1 rounded-sm bg-blue-700 text-white'>9.5</span> Olağanüstü - 587 değerlendirme</h2>
                    </div>
                </Link>
            ))
        }
        </div>
        
    </div>
  )
}

export default ClinicSuggetionList