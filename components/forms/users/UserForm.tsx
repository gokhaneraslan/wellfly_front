"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";

export const UserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
        
        GlobalApi.getUser(values.email, values.password).then(resp=>{
          if(resp.data?.data?.length > 0){
            localStorage.setItem("user", JSON.stringify(resp.data?.data[0]))
            router.push("/")
          }else{
            GlobalApi.getClinic(values.email, values.password).then(resp=>{
              if(resp.data?.data?.length > 0){
                localStorage.setItem("clinic", JSON.stringify(resp.data?.data[0]))
                router.push("/")
              }else{
                toast("There is no customer with this email or password.")
              }
            })
            
          }
          
        }).catch((res) => {
          if(res){
            toast("There is no user with this email and password.")
          }
        })

    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6 px-10 lg:px-0 md:px-0 sm:px-10">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
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
        <SubmitButton isLoading={isLoading}>Login</SubmitButton>

      </form>
    </Form>
  );
};