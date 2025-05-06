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
  SelectChangeEvent,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import { MomInfo, BabyInfo, GrowthData } from "@/app/admin/types";

export default function EditMomInfo() {
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
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_api_mominfo_personal}/${params.id}`;
        const res = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data?.result) {
          setMomInfo({
            id: data.result.u_id,
            img: data.result.image_link,
            firstName: data.result.fname,
            lastName: data.result.lname,
            email: data.result.email,
          });
          setBabyInfo(
            (data.result.kids || []).map((kid: any) => ({
              id: kid.u_id,
              img: kid.image_link,
              firstName: kid.fname,
              lastName: kid.lname,
              nickname: kid.uname,
              gender: kid.sex === "ชาย" ? "male" : kid.sex === "หญิง" ? "female" : kid.sex,
              birthDate: kid.birth_date ? kid.birth_date.split("T")[0] : "",
              bloodType: kid.blood_type || "",
              birthWeight: kid.weight?.toString() || "",
              birthHeight: kid.length?.toString() || "",
              note: kid.note || "",
              growthData: kid.growth || [],
            }))
          );
          if (data.result.kids?.[0]?.u_id) setSelectedBabyId(data.result.kids[0].u_id);
        }
      } catch (e) {
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        console.error(e);
      }
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
    length: number
  ) => {
    setBabyInfo((prev) =>
          prev.map((baby) =>
            baby.id === id
              ? {
                  ...baby,
                  growthData: [
                    ...baby.growthData,
                    { date: date, weight: weight, length: length },
                  ],
                }
              : baby
          )
        );
    setfromgrowthdatafield({
      date: "",
      weight: 0,
      length: 0,
    });
  };
  const [fromgrowthdatafield, setfromgrowthdatafield] = useState<GrowthData>({
    date: "",
    weight: 0,
    length: 0,
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
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      // ใช้ FormData และ key ตามหน้า add mom
      const formData = new FormData();
      // Mom info
      formData.append("firstname", momInfo.firstName || "");
      formData.append("lastname", momInfo.lastName || "");
      formData.append("email", momInfo.email);
      // Images: [0] mom, [1...] kid
      if (momInfo.img) {
        if (momInfo.img.startsWith("data:image")) {
          const res = await fetch(momInfo.img);
          const blob = await res.blob();
          formData.append("images", blob, "mom.jpg");
        }
      }
      console.log("FormData entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

     
     
      // PUT ข้อมูลแม่
      const response = await fetch(`${process.env.NEXT_PUBLIC_api_mominfo}/${momInfo.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("API error");

      // PUT ข้อมูลลูกแต่ละคน
      for (const baby of babyInfo) {
        const kidFormData = new FormData();
        kidFormData.append("firstname", baby.firstName || "");
        kidFormData.append("lastname", baby.lastName || "");
        kidFormData.append("username", baby.nickname || "");
        kidFormData.append("sex", baby.gender || "");
        const formattedDate = baby.birthDate ? baby.birthDate.replace(/\//g, "-") : "";
        kidFormData.append("birthdate", formattedDate);
        kidFormData.append("bloodtype", baby.bloodType || "");
        kidFormData.append("birthweight", baby.birthWeight || "");
        kidFormData.append("birthlength", baby.birthHeight || "");
        kidFormData.append("note", baby.note || "");
        if (baby.img && baby.img.startsWith("data:image")) {
          kidFormData.append("images", dataURLtoBlob(baby.img), `baby.jpg`);
        }
        await fetch(`${process.env.NEXT_PUBLIC_api_kid}/${baby.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: kidFormData,
        });
      }

      // เพิ่ม growth data ของแต่ละ baby
      for (const baby of babyInfo) {
        if (baby.growthData && baby.growthData.length > 0) {
          for (const growth of baby.growthData) {
            const growthFormData = new FormData();
            const formattedDate = growth.date ? growth.date.replace(/\//g, "-") : "";
            growthFormData.append("date", formattedDate);
            growthFormData.append("weight", growth.weight.toString());
            growthFormData.append("length", growth.length.toString());
            await fetch(`${process.env.NEXT_PUBLIC_api_growth_kid}/${baby.id}`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: growthFormData,
            });
          }
        }
      }

      alert("บันทึกข้อมูลสำเร็จ");
      router.push("/admin/mominfo");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    }
  };

  // Helper สำหรับแปลง base64 เป็น Blob
  function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(",");
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  return (
    <div className="flex bg-white">
     <Sidebar 
       selectedItem="1"
      />
      <div className="flex-1 p-6">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Typography
            gutterBottom
            className="mt-7 font-bold text-2x text-neutral05"
          >
            แก้ไขข้อมูล
          </Typography>
          <Box sx={{ mt: 3 }}>
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
                  name="id"
                  value={momInfo.id}
                  onChange={handleChangemMom}
                  disabled // Usually ID should be read-only
                />
                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
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
                  name="email"
                  type="email"
                  value={momInfo.email}
                  onChange={handleChangemMom}
                />
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
          <Box  sx={{ mt: 3 }}>
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
                    
                </div>
              )}
              <button
                    type="button"
                    className=" border border-primary5 text-white rounded-lg px-10 py-2 mb-2 bg-primary5"
                    onClick={() => router.push(`/admin/mominfo/${momInfo.id}/addkid`)}
                    >
                    เพิ่มทารก
                    </button>

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
          {/* Prepare growthData for the selected baby */}
          {(() => {
            // Find the selected baby's growth data
            const selectedBaby = babyInfo.find((baby) => baby.id === selectedBabyId);
            // Map growthData to include a 'months' field for the X axis (or use date)
            const growthData =
              selectedBaby?.growthData?.map((g) => ({
                ...g,
                months: g.date, // You can replace this with a calculation of months if needed
                length: g.length, // For chart compatibility
              })) || [];

            return (
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
                          <XAxis dataKey="months" label={{ value: "เดือน", position: "insideBottomRight", offset: -5 }} />
                          <YAxis label={{ value: "กก.", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="weight" name="น้ำหนัก (กก.)" stroke="#B36868" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
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
                    <Box sx={{ width: "100%", height: 250, backgroundColor: "#f0f0f0", p: 2 }}>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={growthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="months" label={{ value: "เดือน", position: "insideBottomRight", offset: -5 }} />
                          <YAxis label={{ value: "ซม.", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="length" name="ส่วนสูง (ซม.)" stroke="#68A3B3" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
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
            );
          })()}
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
              
                  if (selectedBabyId) {
                    handleaddgrowthdata(
                      selectedBabyId,
                      fromgrowthdatafield.date,
                      fromgrowthdatafield.weight,
                      fromgrowthdatafield.length
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
                          value={data.length}
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
                    name="length"
                    value={fromgrowthdatafield.length}
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
    </div>
  );
}
