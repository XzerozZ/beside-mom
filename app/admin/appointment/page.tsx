"use client";

import { useState, useEffect, Suspense } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import { useRouter, useSearchParams } from "next/navigation";
import TopBarSection from "../components/Topbar";
import { doctors } from "../types";
type AppointmentStatus = "สำเร็จ" | "ยกเลิก" | "เลื่อน" | "นัดแล้ว";

import { AppointmentApiData_id ,Appointmentpage} from "../types";


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



function AppointmentPageContent() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [doctorDropdownOpen, setDoctorDropdownOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointmentpage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Appointmentpage;
    direction: "asc" | "desc";
  } | null>(null);



  const router = useRouter();

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("กรุณาเข้าสู่ระบบใหม่");
          router.push("/auth/login");
          return;
        }
        const apiUrl = `${process.env.NEXT_PUBLIC_url}/appoint`;
        if (!apiUrl) throw new Error("API URL not defined");

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (data.status !== "Success") throw new Error(data.message || "Error");

        // Map API data to Appointment[]
        const mapped: Appointmentpage[] = (data.result || []).map((item: AppointmentApiData_id) => ({
          a_id: item.id,
          user_id: item.user_id,
          name: item.name,
          date: item.date ? new Date(item.date).toLocaleDateString("th-TH") : "",
          time: item.start_time
            ? new Date(item.start_time).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
            : "",
          doctor: item.doctor,
          status: statusMap[item.status as number] || "นัดแล้ว",
        }));
        setAppointments(mapped);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("ไม่สามารถดึงข้อมูลการนัดหมายได้");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [router]);

  // Handle row selection/click
  const handleRowClick = (appointmentId: string) => {
    router.push(`/admin/appointment/${appointmentId}`);
  };

  const handleSort = (key: keyof Appointmentpage) => {
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
      (appointment.user_id.includes(searchTerm) ||
        appointment.name.includes(searchTerm) ||
        appointment.doctor.includes(searchTerm)) &&
      (selectedDoctor === "" || appointment.doctor === selectedDoctor)
  );

  const handleDoctorChange = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    setDoctorDropdownOpen(false);
  };

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar selectedItem="5"
      />
      <div className="flex-1 p-6">
        <Container>
          <TopBarSection
            title="ข้อมูลการตรวจตามนัด"
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            onAddClick={() => console.log("Add appointment clicked")}
          />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="font-bold text-center cursor-pointer"
                      onClick={() => handleSort("user_id")}
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
                    <TableCell><h1 className="font-bold text-center flex justify-center">เวลา</h1></TableCell>
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
                    <TableCell><h1 className="font-bold text-center flex justify-center">สถานะ</h1></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.a_id}
                      onClick={() => handleRowClick(appointment.user_id)}
                      className="cursor-pointer"
                    >
                      <TableCell className="text-center">
                        <Typography className="text-center">
                          {appointment.user_id}
                        </Typography>
      
                      </TableCell>
                      <TableCell className="text-center">
                        <Typography className="text-center">
                         {appointment.name}
                        </Typography>
                        
                      </TableCell>
                      <TableCell className="text-center">
                         <Typography className="text-center">
                         {appointment.date}
                        </Typography>
                        
                       
                      </TableCell>
                      <TableCell className="text-center">
                         <Typography className="text-center">
                         {appointment.time}
                        </Typography>
                        
                       
                      </TableCell>
                      <TableCell className="text-center">
                        <Typography className="text-center">
                         {appointment.doctor}
                        </Typography>
                        
                        
                        
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
          )}
        </Container>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><CircularProgress /></div>}>
      <AppointmentPageContent />
    </Suspense>
  );
}
