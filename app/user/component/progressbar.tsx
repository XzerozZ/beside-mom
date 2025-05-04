import { CombinedQuiz } from "@/app/interface";
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
const StepProgress = (data : CombinedQuiz[]) => { 
  
  console.log("data",data) // Get index of active step
  const arrayData = Object.values(data);

  const activeIndex = arrayData.findIndex((step) => step?.histories[0]?.answer === true);
  const stepWidthPercent = 100 / (steps.length - 1); // Spread steps evenly



  return (
    <div className="w-full py-10 max-sm:py-8">
      <div className="relative mx-auto">
        {/* Line behind steps */}
        <div className="absolute top-[15px] left-0 right-0 h-0.5 bg-gray-300 z-0"></div>

        {/* Moving white box on line */}
        <div
          className="absolute top-[8px] w-[10.5%] h-4 bg-white rounded-full z-10 transition-all"
        ></div>
         <div
          className="absolute right-0 top-[8px] w-[9.6%] h-4 bg-white  rounded-full z-10 transition-all duration-300"
          
        ></div>

        {/* Steps */}
        <div className="relative z-20 flex justify-between">
          {arrayData.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 bg-white ${
                  step?.histories[0]?.answer
                    ? "border-[#b36868] text-[#b36868]"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {step.quiz.quiz_id}
              </div>
              <div
                className={` mt-2 font-semibold max-sm:hidden ${
                  step?.histories[0]?.answer ? "text-black" : "text-gray-500"
                }`}
              >
                {step.quiz.title}
              </div>
              {/* <div
                className={`text-sm max-sm:hidden ${
                  step?.histories[0]?.answer ? "text-black font-bold" : "text-gray-500"
                }`}
              >
                {step.titleEN}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
