"use client";
import React, { useEffect } from "react";
import CalendarCard from "../component/calendarcard";
import { Appointment } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/user/component/css/loader.css";
import { ButtonComponents } from "../component/button";

const page = () => {
  const [calendar, setCalendar] = React.useState<Appointment[]>();
  const token = localStorage.getItem("token");
  const fetchCalendar = async (token: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/appoint/history/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
                window.location.href = "/user/auth/login";
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
        window.location.href = "/user/auth/login";
        return;
      }
    };
    if (token) {
      fetchCalendar(token!);
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
        <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
          <div className="flex  justify-between">
            <h1 className="font-bold text-[20px] text-left">การตรวจตามนัด</h1>
            <div className="w-[180px] max-sm:w-[120px]">
              <ButtonComponents
                title="ดูประวัติการนัดหมาย"
                onClick={() => {
                  window.location.href = "/user/calendar/history";
                }}
              />
            </div>
          </div>
            </div>
          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
            <h2 className="font-bold text-[16px] text-left my">
              การนัดหมายครั้งถัดไป
            </h2>

            <div className="max-sm:hidden">
              {calendar?.map((appointment) => (
                <CalendarCard key={appointment.id} {...appointment} />
              ))}
            </div>

            <div className="sm:hidden">
              {calendar && calendar[0] && <CalendarCard {...calendar[0]} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
