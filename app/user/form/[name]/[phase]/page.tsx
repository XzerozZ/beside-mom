"use client";
import React from "react";
import Navbar from "../../../component/navbar";
import { useParams } from "next/navigation";
import ProgressBar from "@/app/user/component/progressbar";
import FormCard from "@/app/user/component/FormCard";
import { QuizHistory, Quiz, HistoryData } from "@/app/interface";

import Link from "next/link";
const page = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const babyId = searchParams.get("babyid");
  const token = localStorage.getItem("key");
  const { name } = useParams();
  const { phase } = useParams();

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
  const decodedPhase = getDecodedName(
    typeof phase === "string" ? phase : undefined
  );

  const [quizHistory, setQuizHistory] = React.useState<HistoryData>();
  const [quizHistoryData, setQuizHistoryData] = React.useState<Quiz[]>();
  const fetchQuizData = async (token: string,babyid: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/history/result/evaluate/1/kid/${babyid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuizHistory(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchQuiz = async (id: number,token: string) => {
    try {
      const response = await fetch(`http://localhost:5000/quiz`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      setQuizHistoryData(data.result); // Update the single quiz state
    } catch (error) {
      console.error("Error fetching quiz data:", error);
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

    console.log(resultArrayQuiz);
  

  React.useEffect(() => {
    fetchQuizData(token || "", babyId || ""); // Fetch quiz history
    fetchQuiz(1,token || ""); // Fetch the first quiz
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
              การตรวจตามนัด {">>"} {decodedName} {">>"} {decodedPhase}
            </h1>

            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
              {/* <ProgressBar {...combinedData} /> */}
              {resultArrayQuiz?.map((item, index) => (
                <Link
                  key={index}
                  href={`/user/form/${decodedName}/${decodedPhase}/${item.Histories[0].quiz_id}?babyid=${babyId}`}
                  >
                    <FormCard  {...item} />
                  </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
