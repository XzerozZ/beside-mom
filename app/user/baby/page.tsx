"use client";
import React, { useEffect } from "react";
import Navbar from "../component/navbar";
import Image from "next/image";
import { BabyCard } from "../component/babycard";
import { User } from "@/app/interface";

const page = () => {

  const [momData, setMomData] = React.useState<User>();
  const fetchMomData = async (id: string) => {
    const res = await fetch(`http://localhost:5000/user/info/${id}`, {
      headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNTYxYmRkOTEtYjlkZS00MzlkLThkZTgtYzU5ZTk0ZjI3ZmJiIn0.82AHeCIaX9m7mr-nTb6YrbeSqx4tD-ZmkEjFa6Rr8I8`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setMomData(data.result);
    }
    else {
      console.error("Failed to fetch mom data");
    }
  }
  useEffect(() => {
    fetchMomData("4459a0ff-b393-412e-8733-3503d91c1270");
  },[])
  console.log(momData);


  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
        <div className="flex flex-col items-center gap-[30px] ">
          <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
            ข้อมูลคุณแม่
          </h1>

          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] gap-8 flex flex-col">
            <div className="flex flex-row gap-[64px] max-md:flex-col max-md:gap-0">
              <div className="w-44 h-44 rounded-full overflow-hidden flex-none max-md:mx-auto  max-md:mb-6">
                <Image
                  src="/baby.png"
                  alt="Description of the image"
                  width={176}
                  height={176}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between pb-4 max-md:gap-6">
                <div className="flex flex-row justify-between max-md:flex-col max-md:gap-6">
                  <div className="w-1/2">
                    <h3>ID</h3>
                    <h4>{momData?.u_id}</h4>
                  </div>
                  <div className="w-1/2">
                    <h3>อีเมล</h3>
                    <h4>{momData?.email}</h4>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="w-1/2">
                    <h3>ชื่อ</h3>
                    <h4>{momData?.fname}</h4>
                  </div>
                  <div className="w-1/2">
                    <h3>นามสกุล</h3>
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
             {
              momData?.kids.map((baby) => (
                <BabyCard
                  key={baby.u_id}
                  name={`${baby.fname} ${baby.lname}`}
                  image={baby.image_link}
                  uid={baby.u_id}
                />
              ))
             }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
