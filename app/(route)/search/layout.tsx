"use client"
import React from 'react'
import CategoryList from './_components/CategoryList'
import Header from '@/app/_components/Header'

function layout({children}: any) {

  return (
    <div>
      <Header />
      <div className='flex flex-col bg-white xs:flex-col 
          sm:flex-row md:flex-row lg:flex-row'>
        <div className='md:block'>
          {/*Category */}
          <CategoryList/>
        </div>
        <div>
          {children}
        </div>
    </div>
    </div>
  )
}

export default layout