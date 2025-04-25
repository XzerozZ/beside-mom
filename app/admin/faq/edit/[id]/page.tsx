"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch FAQ data by id
  useEffect(() => {
    const fetchFaq = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาเข้าสู่ระบบใหม่");
        router.push("/user/auth/login");
        return;
      }
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_api_question}/${id}`;
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
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, [id, router]);

  // Update FAQ
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบใหม่");
      router.push("/user/auth/login");
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_api_question}/${id}`;
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
      alert("แก้ไขข้อมูลสำเร็จ");
      router.push("/admin/faq");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
    }
  };

  return (
    <div className="flex bg-white ">
      <Sidebar
        onItemSelect={(id) => {
          if (id !== "4") {
            switch (id) {
              case "1":
                router.push("/admin/mominfo");
                break;
              case "2":
                router.push("/admin/momstories");
                break;
              case "3":
                router.push("/admin/babycare");
                break;
              case "5":
                router.push("/admin/appointment");
                break;
              case "6":
                router.push("/admin/nurse-contact");
                break;
            }
          }
        }}
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
        <div className="flex justify-end mt-4">
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
