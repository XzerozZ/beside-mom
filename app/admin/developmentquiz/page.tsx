/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

interface Quiz {
  quiz_id: number;
  question: string;
  desc: string;
  solution: string;
  suggestion: string;
  banner: string;
  category: { ID: number; category: string };
  period: { ID: number; period: string };
}

export default function DevelopmentQuizPage() {
  const router = useRouter();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [search, setSearch] = useState("");
  const [periodFilter, setPeriodFilter] = useState<string>("ทั้งหมด");
  const [periods, setPeriods] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = process.env.NEXT_PUBLIC_api_quiz;
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
          new Set((data.result || []).map((q: Quiz) => q.period.period))
        ) as string[];
        setPeriods(uniquePeriods);
      });
  }, []);
  async function handleDelete(quiz_id: number) {
    const token = localStorage.getItem("token");
    const apiUrl = process.env.NEXT_PUBLIC_api_quiz;
    if (!apiUrl) {
    console.error("API URL is not defined");
    return;
    }
    if (!window.confirm("คุณต้องการลบคำถามนี้หรือไม่?")) {
    return;
    }
    try {
    const res = await fetch(`${apiUrl}/${quiz_id}`, {
      method: "DELETE",
      headers: {
      Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (res.ok) {
      setQuizList((prev) => prev.filter((q) => q.quiz_id !== quiz_id));
    } else {
      const data = await res.json();
      alert(data.message || "เกิดข้อผิดพลาดในการลบคำถาม");
    }
    } catch (error) {
    alert("เกิดข้อผิดพลาดในการลบคำถาม");
    console.error("Error deleting quiz:", error);
    }
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
    .reduce((acc: Record<string, Quiz[]>, quiz) => {
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
            <Box className="flex items-center gap-2">
              <Box className="relative">
                <TextField
                  size="small"
                  placeholder="ค้นหา"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon style={{ color: "#B36868", marginRight: 8 }} />
                    ),
                    style: {
                      background: "#FFFFFF ",
                      borderRadius: 8,
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
                  borderRadius: 2,
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
                  borderRadius: 2,
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
                            <img
                              src={quiz.banner}
                              alt="banner"
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 6,
                                objectFit: "cover",
                              }}
                            />
                            <Typography
                              variant="subtitle2"
                              className="font-bold text-neutral05"
                            >
                              {quiz.category.category}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            className="text-neutral04 mb-1"
                          >
                            {quiz.question}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: 13 }}
                          >
                            {quiz.desc}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1, mt: 2  }} className="justify-end">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon sx={{ color: "#B36868" }} />}
                            sx={{
                              color: "#B36868",
                              borderColor: "#B36868",
                              borderRadius: 2,
                              minWidth: 60,
                            }}
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
                            startIcon={<DeleteIcon sx={{ color: "#B36868" }} />}
                            sx={{
                              color: "#B36868",
                              borderColor: "#B36868",
                              borderRadius: 2,
                              minWidth: 60,
                            }}
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
    </div>
  );
}
