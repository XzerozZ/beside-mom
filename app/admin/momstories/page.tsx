/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";
import TopBarSection from "../components/Topbar";
import Sidebar from "../components/SideBarAdmin";

const MomstoryPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          alert("กรุณาเข้าสู่ระบบใหม่");
          router.push("/user/auth/login");
          return;
        }
        const apiUrl = process.env.NEXT_PUBLIC_api_momstory;
        const response = await fetch(apiUrl as string, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (data.status !== "Success") throw new Error(data.message || "Error");
        setData(data.result || []);
      } catch (err) {
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [router]);

  const handleAddClick = () => {
    router.push("/admin/momstories/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/momstories/edit/${id}`);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.publish_at && new Date(item.publish_at).toLocaleDateString("th-TH").includes(searchTerm))
  );

  async function handleDelete(id: string): Promise<void> {
    if (!window.confirm("คุณต้องการลบเรื่องเล่านี้ใช่หรือไม่?")) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาเข้าสู่ระบบใหม่");
        router.push("/user/auth/login");
        return;
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_api_momstory}/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("API error");
      const result = await response.json();
      if (result.status !== "Success") throw new Error(result.message || "Error");
      setData((prev) => prev.filter((item) => item.id !== id));
      alert("ลบเรื่องเล่าสำเร็จ");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex bg-white">
     <Sidebar 
       selectedItem="2"
      />
      <div className="flex-1 p-6">
        <Container>
          <TopBarSection
            title="ข้อมูลเรื่องเล่าจากคุณแม่ทั้งหมด"
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            onAddClick={handleAddClick}
          />
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredData.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card>
                    <Box
                                  sx={{
                                    width: "100%",
                                    height: 140,
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#f5f5f5",
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    image={item.banner}
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </Box>      
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        className="text-base"
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.publish_at
                          ? new Date(item.publish_at).toLocaleDateString("th-TH")
                          : ""}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: "#999999", borderColor: "#999999" }}
                          className="text-neutral05 mr-5 w-24"
                          onClick={() => handleEdit(item.id)}
                        >
                          แก้ไข
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: "#999999", borderColor: "#999999" }}
                          className="text-neutral05 w-24"
                          onClick={() => handleDelete(item.id)}
                        >
                          ลบ
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>
    </div>
  );
};

export default MomstoryPage;
