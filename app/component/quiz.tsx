"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ButtonComponents6Size, ButtonComponents5Size } from "./button";
import { Quiz } from "@/app/interface";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const QuizForm: React.FC<{
  props: Quiz[];
  navigate: string;
  history: Quiz[];
  index: number;
  babyId: string;
}> = ({ props, navigate, index, babyId }) => {
  const useParam = useParams();
  const router = useRouter();
  console.log("useParam", useParam);
  const quizIds: number[] = props.map((item) => item.quiz_id);

  // Store quizIds in localStorage with key 'No{phase}+{category}'
  React.useEffect(() => {
    const phase = useParam.phase;
    const category = useParam.category;
    if (phase && category && quizIds.length > 0) {
      localStorage.setItem(`No${phase}+${category}`, JSON.stringify(quizIds));
    }
  }, [quizIds, useParam.phase, useParam.category]);

  // const isAnswered = history[Number(param)-1]?.answer;

  const [isAnswered, setIsAnswered] = React.useState<boolean | null>(null);

  const [quiz, setQuiz] = React.useState<Quiz>();
  // const [quizNex, setQuizNext] = React.useState<boolean>(false);

  const fetchQuizById = async (
    id: number,
    token: string,
    phase: number,
    category: number
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_url}/quiz/period/${phase}/category/${category}/question/${id}`,
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
      setQuiz(data.result);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };
  // const fetchQuizByIdInNext = async (id: number, token: string,phase:number,category:number) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_url}/quiz/period/${phase}/category/${category}/question/${id + 1}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       setQuizNext(true);
  //     }
  //   } catch {}
  // };

  const handleAnswer = (value: boolean, phase: number, category: number) => {
    const storedAnswers = JSON.parse(
      localStorage.getItem(`quizAnswers${phase}+${category}`) || "[]"
    );

    const quizId = Number(quiz?.quiz_id);
    const arrayInQuizString = localStorage.getItem(`No${phase}+${category}`);
    const arrayInQuiz: number[] = arrayInQuizString
      ? JSON.parse(arrayInQuizString)
      : [];

    // Get index of quizId in arrayInQuiz
    const positionInArray = arrayInQuiz.indexOf(quizId);

    // You can now use `positionInArray` as needed (e.g., to store answer)
    // Make sure storedAnswers has enough length
    while (storedAnswers.length <= positionInArray) storedAnswers.push(null);

    if (positionInArray !== -1) {
      storedAnswers[positionInArray] = value;
    }

    localStorage.setItem(
      `quizAnswers${phase}+${category}`,
      JSON.stringify(storedAnswers)
    );
  };

  const handleSubmit = async (
    phase: number,
    category: number,
    babyid: string
  ) => {
    const storedAnswers = JSON.parse(
      localStorage.getItem(`quizAnswers${phase}+${category}`) || "[]"
    );
    const token = localStorage.getItem("token");
    const filteredAnswers = storedAnswers.filter(
      (ans: boolean) => ans !== null
    );
    const formData = new FormData();
    // filteredAnswers.forEach((answer: boolean) => {
    //   formData.append(`answer`, answer.toString());
    //   console.log("this is formData", Array.from(formData.entries()));
    // });
    // for (const answer of filteredAnswers) {
    //   formData.append("answer", answer);
    // }
    filteredAnswers.forEach((answer: string) => {
      formData.append("answer", answer);
    });

    if (token) {
      try {
        if (!token) {
          throw new Error("Authorization token not found");
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_url}/history/evaluate/${phase}/category/${category}/kid/${babyid}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        console.log("this is response", response);
        if (!response.ok) {
          throw new Error("Failed to submit answer");
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && index) {
      fetchQuizById(
        Number(index),
        token,
        Number(useParam.phase),
        Number(useParam.category)
      );
    } else {
      console.error("Token not found in local storage");
    }

    const storedAnswers = JSON.parse(
      localStorage.getItem("quizAnswers") || "[]"
    );
    const previousAnswer = storedAnswers[Number(index) - 1];
    if (previousAnswer !== null && previousAnswer !== undefined) {
      setIsAnswered(previousAnswer);
    }
    // try {
    //   fetchQuizByIdInNext(Number(index), localStorage.getItem("key") || "",Number(useParam.phase),Number(useParam.category));
    // } catch  {
    //   console.log("hello");
    // }
  }, [useParam.phase, useParam.category, index]);

  // Determine if this is the last quiz in the sequence
  const isLastQuiz = React.useMemo(() => {
    const phase = useParam.phase;
    const category = useParam.category;
    const quizIdsStr = localStorage.getItem(`No${phase}+${category}`);
    if (quizIdsStr && quiz?.quiz_id) {
      const quizIds = JSON.parse(quizIdsStr);
      return quiz?.quiz_id === quizIds[quizIds.length - 1];
    }
    return false;
  }, [quiz?.quiz_id, useParam.phase, useParam.category]);

  // Check if props array is empty
  if (props.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg gap-4">
        <p className="text-gray-600 text-lg font-medium">ไม่มีแบบทดสอบ</p>
        <ButtonComponents6Size
          title="ย้อนกลับ"
          textSize="text-[16px]"
          boxSize="w-[180px] max-sm:w-full"
          onClick={() => router.back()}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex p-[20px] gap-[80px] max-sm:flex-col max-sm:gap-8">
        <div>
          <Image src="/baby.png" alt="baby" width={300} height={300}></Image>
        </div>
        <div className="flex flex-col gap-[16px]">
          <h1 className="font-bold text-[20px] text-[#4d4d4d]">
            {quiz?.question}
          </h1>
          <div className="text-[16px] text-[#4d4d4d]">
            <div className="whitespace-pre-wrap font-sans">{quiz?.desc}</div>
            <h3 className="font-bold">ผลลัพธ์ที่ควรเกิดขึ้น:</h3>{" "}
            <h3 className="">{quiz?.solution}</h3>
            {/* <h3 className="font-bold">คำแนะนำ:</h3> <h3 className="">{props[0].suggestion}</h3> */}
          </div>
          <div className="flex gap-[10px]">
            <div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex gap-4 flex-col">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question-${quiz?.quiz_id}`}
                      value="true"
                      checked={isAnswered === true}
                      className="accent-[#B36868]"
                      onChange={() => {
                        setIsAnswered(true);
                      }}
                    />
                    ผ่าน
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question-${quiz?.quiz_id}`}
                      value="true"
                      checked={isAnswered === false}
                      className="accent-[#B36868]"
                      onChange={() => {
                        setIsAnswered(false);
                      }}
                    />
                    ไม่ผ่าน
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLastQuiz ? (
        <div className="flex flex-row gap-[16px] justify-between max-sm:gap-3 max-sm:flex-col-reverse">
          <ButtonComponents6Size
            title="ย้อนกลับ"
            textSize="text-[16px]"
            boxSize="w-[180px] max-sm:w-full"
            onClick={() => window.history.back()}
          />
          <ButtonComponents5Size
            title="ส่งคำตอบ"
            textSize="text-[16px]"
            boxSize="w-[180px] max-sm:w-full"
            onClick={() => {
              handleAnswer(
                isAnswered as boolean,
                Number(useParam.phase),
                Number(useParam.category)
              );
              handleSubmit(
                Number(useParam.phase),
                Number(useParam.category),
                babyId
              );
              if (isAnswered == false) {
                Swal.fire({
                  title: "คำแนะนำ",
                  html: `<pre style="font-family: 'Noto Sans Thai', sans-serif; white-space: pre-wrap;">${props[0].suggestion}</pre>`,
                  icon: "info",
                  confirmButtonText: "ตกลง",
                  confirmButtonColor: "#B36868",
                }).then(() => {
                  router.push(`/form/${useParam.name}/${useParam.phase}/?babyid=${babyId}`);
                });
                return;
              } else {
                  router.push(`/form/${useParam.name}/${useParam.phase}/?babyid=${babyId}`);
              }
            }}
          />
        </div>
      ) 
      // : quiz?.quiz_id === 1 ? (
      //   <div className="flex flex-row gap-[16px] justify-end max-sm:gap-3 max-sm:flex-col-reverse">
      //     <Link href={`${quiz?.quiz_id + 1}`}>
      //       <ButtonComponents5Size
      //         title="ต่อไป"
      //         textSize="text-[16px]"
      //         boxSize="w-[180px] max-sm:w-full"
      //         onClick={async () => {
      //           await new Promise((resolve) => setTimeout(resolve, 1000));

      //           handleAnswer(
      //             isAnswered as boolean,
      //             Number(useParam.phase),
      //             Number(useParam.category)
      //           );
      //         }}
      //       />
      //     </Link>
      //   </div>
      // ) 
      : (
        <div className="flex flex-row gap-[16px] justify-between max-sm:gap-3 max-sm:flex-col-reverse">
          <ButtonComponents6Size
            title="ย้อนกลับ"
            textSize="text-[16px]"
            boxSize="w-[180px] max-sm:w-full"
            onClick={() => router.back()}
          />

          {isAnswered !== null ? (
            <ButtonComponents5Size
              title="ต่อไป"
              textSize="text-[16px]"
              boxSize="w-[180px] max-sm:w-full"
              onClick={async () => {
                // handleAnswer(
                //   isAnswered as boolean,
                //   Number(useParam.phase),
                //   Number(useParam.category)
                // );
                // Get quizIds from localStorage and go to next quiz
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const phase = useParam.phase;
                const category = useParam.category;
                const quizIdsStr = localStorage.getItem(
                  `No${phase}+${category}`
                );
                if (quizIdsStr) {
                  const quizIds = JSON.parse(quizIdsStr);
                  const currentQuizId = quiz?.quiz_id;
                  const currentIndex = quizIds.findIndex(
                    (id: number) => id === currentQuizId
                  );
                  if (
                    currentIndex !== -1 &&
                    currentIndex + 1 < quizIds.length
                  ) {
                    const nextQuizId = quizIds[currentIndex + 1];
                   
                    if (isAnswered == false) {
                      Swal.fire({
                        title: "คำแนะนำ",
                        html: `<pre style="font-family: 'Noto Sans Thai', sans-serif; white-space: pre-wrap;">${props[0].suggestion}</pre>`,
                        icon: "info",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#B36868",
                      }).then(() => {
                        window.location.href = `/form/${useParam.name}/${useParam.phase}/${useParam.category}/${nextQuizId}?babyid=${babyId}`;
                      });
                      return;
                    } else {
                      console.log("nextQuizId", nextQuizId);
                      console.log("navi", navigate);
                      window.location.href = `/form/${useParam.name}/${useParam.phase}/${useParam.category}/${nextQuizId}?babyid=${babyId}`;

                    }
                  }
                }
              }}
            />
          ) : (
            <ButtonComponents5Size
              title="ต่อไป"
              textSize="text-[16px]"
              boxSize="w-[180px] max-sm:w-full opacity-50 cursor-not-allowed"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizForm;
