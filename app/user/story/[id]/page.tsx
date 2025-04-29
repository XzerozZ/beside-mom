"use client";
import React, { useEffect } from "react";
import Navbar from "../../component/navbar";
import { Card } from "../../component/card";
import { useParams } from "next/navigation";
import { VideoClip } from "@/app/interface";

const page = () => {
  const param = useParams();
  const [isToggle, setIsToggle] = React.useState(false);
  const [video, setVideo] = React.useState<VideoClip>();
  const [videos, setVideos] = React.useState<VideoClip[]>([]);
  const fetchVideos = async () => {
    try {
      const res = await fetch(`http://localhost:5000/video`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNmFjMDQ4OGQtYWFiMS00YjhiLWJhYzUtMTgxNjg2M2JhOWYwIn0.IOe-r5myKw2a3SnU-1AVNWjqtUg0Eqgs_TCZPHXbt1U`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setVideos(data.result);
      } else {
        console.error("Failed to fetch kid data");
      }
    } catch (error) {
      console.error("An error occurred while fetching kid data:", error);
    }
  };

  const fetchVideo = async (id: String) => {
    try {
      const res = await fetch(`http://localhost:5000/video/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNmFjMDQ4OGQtYWFiMS00YjhiLWJhYzUtMTgxNjg2M2JhOWYwIn0.IOe-r5myKw2a3SnU-1AVNWjqtUg0Eqgs_TCZPHXbt1U`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setVideo(data.result);
      } else {
        console.error("Failed to fetch kid data");
      }
    } catch (error) {
      console.error("An error occurred while fetching kid data:", error);
    }
  };
  const formatDate = (dateString: string): string => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist calendar year
    return `${day} ${month} ${year}`;
  };

  const postLike = async (id: String) => {
    try {
      const formData = new FormData();
      formData.append("videoid", id.toString());

      const res = await fetch(`http://localhost:5000/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNmFjMDQ4OGQtYWFiMS00YjhiLWJhYzUtMTgxNjg2M2JhOWYwIn0.IOe-r5myKw2a3SnU-1AVNWjqtUg0Eqgs_TCZPHXbt1U`,
        },
        body: formData,
      });
      if (res.status === 200) {
        console.log("Video liked successfully");
        fetchVideo(id); // Refresh video data
      } else {
        console.error("Failed to like video");
      }
    } catch (error) {
      console.error("An error occurred while liking the video:", error);
    }
  };

  const deleteLike = async (id: String) => {
    try {
      const res = await fetch(`http://localhost:5000/video/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNmFjMDQ4OGQtYWFiMS00YjhiLWJhYzUtMTgxNjg2M2JhOWYwIn0.IOe-r5myKw2a3SnU-1AVNWjqtUg0Eqgs_TCZPHXbt1U`,
        },
      });
      if (res.status === 200) {
        console.log("Video unliked successfully");
        fetchVideo(id); // Refresh video data
      } else {
        console.error("Failed to unlike video");
      }
    } catch (error) {
      console.error("An error occurred while unliking the video:", error);
    }
  };

  const checkLike = async (id: String) => {
    try {
      const res = await fetch(`http://localhost:5000/like/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNmFjMDQ4OGQtYWFiMS00YjhiLWJhYzUtMTgxNjg2M2JhOWYwIn0.IOe-r5myKw2a3SnU-1AVNWjqtUg0Eqgs_TCZPHXbt1U`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        return data.liked; // Assuming the API returns a "liked" boolean
      } else {
        console.error("Failed to check like status");
        return false;
      }
    } catch (error) {
      console.error("An error occurred while checking like status:", error);
      return false;
    }
  };

  const formattedDate = formatDate(video?.publish_at || "");

  useEffect(() => {
    if (param.id) {
      fetchVideo(param.id.toString());
      fetchVideos();
    }
  }, []);

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </header>
      <main className="mt-[160px] max-sm:mt-[112px]">
        <div className="flex flex-col items-center gap-[30px]">
          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
            <div className="flex flex-row gap-[31px] max-xl:flex-col">
              <div className="w-4/5 flex flex-col gap-[36px] max-xl:w-full">
                <h1 className="font-bold text-[20px] text-left ">
                  เรื่องเล่าของคุณแม่
                </h1>
                <div className="relative z-0">
                  <div className="absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none"></div>
                  <video
                    className="relative z-0 rounded-[16px] h-[563px] max-xl:h-[527px] max-sm:h-[226px]"
                    width="100%"
                    controls
                  >
                    <source src={video?.link} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex flex-col gap-[16px] mt-[20px">
                  <h1 className="text-[20px] font-bold">{video?.title} </h1>
                  <div>
                    {isToggle ? (
                      <div id="toggleContent">
                        <h2 className="text-[16px]">{video?.description}</h2>
                      </div>
                    ) : (
                      <p className="text-[16px] line-clamp-1" id="main">
                        {video?.description}
                      </p>
                    )}
                    <button
                      className="font-bold"
                      onClick={() => setIsToggle(!isToggle)}
                      id="toggleButton"
                    >
                      {isToggle ? "ซ่อน" : "เพิ่มเติม"}
                    </button>
                  </div>

                  <h2 className="text-[16px]">{formattedDate}</h2>
                </div>
              </div>
              <div className="w-1/5 flex flex-col gap-[36px] max-xl:w-full ">
                <h1 className="font-bold text-[20px] text-left ">
                  วีดิโออื่นๆ
                </h1>
                <div className="grid grid-cols-1 gap-y-[20px] max-xl:hidden max-sm:grid max-sm:grid-cols-1">
                  {videos.map((video: VideoClip, index: number) => (
                    <Card key={index} {...video} />
                  ))}
                </div>
                <div className="hidden max-xl:flex max-xl:overflow-x-auto max-xl:gap-[20px] max-sm:hidden max-xl:snap-x max-xl:snap-mandatory px-4">
                  <div className="flex space-x-5">
                    {videos.map((video: VideoClip, index: number) => (
                      <div  key={index} className="w-[calc(100%/3-20px)] flex-shrink-0 snap-start">
                        <Card {...video} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
