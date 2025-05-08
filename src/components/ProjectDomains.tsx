
import React from 'react';
import { Card } from "@/components/ui/card";

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
      {domains.map((domain) => (
        <Card 
          key={domain.id}
          className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl group ${
            activeDomainId === domain.id 
              ? "ring-2 ring-tech-blue ring-offset-2 ring-offset-background" 
              : "hover:scale-[1.02]"
          }`}
          onClick={() => onSelectDomain(domain.id)}
        >
          <div className="h-48 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
            <img 
              src={domain.image} 
              alt={domain.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-xl font-bold text-white">{domain.name}</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-muted-foreground">{domain.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
