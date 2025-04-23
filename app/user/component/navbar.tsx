"use client";
import React from "react";
import Image from "next/image";
import { ButtonComponents } from "./button";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  return (
    <nav className="bg-[#FFEBEC] flex justify-center fixed top-0 left-0 w-full z-999">
      <div className="flex flex-row justify-between h-[80px] w-[1312px] items-center max-xl:w-[770px] max-sm:w-[324px]">
      <div className="flex flex-row gap-4 items-center">
        <Image src="/logo.png" width={48} height={48} alt="Logor"></Image>
        <h1 className="text-[20px] font-bold text-[#4D4D4D]">Beside Mom</h1>
      </div>
      <div className="max-xl:hidden">
        <ul className="flex flex-row gap-[44px]">
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/baby">ข้อมูลทารก</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/story">เรื่องเราของคุณแม่</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/care">การดูแลทารก</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/question">คำถามที่พบบ่อย</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/calendar">การตรวจตามนัด</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/contact">ติดต่อพยาบาล</a>
        </li>
        </ul>
      </div>
      <div className="flex flex-row gap-2 max-xl:hidden">
        <Image
        src="/profileicon.svg"
        width={28}
        height={28}
        alt="profile"
        ></Image>
        <div className="relative my-auto">
        <Image
          src="/dropdownicon.svg"
          width={10}
          height={5}
          alt="dropdown"
          className="cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className="absolute right-0 top-5 mt-2 bg-[#FFF4F4] border border-gray-200 rounded-md shadow-lg h-[500px] w-[390px] z-9999">
          <div className="p-[32px] flex flex-col justify-between h-full">
            <div className="flex flex-row justify-between">
            <h1 className="font-bold">โปรไฟล์</h1>
            <Image
              src="/x.svg"
              width={11}
              height={11}
              alt="x"
              onClick={() => setShowDropdown(!showDropdown)}
            ></Image>
            </div>
            <div className="flex flex-col gap-[24px] mx-auto">
            <Image
              src="/profilepicture.png"
              width={96}
              height={96}
              alt="profilepicture"
            ></Image>
            <h1 className="font-bold text-[16px]">ชิณภัทร สุขทอง</h1>
            </div>
            <div className="mx-[70px]">
            <ButtonComponents
              title="แก้ไขโปรไฟล์"
              textSize="text-[14px]"
              onClick={() => {}}
            />
            </div>
            <div>
            <h1 className="font-bold text-[16px] text-[#B36868] text-center">
              ออกจากระบบ
            </h1>
            </div>
          </div>
          </div>
        )}
        </div>
      </div>
      <div className="xl:hidden">
        <Image
        src="/hamburger.svg"
        width={27}
        height={16}
        alt="hamburger"
        className="cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
        />
      </div>
      </div>
      {showDropdown && (
      <div className="xl:hidden bg-[#FFEBEC] w-full h-screen fixed top-0 left-0 z-9999">
        <div className="flex justify-center">
       <div className="flex flex-row justify-between h-[80px] w-[1312px] items-center max-xl:w-[770px] max-sm:w-[324px]">
      <div className="flex flex-row gap-4 items-center">
        <Image src="/logo.png" width={48} height={48} alt="Logo"></Image>
        <h1 className="text-[20px] font-bold text-[#4D4D4D]">Beside Mom</h1>
      </div>
     
     
      <div className="xl:hidden">
        <Image
        src="/x.svg"
        width={20}
        height={16}
        alt="hamburger"
        className="cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
        />
      </div>
      </div>
        </div>
        <ul className="flex flex-col gap-4 p-4">
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/baby">ข้อมูลทารก</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/story">เรื่องเราของคุณแม่</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/care">การดูแลทารก</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/question">คำถามที่พบบ่อย</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/calendar">การตรวจตามนัด</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/contact">ติดต่อพยาบาล</a>
        </li>
        <li className="text-[16px] hover:text-[#B36868] active:text-[#B36868] hover:text-bold active:font-bold">
          <a href="/user/contact">โปรไฟล์</a>
        </li>
        </ul>
      </div>
      )}
    </nav>
    
  );
};

export default Navbar;
