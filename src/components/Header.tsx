
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "./ThemeProvider";

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
          <div className={`w-10 h-10 ${theme === "dark" ? "bg-gradient-to-br from-tech-blue to-tech-purple" : "bg-gradient-to-br from-tech-blue to-blue-400"} rounded-lg flex items-center justify-center`}>
            <span className="text-lg font-bold text-white">GR</span>
          </div>
          <span className="font-poppins font-bold tracking-tight text-lg">Geetheerth R</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activePath === item.path 
                  ? "text-primary font-medium" 
                  : `hover:text-primary ${theme === "light" ? "text-gray-700" : ""}`
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeSwitcher />
          </div>
          <Button 
            asChild 
            className={`ml-4 rounded-lg ${
              theme === "dark" 
                ? "bg-tech-blue hover:bg-tech-blue/90" 
                : "bg-tech-blue hover:bg-blue-600"
            }`}
          >
            <a href="/resume.pdf" download="Geetheerth_R_Resume.pdf">
              Resume
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
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
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      activePath === item.path 
                        ? "bg-secondary text-primary font-medium" 
                        : "hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="mt-4 rounded-lg">
                  <a href="/resume.pdf" download="Geetheerth_R_Resume.pdf">
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
