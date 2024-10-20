"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlobalApi from '@/app/_utils/GlobalApi'
import BookingList from './_components/BookingList'
import { toast } from 'sonner'


const MyBooking = ({user}:any) => {


    const [bookingList, setBookingList] = useState<any | null>(null)
    const [clinic, setClinic] = useState<any | null>(null)

    const getUserBooking = () => {

        try {
            GlobalApi.getUserBookingList(user?.Email).then(resp => {
                setBookingList(resp.data.data)
                GlobalApi.getUpdateClinic(resp?.data?.data[0]?.clinic?.documentId).then(res => {
                    setClinic(res.data.data)
                })
            })
        } catch (error) {
            console.log(error)
        }


    }


    /**
     * Used to Filter User Booking
     * @param {} type 
     * @returns 
     */

    const filterUserBooking = (type:any) => {
    try {
        const result = bookingList?.filter((item: any) => 
           type == 'upcoming' ? new Date(item.Date) >= new Date()
           :
           new Date(item.Date) <= new Date()
        )
        return result
    } catch (error) {
        console.log(error)
    } 
    }


    useEffect(() => {
        user && getUserBooking()
    },[user])

  return (
    <div className='px-4 sm:px-10 mt-10 text-black'>
        <h2 className='font-bold text-2xl'>My Booking</h2>
        <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
            <BookingList bookingList={filterUserBooking('upcoming')} 
            expired = {false} updateRecord={() => getUserBooking()} clinic={clinic}/>
        </TabsContent>
        <TabsContent value="expired">
            <BookingList bookingList={filterUserBooking('expired')} 
            expired = {true} updateRecord={() => getUserBooking()} clinic={clinic}/>
        </TabsContent>
        </Tabs>
    </div>
  )
}

export default MyBooking