
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, Loader2 } from "lucide-react";
import { useChatToggle } from "@/context/ChatContext";
import { toast } from "@/components/ui/sonner";
import { useTheme } from "./ThemeProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Knowledge base with information about Geetheerth
const knowledgeBase = {
  // Personal information
  personal: {
    name: "Geetheerth R",
    location: "Chennai, India",
    email: "geetheerth@gmail.com",
    github: "github.com/geetheerth",
    education: {
      bachelors: {
        degree: "Bachelor of Engineering in Computer Science & Engineering",
        institution: "Sathyabama Institute of Science and Technology",
        period: "2021 - 2025",
        details: "Core subjects include Data Structures, Algorithms, Database Systems, Computer Networks, and Software Engineering."
      },
      highSchool: {
        institution: "Rockford School",
        period: "2019 - 2021",
        details: "Mathematics, Physics, Chemistry, Computer Science with an excellent academic record."
      },
      school: {
        institution: "The Titan School",
        period: "2006 - 2019",
        details: "Mathematics, Physics, Chemistry, Computer Science, Social Science, Tamil and English."
      }
    }
  },
  
  // Skills information
  skills: {
    programming: ["Python", "JavaScript", "Java", "C/C++", "HTML/CSS"],
    iot: ["Arduino", "Raspberry Pi", "ESP8266/32", "Sensors", "Actuators"],
    tools: ["Node-Red", "MQTT", "KiCAD", "VS Code", "MySQL"],
    softSkills: ["Problem Solving", "Team Collaboration", "Communication", "Project Management", "Time Management"],
    learningAreas: ["Cloud Computing", "Deep Learning", "Artificial Intelligence", "Blockchain"]
  },
  
  // Projects information
  projects: [
    {
      title: "Chatbot in WhatsApp",
      description: "Added a Chatbot in the WhatsApp Interface and made it function while users asks for any queries.",
      technologies: ["Python", "Flask", "AI"]
    },
    {
      title: "IoT based Home Automation - Fire Security System",
      description: "An IoT device which monitors real time sensor data and acts accordingly when a fire is detected.",
      technologies: ["Microcontroller", "Sensors and Actuators", "C++", "Blynk"]
    },
    {
      title: "AgriPulse - IoT based Greenhouse Monitoring System",
      description: "An IoT device which has an AI model which predicts the plant health and growth timespan using the real time sensor readings.",
      technologies: ["JavaScript", "AI", "C++"]
    }
  ],
  
  // Areas of expertise
  expertise: ["Web Development", "Embedded Systems", "UI/UX Design", "Problem Solving"],
  
  // Interests
  interests: ["Open-source projects", "Hackathons", "Digital art", "Chess", "Technology advancements"]
};

