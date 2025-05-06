
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, Loader2 } from "lucide-react";
import { useChatToggle } from "@/context/ChatContext";
import { toast } from "@/components/ui/sonner";
import { useTheme } from "./ThemeProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Enhanced knowledge base with more detailed information about Geetheerth
const knowledgeBase = {
  // Personal information
  personal: {
    name: "Geetheerth R",
    location: "Chennai, India",
    email: "geetheerth@gmail.com",
    github: "github.com/geetheerth",
    education: {
      bachelors: {
        degree: "Bachelor of Engineering in Computer Science & Engineering",
        institution: "Sathyabama Institute of Science and Technology",
        period: "2021 - 2025",
        details: "Core subjects include Data Structures, Algorithms, Database Systems, Computer Networks, and Software Engineering."
      },
      highSchool: {
        institution: "Rockford School",
        period: "2019 - 2021",
        details: "Mathematics, Physics, Chemistry, Computer Science with an excellent academic record."
      },
      school: {
        institution: "The Titan School",
        period: "2006 - 2019",
        details: "Mathematics, Physics, Chemistry, Computer Science, Social Science, Tamil and English."
      }
    }
  },
  
  // Skills information with detailed descriptions
  skills: {
    programming: [
      { name: "Python", level: "Advanced", details: "Experience with data analysis, machine learning libraries, web development with Flask/Django" },
      { name: "JavaScript", level: "Advanced", details: "Proficient in modern JS, React, and TypeScript for frontend development" },
      { name: "Java", level: "Intermediate", details: "Used for Android app development and backend services" },
      { name: "C/C++", level: "Intermediate", details: "Used primarily for embedded systems and IoT device programming" },
      { name: "HTML/CSS", level: "Advanced", details: "Expertise in responsive design, Tailwind CSS, Bootstrap, and modern CSS features" }
    ],
    iot: [
      { name: "Arduino", level: "Advanced", details: "Design and implementation of various sensor-based projects" },
      { name: "Raspberry Pi", level: "Intermediate", details: "Smart home automation and edge computing applications" },
      { name: "ESP8266/32", level: "Advanced", details: "WiFi-enabled IoT devices and sensor networks" },
      { name: "Sensors", level: "Advanced", details: "Experience with temperature, humidity, motion, gas, and other environmental sensors" },
      { name: "Actuators", level: "Intermediate", details: "Motors, relays, servos for physical interaction with the environment" }
    ],
    tools: [
      { name: "Node-Red", details: "For IoT flow-based programming and dashboard creation" },
      { name: "MQTT", details: "Lightweight messaging protocol for IoT communication" },
      { name: "KiCAD", details: "PCB design and electronic schematics" },
      { name: "VS Code", details: "Primary development environment" },
      { name: "MySQL", details: "Database design and management" },
      { name: "Git & GitHub", details: "Version control and collaborative development" }
    ],
    softSkills: ["Problem Solving", "Team Collaboration", "Communication", "Project Management", "Time Management"],
    learningAreas: ["Cloud Computing", "Deep Learning", "Artificial Intelligence", "Blockchain"]
  },
  
  // Projects information with detailed descriptions
  projects: [
    {
      title: "Chatbot in WhatsApp",
      description: "Integrated a functional AI-powered chatbot into WhatsApp that can respond to user queries with natural language processing capabilities. The chatbot utilizes a Flask backend to process incoming messages, a custom-trained NLP model to understand intent, and the WhatsApp Business API for communication.",
      technologies: ["Python", "Flask", "NLP", "WhatsApp API"],
      challenges: "Implementing context-awareness and handling multiple conversation threads simultaneously was challenging.",
      outcomes: "The chatbot successfully handled over 1000 queries in its first month with a 92% satisfaction rate from users.",
      timeline: "Completed in 3 months (2023)",
      codeRepo: "https://github.com/geetheerth/whatsapp-chatbot"
    },
    {
      title: "IoT based Home Automation - Fire Security System",
      description: "Developed a comprehensive IoT-based fire security system for home automation that can detect smoke, unusual temperature spikes, and potential fire hazards. The system sends real-time alerts to homeowners' mobile devices and can automatically trigger suppression systems or alert emergency services when necessary.",
      technologies: ["Arduino", "ESP8266", "Sensors", "C++", "Blynk"],
      challenges: "Balancing power consumption with the need for continuous monitoring, and ensuring reliability in emergency situations.",
      outcomes: "Successfully implemented in a residential building with positive feedback on its responsiveness and reliability.",
      features: [
        "Multiple sensor integration (smoke, temperature, flame)",
        "Real-time mobile alerts",
        "Automated suppression system control",
        "Battery backup with power monitoring",
        "Historical data logging for analysis"
      ],
      timeline: "Completed in 5 months (2022)"
    },
    {
      title: "AgriPulse - IoT based Greenhouse Monitoring System",
      description: "Created an intelligent greenhouse monitoring system that uses IoT sensors to collect environmental data and employs AI to predict plant health and growth timelines. The system optimizes growing conditions by controlling irrigation, ventilation, and lighting based on plant needs and environmental conditions.",
      technologies: ["ESP32", "JavaScript", "Python", "TensorFlow", "MQTT"],
      challenges: "Developing accurate AI models for different plant varieties and handling the variability of environmental factors.",
      outcomes: "Implemented in a small commercial greenhouse, resulting in a 15% increase in yield and 20% reduction in water usage.",
      features: [
        "Real-time monitoring of temperature, humidity, soil moisture, light levels",
        "AI-driven growth prediction and plant health analysis",
        "Automated control of greenhouse systems",
        "Mobile app for remote monitoring and management",
        "Data visualization and trend analysis"
      ],
      timeline: "Completed in 8 months (2023)",
      codeRepo: "https://github.com/geetheerth/agripulse"
    }
  ],
  
  // Areas of expertise with detailed descriptions
  expertise: [
    {
      area: "Web Development",
      details: "Specialized in creating responsive, user-friendly web applications using modern frameworks like React. Experienced in both frontend and backend development, with a focus on creating seamless user experiences."
    },
    {
      area: "Embedded Systems",
      details: "Designing and implementing hardware-software solutions for resource-constrained devices. Experience with microcontrollers, sensors, and real-time operating systems."
    },
    {
      area: "UI/UX Design",
      details: "Creating intuitive and aesthetically pleasing interfaces that enhance user engagement and satisfaction. Skilled in wireframing, prototyping, and implementing designs using modern CSS frameworks."
    },
    {
      area: "Problem Solving",
      details: "Analytical approach to breaking down complex issues into manageable components. Experienced in debugging, optimization, and finding innovative solutions to technical challenges."
    }
  ],
  
  // Interests with details
  interests: [
    {
      name: "Open-source projects",
      details: "Actively contributes to open-source projects, particularly in the areas of IoT and web development."
    },
    {
      name: "Hackathons",
      details: "Regularly participates in hackathons to challenge problem-solving skills and collaborate with other developers."
    },
    {
      name: "Digital art",
      details: "Creates digital illustrations and designs in spare time, applying these skills to UI/UX work."
    },
    {
      name: "Chess",
      details: "Avid chess player who enjoys the strategic thinking and planning aspects of the game."
    },
    {
      name: "Technology advancements",
      details: "Keeps up with the latest developments in technology, particularly in AI, IoT, and sustainable tech."
    }
  ],
  
  // Portfolio website information
  portfolio: {
    sections: ["Home", "About", "Skills", "Projects", "Experience", "Contact"],
    features: ["Responsive design", "Dark/light mode", "Project showcase", "Chatbot assistant", "Contact form"],
    technologies: ["React", "Tailwind CSS", "TypeScript", "Framer Motion", "Supabase"]
  }
};

