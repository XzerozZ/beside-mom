"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../../../components/SideBarAdmin";
import StyledAlert from "../../../components/StyledAlert";
import { useAlert } from "../../../hooks/useAlert";

const AddBabyCareInfoPicturePage: React.FC = () => {
  const router = useRouter();
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        showError("กรุณาเข้าสู่ระบบใหม่");
        router.push('/auth/login');
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
      const apiUrl = `${process.env.NEXT_PUBLIC_url}/care` as string;
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

      showSuccess("บันทึกข้อมูลสำเร็จ");
      router.push("/admin/babycare");
    } catch (error) {
      console.error("Error submitting form:", error);
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex bg-white min-h-screen">
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
                  <Image
                    src={img}
                    alt={`preview-${idx}`}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      minWidth: "30px",
                      width: "30px",
                      height: "30px",
                      padding: 0,
                      borderRadius: "0 0 0 4px",
                      bgcolor: "rgba(179, 104, 104, 0.8)",
                      "&:hover": { bgcolor: "#B36868" },
                    }}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        link: prev.link.filter((_, i) => i !== idx)
                      }));
                    }}
                  >
                    ✕
                  </Button>
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
                  <div style={{ position: "relative", width: "180px", height: "100px" }}>
                    <Image
                      src={formData.banners}
                      alt="banner-preview"
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: 4,
                        border: "1px solid #ddd",
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        minWidth: "30px",
                        width: "30px",
                        height: "30px",
                        padding: 0,
                        borderRadius: "0 0 0 4px",
                        bgcolor: "rgba(179, 104, 104, 0.8)",
                        "&:hover": { bgcolor: "#B36868" },
                      }}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          banners: null
                        }));
                      }}
                    >
                      ✕
                    </Button>
                  </div>
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
              minRows={4}
              maxRows={19}
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
              disabled={isSubmitting}
              sx={{
                bgcolor: "#B36868",
                "&:hover": { bgcolor: "#934343" },
                "&:disabled": { bgcolor: "#999999" },
              }}
              onClick={handleSubmit}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Button>
          </Box>
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
};

export default AddBabyCareInfoPicturePage;