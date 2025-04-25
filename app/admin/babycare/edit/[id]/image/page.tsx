"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  FormLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import Sidebar from "../../../../components/SideBarAdmin";

interface Asset {
  asset_id: string;
  link: string;
}

interface BabyCareData {
  c_id: string;
  type: string;
  title: string;
  desc: string;
  banner: string;
  user_id: string;
  assets: Asset[];
  created_at: string;
  updated_at: string;
}

const EditBabyCareInfoPicturePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pictureurl: [] as string[],
    banners: null as string | null,
  });

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
          router.push('/user/auth/login');
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
        
        // Map API response to form data
        setFormData({
          title: result.title,
          description: result.desc,
          pictureurl: result.assets.map(asset => asset.link),
          banners: result.banner,
        });
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Convert files to array of URLs
    const newImages: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = () => {
        newImages.push(reader.result as string);
        
        if (newImages.length === files.length) {
          setFormData(prev => ({
            ...prev,
            pictureurl: [...prev.pictureurl, ...newImages]
          }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pictureurl: prev.pictureurl.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No authentication token found");
        alert("กรุณาเข้าสู่ระบบใหม่");
        router.push('/user/auth/login');
        return;
      }
      
      // Create FormData object
      const apiData = new FormData();
      apiData.append('title', formData.title);
      apiData.append('desc', formData.description);
      apiData.append('type', 'image');
      
      // Add new images
      for (let i = 0; i < formData.pictureurl.length; i++) {
        const imageUrl = formData.pictureurl[i];
        
        // Only process new images (base64 format)
        if (imageUrl.startsWith('data:image')) {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          apiData.append('assets', blob, `image${i}.jpg`);
        } else {
          // For existing images, we might need to pass their URLs or IDs
          // Depending on how the API expects updates
          apiData.append('existingAssets', imageUrl);
        }
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
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
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
        onItemSelect={(id) => {
          if (id !== "3") {
            switch (id) {
              case "1":
                router.push("/admin/mominfo");
                break;
              case "2":
                router.push("/admin/momstories");
                break;
              case "4":
                router.push("/admin/faq");
                break;
              case "5":
                router.push("/admin/appointment");
                break;
              case "6":
                router.push("/admin/nurse-contact");
                break;
            }
          }
        }}
        selectedItem="3"
      />
      <div className="flex-1 p-6">
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            gutterBottom
            className="text-xl text-neutral05 font-semibold"
          >
            แก้ไขข้อมูล &gt;&gt; ภาพ
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{ mt: 2 }}
                className="text-lg text-neutral05 font-semibold"
              >
                อัปโหลดรูปภาพ
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  mt: 2,
                }}
              >
                {/* Blurred Background Image */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${formData.pictureurl[0] || ''})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(2px)", // Blur effect applied to the background
                  }}
                />

                {/* Overlay to Darken the Background Slightly (Optional) */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Light transparent layer
                  }}
                />

                {/* Button - Kept Clear and Above Blur */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2, // Ensures button is above the blur
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={imageInputRef}
                    multiple
                    style={{ display: "none" }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#999999",
                      "&:hover": { bgcolor: "#777777" },
                    }}
                    onClick={() => imageInputRef.current?.click()}
                  >
                    อัปโหลด
                  </Button>
                </Box>
              </Box>

              {/* Image Gallery */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 2,
                }}
              >
                {formData.pictureurl.map((url, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#f0f0f0",
                        backgroundImage: `url(${url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    {/* Remove Button */}
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        minWidth: "24px",
                        width: "24px",
                        height: "24px",
                        padding: 0,
                        bgcolor: "rgba(255, 0, 0, 0.7)",
                        "&:hover": { bgcolor: "rgba(200, 0, 0, 0.9)" },
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </Button>
                  </Box>
                ))}
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

export default EditBabyCareInfoPicturePage;