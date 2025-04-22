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
  const { id } = useParams();
  const [momInfo, setMomInfo] = useState({
    id: id,
    momname: "ณัฐฐนิษา อัมพรชัยจรัส",
  });
  const doctors = [
    { id: "1", name: "นพ. สมชาย ใจดี" },
    { id: "2", name: "พญ. สมหญิง รักษาดี" },
    { id: "3", name: "นพ. วิชัย สุขภาพดี" },
    { id: "4", name: "พญ. นงนุช ชำนาญการ" },
  ];
  const [appointmentmomInfo, setAppointmentmomInfo] = useState({
    id: id,
    momname: momInfo.momname,
    subject: "ตรวจแผลผ่าคลอด",
    date: "15/03/2025",
    time: "14:00",
    location: "ชั้น 6 อาคารกปร.",
    doctor: "นพ. สมชาย ใจดี",
    description: "เจาะเลือดก่อนพบแพทย์",
  });
  // useEffect(() => {
  //     // Fetch mom info based on id
  //     // setMomInfo(response.data);
  // }
  // }, [id]);
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
          if (id !== "1") {
            // Navigate to other pages based on sidebar selection
            switch (id) {
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
        selectedItem="1" // Keep this fixed since we're in the mom info section
      />
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Typography
          gutterBottom
          className="mt-7 font-bold text-2x text-neutral05"
        >
          การแก้ไขข้อมูลการนัดหมาย
        </Typography>
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
      </Container>
    </div>
  );
}
