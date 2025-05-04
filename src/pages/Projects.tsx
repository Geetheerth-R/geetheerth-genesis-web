import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Chatbot in WhatsApp",
    description: "Added a Chatbot in the WhatsApp Interface and made it function while users asks for any queries.",
    tech: ["Python", "Flask", "AI"],
    image: "https://unsplash.com/photos/a-green-whatsapp-icon-sitting-on-top-of-a-maze-tZgsbPtNnhQ",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true
  },
  {
    title: "IoT based Home Automation - Fire Security System",
    description: "An IoT device which monitors real time sesnor data and acts accordingly when a fire is detected.",
    tech: ["Microcontroller", "Sensors and Actuators", "C++", "Blynk"],
    image: "https://unsplash.com/photos/a-close-up-of-a-metal-object-with-a-black-background-tETn6NTqNgk",
    github: "https://github.com",
    featured: true
  },
  {
    title: "AgriPulse - IoT based Greenhouse Monitoring System",
    description: "An IoT device which has an AI model which predicts the plant health and growth timespan using the real time sensor readings.",
    tech: ["javascript", "AI", "C++"],
    image: "https://unsplash.com/photos/macro-photography-of-black-circuit-board-FO7JIlwjOtU",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 font-poppins">My Projects</h1>
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
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex flex-col">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 bg-dark-200 text-xs rounded-full"
                            >
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

          {/* Other Projects */}
          <h2 className="text-2xl font-semibold mb-8 text-tech-purple">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <div key={index} className="bg-dark-100 rounded-xl overflow-hidden shadow-lg flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-dark-200 text-xs rounded-full"
                        >
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
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Interested in seeing more of my work or discussing potential collaborations?
            </p>
            <Button asChild size="lg" className="rounded-xl">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View More on GitHub
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
