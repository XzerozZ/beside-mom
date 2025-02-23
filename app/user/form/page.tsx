import React from 'react'
import Navbar from '../component/navbar'
import FormComponent from '../component/form'

const page = () => {
  return (
    <div className="flex flex-col">
    <header className="fixed top-0 left-0 w-full">
      <Navbar />
    </header>
    <main className="mt-[112px] max-sm:mt-[112px]">
     <div className="">
     <div className="flex flex-col items-center gap-[30px]">
        <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
        การตรวจตามนัด
        </h1>
       
        <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
        <h2 className='font-bold text-[16px] text-left'>การนัดหมายครั้งถัดไป</h2>
        <FormComponent/>
        </div>
      </div>
    
      
     </div>
    </main>
  </div>
  )
}

export default page