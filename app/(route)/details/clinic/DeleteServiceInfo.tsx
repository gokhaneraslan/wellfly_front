"use client"

import React, { useState, useEffect } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/SubmitButton';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import { toast } from 'sonner'
import { ClinicFormValidation } from '@/lib/validation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

const DeleteServiceInfo = ({clinic}:any) => {
  const [services, setServices] = useState<any | null>([]);
  const [servId, setServId] = useState<any | null>(null);
  const [cateId, setCateId] = useState<any | null>(null);


  const getClinicalFeatures = async () => {

    let categoryID: any = []
    let servicesID: any = []
    if(clinic){
      for (let i = 0; i < clinic?.categories?.length; i++) {
        categoryID.push(clinic?.categories[i]?.documentId)
      }

      setCateId(categoryID)
      setServices(clinic.services)
      
      for (let i = 0; i < clinic?.services?.length; i++) {
        servicesID.push(clinic?.services[i]?.documentId)
      }
      setServId(servicesID)
    }

  }


  const FormSchema = z.object({
    services: z
      .string()
  })


    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {

        let deleteUpdateId = servId.filter(function(item:any) {
          return item !== (data.services).split('-')[0]
        })
    
        try {
    
          const data = {
              data: {
                Name: clinic.Name,
                Address: clinic.Address ,
                Phone: clinic.Phone ,
                Email: clinic.Email,
                Website: clinic.Website ,
                StartTime: clinic.StartTime ,
                EndTime: clinic.EndTime ,
                Password: clinic.Password ,
                Info: clinic.Info ,
                ServiceInfo: clinic.ServiceInfo ,
                services: deleteUpdateId,
                categories: cateId,
            }
          }
          GlobalApi.updateClinic(clinic.documentId,data).then(resp=>{
            if(resp){
              GlobalApi.getUpdateClinic(clinic.documentId).then(respdata=>{
              localStorage.setItem("clinic", JSON.stringify(respdata.data.data))
              toast("Deleted service Successfully!!!")
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
    
      
    }


  useEffect(() => {
    getClinicalFeatures()
  },[])


  return (
    <div className='flex-1 mr-[2rem] pb-10'>
      <h1 className='flex justify-center pb-8 mb-8 text-black font-bold pt-5 items-center'>Added Services</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <div className='lg:flex-row lg:gap-5 flex flex-col ml-1'>
      <FormField control={form.control} name="services"
        render={({ field }) => (
        <FormItem>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl className="w-[21.5rem] sm:w-[30rem] md:w-[31rem] lg:w-[31rem]">
          
          <SelectTrigger className="shad-select-trigger ">
            <SelectValue placeholder={field.value ? field.value : (services ? services.length > 0 && services[0].Name : " ")} />
          </SelectTrigger>
        </FormControl>
          <SelectContent className="shad-select-content h-[12rem]">
              {services && services.map((service:any, i:any) => (
                <SelectItem key={service.documentId}  value={`${service.documentId}-${service.Name}`}>
                  <div key={i} className="flex cursor-pointer items-center gap-5 
                    md:w-[25rem] lg:w-[25rem]  w-[17rem] h-[2.7rem] border-y-2 bg-dark-500 pl-1 md:pl-5 lg:pl-5 border-dark-400">
                    <p key={i}>{service.Name}</p>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        </FormItem>)} />
        <Button className='flex justify-center items-center mt-5 ml-52 sm:ml-80 md:ml-80 lg:m-0 w-[8rem] shad-danger-btn' type="submit">Delete Service</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default DeleteServiceInfo