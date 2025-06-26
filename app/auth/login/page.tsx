"use client";
import React from "react";
import Image from "next/image";
import { ButtonComponents } from "../../component/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
const Loginpage = () => {
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_url}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.status === "Success" && data.result?.token) {
        Swal.fire({
          title: "เข้าสู่ระบบสำเร็จ",
          text: "ยินดีต้อนรับคุณแม่",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        localStorage.setItem("token", data.result.token);
        localStorage.setItem("name", data.result.name);
        localStorage.setItem("role", data.result.role);
        localStorage.setItem("u_id", data.result.u_id);

        if (data.result.role === "User") {
          router.push("/home");
        } else if (data.result.role === "Admin") {
          router.push("/admin/mominfo");
        }
      } else {
       
        Swal.fire({
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: data.message || "กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณ",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text: "กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      console.error("Login error:", error);
    }
  };



  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");


  return (
    <div className="bg-[#FFF4F4] flex justify-center h-screen items-center max-xl:bg-white">
      <div
        className="w-[1312px]  rounded-[40px] flex flex-row  max-xl:hidden"
        style={{ boxShadow: "0px 18px 33.6px rgba(0, 0, 0, 0.13)" }}
      >
        <div className="bg-[#FFEBEC] w-1/2 rounded-l-[40px] flex flex-col justify-center ">
          <h1 className="text-[#B36868] text-[64px] text-center ">
            Beside Mom
          </h1>
          <Image
            src="/besidemom.png"
            width={656}
            height={749}
            alt="Picture of the author"
            className="rounded-l-[40px]"
          ></Image>
        </div>
        <div className="w-1/2 bg-[#FFFFFF] rounded-r-[40px] justify-center flex flex-col ">
          <div className="flex flex-col gap-[48px] m-[60px]">
            <div className="text">
              <h1 className="text-bold text-[36px] text-[#B36868]">
                ลงชื่อเข้าใช้
              </h1>
              <h2 className="text-[16px] text-[#B36868]">
                สวัสดีและขอต้อนรับคุณแม่
              </h2>
            </div>
            <div className="flex flex-col gap-[36px]">
              <div>
                <div className="relative">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="username"
                    className="peer h-[44px] w-full px-[15px] py-[10px] border-2 rounded-md outline-none text-lg border-text-[#999999 focus:border-[#B36868] text-black"
                    placeholder="xxxxxxx"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-3 text-[12px] top-[-8px] px-1 bg-white text-[#999999] transition-all   peer-focus:text-[#B36868] "
                  >
                    ชื่อผู้ใช้
                  </label>
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="peer h-[44px] w-full px-[15px] py-[10px] border-2 rounded-md outline-none text-lg border-text-[#999999 focus:border-[#B36868] text-black"
                    placeholder="xxxxxxxxx"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 text-[12px] top-[-8px] px-1 bg-white text-[#999999] transition-all   peer-focus:text-[#B36868] "
                  >
                    รหัสผ่าน
                  </label>
                </div>

                <Link href="/auth/forgetpassword">
                <h6 className="text-[12px] text-[#999999] text-right mx-[10px] my-[5px]  underline-offset-1 cursor-pointer">
                  ลืมรหัสผ่าน?
                  </h6>
                  </Link>
                
               
              </div>
            </div>
            <div className="button">
              {/* <button className=" bg-[#B36868] rounded-[4px] h-[44px] text-white text-bold text-[15px] w-full" >
                เข้าสู่ระบบ
              </button> */}
              <ButtonComponents
                title="เข้าสู่ระบบ"
                textSize="text-[15px] text-bold"
                onClick={handleLogin}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:hidden">
      <div className="md:w-[848px] w-[390px] bg-[#FFFFFF] rounded-r-[40px] justify-center flex flex-col ">
          <div className="flex flex-col gap-[48px] m-[24px] md:m-[60px]">
            <div className="text">
              <h1 className="text-bold text-[36px] text-[#B36868]">
                ลงชื่อเข้าใช้
              </h1>
              <h2 className="text-[16px] text-[#B36868]">
                สวัสดีและขอต้อนรับคุณแม่
              </h2>
            </div>
            <div className="flex flex-col gap-[36px]">
              <div>
                <div className="relative">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="username"
                    className="peer h-[44px] w-full px-[15px] py-[10px] border-2 rounded-md outline-none text-lg border-text-[#999999 focus:border-[#B36868] text-black " 
                    placeholder="xxxxxxx"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-3 text-[12px] top-[-8px] px-1 bg-white text-[#999999] transition-all   peer-focus:text-[#B36868] "
                  >
                    ชื่อผู้ใช้
                  </label>
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="peer h-[44px] w-full px-[15px] py-[10px] border-2 rounded-md outline-none text-lg border-text-[#999999 focus:border-[#B36868] text-black"
                    placeholder="xxxxxxxxx"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 text-[12px] top-[-8px] px-1 bg-white text-[#999999] transition-all   peer-focus:text-[#B36868] "
                  >
                    รหัสผ่าน
                  </label>
                </div>
                <Link href="/auth/forgetpassword">
                <h6 className="text-[12px] text-[#999999] text-right mx-[10px] my-[5px]  underline-offset-1 cursor-pointer">
                  ลืมรหัสผ่าน?
                </h6>
                  </Link>
              </div>
            </div>
            <div className="button">
              {/* <button className=" bg-[#B36868] rounded-[4px] h-[44px] text-white text-bold text-[15px] w-full" >
                เข้าสู่ระบบ
              </button> */}
               <ButtonComponents
                title="เข้าสู่ระบบ"
                textSize="text-[15px] text-bold"
                onClick={handleLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