// Enhanced response generation with more detailed and structured replies
const generateResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Check for greetings
  if (/^(hi|hello|hey|greetings|hi there)/i.test(lowerQuery)) {
    return "Hello! I'm Geetheerth's portfolio assistant. I can tell you about his education, skills, projects, or personal interests. What would you like to know?";
  }
  
  // Check for questions about name or introduction
  if (lowerQuery.includes("who are you") || lowerQuery.includes("introduce yourself") || lowerQuery.includes("about you") || lowerQuery.includes("who is geetheerth")) {
    return `Geetheerth R is a Computer Science & Engineering student from Chennai, India, currently pursuing his Bachelor's degree at Sathyabama Institute of Science and Technology (2021-2025).

He's passionate about technology and innovation, particularly in areas like:
• Web Development
• Embedded Systems & IoT
• UI/UX Design
• Artificial Intelligence

With a strong foundation in various programming languages and a hands-on approach to learning, Geetheerth has developed several notable projects including an IoT-based Fire Security System, a WhatsApp Chatbot, and AgriPulse - an intelligent greenhouse monitoring system.`;
  }
  
  // Check for questions about education with detailed response
  if (lowerQuery.includes("education") || lowerQuery.includes("study") || lowerQuery.includes("college") || lowerQuery.includes("university") || lowerQuery.includes("school") || lowerQuery.includes("degree") || lowerQuery.includes("academic")) {
    return `Geetheerth's educational journey comprises:

🎓 Higher Education:
• Bachelor of Engineering in Computer Science & Engineering
• Sathyabama Institute of Science and Technology, Chennai
• Period: 2021-2025
• Core subjects: Data Structures, Algorithms, Database Systems, Computer Networks, Software Engineering

🏫 Pre-University Education:
• Rockford School (2019-2021)
• Focus on Mathematics, Physics, Chemistry, and Computer Science
• Maintained excellent academic performance

🏫 School Education:
• The Titan School (2006-2019)
• Comprehensive education in Mathematics, Sciences, Computer Science, Languages (Tamil & English), and Social Sciences

His education has equipped him with both theoretical knowledge and practical skills needed for success in the technology field.`;
  }
  
  // Check for questions about skills with categorized and detailed response
  if (lowerQuery.includes("skill") || lowerQuery.includes("know") || lowerQuery.includes("good at") || lowerQuery.includes("capable") || lowerQuery.includes("proficient") || lowerQuery.includes("expertise")) {
    // Determine if there's a specific skill category being asked about
    let response = "";
    
    if (lowerQuery.includes("programming") || lowerQuery.includes("coding") || lowerQuery.includes("languages") || lowerQuery.includes("python") || lowerQuery.includes("javascript") || lowerQuery.includes("java") || lowerQuery.includes("c++")) {
      response = `💻 Programming Skills:

Geetheerth is proficient in multiple programming languages:
• Python (Advanced) - Data analysis, machine learning, web development with Flask/Django
• JavaScript (Advanced) - Modern JS, React, TypeScript for frontend development
• Java (Intermediate) - Android app development and backend services
• C/C++ (Intermediate) - Embedded systems and IoT device programming
• HTML/CSS (Advanced) - Responsive design, Tailwind CSS, Bootstrap

He continuously expands his programming knowledge and adapts to new technologies and frameworks as needed.`;
    } 
    else if (lowerQuery.includes("iot") || lowerQuery.includes("embedded") || lowerQuery.includes("hardware") || lowerQuery.includes("arduino") || lowerQuery.includes("raspberry")) {
      response = `🔌 IoT & Embedded Systems Skills:

Geetheerth has hands-on experience with various IoT platforms:
• Arduino (Advanced) - Designed and implemented various sensor-based projects
• Raspberry Pi (Intermediate) - Smart home automation and edge computing
• ESP8266/32 (Advanced) - WiFi-enabled IoT devices and sensor networks
• Sensors - Experience with temperature, humidity, motion, gas sensors
• Actuators - Motors, relays, servos for physical interaction

His projects demonstrate practical application of these skills in solving real-world problems.`;
    }
    else if (lowerQuery.includes("tools") || lowerQuery.includes("software") || lowerQuery.includes("git") || lowerQuery.includes("database")) {
      response = `🛠️ Tools & Technologies:

Geetheerth is experienced with various development tools:
• Node-Red - For IoT flow-based programming and dashboards
• MQTT - Lightweight messaging protocol for IoT communication
• KiCAD - PCB design and electronic schematics
• VS Code - Primary development environment
• MySQL - Database design and management
• Git & GitHub - Version control and collaborative development

These tools complement his programming and hardware skills, enabling end-to-end project development.`;
    }
    else if (lowerQuery.includes("soft") || lowerQuery.includes("personal") || lowerQuery.includes("communication") || lowerQuery.includes("team") || lowerQuery.includes("management")) {
      response = `🤝 Soft Skills:

Beyond technical abilities, Geetheerth possesses strong soft skills:
• Problem Solving - Analytical approach to complex issues
• Team Collaboration - Works effectively in diverse teams
• Communication - Clearly articulates technical concepts
• Project Management - Organizes work and meets deadlines
• Time Management - Balances multiple priorities efficiently

These skills have been developed through project work, hackathons, and academic collaborations.`;
    }
    else {
      // General skills overview
      response = `🔍 Geetheerth's Skill Overview:

1. Programming Languages:
   • Python, JavaScript, Java, C/C++, HTML/CSS
   • Experience ranges from web development to embedded systems

2. IoT & Embedded Systems:
   • Arduino, Raspberry Pi, ESP8266/32
   • Sensor integration and actuator control
   • Real-time data processing

3. Development Tools:
   • Node-Red, MQTT, KiCAD, VS Code, MySQL
   • Git & GitHub for version control

4. Soft Skills:
   • Problem Solving, Team Collaboration, Communication
   • Project Management, Time Management

5. Currently Learning:
   • Cloud Computing, Deep Learning, Artificial Intelligence, Blockchain

This diverse skill set allows him to approach problems from multiple angles and implement comprehensive solutions.`;
    }
    
    return response;
  }
  
  // Check for questions about projects with detailed descriptions
  if (lowerQuery.includes("project") || lowerQuery.includes("work") || lowerQuery.includes("portfolio") || lowerQuery.includes("built") || lowerQuery.includes("created") || lowerQuery.includes("developed")) {
    // Check if asking about a specific project
    if (lowerQuery.includes("agripulse") || (lowerQuery.includes("greenhouse") && (lowerQuery.includes("monitoring") || lowerQuery.includes("system")))) {
      const project = knowledgeBase.projects.find(p => p.title.includes("AgriPulse"));
      return `🌱 AgriPulse - IoT based Greenhouse Monitoring System

Description:
AgriPulse is an intelligent greenhouse monitoring system that uses IoT sensors to collect environmental data and employs AI to predict plant health and growth timelines. The system optimizes growing conditions by automatically controlling irrigation, ventilation, and lighting based on plant needs and environmental conditions.

Key Features:
• Real-time monitoring of temperature, humidity, soil moisture, and light levels
• AI-driven growth prediction and plant health analysis
• Automated control of greenhouse systems
• Mobile app for remote monitoring and management
• Data visualization and trend analysis

Technologies Used:
• ESP32 microcontrollers for sensor integration
• JavaScript for frontend interface
• Python for backend and AI processing
• TensorFlow for machine learning models
• MQTT for IoT communication protocol

Results:
When implemented in a small commercial greenhouse, AgriPulse resulted in a 15% increase in crop yield and a 20% reduction in water usage, demonstrating both economic and environmental benefits.

Development Timeline:
This project was completed over 8 months in 2023, with particular challenges in developing accurate AI models for different plant varieties and handling the variability of environmental factors.`;
    }
    else if (lowerQuery.includes("fire") || lowerQuery.includes("security") || lowerQuery.includes("home automation")) {
      const project = knowledgeBase.projects.find(p => p.title.includes("Fire"));
      return `🔥 IoT based Home Automation - Fire Security System

Description:
This project is a comprehensive IoT-based fire security system for home automation that can detect smoke, unusual temperature spikes, and potential fire hazards. The system provides real-time alerts to homeowners' mobile devices and can automatically trigger suppression systems or alert emergency services when necessary.

Key Features:
• Multiple sensor integration (smoke, temperature, flame)
• Real-time mobile alerts
• Automated suppression system control
• Battery backup with power monitoring
• Historical data logging for analysis

Technologies Used:
• Arduino for main control logic
• ESP8266 for wireless connectivity
• Various sensors for environmental monitoring
• C++ for device programming
• Blynk platform for mobile interface

Results:
The system was successfully implemented in a residential building with positive feedback on its responsiveness and reliability. It provides peace of mind to homeowners while potentially saving lives and property.

Development Challenges:
A major challenge was balancing power consumption with the need for continuous monitoring, and ensuring reliability in emergency situations when power might be compromised.

Timeline:
The project was completed in 5 months during 2022, including design, prototyping, testing, and deployment phases.`;
    }
    else if (lowerQuery.includes("chatbot") && lowerQuery.includes("whatsapp")) {
      const project = knowledgeBase.projects.find(p => p.title.includes("Chatbot"));
      return `💬 Chatbot in WhatsApp

Description:
This project integrated a functional AI-powered chatbot into WhatsApp that can respond to user queries with natural language processing capabilities. The chatbot provides automated responses to common questions, helping to streamline communication.

Key Features:
• Natural language understanding
• Context-aware conversations
• Integration with WhatsApp platform
• Customizable response templates
• Analytics on user interactions

Technologies Used:
• Python for backend logic
• Flask for web server framework
• Natural Language Processing techniques
• WhatsApp Business API

Results:
The chatbot successfully handled over 1000 queries in its first month with a 92% satisfaction rate from users. It significantly reduced response time for common queries.

Development Challenges:
Implementing context-awareness and handling multiple conversation threads simultaneously was particularly challenging, requiring sophisticated state management.

Timeline:
The project was completed in 3 months during 2023, from initial concept to deployment.

Code Repository:
Available at https://github.com/geetheerth/whatsapp-chatbot`;
    }
    else {
      // General projects overview
      return `🚀 Geetheerth's Key Projects:

1. AgriPulse - IoT based Greenhouse Monitoring System
   • Intelligent system using IoT sensors and AI to predict plant health
   • Technologies: ESP32, JavaScript, Python, TensorFlow, MQTT
   • Resulted in 15% increase in crop yield and 20% reduction in water usage

2. IoT based Home Automation - Fire Security System
   • Comprehensive security system detecting smoke, temperature spikes, and fire hazards
   • Technologies: Arduino, ESP8266, Sensors, C++, Blynk
   • Implemented in residential buildings with positive feedback

3. Chatbot in WhatsApp
   • AI-powered chatbot integrated into WhatsApp for natural language conversations
   • Technologies: Python, Flask, NLP, WhatsApp API
   • Handled over 1000 queries with 92% user satisfaction

Each project demonstrates Geetheerth's ability to apply theoretical knowledge to practical problems, combining hardware and software skills to create functional solutions.

Ask for more details about any specific project!`;
    }
  }
  
  // Check for questions about contact information
  if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("reach") || lowerQuery.includes("github") || lowerQuery.includes("get in touch") || lowerQuery.includes("connect")) {
    return `📮 Contact Information:

You can reach Geetheerth through:

• Email: geetheerth@gmail.com
• GitHub: github.com/geetheerth
• Location: Chennai, India

The fastest way to get in touch is to use the contact form on this website. Just click the "Get in Touch" button on the homepage or navigate to the Contact section from the menu.

When contacting, please include:
1. Your name
2. The purpose of your message (collaboration, job opportunity, question, etc.)
3. Any relevant details about your request

Geetheerth typically responds to messages within 1-2 business days.`;
  }
  
  // Check for questions about areas of expertise
  if (lowerQuery.includes("what do you do") || lowerQuery.includes("what does he do") || lowerQuery.includes("expertise") || lowerQuery.includes("specialization") || lowerQuery.includes("focus") || lowerQuery.includes("field")) {
    return `🔍 Geetheerth's Areas of Expertise:

1. Web Development
   • Creating responsive, user-friendly web applications
   • Experience with modern frameworks like React
   • Focus on both frontend and backend development
   • Building seamless user experiences

2. Embedded Systems
   • Designing hardware-software solutions for resource-constrained devices
   • Working with microcontrollers, sensors, and real-time operating systems
   • Creating IoT applications and connected devices

3. UI/UX Design
   • Developing intuitive and aesthetically pleasing interfaces
   • Skilled in wireframing, prototyping, and implementation
   • Using modern CSS frameworks for responsive designs
   • Focusing on accessibility and user experience

4. Problem Solving
   • Taking an analytical approach to complex technical challenges
   • Expertise in debugging and optimization
   • Finding innovative solutions using available resources
   • Breaking down complex issues into manageable components

These areas of expertise overlap and complement each other, allowing Geetheerth to approach projects holistically and deliver comprehensive solutions.`;
  }
  
  // Check for questions about interests and hobbies
  if (lowerQuery.includes("interest") || lowerQuery.includes("hobby") || lowerQuery.includes("passion") || lowerQuery.includes("free time") || lowerQuery.includes("outside of work")) {
    return `🌟 Geetheerth's Interests & Passions:

Beyond his academic and professional pursuits, Geetheerth is passionate about:

1. Open-source Projects
   • Actively contributes to open-source initiatives
   • Particularly interested in IoT and web development projects
   • Believes in collaborative development and knowledge sharing

2. Hackathons
   • Regular participant in coding and innovation challenges
   • Enjoys the problem-solving aspects and time constraints
   • Values the collaborative environment and networking opportunities

3. Digital Art
   • Creates illustrations and designs in spare time
   • Applies artistic skills to enhance UI/UX work
   • Explores the intersection of technology and creativity

4. Chess
   • Avid player who enjoys strategic thinking
   • Appreciates the planning and foresight required
   • Sees parallels between chess strategies and problem-solving in tech

5. Technology Advancements
   • Keeps up with latest developments in AI, IoT, and sustainable tech
   • Reads tech blogs, research papers, and attends webinars
   • Particularly interested in technologies with positive social impact

These interests reflect his creative mindset and continuous desire for learning and growth.`;
  }
  
  // Check for questions about the website itself
  if (lowerQuery.includes("website") || lowerQuery.includes("portfolio site") || lowerQuery.includes("this site") || (lowerQuery.includes("portfolio") && lowerQuery.includes("built")) || lowerQuery.includes("this portfolio")) {
    return `🖥️ About This Portfolio Website:

This portfolio website was designed and developed by Geetheerth to showcase his skills, projects, and professional information. 

Website Structure:
• Home - Introduction and quick navigation
• About - Background information and personal journey
• Skills - Overview of technical and soft skills
• Projects - Detailed showcase of key projects
• Experience - Professional history and achievements
• Contact - Form to get in touch

Technical Implementation:
• Built with React and TypeScript for a dynamic frontend
• Styled using Tailwind CSS for responsive design
• Animations implemented with Framer Motion
• Backend functionality powered by Supabase
• Features both light and dark mode for better user experience

The chatbot assistant (that's me!) was implemented to provide interactive information about Geetheerth's background, skills, and projects.

The site is designed to be fully responsive, providing an optimal viewing experience across a wide range of devices from desktop to mobile phones.`;
  }
  
  // Check for questions about career goals or aspirations
  if (lowerQuery.includes("career") || lowerQuery.includes("goal") || lowerQuery.includes("aspiration") || lowerQuery.includes("future") || lowerQuery.includes("plan") || lowerQuery.includes("ambition")) {
    return `🎯 Geetheerth's Career Goals & Aspirations:

Geetheerth is passionate about technology that makes a positive impact. His career aspirations include:

Near-term Goals:
• Complete his Bachelor's degree in Computer Science & Engineering (2025)
• Gain practical industry experience through internships and collaborative projects
• Expand his portfolio with more complex and impactful projects
• Deepen his expertise in AI, IoT, and full-stack development

Long-term Vision:
• Become a versatile full-stack developer with specialized knowledge in IoT and AI
• Contribute to innovative projects that address real-world challenges
• Potentially pursue further education in specialized areas of computer science
• Work with organizations that value innovation and positive societal impact

Areas of Interest for Future Growth:
• Cloud-native applications and distributed systems
• Deep learning and neural networks
• Sustainable technology solutions
• Edge computing and advanced IoT architectures

Geetheerth believes in continuous learning and adaptation, staying current with evolving technologies while building a strong foundation of fundamental principles.`;
  }
  
  // Check for questions about current location or origin
  if (lowerQuery.includes("where") && (lowerQuery.includes("from") || lowerQuery.includes("live") || lowerQuery.includes("based") || lowerQuery.includes("location"))) {
    return `📍 Location Information:

Geetheerth is currently based in Chennai, India.

Chennai is:
• The capital city of Tamil Nadu, a state in southern India
• A major educational and technological hub in South Asia
• Home to numerous engineering colleges and tech companies
• Known as the "Detroit of India" for its manufacturing industry

This location provides him with access to:
• Quality education at Sathyabama Institute of Science and Technology
• A growing tech ecosystem and startup culture
• Networking opportunities with industry professionals
• Diverse cultural experiences that broaden perspective

Living in Chennai influences his work through exposure to both local challenges and global technological trends.`;
  }
  
  // Check for detailed questions about specific skills
  if ((lowerQuery.includes("tell me about") || lowerQuery.includes("explain") || lowerQuery.includes("describe")) && 
      (lowerQuery.includes("python") || lowerQuery.includes("java") || lowerQuery.includes("javascript") || lowerQuery.includes("c++") || 
       lowerQuery.includes("html") || lowerQuery.includes("css") || lowerQuery.includes("web") || lowerQuery.includes("design"))) {
    
    if (lowerQuery.includes("python")) {
      return `🐍 Geetheerth's Python Experience:

Proficiency Level: Advanced

Key Applications:
• Data Analysis - Using libraries like Pandas and NumPy
• Machine Learning - Experience with scikit-learn and TensorFlow
• Web Development - Flask and Django frameworks
• Automation - Scripts for task automation and data processing
• IoT Integration - Python for backend processing of IoT data

Notable Projects:
• WhatsApp Chatbot - Used Python for backend logic and NLP processing
• AgriPulse - Python for data analysis and machine learning components

Learning Journey:
Geetheerth began learning Python during his early university years and has continuously expanded his knowledge through projects, online courses, and practical applications. He appreciates Python's versatility and its extensive ecosystem of libraries.

Future Goals:
He plans to further deepen his expertise in Python for AI and data science applications, particularly in areas that can be integrated with IoT systems.`;
    }
    
    if (lowerQuery.includes("web") || lowerQuery.includes("frontend") || lowerQuery.includes("website")) {
      return `🌐 Geetheerth's Web Development Skills:

Areas of Expertise:

Frontend Development:
• HTML5, CSS3, and modern JavaScript (ES6+)
• React.js for building interactive UIs
• TypeScript for type-safe code
• Responsive design principles
• CSS frameworks like Tailwind and Bootstrap
• State management with context API and Redux

Backend Experience:
• RESTful API development
• Node.js and Express
• Database integration (MySQL, MongoDB)
• Authentication and authorization systems

Tools & Practices:
• Version control with Git
• Webpack for module bundling
• Performance optimization techniques
• Web accessibility standards
• Cross-browser compatibility

This portfolio website itself demonstrates his web development capabilities, featuring responsive design, smooth animations, and intuitive user experience. His approach focuses on creating clean, maintainable code that delivers excellent user experiences across devices.`;
    }
  }
  
  // If no specific pattern is matched, provide a helpful general response
  return `I'm Geetheerth's portfolio assistant. I can provide detailed information about his:

• Education and academic background
• Technical skills and specializations
• Projects and portfolio work
• Professional expertise and focus areas
• Personal interests and career goals
• Contact information

What specific aspect would you like to learn more about? Just ask, and I'll provide you with detailed information!`;
};

