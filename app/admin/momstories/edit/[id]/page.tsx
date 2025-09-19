"use client";
import { API_URL } from "@/config/config";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
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
  CircularProgress,
} from "@mui/material";
import Sidebar from "../../../components/SideBarAdmin";
import { useAlert } from "../../../hooks/useAlert";

const EditMomStoryPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useAlert();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    videoFile: null as File | null,
    bannerFile: null as File | null,
    bannerPreview: "",
    videoMethod: null as "file" | "link" | null,
    videoPreview: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch story data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showError("กรุณาเข้าสู่ระบบใหม่");
          router.push("/auth/login");
          return;
        }
        const apiUrl = `${API_URL}/video/${params.id}`;
        const response = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (data.status !== "Success") throw new Error(data.message || "Error");

        const story = data.result;
        setFormData((prev) => ({
          ...prev,
          title: story.title || "",
          description: story.description || "",
          videoUrl: typeof story.link === "string" ? story.link : "",
          bannerPreview: story.banner || "",
          videoMethod: story.link ? "link" : null,
        }));
      } catch (err) {
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        console.error(err);
      }
    };
    fetchData();
  }, [params.id, router, showError]);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "videoUrl" && value) {
      setFormData((prev) => ({
        ...prev,
        videoFile: null,
        videoMethod: "link",
        videoPreview: "",
      }));
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
      videoMethod: file ? "file" : null,
      videoPreview: file ? URL.createObjectURL(file) : "",
    }));
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
      bannerPreview: file ? URL.createObjectURL(file) : prev.bannerPreview,
    }));
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

    if (isSubmitting) return;

    setIsSubmitting(true);

    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "กรุณากรอกหัวข้อ";
    if (!formData.description) newErrors.description = "กรุณากรอกรายละเอียด";
    if (!formData.videoFile && !formData.videoUrl)
      newErrors.video = "กรุณาอัปโหลดวิดีโอหรือใส่ลิงก์วิดีโอ";
    if (formData.videoFile && formData.videoUrl)
      newErrors.video =
        "เลือกได้เพียงไฟล์วิดีโอหรือใส่ลิงก์วิดีโออย่างใดอย่างหนึ่งเท่านั้น";
    // bannerFile is optional for edit, but you can require it if you want

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      showError("กรุณาเข้าสู่ระบบใหม่");
      router.push("/auth/login");
      setIsSubmitting(false);
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
      const apiUrl = `${API_URL}/video/${params.id}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiData,
      });
      if (!response.ok) throw new Error("API error");
      showSuccess("บันทึกข้อมูลสำเร็จ");
      router.push("/admin/momstories");
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar selectedItem="2" />
      <div className="flex-1 p-6">
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            className="text-xl text-neutral05 font-semibold"
          >
            แก้ไขข้อมูล
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className="flex items-center">
                  <Typography
                    variant="h6"
                    component="div"
                    className="text-lg text-neutral05 font-semibold"
                  >
                    อัปโหลดวิดีโอ
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="ml-2"
                  >
                    (กรุณาเลือกเพียงอย่างใดอย่างหนึ่ง)
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mt-4"
                >
                  วิดิโอ
                </Typography>
                {formData.videoUrl &&
                  (formData.videoUrl.includes("drive.google.com") ||
                  formData.videoUrl.includes("youtube.com") ||
                  formData.videoUrl.includes("youtu.be") ? (
                    <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
                      <iframe
                        width="100%"
                        height="200"
                        src={
                          formData.videoUrl.includes("drive.google.com")
                            ? formData.videoUrl.replace("/view", "/preview")
                            : formData.videoUrl.includes("youtube.com") ||
                              formData.videoUrl.includes("youtu.be")
                            ? (() => {
                                // Handle both youtube.com and youtu.be
                                let videoId = "";
                                if (formData.videoUrl.includes("youtube.com")) {
                                  const url = new URL(formData.videoUrl);
                                  videoId = url.searchParams.get("v") || "";
                                } else if (
                                  formData.videoUrl.includes("youtu.be")
                                ) {
                                  videoId =
                                    formData.videoUrl
                                      .split("youtu.be/")[1]
                                      ?.split(/[?&]/)[0] || "";
                                }
                                return videoId
                                  ? `https://www.youtube.com/embed/${videoId}`
                                  : "";
                              })()
                            : ""
                        }
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="Video preview"
                        style={{ border: 0 }}
                      />
                    </Box>
                  ) : null)}
                <Box
                  sx={{
                    width: "100%",
                    height: formData.videoUrl ? "auto" : "200px",

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
                    disabled={formData.videoMethod === "link"}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#999999",
                      "&:hover": { bgcolor: "#777777" },
                    }}
                    onClick={() => videoInputRef.current?.click()}
                    disabled={formData.videoMethod === "link"}
                  >
                    {formData.videoMethod === "file"
                      ? "เปลี่ยนวิดีโอ"
                      : "อัปโหลดวิดีโอ"}
                  </Button>
                  {formData.videoMethod === "file" && (
                    <Button
                      variant="outlined"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          videoFile: null,
                          videoPreview: "",
                          videoMethod: null,
                        }));
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
                  disabled={formData.videoMethod === "file"}
                  sx={{ mb: 2 }}
                  placeholder="https://www..."
                />
                {formData.videoMethod === "link" && (
                  <Button
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        videoUrl: "",
                        videoMethod: null,
                      }));
                    }}
                  >
                    ลบลิงก์
                  </Button>
                )}
                {errors.video && (
                  <FormHelperText error>{errors.video}</FormHelperText>
                )}

                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mt-4"
                >
                  ภาพปกวิดีโอ
                </Typography>
                {formData.bannerPreview && (
                  <Box
                    sx={{
                      width: "100%",
                      mt: 2,
                      mb: 2,
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <Image
                      src={formData.bannerPreview}
                      alt="Banner preview"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                )}
                <Box
                  sx={{
                    width: "100%",
                    height: formData.bannerPreview ? "auto" : "200px",

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
                    {formData.bannerPreview ? "เปลี่ยนภาพปก" : "อัปโหลดภาพปก"}
                  </Button>
                  {formData.bannerPreview && (
                    <Button
                      variant="outlined"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          bannerFile: null,
                          bannerPreview: "",
                        }));
                      }}
                    >
                      ลบภาพปก
                    </Button>
                  )}
                </Box>
                {errors.bannerFile && (
                  <FormHelperText error>{errors.bannerFile}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  component="div"
                  className="text-lg text-neutral05 font-semibold mb-4"
                >
                  ข้อมูลทั่วไป
                </Typography>
                <FormLabel>หัวข้อ</FormLabel>
                <TextField
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  sx={{ mt: 1, mb: 3 }}
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
                  minRows={4}
                  maxRows={19}
                  sx={{ mt: 1, mb: 3 }}
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
                disabled={isSubmitting}
                sx={{
                  bgcolor: "#B36868",
                  "&:hover": { bgcolor: "#934343" },
                  "&:disabled": { bgcolor: "#999999" },
                }}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default EditMomStoryPage;
