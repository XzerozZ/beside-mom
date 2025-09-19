"use client";
import { API_URL } from "@/config/config";

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
import StyledAlert from "../components/StyledAlert";
import ConfirmDialog from "../components/ConfirmDialog";
import { useAlert } from "../hooks/useAlert";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { MomStory } from "../types";
const MomstoryPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<MomStory[]>([]);
  const [loading, setLoading] = useState(true);
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();
  const { confirmState, showConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          showError("กรุณาเข้าสู่ระบบใหม่");
          router.push("/auth/login");
          return;
        }
        const apiUrl = `${API_URL}/video`;
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
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [router, showError]);

  const handleAddClick = () => {
    router.push("/admin/momstories/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/momstories/edit/${id}`);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.publish_at &&
        new Date(item.publish_at)
          .toLocaleDateString("th-TH")
          .includes(searchTerm))
  );

  async function handleDelete(id: string): Promise<void> {
    const performDelete = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          showError("กรุณาเข้าสู่ระบบใหม่");
          router.push("/auth/login");
          return;
        }
        const apiUrl = `${API_URL}/video/${id}`;
        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("API error");
        const result = await response.json();
        if (result.status !== "Success")
          throw new Error(result.message || "Error");
        setData((prev) => prev.filter((item) => item.id !== id));
        showSuccess("ลบเรื่องเล่าสำเร็จ");
      } catch (err) {
        showError("เกิดข้อผิดพลาดในการลบข้อมูล");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    showConfirm("คุณต้องการลบเรื่องเล่านี้ใช่หรือไม่?", performDelete, {
      title: "ยืนยันการลบ",
      confirmText: "ลบ",
      severity: "error",
    });
  }
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar selectedItem="2" />
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
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100%",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.publish_at
                          ? new Date(item.publish_at).toLocaleDateString(
                              "th-TH"
                            )
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
      <StyledAlert
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
        onClose={hideAlert}
      />
      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        severity={confirmState.severity}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default MomstoryPage;
