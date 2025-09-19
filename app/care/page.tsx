"use client";
import { API_URL } from "@/config/config";

import React, { useEffect } from "react";
import Image from "next/image";
import { CardCare } from "../component/card";
import { CareItem } from "@/app/interface";
import "@/app/component/css/loader.css";
import Swal from "sweetalert2";
import Chatbot from "../component/chatbot";

const PageCare = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [care, setCare] = React.useState<CareItem[]>();
  const [random, setRandom] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showChat, setShowChat] = React.useState<boolean>(false);

  // Fetch token from localStorage on client only
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const fetchCare = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/care`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
          confirmButtonColor: "#B36868",
        });
        window.location.href = "/auth/login";
      }
      const data = await response.json();
      setCare(data.result);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("Token is missing. Please log in.");
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        window.location.href = "/auth/login";
        return;
      }
      fetchCare(token);
      setLoading(false);
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (care && care.length > 0) {
      setRandom(Math.floor(Math.random() * care.length));
    }
  }, [care]);

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
            {care && care.length > 0 && (
              <div className="flex flex-row gap-[20px] bg-[#FFF4F4] p-[67px] max-sm:hidden">
                <div className="flex flex-col gap-[32px]  w-2/5 justify-center">
                  <h1 className="text-right font-bold text-[20px] text-[#B36868]">
                    แนะนำ
                  </h1>
                  <div className="flex flex-col gap-[20px]">
                    <h2 className="text-right font-bold text-[20px]">
                      {care?.[random]?.title}
                    </h2>
                    <h3 className="text-right text-[16px] ">
                      {care?.[0]?.desc}
                    </h3>
                    <div className="flex flex-row justify-end gap-[5px]">
                      <a
                        href={`/care/${care?.[random]?.c_id}`}
                        className="text-[14px] font-bold"
                      >
                        ดูเพิ่มเติม
                      </a>
                      <Image
                        src="/nexticon.svg"
                        alt="next"
                        width={8}
                        height={20}
                      ></Image>
                    </div>
                  </div>
                </div>
                <div className="w-3/5 object-contain">
                  <Image
                    src={care?.[random]?.banner || "/baby.png"}
                    alt="baby"
                    layout="responsive"
                    width={500}
                    height={500}
                  ></Image>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-[40px] max-xl:grid-cols-3 max-sm:grid max-sm:grid-cols-1">
              {care?.map((item) => (
                <div key={item.c_id} className="flex flex-col gap-[20px]">
                  <CardCare {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Chatbot showChat={showChat} setShowChat={setShowChat} />
      </div>
    );
  }
};

export default PageCare;
