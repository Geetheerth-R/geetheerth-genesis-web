
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Chatbot } from "@/components/Chatbot";

const projects = [{
  title: "Chatbot in WhatsApp",
  description: "Added a Chatbot in the WhatsApp Interface and made it function while users asks for any queries.",
  tech: ["Python", "Flask", "AI"],
  image: "/lovable-uploads/chatbot-whatsapp.jpg", 
  github: "https://github.com",
  demo: "https://demo.com",
  featured: true
}, {
  title: "IoT based Home Automation - Fire Security System",
  description: "An IoT device which monitors real time sesnor data and acts accordingly when a fire is detected.",
  tech: ["Microcontroller", "Sensors and Actuators", "C++", "Blynk"],
  image: "/lovable-uploads/fire-security.jpg", 
  github: "https://github.com",
  featured: true
}, {
  title: "AgriPulse - IoT based Greenhouse Monitoring System",
  description: "An IoT device which has an AI model which predicts the plant health and growth timespan using the real time sensor readings.",
  tech: ["javascript", "AI", "C++"],
  image: "/lovable-uploads/ee3580d7-5395-4bba-8660-f7aeddc6f247.png",
  github: "https://github.com",
  demo: "https://demo.com",
  featured: true
}];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <h1 className="font-bold mb-4 font-poppins text-3xl">My Projects</h1>
              <p className="text-muted-foreground max-w-2xl">
                Explore a selection of my academic and personal projects that showcase my technical skills and problem-solving abilities.
              </p>
            </div>

            {/* Featured Projects */}
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-8 text-tech-blue">Featured Projects</h2>
              <div className="grid gap-8">
                {projects.filter(p => p.featured).map((project, index) => (
                  <div key={index} className="bg-dark-100 rounded-xl overflow-hidden shadow-lg">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-64 md:h-auto overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover" 
                          style={{ aspectRatio: '16/10', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="p-6 flex flex-col">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, techIndex) => (
                              <span key={techIndex} className="px-3 py-1 bg-dark-200 text-xs rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button asChild variant="outline" size="sm" className="rounded-lg">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </a>
                          </Button>
                          {project.demo && (
                            <Button asChild size="sm" className="rounded-lg">
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Projects;
