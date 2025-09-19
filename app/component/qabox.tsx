"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import { QuestionAnswer } from "@/app/interface";

const Qabox: FC<QuestionAnswer> = (props: QuestionAnswer) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      <div
        className={`p-[30px] rounded-xl shadow-md transition-all duration-300 ${
          isOpen ? "bg-[#FFF4F4]" : "bg-whtie"
        }`}
      >
        <div
          className="flex w-full justify-between items-center text-left focus:outline-none"
          aria-expanded={isOpen}
        >
          <h1 className="text-[16px] font-bold">Q: {props.question}</h1>
          <Image
            src={isOpen ? "/up.svg" : "/down.svg"}
            width={16}
            height={16}
            alt="toggle"
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? " mt-4" : "max-h-0"
          }`}
        >
          <div className="text-gray-700 text-sm text-left">
            A:{" "}
            <pre className="whitespace-pre-wrap font-noto-sans-thai">
              {props.answer}
            </pre>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Qabox;
