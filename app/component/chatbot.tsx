"use client";
import React from "react";
import Image from "next/image";
import { ChatMessage } from "@/app/interface";

interface ChatbotProps {
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ showChat, setShowChat }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Helper function to get current time
  const getCurrentTime = React.useCallback(() => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  }, []);

  // Initialize chat with default messages
  const initializeChat = React.useCallback(() => {
    if (!isInitialized) {
      const time = getCurrentTime();
      setMessages([
        { id: 1, response: "สวัสดีค่ะ ยินดีต้อนรับสู่ระบบแชทของพยาบาล", sender: "nurse", sent_at: time },
        { id: 2, response: "มีอะไรให้พยาบาลช่วยเหลือไหมคะ?", sender: "nurse", sent_at: time }
      ]);
      setIsInitialized(true);
    }
  }, [isInitialized, getCurrentTime]);

  // Fetch existing chat messages
  const fetchChatHistory = React.useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${process.env.NEXT_PUBLIC_url}/user/chat`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result && Array.isArray(data.result) && data.result.length > 0) {
          setMessages(data.result);
          setIsInitialized(true);
        } else {
          initializeChat();
        }
      } else {
        initializeChat();
      }
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
      initializeChat();
    }
  }, [initializeChat]);

  // Initialize chat when component opens
  React.useEffect(() => {
    if (showChat && !isInitialized) {
      fetchChatHistory();
    }
  }, [showChat, isInitialized, fetchChatHistory]);

  const sendMessage = React.useCallback(async () => {
    if (!newMessage.trim() || isLoading) return;
    
    setIsLoading(true);
    const messageText = newMessage.trim();
    const currentTime = getCurrentTime();
    
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now(),
      response: messageText,
      sender: "user",
      sent_at: currentTime
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage(""); // Clear input immediately

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token");
      }

      const formData = new FormData();
      formData.append("message", messageText);
     
      const response = await fetch(`${process.env.NEXT_PUBLIC_url}/user/chat`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

  
      const responseData = await response.json();
      
      // Add nurse response
      const nurseMessage: ChatMessage = {
        id: Date.now() + 1,
        response: responseData?.message?.response || "ขอบคุณสำหรับข้อความค่ะ พยาบาลจะตอบกลับในไม่ช้า",
        sender: "nurse",
        sent_at: responseData?.sent_at || getCurrentTime()
      };
      // Update messages with nurse response
      console.log("Nurse response:", responseData);
  
     
      setMessages(prev => [...prev, nurseMessage]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add fallback nurse response
      const fallbackMessage: ChatMessage = {
        id: Date.now() + 1,
        response: "ขออภัยค่ะ เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง",
        sender: "nurse",
        sent_at: getCurrentTime()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [newMessage, isLoading, getCurrentTime]);

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-5 right-3 p-4 max-xl:bottom-[30px]">
        <div 
          className="rounded-full bg-[#fff] w-[80px] h-[80px] justify-center items-center flex shadow-lg shadow-[#cccccc] cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowChat(!showChat)}
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
                    {message.sent_at}
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
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                placeholder={isLoading ? "กำลังส่งข้อความ..." : "พิมพ์ข้อความ..."}
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#B36868] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !newMessage.trim()}
                className="bg-[#B36868] hover:bg-[#A05858]   text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Image src="/send.svg" width={16} height={16} alt="send" className="filter brightness-0 invert" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
