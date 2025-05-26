import React from "react";
import Navbar from "../component/navbar";

const home = () => {
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[80px]">
        <div
          className="bg-cover bg-center h-screen flex justify-center items-center max-xl:bg-[url('/home2.png')] max-sm:!bg-none max-sm:items-start max-sm:mt-[40px]"
          style={{ backgroundImage: "url('/home.png')" }}
        >
          <div className="w-[1312px] xl:mt-[-90px] md:mt-[-150px] rounded-[40px] flex flex-col  gap-[24px] max-xl:w-[770px] max-sm:w-[324px]">
            <div className="flex gap-[24px]">
              <h1 className="text-[#4D4D4D] text-[36px] font-bold max-xl:text-[24px] ">
                Beside Mom การคลอดลูกก่อนกำหนด
                <div className="text-[#B36868] flex flex-col text-[36px] max-xl:text-[24px]">
                  <h3>แม้ลูกน้อยจะมาเร็วกว่าที่คิด</h3>
                  <h3>แต่แม่พร้อมสร้างเกราะ</h3>
                  <h3>แห่งความปลอดภัยให้ทุกก้าวของเขา</h3>
                </div>
              </h1>
            </div>

            <div className="text-[20px]  max-xl:text-[16px]">
              <h3>
                เมื่อ คุณแม่ตั้งครรภ์ และมีการฝากครรภ์กับแพทย์ไประยะหนึ่งแล้ว
              </h3>
              <h3>
                ก็จะเริ่มมีการกำหนดช่วงวันที่คุณแม่น่าจะคลอดบุตรไว้ล่วงหน้า
                อย่างไรก็ตาม!
              </h3>
              <h3>
                ระหว่างการตั้งครรภ์คุณแม่ควรหมั่นดูแลสุขภาพและปฏิบัติตามคำแนะนำของแพทย์
              </h3>
              <h3>เพื่อลดความเสี่ยงในการเจ็บครรภ์คลอดก่อนกำหนด</h3>
            </div>
         
           
          </div>
        </div>
      </main>
    </div>
  );
};

export default home;
