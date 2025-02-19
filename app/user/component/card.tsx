import { ButtonProps } from "@/app/interface";
import React, { FC } from "react";
import Image from "next/image";

export const Card: FC<ButtonProps> = (props) => {
  const { title, textSize, onClick } = props;
  return (
    <div className="shadow-[0_0_10px_#ccc] rounded-[16px]">
    <Image
      className="bg-black rounded-t-[16px]"
      src="/mom.jpg"
      alt="mom"
      layout="responsive"
      width={270}
      height={158}
    />

      <div className="h-[102px] flex flex-col justify-between p-[16px]">
        <div className="font-bold">
          <h1 className="text-[16px]">เรื่องของแม่ที่ต้องพูด.....</h1>
        </div>
        <h2 className="text-[12px] text-[#999999]">12 มิถุนายน 2567</h2>
      </div>
    </div>
  );
};
