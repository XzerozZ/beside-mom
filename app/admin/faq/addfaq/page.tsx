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
import Sidebar from "../../components/SideBarAdmin";

const AddFag: React.FC = () => {
  const router = useRouter();
  // State for individual question and answer inputs
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
  const handleDeleteQA = (index: number) => {
    setQaList(qaList.filter((_, i) => i !== index));
  };

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
                router.push("/admin/nurse-contact");
                break;
              case "6":
                router.push("/admin/babyinfo");
                break;
              case "7":
                router.push("/admin/appointment");
                break;
            }
          }
        }}
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
