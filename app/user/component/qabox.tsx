"use client";
import React, { useState } from "react";
import Image from "next/image";

const Qabox = () => {
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
        <h1 className="text-[16px] font-bold">Q: ทำไมลูกน้อยไม่ถ่ายอุจจาระ</h1>
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
          A: สาเหตุของอาการท้องผูกในเด็ก 90% เกิดจากปัญหาพฤติกรรมของเด็ก เด็กมักมีพฤติกรรมการอั้นอุจจาระ ซึ่งเกิดจากการมีประสบการณ์ที่ไม่ดีกับการขับถ่าย อาจมีอาการเจ็บขณะขับถ่าย ซึ่งมักเกิดตามหลังจากการเจ็บป่วย หรือการดูแลเด็กที่มีการเปลี่ยนแปลงบางอย่าง เช่น การเปลี่ยนนมไปเป็นอาหารเสริม การเปลี่ยนพฤติกรรมจากเดิมที่เคยอยู่บ้าน เข้าสู่โรงเรียน อาจส่งผลให้เด็กมีพฤติกรรมการอั้นอุจจาระได้
        </p>
      </div>
    </div>
  );
};

export default Qabox;
