"use client";
import React, { use, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CareItem } from "@/app/interface";
import "@/app/component/css/loader.css";
import Swal from "sweetalert2";

const page = () => {
  const param = useParams();
  const token = localStorage.getItem("token");
  const [care, setCare] = React.useState<CareItem>();

  const fetchCare = async (id: string, token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_url}/care/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setCare(data.result);
      }
      else {
        console.error("Failed to fetch care data");
         await Swal.fire({
                  title: "Please login again your token is expired!",
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  confirmButtonColor: "#B36868",
                });
                window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("An error occurred while fetching care data:", error);
    }
  };

  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
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
      if (param.id && typeof param.id === "string") {
        await fetchCare(param.id, token);
      } else {
        console.error("Invalid or missing parameter: id");
      }
      setLoading(false);
    };

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
              <h2 className="font-bold text-[16px] text-left">{care?.title}</h2>
            </div>
            <div>{care?.desc}</div>
          </div>
        </div>
      </div>
    );
  }
};
export default page;
