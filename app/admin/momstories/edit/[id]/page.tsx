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
import Sidebar from "../../../components/SideBarAdmin";

const EditMomStoryPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [storyData, setStoryData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    publishDate: "",
  });

  useEffect(() => {
    // Fetch the story data based on the ID from the URL
    // Replace this with your actual data fetching logic
    const fetchData = async () => {
      const data = {
        title: "เรื่องของแม่ที่ต้องพูด.....",
        description: "รายละเอียดของเรื่องเล่า",
        videoUrl: "https://youtu.be/uefcQzHmA_Y?si=jWn5kCXoZcl5FQXP",
        publishDate: "12/06/2567",
      };
      setStoryData(data);
    };

    fetchData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your save logic here
    console.log("Saving:", storyData);
    // After saving, redirect back to the main page
    router.push("/admin/momstories");
  };

  return (
    <div className="flex bg-white">
      <Sidebar
        onItemSelect={(id) => {
          if (id !== "2") {
            switch (id) {
              case "1":
                router.push("/admin/mominfo");
                break;
              case "3":
                router.push("/admin/babycare");
                break;
              case "4":
                router.push("/admin/faq");
                break;
              case "5":
                router.push("/admin/nurse-contact");
                break;
            }
          }
        }}
        selectedItem="2"
      />
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
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 2,
                    mb: 6.1,
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
                  value={storyData.videoUrl}
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                />
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
                  value={storyData.title}
                  onChange={handleChange}
                  sx={{ mt: 1, mb: 3 }}
                />
                <FormLabel>รายละเอียด</FormLabel>
                <TextField
                  fullWidth
                  name="description"
                  value={storyData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  sx={{ mt: 1, mb: 3 }}
                />
                <FormLabel>กำหนดวันเผยแพร่</FormLabel>
                <TextField
                  fullWidth
                  name="publishDate"
                  value={storyData.publishDate}
                  onChange={handleChange}
                  sx={{ mt: 1 }}
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
              >
                บันทึกข้อมูล
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default EditMomStoryPage;
