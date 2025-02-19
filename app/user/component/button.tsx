import { ButtonProps } from '@/app/interface';
import React, { FC } from 'react'

export const ButtonComponents: FC<ButtonProps> = (props) => {
    const { title, textSize, onClick } = props;
  return (
    <button className=" bg-[#B36868] rounded-[4px] h-[44px] text-white font-bold text-[15px] w-full hover:bg-[#FF9494]" onClick={onClick}>
        <h1 className={textSize}>{title}</h1>
    </button>
  )
}

export const ButtonComponents2: FC<ButtonProps> = (props) => {
    const { title, textSize, onClick } = props;
  return (
    <button className=" bg-[#B36868] rounded-[4px] h-[64px] text-white font-bold text-[15px] w-full hover:bg-[#FF9494] shadow-[0px_4px_4px_rgba(0,0,0,0.50)] " onClick={onClick}>
        <h1 className={textSize}>{title}</h1>
    </button>
  )
}