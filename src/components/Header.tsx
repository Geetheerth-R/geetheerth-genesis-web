
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MorphingText } from "@/components/ui/morphing-text";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-100/90 backdrop-blur-sm border-b border-dark-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Cube and Morphing Text */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* 3D Cube */}
            <div className="relative w-8 h-8">
              <div className="cube-container">
                <div className="cube">
                  <div className="face front bg-gradient-to-br from-tech-blue to-tech-purple"></div>
                  <div className="face back bg-gradient-to-br from-tech-purple to-tech-cyan"></div>
                  <div className="face right bg-gradient-to-br from-tech-cyan to-tech-blue"></div>
                  <div className="face left bg-gradient-to-br from-tech-blue to-tech-purple"></div>
                  <div className="face top bg-gradient-to-br from-tech-purple to-tech-cyan"></div>
                  <div className="face bottom bg-gradient-to-br from-tech-cyan to-tech-blue"></div>
                </div>
              </div>
            </div>
            
            {/* Morphing GR Text */}
            <div className="flex items-center space-x-2">
              <MorphingText 
                texts={["GR", "Geetheerth R"]} 
                className="text-xl font-bold text-tech-cyan group-hover:text-tech-blue transition-colors"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-tech-cyan ${
                  isActivePath(item.path) 
                    ? "text-tech-cyan" 
                    : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Chatbot and Menu */}
          <div className="flex items-center space-x-3">
            {/* Services Button - Desktop Only */}
            <div className="hidden md:block">
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90">
                  <User className="mr-2 h-4 w-4" />
                  Book Services
                </Button>
              </Link>
            </div>

            {/* Chatbot Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-tech-cyan hover:bg-dark-200"
              onClick={() => {
                // Add chatbot functionality here
                console.log("Chatbot clicked");
              }}
            >
              <MessageCircle size={20} />
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-300">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-tech-cyan ${
                    isActivePath(item.path) 
                      ? "text-tech-cyan" 
                      : "text-gray-300"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/auth" 
                className="pt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90">
                  <User className="mr-2 h-4 w-4" />
                  Book Services
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>

      <style jsx>{`
        .cube-container {
          perspective: 200px;
          width: 32px;
          height: 32px;
        }

        .cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotate 6s infinite linear;
        }

        .face {
          position: absolute;
          width: 32px;
          height: 32px;
          opacity: 0.9;
        }

        .front { transform: rotateY(0deg) translateZ(16px); }
        .back { transform: rotateY(180deg) translateZ(16px); }
        .right { transform: rotateY(90deg) translateZ(16px); }
        .left { transform: rotateY(-90deg) translateZ(16px); }
        .top { transform: rotateX(90deg) translateZ(16px); }
        .bottom { transform: rotateX(-90deg) translateZ(16px); }

        @keyframes rotate {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        .cube-container:hover .cube {
          animation-duration: 2s;
        }
      `}</style>
    </header>
  );
};
