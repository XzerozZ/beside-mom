"use client";
import React from "react";
import Navbar from "../../component/navbar";
import { Card } from "../../component/card";
import { log } from "console";

const page = () => {
  const [isToggle, setIsToggle] = React.useState(false);

  return (
    <div className="flex flex-col">
    <header className="fixed top-0 left-0 w-full z-50">
      <Navbar />
    </header>
      <main className="mt-[160px] max-sm:mt-[112px]">
        <div className="flex flex-col items-center gap-[30px]">
          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
            <div className="flex flex-row gap-[31px] max-xl:flex-col">
              <div className="w-4/5 flex flex-col gap-[36px] max-xl:w-full">
                <h1 className="font-bold text-[20px] text-left ">
                  เรื่องเล่าของคุณแม่
                </h1>
                <div className="relative z-0">
                  <div className="absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none"></div>
                  <video
                    className="relative z-0 rounded-[16px] h-[563px] max-xl:h-[527px] max-sm:h-[226px]"
                    width="100%"
                    controls
                  >
                    <source src="/path/to/your/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex flex-col gap-[16px] mt-[20px">
                  <h1 className="text-[20px] font-bold">
                    บันทึกของแม่…เรื่องที่คุณไม่เคยรู้ (Mom’s Diary)
                  </h1>
                  <div>
                    {isToggle ? (
                      <div id="toggleContent">
                        <h2 className="text-[16px]">
                          ไม่ว่าวันนี้คุณเติบโตขึ้นมาเป็นใคร ยังมีใครคนหนึ่ง
                          ที่คอยใส่ใจคุณอยู่เสมอ สุขภาพดีแค่เริ่มจากคำเล็กๆ
                          ในแต่ละวัน เริ่มต้นดูแลตัวเองด้วยคำเล็กๆ
                          ยังมีใครคนหนึ่ง ที่คอยใส่ใจคุณอยู่เสมอ
                          สุขภาพดีแค่เริ่มจากคำเล็กๆ ในแต่ละวัน
                          เริ่มต้นดูแลตัวเองด้วยคำเล็กๆ
                        </h2>
                      </div>
                    ) : (
                      <p className="text-[16px] line-clamp-1" id="main">
                        ไม่ว่าวันนี้คุณเติบโตขึ้นมาเป็นใคร ยังมีใครคนหนึ่ง
                        ที่คอยใส่ใจคุณอยู่เสมอ สุขภาพดีแค่เริ่มจากคำเล็กๆ
                        ในแต่ละวัน เริ่มต้นดูแลตัวเองด้วยคำเล็กๆ ยังมีใครคนหนึ่ง
                        ที่คอยใส่ใจคุณอยู่เสมอ สุขภาพดีแค่เริ่มจากคำเล็กๆ
                        ในแต่ละวัน เริ่มต้นดูแลตัวเองด้วยคำเล็กๆ
                      </p>
                    )}
                    <button
                      className="font-bold"
                      onClick={() => setIsToggle(!isToggle)}
                      id="toggleButton"
                    >
                      {isToggle ? "ซ่อน" : "เพิ่มเติม"}
                    </button>
                  </div>

                  <h2 className="text-[16px]">20 มิถุนายน 2567</h2>
                </div>
              </div>
              <div className="w-1/5 flex flex-col gap-[36px] max-xl:w-full ">
                <h1 className="font-bold text-[20px] text-left ">
                  วีดิโออื่นๆ
                </h1>
                <div className="grid grid-cols-1 gap-y-[20px] max-xl:hidden max-sm:grid max-sm:grid-cols-1">
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
                <div className="hidden max-xl:flex max-xl:overflow-x-auto max-xl:gap-[20px] max-sm:hidden max-xl:snap-x max-xl:snap-mandatory px-4">
                  <div className="flex space-x-5">
                    <div className="w-[calc(100%/3-20px)] flex-shrink-0 snap-start">
                      <Card
                        title="เรื่องของแม่ที่ต้องพูด....."
                        textSize="text-[16px]"
                      />
                    </div>
                    <div className="w-[calc(100%/3-20px)] flex-shrink-0 snap-start">
                      <Card
                        title="เรื่องของแม่ที่ต้องพูด....."
                        textSize="text-[16px]"
                      />
                    </div>
                    <div className="w-[calc(100%/3-20px)] flex-shrink-0 snap-start">
                      <Card
                        title="เรื่องของแม่ที่ต้องพูด....."
                        textSize="text-[16px]"
                      />
                    </div>
                    <div className="w-[calc(100%/3-20px)] flex-shrink-0 snap-start">
                      <Card
                        title="เรื่องของแม่ที่ต้องพูด....."
                        textSize="text-[16px]"
                      />
                    </div>
                    <div className="w-[calc(100%/3-20px)] flex-shrink-0 snap-start">
                      <Card
                        title="เรื่องของแม่ที่ต้องพูด....."
                        textSize="text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
