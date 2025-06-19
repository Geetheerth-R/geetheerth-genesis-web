import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [{
  title: "SAP Intern",
  company: "Titan Company.Ltd",
  period: "September 2024 - October 2024",
  description: "Learnt about the SAP working and the Supply chain management process.",
  type: "work",
  skills: ["ERP", "Supply Chain Management", "SAP"],
  companyLogo: "/lovable-uploads/titanlogo.png"
}];
const certifications = [{
  name: "Machine Learning with MATLAB",
  issuer: "MATLAB",
  date: "January 2024",
  completed: "100%"
}, {
  name: "Digital 101 Journey",
  issuer: "Nasscom",
  date: "January 2024",
  completed: "100%"
}, {
  name: "Oracle Cloud Infrastructure",
  issuer: "Oracle",
  date: "March 2024",
  completed: "100%"
}, {
  name: "HTML, CSS, & JavaScript",
  issuer: "Udemy",
  date: "July 2024",
  completed: "100%"
}];
const achievements = [{
  title: "Best Project of the year - Wind Tunnel",
  description: "Won the best project of he year award for the wind tunnel project which was the illustartion of the aerodynamics checking unit of airecrafts."
}];

const Experience = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="font-bold mb-4 font-poppins text-3xl">Experience & Achievements</h1>
            <p className="text-muted-foreground max-w-2xl">
              My professional journey, academic accomplishments, and skills developed through various roles and projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Experience Timeline */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-tech-blue" />
                Experience Timeline
              </h2>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gradient-to-b before:from-tech-blue before:to-tech-purple before:-z-10">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center border-2 border-tech-blue">
                      {exp.type === "work" ? (
                        <Briefcase size={16} className="text-tech-blue" />
                      ) : exp.type === "research" ? (
                        <GraduationCap size={16} className="text-tech-purple" />
                      ) : (
                        <Award size={16} className="text-tech-red" />
                      )}
                    </div>
                    
                    <div className="bg-dark-100 p-5 rounded-lg shadow-md">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          {exp.companyLogo && (
                            <img 
                              src={exp.companyLogo} 
                              alt={`${exp.company} logo`}
                              className="w-6 h-6 object-contain rounded"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <Calendar size={12} className="mr-1" />
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="text-tech-blue font-medium text-sm mb-3">{exp.company}</p>
                      <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-3 py-1 bg-dark-200 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Achievements */}
            <div className="space-y-8">
              {/* Certifications */}
              <div className="bg-dark-100 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-tech-purple" />
                  Certifications
                </h2>
                
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-l-2 border-tech-purple pl-4">
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{cert.date}</span>
                        <span>ID: {cert.completed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Achievements */}
              <div className="bg-dark-100 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-tech-red" />
                  Achievements
                </h2>
                
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-dark-200 p-4 rounded-lg">
                      <h3 className="font-medium mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Education */}
              <div className="bg-dark-100 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-tech-cyan" />
                  Education
                </h2>
                
                <div className="space-y-4">
                  <div className="border-l-2 border-tech-cyan pl-4">
                    <h3 className="font-medium">B.E in Computer Science & Engineering</h3>
                    <p className="text-sm text-tech-blue">Sathyanama Institute of Science and Technology</p>
                    <p className="text-xs text-muted-foreground">2021 - 2025 </p>
                    <p className="text-xs mt-2">CGPA: 7.8/10.0</p>
                  </div>
                  
                  <div className="border-l-2 border-tech-cyan pl-4">
                    <h3 className="font-medium">Higher Secondary Education</h3>
                    <p className="text-sm text-tech-blue">Rockford School</p>
                    <p className="text-xs text-muted-foreground">2019 - 2021</p>
                    <p className="text-xs mt-2">Percentage: 74%</p>
                  </div>
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

export default Experience;
