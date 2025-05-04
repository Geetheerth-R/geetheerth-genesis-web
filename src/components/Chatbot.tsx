
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, Loader2 } from "lucide-react";
import { useChatToggle } from "@/context/ChatContext";
import { toast } from "@/components/ui/sonner";
import { useTheme } from "./ThemeProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const { isOpen, closeChat } = useChatToggle();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm your personal assistant. Ask me anything about this portfolio website!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiKeySet, setApiKeySet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setApiKeySet(true);
      toast.success("API key has been set!");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input } as Message;
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are an assistant for Geetheerth R's portfolio website. Provide concise, informative responses about Geetheerth's skills, projects, experience, and background. Keep responses short and relevant."
            },
            ...messages,
            userMessage
          ],
          max_tokens: 400,
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Something went wrong with the API request");
      }
      
      const assistantMessage = { 
        role: "assistant", 
        content: data.choices[0].message.content 
      } as Message;
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: "Sorry, there was an error processing your request. Please try again later." }
      ]);
      toast.error("Failed to get response from AI");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-full max-w-sm rounded-xl shadow-xl ${theme === "dark" ? "bg-dark-100" : "bg-white"} border border-border flex flex-col overflow-hidden transition-all duration-300 animate-fade-in`}>
      <div className={`p-3 flex justify-between items-center border-b ${theme === "dark" ? "bg-dark-200" : "bg-gray-50"}`}>
        <h3 className="font-semibold">Portfolio Assistant</h3>
        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" onClick={closeChat}>
          <X size={16} />
        </Button>
      </div>
      
      {!apiKeySet ? (
        <div className="p-4 flex-grow flex flex-col">
          <p className="mb-4 text-sm text-muted-foreground">Please enter your OpenAI API key to continue:</p>
          <form onSubmit={handleApiKeySubmit} className="space-y-3">
            <Input 
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
              className="w-full"
            />
            <Button type="submit" className="w-full bg-tech-blue hover:bg-tech-blue/90">
              Submit API Key
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Your API key is stored locally in your browser and is not sent to our servers.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-grow p-3 overflow-y-auto max-h-[350px]">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div 
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      msg.role === "user" 
                        ? `${theme === "dark" ? "bg-tech-blue text-white" : "bg-tech-blue text-white"}`
                        : `${theme === "dark" ? "bg-dark-200" : "bg-gray-100"}`
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className={`p-3 border-t ${theme === "dark" ? "border-dark-200" : "border-gray-200"} flex gap-2`}>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className={`min-h-[40px] max-h-[120px] resize-none ${theme === "dark" ? "bg-dark-200 border-dark-200" : ""}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button 
              type="submit" 
              size="icon"
              className={`bg-tech-purple hover:bg-tech-purple/90 text-white rounded-lg h-10 w-10 ${
                isLoading || !input.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
