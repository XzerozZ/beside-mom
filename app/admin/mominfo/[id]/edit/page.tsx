"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
  SelectChangeEvent,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Sidebar from "@/app/admin/components/SideBarAdmin";
import StyledAlert from "@/app/admin/components/StyledAlert";
import { useAlert } from "@/app/admin/hooks/useAlert";
import {
  MomInfo,
  BabyInfo,
  GrowthData,
  KidApiData,
  GrowthApiData,
  KidApiWithDateData,
  MomApiDataEdit,
} from "@/app/admin/types";

export default function EditMomInfo() {
  const params = useParams();
  const router = useRouter();
  const { alert: alertState, showSuccess, showError, hideAlert } = useAlert();

  // Add refs for file inputs
  const momImageInputRef = useRef<HTMLInputElement>(null);
  const babyImageInputRef = useRef<HTMLInputElement>(null);

  const [momInfo, setMomInfo] = useState<MomInfo>({
    id: "",
    u_pid: "",
    img: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [babyInfo, setBabyInfo] = useState<BabyInfo[]>([]);
  const [babyalluid, setBabyalluid] = useState<string[]>([]);
  const [selectedBabyId, setSelectedBabyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_url}/user/info/${params.id}`;
        const res = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data?.result) {
          const result: MomApiDataEdit = data.result;
          setMomInfo({
            id: result.u_id,
            u_pid: result.u_pid,
            img: result.image_link,
            firstName: result.fname,
            lastName: result.lname,
            email: result.email,
          });
          setBabyalluid(result.kids?.map((kid: KidApiData) => kid.u_id) || []);
          setSelectedBabyId(result.kids?.[0]?.u_id || null);
          // setBabyInfo(
          //   (result.kids || []).map((kid: KidApiDataEdit) => ({
          //     id: kid.u_id,
          //     img: kid.image_link,
          //     firstName: kid.fname,
          //     lastName: kid.lname,
          //     nickname: kid.uname,
          //     gender:
          //       kid.sex === "ชาย"
          //         ? "male"
          //         : kid.sex === "หญิง"
          //         ? "female"
          //         : kid.sex,
          //     birthDate: kid.birth_date ? kid.birth_date.split("T")[0] : "",
          //     bloodType: kid.blood_type || "",
          //     rh_type: kid.rh_type || "",
          //     birthWeight: kid.weight?.toString() || "",
          //     birthHeight: kid.length?.toString() || "",
          //     note: kid.note || "",
          //     growthData: (kid.growth || []).map((g: GrowthApiDataEdit) => ({
          //       id: g.G_id,
          //       date: g.created_at.slice(0, 10),
          //       months: g.months,
          //       weight: g.weight,
          //       length: g.length,
          //     })),
          //     beforebirth: 0,
          //   }))
          // );
          // if (result.kids?.[0]?.u_id) setSelectedBabyId(result.kids[0].u_id);
        }
      } catch (e) {
        showError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        console.error(e);
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
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_url}/kid/${babyId}`,
              {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
              }
            );
            if (!res.ok) throw new Error(`Failed to fetch baby info for ${babyId}`);
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

  const handleChangemMom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMomInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeBaby = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setBabyInfo((prev) =>
      prev.map((baby) =>
        baby.id === selectedBabyId ? { ...baby, [name]: value } : baby
      )
    );
  };

  const handleaddgrowthdata = (
    id: string,
    date: string,
    weight: number,
    length: number
  ) => {
    setBabyInfo((prev) =>
      prev.map((baby) =>
        baby.id === id
          ? {
              ...baby,
              growthData: [
                ...baby.growthData,
                { date: date, weight: weight, length: length },
              ],
            }
          : baby
      )
    );
    setfromgrowthdatafield({
      date: "",
      weight: 0,
      length: 0,
    });
  };
  const [fromgrowthdatafield, setfromgrowthdatafield] = useState<GrowthData>({
    date: "",
    weight: 0,
    length: 0,
  });

  const handleaddBabygrowthdatafield = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setfromgrowthdatafield((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image upload handlers
  const handleMomImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMomInfo((prev) => ({
          ...prev,
          img: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBabyImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedBabyId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBabyInfo((prev) =>
          prev.map((baby) =>
            baby.id === selectedBabyId
              ? { ...baby, img: reader.result as string }
              : baby
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMomImageClick = () => {
    momImageInputRef.current?.click();
  };

  const handleBabyImageClick = () => {
    babyImageInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      // ใช้ FormData และ key ตามหน้า add mom
      const formData = new FormData();
      // Mom info
      formData.append("firstname", momInfo.firstName || "");
      formData.append("lastname", momInfo.lastName || "");
      formData.append("email", momInfo.email);
      // Images: [0] mom, [1...] kid
      if (momInfo.img) {
        if (momInfo.img.startsWith("data:image")) {
          const res = await fetch(momInfo.img);
          const blob = await res.blob();
          formData.append("images", blob, "mom.jpg");
        }
      }
      formData.append("pid", momInfo.u_pid || "");
      console.log("FormData entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // PUT ข้อมูลแม่
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_url}/user/${momInfo.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) throw new Error("API error");

      // PUT ข้อมูลลูกแต่ละคน
      for (const baby of babyInfo) {
        const kidFormData = new FormData();
        kidFormData.append("firstname", baby.firstName || "");
        kidFormData.append("lastname", baby.lastName || "");
        kidFormData.append("username", baby.nickname || "");
        kidFormData.append("sex", baby.gender || "");
        const formattedDate = baby.birthDate
          ? baby.birthDate.replace(/\//g, "-")
          : "";
        kidFormData.append("birthdate", formattedDate);
        kidFormData.append("bloodtype", baby.bloodType || "");
        console.log("baby bloodType:", baby.bloodType);
        kidFormData.append("rh", baby.rh_type || "");
        kidFormData.append("birthweight", baby.birthWeight || "");
        kidFormData.append("birthlength", baby.birthHeight || "");
        kidFormData.append("note", baby.note || "");
        if (baby.img && baby.img.startsWith("data:image")) {
          kidFormData.append("images", dataURLtoBlob(baby.img), `baby.jpg`);
        }
        await fetch(`${process.env.NEXT_PUBLIC_url}/kid/${baby.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: kidFormData,
        });
      }

      // เพิ่ม growth data ของแต่ละ baby
      for (const baby of babyInfo) {
        if (baby.growthData && baby.growthData.length > 0) {
          for (const growth of baby.growthData) {
            const growthFormData = new FormData();
            const formattedDate = growth.date
              ? growth.date.replace(/\//g, "-")
              : "";
            growthFormData.append("date", formattedDate);
            growthFormData.append("weight", growth.weight.toString());
            growthFormData.append("length", growth.length.toString());
            await fetch(
              `${process.env.NEXT_PUBLIC_url}/growth/kid/${baby.id}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: growthFormData,
              }
            );
          }
        }
      }

      showSuccess("บันทึกข้อมูลสำเร็จ");
      router.push("/admin/mominfo");
    } catch (err) {
      showError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    }
  };

  // Helper สำหรับแปลง base64 เป็น Blob
  function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(",");
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar selectedItem="1" />
      <div className="flex-1 p-6">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Typography
            gutterBottom
            className="mt-7 font-bold text-2x text-neutral05"
          >
            แก้ไขข้อมูล
          </Typography>
          <Box sx={{ mt: 3 }}>
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
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
                {/* Floating Button */}
                <IconButton
                  className="absolute top-32 left-36 bg-red-100 shadow-md"
                  size="small"
                  onClick={handleMomImageClick}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.82666 23.7039L18.125 13.41L18.5898 13.8748L8.29779 24.1668H7.82666V23.7039ZM23.4915 8.04416C23.4914 8.04427 23.4913 8.04438 23.4912 8.0445L23.4915 8.04416Z"
                      stroke="#B36868"
                      strokeWidth="5"
                    />
                  </svg>
                </IconButton>
              </div>

              <div className="flex flex-col gap-2">
                <FormLabel>ID</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="u_pid"
                  value={momInfo.u_pid || ""}
                  onChange={handleChangemMom}
                
                />
                <FormLabel>อีเมล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="email"
                  value={momInfo.email}
                  // onChange={handleChangemMom}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormLabel>ชื่อ</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="firstName"
                  value={momInfo.firstName || ""}
                  onChange={handleChangemMom}
                />

                <FormLabel>นามสกุล</FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="lastName"
                  value={momInfo.lastName}
                  onChange={handleChangemMom}
                />
              </div>
            </div>
          </Box>
          <div className=" mt-8">
            <div className="bg-neutral04 h-[1px] w-full"></div>
          </div>
          <Box sx={{ mt: 3 }}>
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
              <button
                type="button"
                className=" border border-primary5 text-white rounded-lg px-10 py-2 mb-2 bg-primary5"
                onClick={() =>
                  router.push(`/admin/mominfo/${momInfo.id}/addkid`)
                }
              >
                เพิ่มทารก
              </button>
            </div>
            {selectedBabyId &&
              babyInfo
                .filter((baby) => baby.id === selectedBabyId)
                .map((baby) => (
                  <div key={baby.id}>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="relative w-44 h-44">
                        <Image
                          src={
                            baby.img ||
                            "https://parade.com/.image/t_share/MTkwNTc1OTI2MjAxOTUyMTI0/unique-baby-names-2019-jpg.jpg"
                          }
                          alt="Profile"
                          fill
                          className="rounded-full object-cover"
                        />
                        {/* Floating Button */}
                        <IconButton
                          className="absolute top-32 left-36 bg-red-100 shadow-md flex items-center justify-center"
                          size="small"
                          onClick={handleBabyImageClick}
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.82666 23.7039L18.125 13.41L18.5898 13.8748L8.29779 24.1668H7.82666V23.7039ZM23.4915 8.04416C23.4914 8.04427 23.4913 8.04438 23.4912 8.0445L23.4915 8.04416Z"
                              stroke="#B36868"
                              strokeWidth="5"
                            />
                          </svg>
                        </IconButton>
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
                              onChange={handleChangeBaby}
                            />
                          </div>
                          <div className="flex flex-col w-1/2">
                            <FormLabel>นามสกุล</FormLabel>
                            <TextField
                              fullWidth
                              size="small"
                              name="lastName"
                              value={baby.lastName ?? ""}
                              onChange={handleChangeBaby}
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
                            onChange={handleChangeBaby}
                          />
                        </div>
                      </div>
                    </div>
                    <Box>
                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>วันเกิด</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="birthDate"
                            value={baby.birthDate ?? ""}
                            onChange={handleChangeBaby}
                            type="date"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>อายุครรภ์ตอนคลอด (สัปดาห์)</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="beforebirth"
                            value={baby.beforebirth ?? ""}
                            onChange={handleChangeBaby}
                            type="number"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={0.7}>
                          <FormLabel>เพศ</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={1.75}>
                          <RadioGroup
                            name="gender"
                            value={baby.gender}
                            onChange={handleChangeBaby}
                          >
                            <FormControlLabel
                              value="male"
                              control={
                                <Radio
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
                        </Grid>
                        <Grid item xs={12} sm={4.775}>
                          <FormLabel>กรุ๊ปเลือด</FormLabel>
                          <Select
                            fullWidth
                            size="small"
                            name="bloodType"
                            value={baby.bloodType}
                            onChange={handleChangeBaby}
                          >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="AB">AB</MenuItem>
                            <MenuItem value="O">O</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12} sm={4.775}>
                          <FormLabel>Rh</FormLabel>
                          <Select
                            fullWidth
                            size="small"
                            name="rh_type"
                            value={baby.rh_type ?? ""}
                            onChange={handleChangeBaby}
                          >
                            <MenuItem value="">เลือก Rh</MenuItem>
                            <MenuItem value="Positive">Positive</MenuItem>
                            <MenuItem value="Negative">Negative</MenuItem>
                            <MenuItem value="ยังไม่ระบุ">ยังไม่ระบุ</MenuItem>
                          </Select>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>น้ำหนักแรกเกิด (กก.)</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="birthWeight"
                            value={baby.birthWeight}
                            onChange={handleChangeBaby}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormLabel>ความยาวแรกเกิด (ซม.)</FormLabel>
                          <TextField
                            fullWidth
                            size="small"
                            name="birthHeight"
                            value={baby.birthHeight}
                            onChange={handleChangeBaby}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <FormLabel>โน้ต</FormLabel>
                      <TextField
                        fullWidth
                        size="small"
                        name="note"
                        value={baby.note}
                        onChange={handleChangeBaby}
                        multiline
                        rows={3}
                      />
                    </Box>
                  </div>
                ))}
          </Box>
          {/* Prepare growthData for the selected baby */}
          {(() => {
            // Find the selected baby's growth data
            const selectedBaby = babyInfo.find(
              (baby) => baby.id === selectedBabyId
            );
            // Map growthData to include a 'months' field for the X axis (or use date)
            const growthData =
              selectedBaby?.growthData?.map((g) => ({
                ...g,
                months: g.date, // You can replace this with a calculation of months if needed
                length: g.length, // For chart compatibility
              })) || [];

            return (
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
                            dataKey="months"
                            label={{
                              value: "เดือน",
                              position: "insideBottomRight",
                              offset: -5,
                            }}
                          />
                          <YAxis
                            label={{
                              value: "กก.",
                              angle: -90,
                              position: "insideLeft",
                            }}
                          />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="weight"
                            name="น้ำหนัก (กก.)"
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
                            dataKey="months"
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
            );
          })()}
          <Box sx={{ mt: 3 }}>
            <div className="flex justify-between mb-5">
              <Typography className="text-black">ข้อมูล</Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#B36868",
                  "&:hover": { bgcolor: "#934343" },
                }}
                onClick={() => {
                  if (selectedBabyId) {
                    handleaddgrowthdata(
                      selectedBabyId,
                      fromgrowthdatafield.date,
                      fromgrowthdatafield.weight,
                      fromgrowthdatafield.length
                    );
                  }
                  console.log("Adding growth data");
                }}
              >
                เพิ่มข้อมูล
              </Button>
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
                        <FormLabel>น้ำหนัก (กก.)</FormLabel>
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
                          name="height"
                          value={data.length}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  ))
                )}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormLabel>วันที่</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="date"
                    type="date"
                    value={fromgrowthdatafield.date}
                    onChange={handleaddBabygrowthdatafield}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel>น้ำหนัก (กก.)</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="weight"
                    value={fromgrowthdatafield.weight}
                    onChange={handleaddBabygrowthdatafield}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel>ความยาว (ซม.)</FormLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="length"
                    value={fromgrowthdatafield.length}
                    onChange={handleaddBabygrowthdatafield}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => router.push("/admin/mominfo")}
              sx={{ color: "#999999", borderColor: "#999999" }}
              className="w-40"
            >
              ยกเลิก
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#B36868",
                "&:hover": { bgcolor: "#934343" },
              }}
              className="w-40"
              onClick={handleSubmit}
            >
              บันทึก
            </Button>
          </Box>
        </Container>
      </div>

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={momImageInputRef}
        onChange={handleMomImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={babyImageInputRef}
        onChange={handleBabyImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      <StyledAlert
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
        onClose={hideAlert}
      />
    </div>
  );
}
