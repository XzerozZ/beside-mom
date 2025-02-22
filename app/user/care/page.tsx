import React from "react";
import Navbar from "../component/navbar";
import { Card } from "../component/card";

const page = () => {
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[160px]">
        <div className="">
          <div className="flex flex-col items-center gap-[30px]">
            <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
              การดูแลทารก
            </h1>
            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px]">
              Poster
            </div>
            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px]">
              Filter
            </div>
            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
              <div className="grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-1 justify-center  gap-y-[32px] gap-x-[40px] ">
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
              <div className="flex justify-center mt-4">
                <button className="px-4 py-2 mx-1 bg-gray-300 rounded">
                  Previous
                </button>
                <button className="px-4 py-2 mx-1 bg-gray-300 rounded">
                  1
                </button>
                <button className="px-4 py-2 mx-1 bg-gray-300 rounded">
                  2
                </button>
                <button className="px-4 py-2 mx-1 bg-gray-300 rounded">
                  3
                </button>
                <button className="px-4 py-2 mx-1 bg-gray-300 rounded">
                  Next
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
