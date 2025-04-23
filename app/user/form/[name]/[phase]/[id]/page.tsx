"use client";
import React from "react";
import Navbar from "../../../../component/navbar";
import { useParams } from "next/navigation";
import ProgressBar from "@/app/user/component/progressbar";
import FormCard from "@/app/user/component/FormCard";
import Quiz from "@/app/user/component/quiz";

const page = () => {
  const { name } = useParams();
  const { phase } = useParams();
  const { id } = useParams();
  const numericId = Number(id);
 

  // Decode the name parameter
  const getDecodedName = (name: string | undefined) => {
    const safeDecode = (text: string) => {
      try {
        return decodeURIComponent(text);
      } catch (e) {
        return text;
      }
    };

    return safeDecode(name ?? "");
  };
  const decodedName = getDecodedName(
    typeof name === "string" ? name : undefined
  );

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full z-30">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
        <div className="">
          <div className="flex flex-col items-center gap-[30px]">
            <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
              การตรวจตามนัด {">>"} {decodedName} {">>"} {phase}
            </h1>

            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
             
            <div className="z-10">
            <ProgressBar />
            </div>
             <Quiz param={numericId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
