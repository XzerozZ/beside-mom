"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Navbar from "../../component/navbar";
import { ButtonComponents } from "../../component/button";
import WeightChart from "../../component/graph/WeightChart";
import LengthChart from "../../component/graph/LengthChart";
import  WeigthLengthGrowth  from "../../component/graph/WeightLengthChart";
import { KidProfile } from "@/app/interface";
import { useParams } from "next/navigation";
import { GrowthRecord } from "@/app/interface";
const page = () => {
    const param = useParams();
    const token = localStorage.getItem("key");
    const [kidData, setKidData] = React.useState<KidProfile>();
    const [graphData, setGraphData] =  React.useState<GrowthRecord[]>();
    const fetchKidData = async (id: string,token: string) => {
      try {
        const res = await fetch(`http://localhost:5000/kid/${id}`, {
          headers: {
        Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          setKidData(data.result);
        } else {
          console.error("Failed to fetch kid data");
        }
      } catch (error) {
        console.error("An error occurred while fetching kid data:", error);
      }
    }
    const fetchGraphKid = async (id: string,token: string) => {
      try {
      const res = await fetch(`http://localhost:5000/growth/kid/${id}/summary`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setGraphData(data.result);
      } else {
        console.error(`Failed to fetch graph data: ${res.status} ${res.statusText}`);
      }
      } catch (error) {
      console.error("An error occurred while fetching graph data:", error);
      }
    };
    useEffect(() => {
      if (typeof param.id === "string") {
        fetchKidData(param.id,token!);
        fetchGraphKid(param.id,token!);
      } else {
        console.error("Invalid or missing parameter: id");
      }
    },[])
    console.log(kidData);
    console.log(graphData);

    const formatDate = (dateString?: string): string => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

   
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
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
              <div className="flex-1 flex flex-col justify-between pb-4 max-md:gap-6">
                <div className="grid grid-cols-4 justify-between max-md:flex-col max-md:gap-6 max-sm:grid-cols-1">
                  <div className="w-1/4">
                    <h3>ชื่อ</h3>
                    <h4>{kidData?.firstname}</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>นามสกุล</h3>
                    <h4>{kidData?.lastname}</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>ชื่อเล่น</h3>
                    <h4>{kidData?.username}</h4>
                  </div>
                </div>
                <div className="flex flex-row justify-between max-sm:flex-col max-sm:gap-5">
                  <div className="w-1/4">
                    <h3>วันเกิด</h3>
                    <h4>{formatDate(kidData?.birthdate)}</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>กรุ๊ปเลือด</h3>
                    <h4>{kidData?.blood}</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>น้ำหนัก (กก.)</h3>
                    <h4>{kidData?.birthweight}</h4>
                  </div>
                  <div className="w-1/4">
                    <h3>ความยาว (ซม.)</h3>
                    <h4>{kidData?.birthlength}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-[72px]">
              <div className="flex flex-row gap-6">
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
               window.location.href = `/user/baby/1/edit?babyid=${param.id}`;
               }}
             />
             </div>
           
            </div>
            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-row max-xl:flex-col justify-between gap-8">
            <WeightChart gender="boy" GrowthRecord={graphData || []}/>
            <LengthChart gender="boy" GrowthRecord={graphData || []}/>
            <WeigthLengthGrowth gender="girl" GrowthRecord={graphData || []}/>
            </div>

       
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
