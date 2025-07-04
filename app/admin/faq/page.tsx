"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import TopBarSection from "../components/Topbar";
import Sidebar from "../components/SideBarAdmin";
import StyledAlert from "../components/StyledAlert";
import ConfirmDialog from "../components/ConfirmDialog";
import { useAlert } from "../hooks/useAlert";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { FAQ } from "../types"; // Adjust the import path as necessary


export default function Faq() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();
  const { confirmState, showConfirm, handleConfirm, handleCancel } = useConfirmDialog();

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No authentication token found");
          showError("กรุณาเข้าสู่ระบบใหม่");
          router.push('/auth/login');
          return;
        }
        
        // Fetch data from API
        const apiUrl = `${process.env.NEXT_PUBLIC_url}/question` ;
        if (!apiUrl) {
          throw new Error("API URL not defined");
        }
        
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status !== "Success" && data.status_code !== 200) {
          throw new Error(data.message || "Failed to fetch data");
        }

        setFaqs(data.result || []);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [router, showError]);

  const handleAddClick = () => {
    router.push("/admin/faq/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/faq/edit/${id}`);
  };
  
  async function handleDelete(id: string) {
    const performDelete = async () => {
        try {
          // Get token from localStorage
          const token = localStorage.getItem('token');
          if (!token) {
            setError("No authentication token found");
            showError("กรุณาเข้าสู่ระบบใหม่");
            router.push('/auth/login');
            return;
          }
          
          // Delete FAQ from API
          const apiUrl = `${process.env.NEXT_PUBLIC_url}/question/${id}`;
          const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.status !== "Success") {
            throw new Error(data.message || "Failed to delete FAQ");
          }

          // Remove FAQ from state
          setFaqs(prev => prev.filter(faq => faq.Q_id !== id));
          showSuccess("ลบคำถามสำเร็จ");
        } catch (err) {
          console.error("Error deleting FAQ:", err);
          showError("เกิดข้อผิดพลาดในการลบคำถาม");
        }
      };
    showConfirm(
      "คุณต้องการลบคำถามนี้ใช่หรือไม่?",
      performDelete,
      {
        severity: "error",
        confirmText: "ลบ",
        cancelText: "ยกเลิก"
      }
    );
  };

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-white min-h-screen">
    <Sidebar 
      selectedItem="4"
      />
      <div className="flex-1 p-6">
        <Container>
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
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            severity={confirmState.severity}
            confirmText={confirmState.confirmText}
            cancelText={confirmState.cancelText}
          />
          <TopBarSection
            title="ข้อมูลคำถามที่พบบ่อย"
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            onAddClick={handleAddClick}
          />
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : (
            <>
              {filteredFaqs.length > 0 ? 
                filteredFaqs.map((faq) => (
                  <Card key={faq.Q_id} sx={{ mb: 2, p: 2 }}>
                    <CardContent>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" fontWeight="bold">
                          Q: {faq.question}
                        </Typography>
                        <div className="flex gap-2">
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ color: "#999999", borderColor: "#999999" }}
                            className="text-neutral05 mr-5 w-24"
                            onClick={() => handleEdit(faq.Q_id)}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ color: "#999999", borderColor: "#999999" }}
                            className="text-neutral05 w-24"
                            onClick={() => handleDelete(faq.Q_id)}
                          >
                            ลบ
                          </Button>
                        </div>
                      </div>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <pre className="font-noto-sans-thai whitespace-pre-wrap">A: {faq.answer}</pre>
                      </Typography>
                    </CardContent>
                  </Card>
                ))
                : 
                <Typography
                  variant="body1"
                  sx={{ mt: 2 }}
                  className="text-neutral05"
                >
                  {searchTerm ? "ไม่พบผลลัพธ์ที่ตรงกับการค้นหา" : "ไม่มีข้อมูลคำถามที่พบบ่อย"}
                </Typography>
              }
            </>
          )}
        </Container>
      </div>
    </div>
  );
}