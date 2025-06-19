
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WindTunnelDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto max-w-4xl">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center gap-2 transition-all duration-300 hover:scale-105" 
              onClick={() => navigate('/projects')}
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-tech-blue">Wind Tunnel Project</h1>
                <p className="text-xl text-muted-foreground">
                  Aerodynamic Testing and Analysis Device
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <img 
                    src="/lovable-uploads/4948655f-5031-44b2-995f-3c0ebf26010f.png"
                    alt="Wind Tunnel Project"
                    className="w-full rounded-xl shadow-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="Wind Tunnel Testing"
                    className="w-full rounded-xl shadow-lg"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  <div className="bg-card rounded-xl p-6 shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-tech-purple">Project Overview</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      This wind tunnel project represents a significant achievement in aerospace engineering, 
                      designed to test and analyze the aerodynamic properties of various aircraft models and 
                      components before real-world implementation. The device provides crucial data for 
                      optimizing aircraft design and performance.
                    </p>
                  </div>

                  <div className="bg-card rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-3 text-tech-cyan">Key Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Controlled airflow generation system</li>
                      <li>• Precise measurement instruments</li>
                      <li>• Model mounting and positioning system</li>
                      <li>• Data acquisition and analysis tools</li>
                      <li>• Safety monitoring systems</li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-card rounded-xl p-8 shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-6 text-tech-blue">Technical Specifications</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium mb-3 text-tech-purple">Design Parameters</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>Test Section:</strong> 0.5m x 0.5m cross-section</li>
                      <li><strong>Maximum Wind Speed:</strong> 50 m/s</li>
                      <li><strong>Turbulence Level:</strong> < 0.5%</li>
                      <li><strong>Reynolds Number Range:</strong> 10⁴ to 10⁶</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-3 text-tech-red">Measurement Capabilities</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>Force Measurement:</strong> 6-component balance</li>
                      <li><strong>Pressure Distribution:</strong> Multi-point pressure sensors</li>
                      <li><strong>Flow Visualization:</strong> Smoke and particle tracking</li>
                      <li><strong>Data Acquisition:</strong> Real-time monitoring system</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-card rounded-xl p-8 shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-6 text-tech-cyan">Applications & Testing Capabilities</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-tech-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">✈️</span>
                    </div>
                    <h4 className="font-medium mb-2">Aircraft Models</h4>
                    <p className="text-sm text-muted-foreground">Testing scaled aircraft models for lift, drag, and stability analysis</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-tech-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔧</span>
                    </div>
                    <h4 className="font-medium mb-2">Component Testing</h4>
                    <p className="text-sm text-muted-foreground">Individual component analysis including wings, fuselage, and control surfaces</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-tech-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h4 className="font-medium mb-2">Data Analysis</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive aerodynamic data collection and performance optimization</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-card rounded-xl p-8 shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-6 text-tech-purple">Project Impact & Learning Outcomes</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    This wind tunnel project has been instrumental in understanding the fundamental principles 
                    of aerodynamics and fluid mechanics. Through hands-on construction and testing, valuable 
                    insights were gained into:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 ml-4">
                    <li>• Aerodynamic force measurement techniques</li>
                    <li>• Flow visualization methods</li>
                    <li>• Data acquisition system design</li>
                    <li>• Experimental methodology in aerospace</li>
                    <li>• Safety protocols in testing environments</li>
                    <li>• Performance optimization strategies</li>
                  </ul>
                  <p className="mt-4">
                    The project demonstrates practical application of theoretical knowledge and provides 
                    a foundation for future aerospace engineering endeavors, contributing to safer and 
                    more efficient aircraft design.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-2 bg-tech-blue/20 rounded-full text-sm">Aerodynamics</span>
                    <span className="px-4 py-2 bg-tech-purple/20 rounded-full text-sm">Testing</span>
                    <span className="px-4 py-2 bg-tech-red/20 rounded-full text-sm">Prototype</span>
                    <span className="px-4 py-2 bg-tech-cyan/20 rounded-full text-sm">Data Analysis</span>
                    <span className="px-4 py-2 bg-tech-blue/20 rounded-full text-sm">Fluid Mechanics</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default WindTunnelDetails;
