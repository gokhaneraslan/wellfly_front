"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { RegisterFormValidation } from "@/lib/validation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from 'sonner'
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/SubmitButton";


export const UpdateUserInfo = ({user} : any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      name: user.Username,
      phone: user.Phone ,
      email: user.Email,
      password: user.Password ,
    },
  });



  const onSubmit = async (values: z.infer<typeof RegisterFormValidation>) => {
    setIsLoading(true);
    try {

      const data = {
          data: {
          Username: values.name,
          Email: values.email,
          Phone: values.phone,
          Password: values.password
        }
      }

    if(user.attributes !== data.data)
        {
          GlobalApi.updateUser(user.id,data).then(resp=>{
            if(resp){
              const localData = {
                id: user.id,
                attributes : {
                  Username: values.name,
                  Email: values.email,
                  Phone: values.phone,
                  Password: values.password
                }
              }
              localStorage.setItem("user", JSON.stringify(localData))
              toast("User Updated Successfully!!!")
              window.location.reload()
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
    GlobalApi.deleteUser(user.id).then(resp=>{
      if(resp){
        localStorage.removeItem("user")
        router.push('/register');
        toast("User Deleted Successfully")
        
      }
    })
  }



  return (
    <div  className="sidebar">
      <h2 className="text-black pl-28 font-bold">User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder={user && user.Username}
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder={user && user.Email}
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder={user && user.Phone}
            iconSrc="/assets/icons/phone.png"
            iconAlt="phone"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            label={user && user.Password}
            placeholder="Ab123456"
            iconSrc="/assets/icons/key.png"
            iconAlt="phone"
          />
          <SubmitButton isLoading={isLoading}>Update Account</SubmitButton>
        </form>
      </Form>
      <Button className="shad-danger-btn mt-3 w-full" onClick={deleteAccount} >Delete Account</Button>
    </div>
  );
};
