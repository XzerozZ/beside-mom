"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import Sidebar from "../../../components/SideBarAdmin";

const AddFag: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? parseInt(params.id) - 1 : 0;
  const mockData = [
    {
      id: 1,
      question: "ทำไมลูกน้อยไม่ถ่ายอุจจาระ",
      answer:
        "สาเหตุของอาการท้องผูกในเด็ก 90% เกิดจากปัญหาพฤติกรรมของเด็ก เด็กมักมีพฤติกรรมการอั้นอุจจาระ ซึ่งเกิดจากการมีประสบการณ์ที่ไม่ดีกับการขับถ่าย อาจมีอาการเจ็บขณะขับถ่าย ซึ่งมักเกิดตามหลังจากการเจ็บป่วย หรือการดูแลเด็กที่มีการเปลี่ยนแปลงบางอย่าง เช่น การเปลี่ยนนมไปเป็นอาหารเสริม การเปลี่ยนพฤติกรรมจากเดิมที่เคยอยู่บ้าน เข้าสู่โรงเรียน อาจส่งผลให้เด็กมีพฤติกรรมการอั้นอุจจาระได้",
    },
  ];

  // State for individual question and answer inputs
  const [question, setQuestion] = useState(mockData[id]?.question ?? "");
  const [answer, setAnswer] = useState(mockData[id]?.answer ?? "");

  // State for storing multiple Q&A entries
  const [qaList, setQaList] = useState<{ question: string; answer: string }[]>(
    []
  );

  // Function to add Q&A to the list
  const handleAddQA = () => {
    if (question.trim() !== "" && answer.trim() !== "") {
      setQaList([...qaList, { question, answer }]);
      setQuestion("");
      setAnswer("");
    }
  };

  // Function to remove a Q&A entry

  return (
    <div className="flex bg-white ">
      <Sidebar
        onItemSelect={(id) => {
          if (id !== "4") {
            // Navigate to other pages based on sidebar selection
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
            onClick={handleAddQA}
          >
            เพิ่ม
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFag;
