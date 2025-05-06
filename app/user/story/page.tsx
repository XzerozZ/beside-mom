"use client";
import React, { FC, use, useEffect } from "react";
import { Card } from "../component/card";
import Navbar from "../component/navbar";
import { VideoClip } from "@/app/interface";

const page = () => {
  const token = localStorage.getItem("key");
  const [videos, setVideos] = React.useState<VideoClip[]>([]);
  const fetchVideo = async (token: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/video`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  useEffect(() => {
    fetchVideo(token || "");
  }
  , []);

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[112px]">
       <div className="flex flex-col items-center gap-[30px]">
       <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">เรื่องเล่าของคุณแม่</h1>
        <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
            <div className="grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-1 justify-center gap-y-[20px] gap-x-[80px]">
              {videos.map((video: VideoClip, index: number) => (
                <Card key={index} {...video}/>
              ))}
            </div>
            
        </div>
       </div>
      </main>
    </div>
  );
};

export default page;
