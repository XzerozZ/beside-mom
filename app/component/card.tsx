import { CareItem, VideoClip } from "@/app/interface";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export const Card: FC<VideoClip> = (props) => {
  const formatDate = (dateString: string): string => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist calendar year
    return `${day} ${month} ${year}`;
  };

  const formattedDate = formatDate(props.publish_at);

  return (
    <Link href={`/story/${props.id}`}>
      <div className="shadow-[0_0_10px_#ccc] rounded-[16px] ">
        <div className="w-full h-[158px] relative">
          <Image
            className="bg-black rounded-t-[16px] object-cover h-[158px]"
            src={props.banner}
            alt="mom"
            fill
          />
        </div>

        <div className="h-[102px] flex flex-col justify-between p-[16px]">
          <div className="font-bold">
            <h1 className="text-[16px]">{props.title}</h1>
          </div>
          <h2 className="text-[12px] text-[#999999]">{formattedDate}</h2>
        </div>
      </div>
    </Link>
  );
};

export const CardCare: FC<CareItem> = (props) => {
  const formatDate = (dateString: string): string => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist calendar year
    return `${day} ${month} ${year}`;
  };
  const formattedDate = formatDate(props.created_at);

  return (
    <Link href={`/care/${props.c_id}`}>
      <div className="shadow-[0_0_10px_#ccc] rounded-[16px]">
        <div className="w-full h-[158px] relative">
          <Image
            className="bg-black rounded-t-[16px] object-cover h-[158px]"
            src={props.banner}
            alt="mom"
            fill
          />
        </div>

        <div className="h-[102px] flex flex-col justify-between p-[16px]">
          <div className="font-bold">
            <h1 className="text-[16px]">{props.title}</h1>
          </div>
          <h2 className="text-[12px] text-[#999999]">{formattedDate}</h2>
        </div>
      </div>
    </Link>
  );
};
