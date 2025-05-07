"use client";
import React, { use, useEffect } from "react";
import Image from "next/image";
import { CardCare } from "../component/card";
import { CareItem } from "@/app/interface";
import "@/app/user/component/css/loader.css";
import Swal from "sweetalert2";

const page = () => {
  const token = localStorage.getItem("token");
  const [care, setCare] = React.useState<CareItem[]>();
  const fetchCare = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:5000/care`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      setCare(data.result);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. Please log in.");
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        window.location.href = "/user/auth/login";
        return;
      }
    };
    if (token) {
      fetchCare(token);
    } else {
      console.error("Invalid or missing parameter: id");
    }
    setLoading(false);

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-160px] max-sm:mt-[-112px]">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="flex flex-col items-center gap-[30px]">
          <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
            การดูแลทารก
          </h1>
          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px] flex flex-col gap-[40px]">
            <div className="flex flex-row gap-[20px] bg-[#FFF4F4] p-[67px] max-sm:hidden">
              <div className="flex flex-col gap-[32px]  w-2/5 justify-center">
                <h1 className="text-right font-bold text-[20px] text-[#B36868]">
                  แนะนำ
                </h1>
                <div className="flex flex-col gap-[20px]">
                  <h2 className="text-right font-bold text-[20px]">
                    {care?.[0]?.title}
                  </h2>
                  <h3 className="text-right text-[16px] ">{care?.[0]?.desc}</h3>
                  <div className="flex flex-row justify-end gap-[5px]">
                    <h1 className="text-[14px] font-bold">ดูเพิ่มเติม</h1>
                    <Image
                      src="/nexticon.svg"
                      alt="next"
                      width={8}
                      height={20}
                    ></Image>
                  </div>
                </div>
              </div>
              <div className="w-3/5">
                <Image
                  src={care?.[0]?.banner || "/baby.png"}
                  alt="baby"
                  layout="responsive"
                  width={500}
                  height={500}
                ></Image>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-[40px] max-xl:grid-cols-3 max-sm:grid max-sm:grid-cols-1">
              {care?.map((item) => (
                <div key={item.c_id} className="flex flex-col gap-[20px]">
                  <CardCare {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
