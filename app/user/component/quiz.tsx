import React from "react";
import Image from "next/image";
import { ButtonComponents6Size, ButtonComponents5Size } from "./button";
import { Quiz, QuizHistory } from "@/app/interface";
import Link from "next/link";

const QuizForm: React.FC<{ props: Quiz[]; param: string ,navigate: string,history: Quiz[] }> = ({
  props,
  param,
    navigate,
    history
}) => {
    console.log("thisis ",props);
    // const isAnswered = history[Number(param)-1]?.answer;
    
  return (
    <div>
      <div className="flex p-[20px] gap-[80px] max-sm:flex-col max-sm:gap-8">
        <div>
          <Image src="/baby.png" alt="baby" width={300} height={300}></Image>
        </div>
        <div className="flex flex-col gap-[16px]">
          <h1 className="font-bold text-[20px] text-[#4d4d4d]">
            {props[0]?.quiz_id}.{props[0]?.question}
          </h1>
          <h3 className="font-bold text-[16px] text-[#4d4d4d]">
            {props[0]?.desc}
            ผลลัพธ์ที่ควรเกิดขึ้น: {props[0]?.solution}
            คำแนะน: {props[0].suggestion}
          </h3>
          <div className="flex gap-[10px]">
            <div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex gap-4 flex-col">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="true"
                      value="true"
                      className="accent-[#B36868]"
                    //   defaultChecked={isAnswered === true}
                    //   disabled={isAnswered === true}
                    />
                    ผ่าน
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="true"
                      value="true"
                      className="accent-[#B36868]"
                    //   disabled={isAnswered === true}
                    />
                    ไม่ผ่าน
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props[0]?.quiz_id === Number(param) ? (
        <div className="flex flex-row gap-[16px] justify-between max-sm:gap-3 max-sm:flex-col-reverse">
        
          <Link href={`${props[0]?.quiz_id - 1}`}>
            <ButtonComponents6Size
              title="ย้อนกลับ"
              textSize="text-[16px]"
              boxSize="w-[180px] max-sm:w-full"
            />
          </Link>
          <Link href={`/user/form/${navigate}`}>
          <ButtonComponents5Size
            title="ส่งคำตอบ"
            textSize="text-[16px]"
            boxSize="w-[180px] max-sm:w-full"
          />
            </Link>
        </div>
        
      ) : props[0]?.quiz_id === 1 ? (
        <div className="flex flex-row gap-[16px] justify-end max-sm:gap-3 max-sm:flex-col-reverse">
          <Link href={`${props[0]?.quiz_id + 1}`}>
            <ButtonComponents5Size
              title="ต่อไป"
              textSize="text-[16px]"
              boxSize="w-[180px] max-sm:w-full"
            />
          </Link>
        </div>
      ) : (
        <div className="flex flex-row gap-[16px] justify-between max-sm:gap-3 max-sm:flex-col-reverse">
          <Link href={`${props[0]?.quiz_id - 1}`}>
            <ButtonComponents6Size
              title="ย้อนกลับ"
              textSize="text-[16px]"
              boxSize="w-[180px] max-sm:w-full"
            />
          </Link>
          <Link href={`${props[0]?.quiz_id + 1}`}>
            <ButtonComponents5Size
              title="ต่อไป"
              textSize="text-[16px]"
              boxSize="w-[180px] max-sm:w-full"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizForm;
