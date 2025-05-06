
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Menu, FileImage, Download, MessageSquare } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "./ThemeProvider";
import { useChatToggle } from "@/context/ChatContext";

const navItems = [
  {
    name: "Home",
    path: "/"
  }, 
  {
    name: "About",
    path: "/about"
  }, 
  {
    name: "Skills",
    path: "/skills"
  }, 
  {
    name: "Projects",
    path: "/projects"
  }, 
  {
    name: "Experience",
    path: "/experience"
  }, 
  {
    name: "Contact",
    path: "/contact"
  }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const { theme } = useTheme();
  const { toggleChat } = useChatToggle();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handlePathChange = () => {
      setActivePath(window.location.pathname);
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePathChange);
    setActivePath(window.location.pathname);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);
  
  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? theme === "dark" 
        ? "bg-dark-300/90 backdrop-blur-md shadow-md py-2" 
        : "bg-white/90 backdrop-blur-md shadow-md py-2"
      : "py-4"
  }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <div className={`w-10 h-10 ${theme === "dark" ? "bg-gradient-to-br from-tech-blue to-tech-purple" : "bg-gradient-to-br from-tech-blue to-blue-400"} rounded-lg flex items-center justify-center shadow-lg group overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red opacity-30 blur-sm -z-10 group-hover:opacity-40 transition-opacity duration-300"></div>
              <span className="text-lg font-bold text-white relative z-10">GR</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-tech-cyan rounded-full shadow-lg"></div>
          </div>
          <span className="font-poppins font-bold tracking-tight text-lg">Geetheerth R</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                activePath === item.path 
                  ? "text-primary font-medium" 
                  : `hover:text-primary relative group ${theme === "light" ? "text-gray-700" : ""}`
              }`}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-tech-blue to-tech-purple transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}
          <div className="ml-2">
            <ThemeSwitcher />
          </div>
          <Button 
            asChild 
            className={`ml-4 rounded-lg relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl ${
              theme === "dark" 
                ? "bg-tech-blue hover:bg-tech-blue/90 before:absolute before:inset-0 before:bg-gradient-to-r before:from-tech-purple/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity" 
                : "bg-tech-blue hover:bg-blue-600 before:absolute before:inset-0 before:bg-gradient-to-r before:from-tech-purple/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            }`}
          >
            <a href="/lovable-uploads/f6a5e962-f7a3-4685-9f92-5df2980928cd.png" download="Geetheerth_R_Resume.png" className="flex items-center gap-2 z-10 relative">
              <Download size={16} />
              Resume
            </a>
          </Button>
          <Button 
            onClick={toggleChat} 
            className={`ml-3 rounded-lg p-2 transition-all duration-300 ${
              theme === "dark"
                ? "bg-tech-purple hover:bg-tech-purple/90 text-white" 
                : "bg-tech-purple hover:bg-tech-purple/90 text-white"
            }`}
            size="icon"
          >
            <MessageSquare size={18} />
            <span className="sr-only">Open Chat</span>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <Button
            onClick={toggleChat}
            className="mr-2 rounded-lg p-2 bg-tech-purple hover:bg-tech-purple/90 text-white"
            size="icon"
          >
            <MessageSquare size={18} />
            <span className="sr-only">Open Chat</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-lg">
                <Menu size={20} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map(item => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      activePath === item.path 
                        ? "bg-secondary text-primary font-medium" 
                        : "hover:text-primary hover:bg-secondary/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="mt-4 rounded-lg flex items-center gap-2">
                  <a href="/lovable-uploads/f6a5e962-f7a3-4685-9f92-5df2980928cd.png" download="Geetheerth_R_Resume.png">
                    <Download size={16} />
                    Resume
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
