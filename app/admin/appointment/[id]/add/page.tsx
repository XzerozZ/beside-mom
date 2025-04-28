"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import { doctors } from "@/app/admin/types";
export default function Babygraphs() {
  const router = useRouter();
  const { id } = useParams();

 

  const [appointmentmomInfo, setAppointmentmomInfo] = useState({
    id: id,
    momname: "",
    title: "",
    date: "",
    start_time: "",
    building: "",
    doctor: "",
    requirement: "",
  });

  // Fetch mom info
  useEffect(() => {
    const fetchMomInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("กรุณาเข้าสู่ระบบใหม่");
          router.push("/user/auth/login");
          return;
        }
        const apiUrl = `${process.env.NEXT_PUBLIC_api_mominfo}/info/${id}`;
        const response = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (data.status !== "Success") throw new Error(data.message || "Error");
        setAppointmentmomInfo((prev) => ({
          ...prev,
          momname: data.result.fname + " " + data.result.lname,
        }));
      } catch (err) {
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูลคุณแม่");
      }
    };
    fetchMomInfo();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentmomInfo({
      ...appointmentmomInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleDoctorChange = (e: any) => {
    setAppointmentmomInfo({
      ...appointmentmomInfo,
      doctor: e.target.value,
    });
  };

  // Submit appointment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบใหม่");
      router.push("/user/auth/login");
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_api_appointment}/${id}`;
      const formData = new FormData();
      // Ensure date is in yyyy-mm-dd format
      const formattedDate = appointmentmomInfo.date
        ? appointmentmomInfo.date.replace(/\//g, "-")
        : "";
      formData.append("date", formattedDate);
      formData.append("start_time", appointmentmomInfo.start_time);
      formData.append("doctor", appointmentmomInfo.doctor);
      formData.append("building", appointmentmomInfo.building);
      formData.append("requirement", appointmentmomInfo.requirement);
      formData.append("title", appointmentmomInfo.title);
      console.log("Form data:", appointmentmomInfo);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type when using FormData
        },
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      alert("บันทึกข้อมูลสำเร็จ");
      router.push(`/admin/appointment/${id}`);
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="flex bg-white">
      <Sidebar
        onItemSelect={(id) => {
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
        }}
        selectedItem="1"
      />
      <div className="flex-1 p-6 w-full ">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Typography gutterBottom className="mt-7 font-bold text-2x text-neutral05">
            การเพิ่มข้อมูลการนัดหมาย
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="mt-5">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormLabel>id</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="id"
                    type="text"
                    value={appointmentmomInfo.id}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel>ชื่อคุณแม่</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="momname"
                    type="text"
                    value={appointmentmomInfo.momname}
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className="mt-8">
              <FormLabel>หัวข้อ</FormLabel>
              <TextField
                fullWidth
                size="small"
                name="title"
                type="text"
                value={appointmentmomInfo.title}
                onChange={handleChange}
              />
            </Box>
            <Box className="mt-5">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormLabel>วันที่</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="date"
                    type="date"
                    value={appointmentmomInfo.date}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel>เวลา</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="start_time"
                    type="text"
                    value={appointmentmomInfo.start_time}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className="mt-5">
              <FormLabel>สถานที่</FormLabel>
              <TextField
                fullWidth
                size="small"
                name="building"
                type="text"
                value={appointmentmomInfo.building}
                onChange={handleChange}
              />
            </Box>
            <Box className="mt-5">
              <FormLabel>แพทย์</FormLabel>
              <Select
                fullWidth
                size="small"
                name="doctor"
                value={appointmentmomInfo.doctor}
                onChange={handleDoctorChange}
              >
                <MenuItem value="">-- เลือกแพทย์ --</MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.name}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box className="mt-5">
              <FormLabel>การเตรียมตัว</FormLabel>
              <TextField
                fullWidth
                size="small"
                name="requirement"
                type="text"
                value={appointmentmomInfo.requirement}
                onChange={handleChange}
              />
            </Box>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => router.push(`/admin/appointment/${id}`)}
                sx={{ color: "#999999", borderColor: "#999999" }}
                className="w-40"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#B36868",
                  "&:hover": { bgcolor: "#934343" },
                }}
                className="w-40"
              >
                บันทึก
              </Button>
            </Box>
          </form>
        </Container>
      </div>
    </div>
  );
}
