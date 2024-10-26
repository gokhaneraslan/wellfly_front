"use client"

import Header from "@/app/_components/Header";
import { UpdateUserInfo } from "@/components/forms/users/UpdateUserInfo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UpdateClinicInfo } from "@/components/forms/clinics/UpdateClinicInfo";
import AddServiceInfo from "../details/clinic/AddServiceInfo";
import DeleteServiceInfo from "../details/clinic/DeleteServiceInfo";
import AddFile from "../details/clinic/AddFile";
import { SocialMedia } from "../details/clinic/SocialMedia";
import Mybooking from "../details/user/page";


const Account = () => {
  const router = useRouter();
  const [respUser, setRespUser] = useState<any | null>(null);
  const [respClinic, setRespClinic] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [clinic, setClinic] = useState<any | null>(null);

  const getCustomer = () => {

    if(localStorage.getItem("user")){
      setRespUser(localStorage.getItem("user"))
    }
    else if(localStorage.getItem("clinic")){
      setRespClinic(localStorage.getItem("clinic"))
    }
    else{
      router.push('/login');
    }
    setUser(JSON.parse(respUser))
    setClinic(JSON.parse(respClinic))
  }

  
  useEffect(() => {
    getCustomer()
  },[respUser, respClinic])


  return (
    <div>
      <Header />
      <div className="bg-white px-3 md:px-10 lg:px-10 pt-7"> 
        {
          user ? 
          <div className="flex flex-col pb-40 md:flex-row lg:flex-row md:gap-10 lg:gap-10">
            <UpdateUserInfo user={user} />
            <Mybooking user={user} />
          </div> : 
          clinic && 
          <div className="flex flex-col gap-10 md:flex-col lg:flex-row md:mx-7 lg:mx-7">
            <UpdateClinicInfo clinic={clinic} />
            <div className="flex flex-col w-full">
              <DeleteServiceInfo clinic={clinic}/>
              <AddServiceInfo clinic={clinic}/>
              <AddFile clinic={clinic}/>
              <SocialMedia clinic={clinic} />
            </div>
            
          </div>
        }
      </div>
    </div>
  );
};

export default Account;