"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAlert } from "../../../hooks/useAlert";
import {
  Box,
  Button,
  TextField,
  FormLabel,
} from "@mui/material";
import Sidebar from "../../../components/SideBarAdmin";

const EditFaq: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { showSuccess, showError } = useAlert();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch FAQ data by id
  useEffect(() => {
    const fetchFaq = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        showError("กรุณาเข้าสู่ระบบใหม่");
        router.push("/auth/login");
        return;
      }
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_url}/question/${id}`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        if (data.status !== "Success") throw new Error(data.message || "Error");
        setQuestion(data.result.question);
        setAnswer(data.result.answer);
      } catch (err) {
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, [id, router, showError]);

  // Update FAQ
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showError("กรุณาเข้าสู่ระบบใหม่");
      router.push("/auth/login");
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_url}/question/${id}`;
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      showSuccess("แก้ไขข้อมูลสำเร็จ");
      router.push("/admin/faq");
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
      console.error(err);
    }
  };

  return (
    <div className="flex bg-white ">
      <Sidebar 
      selectedItem="4"
      />
      <div className="flex-1 p-6">
        <h1 className="text-neutral05 font-bold">เเก้ไขข้อมูล</h1>
        <Box className="mt-8">
          <FormLabel>คำถาม</FormLabel>
          <TextField
            className="w-full mt-1"
            variant="outlined"
            size="small"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
        </Box>
        <Box className="mt-4">
          <FormLabel>คำตอบ</FormLabel>
          <TextField
            className="w-full mt-1"
            variant="outlined"
            multiline
            rows={4}
            maxRows={8}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={loading}
          />
        </Box>
        <div className="flex justify-end mt-4 gap-2"> 
          <Button
            variant="outlined"
            sx={{
              color: "#B36868",
              borderColor: "#FF9494",
              "&:hover": { borderColor: "#B36868" },
            }}
            size="small"
            className="mr-2 w-40"
            onClick={() => {
              router.push("/admin/faq");
            }}
            disabled={loading}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#B36868",
              "&:hover": { backgroundColor: "#965757" },
            }}
            size="small"
            className="w-40"
            onClick={handleUpdate}
            disabled={loading}
          >
            บันทึก
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditFaq;
