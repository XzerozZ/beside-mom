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
import StyledAlert from "@/app/admin/components/StyledAlert";
import { useAlert } from "@/app/admin/hooks/useAlert";
export default function Babygraphs() {
  const router = useRouter();
  const { id } = useParams();
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();

  const [appointmentmomInfo, setAppointmentmomInfo] = useState({
    id: id,
    u_id: "",
    momname: "",
    title: "",
    date: "",
    start_time: "",
    building: "",
    doctor: "",
    requirement: "",
    status: "",
  });

  // Fetch appointment info
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showError("กรุณาเข้าสู่ระบบใหม่");
          router.push("/auth/login");
          return;
        }
        const apiUrl = `${process.env.NEXT_PUBLIC_url}/appoint/${id}`;
        const response = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (data.status !== "Success") throw new Error(data.message || "Error");
        const result = data.result;
        setAppointmentmomInfo({
          id: result.id,
          u_id: result.user_id,
          momname: result.name || "",
          title: result.title || "",
          date: result.date ? result.date.slice(0, 10) : "",
          start_time: result.start_time ? result.start_time.slice(11, 16) : "",
          building: result.building || "",
          doctor: result.doctor || "",
          requirement: result.requirement || "",
          status: result.status ? String(result.status) : "",
        });
      } catch (err) {
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูลนัดหมาย");
        console.error(err);
      }
    };
    fetchAppointment();
  }, [id, router, showError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentmomInfo({
      ...appointmentmomInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Submit edited appointment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      showError("กรุณาเข้าสู่ระบบใหม่");
      router.push("/auth/login");
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_url}/appoint/${id}`;
      const formData = new FormData();
      const formattedDate = appointmentmomInfo.date
        ? appointmentmomInfo.date.replace(/\//g, "-")
        : "";
      formData.append("date", formattedDate);
      formData.append("start_time", appointmentmomInfo.start_time);
      formData.append("doctor", appointmentmomInfo.doctor);
      formData.append("building", appointmentmomInfo.building);
      formData.append("requirement", appointmentmomInfo.requirement);
      formData.append("title", appointmentmomInfo.title);
      formData.append("status", appointmentmomInfo.status);

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      showSuccess("บันทึกข้อมูลสำเร็จ");
      router.push(`/admin/appointment/${appointmentmomInfo.u_id}`);
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    }
  };

  return (
    <div className="flex bg-white">
      <Sidebar selectedItem="5" />
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <StyledAlert
          open={alertState.open}
          message={alertState.message}
          severity={alertState.severity}
          onClose={hideAlert}
        />
        <Typography
          gutterBottom
          className="mt-7 font-bold text-2x text-neutral05"
        >
          การแก้ไขข้อมูลการนัดหมาย
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="mt-5">
            <Grid container spacing={3}></Grid>
          </Box>
          <Box className="mt-5">
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
                  type="time"
                  placeholder="ex: 10:00"
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
            <TextField
              fullWidth
              size="small"
              name="doctor"
              type="text"
              placeholder="ex: นพ.สมชาย ใจดี"
              value={appointmentmomInfo.doctor}
              onChange={handleChange}
            />
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
          <Box className="mt-5">
            <FormLabel>สถานะ</FormLabel>
            <Select
              fullWidth
              size="small"
              name="status"
              value={appointmentmomInfo.status || ""}
              onChange={(e) =>
                setAppointmentmomInfo({
                  ...appointmentmomInfo,
                  status: e.target.value,
                })
              }
            >
              <MenuItem value="">-- เลือกสถานะ --</MenuItem>
              <MenuItem value="1">นัดแล้ว</MenuItem>
              <MenuItem value="2">สำเร็จ</MenuItem>
              <MenuItem value="3">ยกเลิก</MenuItem>
              <MenuItem value="4">เลื่อน</MenuItem>
            </Select>
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
              onClick={() =>
                router.push(`/admin/appointment/${appointmentmomInfo.u_id}`)
              }
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
  );
}
