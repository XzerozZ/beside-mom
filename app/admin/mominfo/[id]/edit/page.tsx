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

export default function EditMomInfo() {
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
    setBabyInfo((prev) =>
      prev.map((baby) =>
        baby.id === selectedBabyId ? { ...baby, [name]: value } : baby
      )
    );
  };

  const handleaddgrowthdata = (
    id: string,
    date: string,
    weight: number,
    height: number
  ) => {
    setBabyInfo((prev) =>
      prev.map((baby) =>
        baby.id === id
          ? {
              ...baby,
              growthData: [
                ...baby.growthData,
                { date: date, weight: weight, height: height },
              ],
            }
          : baby
      )
    );
    setfromgrowthdatafield({
      date: "",
      weight: 0,
      height: 0,
    });
  };
  const [fromgrowthdatafield, setfromgrowthdatafield] = useState<GrowthData>({
    date: "",
    weight: 0,
    height: 0,
  });

  const handleaddBabygrowthdatafield = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setfromgrowthdatafield((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your save logic here
    console.log("Saving:", momInfo, babyInfo);
    // After saving, redirect back to the main page
    router.push("/admin/mominfo");
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
          <Typography
            gutterBottom
            className="mt-7 font-bold text-2x text-neutral05"
          >
            แก้ไขข้อมูล
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  onChange={handleChangemMom}
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
                  onChange={handleChangemMom}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="firstName"
                  value={momInfo.firstName || ""} // You'll need to add firstName to MomInfo interface
                  onChange={handleChangemMom}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
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
                .map((baby) => (
                  <div key={baby.id}>
                    <Grid container spacing={3}>
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
                          onChange={handleChangeBaby}
                        />
                        <FormLabel>ชื่อเล่น</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="nickname"
                          value={baby.nickname}
                          onChange={handleChangeBaby}
                          error={!baby.nickname}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4.9}
                        className="flex flex-col gap-2"
                      >
                        <FormLabel>นามสกุล</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="lastName"
                          value={baby.lastName}
                          onChange={handleChangeBaby}
                        />
                        <FormLabel>วันเกิด</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="birthDate"
                          value={baby.birthDate}
                          onChange={handleChangeBaby}
                          type="date"
                        />
                      </Grid>
                    </Grid>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={0.7}>
                          <FormLabel>เพศ</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={1.75}>
                          <RadioGroup
                            name="gender"
                            value={baby.gender}
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
                            value={baby.bloodType}
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
                            value={baby.birthWeight}
                            onChange={handleChangeBaby}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>ความยาวแรกเกิด (ซม.)</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="birthHeight"
                            value={baby.birthHeight}
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
                        value={baby.note}
                        onChange={handleChangeBaby}
                        multiline
                        rows={3}
                      />
                    </Box>
                  </div>
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
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <div className="flex justify-between mb-5">
              <Typography className="text-black">ข้อมูล</Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#B36868",
                  "&:hover": { bgcolor: "#934343" },
                }}
                onClick={() => {
                  // Add your logic to add growth data here
                  if (selectedBabyId) {
                    handleaddgrowthdata(
                      selectedBabyId,
                      fromgrowthdatafield.date,
                      fromgrowthdatafield.weight,
                      fromgrowthdatafield.height
                    );
                  }
                  console.log("Adding growth data");
                }}
              >
                เพิ่มข้อมูล
              </Button>
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
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormLabel>น้ำหนัก (กก.)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="weight"
                          value={data.weight}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormLabel>ความยาว (ซม.)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="height"
                          value={data.height}
                        />
                      </Grid>
                    </Grid>
                  ))
                )}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormLabel>วันที่</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="date"
                    type="date"
                    value={fromgrowthdatafield.date}
                    onChange={handleaddBabygrowthdatafield}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel>น้ำหนัก (กก.)</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="weight"
                    value={fromgrowthdatafield.weight}
                    onChange={handleaddBabygrowthdatafield}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel>ความยาว (ซม.)</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="height"
                    value={fromgrowthdatafield.height}
                    onChange={handleaddBabygrowthdatafield}
                  />
                </Grid>
              </Grid>
            </Grid>
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
