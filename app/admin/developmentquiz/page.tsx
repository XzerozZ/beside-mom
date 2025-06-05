"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";
import Sidebar from "../components/SideBarAdmin";
import StyledAlert from "../components/StyledAlert";
import ConfirmDialog from "../components/ConfirmDialog";
import { useAlert } from "../hooks/useAlert";
import { useConfirmDialog } from "../hooks/useConfirmDialog";

import AddIcon from "@mui/icons-material/Add";

import { useRouter } from "next/navigation";


import { Quizdevelopment } from "../types";

export default function DevelopmentQuizPage() {
  const router = useRouter();
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();
  const { confirmState, showConfirm, handleConfirm, handleCancel } = useConfirmDialog();
  const [quizList, setQuizList] = useState<Quizdevelopment[]>([]);
  const [search, setSearch] = useState("");
  const [periodFilter, setPeriodFilter] = useState<string>("ทั้งหมด");
  const [periods, setPeriods] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = `${process.env.NEXT_PUBLIC_url}/quiz`;
    if (!apiUrl) {
      console.error("API URL is not defined");
      return;
    }
    fetch(apiUrl, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuizList(data.result || []);
        const uniquePeriods = Array.from(
          new Set((data.result || []).map((q: Quizdevelopment) => q.period.period))
        ) as string[];
        setPeriods(uniquePeriods);
      });
  }, []);
  async function handleDelete(quiz_id: number) {
    const performDelete = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = `${process.env.NEXT_PUBLIC_url}/quiz`;
        if (!apiUrl) {
          console.error("API URL is not defined");
          return;
        }
        
        const res = await fetch(`${apiUrl}/${quiz_id}`, {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        
        if (res.ok) {
          setQuizList((prev) => prev.filter((q) => q.quiz_id !== quiz_id));
          showSuccess("ลบคำถามสำเร็จ");
        } else {
          const data = await res.json();
          showError(data.message || "เกิดข้อผิดพลาดในการลบคำถาม");
        }
      } catch (error) {
        showError("เกิดข้อผิดพลาดในการลบคำถาม");
        console.error("Error deleting quiz:", error);
      }
    };

    showConfirm(
      "คุณต้องการลบคำถามนี้หรือไม่?",
      performDelete,
      {
        title: "ยืนยันการลบ",
        confirmText: "ลบ",
        severity: "error"
      }
    );
  }

  // Group quiz by period
  const grouped = quizList
    .filter(
      (q) =>
        (periodFilter === "ทั้งหมด" || q.period.period === periodFilter) &&
        (search === "" ||
          q.question.includes(search) ||
          q.category.category.includes(search))
    )
    .reduce((acc: Record<string, Quizdevelopment[]>, quiz) => {
      if (!acc[quiz.period.period]) acc[quiz.period.period] = [];
      acc[quiz.period.period].push(quiz);
      return acc;
    }, {});

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar selectedItem="7" />
      <div className="flex-1 p-4">
        <Container maxWidth="lg">
          <Box className="flex items-center justify-between mb-6">
            <div className="text-neutral05 font-bold ">
              คำถามแบบประเมินพัฒนาการ
            </div>
            <Box className="flex items-center gap-2 mt-2">
              <Box className="relative">
                <TextField
                  size="small"
                  placeholder=" ค้นหา"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.7656 16.6895L12.6934 11.6172C13.4805 10.5996 13.9062 9.35547 13.9062 8.04688C13.9062 6.48047 13.2949 5.01172 12.1895 3.9043C11.084 2.79687 9.61133 2.1875 8.04688 2.1875C6.48242 2.1875 5.00977 2.79883 3.9043 3.9043C2.79687 5.00977 2.1875 6.48047 2.1875 8.04688C2.1875 9.61133 2.79883 11.084 3.9043 12.1895C5.00977 13.2969 6.48047 13.9062 8.04688 13.9062C9.35547 13.9062 10.5977 13.4805 11.6152 12.6953L16.6875 17.7656C16.7024 17.7805 16.72 17.7923 16.7395 17.8004C16.7589 17.8084 16.7797 17.8126 16.8008 17.8126C16.8218 17.8126 16.8427 17.8084 16.8621 17.8004C16.8815 17.7923 16.8992 17.7805 16.9141 17.7656L17.7656 16.916C17.7805 16.9011 17.7923 16.8835 17.8004 16.864C17.8084 16.8446 17.8126 16.8238 17.8126 16.8027C17.8126 16.7817 17.8084 16.7609 17.8004 16.7414C17.7923 16.722 17.7805 16.7043 17.7656 16.6895ZM11.1406 11.1406C10.3125 11.9668 9.21484 12.4219 8.04688 12.4219C6.87891 12.4219 5.78125 11.9668 4.95312 11.1406C4.12695 10.3125 3.67188 9.21484 3.67188 8.04688C3.67188 6.87891 4.12695 5.7793 4.95312 4.95312C5.78125 4.12695 6.87891 3.67188 8.04688 3.67188C9.21484 3.67188 10.3145 4.125 11.1406 4.95312C11.9668 5.78125 12.4219 6.87891 12.4219 8.04688C12.4219 9.21484 11.9668 10.3145 11.1406 11.1406Z"
                    fill="#B36868"
                  />
                </svg>
                    ),
                    style: {
                      background: "#FFFFFF ",
                      borderRadius: 2,
                      border: "1px solid #B36868",
                      color: "#B36868",
                      fontSize: 16,
                      height: 40,
                    },
                  }}
                  inputProps={{ style: { color: "#B36868" } }}
                  sx={{
                    width: 200,
                    mr: 1,
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& input::placeholder": { color: "#B36868", opacity: 1 },
                  }}
                />
              </Box>
              <Select
                size="small"
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                sx={{
                  minWidth: 100,
                  background: "#FFFFFF",
                  borderRadius: 0.5,
                  border: "1px solid #B36868",
                  color: "FFFFFF",
                  fontSize: 16,
                  height: 40,
                  "& .MuiSelect-select": { color: "#B36868" },
                  "& fieldset": { border: "none" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { color: "#B36868" },
                  },
                }}
              >
                <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
                {periods.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: "#B36868",
                  borderRadius: 1,
                  minWidth: 120,
                  height: 40,
                  fontWeight: 500,
                  fontSize: 16,
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#934343" },
                  ml: 2,
                }}
                onClick={() => {
                  router.push("/admin/developmentquiz/add");
                }}
              >
                เพิ่มคำถาม
              </Button>
            </Box>
          </Box>
          {Object.keys(grouped).map((period) => {
            const quizzes = grouped[period];
            const isShowAll = showAll[period];
            const displayQuizzes = isShowAll ? quizzes : quizzes.slice(0, 3);
            return (
              <Box key={period} sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  className="font-bold text-neutral05 mb-2"
                >
                  ช่วงอายุ: {period}
                </Typography>
                <Grid container spacing={2}>
                  {displayQuizzes.map((quiz) => (
                    <Grid item xs={12} sm={6} md={4} key={quiz.quiz_id}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          minHeight: 180,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Box sx={{ position: "relative", width: 32, height: 32 }}>
                              <Image
                                src={quiz.banner}
                                alt="banner"
                                fill
                                style={{
                                  borderRadius: 6,
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                            <Typography
                              variant="subtitle2"
                              className="font-bold text-neutral05"
                              sx={{ 
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%'
                              }}
                            >
                              {quiz.category.category} 
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            className="text-neutral04 mb-1"
                            sx={{ 
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '100%'
                            }}
                          >
                            {quiz.question}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ 
                              fontSize: 13,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '100%'
                            }}
                          >
                            {quiz.desc}
                          </Typography>
                        </Box>
                         <Box display="flex" justifyContent="space-between" mx={10}>
                          <Button
                            variant="outlined"
                            size="small"
                            
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
                            sx={{ color: "#999999", borderColor: "#999999" }}
                            onClick={() => {
                              router.push(
                                `/admin/developmentquiz/edit/${quiz.quiz_id}`
                              );
                            }}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
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
                            sx={{ color: "#999999", borderColor: "#999999" }}
                            onClick={() => {
                              handleDelete(quiz.quiz_id);
                              console.log(`Delete quiz with ID: ${quiz.quiz_id}`);
                            }}
                          >
                            ลบ
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
               <div className="flex items-center justify-center mt-2">
                {quizzes.length > 3 && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                    
                      variant="text"
                      sx={{ color: "#999999", fontWeight: 500, fontSize: 15 }}
                      onClick={() =>
                        setShowAll((prev) => ({
                          ...prev,
                          [period]: !isShowAll,
                        }))
                      }
                    >
                      <span style={{ color: "#ccc", margin: "0 8px" }}>
                        --------------------------{isShowAll ? "ย่อ" : `แสดงทั้งหมด (${quizzes.length})`}--------------------------
                      </span>
                   
                    </Button>
                  </Box>
                )}
                </div>
              </Box>
            );
          })}
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
}
