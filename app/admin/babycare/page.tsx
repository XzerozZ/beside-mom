
"use client";

import React, { useState } from "react";
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
import { useEffect } from "react";
import { ContentBabycareItem} from "../types";

const MomstoryPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const handleAddClick = () => {
    console.log("Add button clicked");
  };
  const handleEdit = (id: string, type: string) => {
    console.log("Edit button clicked", id);
    router.push(`/admin/babycare/edit/${id}/${type}`);
  };
  type BabyCareItem = {
    id: string;
    title: string;
    date: string;
    type: string;
    thumbnail: string;
  };
  const [data, setData] = useState<BabyCareItem[]>([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(`${process.env.NEXT_PUBLIC_url}/care` as string, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (Array.isArray(data.result)) {
            const result: ContentBabycareItem[] = data.result;
            const mapped: BabyCareItem[] = result.map(item => ({
              id: item.c_id,
              title: item.title,
              date: item.updated_at,
              type: item.type,
              thumbnail: item.banner,
            }));
            setData(mapped);
          }
        } catch (error) {
          console.log("Error fetching data:", error);
          alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        } 
      };
      fetchData();
    }, []);

  
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาเข้าสู่ระบบใหม่");
        router.push('/auth/login');
        return;
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_url}/care/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      if (result.status !== "Success") {
        throw new Error(result.message || "Failed to delete item");
      }

      setData(prev => prev.filter(item => item.id.toString() !== id));
      alert("ลบข้อมูลสำเร็จ");
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  };
  return (
    <div className="flex bg-white">
      <Sidebar 
      selectedItem="3"
      
      />
      <div className="flex-1 p-6">
        <Container>
          <TopBarSection
            title="ข้อมูลการดูแลทารก"
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            onAddClick={handleAddClick}
          />
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
                      image={item.thumbnail}
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
                     
                      {item.date
                          ? new Date(item.date).toLocaleDateString("th-TH")
                          : ""}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ color: "#999999", borderColor: "#999999" }}
                        className="text-neutral05 mr-5 w-24"
                        startIcon={
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.723 6.0692L14.8599 6.93226L13.0672 5.13949L13.9309 4.27637L13.9309 4.27631C13.9934 4.21382 14.0782 4.17871 14.1666 4.17871C14.2549 4.17871 14.3396 4.21375 14.4021 4.27614C14.4021 4.27616 14.4021 4.27617 14.4022 4.27619C14.4022 4.27623 14.4022 4.27627 14.4023 4.27631L15.7229 5.59781L15.723 5.59787C15.7855 5.66038 15.8206 5.74515 15.8206 5.83353C15.8206 5.92189 15.7855 6.00664 15.723 6.06915C15.723 6.06916 15.723 6.06918 15.723 6.0692ZM3.8291 16.1669V14.3748L11.3282 6.8789L13.1212 8.67187L5.62616 16.1669H3.8291ZM3.80475 14.3992L3.80508 14.3988C3.80497 14.3989 3.80486 14.399 3.80475 14.3992Z"
                              stroke="#4D4D4D"
                            />
                          </svg>
                        }
                        onClick={() => handleEdit(item.id, item.type)}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ color: "#999999", borderColor: "#999999" }}
                        className="text-neutral05 w-24"
                        startIcon={
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.9165 3.83333H15.3332V4.5H4.6665V3.83333H7.08317H7.29028L7.43672 3.68689L8.12361 3H11.8761L12.563 3.68689L12.7094 3.83333H12.9165ZM6.6665 17C6.02598 17 5.49984 16.4739 5.49984 15.8333V6.33333H14.4998V15.8333C14.4998 16.4739 13.9737 17 13.3332 17H6.6665Z"
                              stroke="#4D4D4D"
                            />
                          </svg>
                        }
                        onClick={() => handleDelete(item.id.toString())}
                      >
                        ลบ
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default MomstoryPage;

