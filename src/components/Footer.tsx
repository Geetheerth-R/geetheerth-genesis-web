import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
export function Footer() {
  return <footer className="bg-dark-200 py-[25px] my-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-tech-blue to-tech-purple rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">GR</span>
              </div>
              <span className="font-poppins font-bold text-xl tracking-tight">
                Geetheerth R
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs my-[16px]">
              Computer Science & Engineering student passionate about building innovative solutions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center hover:bg-dark-300 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center hover:bg-dark-300 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@example.com" className="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center hover:bg-dark-300 transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center hover:bg-dark-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Geetheerth R. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>;
}