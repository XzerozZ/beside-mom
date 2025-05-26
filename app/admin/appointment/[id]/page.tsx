/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaRegCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaNotesMedical,
  FaUserMd,
} from "react-icons/fa";
import {
  Container,
  Button,
} from "@mui/material";
import TopBarSection from "../../components/Topbar";
import Sidebar from "../../components/SideBarAdmin";

type AppointmentStatus = "สำเร็จ" | "ยกเลิก" | "เลื่อน" | "นัดแล้ว";
const statusMap: Record<number, AppointmentStatus> = {
  1: "นัดแล้ว",
  2: "สำเร็จ",
  3: "ยกเลิก",
  4: "เลื่อน",
};

const statusColors = {
  สำเร็จ: "text-[#409261]",
  ยกเลิก: "text-gray-400",
  เลื่อน: "text-[#9494FF]",
  นัดแล้ว: "text-primary5",
};

const statusDots = {
  สำเร็จ: "bg-[#409261]",
  ยกเลิก: "bg-gray-400",
  เลื่อน: "bg-[#9494FF]",
  นัดแล้ว: "bg-primary5",
};

interface Appointment {
  id: string;
  momname: string;
  topic: string;
  date: string;
  day: string;
  daydate: string;
  doctor: string;
  status: AppointmentStatus;
  number: string;
  time: string;
  location: string;
  info: string;
}

const AppointmentsPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
     
        const token = localStorage.getItem("token");
        if (!token) {
          alert("กรุณาเข้าสู่ระบบใหม่");
          router.push("/user/auth/login");
          return;
        }
        const apiUrl = `${process.env.NEXT_PUBLIC_api_appointment}/history/mom/${id}`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (data.status !== "Success") throw new Error(data.message || "Error");

        // Map API data to Appointment[]
        const mapped: Appointment[] = (data.result || []).map((item: any, idx: number) => ({
          id: item.id,
          momname: item.name,
          topic: item.title || "-",
          date: item.date
            ? new Date(item.date).toLocaleDateString("th-TH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
            : "",
          day: item.date
            ? new Date(item.date).toLocaleDateString("th-TH", { weekday: "long" })
            : "",
          daydate: item.date
            ? new Date(item.date).toLocaleDateString("th-TH", { day: "2-digit" })  
            : "",
          doctor: item.doctor,
          status: statusMap[item.status as number] || "นัดแล้ว",
          number: (idx + 1).toString(),
          time: item.start_time
            ? new Date(item.start_time).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
            : "",
          location: item.building || "-",
          info: item.requirement || "-",
        }));
        setAppointments(mapped);
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูลการนัดหมาย");
        console.error(error);
      } 
    };
    fetchAppointments();
  }, [id, router]);

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (appointmentId: string) => {
    router.push(`/admin/appointment/${appointmentId}/edit`);
    
  };

  async function handleDelete(appointmentId: string): Promise<void> {
    if (!window.confirm("คุณต้องการลบการนัดนี้ใช่หรือไม่?")) return;
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาเข้าสู่ระบบใหม่");
        router.push("/user/auth/login");
        return;
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_api_appointment}/${appointmentId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("ลบการนัดไม่สำเร็จ");
      setAppointments((prev) => prev.filter((a) => a.id !== appointmentId));
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการลบการนัด");
      console.error(error);
    } 
  }
  return (
    <div className="flex bg-white">
     <Sidebar    
      selectedItem="5"
      />
      <div className="flex-1 p-6">
        <Container>
          <TopBarSection
            title="การตรวจตามนัด"
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            onAddClick={() => {}}
          />
            <div className="flex items-center mb-4 justify-end">
              <Button
              variant="outlined"
              sx={{
                minWidth: 0,
                padding: "6px 24px",
                marginRight: "16px",
                borderRadius: "8px",
                color: "#fff",
                borderColor: "#B36868",
                backgroundColor: "#B36868",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                backgroundColor: "#965757",
                borderColor: "#965757",
                },
              }}
              onClick={() => router.push(`/admin/appointment?search=${id}`)}
              >
              ดูประวัติการนัด
              </Button>
            </div>
          <div className="mt-4 space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 flex items-start justify-between shadow-sm"
              >
                <div className="flex items-center">
                  <div className="text-primary5 p-4 rounded-lg text-center w-48">
                    <p className="font-semibold">{appointment.topic}</p>
                    <p className="text-lg py-4">{appointment.day}</p>
                    <p className="text-4xl font-bold">{appointment.daydate}</p>
                  </div>
                  <div className="border-l border-gray-300 mx-4 h-20"></div>
                  <div className="flex-1 space-y-1">
                    <p className="flex items-center gap-2 text-gray-700">
                      <FaRegCalendarAlt /> {appointment.date}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <FaClock /> {appointment.time}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <FaMapMarkerAlt /> {appointment.location}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <FaUserMd />
                      {appointment.doctor}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <FaNotesMedical /> {appointment.info}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        statusDots[appointment.status]
                      }`}
                    ></span>
                    <p className={statusColors[appointment.status]}>
                      {appointment.status}
                    </p>
                  </div>
                </div>
                <div className="flex mt-6">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#999999", borderColor: "#999999" }}
                    className="text-neutral05 mr-5 w-24"
                    onClick={() => handleEdit(appointment.id)}
                  >
                    แก้ไข
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#999999", borderColor: "#999999" }}
                    className="text-neutral05 w-24"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    ลบ
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AppointmentsPage;
