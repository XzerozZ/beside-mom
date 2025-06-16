"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import { QuestionAnswer } from "@/app/interface";

const Qabox: FC<QuestionAnswer> = (props:QuestionAnswer) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`p-[30px] rounded-xl shadow-md transition-all duration-300 ${
        isOpen ? "bg-[#FFF4F4]" : "bg-whtie"
      }`}
    >
      <button
        className="flex w-full justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h1 className="text-[16px] font-bold">Q: {props.question}</h1>
        <Image
          src={isOpen ? "/up.svg" : "/down.svg"}
          width={16}
          height={16}
          alt="toggle"
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? " mt-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-700 text-sm">
          A: <pre className="whitespace-pre-wrap font-noto-sans-thai">
            {props.answer}
          </pre>
        </p>
      </div>
    </div>
  );
};

export default Qabox;
