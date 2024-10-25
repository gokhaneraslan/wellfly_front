"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { HeartIcon, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import * as z from "zod"
import { cn } from "@/lib/utils"


const formSchema = z.object({
    location: z.string()
    .min(2, {message: "Lütfen en az 2 karakter girin"})
    .max(50, {message: "Lütfen en fazla 50 karakter girin"}),
    dates: z.object({
      from: z.date(),
      to: z.date()
    }),
    category: z.string()
      .min(1, {message: "Lütfen en az 1 kategori seçin"}),
    service: z.string()
      .min(1, {message: "Lütfen en az 1 hizmet seçin"}),
  
  })

const Hero = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        location: "",
        dates: {
          from: undefined,
          to: undefined
        },
        category: "",
        service: ""
      },
    })
  
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }
  


  return (
    <section className='bg-[#013B94]'>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-20 lg:py-16">
            <div className="px-8 pb-8">
                <h2 className="text-3xl font-bold sm:text-4xl">Holiday and health tourism 
                    <span className='text-primary'> appointment</span> platform
                </h2>
                <p className="mt-4 text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div>
                
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto
          items-center justify-center space-x-0 space-y-4 lg:space-y-0 rounded-lg">
          <div className="grid w-full lg:max-w-sm items-center gap-1.5">
            <FormField control={form.control} name="location" 
              render={({field}) => (
                <FormItem className=" rounded-l-xl p-3">
                  <FormLabel className="text-white pl-3 flex">
                    Şehir
                    <HeartIcon className="ml-2 h-4 w-4 text-white"/>
                  </FormLabel>
                  <FormMessage className="text-red-500"/>
                  <FormControl>
                    <Input className="bg-white text-black rounded-xl" placeholder="İstanbul,Türkiye" {...field} />
                  </FormControl>
                </FormItem>
              )}/>
          </div>
          <div className="grid w-full lg:max-w-sm flex-1 items-center gap-1.5">
            <FormField control={form.control} name="dates" 
                render={({field}) => (
                  <FormItem className="flex flex-col p-3">
                    <FormLabel className="text-white flex pl-3 gap-2">
                      Tarih
                      <CalendarIcon className="ml-2 h-4 w-4 text-white"/>
                    </FormLabel>
                    <FormMessage className="text-red-500"/>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button id="date" variant={"outline"} name="dates"
                            className={cn("w-full lg:w-[300px] bg-white text-black rounded-xl hover:bg-white justify-start text-left font-normal", 
                              !field.value.from && "text-muted-foreground")}>
                            <CalendarIcon className="mr-3 h-4 w-4 text-black opacity-50" />
                              {field.value?.from ? (
                                field.value?.to ? (
                                  <>
                                    {format(field.value?.from, "LLL dd, y")} -{" "}
                                    {format(field.value?.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(field.value?.from, "LLL dd, y")
                                )
                              ) : (
                                <span className='text-black opacity-70'>Tarih seç</span>
                              )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 text-black bg-white"align="start">
                        <Calendar 
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        />
                    </PopoverContent>
                    </Popover>
                  </FormItem>
                )}/>
          </div>
          <div className="flex w-full items-center lg:flex-row">
            <div className="grid items-center flex-1">
              <FormField control={form.control} name="category" 
                render={({field}) => (
                  <FormItem className="flex flex-col p-[13px]">
                    <FormLabel className="text-white flex pl-3 gap-2">
                      Kategoriler
                    </FormLabel>
                    <FormMessage className="text-red-500"/>
                    <FormControl>
                      <Input className="bg-white text-black lg:w-[200px] rounded-xl" placeholder="Saç Ekimi" {...field} />
                    </FormControl>
                  </FormItem>
              )}/>
            </div>
            <div className="grid items-center flex-1">
              <FormField control={form.control} name="service" 
                render={({field}) => (
                  <FormItem className="flex flex-col p-[13px]">
                    <FormLabel className="text-white flex pl-3 gap-2">
                      Hizmetler
                    </FormLabel>
                    <FormMessage className="text-red-500"/>
                    <FormControl>
                      <Input className="bg-white text-black rounded-xl lg:w-[180px]" placeholder="Fue Saç Ekimi" {...field} />
                    </FormControl>
                  </FormItem>
              )}/>
            </div>
            <div className=" bg-blue-700 mb-3 mt-auto rounded-xl flex justify-center items-center">
              <Button type="submit" className=" md:w-28 hover:bg-blue-800 text-white rounded-xl">
                Ara
              </Button>
            </div>
          </div>
             </form>
              </Form>
            </div>
        </div>
    </section>
  )
}

export default Hero