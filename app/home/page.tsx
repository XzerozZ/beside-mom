import React from "react";
import Navbar from "../component/navbar";

const home = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="fixed top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-[80px] h-full overflow-hidden">
        <div
          className="bg-cover bg-center h-full flex justify-center items-center max-xl:bg-[url('/home2.png')] max-sm:!bg-none max-sm:items-start max-sm:mt-[40px] overflow-hidden"
          style={{ backgroundImage: "url('/home.png')" }}
        >
          <div className="w-[1312px] xl:mt-[-90px] md:mt-[-150px] rounded-[40px] flex flex-col  gap-[20px] max-xl:w-[770px] max-sm:w-[324px]">
            <div className="flex gap-[24px]">
              <h1 className="text-[#4D4D4D] text-[36px] font-bold max-xl:text-[24px] ">
                <div className="text-[#B36868] flex flex-col text-[36px] max-xl:text-[24px]">
                  <h3>&apos;Beside Mom&apos; อยู่เคียงข้างคุณแม่</h3>
                  <h3>ตั้งแต่ลมหายใจแรกของลูกน้อย</h3>
                </div>
              </h1>
            </div>

            <div className="text-[20px]  max-xl:text-[16px]">
              <h3>Beside Mom</h3>
              <h3>
                เป็นพื้นที่ปลอดภัยที่คุณแม่จะได้เรียนรู้เรื่องราวของทารกคลอดก่อนกำหนด
              </h3>
              <h3>
                การติดตามพัฒนาการของลูกน้อย
                และความรู้สำหรับการดูแลลูกน้อยจากผู้เชี่ยวชาญ
              </h3>
            </div>
            <div className="text-[20px]  max-xl:text-[16px]">
              <h3>และในทุกวันของการดูแลลูกน้อย...Beside Mom</h3>
              <h3>ขอเป็นอีกหนึ่งกำลังใจ ที่อยู่ข้างคุณแม่เสมอ</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default home;
