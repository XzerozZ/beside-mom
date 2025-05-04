"use client";
import React, { useEffect } from "react";
import Navbar from "../../component/navbar";
import FormComponent from "../../component/form";
import { useParams } from "next/navigation";
import { Evaluation } from "@/app/interface";

const page = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const babyId = searchParams.get("babyid");
  const token = localStorage.getItem("key");
  const { name } = useParams();

  // Decode the name parameter
  const getDecodedName = (name: string | undefined) => {
    const safeDecode = (text: string) => {
      try {
        return decodeURIComponent(text);
      } catch (e) {
        return text;
      }
    };

    return safeDecode(name ?? "");
  };
  const decodedName = getDecodedName(
    typeof name === "string" ? name : undefined
  );

  const [evaluate, setEvaluate] = React.useState<Evaluation[]>();

  const fetchData = async (token: string,babyid: string) => {
    try {
      const response = await fetch(`http://localhost:5000/evaluate/all/${babyid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setEvaluate(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  useEffect(() => {
    fetchData(token!, babyId!);
  }, []);
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
        <div className="">
          <div className="flex flex-col items-center gap-[30px]">
            <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
            แบบประเมินพัฒนาการ {">>"} {decodedName}
            </h1>

            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
              {evaluate?.map((item, index) => (
              <FormComponent key={index} {...item} name={decodedName} paramSearch={searchParams.toString()} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
