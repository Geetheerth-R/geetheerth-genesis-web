
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-tech-cyan hover:text-tech-blue transition-colors">
            Geetheerth R
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
            
            {/* Services Button */}
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90">
                <User className="mr-2 h-4 w-4" />
                Book Services
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
    </header>
  );
};