// Function to generate responses based on user queries
const generateResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Check for greetings
  if (/^(hi|hello|hey|greetings)/i.test(lowerQuery)) {
    return "Hello! I'm Geetheerth's portfolio assistant. How can I help you today?";
  }
  
  // Check for questions about name or introduction
  if (lowerQuery.includes("who are you") || lowerQuery.includes("introduce yourself") || lowerQuery.includes("about you") || lowerQuery.includes("who is geetheerth")) {
    return `Geetheerth R is a Computer Science & Engineering student from Chennai, India. He's passionate about technology and innovation, particularly in areas like web development, embedded systems, and AI.`;
  }
  
  // Check for questions about education
  if (lowerQuery.includes("education") || lowerQuery.includes("study") || lowerQuery.includes("college") || lowerQuery.includes("university") || lowerQuery.includes("school")) {
    return `Geetheerth's educational background includes:

1. Bachelor of Engineering in Computer Science & Engineering from Sathyabama Institute of Science and Technology (2021-2025)
2. Higher Secondary Education from Rockford School (2019-2021)
3. Secondary Education from The Titan School (2006-2019)

His coursework includes Data Structures, Algorithms, Database Systems, Computer Networks, and Software Engineering.`;
  }
  
  // Check for questions about skills
  if (lowerQuery.includes("skill") || lowerQuery.includes("know") || lowerQuery.includes("good at") || lowerQuery.includes("capable")) {
    let response = `Geetheerth has skills in multiple areas:\n\n`;
    
    response += `Programming Languages: ${knowledgeBase.skills.programming.join(", ")}\n`;
    response += `IoT & Embedded: ${knowledgeBase.skills.iot.join(", ")}\n`;
    response += `Tools & Technologies: ${knowledgeBase.skills.tools.join(", ")}\n`;
    response += `Soft Skills: ${knowledgeBase.skills.softSkills.join(", ")}\n\n`;
    
    response += `He's currently expanding his knowledge in ${knowledgeBase.skills.learningAreas.join(", ")}.`;
    return response;
  }
  
  // Check for questions about projects
  if (lowerQuery.includes("project") || lowerQuery.includes("work") || lowerQuery.includes("portfolio") || lowerQuery.includes("built") || lowerQuery.includes("created")) {
    let response = `Geetheerth has worked on several notable projects:\n\n`;
    
    knowledgeBase.projects.forEach((project, index) => {
      response += `${index + 1}. ${project.title}: ${project.description}\n`;
      response += `   Technologies used: ${project.technologies.join(", ")}\n\n`;
    });
    
    return response;
  }
  
  // Check for questions about contact information
  if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("reach") || lowerQuery.includes("github")) {
    return `You can contact Geetheerth at:
- Email: ${knowledgeBase.personal.email}
- GitHub: ${knowledgeBase.personal.github}
- Location: ${knowledgeBase.personal.location}

You can also use the contact form on this website to send him a message directly.`;
  }
  
  // Check for questions about what he does
  if (lowerQuery.includes("what do you do") || lowerQuery.includes("what does he do") || lowerQuery.includes("expertise") || lowerQuery.includes("specialization")) {
    return `Geetheerth specializes in:
1. Web Development - Building responsive and dynamic web applications
2. Embedded Systems - Creating innovative technologies with embedded systems
3. UI/UX Design - Designing professional user interfaces and experiences
4. Problem Solving - Finding innovative solutions to technical challenges`;
  }
  
  // Check for questions about interests
  if (lowerQuery.includes("interest") || lowerQuery.includes("hobby") || lowerQuery.includes("passion") || lowerQuery.includes("free time")) {
    return `Beyond academics and professional work, Geetheerth is interested in:
- Exploring open-source projects
- Participating in hackathons
- Digital art
- Playing chess
- Keeping up with the latest technology advancements`;
  }
  
  // Check for AgriPulse project
  if (lowerQuery.includes("agripulse") || (lowerQuery.includes("greenhouse") && lowerQuery.includes("monitoring"))) {
    const project = knowledgeBase.projects.find(p => p.title.includes("AgriPulse"));
    return `AgriPulse is an IoT-based Greenhouse Monitoring System that Geetheerth developed. This project uses real-time sensor readings to feed an AI model that predicts plant health and growth timespan. The technologies used include JavaScript, AI, and C++.`;
  }
  
  // Check for Fire Security project
  if (lowerQuery.includes("fire") || lowerQuery.includes("security") || lowerQuery.includes("home automation")) {
    const project = knowledgeBase.projects.find(p => p.title.includes("Fire"));
    return `The IoT-based Home Automation - Fire Security System is a project that monitors real-time sensor data and takes appropriate actions when a fire is detected. This system was built using microcontrollers, various sensors and actuators, C++ for programming, and the Blynk platform for remote monitoring and control.`;
  }
  
  // Check for Chatbot project
  if (lowerQuery.includes("chatbot") && lowerQuery.includes("whatsapp")) {
    const project = knowledgeBase.projects.find(p => p.title.includes("Chatbot"));
    return `Geetheerth developed a Chatbot for WhatsApp that can respond to user queries. This project was implemented using Python for the backend logic, Flask for the web server framework, and AI techniques for understanding and generating appropriate responses to user messages.`;
  }
  
  // Default response if no specific pattern is matched
  return "I'm Geetheerth's portfolio assistant. I can tell you about his education, skills, projects, and more. How can I help you learn more about him?";
};

export function Chatbot() {
  const { isOpen, closeChat } = useChatToggle();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm your personal assistant. Ask me anything about this portfolio website!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input } as Message;
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate network delay for a more natural feeling
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate response using our custom function
      const responseText = generateResponse(input);
      
      const assistantMessage = { 
        role: "assistant", 
        content: responseText 
      } as Message;
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: "Sorry, I'm having trouble processing your request. Please try again." }
      ]);
      toast.error("Failed to generate response");
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
    </div>
  );
}
