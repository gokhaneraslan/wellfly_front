"use client"

import GlobalApi from '@/app/_utils/GlobalApi'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import { FileUploader } from '@/components/FileUploader'
import SubmitButton from '@/components/SubmitButton'
import { Form, FormControl } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const AddFile = ({clinic}: any) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const FormSchema = z.object({
        pictureFile: z
        .any(),
    })


    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (value: z.infer<typeof FormSchema>) => {

      const formData = new FormData();
      for (let i = 0; i < value.pictureFile.length; i++) {
        formData.append("files", value.pictureFile[i], value.pictureFile[i].name);
      }
      
      try {
        
        const dataResponse: any = await GlobalApi.uploadFile(formData)
        let imageID: any = []
        for (let i = 0; i < dataResponse.data.length; i++) {
          imageID.push(dataResponse.data[i].id);
        }

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
            Image: imageID
          }
        }
        
        await GlobalApi.updateClinic(clinic.documentId,data).then(resp=>{
          if(resp){
            GlobalApi.getUpdateClinic(clinic.documentId).then(respdata=>{
            localStorage.setItem("clinic", JSON.stringify(respdata.data.data))
            toast("Files Uploaded Successfully!!!")
            window.location.reload()
            })
          }
          else{
            toast("Something Went Wrong!!!")
          }
        })
    
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }

    }

  return (
    <div className='flex-1 mr-[2rem] pb-10'>
        <h1 className='flex justify-center pb-2 mb-8 text-black font-bold items-center'>Add Photograph</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="pictureFile"
                    label="Add visual to promote your clinic"
                    renderSkeleton={(field) => (
                    <FormControl>
                        <FileUploader files={field.value} onChange={field.onChange} />
                    </FormControl>
                    )}
                />
                <SubmitButton isLoading={isLoading}>Upload</SubmitButton>
            </form>
        </Form>
    </div>
  )
}

export default AddFile