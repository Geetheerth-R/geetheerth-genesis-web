
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { useChatToggle } from "@/context/ChatContext";
import { useTheme } from "./ThemeProvider";

export function FloatingChatbot() {
  const [isVisible, setIsVisible] = useState(true);
  const { toggleChat } = useChatToggle();
  const { theme } = useTheme();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Chatbot Button */}
      <Button
        onClick={toggleChat}
        className={`rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
          theme === "dark"
            ? "bg-tech-purple hover:bg-tech-purple/90 text-white"
            : "bg-tech-purple hover:bg-tech-purple/90 text-white"
        }`}
        size="icon"
      >
        <MessageSquare size={24} />
        <span className="sr-only">Open Chat</span>
      </Button>
      
      {/* Close Button */}
      <Button
        onClick={() => setIsVisible(false)}
        variant="outline"
        size="icon"
        className="rounded-full w-8 h-8 opacity-60 hover:opacity-100"
      >
        <X size={16} />
        <span className="sr-only">Hide Chat</span>
      </Button>
    </div>
  );
}
