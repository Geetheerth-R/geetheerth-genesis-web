
import { HeroSection } from "@/components/HeroSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-grow">
          <HeroSection />
        </main>
      </PageTransition>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
