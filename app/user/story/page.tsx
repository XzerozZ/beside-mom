"use client";
import React, { FC, use, useEffect } from "react";
import { Card } from "../component/card";
import { VideoClip } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/user/component/css/loader.css";
import Navbar from "../component/navbar";

const page = () => {
  const token = localStorage.getItem("token");
  const [videos, setVideos] = React.useState<VideoClip[]>([]);
  const fetchVideo = async (token: string) => {
    try {
      const res = await fetch(`http://localhost:5000/video`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setVideos(data?.result || []);
      } else {
        console.error("Failed to fetch kid data");
      }
    } catch (error) {
      console.error("An error occurred while fetching kid data:", error);
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
        window.location.href = "/user/auth/login";
        return;
      }
    };
    if (token) {
      fetchVideo(token || "");
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
      <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px] z-0">
      <div className="flex flex-col items-center gap-[30px]">
        <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
          เรื่องเล่าของคุณแม่
        </h1>
        <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
          <div className="grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-1 justify-center gap-y-[20px] gap-x-[80px]">
            {videos.map((video: VideoClip, index: number) => (
              <Card key={index} {...video} />
            ))}
          </div>
        </div>
      </div>
      </main>
      </div>
    );
  }
};
export default page;
