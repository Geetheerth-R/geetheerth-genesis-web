import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI Image Recognition",
    description: "Developed a machine learning model that can identify objects in images with high accuracy using TensorFlow and Python.",
    tech: ["Python", "TensorFlow", "OpenCV", "Flask"],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true
  },
  {
    title: "Student Management System",
    description: "A comprehensive web application for educational institutions to manage students, courses, and academic records.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    github: "https://github.com",
    featured: true
  },
  {
    title: "Personal Finance Tracker",
    description: "An application that helps users track income, expenses, and financial goals with visualization dashboards.",
    tech: ["Vue.js", "Firebase", "Chart.js"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
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
