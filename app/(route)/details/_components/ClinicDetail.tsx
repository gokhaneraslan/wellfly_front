
import {  MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BookAppointment from './BookAppointment'

const ClinicDetail = ({clinic}: any) => {

  const socilaMedia_list = [
    {
        id:1,
        icon: "/assets/icons/instagram.png",
        url: clinic?.Instagram || " "
    },
    {
        id:2,
        icon: "/assets/icons/twitter.png",
        url: clinic?.Twitter || " "
    },
    {
        id:3,
        icon: "/assets/icons/linkedin.png",
        url: clinic?.Linkedin || " "
    },
    {
        id:4,
        icon: "/assets/icons/facebook.png",
        url: clinic?.Facebook || " "
    } 
]



  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-5 border-[1px] p-5 rounded-lg'>
          {/* Clinic İmage */}
          <div>
            <Image src={clinic.Image ? 
            clinic?.Image[0]?.url : "/assets/icons/user.svg"}
              alt='clinic-image'
              width={200}
              height={200}
              className='rounded-lg h-[250px] object-cover' />
          </div>
          {/* clinic Info */}
          <div className='col-span-2 md:px-10 flex flex-col gap-3 items-baseline'>
          <Link href={"/search/" + ( clinic?.categories ? clinic?.categories[0]?.Name : " ")} 
            className='text-black font-bold p-3 rounded-xl
                cursor-pointer flex justify-center items-center bg-white
                hover:bg-light-200 hover:shadow-sm transition-all ease-in-out'>
              {clinic?.categories ? clinic?.categories[0]?.Name : " "}
            </Link>
            <h2 className='font-bold pl-2 text-xl'> {clinic?.Name} </h2>
            <h2 className='flex gap-2 pl-2 text-dark-400 text-md'>
              <MapPin />
              <span> {clinic?.Address} </span>
            </h2>
            <div className='flex gap-3 pl-2'>
              {
                socilaMedia_list.map((item, index) => (
                    <Link key={index} href={item.url} className='hover:scale-150 transition-all ease-in-out'>
                        <Image key={index} 
                        src={item.icon} width={30} height={30} alt='icon'/>
                    </Link>
                ))
              }
            </div>
            <BookAppointment clinic={clinic} />
            
          </div>
      </div>
      {/* About clinic */}
      <div className='p-3 mt-5 border-[1px] rounded-lg'>
        <h2 className='font-bold text-[20px]' >Hakkımızda </h2>
        <p className='text-dark-500 tracking-wide mt-2' >{clinic?.Info}</p>
      </div>
    </div>
  ) 
}

export default ClinicDetail