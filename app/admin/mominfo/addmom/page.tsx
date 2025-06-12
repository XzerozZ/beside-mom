"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useAlert } from "../../hooks/useAlert";
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
  CircularProgress,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";

import { MomInfo, BabyInfo } from "@/app/admin/types";

const defaultBaby = {
  id: "",
  img: "",
  firstName: "",
  lastName: "",
  nickname: "",
  gender: "",
  birthDate: "",
  bloodType: "",
  rh_type: "",
  birthWeight: "",
  birthHeight: "",
  note: "",
  growthData: [],
  beforebirth: 0,
};

export default function EditMomInfo() {
  const router = useRouter();
  const { showSuccess, showError } = useAlert();
  const [momInfo, setMomInfo] = useState<MomInfo>({
    id: "",
    u_pid: "",
    img: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [babyInfo, setBabyInfo] = useState<BabyInfo[]>([{ ...defaultBaby }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setBabyInfo((prev) => {
      const updated = [...prev];
      updated[0] = { ...updated[0], [name]: value };
      return updated;
    });
  };

  const handleBabyImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setBabyInfo((prev) => {
        const updated = [...prev];
        updated[0] = { ...updated[0], img: ev.target?.result as string };
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    // ตรวจสอบข้อมูลแม่
    if (!momInfo.firstName || !momInfo.lastName || !momInfo.email) {
      showError("กรุณากรอกข้อมูลคุณแม่ให้ครบถ้วน");
      return false;
    }
    // ตรวจสอบข้อมูลทารก (เฉพาะตัวแรก)
    const baby = babyInfo[0];
    if (!baby.firstName || !baby.lastName || !baby.birthDate || !baby.gender) {
      showError("กรุณากรอกข้อมูลทารกให้ครบถ้วน (ชื่อ, นามสกุล, วันเกิด, เพศ)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isSubmitting) return;

    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      showError("กรุณาเข้าสู่ระบบใหม่");
      router.push("/auth/login");
      setIsSubmitting(false);
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_url}/user` as string;
      const formData = new FormData();
      // Mom info
      formData.append("firstname", momInfo.firstName || "");
      formData.append("lastname", momInfo.lastName || "");
      formData.append("email", momInfo.email);
      formData.append("pid", momInfo.u_pid || "");
      // Baby info (first baby only)
      if (babyInfo[0]) {
        formData.append("firstname", babyInfo[0].firstName || "");
        formData.append("lastname", babyInfo[0].lastName || "");
        formData.append("username", babyInfo[0].nickname || "");
        formData.append("sex", babyInfo[0].gender || "");

        const formattedDate = babyInfo[0].birthDate
          ? babyInfo[0].birthDate.replace(/\//g, "-")
          : "";
        formData.append("birthdate", formattedDate);
        formData.append("bloodtype", babyInfo[0].bloodType || "");
        formData.append("rh", babyInfo[0].rh_type || "");
        formData.append("birthweight", babyInfo[0].birthWeight || "");
        formData.append("birthlength", babyInfo[0].birthHeight || "");
        formData.append("note", babyInfo[0].note || "");
        formData.append("beforebirth", String(babyInfo[0].beforebirth || "0"));
      }
      // Images: [0] mom, [1] kid
      if (momInfo.img) {
        // If img is base64, convert to Blob
        if (momInfo.img.startsWith("data:image")) {
          const res = await fetch(momInfo.img);
          const blob = await res.blob();
          formData.append("images", blob, "mom.jpg");
        }
      }
      if (babyInfo[0]?.img) {
        if (babyInfo[0].img.startsWith("data:image")) {
          const res = await fetch(babyInfo[0].img);
          const blob = await res.blob();
          formData.append("images", blob, "baby.jpg");
        }
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      showSuccess("บันทึกข้อมูลสำเร็จ");
      router.push("/admin/mominfo");
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar selectedItem="1" />
      <div className="flex-1 p-6">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Typography
            gutterBottom
            className="mt-7 font-bold text-2x text-neutral05"
          >
            เพิ่มข้อมูลคุณแม่และทารก
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography
              gutterBottom
              className="font-bold text-2x mb-8 text-neutral05"
            >
              ข้อมูลคุณแม่
            </Typography>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative w-44 h-44">
                <Image
                  src={
                    momInfo.img ||
                    "https://th.bing.com/th/id/R.774b6856b01ad224faa4a8a6857a279b?rik=NCB%2fGwQX5PyfKQ&riu=http%3a%2f%2fcdn.images.express.co.uk%2fimg%2fdynamic%2f11%2f590x%2fsecondary%2fmother-377773.jpg&ehk=owgczsi5xhC8LXhNjdGeGvXe6EAm%2bmwgXiLQ0WxjcJM%3d&risl=&pid=ImgRaw&r=0"
                  }
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
                {/* Floating Button */}
                <IconButton
                  className="absolute top-32 left-36 bg-red-100 shadow-md flex items-center justify-center"
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
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="mom-img-upload"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setMomInfo((prev) => ({
                          ...prev,
                          img: ev.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <label
                    htmlFor="mom-img-upload"
                    style={{
                      position: "absolute",
                      inset: 0,
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </label>
                </IconButton>
              </div>

              <div className="flex flex-col gap-2">
                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="ชื่อ"
                  name="firstName"
                  value={momInfo.firstName || ""}
                  onChange={handleChangemMom}
                />

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
              </div>
              <div className="flex flex-col gap-2">
                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="นามสกุล"
                  name="lastName"
                  value={momInfo.lastName}
                  onChange={handleChangemMom}
                />
                <FormLabel>PID</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  // label="อีเมล"
                  name="u_pid"
                  type="text"
                  value={momInfo.u_pid || ""}
                  onChange={handleChangemMom}
                />
              </div>
            </div>
          </Box>
          <div className=" mt-8">
            <div className="bg-neutral04 h-[1px] w-full"></div>
          </div>
          <Box sx={{ mt: 3 }}>
            <Typography className="font-bold text-2x my-8 text-neutral05">
              ข้อมูลทารก
            </Typography>

            <div className="grid grid-cols-3 gap-4">
              <div className="relative w-44 h-44">
                <Image
                  src={
                    babyInfo[0]?.img ||
                    "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg"
                  }
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
                {/* Floating Button */}
                <IconButton
                  className="absolute top-32 left-36 bg-white shadow-md"
                  size="small"
                  component="label"
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
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleBabyImgUpload}
                  />
                </IconButton>
              </div>

             <div className="grid grid-cols-2  col-span-2">
               <div className="flex flex-row gap-4 col-span-2 ">
               <div className="flex flex-col w-1/2">
                  <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="firstName"
                  value={babyInfo[0]?.firstName ?? ""}
                  onChange={handleChangeBaby}
                />
               </div>
                <div className="flex flex-col w-1/2">
                 <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="lastName"
                  value={babyInfo[0]?.lastName ?? ""}
                  onChange={handleChangeBaby}
                />
               </div>
              </div>
              <div className="flex flex-col gap-2 col-span-2">
             
                 <FormLabel>ชื่อเล่น</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="nickname"
                  value={babyInfo[0]?.nickname ?? ""}
                  onChange={handleChangeBaby}
                />
              </div>
             </div>
            </div>
          </Box>
          <Box>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                  <FormLabel>วันเกิด</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="birthDate"
                  value={babyInfo[0]?.birthDate ?? ""}
                  onChange={handleChangeBaby}
                  type="date"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <FormLabel>อายุครรภ์ตอนคลอด (สัปดาห์)</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="beforebirth"
                  value={babyInfo[0]?.beforebirth ?? ""}
                  onChange={handleChangeBaby}
                  type="number"
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
              <Grid item xs={12} sm={4.775}>
                <FormLabel>กรุ๊ปเลือด</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name="bloodType"
                  value={babyInfo[0]?.bloodType ?? ""}
                  onChange={handleChangeBaby}
                >
                  <MenuItem value="">เลือกกรุ๊ปเลือด</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="O">O</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={4.775}>
                <FormLabel>Rh</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name="rh_type"
                  value={babyInfo[0]?.rh_type ?? ""}
                  onChange={handleChangeBaby}
                >
                  <MenuItem value="">เลือก Rh</MenuItem>
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="Negative">Negative</MenuItem>
                  <MenuItem value="ยังไม่ระบุ">ยังไม่ระบุ</MenuItem>
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
              variant="contained"
              disabled={isSubmitting}
              sx={{
                bgcolor: "#B36868",
                "&:hover": { bgcolor: "#934343" },
                "&:disabled": { bgcolor: "#999999" },
              }}
              className="w-40"
              onClick={handleSubmit}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
}
