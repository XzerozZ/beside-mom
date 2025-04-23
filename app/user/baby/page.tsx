import React from "react";
import Navbar from "../component/navbar";
import CalendarCard from "../component/calendarcard";
import Image from "next/image";
import { BabyCard } from "../component/babycard";

const page = () => {
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
        <div className="flex flex-col items-center gap-[30px] ">
          <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
            ข้อมูลคุณแม่
          </h1>

          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] gap-8 flex flex-col">
            <div className="flex flex-row gap-[64px] max-md:flex-col max-md:gap-0">
              <div className="w-44 h-44 rounded-full overflow-hidden flex-none max-md:mx-auto  max-md:mb-6">
                <Image
                  src="/baby.png"
                  alt="Description of the image"
                  width={176}
                  height={176}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between pb-4 max-md:gap-6">
                <div className="flex flex-row justify-between max-md:flex-col max-md:gap-6">
                  <div className="w-1/2">
                    <h3>ID</h3>
                    <h4>65090500411</h4>
                  </div>
                  <div className="w-1/2">
                    <h3>อีเมล</h3>
                    <h4>Hellomama@gmail.com</h4>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="w-1/2">
                    <h3>ชื่อ</h3>
                    <h4>ณัชพล</h4>
                  </div>
                  <div className="w-1/2">
                    <h3>นามสกุล</h3>
                    <h4>พลแหลม</h4>
                  </div>
                </div>
              </div>
            </div>
            <hr className="" />
            <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
              ข้อมูลทารกทั้งหมด
            </h1>
            <div className="grid grid-cols-4 max-xl:grid-cols-3 gap-[40px] max-md:grid-cols-1 justify-items-center">
              <BabyCard title="แบบประเมินพัฒนาการ" textSize="text-[16px]" />
              <BabyCard title="แบบประเมินพัฒนาการ" textSize="text-[16px]" />
              <BabyCard title="แบบประเมินพัฒนาการ" textSize="text-[16px]" />
              <BabyCard title="แบบประเมินพัฒนาการ" textSize="text-[16px]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