// NLP helper functions to improve chatbot understanding
const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[^\w\s]/g, '');
};

const findKeywords = (text: string): string[] => {
  const normalized = normalizeText(text);
  const words = normalized.split(/\s+/);
  
  // Define important keywords categories
  const educationKeywords = ['education', 'study', 'college', 'university', 'degree', 'school', 'academic'];
  const skillsKeywords = ['skill', 'know', 'ability', 'capable', 'programming', 'coding', 'technology', 'software', 'development', 'expertise'];
  const projectKeywords = ['project', 'work', 'portfolio', 'built', 'created', 'developed', 'made', 'implemented'];
  const contactKeywords = ['contact', 'email', 'reach', 'connect', 'touch'];
  
  // Filter out common stop words and extract keywords
  const stopWords = ['and', 'the', 'is', 'in', 'it', 'to', 'i', 'you', 'what', 'how', 'can', 'do', 'does', 'about'];
  return words.filter(word => 
    !stopWords.includes(word) && 
    (educationKeywords.includes(word) || 
     skillsKeywords.includes(word) || 
     projectKeywords.includes(word) || 
     contactKeywords.includes(word) ||
     word.length > 3)
  );
};

// Enhanced response function that uses NLP concepts
const getEnhancedResponse = (query: string): string => {
  // First try the direct pattern matching
  const directResponse = generateResponse(query);
  
  // If we're returning the default response, try a more flexible approach
  if (directResponse.includes("I'm Geetheerth's portfolio assistant. I can provide detailed information")) {
    const keywords = findKeywords(query);
    
    // If there are education-related keywords
    if (keywords.some(word => ['education', 'study', 'college', 'university', 'degree', 'school'].includes(word))) {
      return generateResponse("education");
    }
    
    // If there are skill-related keywords
    if (keywords.some(word => ['skill', 'programming', 'coding', 'technology', 'develop'].includes(word))) {
      return generateResponse("skills");
    }
    
    // If there are project-related keywords
    if (keywords.some(word => ['project', 'work', 'portfolio', 'built', 'created'].includes(word))) {
      return generateResponse("projects");
    }
    
    // If still no match, return a more helpful default response
    return `I didn't quite understand what specific information you're looking for about Geetheerth. 

You can ask me about:
• His educational background
• Technical skills and expertise
• Projects he has worked on
• Contact information
• Personal interests and career goals

Could you please rephrase your question or specify what you'd like to know?`;
  }
  
  return directResponse;
};

