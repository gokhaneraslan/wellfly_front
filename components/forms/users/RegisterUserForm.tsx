"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { RegisterFormValidation } from "@/lib/validation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from 'sonner'
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";

export const RegisterUserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Full Name"
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
          name="password"
          label="Password"
          placeholder="Ab123456"
          iconSrc="/assets/icons/key.png"
          iconAlt="phone"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};