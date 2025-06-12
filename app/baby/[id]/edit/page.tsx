"use client";
import React, { useEffect } from "react";

import { ButtonComponents, ButtonComponents4 } from "@/app/component/button";
import { GrowthEdit } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Chatbot from "@/app/component/chatbot";

const PageBabyEdit = () => {
  const token = localStorage.getItem("token");
  const searchParams = new URLSearchParams(window.location.search);
  const babyId = searchParams.get("babyid");
  const [showChat, setShowChat] = React.useState<boolean>(false);
  const currentDate = new Date(
    new Date().getTime() + 7 * 60 * 60 * 1000
  ).toISOString();
  const [babyData, setBabyData] = React.useState<GrowthEdit[]>([]);
  const [length, setLength] = React.useState<number>(0);
  const [weight, setWeight] = React.useState<number>(0.0);
  const [date, setDate] = React.useState<string>(currentDate.slice(0, 10));

  const [showInput, setShowInput] = React.useState(false);

  const fetchBabyData = async (token: string, babyid: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_url}/growth/kid/${babyid}/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch baby data");
      }
      const data = await response.json();
      setBabyData(data.result);
    } catch (error) {
      console.error("Error fetching baby data:", error);
    }
  };

  const handleAddData = async (
    token: string,
    babyid: string,
    length: number,
    weight: number,
    date: string
  ) => {
    const formData = new FormData();
    formData.append("length", length.toString());
    formData.append("weight", weight.toString());
    formData.append("date", date);
    if (length === 0 || weight === 0) {
      alert("กรุณากรอกข้อมูลความยาวและน้ำหนักให้ถูกต้อง");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_url}/growth/kid/${babyid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add baby data");
      }

      setShowInput(false); // Hide input form
      alert("ข้อมูลถูกบันทึกเรียบร้อยแล้ว");
    } catch (error) {
      console.error("Error adding baby data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
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
        window.location.href = "/auth/login";
        return;
      }
    };
    fetchData();
    if (token) {
      fetchBabyData(token!, babyId!);
    } else {
      console.error("Invalid or missing parameter: id");
    }
    setLoading(false);

    fetchData();
  }, [token, babyId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-160px] max-sm:mt-[-112px]">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-[30px] ">
        <div className="flex justify-between  w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
          <h1 className="font-bold  text-[20px] text-left ">
            แก้ไข / เพิ่มข้อมูล
          </h1>
          <div className="w-2/12 max-sm:w-1/2">
            <ButtonComponents
              title="เพิ่มข้อมูล"
              textSize="text-[15px] font-bold"
              onClick={() => setShowInput(true)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
            ข้อมูล
          </h3>
          <div className="flex flex-col gap-8">
            {babyData.map((data, index) => (
              <div key={index} className="flex flex-col">
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-[64px] max-sm:gap-7 max-sm:grid-cols-[1fr_1fr_1fr_1fr]">
                  <div className="flex flex-row gap-1 max-sm:col-span-4 max-sm:col-start-1 ">
                    <div className="flex-none">
                      <h3>{index + 1}.</h3>
                    </div>
                    <div className="flex flex-col flex-1">
                      <h3>วันที่</h3>
                      <h4>{data.updated_at.slice(0, 10)}</h4>
                    </div>
                  </div>
                  <div className="max-sm:col-start-1 max-sm:col-end-3 max-sm:col-span-2 ">
                    <h3>ส่วนสูง (ซม.)</h3>
                    <h4>{data.length}</h4>
                  </div>
                  <div className="max-sm:col-start-3 max-sm:col-end-5 max-sm:col-span-2 ">
                    <h3>น้ำหนัก (กรัม)</h3>
                    <h4>{data.weight}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showInput && (
            <div className=" max-xl:w-[770px] max-sm:w-[324px] flex-col ">
              <div className="flex flex-col ">
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-[64px] max-sm:gap-2  max-sm:grid-cols-[1fr_1fr_1fr_1fr] ">
                  <div className="flex flex-row gap-1 max-sm:col-span-4 max-sm:col-start-1">
                    <div className="flex-none">
                      <h3>{babyData.length + 1}.</h3>
                    </div>
                    <div className="flex flex-col flex-1">
                      <label htmlFor="date">วันที่</label>
                      <input
                        type="text"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="MM/DD/YYYY"
                        className="border border-gray-300 rounded px-2 py-1 "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col max-sm:col-start-1 max-sm:col-end-3 max-sm:col-span-2">
                    <label htmlFor="weight">น้ำหนัก (กรัม)</label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={weight}
                      onChange={(e) =>
                        setWeight(parseFloat(e.target.value) || 0)
                      }
                      placeholder="16.0"
                      className="border border-gray-300 rounded px-2 py-1 "
                    />
                  </div>
                  <div className="flex flex-col max-sm:col-start-3 max-sm:col-end-5 max-sm:col-span-2">
                    <label htmlFor="height">ความยาว (ซม.)</label>
                    <input
                      type="number"
                      id="height"
                      value={length}
                      onChange={(e) =>
                        setLength(parseFloat(e.target.value) || 0)
                      }
                      name="height"
                      placeholder="60.0"
                      className="border border-gray-300 rounded px-2 py-1 "
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <div className="w-[180px] max-sm:w-1/2">
                  <ButtonComponents4
                    title="ยกเลิก"
                    textSize="text-[15px] font-bold"
                    onClick={() => setShowInput(false)}
                  />
                </div>
                <div className="w-[180px] max-sm:w-1/2">
                  <ButtonComponents
                    title="บันทึกข้อมูล"
                    textSize="text-[15px] font-bold"
                    onClick={() =>
                      handleAddData(token!, babyId!, length, weight, date)
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
              <Chatbot showChat={showChat} setShowChat={setShowChat} />

      </div>
    );
  }
};

export default PageBabyEdit;
