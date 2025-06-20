
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Menu, FileImage, Download, MessageSquare, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "./ThemeProvider";
import { useChatToggle } from "@/context/ChatContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const MorphingLogo = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-10 h-10 bg-gradient-to-br from-tech-blue to-tech-purple rounded-lg flex items-center justify-center shadow-lg group overflow-hidden">
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red opacity-30 blur-sm -z-10 group-hover:opacity-40 transition-opacity duration-300"></div>

      {/* Cube Icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
          showText ? "opacity-0 scale-50 rotate-180" : "opacity-100 scale-100 rotate-0"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22V12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 6L12 12L4 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* GR Text */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
          showText ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-180"
        }`}
      >
        <span className="text-white font-bold text-sm">GR</span>
      </div>

      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-tech-cyan rounded-full shadow-lg"></div>
    </div>
  );
};

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
        ? "bg-dark-300/80 backdrop-blur-md shadow-md py-2"
        : "bg-white/80 backdrop-blur-md shadow-md py-2"
      : theme === "dark"
      ? "bg-gradient-to-r from-dark-400/60 to-dark-300/60 backdrop-blur-lg py-4"
      : "bg-gradient-to-r from-white/70 to-white/80 backdrop-blur-lg py-4"
  }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <MorphingLogo />
          <span className="text-sm font-poppins font-medium tracking-tight text-foreground">
            Geetheerth R
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg transition-all duration-300 relative group ${
                activePath === item.path
                  ? "text-primary font-medium"
                  : `text-foreground ${theme === "light" ? "text-gray-700" : ""}`
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-tech-blue/5 to-tech-purple/5 opacity-0 group-hover:opacity-100 transform origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-500 rounded-md -z-0"></span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-tech-blue to-tech-purple transform origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out"></span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-tech-cyan/50 transform-gpu origin-right scale-x-0 group-hover:scale-x-75 transition-all duration-700 delay-75 ease-in-out"></span>
            </Link>
          ))}
          <div className="ml-2">
            <ThemeSwitcher />
          </div>
          
          {/* Book Services Button */}
          <Link to="/auth">
            <Button className="ml-4 bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90 rounded-lg flex items-center gap-2">
              <User size={16} />
              Book Services
            </Button>
          </Link>

          <Button
            asChild
            className={`ml-2 rounded-lg relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl ${
              theme === "dark"
                ? "bg-tech-blue hover:bg-tech-blue/90 before:absolute before:inset-0 before:bg-gradient-to-r before:from-tech-purple/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                : "bg-tech-blue hover:bg-blue-600 before:absolute before:inset-0 before:bg-gradient-to-r before:from-tech-purple/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            }`}
          >
            <a
              href="/lovable-uploads/f6a5e962-f7a3-4685-9f92-5df2980928cd.png"
              download="Geetheerth_R_Resume.png"
              className="flex items-center gap-2 z-10 relative"
            >
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
                {navItems.map((item) => (
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
                
                {/* Book Services Button for Mobile */}
                <Link to="/auth">
                  <Button className="mt-4 w-full bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90 rounded-lg flex items-center gap-2">
                    <User size={16} />
                    Book Services
                  </Button>
                </Link>

                <Button asChild className="mt-2 rounded-lg flex items-center gap-2">
                  <a
                    href="/lovable-uploads/f6a5e962-f7a3-4685-9f92-5df2980928cd.png"
                    download="Geetheerth_R_Resume.png"
                  >
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
