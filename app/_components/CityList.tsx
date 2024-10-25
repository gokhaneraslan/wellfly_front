import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CityList = () => {

  return (
    <div className='pb-10 px-10 bg-white'>
        <h2 className='font-bold text-black text-xl flex justify-start lg:pl-32 md:pl-32 sm:pl-32 items-center pb-10 pt-10'>Popüler Klinik Noktaları</h2>
        <div className='grid grid-cols-1 lg:px-20 md:px-20 sm:px-10 xs:grid-cols-1 
            sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 mt-4'>
            <Image src="/assets/images/istanbul.jpeg" alt='istanbul' width={200} height={200}
                className='w-full max-h-[300px] object-fill rounded-lg'/>
            <Image src="/assets/images/izmir.png" alt='istanbul' width={200} height={200}
                className='w-full max-h-[300px] object-fill rounded-lg'/>
            <Image src="/assets/images/ankara.jpeg" alt='istanbul' width={200} height={200}
                className='w-full max-h-[300px] object-fill rounded-lg'/>
            <Image src="/assets/images/canakkale.jpg" alt='istanbul' width={200} height={200}
                className='w-full max-h-[300px] object-fill rounded-lg'/>
        </div>
    </div>
  )
}

export default CityList