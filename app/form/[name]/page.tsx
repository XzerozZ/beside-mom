"use client";
import React, { useEffect } from "react";
import FormComponent from "../../component/form";
import { useParams } from "next/navigation";
import { Evaluation } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Navbar from "../../component/navbar";
import Chatbot from "../../component/chatbot";
import { useSearchParams } from 'next/navigation';


const PageForm = () => {
  const searchParams = useSearchParams();
  const babyId = searchParams.get("babyid");
  const token = localStorage.getItem("token");
  const { name } = useParams();
  const [showChat, setShowChat] = React.useState<boolean>(false);

  // Decode the name parameter
  const getDecodedName = (name: string | undefined) => {
    const safeDecode = (text: string) => {
      try {
        return decodeURIComponent(text);
      } catch  {
        return text;
      }
    };

    return safeDecode(name ?? "");
  };
  const decodedName = getDecodedName(
    typeof name === "string" ? name : undefined
  );

  const [evaluate, setEvaluate] = React.useState<Evaluation[]>();

  const fetchPeriod = async (token: string,babyid: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_url}/evaluate/all/${babyid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
         await Swal.fire({
                  title: "Please login again your token is expired!",
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  confirmButtonColor: "#B36868",
                });
                window.location.href = "/auth/login";
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setEvaluate(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const [loading, setLoading] = React.useState(true);
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
      fetchData();
      if (token && typeof babyId === "string") {
        fetchPeriod(token!, babyId!);
      } else {
      }
      setLoading(false);
  
     
    }, [token,babyId]);
  
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
            <Chatbot showChat={showChat} setShowChat={setShowChat} />

      </div>
     
  );
};
}
export default PageForm;
