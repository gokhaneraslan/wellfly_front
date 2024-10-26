"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { array, z } from "zod";
import { Form } from "@/components/ui/form";
import { ClinicRegisterFormValidation } from "@/lib/validation";
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


  const form = useForm<z.infer<typeof ClinicRegisterFormValidation>>({
    resolver: zodResolver(ClinicRegisterFormValidation),
    defaultValues: {
      name: "" ,
      address: "" ,
      phone: "" ,
      email: "" ,
      website: "" ,
      startTime: "" ,
      endTime: "" ,
      info: "",
      password: "" ,
    },
  });


  const onSubmit = async (values: z.infer<typeof ClinicRegisterFormValidation>) => {
    setIsLoading(true);

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
            Info: values.info,
            Password: values.password,
        }
      }
      GlobalApi.createClinic(data).then(resp=>{
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4 px-40 lg:px-0 md:px-0 sm:px-28">
        <div className="lg:flex lg:gap-5 md:flex md:gap-5">
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
        <div className=" lg:flex lg:gap-5 md:flex md:gap-5">
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
        <div className="lg:flex lg:gap-5 md:flex md:gap-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="website"
            label="Website name"
            placeholder="wellfly.com"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        </div>
        <div className="lg:flex lg:gap-5 md:flex md:gap-5 lg:pb-5 md:pb-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="startTime"
            label="Start Time"
            placeholder="09:00"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="endTime"
            label="End Time"
            placeholder="17:00"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        </div>
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Ab123456"
            iconSrc="/assets/icons/key.png"
            iconAlt="password"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="info"
            label="Info"
            placeholder="..."
            iconSrc="/assets/icons/key.png"
            iconAlt="info"
          />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};