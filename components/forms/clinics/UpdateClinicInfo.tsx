"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ClinicRegisterFormValidation } from "@/lib/validation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from 'sonner'
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/SubmitButton";


export const UpdateClinicInfo = ({clinic} : any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ClinicRegisterFormValidation>>({
    resolver: zodResolver(ClinicRegisterFormValidation),
    defaultValues: {
      name: clinic.Name,
      address: clinic.Address ,
      phone: clinic.Phone ,
      email: clinic.Email,
      website: clinic.Website ,
      startTime: clinic.StartTime ,
      endTime: clinic.EndTime ,
      password: clinic.Password ,
      info: clinic.Info
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
            Password: values.password,
            Info: values.info
        }
      }

      if(clinic !== data.data)
        {
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
        }
        else{
          toast("No changes detected!!!")
        }
        
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const deleteAccount = () => {
    GlobalApi.deleteClinic(clinic.documentId).then(resp=>{
      if(resp){
        localStorage.removeItem("clinic")
        router.push('/register');
        toast("Clinic Account Deleted Successfully")
        
      }
    })
  }

  return (
    <div className="sidebar-clinic">
      <h1 className='flex justify-center text-black font-bold items-center pt-5 pb-8'>Clinic Information</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
                <div className="lg:flex lg:gap-5 md:flex md:gap-5">
                    <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Clinic name"
                    placeholder={clinic && clinic.Name}
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                    />

                    <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder={clinic && clinic.Email}
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                    />
                </div>
                <div className="lg:flex lg:gap-5 md:flex md:gap-5">
                    <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder={clinic && clinic.Phone}
                    iconSrc="/assets/icons/phone.png"
                    iconAlt="phone"
                    />
                    <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="address"
                    label="Clinic address"
                    placeholder={clinic && clinic.Address}
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
                    placeholder={clinic && clinic.Website}
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                    />

                </div>
                
                <div className="lg:flex lg:gap-5 md:flex md:gap-5">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="startTime"
                    label="Start time"
                    placeholder={clinic && clinic.StartTime}
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="endTime"
                    label="End time"
                    placeholder={clinic && clinic.EndTime}
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                  />
                  </div>
                    <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder={clinic && clinic.Password}
                    iconSrc="/assets/icons/key.png"
                    iconAlt="password"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="info"
                      label="Info"
                      placeholder={clinic && clinic.Info}
                      iconSrc="/assets/icons/key.png"
                      iconAlt="info"
                    />
                <SubmitButton isLoading={isLoading}>Update Account</SubmitButton>
            </form>
        </Form>
        <Button className="shad-danger-btn mt-3 w-full" onClick={deleteAccount} >Delete Account</Button>
    </div>
  );
};
