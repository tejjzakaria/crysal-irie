import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollOneScreen = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20" dir="rtl">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 animate-gradient"
        style={{
          background: "var(--gradient-hero)",
          backgroundSize: "200% 200%"
        }}
      />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + "s",
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6 glass-card px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">منتجات طبيعية 100%</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">CRYSTAL</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              {" "}OIL
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            اكتشفي سحر الزيوت الطبيعية والصابون الكريستالي الفاخر
            <br />
            جمال طبيعي وعطور تبقى في البال
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={scrollToProducts}
            >
              تسوقي الآن
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 rounded-full glass-card hover:bg-white/50 transition-all duration-300"
              onClick={() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })}
            >
              آراء العملاء
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={scrollOneScreen}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
