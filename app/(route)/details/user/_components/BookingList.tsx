import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin } from 'lucide-react'
import moment from 'moment/moment'
import Image from 'next/image'
import React from 'react'
import CancelAppointment from './CancelAppointment'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

const BookingList = ({bookingList, expired, updateRecord, clinic}:any) => {

    const onDeleteBooking = (item:any) => {
        GlobalApi.deleteBooking(item.documentId).then(resp => {
            if(resp){
                toast("Booking Delete Successfully!")
                updateRecord()
            }
        })
    }


  return (
    <div className='bg-white text-black'>
        {bookingList ? bookingList.lenght > 0 ? bookingList.map((item:any,index:any) => (
            <div key={index} className='flex gap-4 items-center border p-5 mt-3 rounded-lg'>
                <Image src={ clinic ? clinic?.Image[0]?.url : "/user.png"} 
                alt='doctor-image' width={70} height={70}
                className='rounded-full w-[70px] h-[70px] object-cover' />
                <div className='flex flex-col gap-2 w-full'>
                    <h2 className='font-bold text-[18px] text-black flex items-center justify-between'> {item?.clinic?.Name} 
                        {!expired && <CancelAppointment onContinueClick={() => onDeleteBooking(item)}/>}
                    </h2>
                    <h2 className='flex gap-2 text-dark-500'> <MapPin className='text-primary h-5 w-5'/> {item?.clinic?.Address} </h2>
                    <h2 className='flex gap-2'> <Calendar className='text-primary h-5 w-5'/> Appointment On: {moment(item?.Date).format('DD-MMM-YYYY')} </h2>
                    <h2 className='flex gap-2'> <Clock className='text-primary h-5 w-5'/> At Time: {item?.Time} </h2> 
                </div>
            </div>
            
        )) 
        : <div className='px-5 pt-2'> Kayıt Bulunamadı... </div> :
        [1,2,3].map((item,index) => (
            <div key={index} className='h-[250px] bg-slate-200
            w-[200px] rounded-lg animate-pulse ml-5 '>
            
            </div>
        ))
    }
    </div>
  )
}

export default BookingList