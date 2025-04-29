"use client"
import React, { useEffect } from 'react'
import Navbar from '../component/navbar';
import Qabox from '../component/qabox';
import { QuestionAnswer } from '@/app/interface';

const page = () => {
   const [question, setQuestion] = React.useState<QuestionAnswer[]>();
    const fetchQA = async () => {
      try {
        const res = await fetch(`http://localhost:5000/question`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1c2VyX2lkIjoiNmFjMDQ4OGQtYWFiMS00YjhiLWJhYzUtMTgxNjg2M2JhOWYwIn0.IOe-r5myKw2a3SnU-1AVNWjqtUg0Eqgs_TCZPHXbt1U`,
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          setQuestion(data.result);
        } else {
          console.error("Failed to fetch kid data");
        }
      } catch (error) {
        console.error("An error occurred while fetching kid data:", error);
      }
    };
    
    useEffect(() => {
      fetchQA();
    }, []);
    console.log(question);


    return (
        <div className="flex flex-col">
        <header className="fixed top-0 left-0 w-full">
          <Navbar />
        </header>
        <main className="mt-[112px] max-sm:mt-[112px]">
         <div className="">
         <div className="flex flex-col items-center gap-[30px]">
            <h1 className="font-bold w-[1312px] text-[20px] text-left max-xl:w-[770px] max-sm:w-[324px]">
              คำถามที่พบบ่อย
            </h1>
            <div className="w-[1312px] max-xl:w-[770px] max-sm:w-[358px] flex flex-col gap-[40px]">
              {question?.map((qa, index) => (
              <Qabox key={index} {...qa} />
              ))}
            </div>
          </div>
        
          
         </div>
        </main>
      </div>
      );
}

export default page