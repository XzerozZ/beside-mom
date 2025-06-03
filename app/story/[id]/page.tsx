"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card } from "../../component/card";
import { useParams } from "next/navigation";
import { VideoClip } from "@/app/interface";
import Image from "next/image";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Navbar from "../../component/navbar";

const PageStoryId = () => {
  const param = useParams();
  const [like, setLike] = useState<boolean>(false);
  const [isToggle, setIsToggle] = useState(false);
  const [video, setVideo] = useState<VideoClip>();
  const [videos, setVideos] = useState<VideoClip[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Initialize token from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const fetchVideos = useCallback(async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_url}/video`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setVideos(data.result);
      } else {
        console.error("Failed to fetch videos data");
      }
    } catch (error) {
      console.error("An error occurred while fetching videos data:", error);
    }
  }, []);

  const fetchVideo = useCallback(async (id: string, token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_url}/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setVideo(data.result);
      } else {
        console.error("Failed to fetch video data");
      }
    } catch (error) {
      console.error("An error occurred while fetching video data:", error);
    }
  }, []);
  const formatDate = useCallback((dateString: string): string => {
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
  }, []);

  const postLike = useCallback(async (id: string, token: string) => {
    try {
      const formData = new FormData();
      formData.append("videoid", id.toString());

      const res = await fetch(`${process.env.NEXT_PUBLIC_url}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.status === 200) {
        setLike(true);
      }
    } catch (error) {
      console.error("An error occurred while liking the video:", error);
    }
  }, []);

  const deleteLike = useCallback(async (id: string, token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_url}/like/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setLike(false);
      }
    } catch (error) {
      console.error("An error occurred while unliking the video:", error);
    }
  }, []);

  const checkLike = useCallback(async (id: string, token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_url}/like/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setLike(data.result === "true");
      }
    } catch (error) {
      console.error("An error occurred while checking like status:", error);
    }
  }, []);

  const handleLikeToggle = useCallback(() => {
    if (!video?.id || !token) return;
    
    if (like) {
      deleteLike(video.id, token);
    } else {
      postLike(video.id, token);
    }
  }, [like, video?.id, token, deleteLike, postLike]);

  // Memoized formatted date
  const formattedDate = useMemo(() => 
    video?.publish_at ? formatDate(video.publish_at) : "", 
    [video?.publish_at, formatDate]
  );

  // Memoized YouTube URL conversion
  const embedUrl = useMemo(() => 
    video?.link?.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/'), 
    [video?.link]
  );

  // Check like status when video changes
  useEffect(() => {
    if (video?.id && token) {
      checkLike(video.id, token);
    }
  }, [video?.id, token, checkLike]);

  // Main data fetching effect
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!param.id) {
          console.error("Invalid or missing parameter: id");
          return;
        }

        await Promise.all([
          fetchVideo(param.id.toString(), token),
          fetchVideos(token)
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        window.location.href = "/auth/login";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, param.id, fetchVideo, fetchVideos]);

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
        <main className="mt-[112px] max-sm:mt-[112px]">
          <div className="flex flex-col items-center gap-[30px]">
            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px]">
              <div className="flex flex-row gap-[31px] max-xl:flex-col">
                <div className="w-4/5 flex flex-col gap-[36px] max-xl:w-full">
                  <h1 className="font-bold text-[20px] text-left ">
                    เรื่องเล่าของคุณแม่
                  </h1>
                  <div className="relative z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none"></div>
                    <iframe
                      className="relative -z-10 rounded-[16px] h-[563px] max-xl:h-[527px] max-sm:h-[226px] border-0"
                      width="100%"
                      src={embedUrl}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex flex-col gap-[16px] mt-[20px]">
                    <div className="flex justify-between ">
                      <h1 className="text-[20px] font-bold">{video?.title} </h1>
                      <div className="flex hover:bg-[#f2f2f2] gap-4 p-1 rounded-[4px]">
                        <div className="flex  gap-2">
                          <Image
                            src={like ? "/mdi_like.svg" : "/like_default.svg"}
                            alt="like"
                            width={24}
                            height={24}
                            className="inline-block mr-2 cursor-pointer"
                            onClick={handleLikeToggle}
                          />
                          <div className="my-auto">{video?.count_like}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>{video?.view} views</div>
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
                    {videos
                      .slice(0, 7)
                      .map((video: VideoClip, index: number) => (
                        <Card key={index} {...video} />
                      ))}
                  </div>
                  <div className="hidden max-xl:flex max-xl:overflow-x-auto max-xl:gap-[20px] max-sm:hidden max-xl:snap-x max-xl:snap-mandatory px-4">
                    <div className="flex space-x-5">
                      {videos
                        .slice(0, 7)
                        .map((video: VideoClip, index: number) => (
                          <div
                            key={index}
                            className="w-[calc(100%/20px)] flex-shrink-0 snap-start"
                          >
                            <Card {...video} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <style jsx>{`
              nextjs-portal {
                display: none;
              }
            `}</style>
          </div>
        </main>
      </div>
    );
  }
};

export default PageStoryId;
