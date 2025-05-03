
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    title: "Software Development Intern",
    company: "TechCorp Solutions",
    period: "May 2023 - August 2023",
    description: "Assisted in developing and testing web applications using React and Node.js. Implemented responsive UI components and integrated RESTful APIs.",
    type: "work",
    skills: ["React", "Node.js", "Git", "Agile"]
  },
  {
    title: "Research Assistant",
    company: "University AI Lab",
    period: "January 2023 - Present",
    description: "Contributing to research projects in machine learning and computer vision. Implementing algorithms and conducting experiments for data analysis.",
    type: "research",
    skills: ["Python", "TensorFlow", "Computer Vision", "Data Analysis"]
  },
  {
    title: "Web Development Project Lead",
    company: "College Tech Club",
    period: "September 2022 - Present",
    description: "Leading a team of students in developing the college's technical festival website. Managing project timelines and coordinating team efforts.",
    type: "volunteer",
    skills: ["Leadership", "HTML/CSS", "JavaScript", "Project Management"]
  },
  {
    title: "Coding Mentor",
    company: "Code Camp for Kids",
    period: "June 2022 - August 2022",
    description: "Taught programming fundamentals to high school students. Created lesson plans and programming exercises to enhance learning.",
    type: "volunteer",
    skills: ["Teaching", "Python", "Problem-solving", "Communication"]
  }
];

const certifications = [
  {
    name: "Advanced Machine Learning",
    issuer: "Stanford Online",
    date: "March 2023",
    credential: "ML-CERT-2023"
  },
  {
    name: "Full Stack Web Development",
    issuer: "Udemy",
    date: "December 2022",
    credential: "FSW-2022-891"
  },
  {
    name: "Cloud Computing Fundamentals",
    issuer: "AWS Training",
    date: "October 2022",
    credential: "AWS-CLF-2022"
  },
  {
    name: "Data Structures & Algorithms",
    issuer: "Coursera",
    date: "August 2022",
    credential: "DSA-082022-45631"
  }
];

const achievements = [
  {
    title: "First Place - Hackathon 2023",
    description: "Led a team of 4 to victory in the university's annual hackathon by developing an innovative AI-powered solution for healthcare."
  },
  {
    title: "Dean's List Award",
    description: "Recognized for outstanding academic performance in Computer Science for three consecutive semesters."
  },
  {
    title: "Best Technical Paper",
    description: "Awarded for research paper on 'Optimizing Neural Networks for Edge Computing' at the Student Technical Symposium."
  }
];

const Experience = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 font-poppins">Experience & Achievements</h1>
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
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Calendar size={12} className="mr-1" />
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="text-tech-blue font-medium text-sm mb-3">{exp.company}</p>
                      <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="px-3 py-1 bg-dark-200 text-xs rounded-full"
                          >
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
                        <span>ID: {cert.credential}</span>
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
                    <h3 className="font-medium">B.Tech in Computer Science & Engineering</h3>
                    <p className="text-sm text-tech-blue">Elite University</p>
                    <p className="text-xs text-muted-foreground">2021 - 2025 (Expected)</p>
                    <p className="text-xs mt-2">CGPA: 9.2/10.0</p>
                  </div>
                  
                  <div className="border-l-2 border-tech-cyan pl-4">
                    <h3 className="font-medium">Higher Secondary Education</h3>
                    <p className="text-sm text-tech-blue">Premier Academy</p>
                    <p className="text-xs text-muted-foreground">2019 - 2021</p>
                    <p className="text-xs mt-2">Percentage: 98%</p>
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
