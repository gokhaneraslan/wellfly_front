"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import ClinicDetail from '../_components/ClinicDetail'
import ClinicSuggetionList from '../_components/ClinicSuggestionList'
import Header from '@/app/_components/Header'

function Details({params}:any) {

  const [clinic, setClinic] = useState([])

  const getClinicById = () => {
    GlobalApi.getUpdateClinic(params.recordId).then(resp => {
      setClinic(resp.data.data)
    })
  }

  useEffect(() => {
    getClinicById()
  },[]) 


  return (
    <div>
      <Header />
    <div className='p-5 md:px-20 bg-white text-black'>
      <h2 className='font-bold text-[22px]' > Details </h2>
      <div className='grid grid-cols-1 lg:grid-cols-3'>
        {/* clinic Details */}
        <div className='col-span-2'>
          { clinic && <ClinicDetail clinic={clinic} />}
        </div>
        {/* clinic Suggestion */}
        <div>
          <ClinicSuggetionList />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Details