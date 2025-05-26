"use client";
import React from "react";
import Image from "next/image";
import { ButtonComponents } from "../../component/button";
import Swal from "sweetalert2";

const page = () => {
  const [email, setEmail] = React.useState("");
  const handleForgetPassword = async () => {
    const token = localStorage.getItem("token");
    localStorage.setItem("email", email);
    const formData = new FormData();
    formData.append("Email", email);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_url}/auth/forgotpassword`,
        {
          method: "POST",

          body: formData,
        }
      );
      if (response.ok) {
        Swal.fire({
          title: "Password reset link sent to your email!",
          icon: "success",
          timer: 1000,
        });
      } else {
        alert("Failed to send password reset link");
        Swal.fire({
          title: "Failed to send password reset link",
          icon: "error",
          timer: 1000,
        });
      }
    } catch (error) {
      console.error("Error sending password reset link:", error);
    }
  };

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
                ลืมรหัสผ่าน ?
              </h1>
              <h2 className="text-[16px] text-[#B36868]">
                กรุณาใส่อีเมลของคุณ
              </h2>
            </div>
            <div className="flex flex-col gap-[36px]">
              <div>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    className="peer h-[44px] w-full px-[15px] py-[10px] border-2 rounded-md outline-none text-lg border-text-[#999999 focus:border-[#B36868] text-black"
                    placeholder="xxxxxxx"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 text-[12px] top-[-8px] px-1 bg-white text-[#999999] transition-all   peer-focus:text-[#B36868] "
                  >
                    อีเมล
                  </label>
                </div>
              </div>
            </div>
            <div className="button">
              {/* <button className=" bg-[#B36868] rounded-[4px] h-[44px] text-white text-bold text-[15px] w-full" >
                เข้าสู่ระบบ
              </button> */}
              <ButtonComponents
                title="ดำเนินการต่อ"
                textSize="text-[15px] text-bold"
                onClick={() => {
                  handleForgetPassword();
                  window.location.href = "/auth/verify";
                }}
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
                ลืมรหัสผ่าน ?
              </h1>
              <h2 className="text-[16px] text-[#B36868]">
                กรุณาใส่อีเมลของคุณ
              </h2>
            </div>
            <div className="flex flex-col gap-[36px]">
              <div>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    className="peer h-[44px] w-full px-[15px] py-[10px] border-2 rounded-md outline-none text-lg border-text-[#999999 focus:border-[#B36868] text-black "
                    placeholder="xxxxxxx"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 text-[12px] top-[-8px] px-1 bg-white text-[#999999] transition-all   peer-focus:text-[#B36868] "
                  >
                    อีเมล
                  </label>
                </div>
              </div>
            </div>
            <div className="button">
              <ButtonComponents
                title="ดำเนินการต่อ"
                textSize="text-[15px] text-bold"
                onClick={() => {
                  handleForgetPassword();
                  window.location.href = "/auth/verify";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
