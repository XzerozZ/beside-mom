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
  Card,
  CardContent,
} from "@mui/material";
import TopBarSection from "../components/Topbar";
import Sidebar from "../components/SideBarAdmin";

export default function Faq() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const handleAddClick = () => {
    console.log("Add faq clicked");
  };

  const handleEdit = (id: number) => {
    console.log("Edit faq clicked", id);
    router.push(`/admin/faq/edit/${id}`);
  };
  const handleDelete = (id: number) => {
    console.log("Delete faq clicked", id);
  };
  const mockData = [
    {
      id: 1,
      question: "ทำไมลูกน้อยไม่ถ่ายอุจจาระ",
      answer:
        "สาเหตุของอาการท้องผูกในเด็ก 90% เกิดจากปัญหาพฤติกรรมของเด็ก เด็กมักมีพฤติกรรมการอั้นอุจจาระ ซึ่งเกิดจากการมีประสบการณ์ที่ไม่ดีกับการขับถ่าย อาจมีอาการเจ็บขณะขับถ่าย ซึ่งมักเกิดตามหลังจากการเจ็บป่วย หรือการดูแลเด็กที่มีการเปลี่ยนแปลงบางอย่าง เช่น การเปลี่ยนนมไปเป็นอาหารเสริม การเปลี่ยนพฤติกรรมจากเดิมที่เคยอยู่บ้าน เข้าสู่โรงเรียน อาจส่งผลให้เด็กมีพฤติกรรมการอั้นอุจจาระได้",
    },
    {
      id: 2,
      question: "ทำไมลูกน้อยไม่ถ่ายอุจจาระ",
      answer:
        "สาเหตุของอาการท้องผูกในเด็ก 90% เกิดจากปัญหาพฤติกรรมของเด็ก เด็กมักมีพฤติกรรมการอั้นอุจจาระ ซึ่งเกิดจากการมีประสบการณ์ที่ไม่ดีกับการขับถ่าย อาจมีอาการเจ็บขณะขับถ่าย ซึ่งมักเกิดตามหลังจากการเจ็บป่วย หรือการดูแลเด็กที่มีการเปลี่ยนแปลงบางอย่าง เช่น การเปลี่ยนนมไปเป็นอาหารเสริม การเปลี่ยนพฤติกรรมจากเดิมที่เคยอยู่บ้าน เข้าสู่โรงเรียน อาจส่งผลให้เด็กมีพฤติกรรมการอั้นอุจจาระได้",
    },
    {
      id: 3,
      question: "ทำไมลูกน้อยไม่ถ่ายอุจจาระ",
      answer:
        "สาเหตุของอาการท้องผูกในเด็ก 90% เกิดจากปัญหาพฤติกรรมของเด็ก เด็กมักมีพฤติกรรมการอั้นอุจจาระ ซึ่งเกิดจากการมีประสบการณ์ที่ไม่ดีกับการขับถ่าย อาจมีอาการเจ็บขณะขับถ่าย ซึ่งมักเกิดตามหลังจากการเจ็บป่วย หรือการดูแลเด็กที่มีการเปลี่ยนแปลงบางอย่าง เช่น การเปลี่ยนนมไปเป็นอาหารเสริม การเปลี่ยนพฤติกรรมจากเดิมที่เคยอยู่บ้าน เข้าสู่โรงเรียน อาจส่งผลให้เด็กมีพฤติกรรมการอั้นอุจจาระได้",
    },
    {
      id: 4,
      question: "ทำไมลูกน้อยไม่ถ่ายอุจจาระ",
      answer:
        "สาเหตุของอาการท้องผูกในเด็ก 90% เกิดจากปัญหาพฤติกรรมของเด็ก เด็กมักมีพฤติกรรมการอั้นอุจจาระ ซึ่งเกิดจากการมีประสบการณ์ที่ไม่ดีกับการขับถ่าย อาจมีอาการเจ็บขณะขับถ่าย ซึ่งมักเกิดตามหลังจากการเจ็บป่วย หรือการดูแลเด็กที่มีการเปลี่ยนแปลงบางอย่าง เช่น การเปลี่ยนนมไปเป็นอาหารเสริม การเปลี่ยนพฤติกรรมจากเดิมที่เคยอยู่บ้าน เข้าสู่โรงเรียน อาจส่งผลให้เด็กมีพฤติกรรมการอั้นอุจจาระได้",
    },
  ];

  const filteredFaqs = mockData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-white">
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
        selectedItem="4" // Keep this fixed since we're in the mom info section
      />
      <div className="flex-1 p-6">
        <Container>
          <TopBarSection
            title="ข้อมูลคำถามที่พบบ่อย"
            searchTerm={searchTerm}
            filterBy={filterBy}
            onSearchChange={(value) => setSearchTerm(value)}
            onFilterChange={(value) => setFilterBy(value)}
            onAddClick={handleAddClick}
          />
          <div>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((data) => (
                <Card key={data.id} sx={{ mb: 2, p: 2 }}>
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        Q: {data.question}
                      </Typography>
                      <div>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: "#999999", borderColor: "#999999" }}
                          className="text-neutral05 mr-5 w-24"
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
                          onClick={() => handleEdit(data.id)}
                        >
                          แก้ไข
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: "#999999", borderColor: "#999999" }}
                          className="text-neutral05 w-24"
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
                          onClick={() => handleDelete(data.id)}
                        >
                          ลบ
                        </Button>
                      </div>
                    </div>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      A: {data.answer}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 10,
                      }}
                    ></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ mt: 2 }}
                className="text-neutral05"
              >
                ไม่พบผลลัพธ์ที่ตรงกับการค้นหา
              </Typography>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
