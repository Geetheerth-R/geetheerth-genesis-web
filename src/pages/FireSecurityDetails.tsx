
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FireSecurityDetails = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-tech-red">Fire Security System</h1>
              <p className="text-xl text-muted-foreground">IoT-based Home Automation for Fire Detection and Response</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <img 
                  src="/lovable-uploads/fire.jpg" 
                  alt="Fire Security System" 
                  className="w-full rounded-xl shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Smart Home Fire Detection" 
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
              
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-tech-blue">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    An intelligent IoT-based fire security system designed to provide early fire detection and automated response 
                    for home automation. The system continuously monitors environmental conditions and responds immediately when 
                    fire hazards are detected.
                  </p>
                  <p className="text-muted-foreground">
                    This project combines multiple sensors with smart actuators to create a comprehensive fire safety solution 
                    that can potentially save lives and property through rapid detection and response.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-tech-purple">Key Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Real-time smoke and temperature monitoring</li>
                    <li>• Automatic fire extinguisher activation</li>
                    <li>• Emergency alert notifications</li>
                    <li>• Gas leak detection</li>
                    <li>• Remote monitoring via Blynk app</li>
                    <li>• Backup power systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <img 
                src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Fire Alarm System" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Smoke Detector" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="IoT Control Panel" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="bg-card rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-tech-cyan">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {["Microcontroller", "C++", "Sensors & Actuators", "Blynk IoT", "Emergency Systems", "Mobile Integration", "Real-time Monitoring"].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-secondary rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button asChild className="bg-gradient-to-r from-tech-red to-tech-orange hover:opacity-90">
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

export default FireSecurityDetails;
