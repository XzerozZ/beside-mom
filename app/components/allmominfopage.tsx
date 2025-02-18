"use client";

import React, { useState } from "react";
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
import TopBarSection from "./Topbar";

interface MomData {
  id: string;
  email: string;
  name: string;
}

const AllMomInfoPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const [momData, setMomData] = useState<MomData[]>([
    {
      id: "1",
      email: "mom1@email.com",
      name: "คุณแม่ใจดี",
    },
    {
      id: "2",
      email: "mom2@email.com",
      name: "คุณแม่สวยใส",
    },
  ]);

  const handleDelete = (id: string) => {
    setMomData(momData.filter((mom) => mom.id !== id));
  };

  const handleAddClick = () => {
    console.log("Add new mom");
  };

  return (
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{}}>
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold">อีเมล</TableCell>
              <TableCell className="font-bold">ชื่อ นามสกุล</TableCell>
              <TableCell className="font-bold text-center">
                การดำเนินการ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {momData.map((mom) => (
              <TableRow key={mom.id}>
                <TableCell>{mom.id}</TableCell>
                <TableCell>{mom.email}</TableCell>
                <TableCell>{mom.name}</TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", gap: 1 }}
                    className="items-center justify-center"
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => console.log("Edit", mom.id)}
                    >
                      นัดหมาย
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => console.log("Edit", mom.id)}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
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
  );
};

export default AllMomInfoPage;
