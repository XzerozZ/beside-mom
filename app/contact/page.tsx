"use client";
import React from "react";

import Image from "next/image";
import { ButtonComponents } from "../component/button";

const Page = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-[30px]">
        <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
          ติดต่อพยาบาล
        </h1>
        <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px]">
          <div className="flex gap-[70px]  max-xl:flex-col ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.5846789!2d100.53400956250336!3d13.73212875316137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQzJzU1LjciTiAxMDDCsDMyJzAyLjQiRQ!5e0!3m2!1sen!2sth!4v1633021234567!5m2!1sen!2sth"
              width="600"
              height="450"
              loading="lazy"
              className="w-3/5  max-xl:w-full max-sm:h-[200px]"
            ></iframe>
            <div className="w-2/5 flex flex-col gap-[40px] max-xl:w-full">
              <div className="flex flex-col gap-[24px]">
                <div className="flex gap-[20px]">
                  <Image
                    src="/map.svg"
                    width={24}
                    height={24}
                    alt="map"
                    className="self-start"
                  ></Image>
                  <div>
                    <h1 className="font-bold text-[16px]">ที่อยู่</h1>
                    <h2>
                     1873 Rama IV Rd, Chang Wat Bangkok, Pathum Wan, จังหวัด กรุงเทพมหานคร 10330
                    </h2>
                  </div>
                </div>
                <div className="flex gap-[20px]">
                  <Image
                    src="/phone.svg"
                    width={24}
                    height={24}
                    alt="phone"
                    className="self-start"
                  ></Image>
                  <div>
                    <h1 className="font-bold text-[16px]">เบอร์โทรศัพท์</h1>
                    <h2 className="text-[16px]">02 256 4000</h2>
                  </div>
                </div>
                <div className="flex gap-[20px]">
                  <Image
                    src="/emergency.svg"
                    width={24}
                    height={24}
                    alt="emergency"
                  ></Image>
                  <div>
                    <h2 className="text-[16px] font-bold">
                      เหตุฉุกเฉินโปรดติดต่อ แผนกฉุกเฉิน รพ.จุฬาฯ 24 ชั่วโมง
                    </h2>
                  </div>
                </div>
              </div>
                <div className="w-[180px]">
                <ButtonComponents
                  title="ดูแผนที่ Google Maps"
                  textSize="text-[15px] text-bold"
                  onClick={() => window.open('https://www.google.com/maps/search/1873+Rama+IV+Rd,+Chang+Wat+Bangkok,+Pathum+Wan,+%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10330/@13.7320577,100.5292663,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 right-3 p-4 max-xl:bottom-[30px]">
        <div className="rounded-full bg-[#fff] w-[80px] h-[80px] justify-center items-center flex shadow-lg shadow-[#cccccc]">
          <div className="rounded-full bg-[#B36868] w-[65px] h-[64px] justify-center items-center flex">
            <Image
              src="/token_chat.svg"
              width={44}
              height={44}
              alt="token_chat"
            ></Image>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[90px] right-[82px] p-4 max-xl:bottom-[100px]">
        <Image
          src="/chatframe.svg"
          width={160}
          height={40}
          alt="token_chat"
        ></Image>
      </div>
    </div>
  );
};

export default Page;
