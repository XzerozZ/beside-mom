/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element*/
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import { MomInfo, BabyInfo} from "@/app/admin/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MomInfoId() {
  const params = useParams();
  const router = useRouter();
  const [momInfo, setMomInfo] = useState<MomInfo>({
    id: "",
    img: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [babyInfo, setBabyInfo] = useState<BabyInfo[]>([]);
  const [selectedBabyId, setSelectedBabyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_api_mominfo_personal}/${params.id}`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch mom info");
        const data = await res.json();
        const mom = data.result;
        setMomInfo({
          id: mom.u_id,
          img: mom.image_link,
          firstName: mom.fname,
          lastName: mom.lname,
          email: mom.email,
        });

        const babydata = (mom.kids || []).map((kid: any) => ({
          id: kid.u_id,
          img: kid.image_link,
          firstName: kid.fname,
          lastName: kid.lname,
          nickname: kid.uname,
          gender: kid.sex === "ชาย" ? "male" : "female",
          birthDate: kid.birth_date?.slice(0, 10) || "",
          bloodType: kid.blood_type,
          birthWeight: kid.weight?.toString() || "",
          birthHeight: kid.length?.toString() || "",
          note: kid.note,
          growthData: (kid.growth || []).map((g: any) => ({
            id: g.G_id,
            date: g.created_at.slice(0, 10),
            months: g.months,
            weight: g.weight,
            length: g.length,
          })),
        }));
        setBabyInfo(babydata);
        if (babydata.length > 0) setSelectedBabyId(babydata[0].id);
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูลคุณแม่");
        console.error("Error fetching mom info:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleBabySelect = (id: string) => {
    setSelectedBabyId(id);
  };

  // Get selected baby's growth data for chart
  const selectedBaby = babyInfo.find((b) => b.id === selectedBabyId);
  const growthData = selectedBaby?.growthData || [];

  return (
    <div className="flex bg-white">
    <Sidebar 
       selectedItem="1"
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
            <div className="grid grid-cols-3 gap-4">
                <div className="relative w-44 h-44">
                  <img
                    src={
                      momInfo.img ||
                      "https://th.bing.com/th/id/R.774b6856b01ad224faa4a8a6857a279b?rik=NCB%2fGwQX5PyfKQ&riu=http%3a%2f%2fcdn.images.express.co.uk%2fimg%2fdynamic%2f11%2f590x%2fsecondary%2fmother-377773.jpg&ehk=owgczsi5xhC8LXhNjdGeGvXe6EAm%2bmwgXiLQ0WxjcJM%3d&risl=&pid=ImgRaw&r=0"
                    }
                    alt="Profile"
                    className="w-44 h-44 rounded-full overflow-hidden object-cover"
                  />
                </div>
              
              
                <div className="flex flex-col gap-2">
                <FormLabel>ID</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="id"
                  value={momInfo.id}
                  disabled // Usually ID should be read-only
                />

                
                
                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="firstName"
                  value={momInfo.firstName || ""} // You'll need to add firstName to MomInfo interface
                  disabled
                />
                </div>
             
                <div className="flex flex-col gap-2">

                <FormLabel>อีเมล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="email"
                  value={momInfo.email}
                  disabled
                />
              

                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="lastName"
                  value={momInfo.lastName} // You'll need to add lastName to MomInfo interface
                  disabled
                />
             </div>
            </div>
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
                <div className="flex gap-4 ">
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
                  
                </div>
              )}
              
            </div>
            {selectedBabyId &&
              babyInfo
                .filter((baby) => baby.id === selectedBabyId)
                .map((baby) => (
                  <div className="w-full grid grid-cols-1 gap-6" key={baby.id}>
                    <div className="grid grid-cols-3 gap-4">
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
                  
                      <div className="flex flex-col gap-2">
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
                      </div>
                      <div className="flex flex-col gap-2">
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
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-1">
                        <FormLabel>เพศ</FormLabel>
                      </div>
                      <div className="col-span-2">
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
                      </div>
                      <div className="col-span-9">
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
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormLabel>น้ำหนักแรกเกิด (กก.)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="birthWeight"
                          value={baby.birthWeight}
                          disabled
                        />
                      </div>
                      <div>
                        <FormLabel>ความยาวแรกเกิด (ซม.)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="birthHeight"
                          value={baby.birthHeight}
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="w-full">
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
                    </div>
                   
                    <div className="flex justify-center w-full mt-4">
                      <Button
                        variant="contained"
                        onClick={() => router.push(`/admin/mominfo/${momInfo.id}/evaluate/${baby.id}`)}
                        sx={{ backgroundColor: "#B36868", "&:hover": { backgroundColor: "#a05555" } }}
                      >
                        แบบประเมินพัฒนาการ
                      </Button>
                    </div>
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
                <Box sx={{ width: "100%", height: 250, backgroundColor: "#f0f0f0", p: 2 }}>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={growthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" label={{ value: "เดือน", position: "insideBottomRight", offset: -5 }} />
                          <YAxis label={{ value: "กก.", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="weight" name="น้ำหนัก (กก.)" stroke="#B36868" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="mb-4 text-black text-center"
                >
                  กราฟการเจริญเติบโตด้านส่วนสูง
                </Typography>
                <Box sx={{ width: "100%", height: 250, backgroundColor: "#f0f0f0", p: 2 }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" label={{ value: "เดือน", position: "insideBottomRight", offset: -5 }} />
                      <YAxis label={{ value: "ซม.", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="length" name="ส่วนสูง (ซม.)" stroke="#68A3B3" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
                
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
                          name="length"
                          value={data.length}
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
