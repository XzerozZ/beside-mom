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
  const [appointmentmomInfo, setAppointmentmomInfo] = useState({
    subject: "",
    date: "",
    time: "",
    location: "",
    doctor: "",
    type: "",
    description: "",
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
        selectedItem="1"
      />
      <div className="flex-1 p-6 w-full ">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box className="mt-8">
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
              name="type"
              value={appointmentmomInfo.doctor}
              onChange={(e: SelectChangeEvent) =>
                setAppointmentmomInfo({
                  ...appointmentmomInfo,
                  doctor: e.target.value,
                })
              }
            >
              <MenuItem value="1">นายแพทย์1</MenuItem>
              <MenuItem value="2">นายแพทย์2</MenuItem>
            </Select>
          </Box>
          <Box className="mt-5">
            <FormLabel>ประเภท</FormLabel>
            <Select
              fullWidth
              size="small"
              name="type"
              value={appointmentmomInfo.type}
              onChange={(e: SelectChangeEvent) =>
                setAppointmentmomInfo({
                  ...appointmentmomInfo,
                  type: e.target.value,
                })
              }
            >
              <MenuItem value="1">ประจำ</MenuItem>
              <MenuItem value="2">ฉุกเฉิน</MenuItem>
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
    </div>
  );
}
