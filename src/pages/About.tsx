
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          <h1 className="font-bold mb-8 font-poppins text-3xl">About Me</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-card rounded-xl p-6 sticky top-24 shadow-md">
                <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-gray-100">
                  <img 
                    alt="Geetheerth R" 
                    src="/lovable-uploads/9ec516fd-ca37-4107-8caf-b784f177ab6e.jpg" 
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">Geetheerth R</h2>
                <p className="text-muted-foreground text-sm">Computer Science & Engineering Graduate</p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Contact</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>📍 Chennai, India</li>
                    <li>📧 geetheerth@gmail.com</li>
                    <li>🌐 github.com/geetheerth-r-d</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-8">
              <div className="bg-card rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-tech-blue">My Journey</h2>
                <p className="mb-4">
                  I am a passionate Computer Science & Engineering student with a keen interest in exploring the intersection of technology and innovation. My journey in the world of computing began with a fascination for how software can solve real-world problems and transform lives.
                </p>
                <p>
                  Throughout my academic journey, I've focused on developing a strong foundation in programming, algorithms, and systems design. I'm particularly drawn to artificial intelligence, web development, and database systems, as I believe these areas offer tremendous potential for building the next generation of digital solutions.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-tech-purple">Education</h2>
                <div className="mb-4 border-l-2 border-tech-purple pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                      <img 
                        src="/lovable-uploads/9ec516fd-ca37-4107-8caf-b784f177ab6e.jpg"  
                        className="w-full h-full object-contain"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>
                    <h3 className="text-lg font-medium">Bachelor of Engineering in Computer Science & Engineering</h3>
                  </div>
                  <p className="text-muted-foreground">Sathyabama Institute of Science and Technology • 2021 - 2025</p>
                  <p className="text-sm mt-2">Core subjects include Data Structures, Algorithms, Database Systems, Computer Networks, and Software Engineering.</p>
                </div>
                <div className="mb-4 border-l-2 border-tech-blue pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                      <img 
                        src="/placeholder.svg" 
                        alt="Rockford School Logo" 
                        className="w-full h-full object-contain"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>
                    <h3 className="text-lg font-medium">Higher Secondary Education</h3>
                  </div>
                  <p className="text-muted-foreground">Rockford School • 2019 - 2021</p>
                  <p className="text-sm mt-2">Mathematics, Physics, Chemistry, Computer Science with an excellent academic record.</p>
                </div>
                <div className="border-l-2 border-tech-blue pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                      <img 
                        src="/placeholder.svg" 
                        alt="The Titan School Logo" 
                        className="w-full h-full object-contain"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>
                    <h3 className="text-lg font-medium">Secondary Education/High School</h3>
                  </div>
                  <p className="text-muted-foreground">The Titan School • 2006 - 2019</p>
                  <p className="text-sm mt-2">Mathematics, Physics, Chemistry, Computer Science, Social Science, Tamil and English.</p>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-tech-red">What I Do</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Web Development</h3>
                    <p className="text-sm text-muted-foreground">Building responsive and dynamic web applications using modern frameworks.</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Embedded Systems</h3>
                    <p className="text-sm text-muted-foreground">Using Embedded Systems to create new and innovative technologies.</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium mb-2">UI/UX Design</h3>
                    <p className="text-sm text-muted-foreground">Create new and proffesional UI/UX design ideas.</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Problem Solving</h3>
                    <p className="text-sm text-muted-foreground">Participating in challenges and competitions.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-tech-cyan">Personal Interests</h2>
                <p>
                  Beyond academics, I enjoy exploring open-source projects, participating in hackathons, and contributing to the tech community. I'm also interested in digital art, playing chess, and staying updated with the latest advancements in technology and computing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
