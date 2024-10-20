"use client"
import React from 'react'
import CategoryList from './_components/CategoryList'
import Header from '@/app/_components/Header'

function layout({children}: any) {

  return (
    <div>
      <Header />
    <div className='grid grid-cols-3 bg-white'>
      <div className=' md:block' >
        {/*Category */}
        <CategoryList/>
      </div>
      <div className='col-span-4 ml-[8.5rem] xs:col-span-3'>
        {children}
      </div>
    </div>
    </div>
  )
}

export default layout