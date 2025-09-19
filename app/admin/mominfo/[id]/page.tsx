"use client";
import { API_URL } from "@/config/config";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import StyledAlert from "@/app/admin/components/StyledAlert";
import { useAlert } from "@/app/admin/hooks/useAlert";
import { MomInfo, BabyInfoUpdate } from "@/app/admin/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  MomApiResponse,
  KidApiData,
  GrowthApiData,
  KidApiWithDateData,
} from "@/app/admin/types";

export default function MomInfoId() {
  const params = useParams();
  const router = useRouter();
  const { alert: alertState, showError, hideAlert } = useAlert();
  const [momInfo, setMomInfo] = useState<MomInfo>({
    id: "",
    u_pid: "",
    img: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [babyInfo, setBabyInfo] = useState<BabyInfoUpdate[]>([]);
  const [babyalluid, setBabyalluid] = useState<string[]>([]);
  const [selectedBabyId, setSelectedBabyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/user/info/${params.id}`, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch mom info");
        const data = await res.json();
        const mom: MomApiResponse = data.result;
        setMomInfo({
          id: mom.u_id,
          u_pid: mom.u_pid,
          img: mom.image_link,
          firstName: mom.fname,
          lastName: mom.lname,
          email: mom.email,
        });
        setBabyalluid(mom.kids?.map((kid: KidApiData) => kid.u_id) || []);
        setSelectedBabyId(mom.kids?.[0]?.u_id || null);
      } catch (error) {
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูลคุณแม่");
        console.error("Error fetching mom info:", error);
      }
    };

    fetchData();
  }, [params.id, showError]);

  useEffect(() => {
    const fetchBabyData = async () => {
      if (babyalluid.length === 0) return;

      try {
        // Fetch all babies if there are multiple
        const fetchPromises = babyalluid.map(async (babyId) => {
          const res = await fetch(`${API_URL}/kid/${babyId}`, {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          });
          if (!res.ok)
            throw new Error(`Failed to fetch baby info for ${babyId}`);
          const data = await res.json();
          return data.result;
        });

        const allBabyResults = await Promise.all(fetchPromises);
        console.log("All Baby Data:", allBabyResults);

        const babydata = allBabyResults.map((kid: KidApiWithDateData) => ({
          id: kid.id,
          img: kid.imagelink,
          firstName: kid.firstname,
          lastName: kid.lastname,
          nickname: kid.username,
          gender:
            kid.sex === "ชาย"
              ? "male"
              : kid.sex === "หญิง"
              ? "female"
              : kid.sex,
          birthDate: kid.birthdate?.slice(0, 10) || "",
          bloodType: kid.blood,
          rh_type: kid.rh,
          birthWeight: kid.birthweight?.toString() || "",
          birthHeight: kid.birthlength?.toString() || "",
          note: kid.note,
          growthData: (kid.growth || []).map((g: GrowthApiData) => ({
            id: g.G_id,
            date: g.created_at.slice(0, 10),
            months: g.months,
            weight: g.weight,
            length: g.length,
          })),
          beforebirth: kid.beforebirth || 0,
          adjusted_days: kid.adjusted_days || 0,
          adjusted_months: kid.adjusted_months || 0,
          adjusted_years: kid.adjusted_years || 0,
          real_days: kid.real_days || 0,
          real_months: kid.real_months || 0,
          real_years: kid.real_years || 0,
        }));

        setBabyInfo(babydata);

        // Set the first baby as selected if no baby is currently selected
        if (selectedBabyId === null && babydata.length > 0) {
          setSelectedBabyId(babydata[0].id);
        }
      } catch (error) {
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูลทารก");
        console.error("Error fetching baby info:", error);
      }
    };

    fetchBabyData();
  }, [babyalluid, selectedBabyId, showError]);

  const handleBabySelect = (id: string) => {
    setSelectedBabyId(id);
  };

  // Get selected baby's growth data for chart
  const selectedBaby = babyInfo.find((b) => b.id === selectedBabyId);
  const growthData = selectedBaby?.growthData || [];
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar selectedItem="1" />
      <div className="flex-1 p-6">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box component="form" sx={{ mt: 3 }}>
            <Typography
              gutterBottom
              className="font-bold text-2x mb-8 text-neutral05"
            >
              ข้อมูลคุณแม่
            </Typography>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative w-44 h-44">
                <Image
                  src={
                    momInfo.img ||
                    "https://th.bing.com/th/id/R.774b6856b01ad224faa4a8a6857a279b?rik=NCB%2fGwQX5PyfKQ&riu=http%3a%2f%2fcdn.images.express.co.uk%2fimg%2fdynamic%2f11%2f590x%2fsecondary%2fmother-377773.jpg&ehk=owgczsi5xhC8LXhNjdGeGvXe6EAm%2bmwgXiLQ0WxjcJM%3d&risl=&pid=ImgRaw&r=0"
                  }
                  width={176}
                  height={176}
                  alt="Profile"
                  className="w-44 h-44 rounded-full overflow-hidden object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <FormLabel>ID</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="id"
                  value={momInfo?.u_pid || momInfo.id}
                  disabled
                />

                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="firstName"
                  value={momInfo.firstName || ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <FormLabel>อีเมล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="email"
                  value={momInfo.email}
                  disabled
                />

                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="lastName"
                  value={momInfo.lastName}
                  disabled
                />
              </div>
            </div>
          </Box>
          <div className=" mt-8">
            <div className="bg-neutral04 h-[1px] w-full"></div>
          </div>
          <Box component="form" sx={{ mt: 3 }}>
            <div className="flex gap-4 justify-between mb-5">
              <Typography className="font-bold text-2x text-neutral05">
                ข้อมูลทารก
              </Typography>
              {babyalluid.length > 1 && (
                <div className="flex gap-4">
                  {babyalluid.map((babyId, index) => (
                    <button
                      key={babyId}
                      type="button"
                      className={`border border-primary5 text-primary5 rounded-lg px-4 py-2 mb-2 ${
                        selectedBabyId === babyId
                          ? "bg-primary5 text-white"
                          : ""
                      }`}
                      onClick={() => handleBabySelect(babyId)}
                    >
                      ทารกคนที่ {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedBabyId &&
              babyInfo
                .filter((baby) => baby.id === selectedBabyId)
                .map((baby) => (
                  <div className="w-full grid grid-cols-1 gap-6" key={baby.id}>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="relative w-44 h-44">
                        <Image
                          src={
                            baby.img ||
                            "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg"
                          }
                          width={176}
                          height={176}
                          alt="Baby Profile"
                          className="w-44 h-44 rounded-full overflow-hidden object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-2  col-span-2">
                        <div className="flex flex-row gap-4 col-span-2 ">
                          <div className="flex flex-col w-1/2">
                            <FormLabel>ชื่อ</FormLabel>
                            <TextField
                              fullWidth
                              size="small"
                              name="firstName"
                              value={baby.firstName ?? ""}
                              disabled
                            />
                          </div>
                          <div className="flex flex-col w-1/2">
                            <FormLabel>นามสกุล</FormLabel>
                            <TextField
                              fullWidth
                              size="small"
                              name="lastName"
                              value={baby.lastName ?? ""}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                          <FormLabel>ชื่อเล่น</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="nickname"
                            value={baby.nickname ?? ""}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <Box>
                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>วันเกิดจริง</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="realBirthDate"
                            value={
                              `${baby.real_years} ปี ${baby.real_months} เดือน ${baby.real_days} วัน` ||
                              ""
                            }
                            type="text"
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>วันเกิดปรับ</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="actualBirthDate"
                            value={
                              `${baby.adjusted_years} ปี ${baby.adjusted_months} เดือน ${baby.adjusted_days} วัน` ||
                              ""
                            }
                            type="text"
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-1">
                        <FormLabel>เพศ</FormLabel>
                      </div>
                      <div className="col-span-2">
                        <RadioGroup name="gender" value={baby.gender}>
                          <FormControlLabel
                            value="male"
                            control={
                              <Radio
                                disabled
                                sx={{
                                  color: "#999999",
                                  "&.Mui-checked": { color: "#B36868" },
                                }}
                              />
                            }
                            className="text-neutral04"
                            label="ชาย"
                          />
                          <FormControlLabel
                            value="female"
                            control={
                              <Radio
                                disabled
                                sx={{
                                  color: "#999999",
                                  "&.Mui-checked": { color: "#B36868" },
                                }}
                              />
                            }
                            className="text-neutral04"
                            label="หญิง"
                          />
                        </RadioGroup>
                      </div>
                      <div className="col-span-9 flex gap-4">
                        <div className="w-full">
                          <FormLabel>กรุ๊ปเลือด</FormLabel>
                          <Select
                            fullWidth
                            size="small"
                            name="bloodType"
                            value={baby.bloodType}
                            disabled
                          >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="AB">AB</MenuItem>
                            <MenuItem value="O">O</MenuItem>
                          </Select>
                        </div>
                        <div className="w-full">
                          <FormLabel>Rh</FormLabel>
                          <Select
                            fullWidth
                            size="small"
                            name="rh_type"
                            value={baby.rh_type}
                            disabled
                          >
                            <MenuItem value="Positive">Positive</MenuItem>
                            <MenuItem value="Negative">Negative</MenuItem>
                            <MenuItem value="">-</MenuItem>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormLabel>น้ำหนักแรกเกิด (กรัม)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="birthWeight"
                          value={baby.birthWeight}
                          disabled
                        />
                      </div>
                      <div>
                        <FormLabel>ความยาวแรกเกิด (ซม.)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="birthHeight"
                          value={baby.birthHeight}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <FormLabel>โน้ต</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="note"
                        value={baby.note}
                        disabled
                        multiline
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-center w-full mt-4">
                      <Button
                        variant="contained"
                        onClick={() =>
                          router.push(
                            `/admin/mominfo/${momInfo.id}/evaluate/${baby.id}`
                          )
                        }
                        sx={{
                          backgroundColor: "#B36868",
                          "&:hover": { backgroundColor: "#a05555" },
                        }}
                      >
                        แบบประเมินพัฒนาการ
                      </Button>
                    </div>
                  </div>
                ))}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="mb-4 text-black text-center"
                >
                  กราฟการเจริญเติบโตด้านน้ำหนัก
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: 250,
                    backgroundColor: "#f0f0f0",
                    p: 2,
                  }}
                >
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        label={{
                          value: "เดือน",
                          position: "insideBottomRight",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "กรัม",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        name="น้ำหนัก (กรัม)"
                        stroke="#B36868"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="mb-4 text-black text-center"
                >
                  กราฟการเจริญเติบโตด้านส่วนสูง
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: 250,
                    backgroundColor: "#f0f0f0",
                    p: 2,
                  }}
                >
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        label={{
                          value: "เดือน",
                          position: "insideBottomRight",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "ซม.",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="length"
                        name="ส่วนสูง (ซม.)"
                        stroke="#68A3B3"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <div className="flex justify-between mb-5">
              <Typography className="text-black">ข้อมูล</Typography>
            </div>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {babyInfo
                .filter((baby) => baby.id === selectedBabyId)
                .map((baby) =>
                  baby.growthData.map((data, index) => (
                    <Grid container spacing={3} key={index} className="mb-4">
                      <Grid item xs={12} sm={4}>
                        <FormLabel>วันที่</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="date"
                          type="date"
                          value={data.date}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormLabel>น้ำหนัก (กรัม)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="weight"
                          value={data.weight}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormLabel>ความยาว (ซม.)</FormLabel>
                        <TextField
                          fullWidth
                          size="small"
                          name="length"
                          value={data.length}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  ))
                )}
            </Grid>
          </Box>
        </Container>
      </div>
      <StyledAlert
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
        onClose={hideAlert}
      />
    </div>
  );
}
