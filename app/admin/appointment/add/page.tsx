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
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  IconButton,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";

export default function Babygraphs() {
  const router = useRouter();
  const [searchTermName, setsearchTermName] = useState("");
  const [searchTermID, setsearchTermID] = useState("");
  const [allmomInfo, setallMomInfo] = useState([
    { id: "1", momname: "นิษา ชัยจรัส" },
    { id: "2", momname: "ณัฐฐษา อัมพรชัยจรัส" },
    { id: "3", momname: "ณัฐฐ อัมชัยจรัส" },
    { id: "4", momname: "ฐนิษา อัมพรชัย" },
  ]);
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

  // Sample doctors data
  const doctors = [
    { id: "1", name: "นพ. สมชาย ใจดี" },
    { id: "2", name: "พญ. สมหญิง รักษาดี" },
    { id: "3", name: "นพ. วิชัย สุขภาพดี" },
    { id: "4", name: "พญ. นงนุช ชำนาญการ" },
  ];

  const filteredMomsname = searchTermName
    ? allmomInfo.filter((mom) =>
        mom.momname.toLowerCase().includes(searchTermName.toLowerCase())
      )
    : [];
  const filteredMomsID = searchTermID
    ? allmomInfo.filter((mom) =>
        mom.id.toLowerCase().includes(searchTermID.toLowerCase())
      )
    : [];

  // Handle mom selection
  const handleMomSelect = (mom: { id: string; momname: string }) => {
    setAppointmentmomInfo({
      ...appointmentmomInfo,
      id: mom.id,
      momname: mom.momname,
    });
    setsearchTermName(""); // Clear search after selection
    setsearchTermID(""); // Clear search after selection
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentmomInfo({
      ...appointmentmomInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex bg-white">
      <Sidebar
        onItemSelect={(id) => {
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
              router.push("/admin/appointment");
              break;
            case "6":
              router.push("/admin/nurse-contact");
              break;
          }
        }}
        selectedItem="5"
      />
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
                    setsearchTermID(e.target.value);
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
                    setsearchTermName(e.target.value);
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
                    {filteredMomsname.length > 0 ? (
                      filteredMomsname.map((mom) => (
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
                  name="time"
                  type="time"
                  value={appointmentmomInfo.time}
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
              name="location"
              type="text"
              value={appointmentmomInfo.location}
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
              onChange={(e: SelectChangeEvent) =>
                setAppointmentmomInfo({
                  ...appointmentmomInfo,
                  doctor: e.target.value,
                })
              }
            >
              <MenuItem value="">-- เลือกแพทย์ --</MenuItem>
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
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
              name="description"
              type="text"
              value={appointmentmomInfo.description}
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
            >
              บันทึก
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
}