export function Chatbot() {
  const { isOpen, closeChat } = useChatToggle();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm your personal assistant for Geetheerth's portfolio. Ask me anything about his skills, projects, education, or interests!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input } as Message;
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate network delay for a more natural feeling
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate response using our enhanced function
      const responseText = getEnhancedResponse(input);
      
      const assistantMessage = { 
        role: "assistant", 
        content: responseText 
      } as Message;
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: "Sorry, I'm having trouble processing your request. Please try again." }
      ]);
      toast.error("Failed to generate response");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-full max-w-sm rounded-xl shadow-xl ${theme === "dark" ? "bg-dark-100" : "bg-white"} border border-border flex flex-col overflow-hidden transition-all duration-300 animate-fade-in`}>
      <div className={`p-3 flex justify-between items-center border-b ${theme === "dark" ? "bg-dark-200" : "bg-gray-50"}`}>
        <h3 className="font-semibold">Portfolio Assistant</h3>
        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" onClick={closeChat}>
          <X size={16} />
        </Button>
      </div>
      
      <div className="flex-grow p-3 overflow-y-auto max-h-[350px]">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div 
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  msg.role === "user" 
                    ? `${theme === "dark" ? "bg-tech-blue text-white" : "bg-tech-blue text-white"}`
                    : `${theme === "dark" ? "bg-dark-200" : "bg-gray-100"}`
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className={`p-3 border-t ${theme === "dark" ? "border-dark-200" : "border-gray-200"} flex gap-2`}>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className={`min-h-[40px] max-h-[120px] resize-none ${theme === "dark" ? "bg-dark-200 border-dark-200" : ""}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button 
          type="submit" 
          size="icon"
          className={`bg-tech-purple hover:bg-tech-purple/90 text-white rounded-lg h-10 w-10 ${
            isLoading || !input.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
