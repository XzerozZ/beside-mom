"use client";
import React from "react";

import Image from "next/image";
import Navbar from "@/app/user/component/navbar";
import { ButtonComponents, ButtonComponents3, ButtonComponents4 } from "@/app/user/component/button";

const page = () => {
  const [babyData, setBabyData] = React.useState([
    { date: "02/01/2000", height: 50, weight: 3.5 },
    { date: "02/01/2000", height: 55, weight: 4.0 },
    { date: "02/01/2000", height: 60, weight: 4.5 },
  ]);

  const [showInput, setShowInput] = React.useState(false);
  console.log("babyData", showInput);


  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
        <div className="flex flex-col items-center gap-[30px] ">
          <div className="flex justify-between  w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
            <h1 className="font-bold  text-[20px] text-left ">
              แก้ไข / เพิ่มข้อมูล
            </h1>
            <div className="w-2/12 max-sm:w-1/2">
              <ButtonComponents
                title="เพิ่มข้อมูล"
                textSize="text-[15px] font-bold"
                onClick={() => setShowInput(true)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
              ข้อมูล
            </h3>
            <div className="flex flex-col gap-8">
              {babyData.map((data, index) => (
                <div key={index} className="flex flex-col">
                  <div className="grid grid-cols-[1fr_1fr_1fr] gap-[64px] max-sm:gap-7">
                  <div className="flex flex-row gap-1 max-sm:col-span-3">
                    <div className="flex-none">
                      <h3>{index+1}.</h3>
                    </div>
                     <div className="flex flex-col flex-1">
                     <h3>วันที่</h3>
                      <h4>{data.date}</h4>
                     </div>
                     
                    </div>
                    <div>
                      <h3>ส่วนสูง (ซม.)</h3>
                      <h4>{data.height}</h4>
                    </div>
                    <div>
                      <h3>น้ำหนัก (กก.)</h3>
                      <h4>{data.weight}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {showInput && (
              <div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-[1fr_1fr_1fr] gap-[64px] ">
                    <div className="flex flex-row col-span-3">
                      <div className="flex-none">
                        <h3>{babyData.length + 1}.</h3>
                      </div>
                      <div className="flex flex-col flex-1">
                        <label htmlFor="date">วันที่</label>
                        <input
                          type="text"
                          id="date"
                          name="date"
                          placeholder="MM/DD/YYYY"
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="weight">น้ำหนัก (กก.)</label>
                      <input
                        type="text"
                        id="weight"
                        name="weight"
                        placeholder="16.0"
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="height">ความยาว (ซม.)</label>
                      <input
                        type="text"
                        id="height"
                        name="height"
                        placeholder="60.0"
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 ">
              <div className="w-[180px]">
                <ButtonComponents4
                  title="ยกเลิก"
                  textSize="text-[15px] font-bold"
                    onClick={() => setShowInput(false)}
                />
              </div>
              <div className="w-[180px]">
                <ButtonComponents
                  title="บันทึกข้อมูล"
                  textSize="text-[15px] font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
