import React from 'react'
import Image from 'next/image'

const FormCard = () => {
  return (
     <div className="flex p-[20px] gap-[80px] border border-[#cccccc] rounded-[8px] max-sm:gap-6">
         <div>
           <Image src="/baby.png" alt="baby" width={300} height={300}></Image>
         </div>
         <div className="flex flex-col gap-[16px]">
           <h1 className="font-bold text-[20px] text-[#4d4d4d]">
             ช่วงอายุ: 3 - 4 เดือน
           </h1>
           <div className="flex gap-[10px]">
           <div className="flex flex-col gap-[5px]">
               <h2 className="font-bold text-[16px] text-[#4d4d4d]">
                 สถานะการประเมิน:
               </h2>
               <h2 className="font-bold text-[16px] text-[#4d4d4d]">
                 ผลการประเมิน:
               </h2>
              
             </div>
             <div>
               <div className="flex flex-col gap-[5px]">
                 <div className="flex gap-[5px]">
                   <Image src="/time.svg" alt="baby" width={20} height={20}></Image>
                   <h2 className=" text-[16px] text-[#4d4d4d]">รอการประเมิน</h2>
                 </div>
                 <div className="flex gap-[5px]">
                   <Image src="/time.svg" alt="baby" width={20} height={20}></Image>
                   <h2 className=" text-[16px] text-[#4d4d4d]">รอการประเมิน</h2>
                 </div>
   
        
               </div>
             </div>
           </div>
         </div>
       </div>
  )
}

export default FormCard