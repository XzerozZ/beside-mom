"use client";
import { API_URL } from "@/config/config";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  FormLabel,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import StyledAlert from "@/app/admin/components/StyledAlert";
import { useAlert } from "@/app/admin/hooks/useAlert";

import { MomApiData } from "@/app/admin/types";

export default function AppointmentAdd() {
  const router = useRouter();
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermID, setSearchTermID] = useState("");
  const [allmomInfo, setAllMomInfo] = useState<
    { id: string; momname: string }[]
  >([]);
  const [appointmentmomInfo, setAppointmentmomInfo] = useState({
    id: "",
    momname: "",
    subject: "",
    date: "",
    time: "",
    location: "",
    doctor: "",
    description: "",
  });

  // ดึงข้อมูลแม่ทั้งหมด
  useEffect(() => {
    const fetchAllMoms = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showError("กรุณาเข้าสู่ระบบใหม่");
          router.push("/auth/login");
          return;
        }
        const apiUrl = `${API_URL}/user`;
        const response = await fetch(apiUrl as string, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (data.status !== "Success") throw new Error(data.message || "Error");
        const moms = (data.result || []).map((m: MomApiData) => ({
          id: m.u_id,
          momname: `${m.fname} ${m.lname}`,
        }));
        setAllMomInfo(moms);
      } catch (err) {
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูลคุณแม่");
        console.error(err);
      }
    };
    fetchAllMoms();
  }, [router, showError]);

  // ฟิลเตอร์
  const filteredMomsName = searchTermName
    ? allmomInfo.filter((mom) =>
        mom.momname.toLowerCase().includes(searchTermName.toLowerCase())
      )
    : [];
  const filteredMomsID = searchTermID
    ? allmomInfo.filter((mom) =>
        mom.id.toLowerCase().includes(searchTermID.toLowerCase())
      )
    : [];

  // เลือกแม่แล้ว set ทั้ง id และชื่อ
  const handleMomSelect = (mom: { id: string; momname: string }) => {
    setAppointmentmomInfo((prev) => ({
      ...prev,
      id: mom.id,
      momname: mom.momname,
    }));
    setSearchTermName("");
    setSearchTermID("");
  };

  // ส่งข้อมูลนัดหมาย
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      showError("กรุณาเข้าสู่ระบบใหม่");
      router.push("/auth/login");
      return;
    }
    try {
      const apiUrl = `${API_URL}/appoint/${appointmentmomInfo.id}`;
      const formData = new FormData();
      formData.append("title", appointmentmomInfo.subject);
      const formattedDate = appointmentmomInfo.date
        ? appointmentmomInfo.date.replace(/\//g, "-")
        : "";
      formData.append("date", formattedDate);
      formData.append("start_time", appointmentmomInfo.time);
      formData.append("building", appointmentmomInfo.location);
      formData.append("doctor", appointmentmomInfo.doctor);
      formData.append("requirement", appointmentmomInfo.description);
      console.log("Form data:", appointmentmomInfo);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      showSuccess("บันทึกข้อมูลสำเร็จ");
      router.push("/admin/appointment");
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    }
  };

  return (
    <div className="flex bg-white">
      <Sidebar selectedItem="5" />
      <div className="flex-1 p-6 w-full ">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Typography
            gutterBottom
            className="mt-7 font-bold text-2x text-neutral05"
          >
            การเพิ่มข้อมูลการนัดหมาย
          </Typography>
          <Box className="mt-5">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormLabel>ID</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="ค้นหาIDคุณแม่"
                  name="id"
                  type="text"
                  value={appointmentmomInfo.id || ""}
                  onChange={(e) => {
                    setSearchTermID(e.target.value);
                    setAppointmentmomInfo({
                      ...appointmentmomInfo,
                      id: e.target.value,
                    });
                  }}
                />
                {searchTermID && (
                  <Paper
                    elevation={2}
                    sx={{ maxHeight: 200, overflow: "auto", mt: 1 }}
                    className="absolute z-10 w-64"
                  >
                    {filteredMomsID.length > 0 ? (
                      filteredMomsID.map((mom) => (
                        <Box
                          key={mom.id}
                          sx={{
                            px: 2,
                            py: 1,
                            cursor: "pointer",
                            "&:hover": { bgcolor: "#f5f5f5" },
                            bgcolor:
                              appointmentmomInfo.id === mom.id
                                ? "#e0e0e0"
                                : "inherit",
                          }}
                          onClick={() => handleMomSelect(mom)}
                        >
                          {mom.id}
                        </Box>
                      ))
                    ) : (
                      <Box sx={{ px: 2, py: 1 }}>ไม่พบข้อมูลคุณแม่</Box>
                    )}
                  </Paper>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormLabel>ชื่อคุณแม่</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="ค้นหาชื่อคุณแม่"
                  value={appointmentmomInfo.momname || ""}
                  onChange={(e) => {
                    setSearchTermName(e.target.value);
                    setAppointmentmomInfo({
                      ...appointmentmomInfo,
                      momname: e.target.value,
                    });
                  }}
                />
                {/* แสดงผลลัพธ์การค้นหา */}
                {searchTermName && (
                  <Paper
                    elevation={2}
                    sx={{ maxHeight: 200, overflow: "auto", mt: 1 }}
                    className="absolute z-10 w-64"
                  >
                    {filteredMomsName.length > 0 ? (
                      filteredMomsName.map((mom) => (
                        <Box
                          key={mom.id}
                          sx={{
                            px: 2,
                            py: 1,
                            cursor: "pointer",
                            "&:hover": { bgcolor: "#f5f5f5" },
                            bgcolor:
                              appointmentmomInfo.id === mom.id
                                ? "#e0e0e0"
                                : "inherit",
                          }}
                          onClick={() => handleMomSelect(mom)}
                        >
                          {mom.momname}
                        </Box>
                      ))
                    ) : (
                      <Box sx={{ px: 2, py: 1 }}>ไม่พบข้อมูลคุณแม่</Box>
                    )}
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Box>

          <Box className="mt-5">
            <FormLabel>หัวข้อ</FormLabel>
            <TextField
              fullWidth
              size="small"
              name="subject"
              type="text"
              value={appointmentmomInfo.subject}
              onChange={(e) =>
                setAppointmentmomInfo({
                  ...appointmentmomInfo,
                  subject: e.target.value,
                })
              }
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
                  onChange={(e) =>
                    setAppointmentmomInfo({
                      ...appointmentmomInfo,
                      date: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>เวลา</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="time"
                  type="text"
                  placeholder="ex. 10:00 "
                  value={appointmentmomInfo.time}
                  onChange={(e) =>
                    setAppointmentmomInfo({
                      ...appointmentmomInfo,
                      time: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box className="mt-5">
            <FormLabel>สถานที่</FormLabel>
            <TextField
              fullWidth
              size="small"
              name="location"
              type="text"
              value={appointmentmomInfo.location}
              onChange={(e) =>
                setAppointmentmomInfo({
                  ...appointmentmomInfo,
                  location: e.target.value,
                })
              }
            />
          </Box>
          <Box className="mt-5">
            <FormLabel>แพทย์</FormLabel>
            <TextField
              fullWidth
              size="small"
              name="doctor"
              type="text"
              placeholder="ex. นพ.สมชาย ใจดี"
              value={appointmentmomInfo.doctor}
              onChange={(e) =>
                setAppointmentmomInfo({
                  ...appointmentmomInfo,
                  location: e.target.value,
                })
              }
            />
          </Box>

          <Box className="mt-5">
            <FormLabel>การเตรียมตัว</FormLabel>
            <TextField
              fullWidth
              size="small"
              name="description"
              type="text"
              value={appointmentmomInfo.description}
              onChange={(e) =>
                setAppointmentmomInfo({
                  ...appointmentmomInfo,
                  description: e.target.value,
                })
              }
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
              onClick={() => router.push(`/admin/appointment`)}
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
              onClick={handleSubmit}
            >
              บันทึก
            </Button>
          </Box>
        </Container>
      </div>
      <StyledAlert
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
        onClose={hideAlert}
      />
    </div>
  );
}
