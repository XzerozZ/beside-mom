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
} from "@mui/material";
import Sidebar from "../components/SideBarAdmin";

const ContactNurseInfo: React.FC = () => {
  const router = useRouter();
  const [editNumber, seteditNumber] = useState({
    field: "",
  });

  return (
    <div className="flex bg-gray-100">
      <Sidebar
        onItemSelect={(id) => {
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
            case "4":
              router.push("/admin/faq");
              break;
            // Add other cases as needed
          }
        }}
        selectedItem="5"
      />
      <div className="flex-1 p-6">
        <h1 className="text-neutral05 font-bold">ข้อมูลติดต่อกับพยาบาล</h1>
        <h2 className="text-neutral05 mt-8">เบอร์โทรศัพท์</h2>
        <TextField
          className="w-full mt-1"
          variant="outlined"
          size="small"
          value={editNumber.field}
          onChange={(e) => seteditNumber({ field: e.target.value })}
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#999999",
              },
              "&:hover fieldset": {
                borderColor: "#999999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#999999",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#999999",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#999999",
              opacity: 1,
            },
          }}
        />
        <div className="flex justify-end mt-4 ">
          <Button
            variant="outlined"
            sx={{
              color: "#B36868",
              borderColor: "#FF9494",
              "&:hover": { borderColor: "#B36868" },
            }}
            size="small"
            className="mr-2 w-40"
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
          >
            บันทึกข้อมูล
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactNurseInfo;
