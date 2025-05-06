
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { GooeyText } from "@/components/ui/gooey-text";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section className="min-h-screen relative flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-tech-blue/10 blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-tech-red/10 blur-3xl animate-pulse-glow animation-delay-1000"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 container py-0 my-[38px]">
        <div className="flex flex-col justify-center">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-tech-cyan mb-1 font-medium mx-0 my-0">
              Hello, I am
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins mb-4 py-px">
              <span className="hero-gradient animate-text-shimmer bg-[length:200%_auto] text-4xl relative inline-block">
                Geetheerth R
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-tech-blue to-tech-purple"></span>
              </span>
            </h1>
            <div className="mb-6 py-px">
              <p className="font-medium text-muted-foreground md:text-xl text-sm flex items-center">
                Computer Science & Engineering
                <GooeyText 
                  texts={["Graduate", "Student"]} 
                  morphTime={1.5} 
                  cooldownTime={2}
                  textClassName="text-sm md:text-xl font-medium text-tech-blue ml-1" 
                  className="inline-block"
                />
              </p>
            </div>
            <p className="text-muted-foreground max-w-lg mb-8 text-base">
              Exploring the frontiers of technology through innovative solutions,
              creative problem-solving, and continuous learning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-xl px-6 py-6 bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90 transition-all" size="lg">
                <a href="/contact#contact-form">Get in Touch</a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl px-6 py-6 border-tech-blue text-tech-blue hover:bg-tech-blue/10" size="lg">
                <a href="/projects">View Work</a>
              </Button>
            </div>
          </div>
        </div>

        <div className={`flex items-center justify-center transition-all duration-1000 delay-500 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative z-10 bg-dark-100 p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-200 p-4 rounded-xl flex flex-col items-center justify-center text-center animate-float">
                  <div className="w-12 h-12 bg-tech-blue/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-tech-blue text-xl font-bold">AI</span>
                  </div>
                  <p className="text-sm mt-2">Artificial Intelligence</p>
                </div>
                <div className="bg-dark-200 p-4 rounded-xl flex flex-col items-center justify-center text-center animate-float animation-delay-500">
                  <div className="w-12 h-12 bg-tech-purple/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-tech-purple text-xl font-bold">FE</span>
                  </div>
                  <p className="text-sm mt-2">Frontend Dev</p>
                </div>
                <div className="bg-dark-200 p-4 rounded-xl flex flex-col items-center justify-center text-center animate-float animation-delay-1000">
                  <div className="w-12 h-12 bg-tech-red/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-tech-red text-xl font-bold">ES</span>
                  </div>
                  <p className="text-sm mt-2">Embedded Systems</p>
                </div>
                <div className="bg-dark-200 p-4 rounded-xl flex flex-col items-center justify-center text-center animate-float animation-delay-1500">
                  <div className="w-12 h-12 bg-tech-cyan/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-tech-cyan text-xl font-bold">OS</span>
                  </div>
                  <p className="text-sm mt-2">Operating Systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" onClick={() => document.getElementById("about")?.scrollIntoView({
        behavior: "smooth"
      })} className="rounded-full w-12 h-12 border border-primary/20 py-0 my-0 mx-[240px]">
          <ArrowDown size={20} />
        </Button>
      </div>
    </section>;
}
