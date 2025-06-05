"use client";
import React, { useState, useRef } from "react";
import Sidebar from "../../components/SideBarAdmin";
import StyledAlert from "../../components/StyledAlert";
import { useAlert } from "../../hooks/useAlert";
import {
  Container,
  Box,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormLabel,
  Alert,

} from "@mui/material";
import { useRouter } from "next/navigation";

const categoryOptions = [
  { value: "1", label: "ด้านการเคลื่อนไหว Gross Motor (GM)" },
  { value: "2", label: "ด้านการใช้กล้ามเนื้อมัดเล็ก และสติปัญญา Fine Motor (FM)" },
  { value: "3", label: "ด้านการเข้าใจภาษา Receptive Language (RL)" },
  { value: "4", label: "ด้านการใช้ภาษา Expression Language (EL)" },
  { value: "5", label: "ด้านการช่วยเหลือตนเองและสังคม Personal and Social (PS)" },
];

const periodOptions = [
  { value: "1", label: "แรกเกิด" },
  { value: "2", label: "1 เดือน" },
  { value: "3", label: "2 เดือน" },
  { value: "4", label: "3 - 4 เดือน" },
  { value: "5", label: "5 - 6 เดือน" },
  { value: "6", label: "7 - 8 เดือน" },
  { value: "7", label: "8 - 9 เดือน" },
  { value: "8", label: "10 - 12 เดือน" },
];

export default function AddDevelopmentQuiz() {
  const router = useRouter();
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();
  const [categoryid, setCategoryid] = useState("");
  const [periodID, setPeriodID] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [solution, setSolution] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [banners, setBanners] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanners(e.target.files[0]);
      setBannerPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("categoryid", categoryid);
      formData.append("periodID", periodID);
      formData.append("question", question);
      formData.append("description", description);
      formData.append("solution", solution);
      formData.append("suggestion", suggestion);
      if (banners) formData.append("banners", banners);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const apiUrl = `${process.env.NEXT_PUBLIC_url}/quiz`;
      if (!apiUrl) throw new Error("API URL not defined");
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "เกิดข้อผิดพลาด");
      }
      setSuccess("เพิ่มข้อมูลสำเร็จ");
      router.push("/admin/developmentquiz");
     
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    } 
  };

  return (
    <div className="flex bg-white">
      <Sidebar selectedItem="7" />
      <div className="flex-1 p-4">
        <Container maxWidth="lg">
            <div className="text-neutral05 font-bold ">
            เพิ่มคำถามแบบประเมินพัฒนาการ
            </div>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormLabel>อัปโหลดรูป</FormLabel>
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#f0f0f0",
                      backgroundImage: bannerPreview ? `url(${bannerPreview})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 2,
                      borderRadius: 2,
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-banner"
                      type="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    <label htmlFor="upload-banner">
                      <Button
                        variant="contained"
                        component="span"
                        sx={{
                          bgcolor: "#999999",
                          "&:hover": { bgcolor: "#777777" },
                        }}
                      >
                        อัปโหลดปก
                      </Button>
                    </label>
                  </Box>
                  
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>หัวข้อ</FormLabel>
                  <Select
                    fullWidth
                    size="small"
                    value={categoryid}
                    onChange={e => setCategoryid(e.target.value)}
                    displayEmpty
                    required
                    sx={{ mt: 1, mb: 2 }}
                  >
                    <MenuItem value="">เลือกหัวข้อ</MenuItem>
                    {categoryOptions.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </Select>
                  <FormLabel>ช่วงอายุ</FormLabel>
                  <Select
                    fullWidth
                    size="small"
                    value={periodID}
                    onChange={e => setPeriodID(e.target.value)}
                    displayEmpty
                    required
                    sx={{ mt: 1, mb: 2 }}
                  >
                    <MenuItem value="">เลือกช่วงอายุ</MenuItem>
                    {periodOptions.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </Select>
                  <FormLabel>ทักษะ</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    required
                    sx={{ mt: 1, mb: 2 }}
                  />
                </Grid>
                
                  <FormLabel>วิธีการประเมิน</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    multiline
                    rows={2}
                    sx={{ mt: 1, mb: 2 }}
                  />
                
                
                  <FormLabel>ผลลัพธ์ที่ควรเกิดขึ้น</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={solution}
                    onChange={e => setSolution(e.target.value)}
                    required
                    multiline
                    rows={2}
                    sx={{ mt: 1, mb: 2 }}
                  />
             
           
                  <FormLabel>การส่งเสริมพัฒนาการ (กรณีไม่ผ่าน)</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={suggestion}
                    onChange={e => setSuggestion(e.target.value)}
                    required
                    multiline
                    rows={2}
                    sx={{ mt: 1, mb: 2 }}
                  />
              
              </Grid>
              {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mt: 3 }}>{success}</Alert>}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setCategoryid("");
                    setPeriodID("");
                    setQuestion("");
                    setDescription("");
                    setSolution("");
                    setSuggestion("");
                    setBanners(null);
                    setBannerPreview(null);
                    setError("");
                    setSuccess("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                    router.push("/admin/developmentquiz");
                  }}

                  

                >
                  ยกเลิก
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#B37C6B", minWidth: 120, fontWeight: 500, fontSize: 16, boxShadow: "none", '&:hover': { bgcolor: "#a06b5c" } }}
                >
                  เพิ่มข้อมูล
                </Button>
              </Box>
            </form>
  
        </Container>
      </div>
      <StyledAlert
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
        onClose={hideAlert}
      />
    </div>
  );
}
