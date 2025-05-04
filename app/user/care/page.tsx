"use client";
import React, { use, useEffect } from "react";
import Navbar from "../component/navbar";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import { Card, CardCare } from "../component/card";
import { CareItem } from "@/app/interface";

const page = () => {
  const token = localStorage.getItem("key");
  const [care, setCare] = React.useState<CareItem[]>();
  const fetchCare = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:5000/care`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      setCare(data.result);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };
  useEffect(() => {
    fetchCare(token!);
  }, []);

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
                      {care?.[0]?.title}
                    </h2>
                    <h3 className="text-right text-[16px] ">
                     {care?.[0]?.desc}
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
                    src={care?.[0]?.banner || "/baby.png"}
                    alt="baby"
                    layout="responsive"
                    width={500}
                    height={500}
                  ></Image>
                </div>
              </div>
             
              <div className="grid grid-cols-4 gap-[40px] max-xl:hidden max-sm:grid max-sm:grid-cols-1">
                {care?.map((item) => (
                  <div key={item.c_id} className="flex flex-col gap-[20px]">
                    <CardCare
                      {...item}
                    />
                  </div>
                ))}
              </div>
              {/* <div className="flex justify-between mt-[40px]">
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
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
