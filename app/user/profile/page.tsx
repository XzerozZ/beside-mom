import React from 'react'
import { ButtonComponents } from '../component/button'
import Image from 'next/image'
import Navbar from '../component/navbar'

const page = () => {

   
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[120px]">
        <div className="">
          <div className="flex flex-col items-center gap-[30px]">
           
              <div className="  flex-col justify-between h-full xl:hidden text-[20px] text-left max-xl:w-[770px]  max-sm:w-[324px]">
                            <div className="flex flex-row justify-between ">
                              <h1 className="font-bold">โปรไฟล์</h1>
                             
                            </div>
                            <div className='flex flex-col gap-[40px] mt-[40px]'>
                            <div className="flex flex-col gap-[24px] mx-auto w-[180px]">
                              <Image
                                src="/profilepicture.png"
                                width={96}
                                height={96}
                                alt="profilepicture"
                                className='mx-auto'
                              ></Image>
                              <h1 className="font-bold text-[16px] text-center">ชิณภัทร สุขทอง</h1>
                              <ButtonComponents title="แก้ไขโปรไฟล์" textSize="text-[14px]" />
                               
                            </div>
            
                        
                            </div>
                            <div className='mt-[40px]'>
                              <h1 className="font-bold text-[16px] text-[#B36868] text-center">
                                ออกจากระบบ
                              </h1>
                            </div>
                          </div>
          
          </div>
        </div>
      </main>
    </div>
                    
  )
}

export default page