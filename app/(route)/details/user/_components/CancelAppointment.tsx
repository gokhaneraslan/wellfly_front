import React from 'react'
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
  

const CancelAppointment = ({onContinueClick}:any) => {


  return (
    <div>
        <AlertDialog>
        <AlertDialogTrigger>
            <Button className="text-primary hover:bg-light-200 border-primary ml-0 sm:ml-0 md:ml-0 lg:ml-24 md:mt-4 lg:mt-4" variant='outline'>Cancel Appointment</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='bg-dark-300 text-white'>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your appointment
                and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onContinueClick()} >Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default CancelAppointment