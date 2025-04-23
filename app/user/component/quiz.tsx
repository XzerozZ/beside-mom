import React from 'react'
import Image from 'next/image'
import { ButtonComponents6Size, ButtonComponents5Size } from './button'

interface QuizProps {
    param: number;
}

const Quiz: React.FC<QuizProps> = ({ param }) => {
    return (
        <div>
                 <div className="flex p-[20px] gap-[80px] max-sm:flex-col max-sm:gap-8">
                 <div>
                     <Image src="/baby.png" alt="baby" width={300} height={300}></Image>
                 </div>
                 <div className="flex flex-col gap-[16px]">
                     <h1 className="font-bold text-[20px] text-[#4d4d4d]">
                    1. ขยับเคลื่อนไหวแขนขา 2 ข้างเท่ากัน
                     </h1>
                     <h3 className="font-bold text-[16px] text-[#4d4d4d]">
                     วางเด็กในท่านอนหงาย สังเกตการเคลื่อนไหวแขนขาของเด็ก
                     ผลลัพธ์ที่ควรเกิดขึ้น: เด็กสามารถเคลื่อนไหวแขน ขาได้อย่างสมดุลทั้งสองข้าง
                     </h3>
                     <div className="flex gap-[10px]">
                 
                         <div>
                             <div className="flex flex-col gap-[5px]">
                             <div className="flex gap-4 flex-col">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                        
                                            className="accent-[#B36868]"
                                        />
                                        ชาย
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                        
                                            className="accent-[#B36868]"
                                        />
                                        หญิง
                                    </label>
                                </div>
                
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
            {
                param === 1 ? <div className='flex flex-row gap-[16px] justify-end  max-sm:gap-3 max-sm:flex-col-reverse'>
                <ButtonComponents5Size title="ต่อไป" textSize="text-[16px]" boxSize='w-[180px]  max-sm:w-full'/>
                
             </div> :  <div className='flex flex-row gap-[16px] justify-between  max-sm:gap-3 max-sm:flex-col-reverse'>
                <ButtonComponents6Size title="ย้อนกลับ" textSize="text-[16px]" boxSize='w-[180px] max-sm:w-full' />
                <ButtonComponents5Size title="ต่อไป" textSize="text-[16px]" boxSize='w-[180px]  max-sm:w-full'/>
                
             </div>
            }
        </div>
    )
}

export default Quiz