"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Grid,
  CardMedia,
} from "@mui/material";
import TopBarSection from "../components/Topbar";
import Sidebar from "../components/SideBarAdmin";

const MomstoryPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const handleAddClick = () => {
    console.log("Add button clicked");
  };
  const handleEdit = (id: number, type: string) => {
    console.log("Edit button clicked", id);
    router.push(`/admin/babycare/edit/${id}/${type}`);
  };
  const [data, setData] = useState([
    {
      id: 1,
      type: "video",
      url: "https://youtu.be/uefcQzHmA_Y?si=jWn5kCXoZcl5FQXP",
      title: "ชื่อหัวข้อการดูแลทารก",
      date: "12 มิถุนายน 2566",
      thumbnail:
        "https://th.bing.com/th/id/OIP.3WQYua7b8QwCrjyuBKy-kAHaEK?w=309&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    },
    {
      id: 2,
      type: "video",
      url: "https://youtu.be/uefcQzHmA_Y?si=jWn5kCXoZcl5FQXP",
      title: "ชื่อหัวข้อการดูแลทารก",
      date: "12 มิถุนายน 2566",
      thumbnail:
        "https://th.bing.com/th/id/OIP.3WQYua7b8QwCrjyuBKy-kAHaEK?w=309&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    },
    {
      id: 3,
      type: "picture",
      url: "https://youtu.be/uefcQzHmA_Y?si=jWn5kCXoZcl5FQXP",
      title: "ชื่อหัวข้อการดูแลทารก",
      date: "12 มิถุนายน 2566",
      thumbnail:
        "https://th.bing.com/th/id/OIP.3WQYua7b8QwCrjyuBKy-kAHaEK?w=309&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    },
    {
      id: 4,
      type: "picture",
      url: "https://youtu.be/uefcQzHmA_Y?si=jWn5kCXoZcl5FQXP",
      title: "ชื่อหัวข้อการดูแลทารก",
      date: "12 มิถุนายน 2566",
      thumbnail:
        "https://th.bing.com/th/id/OIP.3WQYua7b8QwCrjyuBKy-kAHaEK?w=309&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    },
    {
      id: 5,
      type: "video",
      url: "https://youtu.be/uefcQzHmA_Y?si=jWn5kCXoZcl5FQXP",
      title: "ชื่อหัวข้อการดูแลทารก",
      date: "12 มิถุนายน 2566",
      thumbnail:
        "https://th.bing.com/th/id/OIP.3WQYua7b8QwCrjyuBKy-kAHaEK?w=309&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    },
  ]);
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-white">
      <Sidebar
        onItemSelect={(id) => {
          if (id !== "3") {
            // Navigate to other pages based on sidebar selection
            switch (id) {
              case "1":
                router.push("/admin/mominfo");
                break;
              case "2":
                router.push("/admin/momstories");
                break;
              case "4":
                router.push("/admin/faq");
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
        selectedItem="3"
      />
      <div className="flex-1 p-6">
        <Container>
          <TopBarSection
            title="ข้อมูลการดูแลทารก"
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            onAddClick={handleAddClick}
          />
          <Grid container spacing={3}>
            {filteredData.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.thumbnail}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-base"
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.date}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
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
                        onClick={() => handleEdit(item.id, item.type)}
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
                        // onClick={() => handleDelete(data.id)}
                      >
                        ลบ
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default MomstoryPage;
