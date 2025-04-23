"use client";

import { useState, useRef, useEffect } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
  Box,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import { useRouter, useSearchParams } from "next/navigation";
import TopBarSection from "../components/Topbar";

type AppointmentStatus = "สำเร็จ" | "ยกเลิก" | "เลื่อน" | "นัดแล้ว";

const appointments: {
  id: string;
  name: string;
  date: string;
  time: string;
  doctor: string;
  status: AppointmentStatus;
}[] = [
  {
    id: "65090500435",
    name: "ณัฐฐ อัมพรชัยจรัส",
    date: "02/25/2025",
    time: "13:00",
    doctor: "ณัฐฐนิษา อัมพรชัยจรัส",
    status: "สำเร็จ",
  },
  {
    id: "65090500436",
    name: "นิษา อัมพรชัยจรัส",
    date: "02/24/2025",
    time: "13:00",
    doctor: "ณัฐฐนิษา อัมพรชัยจรัส",
    status: "ยกเลิก",
  },
  {
    id: "65090500437",
    name: "ษา อัมพรชัยจรัส",
    date: "02/23/2025",
    time: "13:00",
    doctor: "ณัฐฐนิษา อัมพรชัยจรัส",
    status: "เลื่อน",
  },
  {
    id: "65090500438",
    name: "ณัฐฐนิ อัมพรชัยจรัส",
    date: "02/22/2025",
    time: "13:00",
    doctor: "ณัฐฐนิษา อัมพรชัยจรัส",
    status: "นัดแล้ว",
  },
];

const statusColors = {
  สำเร็จ: "text-green-500",
  ยกเลิก: "text-gray-400",
  เลื่อน: "text-purple-400",
  นัดแล้ว: "text-red-500",
};

const statusDots = {
  สำเร็จ: "bg-green-500",
  ยกเลิก: "bg-gray-400",
  เลื่อน: "bg-purple-400",
  นัดแล้ว: "bg-red-500",
};

export default function AppointmentPage() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [doctorDropdownOpen, setDoctorDropdownOpen] = useState(false);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof appointments)[0];
    direction: "asc" | "desc";
  } | null>(null);
  const doctors = [
    { id: "1", name: "นพ. สมชาย ใจดี" },
    { id: "2", name: "พญ. สมหญิง รักษาดี" },
    { id: "3", name: "นพ. วิชัย สุขภาพดี" },
    { id: "4", name: "พญ. นงนุช ชำนาญการ" },
    { id: "5", name: "ณัฐฐนิษา อัมพรชัยจรัส" },
  ];

  const router = useRouter();

  // Handle row selection/click
  const handleRowClick = (appointmentId: string) => {
    router.push(`/admin/appointment/${appointmentId}`);
  };

  const handleSort = (key: keyof (typeof appointments)[0]) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const order = direction === "asc" ? 1 : -1;
    if (a[key] < b[key]) return -1 * order;
    if (a[key] > b[key]) return 1 * order;
    return 0;
  });

  const filteredAppointments = sortedAppointments.filter(
    (appointment) =>
      (appointment.id.includes(searchTerm) ||
        appointment.name.includes(searchTerm) ||
        appointment.doctor.includes(searchTerm)) &&
      (selectedDoctor === "" || appointment.doctor === selectedDoctor)
  );

  const handleDoctorChange = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    setDoctorDropdownOpen(false);
  };

  return (
    <div className="flex bg-white">
      <Sidebar
        onItemSelect={(id) => {
          if (id !== "5") {
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
                router.push("/admin/appointment");
                break;
              case "6":
                router.push("/admin/nurse-contact");
                break;
            }
          }
        }}
        selectedItem="5"
      />
      <div className="flex-1 p-6 h-full">
        <Container className="h-full">
          <TopBarSection
            title="ข้อมูลการตรวจตามนัด"
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            onAddClick={() => console.log("Add appointment clicked")}
          />

          <TableContainer className="h-full overflow-visible">
            <Table className="h-full overflow-visible">
              <TableHead className="h-full">
                <TableRow className="h-full">
                  <TableCell
                    className="font-bold text-center cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      ID
                      <span className="w-4 h-4 inline-flex">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.83301 12.4998L10.1663 15.8332L13.4997 12.4998M13.4997 7.49984L10.1663 4.1665L6.83301 7.49984"
                            stroke="#4D4D4D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="font-bold text-center cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      ชื่อ นามสกุล
                      <span className="w-4 h-4 inline-flex">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.83301 12.4998L10.1663 15.8332L13.4997 12.4998M13.4997 7.49984L10.1663 4.1665L6.83301 7.49984"
                            stroke="#4D4D4D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="font-bold text-center cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      วันที่
                      <span className="w-4 h-4 inline-flex">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.83301 12.4998L10.1663 15.8332L13.4997 12.4998M13.4997 7.49984L10.1663 4.1665L6.83301 7.49984"
                            stroke="#4D4D4D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-center">เวลา</TableCell>

                  <TableCell
                    className="font-bold text-center cursor-pointer relative overflow-visible"
                    onClick={() => setDoctorDropdownOpen(!doctorDropdownOpen)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      แพทย์
                      <span className="w-4 h-4 inline-flex">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.83301 12.4998L10.1663 15.8332L13.4997 12.4998M13.4997 7.49984L10.1663 4.1665L6.83301 7.49984"
                            stroke="#4D4D4D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    {doctorDropdownOpen && (
                      <div className="absolute z-10 mt-2 right-0 min-w-[150px] bg-white shadow-lg rounded-md border border-gray-200">
                        <div className="p-2">
                          <div
                            className={`px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100 ${
                              selectedDoctor === ""
                                ? "bg-gray-100 font-medium"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDoctorChange("");
                            }}
                          >
                            ทั้งหมด
                          </div>
                          {doctors.map((doctor) => (
                            <div
                              key={doctor.id}
                              className={`px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100 ${
                                selectedDoctor === doctor.name
                                  ? "bg-gray-100 font-medium"
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDoctorChange(doctor.name);
                              }}
                            >
                              {doctor.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="font-bold text-center">สถานะ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appointment, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(appointment.id)}
                    className="cursor-pointer"
                  >
                    <TableCell className="text-center">
                      {appointment.id}
                    </TableCell>
                    <TableCell className="text-center">
                      {appointment.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {appointment.date}
                    </TableCell>
                    <TableCell className="text-center">
                      {appointment.time}
                    </TableCell>
                    <TableCell className="text-center">
                      {appointment.doctor}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2 items-center justify-center">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            statusDots[appointment.status]
                          }`}
                        ></span>
                        <span className={statusColors[appointment.status]}>
                          {appointment.status}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </div>
  );
}
