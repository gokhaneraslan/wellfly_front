import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ClinicList = ({clinicList, heading = 'Popular Clinics'}:any) => {

  return (
    <div className='pb-10 px-10 bg-white'>
        <h2 className='font-bold text-black text-xl flex justify-start lg:pl-32 md:pl-32 sm:pl-32 items-center pb-5 pt-10'>{heading}</h2>
        <div className='grid grid-cols-1 px-5 lg:px-20 md:px-20 sm:px-20 xs:grid-cols-1 
        sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[6rem] mt-4'>
            {clinicList ? clinicList.map((clinic:any,index:any) => index < 4&&(
                <Link href={"/details/" + clinic?.documentId} className='cursor-pointer border-[1px] rounded-xl
                 border-light-50 shadow-xl lg:w-[275px] md:w-[275px] sm:w-[275px] 
                 w-[250px] h-[23rem] transition-all ease-in-out' key={index}>
                    <Image key={index} src={clinic?.Image?.length > 0 ? 
                    clinic?.Image[0]?.url : "/assets/icons/user.svg"}
                    alt='image' width={200} height={200}
                    className='w-full max-h-[220px] object-fill rounded-lg'/>
                    <div className='mt-3 item-baseline flex flex-col gap-1'>
                        <h2 className='text-[15px] font-bold text-dark-500 px-3 rounded-full'>
                            {clinic?.categories[0]?.Name}</h2>
                        <h2 className='font-bold text-dark-300 px-3 text-dark-100'> {clinic?.Name} </h2>
                        <h2 className='text-dark-400 px-3 text-sm'> {clinic?.Address} </h2>
                        <h2 className='text-dark-500 px-3 pt-2 text-[14px]'> <span className='w-16 p-1 rounded-sm bg-blue-700 text-white'>9.5</span> Olağanüstü - 587 değerlendirme</h2>
                    </div>
                </Link>
            ))
            :
            [1,2,3].map((item,index) => (
                <div key={index} className='h-[23rem] bg-slate-100
                w-full rounded-lg animate-pulse '>
                
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default ClinicList