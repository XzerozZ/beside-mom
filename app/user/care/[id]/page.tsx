"use client";
import React, { use, useEffect } from "react";
import Navbar from "@/app/user/component/navbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CareItem } from "@/app/interface";
import "@/app/user/component/css/loader.css";

const page = () => {
  const param = useParams();
  const [care, setCare] = React.useState<CareItem>();
  

  const fetchCare = async (id: string, token: string) => {
    try {
      const res = await fetch(`http://localhost:5000/care/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setCare(data.result);
      }
    } catch (error) {
      console.error("An error occurred while fetching care data:", error);
    }
  };
  useEffect(() => {
    if (param.id && typeof param.id === "string") {
      fetchCare(param.id, localStorage.getItem("key")!);
    } else {
      console.error("Invalid or missing parameter: id");
    }
  }, []);

  
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("key");
      if (!token) {
        console.error("Token is missing. Please log in.");
        setLoading(false);
        return;
      }

      if (param.id && typeof param.id === "string") {
        await fetchCare(param.id, token);
      } else {
        console.error("Invalid or missing parameter: id");
      }
      setLoading(false);
    };

    fetchData();
  }, [care]);

  if (loading) {
    return  <div className="flex flex-col">
    <header className="fixed top-0 left-0 w-full">
      <Navbar />
    </header>
    <main className="mt-[160px] max-sm:mt-[112px] flex justify-center items-center h-screen">
      <div className="loader"></div>
    </main>
  </div>
  }
  else {

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[160px] max-sm:mt-[112px]">
        <div className="">
          <div className="flex flex-col items-center gap-[30px]">
            <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
              การดูแลทารก {" >> "} {care?.title}
            </h1>
            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px] flex flex-col gap-[20px] ">
            {care?.type === "image" ? (
              care.assets?.map((item: { link: string }, index: number) => (
              <div key={index} className="flex justify-center">
                <Image
                src={item.link}
                alt="care"
                width={1000}
                height={1000}
                className="object-cover w-2/4 h-[500px] max-xl:h-[300px] max-sm:h-[200px]"
                />
              </div>
                ))
              ) : care?.type === "video" ? (
                care.assets?.map((item: { link: string }, index: number) => (
                <div key={index} className="flex justify-center">
                  <video
                  controls
                  className="object-cover w-2/4 h-[500px] max-xl:h-[300px] max-sm:h-[200px]"
                  >
                  <source src={item.link} type="video/mp4" />
                  Your browser does not support the video tag.
                  </video>
                </div>
                ))
              ) : (
               <div>
                {!care ? (
                  <p>Loading...</p>
                ) : (
                  <p>No assets available for this care item.</p>
                )}
               </div>
              )}
              <div>
                <h2 className="font-bold text-[16px] text-left">
                  {care?.title}
                </h2>
              </div>
              <div>{care?.desc}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
}
export default page;
