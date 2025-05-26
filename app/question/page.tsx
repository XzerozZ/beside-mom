"use client";
import React, { useEffect } from "react";
import Qabox from "../component/qabox";
import { QuestionAnswer } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";

const page = () => {
  const [question, setQuestion] = React.useState<QuestionAnswer[]>();
  const token = localStorage.getItem("token");
  const fetchQA = async (token: string) => {
    try {
      const res = await fetch(`http://localhost:5000/question`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setQuestion(data.result);
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
    if (token) {
      fetchQA(token!);
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
            คำถามที่พบบ่อย
          </h1>
          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px] flex flex-col gap-[40px]">
            {question?.map((qa, index) => (
              <Qabox key={index} {...qa} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default page;
