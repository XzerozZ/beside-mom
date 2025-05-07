import {  HistoryData } from "@/app/interface";
import { access } from "fs";
import React from "react";

const steps = [
  {
    number: 1,
    titleTH: "ด้านการเคลื่อนไหว",
    titleEN: "Gross Motor (GM)",
    active: true,
  },
  {
    number: 2,
    titleTH: "ด้านการใช้กล้ามเนื้อมัดเล็ก และสติปัญญา",
    titleEN: "Fine Motor (FM)",
    active: true,
  },
  {
    number: 3,
    titleTH: "ด้านการเข้าใจภาษา",
    titleEN: "Receptive Language (RL)",
    active : true,
  },
  {
    number: 4,
    titleTH: "ด้านการใช้ภาษา",
    titleEN: "Expression Language (EL)",
  },
  {
    number: 5,
    titleTH: "ด้านการช่วยเหลือตนเองและสังคม",
    titleEN: "Personal and Social (PS)",
  },
 
 
];
const StepProgress = (data : HistoryData) => { 
  const resultArrayQuiz = data
  ? Object.entries(data).map(([key, value]) => {
      return {
        id: key,
        ...value,
      };
    })
  : [];
  
  console.log("data",data) // Get index of active step
  const arrayData = Object.values(data);

  const activeIndex = resultArrayQuiz.findIndex((step) => step.solution_status === "ผ่าน");
  const stepWidthPercent = 100 / (steps.length - 1); // Spread steps evenly



  return (
    <div className="w-full py-10 max-sm:py-8">
      <div className="relative mx-auto">
        {/* Line behind steps */}
        <div className="absolute top-[15px] left-0 right-0 h-0.5 bg-gray-300 z-0"></div>

        {/* Moving white box on line */}
        <div
          className="absolute top-[8px] w-[7.5%] h-4 bg-white rounded-full z-10 transition-all max-sm:w-[5%]"
        ></div>
         <div
          className="absolute right-0 top-[8px] w-[12%] h-4 bg-white  rounded-full z-10 transition-all duration-300  max-sm:w-[5%]"
          
        ></div>

        {/* Steps */}
        <div className="relative z-20 flex justify-between">
          {resultArrayQuiz.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 bg-white ${
                  step?.solution_status == "ผ่าน"
                    ? "border-[#b36868] text-[#b36868] "
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {step.id}
              </div>
              <div
                className={` mt-2 font-semibold max-sm:hidden ${
                  step?.solution_status == "ผ่าน" ? "text-black" : "text-gray-500"
                }`}
              >
                {(() => {
                  if (step.id === "1") {
                    return "ด้านการเคลื่อนไหว Gross Motor (GM)";
                  } else if (step.id === "2") {
                    return "ด้านการใช้กล้ามเนื้อมัดเล็ก และสติปัญญา Fine Motor (FM)";
                  } else if (step.id === "3") {
                    return "ด้านการเข้าใจภาษา Receptive Language (RL)";
                  } else if (step.id === "4") {
                    return "ด้านการใช้ภาษา Expression Language (EL)";
                  } else if (step.id === "5") {
                    return "ด้านการช่วยเหลือตนเองและสังคม Personal and Social (PS)";
                  } else {
                    return step.id;
                  }
                })()}
              </div>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
