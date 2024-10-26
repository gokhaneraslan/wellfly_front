"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from 'sonner'
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";


export const SocialMedia = ({clinic}: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
      
  const FormSchema = z.object({
    instagram: z
    .string(),
    twitter: z
    .string(),
    linkedin: z
    .string(),
    facebook: z
    .string()
})


const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    instagram: "",
    twitter: "",
    linkedin: "",
    facebook: ""
  },
})

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {

        const data = {
            data: {
              Name: clinic?.Name,
              Address: clinic?.Address ,
              Phone: clinic?.Phone ,
              Email: clinic?.Email,
              Website: clinic?.Website ,
              StartTime: clinic?.StartTime ,
              EndTime: clinic?.EndTime ,
              Password: clinic?.Password ,
              Info: clinic?.Info ,
              ServiceInfo: clinic?.ServiceInfo ,
              Instagram: values.instagram,
              Twitter: values.twitter,
              Linkedin: values.linkedin,
              Facebook: values.facebook,
            }
        }

        await GlobalApi.updateClinic(clinic?.documentId,data).then(resp=>{
            if(resp){
              GlobalApi.getUpdateClinic(clinic?.documentId).then(respdata=>{
              localStorage.setItem("clinic", JSON.stringify(respdata.data.data))
              toast("Social Media added Successfully!!!")
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


  return (
    <div className='flex-1 pt-10 md:mr-[2rem] lg:mr-[2rem] sm:mr-[2rem] pb-[4rem]'>
        <h1 className='flex justify-center pb-8 text-black font-bold items-center'>Add & Update Social Media Links</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
            <div className="lg:flex lg:gap-5 md:flex md:gap-5">
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="instagram"
            label="Instagram"
            placeholder={ clinic ? clinic?.Instagram : "Instagram address link"}
            iconSrc="/assets/icons/instagram.png"
            iconAlt="user"
            />

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="twitter"
            label="Twitter"
            placeholder={clinic ? clinic?.Twitter : "Twitter address link"}
            iconSrc="/assets/icons/twitter.png"
            iconAlt="email"
            />
            </div>
            <div className="lg:flex lg:gap-5 md:flex md:gap-5">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="linkedin"
                label="Linkedin"
                placeholder={clinic ? clinic?.Linkedin : "Linkedin address link"}
                iconSrc="/assets/icons/linkedin.png"
                iconAlt="phone"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="facebook"
                label="Facebook"
                placeholder={clinic ? clinic?.Facebook : "Facebook address link"}
                iconSrc="/assets/icons/facebook.png"
                iconAlt="user"
            />
            </div>
            <SubmitButton isLoading={isLoading}>Add or Update</SubmitButton>
        </form>
        </Form>
    </div>
  );
};