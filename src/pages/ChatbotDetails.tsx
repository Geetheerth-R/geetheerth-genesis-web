
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ChatbotDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-2" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Button>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-tech-green">WhatsApp Chatbot</h1>
              <p className="text-xl text-muted-foreground">AI-Powered Conversational Assistant for WhatsApp</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <img 
                  src="/lovable-uploads/chatbot.jpg" 
                  alt="WhatsApp Chatbot Interface" 
                  className="w-full rounded-xl shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="AI Chatbot Technology" 
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
              
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-tech-blue">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    A sophisticated AI-powered chatbot integrated seamlessly into the WhatsApp platform. This intelligent 
                    assistant is designed to handle user queries efficiently, providing instant responses and maintaining 
                    contextual conversations.
                  </p>
                  <p className="text-muted-foreground">
                    The chatbot leverages natural language processing and machine learning algorithms to understand user 
                    intent and provide relevant, helpful responses across a wide range of topics and use cases.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-tech-purple">Key Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Natural language understanding</li>
                    <li>• Context-aware conversations</li>
                    <li>• Multi-language support</li>
                    <li>• Quick response templates</li>
                    <li>• User session management</li>
                    <li>• Analytics and insights</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <img 
                src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Mobile Chat Interface" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="AI Processing" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Message Analytics" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="bg-card rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-tech-cyan">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {["Python", "Flask", "AI/ML", "Natural Language Processing", "WhatsApp API", "Database Integration", "Cloud Deployment"].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-secondary rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button asChild className="bg-gradient-to-r from-tech-green to-tech-blue hover:opacity-90">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatbotDetails;
