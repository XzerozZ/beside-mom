import { ButtonProps } from "@/app/interface";
import React, { FC } from "react";
import Image from "next/image";
import { ButtonComponents, ButtonComponents3 } from "./button";
import { text } from "stream/consumers";

export const BabyCard: FC<ButtonProps> = (props) => {
  const { title, textSize, onClick } = props;
  return (
    <div className="flex flex-col gap-8 w-[214px] max-sm:w-full">
      <div className="w-44 h-44 rounded-full overflow-hidden mx-auto">
        <Image
          src="/baby.png"
          alt="Description of the image"
          width={176}
          height={176}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <h3 className="font-bold text-[20px] text-center">
          ณัชพล พลแหลม
        </h3>
      </div>
      <div className="">
       <ButtonComponents3 title="แบบประเมินพัฒนาการ " textSize={textSize}  />
      </div>
    </div>
  );
};
