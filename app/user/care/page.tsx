import React from "react";
import Navbar from "../component/navbar";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import { Card } from "../component/card";

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
              การดูแลทารก
            </h1>
            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px] flex flex-col gap-[40px]">
              <div className="flex flex-row gap-[20px] bg-[#FFF4F4] p-[67px]">
                <div className="flex flex-col gap-[32px]  w-2/5 justify-center">
                  <h1 className="text-right font-bold text-[20px] text-[#B36868]">
                    แนะนำ
                  </h1>
                  <div className="flex flex-col gap-[20px]">
                    <h2 className="text-right font-bold text-[20px]">
                      10 วิธีป้องกันอุบัติเหตุในบ้าน สำหรับเด็กเล็ก
                    </h2>
                    <h3 className="text-right text-[16px] ">
                      บ้านนับเป็นที่ที่ปลอดภัยที่สุดสำหรับทุกคนในครอบครัว
                      แต่สำหรับเด็ก ๆ โดยเฉพาะเด็กเล็ก ๆ แล้ว สิ่งของ
                      เฟอร์นิเจอร์ ของใช้ต่าง ๆ ภายในบ้าน
                      ก่อให้เกิดอุบัติเหตุเป็นอันตรายอาจทำให้ลูกๆของเราบาดเจ็บตั้งแต่
                      เล็กน้อย จนถึงรุนแรง
                      และอาจเสียชีวิตได้ทุกเมื่ออุบัติเหตุในบ้าน มีอะไรบ้าง
                    </h3>
                    <div className="flex flex-row justify-end gap-[5px]">
                      <h1 className="text-[14px] font-bold">ดูเพิ่มเติม</h1>
                      <Image
                        src="/nexticon.svg"
                        alt="next"
                        width={8}
                        height={20}
                      ></Image>
                    </div>
                  </div>
                </div>
                <div className="w-3/5">
                  <Image
                    src="/baby.png"
                    alt="baby"
                    layout="responsive"
                    width={500}
                    height={500}
                  ></Image>
                </div>
              </div>
              <div className="w-full flex  justify-center">
                <div className="flex flex-row gap-[20px] justify-between w-[500px] ">
                  <div className="bg-white border border-[#B36868] rounded-[4px] py-[8px] px-[16px]  w-full flex flex-row justify-between">
                    <h1 className="text-[16px] text-[#B36868] ">กรองโดย</h1>
                    <FaAngleDown className="text-[#B36868] my-auto" />
                  </div>
                  <div className="bg-white border border-[#B36868] rounded-[4px] py-[8px] px-[16px]  w-full flex flex-row justify-between">
                    <h1 className="text-[16px] text-[#B36868] ">กรองโดย</h1>
                    <Image
                      src="/filter.svg"
                      alt="filter"
                      width={16}
                      height={16}
                    ></Image>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-[40px] max-xl:hidden max-sm:grid max-sm:grid-cols-1">
                <Card
                  title="เรื่องของแม่ที่ต้องพูด....."
                  textSize="text-[16px]"
                />
                <Card
                  title="เรื่องของแม่ที่ต้องพูด....."
                  textSize="text-[16px]"
                />
                <Card
                  title="เรื่องของแม่ที่ต้องพูด....."
                  textSize="text-[16px]"
                />
                <Card
                  title="เรื่องของแม่ที่ต้องพูด....."
                  textSize="text-[16px]"
                />
                <Card
                  title="เรื่องของแม่ที่ต้องพูด....."
                  textSize="text-[16px]"
                />
              </div>
              <div className="flex justify-between mt-[40px]">
                <button className="px-[16px] py-[8px] text-white">
                 <Image src="/left.svg" alt="left" width={8} height={8}></Image>
                </button>
                <div>
                <button className="px-[16px] py-[8px] text-[16px] text-[#4D4D4D] rounded-[4px]  border-b">
                  1
                </button>
                <button className="px-[16px] py-[8px] text-[16px] text-[#999999] rounded-[4px] mx-[4px]">
                  2
                </button>
                <button className="px-[16px] py-[8px] text-[16px] text-[#999999] rounded-[4px] mx-[4px]">
                  3
                </button>
                </div>
                <button className="px-[16px] py-[8px] text-white">
                 <Image src="/right.svg" alt="left" width={8} height={8}></Image>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
