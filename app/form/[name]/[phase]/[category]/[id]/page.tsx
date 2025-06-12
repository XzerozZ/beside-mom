"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import QuizForm from "@/app/component/quiz";
import { Quiz } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Navbar from "@/app/component/navbar";
import Chatbot from "@/app/component/chatbot";

const PageFormCategory = () => {
  const { name } = useParams();
  const { phase } = useParams();
  const { id } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const babyId = searchParams.get("babyid");
  const param = useParams();
  const token = localStorage.getItem("token");
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
  const decodedPhase = getDecodedName(
    typeof phase === "string" ? phase : undefined
  );

  // const [quiz, setQuiz] = React.useState<Quiz[]>();
  const [quizHistoryData, setQuizHistoryData] = React.useState<Quiz[]>();


  const fetchQuizArray = async (
    token: string,
    phase: number,
    category: number
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_url}/quiz/period/${phase}/category/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
         await Swal.fire({
                  title: "Please login again your token is expired!",
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  confirmButtonColor: "#B36868",
                });
                window.location.href = "/auth/login";
        throw new Error("Failed to fetch quiz data");
        
      }
      const data = await response.json();
      setQuizHistoryData(data.result);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
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
    if (token) {
      fetchQuizArray(token!, Number(param.phase), Number(param.category));
    } else {
      console.error("Invalid or missing parameter: id");
    }
    setLoading(false);

  
  }, [token,param.phase,param.category]);

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
                การตรวจตามนัด {">>"} {decodedName} {">>"} {decodedPhase}
              </h1>

              <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
                <div className="z-10">
                  {/* <ProgressBar {...combinedData} /> */}
                </div>

                {quizHistoryData && (
                  <QuizForm
                    props={quizHistoryData}
                    navigate={`${name}/${phase}/1`}
                    history={quizHistoryData ?? []}
                    index={Number(id)}
                    babyId={babyId!}
                  />
                )}
              </div>
            </div>
            <style jsx global>{`
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

export default PageFormCategory;
