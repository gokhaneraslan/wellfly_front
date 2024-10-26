"use client"
import React, {useEffect, useState} from 'react'
import {Dialog, DialogClose, DialogContent, DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger, } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { CalendarDays, Clock } from 'lucide-react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Toaster } from "@/components/ui/sonner"
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

const BookAppointment = ({clinic}: any) => {
    const router = useRouter();
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [timeSlot, setTimeSlot] = useState([])
    const [selectedTimeSlot, setSelectedTimeSlot] = useState([])
    const [note, setNote] = useState("")

    const [respUser, setRespUser] = useState<any | null>(null);
    const [user, setUser] = useState<any | null>(null)

  
    const getUser = () => {
  
      if(localStorage.getItem("user")){
        setRespUser(localStorage.getItem("user"))
      }
      setUser(JSON.parse(respUser))
    }

    useEffect(() => {
      getUser()
    },[respUser])


    const getTime = () => {
        const timeList:any = [];
        for (let i=10; i<=12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i=1; i<=6; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        setTimeSlot(timeList)
    }

    const saveBooking = () => {
        const data = {
            data: {
                Name: user?.Username,
                Email: user?.Email,
                Date: date,
                Time: selectedTimeSlot,
                clinic: clinic.documentId,
                Note: note
            }
        }


        GlobalApi.bookAppointment(data).then(resp=>{
            if(resp){
                toast("Booking Completed.")
            }
        })
    }
    
    const BookLogOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("clinic")
        router.push('/login')
    }

    const isPastDay = (day:any) => {
        return day <= new Date()
    }

    useEffect(() => {
        getTime()
    },[])

  return (
    <div>
        <Dialog>
            {user ? <DialogTrigger><Button className="mt-3 rounded-full w-[15rem] bg-light-200 text-black hover:font-bold hover:bg-dark-500 "> Book Appointment </Button></DialogTrigger> 
             :  <Button className='mt-3 rounded-full w-[15rem] bg-light-200 text-black hover:font-bold hover:bg-dark-700' 
             onClick={BookLogOut}>Book Appointment</Button>}
            <DialogContent className="bg-blue-600 text-white overflow-scroll remove-scrollbar h-[38rem]
            md:min-w-[43rem] lg:min-w-[43rem] sm:h-[33rem] md:h-[33rem] lg:h-[33rem]">
            <DialogHeader className="flex items-center">
                <DialogTitle>Book Appointment</DialogTitle>
                <DialogDescription>
                    <div>
                        <div className='grid grid-cols-1 mt-5 md:grid-cols-2'>
                            { /* Calendar */} 
                            <div className='flex flex-col gap-3 items-baseline'>
                                <h2 className='flex gap-2 items-center'>
                                    <CalendarDays className='text-white w-5 h-5'/>
                                    Select Date
                                </h2>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    disabled={isPastDay}
                                    onSelect={setDate}
                                    classNames={{day_selected: "bg-white text-black font-[800]", 
                                        day_today:"bg-blue-100 text-black"}}
                                    className="rounded-md border w-[20rem] pl-7 sm:w-full sm:pl-5 md:w-[18rem] md:pl-2 lg:w-[18rem] lg:pl-2"
                                    />
                            </div>
                            { /* Time */}
                            <div className='mt-3 md:mt-0'>
                                <h2 className='flex gap-2 mb-3 items-center'>
                                    <Clock className='text-white w-5 h-5'/>
                                    Select Time
                                </h2>
                                <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                                    {timeSlot?.map((item:any,index:any) => (
                                        <h2 key={index}
                                        onClick={() => setSelectedTimeSlot(item.time)}
                                        className={`p-2 border text-center hover:bg-white hover:text-black text-[12px] w-[5rem] hover:font-bold cursor-pointer
                                         rounded-full ${item.time === selectedTimeSlot&& 'bg-white font-bold text-black '} `}> {item.time} </h2>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </DialogDescription>
                
            </DialogHeader>
            <DialogFooter className="flex flex-col md:flex-row lg:flex-row justify-center items-end md:px-5 lg:px-5 sm:pr-[50px]">
                <DialogClose asChild>
                    <>
                        <Textarea className='bg-dark-300 w-[20rem] sm:mr-5 lg:w-[27rem] md:w-[27rem] text-white min-h-[2rem]' value={note} onChange={e => setNote(e.target.value)}/>
                        <Button className='w-[8rem] mt-4 sm:mr-8 shad-danger-btn' type="submit" disabled={!(date && selectedTimeSlot)}
                        onClick={() => saveBooking()} >
                            Submit
                        </Button>
                    </>
                </DialogClose>
            </DialogFooter>
            </DialogContent>
        </Dialog>

  </div>
  )
}

export default BookAppointment