"use client";
import React from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "../interface";

const Navbar = () => {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [momData, setMomData] = React.useState<User>();

  // Helper function to check if nav item is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

 const fetchMomData = async (id: string, key: string) => {
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_url}/user/info/${id}`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setMomData(data.result);
    } else {
      console.error("Failed to fetch mom data");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const uid = localStorage.getItem("u_id");
      if (!token || !uid) {
        console.error("Token or UID is missing. Please log in.");
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        window.location.href = "/auth/login";
        return;
      }
      fetchMomData(uid, token);
    };
    fetchData();
  }, []);
  return (
    
    <nav className="bg-[#FFC6CF] flex justify-center fixed top-0 left-0 w-full z-999">
      <div className="flex flex-row justify-between h-[80px] w-[1312px] items-center max-xl:w-[770px] max-sm:w-[324px]">
      <div className="flex flex-row gap-4 items-center">
        <Image src="/logo.png" width={48} height={48} alt="Logor"></Image>
        <a href="/home" className="text-[20px] font-bold text-[#4D4D4D]">Beside Mom</a>
      </div>
      <div className="max-xl:hidden">
        <ul className="flex flex-row gap-[44px]">
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/baby') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/baby">ข้อมูลทารก</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/story') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/story">เรื่องเล่าของคุณแม่</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/care') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/care">การดูแลทารก</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/question') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/question">คำถามที่พบบ่อย</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/calendar') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/calendar">การตรวจตามนัด</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/contact') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/contact">ติดต่อพยาบาล</Link>
        </li>
        </ul>
      </div>
      <div className="flex flex-row gap-2 max-xl:hidden">
        <Image
        src={momData?.image_link || "/profileicon.svg"}
        fill
        alt="profile"
        className="rounded-full  w-24 h-24"
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
          <div className="absolute right-0 top-5 mt-2 bg-[#FFF4F4] border border-gray-200 rounded-md shadow-lg h-[400px] w-[390px] z-9999">
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
              src={momData?.image_link || "/baby.png"}
              fill
              alt="profilepicture"
              className="rounded-full w-24 h-24 object-cover"
            ></Image>
            <h1 className="font-bold text-[16px]">{momData?.fname} {momData?.lname}</h1>
            </div>
            <div className="mx-[70px]">
          
            </div>
            <div>
              <button
              className="font-bold text-[16px] text-[#B36868] text-center w-full py-2"
              onClick={async () => {
                            const result = await Swal.fire({
                              title: "คุณแน่ใจหรือไม่?",
                              text: "คุณจะออกจากระบบ!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "ใช่, ออกจากระบบ!",
                              cancelButtonText: "ยกเลิก",
                              confirmButtonColor: "#B36868",
                            
                            });
             
                           if (result.isConfirmed) {
                             localStorage.removeItem("token");
                             localStorage.removeItem("u_id");
                             localStorage.removeItem("name");
                             localStorage.removeItem("role");
                             window.location.href = "/auth/login";
                           }
                           }}
              >
              ออกจากระบบ
              </button>
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
      <div className="xl:hidden bg-[#FFEBEC] w-full h-screen fixed top-0 left-0 z-10">
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
        <ul className="flex flex-col gap-4 p-4 z-10">
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/baby') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/baby">ข้อมูลทารก</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/story') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/story">เรื่องเล่าของคุณแม่</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/care') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/care">การดูแลทารก</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/question') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/question">คำถามที่พบบ่อย</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/calendar') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/calendar">การตรวจตามนัด</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/contact') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/contact">ติดต่อพยาบาล</Link>
        </li>
        <li className={`text-[16px] hover:text-[#B36868] hover:font-bold ${isActive('/profile') ? 'text-[#B36868] font-bold' : 'text-black'}`}>
          <Link href="/profile">โปรไฟล์</Link>
        </li>
        </ul>
      </div>
      )}
    </nav>
    
  );
};

export default Navbar;
