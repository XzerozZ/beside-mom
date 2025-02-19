import React from "react";
import { Card } from "../component/card";
import Navbar from "../component/navbar";

const page = () => {
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[160px]">
       <div className="flex flex-col items-center gap-[30px]">
       <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">เรื่องเล่าของคุณแม่</h1>
        <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
            <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 justify-center  gap-y-[20px] gap-x-[80px] ">
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
                <Card title="เรื่องของแม่ที่ต้องพูด....." textSize="text-[16px]" />
            </div>
        </div>
       </div>
      </main>
    </div>
  );
};

export default page;
