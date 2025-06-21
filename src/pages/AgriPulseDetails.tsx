
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AgriPulseDetails = () => {
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
              <h1 className="text-4xl font-bold mb-4 text-tech-green">AgriPulse</h1>
              <p className="text-xl text-muted-foreground">IoT based Greenhouse Monitoring System with AI Predictions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <img 
                  src="/lovable-uploads/ee3580d7-5395-4bba-8660-f7aeddc6f247.png" 
                  alt="AgriPulse System" 
                  className="w-full rounded-xl shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Smart Greenhouse Technology" 
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
              
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-tech-blue">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    AgriPulse is an advanced IoT-based greenhouse monitoring system that revolutionizes traditional farming practices. 
                    The system integrates real-time sensor data collection with artificial intelligence to provide intelligent insights 
                    about plant health and growth predictions.
                  </p>
                  <p className="text-muted-foreground">
                    Using a combination of environmental sensors and machine learning algorithms, AgriPulse helps farmers optimize 
                    their crop yields while reducing resource consumption and improving sustainability.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-tech-purple">Key Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Real-time environmental monitoring (temperature, humidity, soil moisture)</li>
                    <li>• AI-powered plant health analysis</li>
                    <li>• Growth timespan predictions</li>
                    <li>• Automated irrigation control</li>
                    <li>• Mobile app integration</li>
                    <li>• Data analytics dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Greenhouse Interior" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="IoT Sensors" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1586281010691-9bfe74092ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Plant Growth Monitoring" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="bg-card rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-tech-cyan">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {["JavaScript", "AI/ML", "C++", "IoT Sensors", "Microcontrollers", "Data Analytics", "Mobile Development"].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-secondary rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button asChild className="bg-gradient-to-r from-tech-blue to-tech-green hover:opacity-90">
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

export default AgriPulseDetails;
