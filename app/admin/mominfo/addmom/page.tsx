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

import { MomInfo, BabyInfo } from "@/app/admin/types";

export default function EditMomInfo() {
  // const params = useParams();
  const router = useRouter();
  const [momInfo, setMomInfo] = useState<MomInfo>({
    id: "",
    img: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [babyInfo, setBabyInfo] = useState<BabyInfo[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = {
  //       id: params.id as string,
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //     };
  //     setMomInfo(data);
  //     setBabyInfo({
  //       img: "",
  //       firstName: "",
  //       lastName: "",
  //       nickname: "",
  //       gender: "",
  //       birthDate: "",
  //       bloodType: "",
  //       birthWeight: "",
  //       birthHeight: "",
  //       note: "",
  //     });
  //   };

  //   fetchData();
  // }, [params.id]);

  // Simulated fetch data - replace with actual API call

  const handleChangemMom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMomInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeBaby = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setBabyInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your save logic here
    console.log("Saving:", momInfo);
    // After saving, redirect back to the main page
    router.push("/admin/mominfo");
  };
  // const [selectedItem, setSelectedItem] = useState("1");

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
      <div className="flex-1 p-6">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Typography
            gutterBottom
            className="mt-7 font-bold text-2x text-neutral05"
          >
            เพิ่มข้อมูลคุณแม่และทารก
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography
              gutterBottom
              className="font-bold text-2x mb-8 text-neutral05"
            >
              ข้อมูลคุณแม่
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2.4} className="relative">
                <div className="relative w-44 h-44">
                  <img
                    src={
                      momInfo.img ||
                      "https://th.bing.com/th/id/R.774b6856b01ad224faa4a8a6857a279b?rik=NCB%2fGwQX5PyfKQ&riu=http%3a%2f%2fcdn.images.express.co.uk%2fimg%2fdynamic%2f11%2f590x%2fsecondary%2fmother-377773.jpg&ehk=owgczsi5xhC8LXhNjdGeGvXe6EAm%2bmwgXiLQ0WxjcJM%3d&risl=&pid=ImgRaw&r=0"
                    }
                    alt="Profile"
                    className="w-44 h-44 rounded-full overflow-hidden object-cover"
                  />
                  {/* Floating Button */}
                  <IconButton
                    className="absolute bottom-2 right-2 bg-red-100 shadow-md flex items-center justify-center aling-center"
                    size="small"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.82666 23.7039L18.125 13.41L18.5898 13.8748L8.29779 24.1668H7.82666V23.7039ZM23.4915 8.04416C23.4914 8.04427 23.4913 8.04438 23.4912 8.0445L23.4915 8.04416Z"
                        stroke="#B36868"
                        strokeWidth="5"
                      />
                    </svg>
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12} sm={4.8} className="flex flex-col gap-2">
                <FormLabel>ID</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="ID"
                  name="id"
                  value={momInfo.id}
                  onChange={handleChangemMom}
                  disabled // Usually ID should be read-only
                />
                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="ชื่อ"
                  name="firstName"
                  value={momInfo.firstName || ""} // You'll need to add firstName to MomInfo interface
                  onChange={handleChangemMom}
                />
              </Grid>
              <Grid item xs={12} sm={4.8} className="flex flex-col gap-2">
                <FormLabel>อีเมล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="อีเมล"
                  name="email"
                  type="email"
                  value={momInfo.email}
                  onChange={handleChangemMom}
                />
                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="นามสกุล"
                  name="lastName"
                  value={momInfo.lastName} // You'll need to add lastName to MomInfo interface
                  onChange={handleChangemMom}
                />
              </Grid>
            </Grid>
          </Box>
          <div className=" mt-8">
            <div className="bg-neutral04 h-[1px] w-full"></div>
          </div>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography className="font-bold text-2x my-8 text-neutral05">
              ข้อมูลทารก
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={2.4} className="relative">
                <div className="relative w-44 h-44">
                  <img
                    src={
                      babyInfo[0]?.img ||
                      "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg"
                    }
                    alt="Profile"
                    className="w-44 h-44 rounded-full overflow-hidden object-cover"
                  />
                  {/* Floating Button */}
                  <IconButton
                    className="absolute bottom-2 right-2 bg-white shadow-md"
                    size="small"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.82666 23.7039L18.125 13.41L18.5898 13.8748L8.29779 24.1668H7.82666V23.7039ZM23.4915 8.04416C23.4914 8.04427 23.4913 8.04438 23.4912 8.0445L23.4915 8.04416Z"
                        stroke="#B36868"
                        strokeWidth="5"
                      />
                    </svg>
                  </IconButton>
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
                  value={babyInfo[0]?.firstName}
                  onChange={handleChangeBaby}
                />
                <FormLabel>ชื่อเล่น</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="ชื่อเล่น"
                  name="nickname"
                  value={babyInfo[0]?.nickname}
                  onChange={handleChangeBaby}
                />
              </Grid>
              <Grid item xs={12} sm={4.9} className="flex flex-col gap-2">
                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="นามสกุล"
                  name="lastName"
                  value={babyInfo[0]?.lastName}
                  onChange={handleChangeBaby}
                />
                <FormLabel>วันเกิด</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="วันเกิด"
                  name="birthDate"
                  value={babyInfo[0]?.birthDate}
                  onChange={handleChangeBaby}
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
                <RadioGroup
                  name="gender"
                  value={babyInfo[0]?.gender}
                  onChange={handleChangeBaby}
                >
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
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
                  value={babyInfo[0]?.bloodType}
                  onChange={handleChangeBaby}
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
                  value={babyInfo[0]?.birthWeight}
                  onChange={handleChangeBaby}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>ความยาวแรกเกิด (ซม.)</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="birthHeight"
                  value={babyInfo[0]?.birthHeight}
                  onChange={handleChangeBaby}
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
              value={babyInfo[0]?.note}
              onChange={handleChangeBaby}
              multiline
              rows={3}
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
              onClick={() => router.push("/admin/mominfo")}
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
