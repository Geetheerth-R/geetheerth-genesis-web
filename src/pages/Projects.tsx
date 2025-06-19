
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronLeft, Info } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Chatbot } from "@/components/Chatbot";
import { ProjectDomains } from "@/components/ProjectDomains";
import { motion, AnimatePresence } from "framer-motion";

// Project domains
const domains = [
  {
    id: "iot",
    name: "IoT & Embedded Systems",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Projects focused on Internet of Things, embedded systems, sensors, and smart devices."
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    description: "Projects utilizing artificial intelligence, machine learning, and data science."
  },
  {
    id: "aero",
    name: "Aerospace Engineering",
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Projects related to aerospace technologies, aircraft systems, and aviation."
  }
];

// Projects data with domain assignments
const projects = [{
  title: "Chatbot in WhatsApp",
  description: "Added a Chatbot in the WhatsApp Interface and made it function while users asks for any queries.",
  tech: ["Python", "Flask", "AI"],
  image: "/lovable-uploads/chatbot.jpg", 
  github: "https://github.com",
  demo: "https://demo.com",
  featured: true,
  domains: ["ai"]
}, {
  title: "IoT based Home Automation - Fire Security System",
  description: "An IoT device which monitors real time sensor data and acts accordingly when a fire is detected.",
  tech: ["Microcontroller", "Sensors and Actuators", "C++", "Blynk"],
  image: "/lovable-uploads/fire.jpg", 
  github: "https://github.com",
  featured: true,
  domains: ["iot"]
}, {
  title: "AgriPulse - IoT based Greenhouse Monitoring System",
  description: "An IoT device which has an AI model which predicts the plant health and growth timespan using the real time sensor readings.",
  tech: ["JavaScript", "AI", "C++"],
  image: "/lovable-uploads/ee3580d7-5395-4bba-8660-f7aeddc6f247.png",
  github: "https://github.com",
  demo: "https://demo.com",
  featured: true,
  domains: ["iot", "ai"]
}, {
  title: "Wind Tunnel",
  description: "A device that will be used to check the aerodynamics of the air crafts to test it before the actual implementation.",
  tech: ["Testing", "Aerodynamics", "Prototype"],
  image: "/lovable-uploads/4948655f-5031-44b2-995f-3c0ebf26010f.png",
  knowMore: "/wind-tunnel-details",
  featured: true,
  domains: ["aero"]
}];

const fadeVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

const Projects = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  // Filter projects based on selected domain
  const filteredProjects = selectedDomain 
    ? projects.filter(project => project.domains.includes(selectedDomain))
    : [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <h1 className="font-bold mb-4 font-poppins text-3xl">My Projects</h1>
              <p className="text-muted-foreground max-w-2xl">
                Explore a selection of my academic and personal projects across various domains that showcase my technical skills and problem-solving abilities.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {selectedDomain ? (
                <motion.div 
                  key="projects-view"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="mb-8"
                >
                  <Button 
                    variant="ghost" 
                    className="mb-4 flex items-center gap-2 transition-all duration-300 hover:scale-105" 
                    onClick={() => setSelectedDomain(null)}
                  >
                    <ChevronLeft size={16} />
                    Back to all domains
                  </Button>
                  
                  <h2 className="text-2xl font-semibold mb-8 text-tech-blue">
                    {domains.find(d => d.id === selectedDomain)?.name} Projects
                  </h2>
                  
                  {filteredProjects.length > 0 ? (
                    <div className="grid gap-8">
                      {filteredProjects.map((project, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                          className="bg-dark-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
                        >
                          <div className="grid md:grid-cols-2 gap-0">
                            <div className="h-64 md:h-auto overflow-hidden">
                              <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full hover:scale-110 transition-transform duration-700 object-cover" 
                                style={{ aspectRatio: '16/10', objectFit: 'cover' }}
                              />
                            </div>
                            <div className="p-6 flex flex-col">
                              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                              <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                              
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                  {project.tech.map((tech, techIndex) => (
                                    <span key={techIndex} className="px-3 py-1 bg-dark-200 text-xs rounded-full transition-all duration-300 hover:bg-tech-blue/20">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                {project.title !== "Wind Tunnel" && (
                                  <Button asChild variant="outline" size="sm" className="rounded-lg transition-all duration-300 hover:scale-105">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                      <Github className="mr-2 h-4 w-4" />
                                      Code
                                    </a>
                                  </Button>
                                )}
                                {project.demo && (
                                  <Button asChild size="sm" className="rounded-lg transition-all duration-300 hover:scale-105">
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      Live Demo
                                    </a>
                                  </Button>
                                )}
                                {project.knowMore && (
                                  <Button asChild size="sm" className="rounded-lg transition-all duration-300 hover:scale-105">
                                    <a href={project.knowMore}>
                                      <Info className="mr-2 h-4 w-4" />
                                      Know More
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="text-center py-16"
                    >
                      <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                      <p className="text-muted-foreground">
                        Projects for this domain will be added soon.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="domains-view"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold mb-8 text-tech-blue">Project Domains</h2>
                  <ProjectDomains 
                    domains={domains}
                    activeDomainId={selectedDomain} 
                    onSelectDomain={setSelectedDomain} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </PageTransition>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Projects;
