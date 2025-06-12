"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
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
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import StyledAlert from "@/app/admin/components/StyledAlert";
import { useAlert } from "@/app/admin/hooks/useAlert";

const defaultKid = {
  img: "",
  firstName: "",
  lastName: "",
  username: "",
  gender: "",
  birthDate: "",
  bloodType: "",
  rh_type: "",
  birthWeight: "",
  birthLength: "",
  note: "",
  beforebirth: "",
};

export default function AddKid() {
  const router = useRouter();
  const params = useParams();
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();
  const [kid, setKid] = useState({ ...defaultKid });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setKid((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setKid((prev) => ({ ...prev, img: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!kid.firstName || !kid.lastName || !kid.gender || !kid.birthDate) {
      showError("กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, นามสกุล, วันเกิด, เพศ)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const token = localStorage.getItem("token");
    if (!token) {
      showError("กรุณาเข้าสู่ระบบใหม่");
      router.push("/auth/login");
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_url ?? ""}/kid/${
        params.id as string
      }`;
      const formData = new FormData();
      formData.append("firstname", kid.firstName || "");
      formData.append("lastname", kid.lastName || "");
      formData.append("username", kid.username || "");
      formData.append("sex", kid.gender || "");
      const formattedDate = kid.birthDate
        ? kid.birthDate.replace(/\//g, "-")
        : "";
      formData.append("birthdate", formattedDate || "");
      formData.append("bloodtype", kid.bloodType || "");
      formData.append("rh", kid.rh_type || "");
      formData.append("birthweight", kid.birthWeight || "");
      formData.append("birthlength", kid.birthLength || "");
      formData.append("note", kid.note || "");
      formData.append("beforebirth", kid.beforebirth?.toString() || "");
      if (kid.img && kid.img.startsWith("data:image")) {
        const res = await fetch(kid.img);
        const blob = await res.blob();
        formData.append("images", blob, "kid.jpg");
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
      router.push(`/admin/mominfo/${params.id}`);
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
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
            เพิ่มข้อมูลลูก
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative w-44 h-44">
                <Image
                  src={
                    kid.img ||
                    "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg"
                  }
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
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
                    onChange={handleImgUpload}
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
                              value={kid?.firstName ?? ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="flex flex-col w-1/2">
                            <FormLabel>นามสกุล</FormLabel>
                            <TextField
                              fullWidth
                              size="small"
                              name="lastName"
                              value={kid?.lastName ?? ""}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                          <FormLabel>ชื่อเล่น</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="username"
                            value={kid?.username ?? ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <Box>
                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>วันเกิด</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="birthDate"
                            value={kid?.birthDate ?? ""}
                            onChange={handleChange}
                            type="date"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>อายุครรภ์ตอนคลอด</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="beforebirth"
                            value={kid.beforebirth ?? ""}
                            onChange={handleChange}
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
                    value={kid.gender}
                    onChange={(e) =>
                      setKid((prev) => ({ ...prev, gender: e.target.value }))
                    }
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
                    value={kid.bloodType}
                    onChange={handleChange}
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
                  <Select fullWidth size="small" name="rh_type" value={kid.rh_type} onChange={handleChange}>
                    <MenuItem value="">เลือก Rh</MenuItem>
                    <MenuItem value="Positive">Positive</MenuItem>
                    <MenuItem value="Negative">Negative</MenuItem>
                    <MenuItem value="-">-</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormLabel>น้ำหนักแรกเกิด (กรัม)</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="birthWeight"
                    value={kid.birthWeight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>ความยาวแรกเกิด (ซม.)</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="birthLength"
                    value={kid.birthLength}
                    onChange={handleChange}
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
                value={kid.note}
                onChange={handleChange}
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
                onClick={() => router.push(`/admin/mominfo/${params.id}`)}
                sx={{ color: "#999999", borderColor: "#999999" }}
                className="w-40"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#B36868", "&:hover": { bgcolor: "#934343" } }}
                className="w-40"
              >
                บันทึก
              </Button>
            </Box>
          </form>
        </Container>
      </div>
      <StyledAlert
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
        onClose={hideAlert}
      />
    </div>
  );
}
