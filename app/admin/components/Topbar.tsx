"use client";
import React from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface TopBarSectionProps {
  title: string;
  searchTerm: string;
  filterBy: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onAddClick: () => void;
}

const TopBarSection: React.FC<TopBarSectionProps> = ({
  title,
  searchTerm,
  filterBy,
  onSearchChange,
  onFilterChange,
  onAddClick,
}) => {
  const router = useRouter();
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
        {title === "ข้อมูลเรื่องเล่าจากคุณแม่ทั้งหมด" ||
          title === "ข้อมูลการดูแลทารก" ||
          title === "ข้อมูลคำถามที่พบบ่อย" ||
          (title === "การตรวจตามนัด" && (
            <Select
              value={filterBy}
              onChange={(e) => onFilterChange(e.target.value)}
              size="small"
              IconComponent={() => (
                <svg
                  width="26"
                  height="22"
                  viewBox="5 0 26 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_630_2695)">
                    <path
                      d="M13 8.94629L17 13.0533L21 8.94629M13 4.94629L9 0.946289M9 0.946289L5 4.94329M9 0.946289V12.9463M17 0.946289V12.9463"
                      stroke="#B36868"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      shapeRendering="crispEdges"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_630_2695"
                      x="0.5"
                      y="0.446289"
                      width="25"
                      height="25"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_630_2695"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_630_2695"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              )}
              sx={{
                minWidth: 200,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B36868",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B36868",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B36868",
                },
              }}
              className="text-primary5"
            >
              <MenuItem value="all" className="text-primary5">
                จัดเรียงตาม
              </MenuItem>
            </Select>
          ))}

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
      </Box>
    </div>
  );
};
export default TopBarSection;
