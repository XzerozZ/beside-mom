import { BabyCardProps } from "@/app/interface";
import React, { FC } from "react";
import Image from "next/image";
import { ButtonComponents3 } from "./button";
import Link from "next/link";

export const BabyCard: FC<BabyCardProps> = (props) => {
  const { name, image, uid } = props;
  return (
    <div className="flex flex-col gap-8 w-[214px] max-sm:w-full">
      <Link href={`/baby/${uid}`}>
        <div className="w-44 h-44 rounded-full overflow-hidden mx-auto">
          <Image
            src={image}
            alt="Description of the image"
            width={176}
            height={176}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-bold text-[20px] text-center">{name}</h3>
        </div>
      </Link>
      <Link href={`/form/${name}?babyid=${uid}`}>
        <ButtonComponents3
          title="แบบประเมินพัฒนาการ "
          textSize={"font-[16px]"}
        />
      </Link>
    </div>
  );
};
