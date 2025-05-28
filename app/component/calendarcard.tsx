import { Appointment } from "@/app/interface";
import React, { FC } from "react";
import {
  FaRegCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaNotesMedical,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

import { format } from "date-fns";
import { th } from "date-fns/locale";


const CalendarCard: FC<Appointment> = (props:Appointment) => {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "EEEEที่ dd MMMM yyyy", { locale: th });
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return format(date, "hh:mm a");
  };

  const formatOnlyDay = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "EEEE", { locale: th });
  };

  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd", { locale: th });
  };

  const formattedDate = formatDate(props.date || "2025-01-01");
  const formattedTime = formatTime(props.start_time || "00:00");
  const onlyDay = formatOnlyDay(props.date || "2025-04-29");
  const day = formatDay(props.date || "2025-04-29");

  const getStatusDetails = (status: number) => {
    switch (status) {
      case 1:
        return { text: "นัดแล้ว", color: "#B36868" };
      case 2:
        return { text: "สำเร็จ", color: "#4CAF50" };
      case 3:
        return { text: "ยกเลิก", color: "#F44336" };
      case 4:
        return { text: "เลื่อน", color: "#FFC107" };
      default:
        return { text: "", color: "" };
    }
  };

  const { text: statusText, color: statusColor } = getStatusDetails(props.status || 0);



  return (
    <div className="mt-4 space-y-4">
       <div className="flex gap-3  justify-end md:hidden">
            <div className="my-auto w-2 h-2 rounded-full bg-[#B36868] flex items-center justify-center text-white ">
            </div>
            <h3 className={`text-[${statusColor}]`}>{statusText}</h3>
          </div>
      <div className="border rounded-lg p-[24px] max-sm:p-0 flex items-start justify-between shadow-sm max-sm:border-none max-sm:shadow-none">
        <div className="flex items-center w-full max-sm:flex-col max-sm:items-center max-sm:gap-4 ">
          <div className="text-[#B36868]  rounded-lg text-center w-48">
            <p className="font-bold text-[16px]">{props.title}</p>
            <p className="text-[20px] py-4">{onlyDay}</p>
            <p className="text-4xl font-bold">{day}</p>
          </div>
          <div className="border-l border-gray-300 ml-[8px] mr-[48px] h-[0px] max-sm:border-b max-sm:w-full max-sm:mr-0 max-sm:ml-0 max-sm:my-[24px]"></div>
          <div className="flex-1 flex flex-col gap-4 ">
            <p className="flex items-center gap-2 text-gray-700 ">
              <FaRegCalendarAlt />{formattedDate}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaClock />{formattedTime}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt />{props.building}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaUserDoctor  />{props.doctor}
            </p>
           
            <p className="flex items-center gap-2 text-gray-700">
              <FaNotesMedical />{props.requirement}
            </p>
          </div>
         
         
        </div>
        <div className="flex gap-3 w-1/2 max-sm:hidden">
            <div className={`my-auto w-2 h-2 rounded-full bg-[${statusColor}] flex items-center justify-center text-white`}>
            </div>
            <h3 className={`text-[${statusColor}]`}>{statusText}</h3>
          </div>
        
       
      </div>
    </div>
  );
};

export default CalendarCard;
