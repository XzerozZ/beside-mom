"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaRegCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaNotesMedical,
} from "react-icons/fa";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import TopBarSection from "../components/Topbar";
import Sidebar from "../components/SideBarAdmin";

interface Appointment {
  id: number;
  topic: string;
  day: string;
  date: string;
  number: string;
  time: string;
  location: string;
  info: string;
}

const AppointmentsPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const handleAddClick = () => {
    console.log("Add appointment clicked");
  };
  const handleEdit = (id: number) => {
    console.log("Edit appointment clicked", id);
    router.push(`/admin/appointment/${id}/edit`);
  };
  const appointments: Appointment[] = [
    {
      id: 1,
      topic: "ตรวจแผลผ่าคลอด",
      date: "อังคารที่ 12 ธันวาคม 2566",
      day: "อังคาร",
      number: "12",
      time: "01:00 PM",
      location: "ชั้น 6 อาคารกปร.",
      info: "เจาะเลือดก่อนพบแพทย์",
    },
    {
      id: 2,
      topic: "ตรวจแผลผ่าคลอด",
      date: "ศุกร์ที่ 15 ธันวาคม 2566",
      day: "ศุกร์",
      number: "15",
      time: "01:00 PM",
      location: "ชั้น 6 อาคารกปร.",
      info: "เจาะเลือดก่อนพบแพทย์",
    },
    {
      id: 3,
      topic: "ตรวจแผลผ่าคลอด",
      date: "พุธที่ 17 มกราคม 2567",
      day: "พุธ",
      number: "17",
      time: "01:00 PM",
      location: "ชั้น 6 อาคารกปร.",
      info: "เจาะเลือดก่อนพบแพทย์",
    },
  ];
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.info.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const groupedAppointments = appointments.reduce((acc, appointment) => {
  //   const month = appointment.date.split(" ")[1];
  //   if (!acc[month]) acc[month] = [];
  //   acc[month].push(appointment);
  //   return acc;
  // }, {} as Record<string, Appointment[]>);
  return (
    <div className="flex bg-white">
      <Sidebar
        onItemSelect={(id) => {
          if (id !== "7") {
            // Navigate to other pages based on sidebar selection
            switch (id) {
              case "1":
                router.push("/admin/mominfo");
                break;
              case "2":
                router.push("/admin/momstories");
                break;
              case "3":
                router.push("/admin/babycare");
                break;
              case "4":
                router.push("/admin/faq");
                break;
              case "5":
                router.push("/admin/nurse-contact");
                break;
              case "6":
                router.push("/admin/babyinfo");
            }
          }
        }}
        selectedItem="1" // Keep this fixed since we're in the mom info section
      />
      <div className="flex-1 p-6">
        <Container>
          <TopBarSection
            title="การตรวจตามนัด"
            searchTerm={searchTerm}
            filterBy={filterBy}
            onSearchChange={(value) => setSearchTerm(value)}
            onFilterChange={(value) => setFilterBy(value)}
            onAddClick={handleAddClick}
          />
          <div className="mt-4 space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 flex items-start justify-between shadow-sm"
              >
                <div className="flex items-center w-full">
                  <div className="text-primary5 p-4 rounded-lg text-center w-48">
                    <p className="font-semibold">{appointment.topic}</p>
                    <p className="text-lg py-4">{appointment.day}</p>
                    <p className="text-4xl font-bold">{appointment.number}</p>
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
                      <FaNotesMedical /> {appointment.info}
                    </p>
                  </div>
                </div>
                <div className="flex mt-6">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#999999", borderColor: "#999999" }}
                    className="text-neutral05 mr-5 w-24"
                    startIcon={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.723 6.0692L14.8599 6.93226L13.0672 5.13949L13.9309 4.27637L13.9309 4.27631C13.9934 4.21382 14.0782 4.17871 14.1666 4.17871C14.2549 4.17871 14.3396 4.21375 14.4021 4.27614C14.4021 4.27616 14.4021 4.27617 14.4022 4.27619C14.4022 4.27623 14.4022 4.27627 14.4023 4.27631L15.7229 5.59781L15.723 5.59787C15.7855 5.66038 15.8206 5.74515 15.8206 5.83353C15.8206 5.92189 15.7855 6.00664 15.723 6.06915C15.723 6.06916 15.723 6.06918 15.723 6.0692ZM3.8291 16.1669V14.3748L11.3282 6.8789L13.1212 8.67187L5.62616 16.1669H3.8291ZM3.80475 14.3992L3.80508 14.3988C3.80497 14.3989 3.80486 14.399 3.80475 14.3992Z"
                          stroke="#4D4D4D"
                        />
                      </svg>
                    }
                    onClick={() => handleEdit(appointment.id)}
                  >
                    แก้ไข
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#999999", borderColor: "#999999" }}
                    className="text-neutral05 w-24"
                    startIcon={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.9165 3.83333H15.3332V4.5H4.6665V3.83333H7.08317H7.29028L7.43672 3.68689L8.12361 3H11.8761L12.563 3.68689L12.7094 3.83333H12.9165ZM6.6665 17C6.02598 17 5.49984 16.4739 5.49984 15.8333V6.33333H14.4998V15.8333C14.4998 16.4739 13.9737 17 13.3332 17H6.6665Z"
                          stroke="#4D4D4D"
                        />
                      </svg>
                    }
                    // onClick={() => handleDelete(data.id)}
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
