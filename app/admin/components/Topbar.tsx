"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";

interface TopBarSectionProps {
  title: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

const TopBarSection: React.FC<TopBarSectionProps> = ({
  title,
  searchTerm,
  onSearchChange,
  onAddClick,
}) => {
  const [showBox, setShowBox] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const handleAddClick = () => {
    if (title === "ข้อมูลคุณแม่ทั้งหมด") {
      router.push("/admin/mominfo/addmom");
    }
    if (title === "ข้อมูลคำถามที่พบบ่อย") {
      router.push("/admin/faq/addfaq");
    }
    if (title === "ข้อมูลเรื่องเล่าจากคุณแม่ทั้งหมด") {
      router.push("/admin/momstories/addmomstories");
    }
    if (title === "ข้อมูลการดูแลทารก") {
      setShowBox(!showBox);
    }
    if (title === "การตรวจตามนัด") {
      router.push(`/admin/appointment/${id}/add`);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="text-neutral05 font-bold ">{title}</div>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ค้นหา"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
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
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#B36868",
              },
              "&:hover fieldset": {
                borderColor: "#B36868",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#B36868",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#B36868",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#B36868",
              opacity: 1,
            },
          }}
        />

        <div>
          {title != "ข้อมูลการตรวจตามนัด" && (
            <Button
              variant="contained"
              onClick={handleAddClick}
              sx={{
                backgroundColor: "#B36868",
                "&:hover": { backgroundColor: "#965757" },
              }}
            >
              {title === "ข้อมูลเรื่องเล่าจากคุณแม่ทั้งหมด"
                ? "+ เพิ่มเรื่องเล่าจากคุณแม่"
                : title === "ข้อมูลการดูแลทารก"
                ? "+ เพิ่มข้อมูลการดูแลทารก"
                : title === "ข้อมูลคำถามที่พบบ่อย"
                ? "+ เพิ่มข้อมูลคำถามที่พบบ่อย"
                : title === "ข้อมูลคุณแม่ทั้งหมด"
                ? "+ เพิ่มข้อมูลคุณแม่"
                : title === "การตรวจตามนัด"
                ? "+ เพิ่มข้อมูล"
                : ""}
            </Button>
          )}
          {showBox && title === "ข้อมูลการดูแลทารก" && (
            <Box
              sx={{
                position: "absolute",
                marginTop: 2,
                width: 183,
                padding: 2,
                borderRadius: 2,
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                boxShadow: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
                className="text-neutral05 text-xl"
              >
                เพิ่มข้อมูล
              </Typography>
              <Box
                onClick={() => {
                  router.push("/admin/babycare/addbabycareinfo/picture");
                }}
                sx={{
                  marginTop: 1,
                  padding: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#FFC1C1",
                  },
                }}
              >
                <Typography className="text-black">ประเภทภาพ</Typography>
              </Box>
              <Box
                onClick={() =>
                  router.push("/admin/babycare/addbabycareinfo/video")
                }
                sx={{
                  marginTop: 1,
                  padding: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#FFC1C1",
                  },
                }}
              >
                <Typography className="text-black">ประเภทวิดีโอ</Typography>
              </Box>
            </Box>
          )}
        </div>
      </Box>
    </div>
  );
};
export default TopBarSection;
