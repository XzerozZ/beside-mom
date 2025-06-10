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
  CircularProgress,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import StyledAlert from "@/app/admin/components/StyledAlert";
import { useAlert } from "@/app/admin/hooks/useAlert";
export default function Babygraphs() {
  const router = useRouter();
  const { id } = useParams();
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

 

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
          showError("กรุณาเข้าสู่ระบบใหม่");
          router.push("/auth/login");
          return;
        }
        const apiUrl = `${process.env.NEXT_PUBLIC_url}/user/info/${id}`;
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
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูลคุณแม่");
        console.error(err);
      }
    };
    fetchMomInfo();
  }, [id, router, showError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentmomInfo({
      ...appointmentmomInfo,
      [e.target.name]: e.target.value,
    });
  };


  // Submit appointment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // ป้องกันการกดซ้ำ
    
    setIsSubmitting(true);
    
    const token = localStorage.getItem("token");
    if (!token) {
      showError("กรุณาเข้าสู่ระบบใหม่");
      router.push("/auth/login");
      setIsSubmitting(false);
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_url}/appoint/${id}`;
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
      showSuccess("บันทึกข้อมูลสำเร็จ");
      router.push(`/admin/appointment/${id}`);
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex bg-white">
     <Sidebar 
       selectedItem="5"
      />
      <div className="flex-1 p-6 w-full ">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <StyledAlert
            open={alertState.open}
            message={alertState.message}
            severity={alertState.severity}
            onClose={hideAlert}
          />
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
                disabled={isSubmitting}
                sx={{
                  bgcolor: "#B36868",
                  "&:hover": { bgcolor: "#934343" },
                  "&:disabled": { bgcolor: "#999999" },
                }}
                className="w-40"
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </Box>
          </form>
        </Container>
      </div>
    </div>
  );
}
