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

const EditBabyCareInfoPicturePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    publishDate: "",
    pictureurl: [] as string[],
  });

  useEffect(() => {
    // Fetch the data based on the ID from the URL
    // Replace this with your actual data fetching logic
    const fetchData = async () => {
      const data = {
        title: "Mock Title",
        pictureurl: [
          "https://th.bing.com/th/id/OIP.TtDe-pj6di9PTDLjFYVlRQHaDs?w=350&h=174&c=7&r=0&o=5&dpr=2&pid=1.7",
          "https://th.bing.com/th/id/OIP.TtDe-pj6di9PTDLjFYVlRQHaDs?w=350&h=174&c=7&r=0&o=5&dpr=2&pid=1.7",
          "https://th.bing.com/th/id/OIP.TtDe-pj6di9PTDLjFYVlRQHaDs?w=350&h=174&c=7&r=0&o=5&dpr=2&pid=1.7",
        ],
        description: "Mock description of the baby care info.",
        publishDate: "2025-02-23",
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

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{ mt: 2 }}
                className="text-lg text-neutral05 font-semibold"
              >
                อัปโหลดวิดีโอ
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
                    backgroundImage: `url(${formData.pictureurl[0]})`,
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
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#999999",
                      "&:hover": { bgcolor: "#777777" },
                    }}
                  >
                    อัปโหลด
                  </Button>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                }}
              >
                {formData.pictureurl.map((url, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#f0f0f0",
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
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
              <FormLabel className="">กำหนดวันเผยแพร่</FormLabel>
              <TextField
                fullWidth
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
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

export default EditBabyCareInfoPicturePage;
