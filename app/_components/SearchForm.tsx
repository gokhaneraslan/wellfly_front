"use client"
 
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
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

const SearchForm = () => {

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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto
          items-center justify-center space-x-0 space-y-4 lg:space-y-0 rounded-lg">
          <div className="grid w-full lg:max-w-sm items-center gap-1.5">
            <FormField control={form.control} name="location" 
              render={({field}) => (
                <FormItem className="border-8 rounded-l-xl border-yellow-500 p-3">
                  <FormLabel className="text-white pl-3 flex">
                    Şehir
                    <HeartIcon className="ml-2 h-4 w-4 text-white"/>
                  </FormLabel>
                  <FormMessage className="text-red-500"/>
                  <FormControl>
                    <Input className="bg-white rounded-xl" placeholder="İstanbul,Türkiye" {...field} />
                  </FormControl>
                </FormItem>
              )}/>
          </div>
          <div className="grid w-full lg:max-w-sm flex-1 items-center gap-1.5">
            <FormField control={form.control} name="dates" 
                render={({field}) => (
                  <FormItem className="flex flex-col border-y-8 border-yellow-500 p-3">
                    <FormLabel className="text-white flex pl-3 gap-2">
                      Tarih
                      <CalendarIcon className="ml-2 h-4 w-4 text-white"/>
                    </FormLabel>
                    <FormMessage className="text-red-500"/>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button id="date" variant={"outline"} name="dates"
                            className={cn("w-full lg:w-[300px] bg-white rounded-xl hover:bg-white justify-start text-left font-normal", 
                              !field.value.from && "text-muted-foreground")}>
                            <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
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
                                <span>Tarih seç</span>
                              )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white"align="start">
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
                  <FormItem className="flex flex-col border-8 border-yellow-500 p-[13px]">
                    <FormLabel className="text-white flex pl-3 gap-2">
                      Kategoriler
                    </FormLabel>
                    <FormMessage className="text-red-500"/>
                    <FormControl>
                      <Input className="bg-white lg:w-[180px] rounded-xl" placeholder="Saç Ekimi" {...field} />
                    </FormControl>
                  </FormItem>
              )}/>
            </div>
            <div className="grid items-center flex-1">
              <FormField control={form.control} name="service" 
                render={({field}) => (
                  <FormItem className="flex flex-col border-y-8 border-r-8 border-yellow-500 p-[13px]">
                    <FormLabel className="text-white flex pl-3 gap-2">
                      Hizmetler
                    </FormLabel>
                    <FormMessage className="text-red-500"/>
                    <FormControl>
                      <Input className="bg-white rounded-xl lg:w-[170px]" placeholder="Fue Saç Ekimi" {...field} />
                    </FormControl>
                  </FormItem>
              )}/>
            </div>
            <div className="h-[6.5rem] rounded-r-xl flex justify-center items-center bg-blue-600 border-t-8
             border-b-8 border-r-8 border-yellow-500 p-[13px]">
              <Button type="submit" className="bg-blue-600 w-28 mt-2 h-12 hover:bg-blue-700 text-white rounded-xl">
                Ara
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SearchForm