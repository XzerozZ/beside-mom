import { Appointment } from "@/app/interface";
import React, { FC } from "react";
import {
  FaRegCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaNotesMedical,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdBook } from "react-icons/md";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Link from "next/link";


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
     
    <Link href={`/calendar/history/${props.id}`} className="max-sm:block hidden">
    <div className="border rounded-lg p-[24px]  flex items-start justify-between shadow-sm max-sm:shadow-none">
        <div className="flex items-center w-full max-sm:flex-row max-sm:items-center max-sm:gap-4 ">
          <div className="text-[#B36868]  rounded-lg text-center w-48">
            <p className="font-bold text-[16px]">ตรวจแผลผ่าคลอด</p>
            <p className="text-[20px] py-4">{onlyDay}</p>
            <p className="text-4xl font-bold">{day}</p>
          </div>
          <div className="flex-1 flex flex-col gap-4 max-sm:hidden">
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
        <div className="flex gap-3 w-1/2 ">
            <div className={`my-auto w-2 h-2 rounded-full bg-[${statusColor}] flex items-center justify-center text-white`}>
            </div>
            <h3 className={`text-[${statusColor}]`}>{statusText}</h3>
          </div>
        
       
      </div></Link>
     
    <div className="border rounded-lg p-[24px]  flex items-start justify-between shadow-sm max-sm:shadow-none max-sm:hidden">
        <div className="flex items-center w-full max-sm:flex-row max-sm:items-center max-sm:gap-4 ">
          <div className="text-[#B36868]  rounded-lg text-center w-48">
            <p className="font-bold text-[16px]">ตรวจแผลผ่าคลอด</p>
            <p className="text-[20px] py-4">{onlyDay}</p>
            <p className="text-4xl font-bold">{day}</p>
          </div>
          <div className="flex-1 flex flex-col gap-4 max-sm:hidden">
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
        <div className="flex gap-3 w-1/2 ">
            <div className={`my-auto w-2 h-2 rounded-full bg-[${statusColor}] flex items-center justify-center text-white`}>
            </div>
            <h3 className={`text-[${statusColor}]`}>{statusText}</h3>
          </div>
        
       
      </div>
    </div>
  );
};

export default CalendarCard;
