
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Lightbulb, Star, Share2, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [featureRequest, setFeatureRequest] = useState({
    name: "",
    email: "",
    feature: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingFeature, setIsSubmittingFeature] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeatureRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the Supabase edge function
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon."
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending form:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFeature(true);

    try {
      // Call the Supabase edge function for feature requests
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: featureRequest.name,
          email: featureRequest.email,
          subject: `Feature Request: ${featureRequest.feature}`,
          message: `Feature Request: ${featureRequest.feature}\n\nDescription: ${featureRequest.description}`
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Feature request sent!",
        description: "Thank you for your suggestion. I'll consider it for future updates!"
      });
      
      // Reset form
      setFeatureRequest({
        name: "",
        email: "",
        feature: "",
        description: ""
      });
    } catch (error) {
      console.error("Error sending feature request:", error);
      toast({
        title: "Error",
        description: "Failed to send your feature request. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingFeature(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Geetheerth R - Portfolio',
          text: 'Check out this amazing portfolio!',
          url: window.location.origin,
        });
        toast({
          title: "Thanks for sharing!",
          description: "Your support means a lot!"
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.origin);
      toast({
        title: "Link copied!",
        description: "Portfolio URL copied to clipboard"
      });
    }
  };

  const handleRecommend = () => {
    const message = `Hey! I found this amazing portfolio by Geetheerth R. You should definitely check it out: ${window.location.origin}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="font-bold mb-4 font-poppins text-3xl">Get In Touch</h1>
            <p className="text-muted-foreground max-w-2xl">
              Have a question or want to work together? Feel free to reach out using the contact form below or through any of the provided channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-dark-100 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-6 text-tech-cyan">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-4 text-tech-blue mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">geetheerth@gmail.com</p>
                      <p className="text-muted-foreground text-xs py-0 px-0">
                    </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-4 text-tech-purple mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+91 81229 60345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-4 text-tech-red mt-1" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-muted-foreground">Chennai, India</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Connect With Me</h3>
                  <div className="flex space-x-4">
                    <a href="https://github.dev/Geetheerth-R" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center hover:bg-tech-blue/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                    <a href="https://linkedin.com/in/geetheerth-r-d" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center hover:bg-tech-blue/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="mailto:geetheerth@gmail.com" className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center hover:bg-tech-green/20 transition-colors">
                      <Mail width="20" height="20" className="text-tech-green" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-dark-100 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-tech-purple">Working Hours</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-tech-blue">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-tech-blue">11:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-tech-red">Closed</span>
                  </div>
                </div>
              </div>

              {/* Share & Recommend Section */}
              <div className="mt-8 bg-dark-100 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-tech-cyan">Share My Portfolio</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Love my work? Help others discover it too!
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Portfolio
                  </Button>
                  <Button 
                    onClick={handleRecommend}
                    variant="outline"
                    className="w-full border-tech-green text-tech-green hover:bg-tech-green/10"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Recommend via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div id="contact-form" className="bg-dark-100 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-6">Send Me a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Your Name
                      </label>
                      <Input id="name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required className="bg-dark-200 border-dark-300 focus:border-tech-blue focus:ring focus:ring-tech-blue/50" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium">
                        Your Email
                      </label>
                      <Input id="email" name="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required className="bg-dark-200 border-dark-300 focus:border-tech-blue focus:ring focus:ring-tech-blue/50" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" name="subject" placeholder="How can I help you?" value={formData.subject} onChange={handleChange} required className="bg-dark-200 border-dark-300 focus:border-tech-blue focus:ring focus:ring-tech-blue/50" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Your Message
                    </label>
                    <Textarea id="message" name="message" rows={6} placeholder="Let me know how I can assist you..." value={formData.message} onChange={handleChange} required className="bg-dark-200 border-dark-300 focus:border-tech-blue focus:ring focus:ring-tech-blue/50" />
                  </div>
                  
                  <div>
                    <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90">
                      {isSubmitting ? <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </div> : <div className="flex items-center">
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </div>}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Feature Request Section */}
              <div className="mt-8 bg-dark-100 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-6 h-6 mr-3 text-tech-cyan" />
                  <h2 className="text-xl font-semibold text-tech-cyan">Request a Feature</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Have an idea to make my portfolio better? I'd love to hear your suggestions!
                </p>
                
                <form onSubmit={handleFeatureSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="feature-name" className="block mb-2 text-sm font-medium">
                        Your Name
                      </label>
                      <Input 
                        id="feature-name" 
                        name="name" 
                        placeholder="Enter your name" 
                        value={featureRequest.name} 
                        onChange={handleFeatureChange} 
                        required 
                        className="bg-dark-200 border-dark-300 focus:border-tech-cyan focus:ring focus:ring-tech-cyan/50" 
                      />
                    </div>
                    <div>
                      <label htmlFor="feature-email" className="block mb-2 text-sm font-medium">
                        Your Email
                      </label>
                      <Input 
                        id="feature-email" 
                        name="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={featureRequest.email} 
                        onChange={handleFeatureChange} 
                        required 
                        className="bg-dark-200 border-dark-300 focus:border-tech-cyan focus:ring focus:ring-tech-cyan/50" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="feature-title" className="block mb-2 text-sm font-medium">
                      Feature Title
                    </label>
                    <Input 
                      id="feature-title" 
                      name="feature" 
                      placeholder="e.g., Dark/Light Mode Toggle, Interactive Resume..." 
                      value={featureRequest.feature} 
                      onChange={handleFeatureChange} 
                      required 
                      className="bg-dark-200 border-dark-300 focus:border-tech-cyan focus:ring focus:ring-tech-cyan/50" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="feature-description" className="block mb-2 text-sm font-medium">
                      Feature Description
                    </label>
                    <Textarea 
                      id="feature-description" 
                      name="description" 
                      rows={4} 
                      placeholder="Describe your feature idea in detail..." 
                      value={featureRequest.description} 
                      onChange={handleFeatureChange} 
                      required 
                      className="bg-dark-200 border-dark-300 focus:border-tech-cyan focus:ring focus:ring-tech-cyan/50" 
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      disabled={isSubmittingFeature} 
                      className="w-full rounded-xl bg-gradient-to-r from-tech-cyan to-tech-blue hover:opacity-90"
                    >
                      {isSubmittingFeature ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Lightbulb className="mr-2 h-5 w-5" />
                          Submit Feature Request
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* FAQ */}
              <div className="mt-8 bg-dark-100 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-tech-blue">What services do you offer?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      As a Computer Science student, I offer web development, machine learning solutions, and programming assistance for academic projects.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-tech-purple">Are you available for internship opportunities?</h3>
                    <p className="text-sm text-muted-foreground mt-1">Yes, I'm actively looking for internship opportunities in software development, machine learning, and embedded systems.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-tech-red">How quickly do you respond to the mail?</h3>
                    <p className="text-sm text-muted-foreground mt-1">I typically respond to all messages within 24-48 hours.</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-tech-cyan">Do you implement user-suggested features?</h3>
                    <p className="text-sm text-muted-foreground mt-1">Absolutely! I love incorporating user feedback and suggestions to continuously improve the portfolio experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Contact;
