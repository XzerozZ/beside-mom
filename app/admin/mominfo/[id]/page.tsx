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
  MenuItem,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";

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
  growthData: GrowthData[];
}
interface GrowthData {
  date: string;
  weight: number;
  height: number;
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

  const [babyInfo, setBabyInfo] = useState<BabyInfo[]>([]);
  const [selectedBabyId, setSelectedBabyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const momdata = {
        id: params.id as string,
        firstName: "ณัฐฐนิษา",
        lastName: "อัมพรชัยจรัส",
        email: "lovely@gmail.com",
      };
      setMomInfo(momdata);
      const babydata = [
        {
          id: "1",
          img: "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg",
          firstName: "อรดี",
          lastName: "แสงทอง1",
          nickname: "อร",
          gender: "female",
          birthDate: "2021-10-01",
          bloodType: "O",
          birthWeight: "18.6",
          birthHeight: "50",
          note: "เด็กเป็นปกติหลังคลอด",
          growthData: [
            { date: "2025-01-25", weight: 31.8, height: 63.5 },
            { date: "2025-02-25", weight: 31.8, height: 63.5 },
          ],
        },
        {
          id: "2",
          img: "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg",
          firstName: "อรดี",
          lastName: "แสงทอง2",
          nickname: "อร",
          gender: "female",
          birthDate: "2021-10-01",
          bloodType: "O",
          birthWeight: "18.6",
          birthHeight: "50",
          note: "เด็กเป็นปกติหลังคลอด",
          growthData: [
            { date: "2025-01-25", weight: 31.8, height: 63.5 },
            { date: "2025-02-25", weight: 31.8, height: 63.8 },
          ],
        },
      ];

      setBabyInfo(babydata);
      setSelectedBabyId(babydata[0].id); // Set the first baby as the default selected baby
    };

    fetchData();
  }, [params.id]);

  const handleBabySelect = (id: string) => {
    setSelectedBabyId(id);
  };

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
            <div className="flex gap-4 justify-between mb-5">
              <Typography className="font-bold text-2x text-neutral05">
                ข้อมูลทารก
              </Typography>
              {babyInfo.length > 1 && (
                <div className="flex gap-4">
                  {babyInfo.map((baby, index) => (
                    <button
                      key={baby.id}
                      type="button"
                      className={`border border-primary5 text-primary5 rounded-lg px-4 py-2 mb-2 ${
                        selectedBabyId === baby.id
                          ? "bg-primary5 text-white"
                          : ""
                      }`}
                      onClick={() => handleBabySelect(baby.id)}
                    >
                      ทารกคนที่ {index + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    className=" border border-primary5 text-white rounded-lg px-10 py-2 mb-2 bg-primary5"

                    // onClick={() => handleBabyShelect()}
                  >
                    เพิ่มทารก
                  </button>
                </div>
              )}
            </div>
            {selectedBabyId &&
              babyInfo
                .filter((baby) => baby.id === selectedBabyId)
                .map((baby, index) => (
                  <Grid container spacing={3} key={baby.id}>
                    <Grid item xs={12} sm={2.4} className="relative">
                      <div className="relative w-44 h-44">
                        <img
                          src={
                            baby.img ||
                            "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg"
                          }
                          alt="Profile"
                          className="w-44 h-44 rounded-full overflow-hidden object-cover"
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4.64}
                      className="flex flex-col gap-2"
                    >
                      <FormLabel>ชื่อ</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="firstName"
                        value={baby.firstName}
                        disabled
                      />
                      <FormLabel>ชื่อเล่น</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="nickname"
                        value={baby.nickname}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={4.9} className="flex flex-col gap-2">
                      <FormLabel>นามสกุล</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="lastName"
                        value={baby.lastName}
                        disabled
                      />
                      <FormLabel>วันเกิด</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="birthDate"
                        value={baby.birthDate}
                        disabled
                        type="date"
                      />
                    </Grid>
                    <Grid item xs={12} sm={0.7}>
                      <FormLabel>เพศ</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={1.75}>
                      <RadioGroup name="gender" value={baby.gender}>
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
                        value={baby.bloodType}
                        disabled
                      >
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="AB">AB</MenuItem>
                        <MenuItem value="O">O</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormLabel>น้ำหนักแรกเกิด (กก.)</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="birthWeight"
                        value={baby.birthWeight}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormLabel>ความยาวแรกเกิด (ซม.)</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="birthHeight"
                        value={baby.birthHeight}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel>โน้ต</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="note"
                        value={baby.note}
                        disabled
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                ))}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="mb-4 text-black text-center"
                >
                  กราฟการเจริญเติบโตด้านน้ำหนัก
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Weight Growth Chart"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <TextField
                  fullWidth
                  label="แปลผล"
                  multiline
                  rows={4}
                  sx={{ mt: 2 }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="mb-4 text-black text-center"
                >
                  กราฟการเจริญเติบโตด้านส่วนสูง
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Height Growth Chart"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <TextField
                  fullWidth
                  label="แปลผล"
                  multiline
                  rows={4}
                  sx={{ mt: 2 }}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <div className="flex justify-between mb-5">
              <Typography className="text-black">ข้อมูล</Typography>
            </div>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {babyInfo
                .filter((baby) => baby.id === selectedBabyId)
                .map((baby) =>
                  baby.growthData.map((data, index) => (
                    <Grid container spacing={3} key={index} className="mb-4">
                      <Grid item xs={12} sm={4}>
                        <FormLabel>วันที่</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="date"
                          type="date"
                          value={data.date}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormLabel>น้ำหนัก (กก.)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="weight"
                          value={data.weight}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormLabel>ความยาว (ซม.)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="height"
                          value={data.height}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  ))
                )}
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
