
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormLabel,
} from "@mui/material";
import Sidebar from "../../../components/SideBarAdmin";


const AddBabyCareInfoPicturePage: React.FC = () => {
  const router = useRouter();
  type FormData = {
    title: string;
    description: string;
    link: string[];
    type: string;
    banners: string | null;
  };
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    link: [],
    type: "image",
    banners: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        alert("กรุณาเข้าสู่ระบบใหม่");
        router.push('/user/auth/login');
        return;
      }

      // Create FormData object
      const apiData = new FormData();
      apiData.append('title', formData.title);
      apiData.append('desc', formData.description);
      apiData.append('type', formData.type);

      // Append banner if exists and is a base64 string
      if (formData.banners && formData.banners.startsWith('data:image')) {
        const bannerResponse = await fetch(formData.banners);
        const bannerBlob = await bannerResponse.blob();
        apiData.append('banners', bannerBlob, 'banner.jpg');
      }

      // If there are images in the link array, append them as files
      for (let i = 0; i < formData.link.length; i++) {
        if (formData.link[i].startsWith('data:image')) {
          const base64Response = await fetch(formData.link[i]);
          const blob = await base64Response.blob();
          apiData.append('link', blob, `image${i}.jpg`);
        }
      }

      // Make the API call
      const apiUrl = process.env.NEXT_PUBLIC_api_babycare as string;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: apiData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      console.log("API response:", result);

      alert("บันทึกข้อมูลสำเร็จ");
      router.push("/admin/babycare");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="flex bg-white">
     <Sidebar 
      selectedItem="3"
      />
      <div className="flex-1 p-6">
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            gutterBottom
            className="text-xl text-neutral05 font-semibold"
          >
            เพิ่มข้อมูล &gt;&gt; ภาพ
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ mt: 2 }}
              className="text-lg text-neutral05 font-semibold"
              >
              อัปโหลดภาพ
              </Typography>
              <Box
              sx={{
                width: "100%",
                height: "200px",
                backgroundColor: "#f0f0f0",
                backgroundImage: formData.link[0] ? `url(${formData.link[0]})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
              >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-image"
                type="file"
                multiple
                onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const fileReaders: Promise<string>[] = files.map(
                  (file) =>
                  new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => resolve(ev.target?.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                  })
                );
                Promise.all(fileReaders).then((images) => {
                  setFormData((prev) => ({
                  ...prev,
                  link: [...prev.link, ...images],
                  }));
                });
                }}
              />
              <label htmlFor="upload-image">
                <Button
                variant="contained"
                component="span"
                sx={{
                  bgcolor: "#999999",
                  "&:hover": { bgcolor: "#777777" },
                }}
                >
                อัปโหลด
                </Button>
              </label>
              </Box>
              <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                flexWrap: "wrap",
              }}
              >
              {formData.link.length > 0 &&
                formData.link.map((img: string, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#f0f0f0",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 1,
                  border: "1px solid #ddd",
                  }}
                >
                  <img
                  src={img}
                  alt={`preview-${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  />
                </Box>
                ))}
              </Box>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{ mt: 2 }}
                className="text-lg text-neutral05 font-semibold"
              >
                อัปโหลดปก
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  backgroundImage: formData.banners ? `url(${formData.banners})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-banner"
                  type="file"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setFormData((prev) => ({
                          ...prev,
                          banners: ev.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label htmlFor="upload-banner">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      bgcolor: "#999999",
                      "&:hover": { bgcolor: "#777777" },
                    }}
                  >
                    อัปโหลดปก
                  </Button>
                </label>
              </Box>
              {formData.banners && (
                <Box
                  sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    src={formData.banners}
                    alt="banner-preview"
                    style={{
                      width: "180px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{ mt: 2 }}
                className="text-lg text-neutral05 font-semibold"
              >
                ข้อมูลทั่วไป
              </Typography>
              <FormLabel className="">หัวข้อ</FormLabel>
              <TextField
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <FormLabel className="">รายละเอียด</FormLabel>
              <TextField
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
        
            </Grid>
          </Grid>
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
              onClick={() => router.push("/admin/babycare")}
              sx={{ color: "#999999", borderColor: "#999999" }}
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
              onClick={handleSubmit}
            >
              บันทึกข้อมูล
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default AddBabyCareInfoPicturePage;
