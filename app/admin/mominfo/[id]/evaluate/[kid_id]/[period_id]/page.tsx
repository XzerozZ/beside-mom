"use client";

import React, { useState, useEffect } from "react";
import { useParams} from "next/navigation";
import {
  Container,
} from "@mui/material";
import Sidebar from "../../../../../components/SideBarAdmin";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { EvaluateDataAPI, EvaluatePeriods } from "@/app/admin/types";

const periodMap: Record<number, string> = {
    1: "แรกเกิด",
    2: "1 เดือน",
    3: "2 เดือน",
    4: "3 - 4 เดือน",
    5: "5 - 6 เดือน",
    6: "7-8 เดือน",
    7: "9 เดือน",
    8: "10-12 เดือน",
  };

const ContactNurseInfo: React.FC = () => {

  const params = useParams();
  const kid_id = params.kid_id as string;
  const period_id = params.period_id as string;

  const [evaluateData, setEvaluateData] = useState<EvaluateDataAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_url}/history/evaluate/${period_id}/kid/${kid_id}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");
      const data = await res.json();
      console.log(data.result);
      setEvaluateData(data.result);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
    };
    fetchData();
  }, [kid_id, period_id]);

  return (
    <div className="flex bg-white ">
      <Sidebar 
       selectedItem="1"
      />
      <div className="flex-1 p-6">
        <Container>
        <h1 className="text-neutral05 font-bold mb-5">
          แบบประเมินพัฒนาการ &gt;&gt; {periodMap[Number(period_id)]}
        </h1>
        {loading ? (
          <div>กำลังโหลดข้อมูล...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : evaluateData ? (
          <div className="space-y-4">
            {Object.entries(evaluateData).map(([category, periods]: [string, EvaluatePeriods]) => {
            
              const periodKeys = Object.keys(periods).sort((a, b) => Number(a) - Number(b));
              const lastPeriodKey = periodKeys.length > 0 ? periodKeys[periodKeys.length - 1] : undefined;
              if (!lastPeriodKey) return null;
              const detail = periods[lastPeriodKey];
              
              return (
                <div key={category} className="border rounded-xl p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg text-neutral05">{category}</div>
                    <div className="flex items-center gap-2 min-w-[80px] justify-end">
                      {detail.solution_status === "ผ่าน" ? (
                        <CheckCircleIcon className="text-green-500" />
                      ) : detail.solution_status === "รอประเมิน" ? (
                        <InfoOutlinedIcon style={{ color: "#F88000" }} />
                      ) : (
                        <CancelIcon className="text-red-500" />
                      )}
                      <span className={
                        detail.solution_status === "ผ่าน" 
                          ? "text-green-600 font-medium" 
                          : detail.solution_status === "รอประเมิน"
                          ? "font-medium"
                          : "text-red-600 font-medium"
                      } style={detail.solution_status === "รอประเมิน" ? { color: "#F88000" } : {}}>{detail.solution_status}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {detail.Histories.map((history, index) => (
                      <div key={history.H_id} className="text-base font-medium text-neutral05">
                        {index + 1}. {history.quiz.question}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>ไม่พบข้อมูล</div>
        )}
        </Container>
      </div>
    </div>
  );
};

export default ContactNurseInfo;
