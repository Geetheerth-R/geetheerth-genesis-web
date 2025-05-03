
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

// Skill categories
const skillCategories = [
  {
    name: "Programming Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Java", level: 60 },
      { name: "C/C++", level: 70 },
      { name: "HTML/CSS", level: 60 },
    ],
  },
  {
    name: "IoT & Embedded",
    skills: [
      { name: "Arduino", level: 85 },
      { name: "Raspberry Pi", level: 50 },
      { name: "ESP8266/32", level: 90 },
      { name: "Sensors", level: 85 },
      { name: "Actuators", level: 70 },
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      { name: "Node-Red", level: 80 },
      { name: "MQTT", level: 70 },
      { name: "KiCAD", level: 60 },
      { name: "VS Code", level: 75 },
      { name: "MySQL", level: 70 },
    ],
  },
  {
    name: "Soft Skills",
    skills: [
      { name: "Problem Solving", level: 90 },
      { name: "Team Collaboration", level: 85 },
      { name: "Communication", level: 80 },
      { name: "Project Management", level: 70 },
      { name: "Time Management", level: 85 },
    ],
  },
];

const Skills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 font-poppins">My Skills</h1>
            <p className="text-muted-foreground max-w-2xl">
              As a Computer Science & Engineering student, I've developed a diverse set of technical and soft skills through coursework, projects, and self-learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-dark-100 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">
                  {category.name}
                </h2>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2 bg-dark-200">
                        <div 
                          className="h-full bg-gradient-to-r from-tech-blue to-tech-purple rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </Progress>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-dark-100 p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-8 text-center">Technical Competencies</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "React", "TypeScript", "Python", "Java", "C++",
                "Node.js", "Express", "MongoDB", "MySQL", "PostgreSQL",
                "Git", "Docker", "AWS", "TensorFlow", "PyTorch",
                "REST API", "GraphQL", "Linux", "Agile", "CI/CD"
              ].map((tech, i) => (
                <div 
                  key={i} 
                  className="bg-dark-200 px-4 py-3 rounded-lg text-center hover:bg-dark-300 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <div className="max-w-3xl mx-auto bg-dark-100 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 text-tech-cyan">Continuous Learning</h2>
              <p className="mb-8">
                I believe in lifelong learning and constantly expanding my skill set. Currently, I'm focusing on enhancing my knowledge in these areas:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-tech-blue/30 rounded-lg p-5 bg-dark-200">
                  <h3 className="text-lg font-medium mb-3 text-tech-blue">Cloud Computing</h3>
                  <p className="text-muted-foreground text-sm">
                    Exploring AWS services, serverless architecture, and cloud deployment strategies to build scalable applications.
                  </p>
                </div>
                
                <div className="border border-tech-purple/30 rounded-lg p-5 bg-dark-200">
                  <h3 className="text-lg font-medium mb-3 text-tech-purple">Deep Learning</h3>
                  <p className="text-muted-foreground text-sm">
                    Studying neural networks, computer vision, and natural language processing to solve complex problems.
                  </p>
                </div>
                
                <div className="border border-tech-red/30 rounded-lg p-5 bg-dark-200">
                  <h3 className="text-lg font-medium mb-3 text-tech-red">DevOps</h3>
                  <p className="text-muted-foreground text-sm">
                    Learning CI/CD pipelines, infrastructure as code, and automation to streamline development workflows.
                  </p>
                </div>
                
                <div className="border border-tech-cyan/30 rounded-lg p-5 bg-dark-200">
                  <h3 className="text-lg font-medium mb-3 text-tech-cyan">Blockchain</h3>
                  <p className="text-muted-foreground text-sm">
                    Understanding distributed ledger technology and smart contracts for building decentralized applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Skills;
