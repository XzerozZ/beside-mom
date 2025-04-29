"use client";
import React, { useEffect } from "react";
import Navbar from "../../component/navbar";
import CalendarCard from "../../component/calendarcard2";
import { Appointment } from "@/app/interface";

const page = () => {
  const [calendar, setCalendar] = React.useState<Appointment[]>();
  const fetchCalendar = async () => {
    try {
      const res = await fetch(`http://localhost:5000/appoint`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNmFjMDQ4OGQtYWFiMS00YjhiLWJhYzUtMTgxNjg2M2JhOWYwIn0.IOe-r5myKw2a3SnU-1AVNWjqtUg0Eqgs_TCZPHXbt1U`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setCalendar(data.result);
      } else {
        console.error("Failed to fetch kid data");
      }
    } catch (error) {
      console.error("An error occurred while fetching kid data:", error);
    }
  };
  console.log(calendar);
  useEffect(() => {
    fetchCalendar();
  }, []);

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNjY4ZDZmZmItZWI5OC00MjdiLWIwNDctOTBkZWM4NGFjNGY1In0.IyCYJqW1TShqVKqpSG9K1_ggape5U7yexNH6SWqnNRs
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
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
        </div>
      </main>
    </div>
  );
};

export default page;
