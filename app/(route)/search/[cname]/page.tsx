"use client"

import ClinicList from '@/app/_components/ClinicList'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

const Search = ({params}: any) => {

  const [clinicList, setClinicList] = useState([])

  const getClinics = () => {
    GlobalApi.getClinicByCategory(params.cname).then(resp => {
      setClinicList(resp.data.data)
    })
  }

  useEffect(() => {
    getClinics()
  },[])

  return (
    <div className='pl-28'>
      <ClinicList heading={params.cname} clinicList={clinicList} />
    </div>
  )
}

export default Search