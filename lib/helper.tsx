"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { array, z } from "zod";
import { Form } from "@/components/ui/form";
import { ClinicFormValidation } from "@/lib/validation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from 'sonner'
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { Select, SelectItem } from "@/components/ui/select";
import Image from "next/image";


export const RegisterClinicForm = () => {
  const router = useRouter();
  const [clinicCategories, setClinicCategories] = useState([{id:"", attributes:{Name: " ", 
    Icon: {data: [{id: "", attributes:{name: "", url: ""}}]}}}]);
  const [services, setServices] = useState([{id:"", attributes:{Name: " ", 
    Icon: {data: [{id: "", attributes:{name: "", url: ""}}]}}}]);
  const [isLoading, setIsLoading] = useState(false);
  

  const getClinicalFeatures = async () => {

    const resp = await GlobalApi.getClinicCategories()
    if(resp){
      setClinicCategories(resp.data.data)
    }

    const respServices = await GlobalApi.getServices()
    if(respServices){
      setServices(respServices.data.data)
    }
    
  }


  const form = useForm<z.infer<typeof ClinicFormValidation>>({
    resolver: zodResolver(ClinicFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof ClinicFormValidation>) => {
    setIsLoading(true);

    try {
      const data = {
        data: {
            Username: values.name,
            Email: values.email,
            Phone: values.phone,
            Password: values.password,
        }
      }
      GlobalApi.createUser(data).then(resp=>{
        if(resp){
          toast("User Created Successfully")
          router.push('/login');
        }
        else{
          toast("Something Went Wrong!")
        }

      })

    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };


  useEffect(() => {
    getClinicalFeatures()
  },[])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <div className="flex gap-5">
          <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Clinic name"
          placeholder="Clinic Name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          />

          <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          />
        </div>
        <div className="flex gap-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="(+90) 111 222 33 44"
            iconSrc="/assets/icons/phone.png"
            iconAlt="phone"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Clinic address"
            placeholder="Kadikoy/Istanbul"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

        </div>
        <div className="flex gap-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="website"
            label="Website name"
            placeholder="wellfly.com"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="socialMedia"
            label="Social Media"
            placeholder="wellfly"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        </div>
        <div className="flex gap-5">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="categories"
            label="Category"
            placeholder="PLASTIC SURGEON"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          >{clinicCategories.length > 0 && clinicCategories.map((category, i) => (
            <Select key={i}>
              <SelectItem key={category.attributes?.Name + i}  value={category.attributes?.Name}>
                <div key={i} className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={category.attributes?.Icon?.data[0]?.attributes?.url}
                    width={32}
                    height={32}
                    alt={category.attributes?.Icon?.data[0]?.attributes?.name}
                    className="rounded-full border border-dark-500"
                  />
                  <p key={i}>{category.attributes?.Name}</p>
                </div>
              </SelectItem>
            </Select>
            ))}
          </CustomFormField>
          <div className="flex-col px-7 mt-4 rounded-md border-0 border-dark-500 bg-dark-400
              w-[19.4rem] h-[4.7rem] text-16 text-dark-700 remove-scrollbar overflow-auto">
            <p className="my-4 border-2 border-dark-500
              flex items-center justify-center p-2 cursor-pointer rounded-lg">Plastic Surgeon</p>
            <p className="my-4 border-2 border-dark-500
              flex items-center justify-center p-2 cursor-pointer rounded-lg">Plastic Surgeon</p>
            <p className="my-4 border-2 border-dark-500
              flex items-center justify-center p-2 cursor-pointer rounded-lg">Plastic Surgeon</p>
          </div>
        </div>
        <div className="flex gap-5">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="service"
            label="Services"
            placeholder="Breast Lift"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          >
            {services.length > 0 && services.map((service, i) => (
                <SelectItem key={service.attributes?.Name + i} value={service.attributes?.Name}>
                  <div key={i} className="flex cursor-pointer items-center gap-1">
                    <Image
                      src={service.attributes?.Icon?.data[0]?.attributes?.url}
                      width={32}
                      height={32}
                      alt={service.attributes?.Icon?.data[0]?.attributes?.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p key={i}>{service.attributes?.Name}</p>
                  </div>
                </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <div className="flex gap-5 pb-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="time"
            label="Working time"
            placeholder="Working Time"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Ab123456"
            iconSrc="/assets/icons/key.png"
            iconAlt="phone"
          />
        </div>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

/*

"use client"

import React, { useState, useEffect } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi';
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import { toast } from 'sonner'
import { string, z } from 'zod';
import { DoctorFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';

const ClinicInfo = ({clinic}:any) => {
  const [clinicCategories, setClinicCategories] = useState<any | null>(null);
  const [services, setServices] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const getClinicalFeatures = async () => {

    const resp = await GlobalApi.getClinicCategories()
    if(resp){
      setClinicCategories(resp.data.data)
    }

    const respServices = await GlobalApi.getServices()
    if(respServices){
      setServices(respServices.data.data)
    }
    
  }


  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: "" ,
      phone: "" ,
      email: "" ,
      startTime: "" ,
      endTime: "" ,
      info: "",
      service: "",
      category: "",
      password: "" ,
    },
  });

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    setIsLoading(true);
    let serviceId = Number((values.service).split('-')[0])
    let categoryId = Number((values.category).split('-')[0])
    try {

      const data = {
          data: {
            Name: values.name,
            Phone: values.phone,
            Email: values.email,
            StartTime: values.startTime,
            EndTime: values.endTime,
            About: values.info,
            Password: values.password,
            services: serviceId,
            categories: categoryId,
            clinic: clinic.id,
        }
      }
      GlobalApi.updateClinic(clinic.id,data).then(resp=>{
        if(resp){
          console.log(resp)
          toast("Doctor saved Successfully!!!")
        }
        else{
          toast("Something Went Wrong!!!")
        }
      })
        
        
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };



  useEffect(() => {
    getClinicalFeatures()
  },[])


  return (
    <div className='flex-1 mr-[2rem] pb-40'>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="category"
            label="Category"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          >{clinicCategories && clinicCategories.map((category:any, i:any) => (
              <SelectItem key={category.id}  value={`${category.id}-${category.attributes?.Name}`}>
                <div key={i} className="flex cursor-pointer items-center gap-5 
                   w-[35rem] h-[2.7rem] border-y-2 bg-dark-400 pl-5 border-dark-500">
                  <Image
                    src={category.attributes?.Icon?.data[0]?.attributes?.url}
                    width={32}
                    height={32}
                    alt={category.attributes?.Icon?.data[0]?.attributes?.name}
                    className="rounded-full border border-dark-500"
                  />
                  <p key={i}>{category.attributes?.Name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="service"
            label="Services"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          >
            {services && services.map((service:any, i:any) => (
                <SelectItem key={service.id} value={`${service.id}-${service.attributes?.Name}`}>
                  <div key={i} className="flex cursor-pointer items-center gap-5 
                   w-[35rem] h-[2.7rem] border-y-2 bg-dark-400 pl-5 border-dark-500">
                    <Image
                      src={service.attributes?.Icon?.data[0]?.attributes?.url}
                      width={32}
                      height={32}
                      alt={service.attributes?.Icon?.data[0]?.attributes?.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p key={i}>{service.attributes?.Name}</p>
                  </div>
                </SelectItem>
            ))}
          </CustomFormField>
          <div className="flex gap-5">
          <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Doctor Name"
          placeholder="Doctor Name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          />

          <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Doctor Email"
          placeholder="example@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          />
        </div>
        <div className="flex gap-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="startTime"
            label="Start time"
            placeholder="Start Time"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="endTime"
            label="End time"
            placeholder="End time"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          </div>
          <div className="flex gap-5">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="phone"
                label="Doctor Phone Number"
                placeholder="Doctor Phone Number"
                iconSrc="/assets/icons/phone.png"
                iconAlt="phone"
                />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                label="Password"
                placeholder="Password"
                iconSrc="/assets/icons/key.png"
                iconAlt="password"
              />
          </div>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="info"
            label="Doctor About"
            placeholder="Optional"
            iconSrc="/assets/icons/key.png"
            iconAlt="about"
          />
        <SubmitButton isLoading={isLoading}>Save</SubmitButton>
      </form>
    </Form>
    </div>
  )
}

export default ClinicInfo

*/


/*
"use client"

import React, { useState, useEffect } from 'react'
import {Select, SelectItem} from "@nextui-org/react";
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClinicFormValidation } from '@/lib/validation';
import { z } from 'zod';
import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/ui/form';

const ClinicInfo = ({id}:any) => {
  const [valueCategory, setCategoryValue] = useState([]);
  const [valueService, setServiceValue] = useState([]);
  const [clinicCategories, setClinicCategories] = useState<any | null>(null);
  const [services, setServices] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const getClinicalFeatures = async () => {

    const resp = await GlobalApi.getClinicCategories()
    if(resp){
      const parseStringify = JSON.parse(JSON.stringify(resp));
      setClinicCategories(parseStringify.data.data)
    }

    const respServices = await GlobalApi.getServices()
    if(respServices){
      const parseStringify = JSON.parse(JSON.stringify(respServices));
      setServices(parseStringify.data.data)
    }
    
  }

  const getCategories = (e:any) => {
    setCategoryValue(e.target.value);
  };

  const getServices = (e:any) => {
    setServiceValue(e.target.value);
  };

  const form = useForm<z.infer<typeof ClinicFormValidation>>({
    resolver: zodResolver(ClinicFormValidation),
    defaultValues: {
      name: "" ,
      address: "" ,
      phone: "" ,
      email: "" ,
      website: "" ,
      socialMedia: "" ,
      time: "" ,
      categories: "" ,
      services: "" ,
      password: "" ,
    },
  });

  
  const onSubmit = async (values: z.infer<typeof ClinicFormValidation>) => {
    setIsLoading(true);
    console.log(values)

    setIsLoading(false);
  };


  useEffect(() => {
    getClinicalFeatures()
  },[])


  return (
    <div className='flex-1 mr-[2rem]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
          <div className="flex-1">
            <Select label placeholder='PLASTIC SURGEON' 
              classNames={{
                base: "bg-dark-500 rounded-lg",
                selectorIcon: "ml-[43rem]"
              }}
              selectionMode="multiple" onChange={getCategories}>
              {clinicCategories && clinicCategories.map((category:any,i:any) => (
                <SelectItem className='shad-select-content' key={category.attributes?.Name} textValue={category.attributes?.Name}>
                  <div className="flex cursor-pointer items-center gap-2 ">
                    <Image
                      src={category.attributes?.Icon?.data[0]?.attributes?.url}
                      width={32}
                      height={32}
                      alt={category.attributes?.Icon?.data[0]?.attributes?.name}
                      className="rounded-full border border-dark-500"
                    />
                    {category.attributes?.Name}
                  </div>
                </SelectItem>
                ))
              }
            </Select>
          </div>
          <div className="flex-1">
            <Select label placeholder='Breast Lift'
              classNames={{
                base: "bg-dark-500 rounded-lg text-[1.1rem] remove-scrollbar overflow-auto",
                selectorIcon: "ml-[43rem]",
                popoverContent: "h-[15rem] p-5",
              }}
              selectionMode="multiple" onChange={getServices}>
              {services && services.map((service:any, i:any) => (
                <SelectItem className='shad-select-content' key={service.attributes?.Name} textValue={service.attributes?.Name}>
                  <div className="flex cursor-pointer items-center gap-2 ">
                    <Image
                      src={service.attributes?.Icon?.data[0]?.attributes?.url}
                      width={32}
                      height={32}
                      alt={service.attributes?.Icon?.data[0]?.attributes?.name}
                      className="rounded-full border border-dark-500"
                    />
                    {service.attributes?.Name}
                  </div>
                </SelectItem>
                ))
              }
            </Select>
          </div>
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  )
}

export default ClinicInfo
*/