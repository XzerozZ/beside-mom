'use client'; // for Next.js App Router client components

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ChatMessage } from '../interface';

// Define the global state type
interface GlobalStateContextType {
  chatMessages: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Create context with proper typing
export const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Provider component
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Add a new message to the chat
  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  // Clear all chat messages
  const clearChatMessages = () => {
    setChatMessages([]);
  };

  // Load chat messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
          const messages = JSON.parse(savedMessages);
          setChatMessages(messages);
        }
      } catch (error) {
        console.error('Error loading chat messages from localStorage:', error);
      }
    }
  }, []);

  // Save chat messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && chatMessages.length > 0) {
      try {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
      } catch (error) {
        console.error('Error saving chat messages to localStorage:', error);
      }
    } else if (typeof window !== 'undefined' && chatMessages.length === 0) {
      // Clear localStorage when no messages
      localStorage.removeItem('chatMessages');
    }
  }, [chatMessages]);

  const value: GlobalStateContextType = {
    chatMessages,
    setChatMessages,
    addChatMessage,
    clearChatMessages,
    isLoading,
    setIsLoading,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook with proper return type and error handling
export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};