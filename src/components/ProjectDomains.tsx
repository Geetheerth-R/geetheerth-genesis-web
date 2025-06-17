
import React from 'react';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type Domain = {
  id: string;
  name: string;
  image: string;
  description: string;
};

interface ProjectDomainsProps {
  domains: Domain[];
  activeDomainId: string | null;
  onSelectDomain: (domainId: string) => void;
}

export function ProjectDomains({ domains, activeDomainId, onSelectDomain }: ProjectDomainsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {domains.map((domain, index) => (
        <motion.div
          key={domain.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
        >
          <Card 
            className={`overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl group transform ${
              activeDomainId === domain.id 
                ? "ring-2 ring-tech-blue ring-offset-2 ring-offset-background shadow-xl" 
                : "hover:shadow-xl"
            }`}
            onClick={() => onSelectDomain(domain.id)}
          >
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-all duration-500" />
              <div className="absolute inset-0 bg-tech-blue/20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-5" />
              <img 
                src={domain.image} 
                alt={domain.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-tech-cyan">{domain.name}</h3>
              </div>
            </div>
            <div className="p-4 transition-all duration-300 group-hover:bg-secondary/20">
              <p className="text-muted-foreground transition-all duration-300 group-hover:text-foreground">{domain.description}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
