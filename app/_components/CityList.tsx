import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CityList = () => {

  return (
    <div className='pb-10 px-10 bg-white'>
        <h2 className='font-bold text-black text-xl flex justify-start pl-32 items-center pb-10 pt-10'>Popüler Klinik Noktaları</h2>
        <div className='grid grid-cols-2 px-20 xs:grid-cols-1 
            sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 mt-4'>
            <Image src="/assets/images/istanbul.jpeg" alt='istanbul' width={200} height={200}
                className='w-full h-[300px] object-fill rounded-lg'/>
            <Image src="/assets/images/izmir.png" alt='istanbul' width={200} height={200}
                className='w-full h-[300px] object-fill rounded-lg'/>
            <div className='flex gap-2'>
                <Image src="/assets/images/ankara.jpeg" alt='istanbul' width={200} height={200}
                    className='w-[365px] h-[250px] object-fill rounded-lg'/>
                <Image src="/assets/images/canakkale.jpg" alt='istanbul' width={200} height={200}
                    className='w-[365px] h-[250px] object-fill rounded-lg'/>
                <Image src="/assets/images/eskisehir.jpg" alt='istanbul' width={200} height={200}
                    className='w-[365px] h-[250px] object-fill rounded-lg'/>
            </div>
        </div>
    </div>
  )
}

export default CityList