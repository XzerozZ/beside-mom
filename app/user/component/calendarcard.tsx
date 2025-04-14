import React from "react";
import {
  FaRegCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaNotesMedical,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdBook } from "react-icons/md";

const CalendarCard = () => {
  return (
    <div className="mt-4 space-y-4">
       <div className="flex gap-3  justify-end md:hidden">
            <div className="my-auto w-2 h-2 rounded-full bg-[#B36868] flex items-center justify-center text-white ">
            </div>
            <h3 className="text-[#b36868]">นัดแล้ว</h3>
          </div>
      <div className="border rounded-lg p-[24px] max-sm:p-0 flex items-start justify-between shadow-sm max-sm:border-none max-sm:shadow-none">
        <div className="flex items-center w-full max-sm:flex-col max-sm:items-center max-sm:gap-4 ">
          <div className="text-[#B36868]  rounded-lg text-center w-48">
            <p className="font-bold text-[16px]">ตรวจแผลผ่าคลอด</p>
            <p className="text-[20px] py-4">อังคาร</p>
            <p className="text-4xl font-bold">16</p>
          </div>
          <div className="border-l border-gray-300 ml-[8px] mr-[48px] h-[0px] max-sm:border-b max-sm:w-full max-sm:mr-0 max-sm:ml-0 max-sm:my-[24px]"></div>
          <div className="flex-1 flex flex-col gap-4">
            <p className="flex items-center gap-2 text-gray-700 ">
              <FaRegCalendarAlt /> อังคารที่ 12 ธันวาคม 2566
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaClock />08:00 - 12:00
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt />ชั้น 6 อาคารภปร.
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaUserDoctor  />นายยินดี จงใจดี
            </p>
            <p className="flex items-center gap-2 text-gray-700">
            <MdBook />นัดติดตามต่อเนื่อง
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaNotesMedical />เจาะเลือดก่อนพบแพทย์
            </p>
          </div>
         
         
        </div>
        <div className="flex gap-3 w-1/2 max-sm:hidden">
            <div className="my-auto w-2 h-2 rounded-full bg-[#B36868] flex items-center justify-center text-white ">
            </div>
            <h3 className="text-[#b36868]">นัดแล้ว</h3>
          </div>
        
       
      </div>
    </div>
  );
};

export default CalendarCard;
