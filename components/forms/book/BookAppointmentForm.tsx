"use client"
import React, {useEffect, useState} from 'react'
import { DialogClose, DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { CalendarDays, Clock } from 'lucide-react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'


const BookAppointmentForm = ({user, clinic}: any) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [timeSlot, setTimeSlot] = useState([])
    const [selectedTimeSlot, setSelectedTimeSlot] = useState([])
    const [note, setNote] = useState("")


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
                Name: user.attributes?.Username,
                Email: user.attributes?.Email,
                Date: date,
                Time: selectedTimeSlot,
                clinic: clinic.id,
                Note: note
            }
        }


        GlobalApi.bookAppointment(data).then(resp=>{
            if(resp){
                toast("Booking Completed.")
            }
        })
    }
    
    const isPastDay = (day:any) => {
        return day <= new Date()
    }

    useEffect(() => {
        getTime()
    },[])

  return (
    <div>
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
                            classNames={{day_selected: "bg-white text-black font-[800]", day_today:"bg-blue-100 text-black"}}
                            className="rounded-md border"
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
                                        className={`p-2 border text-center hover:bg-white hover:text-black w-[6rem] hover:font-bold cursor-pointer
                                         rounded-full ${item.time === selectedTimeSlot&& 'bg-white font-bold text-black '} `}> {item.time} </h2>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </DialogDescription>
                
            </DialogHeader>
            <DialogFooter className="sm:justify-end px-10">
                <DialogClose asChild>
                    <>
                        <Textarea className='bg-dark-300 w-[27rem] text-white min-h-[2rem]' value={note} onChange={e => setNote(e.target.value)}/>
                        <Button className='w-[8rem] mt-4 shad-danger-btn' type="submit" disabled={!(date && selectedTimeSlot)}
                        onClick={() => saveBooking()} >
                            Submit
                        </Button>
                    </>
                </DialogClose>
    </DialogFooter>
  </div>
  )
}

export default BookAppointmentForm