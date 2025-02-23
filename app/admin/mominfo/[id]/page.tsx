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

import AllMomInfoPage from "@/app/admin/mominfo/page";
import ContactNurseInfo from "@/app/admin/nurse-contact/page";

interface MomInfo {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface BabyInfo {
  id: string;
  img: string;
  firstName: string;
  lastName: string;
  nickname: string;
  gender: string;
  birthDate: string;
  bloodType: string;
  birthWeight: string;
  birthHeight: string;
  note: string;
}

export default function MomInfoId() {
  const params = useParams();
  const router = useRouter();
  const [momInfo, setMomInfo] = useState<MomInfo>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [babyInfo, setBabyInfo] = useState<BabyInfo>({
    id: "",
    img: "",
    firstName: "",
    lastName: "",
    nickname: "",
    gender: "",
    birthDate: "",
    bloodType: "",
    birthWeight: "",
    birthHeight: "",
    note: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        id: params.id as string,
        firstName: "ณัฐฐนิษา",
        lastName: "อัมพรชัยจรัส",
        email: "lovely@gmail.com",
      };
      setMomInfo(data);
      setBabyInfo({
        id: "1",
        img: "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg",
        firstName: "อรดี",
        lastName: "แสงทอง",
        nickname: "อร",
        gender: "female",
        birthDate: "2021-10-01",
        bloodType: "O",
        birthWeight: "18.6",
        birthHeight: "50",
        note: "เด็กเป็นปกติหลังคลอด",
      });
    };

    fetchData();
  }, [params.id]);

  // Simulated fetch data - replace with actual API call

  // const [selectedItem, setSelectedItem] = useState("1");

  return (
    <div className="flex bg-white">
      <Sidebar
        onItemSelect={(id) => {
          if (id !== "0") {
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
                break;
              case "7":
                router.push("/admin/appointment");
                break;
            }
          }
        }}
        selectedItem="1" // Keep this fixed since we're in the mom info section
      />
      <div className="flex-1 p-6">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box component="form" sx={{ mt: 3 }}>
            <Typography
              gutterBottom
              className="font-bold text-2x mb-8 text-neutral05"
            >
              ข้อมูลคุณแม่
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <FormLabel>ID</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="ID"
                  name="id"
                  value={momInfo.id}
                  disabled // Usually ID should be read-only
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormLabel>อีเมล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="อีเมล"
                  name="email"
                  type="email"
                  value={momInfo.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="ชื่อ"
                  name="firstName"
                  value={momInfo.firstName || ""} // You'll need to add firstName to MomInfo interface
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="นามสกุล"
                  name="lastName"
                  value={momInfo.lastName} // You'll need to add lastName to MomInfo interface
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
          <div className=" mt-8">
            <div className="bg-neutral04 h-[1px] w-full"></div>
          </div>
          <Box component="form" sx={{ mt: 3 }}>
            <Typography className="font-bold text-2x my-8 text-neutral05">
              ข้อมูลทารก
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={2.4} className="relative">
                <div className="relative w-44 h-44">
                  <img
                    src={
                      babyInfo.img ||
                      "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg"
                    }
                    alt="Profile"
                    className="w-44 h-44 rounded-full overflow-hidden object-cover"
                  />
                </div>
              </Grid>
              ;
              <Grid item xs={12} sm={4.64} className="flex flex-col gap-2">
                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="ชื่อ"
                  name="firstName"
                  value={babyInfo.firstName}
                  disabled
                />
                <FormLabel>ชื่อเล่น</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="ชื่อเล่น"
                  name="nickname"
                  value={babyInfo.nickname}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4.9} className="flex flex-col gap-2">
                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="นามสกุล"
                  name="lastName"
                  value={babyInfo.lastName}
                  disabled
                />
                <FormLabel>วันเกิด</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="วันเกิด"
                  name="birthDate"
                  value={babyInfo.birthDate}
                  disabled
                  type="date"
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={0.7}>
                <FormLabel>เพศ</FormLabel>
              </Grid>
              <Grid item xs={12} sm={1.75}>
                <RadioGroup name="gender" value={babyInfo.gender}>
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        disabled
                        sx={{
                          color: "#999999",
                          "&.Mui-checked": { color: "#B36868" },
                        }}
                      />
                    }
                    className="text-neutral04"
                    label="ชาย"
                  />
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        disabled
                        sx={{
                          color: "#999999",
                          "&.Mui-checked": { color: "#B36868" },
                        }}
                      />
                    }
                    className="text-neutral04"
                    label="หญิง"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={9.5}>
                <FormLabel>กรุ๊ปเลือด</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name="bloodType"
                  value={babyInfo.bloodType}
                  disabled
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="O">O</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormLabel>น้ำหนักแรกเกิด (กก.)</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="birthWeight"
                  value={babyInfo.birthWeight}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>ความยาวแรกเกิด (ซม.)</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="birthHeight"
                  value={babyInfo.birthHeight}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <FormLabel>โน้ต</FormLabel>
            <TextField
              fullWidth
              size="small"
              name="note"
              value={babyInfo.note}
              disabled
              multiline
              rows={3}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              className="text-neutral05 w-full"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none",
              }}
              onClick={() => router.push("/admin/edit/graphs")}
            >
              กราฟการเจริญเติบโต
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 17L15 12L10 7V17Z" fill="#999999" />
              </svg>
            </Button>
            <div className="">
              <div className="bg-neutral04 h-[1px] w-full"></div>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
}
