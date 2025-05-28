"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../../../../components/SideBarAdmin";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { EvaluateData } from "@/app/admin/types";

const periodMap: Record<number, string> = {
  1: "แรกเกิด",
  2: "1 เดือน",
  3: "2 เดือน",
  4: "3 - 4 เดือน",
  5: "5 - 6 เดือน",
  6: "7-8 เดือน",
  7: "9 เดือน",
  8: "10-12 เดือน",
};

const statusChip = (status: boolean) =>
  status ? (
    <Chip label="ประเมินแล้ว" color="success" size="small" icon={<CheckCircleIcon />} />
  ) : (
    <Chip label="รอการประเมิน" color="default" size="small" icon={<InfoOutlinedIcon />} />
  );

const solutionChip = (solution_status: string) => {
  if (solution_status === "ผ่านการประเมิน" || solution_status === "ผ่าน") {
    return (
      <Chip
        label="ผ่าน"
        color="success"
        size="small"
        icon={<CheckCircleIcon />}
        sx={{ ml: 1 }}
      />
    );
  }
  if (solution_status === "ไม่ผ่าน" || solution_status === "ไม่ผ่านเกณฑ์การประเมิน") {
    return (
      <Chip
        label="ไม่ผ่านเกณฑ์การประเมิน"
        color="error"
        size="small"
        icon={<CancelIcon />}
        sx={{ ml: 1 }}
      />
    );
  }
  return (
    <Chip
      label="รอการประเมิน"
      color="default"
      size="small"
      icon={<InfoOutlinedIcon />}
      sx={{ ml: 1 }}
    />
  );
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "รอการประเมิน";
  const d = new Date(dateStr);
  return d.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const EvaluateList: React.FC = () => {
  const params = useParams();
  const kid_id = params.kid_id as string;
  const [loading, setLoading] = useState(true);
  const [evaluates, setEvaluates] = useState<EvaluateData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvaluates = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const apiUrl = `${process.env.NEXT_PUBLIC_api_evaluate}/all/${kid_id}`;
        const res = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("ไม่พบข้อมูล");
        const data = await res.json();
        setEvaluates(data.result || []);
      } catch (err) {
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (kid_id) fetchEvaluates();
  }, [kid_id]);

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar selectedItem="1" />
      <div className="flex-1 p-6">
        <Container>
        
          <h1 className="text-neutral05 font-bold mb-5">แบบประเมินพัฒนาการ</h1>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Grid container spacing={3}>
              {evaluates.map((item) => (
                <Grid item xs={12} key={item.E_id}>
                  <Link
                    href={`/admin/mominfo/${params.id}/evaluate/${params.kid_id}/${item.period_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        boxShadow: "none",
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        '&:hover': { boxShadow: 2, borderColor: '#B36868' },
                      }}
                    >
                      <Box>
                        <Typography fontWeight={700} mb={1}>
                          ช่วงอายุ: {periodMap[item.period_id] || "-"}
                        </Typography>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <Typography fontWeight={500} mr={1}>
                            สถานะการประเมิน:
                          </Typography>
                          {statusChip(item.status)}
                        </Box>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <Typography fontWeight={500} mr={1}>
                            ผลการประเมิน:
                          </Typography>
                          {solutionChip(item.solution_status)}
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Typography fontWeight={500} mr={1}>
                            วันที่ประเมิน:
                          </Typography>
                          <Typography>
                            {formatDate(item.completed_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>
    </div>
  );
};

export default EvaluateList;
