
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
import Sidebar from "../../../components/SideBarAdmin";

const AddBabyCareInfoVideoPage: React.FC = () => {
  const router = useRouter();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  
  type FormData = {
    title: string;
    description: string;
    link: string;
    videoFile: File | null;
    type: string;
    banners: string | null;
  };
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    link: "",
    videoFile: null,
    type: "video",
    banners: null,
  });
  
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [videoMethod, setVideoMethod] = useState<'file' | 'link' | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // If changing link and we already have a video file
    if (name === 'link' && value && formData.videoFile) {
      setFormData(prev => ({
        ...prev,
        videoFile: null,
        [name]: value,
      }));
      setVideoMethod('link');
      setVideoPreview(null);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      
      if (name === 'link' && value) {
        setVideoMethod('link');
      }
    }
    
 
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({...prev, banners: 'Please upload an image file'}));
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({...prev, banners: reader.result as string}));
      setBannerPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      setErrors(prev => ({...prev, videoFile: 'Please upload a video file'}));
      return;
    }
    
    // If there's a link, clear it
    if (formData.link) {
      setFormData(prev => ({
        ...prev,
        videoFile: file,
        link: '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        videoFile: file,
      }));
    }
    
    setVideoMethod('file');
    
    // Create a preview URL
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title) newErrors.title = 'กรุณากรอกหัวข้อ';
    if (!formData.description) newErrors.description = 'กรุณากรอกรายละเอียด';
    if (!formData.videoFile && !formData.link) newErrors.video = 'กรุณาอัปโหลดวิดีโอหรือใส่ลิงก์วิดีโอ';
    if (formData.videoFile && formData.link) newErrors.video = 'เลือกได้เพียงไฟล์วิดีโอหรือใส่ลิงก์วิดีโออย่างใดอย่างหนึ่งเท่านั้น';
    if (!formData.banners) newErrors.banners = 'กรุณาอัปโหลดภาพปกวิดีโอ';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        alert("กรุณาเข้าสู่ระบบใหม่");
        router.push('/auth/login');
        return;
      }

      // Create FormData object
      const apiData = new FormData();
      apiData.append('title', formData.title);
      apiData.append('desc', formData.description);
      apiData.append('type', formData.type);
      
      // Add either the video file or link
      if (formData.videoFile) {
        apiData.append('link', formData.videoFile);
      } else if (formData.link) {
        apiData.append('link', formData.link);
      }
      
      // Append banner if exists
      if (formData.banners && formData.banners.startsWith('data:image')) {
        const bannerResponse = await fetch(formData.banners);
        const bannerBlob = await bannerResponse.blob();
        apiData.append('banners', bannerBlob, 'banner.jpg');
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
            component="div"
            sx={{ mt: 2 }}
            className="text-xl text-neutral05 font-semibold"
          >
            เพิ่มข้อมูล &gt;&gt; วิดีโอ
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
                  onChange={handleVideoUpload}
                  ref={videoInputRef}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#999999",
                    "&:hover": { bgcolor: "#777777" },
                  }}
                  onClick={() => {
                    if (videoInputRef.current) {
                      videoInputRef.current.click();
                    }
                  }}
                  disabled={videoMethod === 'link'}
                >
                  {videoMethod === 'file' ? 'เปลี่ยนวิดีโอ' : 'อัปโหลดวิดีโอ'}
                </Button>
                {videoMethod === 'file' && (
                  <Button
                    variant="outlined"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      setFormData(prev => ({...prev, videoFile: null}));
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
                name="link"
                value={formData.link}
                onChange={handleChange}
                disabled={videoMethod === 'file'}
                sx={{ mb: 2 }}
                placeholder="https://www..."
              />
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
                  onChange={handleBannerUpload}
                  ref={bannerInputRef}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#999999",
                    "&:hover": { bgcolor: "#777777" },
                  }}
                  onClick={() => {
                    if (bannerInputRef.current) {
                      bannerInputRef.current.click();
                    }
                  }}
                >
                  {bannerPreview ? 'เปลี่ยนภาพปก' : 'อัปโหลดภาพปก'}
                </Button>
                {bannerPreview && (
                  <Button
                    variant="outlined"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      setFormData(prev => ({...prev, banners: null}));
                      setBannerPreview(null);
                    }}
                  >
                    ลบภาพปก
                  </Button>
                )}
              </Box>
              {errors.banners && <FormHelperText error>{errors.banners}</FormHelperText>}
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

export default AddBabyCareInfoVideoPage;