"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BabyCard } from "../component/babycard";
import { User } from "@/app/interface";
import { IoPencilSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Navbar from "../component/navbar";

const page = () => {
  const token = localStorage.getItem("token");

  const uid = localStorage.getItem("u_id");
  const [momData, setMomData] = React.useState<User>();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const fetchMomData = async (id: string, key: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_url}/info/${id}`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setMomData(data.result);
    } else {
      console.error("Failed to fetch mom data");
       await Swal.fire({
                title: "Please login again your token is expired!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#B36868",
              });
              window.location.href = "/auth/login";
      
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!fileInputRef.current?.files?.[0]) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    const file = fileInputRef.current.files[0];
    for (const file of fileInputRef.current.files) {
      formData.append("images", file);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_url}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        alert("File uploaded successfully!");
        console.log("Uploaded file URL:", data);
        setIsPopupOpen(false);
      } else {
        alert("Failed to upload file.");
        console.error("Upload error:", res.statusText);
      }
    } catch (error) {
      alert("An error occurred during file upload.");
      console.error("Upload error:", error);
    }
  };

  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. Please log in.");
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        window.location.href = "/auth/login";
        return;
      }
    };
    if (token) {
      fetchMomData(uid!, token!);
    } else {
      console.error("Invalid or missing parameter: id");
    }
    setLoading(false);

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-160px] max-sm:mt-[-112px]">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <>
       <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
        <div className="flex flex-col items-center gap-[30px]">
          <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
            ข้อมูลคุณแม่
          </h1>

          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] gap-8 flex flex-col">
            <div className="flex flex-row gap-[64px] max-md:flex-col max-md:gap-0">
              <div className="relative w-44 h-44 flex-none max-md:mx-auto max-md:mb-6 z-0">
                <Image
                  src={momData?.image_link || "/baby.png"}
                  alt="Baby profile picture"
                  width={176}
                  height={176}
                  className="object-cover w-44 h-44 rounded-full -z-10 relative"
                  priority
                />
                <button
                  onClick={() => setIsPopupOpen(!isPopupOpen)}
                  className="absolute bottom-2 right-1 w-10 h-10 bg-[#FFEBEC] hover:bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <IoPencilSharp className="text-[#B36868] w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between pb-4 max-md:gap-6">
                <div className="flex flex-row justify-between max-md:flex-col max-md:gap-6">
                  <div className="w-1/2">
                    <h3 className="font-bold text-[18px]">ID</h3>
                    <h4>{momData?.u_id}</h4>
                  </div>
                  <div className="w-1/2">
                  <h3 className="font-bold text-[18px]">อีเมล</h3>
                    <h4>{momData?.email}</h4>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="w-1/2">
                  <h3 className="font-bold text-[18px]">ชื่อ</h3>
                    <h4>{momData?.fname}</h4>
                  </div>
                  <div className="w-1/2">
                  <h3 className="font-bold text-[18px]">นามสกุล</h3>
                    <h4>{momData?.lname}</h4>
                  </div>
                </div>
              </div>
            </div>
            <hr className="" />
            <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
              ข้อมูลทารกทั้งหมด
            </h1>
            <div className="grid grid-cols-4 max-xl:grid-cols-3 gap-[40px] max-md:grid-cols-1 justify-items-center">
              {momData?.kids.map((baby) => (
                <BabyCard
                  key={baby.u_id}
                  name={`${baby.fname} ${baby.lname}`}
                  image={baby.image_link}
                  uid={baby.u_id}
                />
              ))}
            </div>
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white p-5 rounded-lg shadow-lg w-[752px] h-[459px] md:w-[577px] md:h-[459px] max-sm:w-[306px] max-sm:h-[341px] flex flex-col gap-4">
                <h2 className="text-lg font-bold ">เลือกรูปโปรไฟล์</h2>
                <div className="w-full">
                  {/* Upload Box */}
                  <div
                    className="border-dashed border-2 border-gray-300 h-[325px] max-sm:h-[200px] h w-full flex flex-col items-center justify-center cursor-pointer"
                    onClick={handleClick}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div>
                      <Image
                        src="/uploadimage.svg"
                        alt="Upload Icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <h3 className="text-[16px] text-[#B36868]">
                        Click to Upload
                      </h3>
                      <h3 className="text-[16px]">or drag and drop</h3>
                    </div>
                    <div className="text-[16px]">(Max. File size: 25 MB)</div>
                    {fileName && (
                      <p className="mt-2 text-center text-sm text-gray-600">
                        Selected file:{" "}
                        <span className="font-medium">{fileName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    ยกเลิก
                  </button>
                  <button
                    className="px-4 py-2 bg-[#B36868] text-white rounded "
                    onClick={handleUpload}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>
      </>
    );
  }
};

export default page;
