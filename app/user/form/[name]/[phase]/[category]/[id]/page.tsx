"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import QuizForm from "@/app/user/component/quiz";
import { Quiz } from "@/app/interface";
import Swal from "sweetalert2";
import "@/app/user/component/css/loader.css";

const page = () => {
  const { name } = useParams();
  const { phase } = useParams();
  const { id } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const babyId = searchParams.get("babyid");
  const numericId = Number(id);
  const param = useParams();
  const token = localStorage.getItem("key");

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

  // const [quiz, setQuiz] = React.useState<Quiz[]>();
  const [quizHistoryData, setQuizHistoryData] = React.useState<Quiz[]>();
  // const fetchQuiz = async (id: number, token: string) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/quiz/period/2/category/1/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch quiz data");
  //     }
  //     const data = await response.json();
  //     setQuiz(data.result);
  //   } catch (error) {
  //     console.error("Error fetching quiz data:", error);
  //   }
  // };

  const fetchQuizArray = async (
    token: string,
    phase: number,
    category: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/quiz/period/2/category/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      setQuizHistoryData(data.result);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  console.log("test", quizHistoryData);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("key");
      if (!token) {
        console.error("Token is missing. Please log in.");
        await Swal.fire({
          title: "Please login again your token is expired!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        window.location.href = "/user/auth/login";
        return;
      }
    };
    if (token) {
      fetchQuizArray(token!, Number(param.phase), Number(param.category));
    } else {
      console.error("Invalid or missing parameter: id");
    }
    setLoading(false);

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
            การตรวจตามนัด {">>"} {decodedName} {">>"} {decodedPhase}
          </h1>

          <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[324px] flex flex-col gap-[10px]">
            <div className="z-10">
              {/* <ProgressBar {...combinedData} /> */}
            </div>

            {quizHistoryData && (
              <QuizForm
                props={quizHistoryData}
                param={`${quizHistoryData?.length}`}
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
    );
  }
};

export default page;
