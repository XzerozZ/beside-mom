"use client";

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Sidebar from "../../../../components/SideBarAdmin";

const EditBabyCareInfoVideoPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    publishDate: "",
    videoUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        title: "Mock Title",
        description: "Mock description of the baby care info.",
        publishDate: "2025-02-23",
        videoUrl: "https://www.example.com/mock-video-url",
      };
      setFormData(data);
    };

    fetchData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your save logic here
    console.log("Saving:", formData);
    // After saving, redirect back to the main page
    router.push("/admin/babycare");
  };

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
                router.push("/admin/nurse-contact");
                break;
              case "6":
                router.push("/admin/babyinfo");
                break;
              case "7":
                router.push("/admin/appointment");
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
            component="div"
            sx={{ mt: 2 }}
            className="text-xl text-neutral05 font-semibold"
          >
            แก้ไขข้อมูล &gt;&gt; วิดีโอ
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
              <Typography
                variant="body2"
                color="textSecondary"
                className="mt-4"
              >
                วิดิโอ
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#999999",
                    "&:hover": { bgcolor: "#777777" },
                  }}
                >
                  อัปโหลดวิดีโอ
                </Button>
              </Box>
              <FormLabel className="">ลิงก์คลิปวิดีโอ</FormLabel>
              <TextField
                fullWidth
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
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
              <FormLabel className="">กำหนดวันเผยแพร่</FormLabel>
              <TextField
                fullWidth
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
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

export default EditBabyCareInfoVideoPage;
