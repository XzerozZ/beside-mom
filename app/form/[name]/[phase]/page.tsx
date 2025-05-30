"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import FormCard from "@/app/component/FormCard";
import { Quiz, HistoryData } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/component/css/loader.css";
import Navbar from "@/app/component/navbar";
import ProgressBar from "@/app/component/progressbar"; // Adjust the path as necessary
const PageFormPhase = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const babyId = searchParams.get("babyid");
  const token = localStorage.getItem("token");
  const { name } = useParams();
  const { phase } = useParams();

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

  const [quizHistory, setQuizHistory] = React.useState<HistoryData>();
  const [quizHistoryData, setQuizHistoryData] = React.useState<Quiz[]>();
  const [quizHistoryData2, setQuizHistoryData2] = React.useState<Quiz[]>();
  const [quizHistoryData3, setQuizHistoryData3] = React.useState<Quiz[]>();
  const [quizHistoryData4, setQuizHistoryData4] = React.useState<Quiz[]>();
  const [quizHistoryData5, setQuizHistoryData5] = React.useState<Quiz[]>();

  const fetchQuizData = async (
    token: string,
    babyid: string,
    phase: number
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_url}/history/result/evaluate/${phase}/kid/${babyid}`,
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
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuizHistory(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const resultArrayQuiz = quizHistory
    ? Object.entries(quizHistory).map(([key, value]) => {
        return {
          id: key,
          ...value,
        };
      })
    : [];

  // console.log(resultArrayQuiz);

  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchAllQuizzes = async () => {
      const setters = [
        setQuizHistoryData,
        setQuizHistoryData2,
        setQuizHistoryData3,
        setQuizHistoryData4,
        setQuizHistoryData5,
      ];

      for (let i = 1; i <= 5; i++) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_url}/quiz/period/${decodedPhase}/category/${i}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch quiz data for category ${i}`);
          }
          const data = await response.json();
          setters[i - 1](data.result); // Dynamically set the corresponding state
        } catch (error) {
          console.error(`Error fetching quiz data for category ${i}:`, error);
        }
      }
    };
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
      fetchQuizData(token || "", babyId || "", Number(decodedPhase)); // Fetch quiz history

      fetchAllQuizzes();
    } else {
      console.error("Invalid or missing parameter: id");
    }
    setLoading(false);
  }, [token, babyId, decodedPhase]);

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
            <div className="flex flex-col items-center gap-[30px z-0">
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

              <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px] z-0">
                <ProgressBar {...quizHistory} />
                {resultArrayQuiz?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const quizId = (() => {
                        if (index === 0) return quizHistoryData?.[0]?.quiz_id;
                        else if (index === 1)
                          return quizHistoryData2?.[0]?.quiz_id;
                        else if (index === 2)
                          return quizHistoryData3?.[0]?.quiz_id;
                        else if (index === 3)
                          return quizHistoryData4?.[0]?.quiz_id;
                        else if (index === 4)
                          return quizHistoryData5?.[0]?.quiz_id;
                      })();
                      if (item.solution_status === "ผ่าน") {
                        alert("คุณได้ทำแบบประเมินนี้แล้ว");
                      } else {
                        window.location.href = `/form/${decodedName}/${decodedPhase}/${
                          index + 1
                        }/${quizId}?babyid=${babyId}`;
                      }
                    }}
                    className="w-full text-left"
                  >
                    <FormCard {...item} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default PageFormPhase;
