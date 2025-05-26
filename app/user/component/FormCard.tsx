import React from "react";
import Image from "next/image";
import { HistoryData, Quiz, QuizHistory, QuizResult } from "@/app/interface";

const FormCard: React.FC<QuizResult> = (quizData) => {
  return (
    <div
      className={`flex p-[20px] gap-[80px] border border-[#cccccc] rounded-[8px] max-sm:gap-6 ${
      quizData.solution_status === "ผ่าน" ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="max-sm:w-1/3 max-xl:w-1/3">
      <Image src="/baby.png" alt="baby" width={300} height={300}></Image>
      </div>
      <div className="flex flex-col gap-[16px] max-sm:w-2/3 max-xl:w-2/3">
      <h1 className="font-bold text-[20px]  max-sm:text-[16px]">
        {(() => {
        switch (Number(quizData?.id)) {
          case 1:
          return "ด้านการเคลื่อนไหว Gross Motor (GM)";
          case 2:
          return "ด้านการใช้กล้ามเนื้อมัดเล็ก และสติปัญญา Fine Motor (FM)";
          case 3:
          return "ด้านการเข้าใจภาษา Receptive Language (RL)";
          case 4:
          return "ด้านการใช้ภาษา Expression Language (EL)";
          case 5:
          return "ด้านการช่วยเหลือตนเองและสังคม Personal and Social (PS)";
          default:
          return "";
        }
        })()}
      </h1>
      <div className="flex gap-[10px]">
        <div className="flex flex-col gap-[5px]">
        <h2 className="font-bold text-[16px] max-sm:text-[12px]">
          สถานะการประเมิน:
        </h2>
        <h2 className="font-bold text-[16px]] max-sm:text-[12px]">
          ผลการประเมิน:
        </h2>
        </div>
        <div>
        <div className="flex flex-col gap-[5px]">
          <div className="flex gap-[5px]">
          <Image
            src={
            (() => {
              switch (quizData?.solution_status) {
              case "ผ่าน":
              return "/correct.svg";
              case "ไม่ผ่าน":
              return "/dontpass.svg";
              default:
              return "/time.svg";
              }
            })()
            }
            alt="status-icon"
            width={20}
            height={20}
          ></Image>
          <h2 className=" text-[16px]  max-sm:text-[12px]">
            {(() => {
            switch (quizData?.solution_status) {
              case "ผ่าน":
              return "ประเมินแล้ว";
              case "ไม่ผ่าน":
              return "รอการประเมิน";
              default:
              return "รอการประเมิน";
            }
            })()}
          </h2>
          </div>
          <div className="flex gap-[5px]">
          <Image
            src={
            (() => {
            switch (quizData?.solution_status) {
            case "ผ่าน":
              return "/correct.svg";
            case "ไม่ผ่าน":
              return "/dontpass.svg";
            default:
              return "/time.svg";
            }
            })()
            }
            alt="status-icon"
            width={20}
            height={20}
          ></Image>
          <h2 className=" text-[16px]"></h2>
          <h2 className=" text-[16px]  max-sm:text-[12px]">
            {quizData?.solution_status}
          </h2>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FormCard;
