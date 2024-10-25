"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import Image from 'next/image'
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [clinic, setClinic] = useState<any | null>(null);

  const getCustomer = () => {

    if(localStorage.getItem("user")){
      setUser(localStorage.getItem("user"))
    }

    if(localStorage.getItem("clinic")){
      setClinic(localStorage.getItem("clinic"))
    }
    
  }

  const logOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("clinic")
    if(window.location.pathname == "/"){
      window.location.reload()
    }else{
      router.push("/")
    }
  }

  const Menu = [
    {
        id:1,
        name:"Home",
        path:"/"
    },
    {
        id:2,
        name:"Clinics",
        path:"/search/HAIR%20TRANSPLANT"
    },
    {
        id:3,
        name:"Hotels",
        path:"/hotels"
    },
  ]

  useEffect(() => {
    getCustomer()
  },[user,clinic])

  return (
    <div className='flex items-center justify-between p-4 bg-[#013B94] shadow-sm'>
      <div className='flex items-center gap-10 '>
            <Image className='md:ml-[7rem]' src={'/assets/icons/logo.svg'} alt='logo' width={60} height={60} />
            <ul className='ml-[3rem] md:flex gap-8 hidden'>
                {Menu.map((item,index) => (
                    <Link href={item.path} key={index}>
                        <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out' key={index}>
                            {item.name}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
      {
        (user || clinic) ?
            <Popover>
            <PopoverTrigger>
              <Image src={"/user.png"} alt='profile-image' width={50} height={50} className='rounded-full mr-[7rem]' />
            </PopoverTrigger>
            <PopoverContent className="w-44 bg-white mr-[4rem]">
                <ul className='flex flex-col gap-2'>
                    <Link href={"/account"} className='flex justify-center text-black cursor-pointer hover:bg-light-200 p-4 rounded-md'>Account</Link>
                    <li className='flex justify-center cursor-pointer text-black  hover:bg-light-200 p-2 rounded-md'>
                      <Button onClick={logOut} >LogOut</Button>
                    </li>
                </ul>
            </PopoverContent>
            </Popover>
            :
            <div className='w-[12rem] flex justify-between md:mr-[5rem]'>
              <Button className='hover:text-primary cursor-pointer hover:scale-150 transition-all ease-in-out'><Link href={"/register"}>Register</Link></Button>
              <Button className='hover:text-primary cursor-pointer hover:scale-150 transition-all ease-in-out'><Link href={"/login"}>Login</Link></Button>
            </div>
            }
    </div>
  )
}

export default Header