import { ButtonProps } from "@/app/interface";
import React, { FC } from "react";
import Image from "next/image";

export const ButtonComponents: FC<ButtonProps> = (props) => {
  const { title, textSize, onClick } = props;
  return (
    <button
      className={`bg-[#B36868] rounded-[4px] h-[44px] text-white font-bold text-[15px] w-full hover:bg-[#FF9494] `}
      onClick={onClick}
    >
      <h1 className={textSize}>{title}</h1>
    </button>
  );
};

export const ButtonComponents2: FC<ButtonProps> = (props) => {
  const { title, textSize, onClick } = props;
  return (
    <button
      className=" bg-[#B36868] rounded-[4px] h-[64px] text-white font-bold text-[15px] w-full hover:bg-[#FF9494] shadow-[0px_4px_4px_rgba(0,0,0,0.50)] "
      onClick={onClick}
    >
      <h1 className={textSize}>{title}</h1>
    </button>
  );
};

export const ButtonComponents3: FC<ButtonProps> = (props) => {
  const { title, textSize, onClick } = props;
  return (
    <button
      className={`bg-[#B36868] rounded-[4px] h-[44px] text-white font-bold text-[15px] w-full hover:bg-[#FF9494] `}
      onClick={onClick}
    >
      <div className="flex flex-row gap-2 justify-center">
        <Image src="/healthwhite.svg" width={24} height={24} alt="health"></Image>
        <h1 className={`${textSize} flex items-center`}>{title}</h1>
      </div>
    </button>
  );
};

export const ButtonComponents4: FC<ButtonProps> = (props) => {
  const { title, textSize, onClick } = props;
  return (
    <button
      className={`border-[#FF9494] border rounded-[4px] h-[44px] text-[#B36868] font-bold text-[15px] w-full `}
      onClick={onClick}
    >
      <h1 className={textSize}>{title}</h1>
    </button>
  );
};


export const ButtonComponents5Size: FC<ButtonProps> = (props) => {
  const { title, textSize, onClick , boxSize} = props;
  return (
    <button
      className={`bg-[#B36868] rounded-[4px] h-[44px] text-white font-bold text-[15px] hover:bg-[#FF9494] ${boxSize}`}
      onClick={onClick}
    >
      <h1 className={textSize}>{title}</h1>
    </button>
  );
};


export const ButtonComponents6Size: FC<ButtonProps> = (props) => {
  const { title, textSize, onClick, boxSize } = props;
  return (
    <button
      className={`border-[#FF9494] border rounded-[4px] h-[44px] text-[#B36868] font-bold text-[15px]  ${boxSize}`}
      onClick={onClick}
    >
      <h1 className={textSize}>{title}</h1>
    </button>
  );
};
