"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  
  Box,
  Button,
  TextField,

  FormLabel,
} from "@mui/material";
import Sidebar from "../../components/SideBarAdmin";

const AddFag: React.FC = () => {
  const router = useRouter();
  // State for individual question and answer inputs
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");



  const handleSubmit = async () => {
    if (question.trim() === "" || answer.trim() === "") return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบใหม่");
      router.push("/user/auth/login");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_api_question;
      if (!apiUrl) throw new Error("API URL not defined");

      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("API error");

      alert("เพิ่มคำถามสำเร็จ");
      setQuestion("");
      setAnswer("");
      router.push("/admin/faq");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการเพิ่มคำถาม");
      console.error(err);
    }
  };

  return (
    <div className="flex bg-white ">
      <Sidebar 
      selectedItem="4"
      />
     
      <div className="flex-1 p-6">
        <h1 className="text-neutral05 font-bold">เพิ่มข้อมูล</h1>
        <Box className="mt-8">
          <FormLabel>คำถาม</FormLabel>
          <TextField
            className="w-full mt-1"
            variant="outlined"
            size="small"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Box>

        {/* Answer Input */}
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
          />
        </Box>

        {/* Buttons */}
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
              setQuestion("");
              setAnswer("");
              router.push("/admin/faq");
            }}
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
            onClick={handleSubmit}
          >
            เพิ่ม
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFag;
