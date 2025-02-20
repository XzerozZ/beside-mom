"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import TopBarSection from "../components/Topbar";
import Sidebar from "../components/SideBarAdmin";

interface MomData {
  id: string;
  email: string;
  name: string;
}

const AllMomInfoPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const handleEdit = (id: string) => {
    router.push(`/admin/edit/momInfo/${id}`);
  };

  const [momData, setMomData] = useState<MomData[]>([
    {
      id: "1",
      email: "mom1@email.com",
      name: "mom 1",
    },
    {
      id: "2",
      email: "mom2@email.com",
      name: "mom 2",
    },
  ]);

  const handleDelete = (id: string) => {
    setMomData(momData.filter((mom) => mom.id !== id));
  };

  const handleAddClick = () => {
    console.log("Add new mom");
  };
  type SortDirection = "asc" | "desc" | null;

  interface SortState {
    field: "id" | "email" | "name";
    direction: SortDirection;
  }

  const [sortState, setSortState] = useState<SortState>({
    field: "id",
    direction: null,
  });

  const handleSort = (field: SortState["field"]) => {
    setSortState((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Sort data function
  const getSortedData = () => {
    if (!sortState.direction) return momData;

    return [...momData].sort((a, b) => {
      const compareValue = sortState.direction === "asc" ? 1 : -1;
      return a[sortState.field] > b[sortState.field]
        ? compareValue
        : -compareValue;
    });
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar
        onItemSelect={(id) => {
          if (id !== "1") {
            // Navigate to other pages based on sidebar selection
            switch (id) {
              case "2":
                router.push("admin/momstories");
                break;
              case "3":
                router.push("/admin/babycare");
                break;
              case "4":
                router.push("/admin/faq");
                break;
              case "5":
                router.push("/admin/nurse-contact");
                break;
              // Add other cases as needed
            }
          }
        }}
        selectedItem="1" // Keep this fixed since we're in the mom info section
      />
      <div className="flex-1 p-6">
        <Container>
          <TopBarSection
            title="ข้อมูลคุณแม่ทั้งหมด"
            searchTerm={searchTerm}
            filterBy={filterBy}
            onSearchChange={(value) => setSearchTerm(value)}
            onFilterChange={(value) => setFilterBy(value)}
            onAddClick={handleAddClick}
          />

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{}}>
                  <TableCell
                    className="font-bold text-center cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      ID
                      <span className="w-4 h-4 inline-flex">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.83301 12.4998L10.1663 15.8332L13.4997 12.4998M13.4997 7.49984L10.1663 4.1665L6.83301 7.49984"
                            stroke="#4D4D4D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="font-bold text-center cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      อีเมล
                      <span className="w-4 h-4 inline-flex">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.83301 12.4998L10.1663 15.8332L13.4997 12.4998M13.4997 7.49984L10.1663 4.1665L6.83301 7.49984"
                            stroke="#4D4D4D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="font-bold text-center cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      ชื่อ นามสกุล
                      <span className="w-4 h-4 inline-flex">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.83301 12.4998L10.1663 15.8332L13.4997 12.4998M13.4997 7.49984L10.1663 4.1665L6.83301 7.49984"
                            stroke="#4D4D4D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-center">
                    การดำเนินการ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getSortedData().map((mom) => (
                  <TableRow key={mom.id}>
                    <TableCell className="text-center">{mom.id}</TableCell>
                    <TableCell className="text-center">{mom.email}</TableCell>
                    <TableCell className="text-center">{mom.name}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", gap: 1 }}
                        className="items-center justify-center"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            color: "#B36868",
                            borderColor: "#B36868",
                            "&:hover": { borderColor: "#B36868" },
                          }}
                          startIcon={
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1157_4847)">
                                <g filter="url(#filter0_d_1157_4847)">
                                  <path
                                    d="M5.83333 11.6665V9.99984H14.1667V11.6665H5.83333ZM5.83333 14.9998V13.3332H11.6667V14.9998H5.83333ZM4.16667 18.3332C3.70833 18.3332 3.31611 18.1701 2.99 17.844C2.66389 17.5179 2.50056 17.1254 2.5 16.6665V4.99984C2.5 4.5415 2.66333 4.14928 2.99 3.82317C3.31667 3.49706 3.70889 3.33373 4.16667 3.33317H5V1.6665H6.66667V3.33317H13.3333V1.6665H15V3.33317H15.8333C16.2917 3.33317 16.6842 3.4965 17.0108 3.82317C17.3375 4.14984 17.5006 4.54206 17.5 4.99984V16.6665C17.5 17.1248 17.3369 17.5173 17.0108 17.844C16.6847 18.1707 16.2922 18.3337 15.8333 18.3332H4.16667ZM4.16667 16.6665H15.8333V8.33317H4.16667V16.6665Z"
                                    fill="#B36868"
                                  />
                                </g>
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_1157_4847"
                                  x="-1.5"
                                  y="1.6665"
                                  width="23"
                                  height="24.6665"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
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
                                    result="effect1_dropShadow_1157_4847"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_1157_4847"
                                    result="shape"
                                  />
                                </filter>
                                <clipPath id="clip0_1157_4847">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          }
                          // onClick={() =>
                        >
                          นัดหมาย
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: "#999999", borderColor: "#999999" }}
                          className="text-neutral05"
                          startIcon={
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.723 6.0692L14.8599 6.93226L13.0672 5.13949L13.9309 4.27637L13.9309 4.27631C13.9934 4.21382 14.0782 4.17871 14.1666 4.17871C14.2549 4.17871 14.3396 4.21375 14.4021 4.27614C14.4021 4.27616 14.4021 4.27617 14.4022 4.27619C14.4022 4.27623 14.4022 4.27627 14.4023 4.27631L15.7229 5.59781L15.723 5.59787C15.7855 5.66038 15.8206 5.74515 15.8206 5.83353C15.8206 5.92189 15.7855 6.00664 15.723 6.06915C15.723 6.06916 15.723 6.06918 15.723 6.0692ZM3.8291 16.1669V14.3748L11.3282 6.8789L13.1212 8.67187L5.62616 16.1669H3.8291ZM3.80475 14.3992L3.80508 14.3988C3.80497 14.3989 3.80486 14.399 3.80475 14.3992Z"
                                stroke="#4D4D4D"
                              />
                            </svg>
                          }
                          onClick={() => handleEdit(mom.id)}
                        >
                          แก้ไข
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: "#999999", borderColor: "#999999" }}
                          className="text-neutral05"
                          startIcon={
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.9165 3.83333H15.3332V4.5H4.6665V3.83333H7.08317H7.29028L7.43672 3.68689L8.12361 3H11.8761L12.563 3.68689L12.7094 3.83333H12.9165ZM6.6665 17C6.02598 17 5.49984 16.4739 5.49984 15.8333V6.33333H14.4998V15.8333C14.4998 16.4739 13.9737 17 13.3332 17H6.6665Z"
                                stroke="#4D4D4D"
                              />
                            </svg>
                          }
                          onClick={() => handleDelete(mom.id)}
                        >
                          ลบ
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </div>
  );
};

export default AllMomInfoPage;
