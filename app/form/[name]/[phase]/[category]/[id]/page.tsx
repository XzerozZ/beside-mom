"use client";
import { API_URL } from "@/config/config";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import QuizForm from "@/app/component/quiz";
import { Quiz } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Navbar from "@/app/component/navbar";
import { useSearchParams } from "next/navigation";
import Chatbot from "@/app/component/chatbot";

const PageFormCategory = () => {
  const { name } = useParams();
  const { phase } = useParams();
  const { id } = useParams();
  const [babyId, setBabyId] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const param = useParams();
  const [showChat, setShowChat] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  // Extract babyId and token safely in useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBabyId(searchParams.get("babyid"));
      setToken(localStorage.getItem("token"));
    }
  }, [searchParams]);

  // Decode the name parameter
  const getDecodedName = (name: string | undefined) => {
    const safeDecode = (text: string) => {
      try {
        return decodeURIComponent(text);
      } catch {
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
        `${API_URL}/quiz/period/${phase}/category/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          await Swal.fire({
            title: "Please login again your token is expired!",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
            confirmButtonColor: "#B36868",
          });
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }
        throw new Error(`Failed to fetch quiz data: ${response.status}`);
      }
      const data = await response.json();
      setQuizHistoryData(data.result);
      return data.result;
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      // Don't show error popup for network issues, just log
      if (error instanceof Error && !error.message.includes("401")) {
        console.error("Network error:", error.message);
      }
      throw error;
    }
  };

  const [loading, setLoading] = React.useState(true);

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
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return;
      }

      if (param.phase && param.category) {
        try {
          await fetchQuizArray(
            token,
            Number(param.phase),
            Number(param.category)
          );
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      }
      setLoading(false);
    };

    // Only fetch data when we have token and it's not null
    if (token !== null) {
      if (token) {
        fetchData();
      } else {
        // Token is empty string, redirect to login
        setLoading(false);
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    }
    // If token is null, we're still waiting for it to load
  }, [token, param.phase, param.category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-160px] max-sm:mt-[-112px]">
        <div className="loader"></div>
      </div>
    );
  }

  // Show message if no quiz data is available
  if (!quizHistoryData || quizHistoryData.length === 0) {
    return (
      <div className="flex flex-col">
        <header className="fixed top-0 left-0 w-full z-10">
          <Navbar />
        </header>
        <main className="mt-[112px] max-sm:mt-[112px]">
          <div className="flex justify-center items-center h-[400px]">
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-4">ไม่พบข้อมูลแบบทดสอบ</p>
              <button
                onClick={() => window.history.back()}
                className="bg-[#B36868] text-white px-6 py-2 rounded-lg hover:bg-[#A05858] transition-colors"
              >
                ย้อนกลับ
              </button>
            </div>
          </div>
        </main>
        <Chatbot showChat={showChat} setShowChat={setShowChat} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </header>
      <main className="mt-[112px] max-sm:mt-[112px]">
        <div className="">
          <div className="flex flex-col items-center gap-[30px]">
            <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
              การตรวจตามนัด {">>"} {decodedName} {">>"}{" "}
              {decodedPhase === "1"
                ? "แรกเกิด"
                : decodedPhase === "2"
                ? "1 เดือน"
                : decodedPhase === "3"
                ? "2 เดือน"
                : decodedPhase === "4"
                ? "3 - 4 เดือน"
                : decodedPhase === "5"
                ? "5 – 6 เดือน"
                : decodedPhase === "6"
                ? "7-8 เดือน"
                : decodedPhase === "7"
                ? "9 เดือน"
                : decodedPhase === "8"
                ? "10-12 เดือน"
                : ""}
            </h1>

            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
              {quizHistoryData && babyId && (
                <QuizForm
                  props={quizHistoryData}
                  navigate={`${name}/${phase}/1`}
                  history={quizHistoryData ?? []}
                  index={Number(id)}
                  babyId={babyId}
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
      <Chatbot showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
};

export default PageFormCategory;
