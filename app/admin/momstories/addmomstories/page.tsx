"use client";

import React, { useState, useRef } from "react";
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
  FormHelperText,
} from "@mui/material";
import Sidebar from "../../components/SideBarAdmin";

const AddMomStoryPage: React.FC = () => {
  const router = useRouter();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    videoFile: null as File | null,
    bannerFile: null as File | null,
  });
  const [videoMethod, setVideoMethod] = useState<'file' | 'link' | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "videoUrl" && value) {
      setFormData((prev) => ({ ...prev, videoFile: null }));
      setVideoMethod("link");
      setVideoPreview(null);
    }
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle video file upload
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      videoFile: file,
      videoUrl: "",
    }));
    setVideoMethod(file ? "file" : null);
    setVideoPreview(file ? URL.createObjectURL(file) : null);
    if (errors.video) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.video;
        return newErrors;
      });
    }
  };

  // Handle banner file upload
  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      bannerFile: file,
    }));
    setBannerPreview(file ? URL.createObjectURL(file) : null);
    if (errors.bannerFile) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.bannerFile;
        return newErrors;
      });
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "กรุณากรอกหัวข้อ";
    if (!formData.description) newErrors.description = "กรุณากรอกรายละเอียด";
    if (!formData.videoFile && !formData.videoUrl) newErrors.video = "กรุณาอัปโหลดวิดีโอหรือใส่ลิงก์วิดีโอ";
    if (formData.videoFile && formData.videoUrl) newErrors.video = "เลือกได้เพียงไฟล์วิดีโอหรือใส่ลิงก์วิดีโออย่างใดอย่างหนึ่งเท่านั้น";
    if (!formData.bannerFile) newErrors.bannerFile = "กรุณาอัปโหลดภาพปกวิดีโอ";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบใหม่");
      router.push("/auth/login");
      return;
    }

    const apiData = new FormData();
    apiData.append("title", formData.title);
    apiData.append("desc", formData.description);
    if (formData.videoFile) {
      apiData.append("video_link", formData.videoFile);
    } else if (formData.videoUrl) {
      apiData.append("video_link", formData.videoUrl);
    }
    if (formData.bannerFile) {
      apiData.append("banners", formData.bannerFile);
    }

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_url}/video`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiData,
      });
      if (!response.ok) throw new Error("API error");
      alert("บันทึกข้อมูลสำเร็จ");
      router.push("/admin/momstories");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    }
  };

  return (
    <div className="flex bg-white">
     <Sidebar 
       selectedItem="2"
      />
      <div className="flex-1 p-6">
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ mt: 2 }}
            className="text-xl text-neutral05 font-semibold"
          >
            เพิ่มข้อมูล &gt;&gt; เรื่องเล่าคุณแม่
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="div"
                sx={{ mt: 2 }}
                gutterBottom
                className="text-lg text-neutral05 font-semibold"
              >
                อัปโหลดวิดีโอ
                <span className="ml-2 text-sm text-neutral04">
                  (กรุณาเลือกเพียงอย่างใดอย่างหนึ่ง)
                </span>
              </Typography>

              <Typography variant="body2" color="textSecondary" className="mt-4">
                วิดิโอ
              </Typography>

              {videoPreview && (
                <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
                  <video
                    width="100%"
                    height="200"
                    controls
                    src={videoPreview}
                  >
                    Your browser does not support the video tag.
                  </video>
                </Box>
              )}

              <Box
                sx={{
                  width: "100%",
                  height: videoPreview ? "auto" : "200px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                  mb: 2,
                }}
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  ref={videoInputRef}
                  style={{ display: "none" }}
                  disabled={videoMethod === "link"}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#999999",
                    "&:hover": { bgcolor: "#777777" },
                  }}
                  onClick={() => videoInputRef.current?.click()}
                  disabled={videoMethod === "link"}
                >
                  {videoMethod === "file" ? "เปลี่ยนวิดีโอ" : "อัปโหลดวิดีโอ"}
                </Button>
                {videoMethod === "file" && (
                  <Button
                    variant="outlined"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, videoFile: null }));
                      setVideoPreview(null);
                      setVideoMethod(null);
                    }}
                  >
                    ลบวิดีโอ
                  </Button>
                )}
              </Box>

              <FormLabel>ลิงก์คลิปวิดีโอ</FormLabel>
              <TextField
                fullWidth
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                disabled={videoMethod === "file"}
                sx={{ mb: 2 }}
                placeholder="https://www..."
              />
              {videoMethod === "link" && (
                <Button
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, videoUrl: "" }));
                    setVideoMethod(null);
                  }}
                >
                  ลบลิงก์
                </Button>
              )}
              {errors.video && <FormHelperText error>{errors.video}</FormHelperText>}

              <Typography variant="body2" color="textSecondary" className="mt-4">
                ภาพปกวิดีโอ
              </Typography>

              {bannerPreview && (
                <Box sx={{ width: "100%", mt: 2, mb: 2, position: "relative", height: "200px" }}>
                  <Image
                    src={bannerPreview}
                    alt="Banner preview"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              )}

              <Box
                sx={{
                  width: "100%",
                  height: bannerPreview ? "auto" : "200px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                  mb: 2,
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerFileChange}
                  ref={bannerInputRef}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#999999",
                    "&:hover": { bgcolor: "#777777" },
                  }}
                  onClick={() => bannerInputRef.current?.click()}
                >
                  {bannerPreview ? "เปลี่ยนภาพปก" : "อัปโหลดภาพปก"}
                </Button>
                {bannerPreview && (
                  <Button
                    variant="outlined"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, bannerFile: null }));
                      setBannerPreview(null);
                    }}
                  >
                    ลบภาพปก
                  </Button>
                )}
              </Box>
              {errors.bannerFile && <FormHelperText error>{errors.bannerFile}</FormHelperText>}
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
              <FormLabel>หัวข้อ</FormLabel>
              <TextField
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                sx={{ mb: 1 }}
                error={!!errors.title}
                helperText={errors.title}
              />
              <FormLabel>รายละเอียด</FormLabel>
              <TextField
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ mb: 1 }}
                error={!!errors.description}
                helperText={errors.description}
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
              onClick={() => router.push("/admin/momstories")}
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

export default AddMomStoryPage;
