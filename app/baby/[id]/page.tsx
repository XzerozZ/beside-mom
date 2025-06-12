"use client";
import React, { useEffect } from "react";

import Image from "next/image";
import { ButtonComponents } from "../../component/button";
import WeightChart from "../../component/graph/WeightChart";
import LengthChart from "../../component/graph/LengthChart";
import WeigthLengthGrowth from "../../component/graph/WeightLengthChart";
import { KidProfile } from "@/app/interface";
import { useParams } from "next/navigation";
import { GrowthRecord } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Chatbot from "../../component/chatbot";
const PageBabyId = () => {
  const param = useParams();
  const token = localStorage.getItem("token");
  const [kidData, setKidData] = React.useState<KidProfile>();
  const [graphData, setGraphData] = React.useState<GrowthRecord[]>();
  const [showChat, setShowChat] = React.useState<boolean>(false);
  const fetchKidData = async (id: string, token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_url}/kid/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setKidData(data.result);
      } else {
        console.error("Failed to fetch kid data");
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
          confirmButtonColor: "#B36868",
        });
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("An error occurred while fetching kid data:", error);
    }
  };
  const fetchGraphKid = async (id: string, token: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_url}/growth/kid/${id}/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setGraphData(data.result);
      } else {
        console.error(
          `Failed to fetch graph data: ${res.status} ${res.statusText}`
        );
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
          confirmButtonColor: "#B36868",
        });
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("An error occurred while fetching graph data:", error);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
        window.location.href = "/auth/login";
        return;
      }
    };
    fetchData();
    if (token) {
      if (typeof param.id === "string") {
        fetchKidData(param.id, token!);
        fetchGraphKid(param.id, token!);
      } else {
        console.error("Invalid or missing parameter: id");
      }
    } else {
      console.error("Invalid or missing parameter: id");
    }
    setLoading(false);
  }, [token, param.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-160px] max-sm:mt-[-112px]">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-[30px] ">
        <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
          ข้อมูลทารก
        </h1>

        <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] gap-8 flex flex-col">
          <div className="flex flex-row gap-[64px] max-md:flex-col max-md:gap-0">
            <div className="w-44 h-44 rounded-full overflow-hidden flex-none max-md:mx-auto  max-md:mb-6">
              <Image
                src={kidData?.image_link || "/baby.png"}
                alt="Description of the image"
                width={176}
                height={176}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between  max-md:gap-6">
              <div className="grid grid-cols-4 justify-between max-md:flex-col max-md:gap-6 max-sm:grid-cols-2">
                <div className="w-1/4">
                  <h3 className="font-bold text-[18px]">ชื่อ</h3>
                  <h4>{kidData?.firstname}</h4>
                </div>
                <div className="w-1/4">
                  <h3 className="font-bold text-[18px]">นามสกุล</h3>
                  <h4>{kidData?.lastname}</h4>
                </div>
                <div className="w-1/4">
                  <h3 className="font-bold text-[18px]">ชื่อเล่น</h3>
                  <h4>{kidData?.username}</h4>
                </div>
              </div>
              <div className="flex flex-row justify-between max-sm:grid max-sm:grid-cols-2 max-sm:gap-5">
                <div className="w-1/4">
                  <h3 className="font-bold text-[18px]">วันเกิด</h3>
                  <h4>{formatDate(kidData?.birthdate)}</h4>
                </div>
                <div className="w-1/4">
                  <h3 className="font-bold text-[18px]">กรุ๊ปเลือด</h3>
                  <h4>{kidData?.blood}</h4>
                </div>
                <div className="w-1/4">
                  <h3 className="font-bold text-[18px]">น้ำหนัก (กรัม)</h3>
                  <h4>{kidData?.birthweight}</h4>
                </div>
                <div className="w-1/4">
                  <h3 className="font-bold text-[18px]">ความยาว (ซม.)</h3>
                  <h4>{kidData?.birthlength}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-[85px] max-sm:flex-col-reverse max-sm:gap-4">
          <div className="flex flex-row gap-6">
               <div className="flex flex-row gap-6 ">
              <h3>เพศ</h3>
              <div className="flex gap-4 flex-col">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={kidData?.sex === "ชาย"}
                    readOnly
                    className="accent-[#B36868]"
                  />
                  ชาย
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={kidData?.sex === "หญิง"}
                    readOnly
                    className="accent-[#B36868]"
                  />
                  หญิง
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-[16px]">โน๊ต</h3>
              <h4 className="text-[20px]">{kidData?.note}</h4>
            </div>
          </div>
          <div className="flex flex-row gap-10">
              <div className="flex flex-col">
              <h3 className="font-bold text-[18px]">อายุวันเกิดจริง</h3>
              <h4>
                {kidData?.real_years} ปี {kidData?.real_months} เดือน{" "}
                {kidData?.real_days} วัน
              </h4>
            </div>
            <div>
              <h3 className="font-bold text-[18px]">อายุวันเกิดปรับ</h3>
              <h4>
                {kidData?.adjusted_years} ปี {kidData?.adjusted_months} เดือน{" "}
                {kidData?.adjusted_days} วัน
              </h4>
            </div>
          </div>
          </div>
          <hr className="" />
          <div className="w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px] flex justify-between">
            <h1 className="font-bold  text-[20px] text-left w-10/12 my-auto">
              กราฟการเจริญเติบโต
            </h1>
            <div className="w-2/12 max-sm:w-1/2">
              <ButtonComponents
                title="เพิ่มข้อมูล"
                textSize="text-[15px] font-bold"
                onClick={() => {
                  window.location.href = `/baby/1/edit?babyid=${param.id}`;
                }}
              />
            </div>
          </div>
          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-row max-xl:flex-col justify-between gap-8 mb-5">
            <WeightChart
              gender={kidData?.sex ?? ""}
              GrowthRecord={graphData || []}
            />
            <LengthChart
              gender={kidData?.sex ?? ""}
              GrowthRecord={graphData || []}
            />
            <WeigthLengthGrowth
              gender={kidData?.sex ?? ""}
              GrowthRecord={graphData || []}
            />
          </div>
        </div>
              <Chatbot showChat={showChat} setShowChat={setShowChat} />

      </div>
    );
  }
};

export default PageBabyId;
