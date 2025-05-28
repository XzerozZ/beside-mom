
"use client";

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
  CircularProgress,
  Alert,
} from "@mui/material";
import Sidebar from "../../../../components/SideBarAdmin";
import { BabyCareData } from "@/app/admin/types";

const EditBabyCareInfoVideoPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    videoFile: null as File | null,
    type: "video",
    banners: null as string | null,
  });

  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [videoMethod, setVideoMethod] = useState<'file' | 'link' | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No authentication token found");
          alert("กรุณาเข้าสู่ระบบใหม่");
          router.push('/auth/login');
          return;
        }

        // Get the ID from params
        const id = params.id as string;
        
        // Fetch data from API
        const apiUrl = `${process.env.NEXT_PUBLIC_api_babycare}/${id}`;
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status !== "Success") {
          throw new Error(data.message || "Failed to fetch data");
        }

        const result: BabyCareData = data.result;
        
        if (result.type !== 'video') {
          throw new Error("Invalid content type: Expected video");
        }
        
        // Map API response to form data
        setFormData({
          title: result.title,
          description: result.desc,
          videoUrl: result.assets.length > 0 ? result.assets[0].link : "",
          videoFile: null,
          type: "video",
          banners: result.banner,
        });
        
        // Set previews
        if (result.banner) {
          setBannerPreview(result.banner);
        }
        
        if (result.assets.length > 0) {
          setVideoPreview(result.assets[0].link);
          setVideoMethod('link');
        }
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // If changing link and we already have a video file
    if (name === 'videoUrl' && value && formData.videoFile) {
      setFormData(prev => ({
        ...prev,
        videoFile: null,
        [name]: value,
      }));
      setVideoMethod('link');
      setVideoPreview(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      
      if (name === 'videoUrl' && value) {
        setVideoMethod('link');
        setVideoPreview(value);
      }
    }
  };
  
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file for the banner');
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
      setError('Please upload a video file');
      return;
    }
    
    // If there's a link, clear it
    if (formData.videoUrl) {
      setFormData(prev => ({
        ...prev,
        videoFile: file,
        videoUrl: '',
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
    
    if (!formData.title) {
      setError("Title is required");
      return;
    }
    
    if (!formData.videoFile && !formData.videoUrl) {
      setError("Please provide either a video file or URL");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No authentication token found");
        alert("กรุณาเข้าสู่ระบบใหม่");
        router.push('/auth/login');
        return;
      }
      
      // Create FormData object
      const apiData = new FormData();
      apiData.append('title', formData.title);
      apiData.append('desc', formData.description);
      apiData.append('type', 'video');
      
      // Add either video file or link
      if (formData.videoFile) {
        apiData.append('videoFile', formData.videoFile);
      } else if (formData.videoUrl) {
        apiData.append('link', formData.videoUrl);
      }
      
      // Add banner if changed
      if (formData.banners && formData.banners.startsWith('data:image')) {
        const bannerResponse = await fetch(formData.banners);
        const bannerBlob = await bannerResponse.blob();
        apiData.append('banner', bannerBlob, 'banner.jpg');
      }
      
      // Make the API call
      const apiUrl = `${process.env.NEXT_PUBLIC_api_babycare}/${params.id}`;
      const response = await fetch(apiUrl, {
        method: 'PUT', // Use PUT for updates
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
    } catch (err) {
      console.error("Error updating data:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.title) {
    return (
      <div className="flex bg-white h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

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
            แก้ไขข้อมูล &gt;&gt; วิดีโอ
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
              
              {videoPreview && videoMethod === 'file' && (
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
              
              {/* Only show video embed if it's from a link */}
              {videoMethod === 'link' && videoPreview && (
                <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
                  {/* If it's a YouTube link, we'd need to embed it differently */}
                  {videoPreview.includes('youtube.com') ? (
                    <iframe 
                      width="100%" 
                      height="200" 
                      src={videoPreview.replace('watch?v=', 'embed/')} 
                      title="Video" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video 
                      width="100%" 
                      height="200" 
                      controls 
                      src={videoPreview}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
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
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                sx={{ mb: 2 }}
                disabled={videoMethod === 'file'}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              
              {videoMethod === 'link' && (
                <Button
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onClick={() => {
                    setFormData(prev => ({...prev, videoUrl: ''}));
                    setVideoPreview(null);
                    setVideoMethod(null);
                  }}
                >
                  ลบลิงก์
                </Button>
              )}
              
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
                  height: bannerPreview ? "auto" : "120px",
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
                sx={{ mb: 2 }}
              />
              <FormLabel>รายละเอียด</FormLabel>
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
              disabled={loading}
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
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "บันทึกข้อมูล"}
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default EditBabyCareInfoVideoPage;