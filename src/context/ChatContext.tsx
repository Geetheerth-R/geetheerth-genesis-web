
import { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  isOpen: boolean;
  toggleChat: () => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <ChatContext.Provider value={{ isOpen, toggleChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatToggle() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatToggle must be used within a ChatProvider");
  }
  return context;
}
