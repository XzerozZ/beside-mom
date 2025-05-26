import React from "react";
import Image from "next/image";
import { Evaluation } from "@/app/interface";
import Link from "next/link";

const FormComponent = ({ name,paramSearch, ...props }: Evaluation & { name: string, paramSearch:string }) => {
  // Component logic here

const convertDateToThaiFormat = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = (date.getFullYear() + 543).toString();
  return `${day}/${month}/${year}`;
};
  
 const formattedDate = convertDateToThaiFormat(props.updated_at || "2025-04-29T15:18:30.371332Z");
  return (
    <Link href={`/form/${name}/${props.period_id}?${paramSearch}`} className="w-full">
      <div className="flex p-[20px] max-sm:gap-6 gap-[80px] border border-[#cccccc] rounded-[8px]">
      <div className="max-sm:w-1/3">
        <Image src="/baby.png" alt="baby" width={300} height={300}></Image>
      </div>
      <div className="flex flex-col gap-[16px]">
        <h1 className="font-bold text-[20px] text-[#4d4d4d]">ช่วงอายุ: 
          {(() => {
            switch (props.period_id) {
              case 1:
                return "แรกเกิด";
              case 2:
                return "1 เดือน";
              case 3:
                return "2 เดือน";
              case 4:
                return "3 - 4 เดือน";
              case 5:
                return "5 - 6 เดือน";
              case 6:
                return "7 - 8 เดือน";
              case 7:
                return "9 เดือน";
              case 8:
                return "10 - 12 เดือน";
              default:
                return props.period_id;
            }
          })()}
        </h1>
        <div className="flex gap-[10px]">
        <div className="flex flex-col gap-[5px]">
            <h2 className="font-bold text-[16px] max-sm:text-[12px] text-[#4d4d4d]">
              สถานะการประเมิน:
            </h2>
            <h2 className="font-bold text-[16px] max-sm:text-[12px] text-[#4d4d4d]">
              ผลการประเมิน:
            </h2>
            <h2 className="font-bold text-[16px] max-sm:text-[12px] text-[#4d4d4d]">
              วันที่ประเมิน:
            </h2>
          </div>
          <div>
            <div className="flex flex-col gap-[5px]">
              <div className="flex gap-[5px]">
                <Image src={props.status ? "/correct.svg" : "/time.svg"} alt="status" width={20} height={20}></Image>
                <h2 className=" text-[16px] max-sm:text-[12px] text-[#4d4d4d]">{props.status ? "ประเมินแล้ว" : "รอการประเมิน"}</h2>
              </div>
              <div className="flex gap-[5px]">
                <Image
                  src={
                  props.solution_status === "ไม่ผ่านการประเมินบางประการ"
                    ? "/dontpass.svg"
                    : props.solution_status === "รอประเมิน"
                    ? "/time.svg"
                    : "/correct.svg"
                  }
                  alt="status"
                  width={20}
                  height={20}
                ></Image>
                <h2 className=" text-[16px] max-sm:text-[12px] text-[#4d4d4d]">{props.solution_status}</h2>
              </div>

                <h2 className=" text-[16px] max-sm:text-[12px] text-[#4d4d4d]">
                {props.solution_status === "รอการประเมิน" ? props.solution_status : formattedDate}
                </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
      </Link>
  );
};

export default FormComponent;
