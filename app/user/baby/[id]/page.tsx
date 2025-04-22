"use client";
import React, { useState } from "react";

import Image from "next/image";
import Navbar from "../../component/navbar";
import { ButtonComponents } from "../../component/button";
import LengthChart from "../../component/graph/LengthChart";

const page = () => {

   
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
        <div className="flex flex-col items-center gap-[30px] ">
          <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
            ข้อมูลทารก
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
                <div className="grid grid-cols-4 justify-between max-md:flex-col max-md:gap-6 max-sm:grid-cols-1">
                  <div className="w-1/4">
                    <h3>ชื่อ</h3>
                    <h4>ณัชพล</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>นามสกุล</h3>
                    <h4>พลแหลม</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>ชื่อเล่น</h3>
                    <h4>ทู</h4>
                  </div>
                </div>
                <div className="flex flex-row justify-between max-sm:flex-col max-sm:gap-5">
                  <div className="w-1/4">
                    <h3>วันเกิด</h3>
                    <h4>01/02/2000</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>กรุ๊ปเลือด</h3>
                    <h4>B</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>น้ำหนัก (กก.)</h3>
                    <h4>23.1</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>ความยาว (ซม.)</h3>
                    <h4>18.6</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-[72px]">
              <div className="flex flex-row gap-6">
                <h3>เพศ</h3>
                <div className="flex gap-4 flex-col">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      disabled
                      className="accent-[#B36868]"
                    />
                    ชาย
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      defaultChecked
                      className="accent-[#B36868]"
                    />
                    หญิง
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-[16px]">โน๊ต</h3>
                <h4 className="text-[20px]">เด็กมีปานที่หลัง</h4>
              </div>
            </div>
            <hr className="" />
            <div className="w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px] flex justify-between">
              <h1 className="font-bold  text-[20px] text-left w-10/12 my-auto">
                กราฟการเจริญเติบโต
              </h1>
             <div className="w-2/12 max-sm:w-1/2">
             <ButtonComponents title="เพิ่มข้อมูล" textSize="text-[15px] font-bold" />
             </div>
           
            </div>
            <div className="w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px] flex flex-col justify-between">
    <LengthChart />
            </div>

       
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
