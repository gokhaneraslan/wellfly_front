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
import { ClinicFormValidation } from '@/lib/validation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const AddServiceInfo = ({clinic}:any) => {
  const [clinicCategories, setClinicCategories] = useState<any | null>(null);
  const [services, setServices] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [servId, setServId] = useState<any | null>(null);
  const [cateId, setCateId] = useState<any | null>(null);
  
  const getClinicalFeatures = async () => {

    const resp = await GlobalApi.getClinicCategories()
    if(resp){
      setClinicCategories(resp.data.data)
      let categoryID: any = []
      for (let i = 0; i < clinic?.categories?.length; i++) {
        categoryID.push(clinic?.categories[i]?.documentId)
      }
      setCateId(categoryID)
    }

    const respServices = await GlobalApi.getServices()
    if(respServices){
      setServices(respServices.data.data)
      let servicesID: any = []
      for (let i = 0; i < clinic?.services?.length; i++) {
        servicesID.push(clinic?.services[i]?.documentId)
      }
      setServId(servicesID)
    }
    
  }


  const form = useForm<z.infer<typeof ClinicFormValidation>>({
    resolver: zodResolver(ClinicFormValidation),
    defaultValues: {
      name: clinic.Name,
      address: clinic.Address,
      phone: clinic.Phone ,
      email: clinic.Email,
      website: clinic.Website ,
      startTime: clinic.StartTime ,
      endTime: clinic.EndTime ,
      password: clinic.Password ,
      info: clinic.Info ,
      serviceInfo: "" ,
      categories: "",
      services: ""
    },
  });

  /*className='flex justify-center items-center w-full mt-8 shad-danger-btn'
  let deleteUpdateId = servId.filter(function(item:any) {
    return item !== Number((values.services).split('-')[0])
  })*/

  const onSubmit = async (values:z.infer<typeof ClinicFormValidation>) => {
    setIsLoading(true);

    servId.push((values.services).split('-')[0])
    cateId.push((values.categories).split('-')[0])

    try {

      const data = {
          data: {
            Name: values.name,
            Address: values.address,
            Phone: values.phone,
            Email: values.email,
            Website: values.website,
            StartTime: values.startTime,
            EndTime: values.endTime,
            Password: values.password,
            Info: values.info ,
            ServiceInfo: values.serviceInfo ,
            services: servId,
            categories: cateId,
        }
      }
      GlobalApi.updateClinic(clinic.documentId,data).then(resp=>{
        if(resp){
          GlobalApi.getUpdateClinic(clinic.documentId).then(respdata=>{
          localStorage.setItem("clinic", JSON.stringify(respdata.data.data))
          toast("Clinic Account Updated Successfully!!!")
          window.location.reload()
          })
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
    <div className='flex-1 mr-[2rem] pb-[4rem]'>
      <h1 className='flex justify-center pb-8 text-black font-bold items-center'>Add & Update Services</h1>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="categories"
            label="Category"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          >{clinicCategories && clinicCategories.map((category:any, i:any) => (
              <SelectItem key={category.documentId}  value={`${category.documentId}-${category.Name}`}>
                <div key={i} className="flex cursor-pointer items-center gap-5 
                   w-[35rem] h-[2.7rem] border-y-2 bg-dark-500 pl-5 border-dark-400">
                  <Image
                    src={category?.Icon[0]?.url}
                    width={32}
                    height={32}
                    alt={category.Icon[0]?.name}
                    className="rounded-full border border-dark-400"
                  />
                  <p key={i}>{category.Name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="services"
            label="Services"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          >
            {services && services.map((service:any, i:any) => (
                <SelectItem key={service.documentId} value={`${service.documentId}-${service.Name}`}>
                  <div key={i} className="flex cursor-pointer items-center gap-5 
                   w-[35rem] h-[2.7rem] border-y-2 bg-dark-500 pl-5 border-dark-400">
                    <Image
                      src={service.Icon[0]?.url}
                      width={32}
                      height={32}
                      alt={service.Icon[0]?.name}
                      className="rounded-full border border-dark-400"
                    />
                    <p key={i}>{service.Name}</p>
                  </div>
                </SelectItem>
            ))}
          </CustomFormField>
         
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="serviceInfo"
            label="About Service"
            placeholder="..."
            iconSrc="/assets/icons/key.png"
            iconAlt="about"
          />
        <SubmitButton isLoading={isLoading}>Save or Update</SubmitButton>
      </form>
    </Form>
    </div>
  )
}

export default AddServiceInfo