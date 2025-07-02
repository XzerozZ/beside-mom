"use client";
import React from "react";
import Image from "next/image";
import { User } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";

const PageProfile = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [uid, setUid] = React.useState<string | null>(null);
  const [momData, setMomData] = React.useState<User>();
  const [loading, setLoading] = React.useState<boolean>(true);

  // Fetch token and uid from localStorage on client only
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setUid(localStorage.getItem("u_id"));
    }
  }, []);

  const fetchMomData = async (id: string, key: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_url}/user/info/${id}`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setMomData(data.result);
    } else {
      console.error("Failed to fetch mom data");
    }
  };

  React.useEffect(() => {
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
      if (token && uid) {
        fetchMomData(uid, token);
        setLoading(false);
      }
    };
    if (token && uid) {
      fetchData();
    }
  }, [token, uid]);

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
          <div className="  flex-col justify-between h-full xl:hidden text-[20px] text-left max-xl:w-[770px]  max-sm:w-[324px]">
            <div className="flex flex-row justify-between ">
              <h1 className="font-bold">โปรไฟล์</h1>
            </div>
            <div className="flex flex-col gap-[40px] mt-[40px]">
              <div className="flex flex-col gap-[24px] mx-auto w-[180px]">
                <Image
                  src={momData?.image_link || "/baby.png"}
                  width={96}
                  height={96}
                  alt="profilepicture"
                  className="object-cover rounded-full w-44 h-44"
                ></Image>
                <h1 className="font-bold text-[16px] text-center">
                  {momData?.fname + " " + momData?.lname}
                </h1>
              </div>
            </div>
            <div className="mt-[40px] flex justify-center">
              <button
                className="font-bold text-[16px] text-[#B36868] text-center"
                onClick={async () => {
                  const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "You will be logged out!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, log out!",
                    cancelButtonText: "Cancel",
                    confirmButtonColor: "#B36868",
                  });

                  if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("u_id");
                    localStorage.removeItem("name");
                    localStorage.removeItem("role");
                    window.location.href = "/auth/login";
                  }
                }}
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PageProfile;
