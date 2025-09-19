"use client";
import { API_URL } from "@/config/config";

import React from "react";
import CalendarCard from "../../component/calendarcard2";
import { Appointment } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Chatbot from "../../component/chatbot";

const PageCalendarHistory = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [calendar, setCalendar] = React.useState<Appointment[]>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showChat, setShowChat] = React.useState<boolean>(false);

  // Fetch token from localStorage on client only
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const fetchCalendar = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/appoint`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setCalendar(data.result);
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
      fetchCalendar(token);
      setLoading(false);
    };
    if (token) {
      fetchData();
    }
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
            การตรวจตามนัด {">>"} ประวัติการนัด
          </h1>
          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
            {calendar?.map((appointment) => (
              <CalendarCard key={appointment.id} {...appointment} />
            ))}
          </div>
        </div>
        <Chatbot showChat={showChat} setShowChat={setShowChat} />
      </div>
    );
  }
};
export default PageCalendarHistory;
