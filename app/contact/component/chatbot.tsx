"use client";
import React from "react";
import Image from "next/image";
import { ChatMessage } from "@/app/interface";

interface ChatbotProps {
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ showChat, setShowChat }) => {
const [time, setTime] = React.useState<string>(() => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: 1, response: "สวัสดีค่ะ ยินดีต้อนรับสู่ระบบแชทของพยาบาล", sender: "nurse", sent_at: time },
    { id: 2, response: "มีอะไรให้พยาบาลช่วยเหลือไหมคะ?", sender: "nurse", sent_at: time }
  ]);
  const [newMessage, setNewMessage] = React.useState("");
  const [ResponseMessage, setResponseMessage] = React.useState<ChatMessage>();

  const sendMessage = async () => {
    
      const now = new Date();
      
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      setMessages([...messages, { 
        id: messages.length + 1, 
        response: ResponseMessage?.response || "", 
        sender: "user", 
        sent_at: time
      }]);

      const formData = new FormData();
      formData.append("message", newMessage);
     
      const response = await fetch(`${process.env.NEXT_PUBLIC_url}/user/chat`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const responseData = await response.json();
      setResponseMessage(responseData);
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          id: prevMessages.length + 1, 
          response: responseData.response, 
          sender: "nurse", 
          sent_at: responseData.sent_at || time 
        }
      ]);

      
     
     
    
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-5 right-3 p-4 max-xl:bottom-[30px]">
        <div 
          className="rounded-full bg-[#fff] w-[80px] h-[80px] justify-center items-center flex shadow-lg shadow-[#cccccc] cursor-pointer hover:scale-105 transition-transform"
          onClick={() => {
            setShowChat(!showChat);
            setTime("");
          }}
        >
          <div className="rounded-full bg-[#B36868] w-[65px] h-[64px] justify-center items-center flex">
            <Image
              src="/token_chat.svg"
              width={44}
              height={44}
              alt="token_chat"
            />
          </div>
        </div>
      </div>

      {/* Chat Frame */}
      <div className={`fixed bottom-[90px] right-[82px] p-4 max-xl:bottom-[100px] transition-opacity duration-300 ${showChat ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Image
          src="/chatframe.svg"
          width={160}
          height={40}
          alt="token_chat"
        />
      </div>

      {/* Chat Popup */}
      {showChat && (
        <div className="fixed bottom-[50px] right-3 w-[350px] h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col max-sm:w-[300px] max-sm:right-2">
          {/* Chat Header */}
          <div className="bg-[#B36868] text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Image src="/fa-solid_user-nurse.svg" width={16} height={16} alt="nurse" />
              </div>
              <div>
                <h3 className="font-bold text-sm">พยาบาลออนไลน์</h3>
                <p className="text-xs opacity-90">ออนไลน์</p>
              </div>
            </div>
            <button 
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <Image src="/x.svg" width={16} height={16} alt="close" className="filter invert brightness-0" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-[#B36868] text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  <p className="text-sm">{message.response}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'}`}>
                    {message.response}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#B36868]"
              />
              <button
                onClick={sendMessage}
                className="text-white rounded-full w-10 h-10 flex items-center justify-center"
              >
                <Image src="/send.svg" width={30} height={30} alt="send" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
