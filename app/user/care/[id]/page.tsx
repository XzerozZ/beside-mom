import React from 'react'
import Navbar from '@/app/user/component/navbar'
import Image from 'next/image'


const page = () => {
  return (
    <div className="flex flex-col">
    <header className="fixed top-0 left-0 w-full">
      <Navbar />
    </header>
    <main className="mt-[160px] max-sm:mt-[112px]">
      <div className="">
        <div className="flex flex-col items-center gap-[30px]">
          <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
            การดูแลทารก
          </h1>
          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px] flex flex-col gap-[40px]">
       
         
           
          </div>
        </div>
      </div>
    </main>
  </div>
  )
}

export default page