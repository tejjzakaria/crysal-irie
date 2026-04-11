import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { heroApi } from "@/lib/api";

interface HeroData {
  trustBadge: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  backgroundImage: string;
}

const DEFAULT_HERO_DATA: HeroData = {
  trustBadge: "4.9/5 من أكثر من 10,000+ عميلة",
  headline: "جاذبية طبيعية لا تُقاوم",
  subheadline: "زيوت طبيعية فاخرة مُعززة بالفيرمونات، مصممة لتترك انطباعاً لا يُنسى وإطلالة متألقة",
  ctaText: "تسوقي الآن",
  backgroundImage: "/crystal images/GODDESS_ROSE_Mockup_Style1 copy 2.webp",
};

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData>(DEFAULT_HERO_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch hero data from API
    const fetchHeroData = async () => {
      try {
        const data = await heroApi.get();
        setHeroData({
          trustBadge: data.trustBadge,
          headline: data.headline,
          subheadline: data.subheadline,
          ctaText: data.ctaText,
          backgroundImage: data.backgroundImage,
        });
      } catch (error) {
        // Keep default data on error
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();

    // Refresh data every 30 seconds to show updates from dashboard
    const interval = setInterval(fetchHeroData, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="relative flex items-center justify-center overflow-hidden" dir="rtl">
        <div className="w-full h-[600px] md:h-[750px] lg:h-[950px] relative bg-gradient-to-br from-[hsl(180,30%,95%)] to-[hsl(180,20%,88%)] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground/60">جاري التحميل...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex items-center justify-center overflow-hidden" dir="rtl">
      <div className="w-full h-[600px] md:h-[750px] lg:h-[950px] relative">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${heroData.backgroundImage}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />

        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/75" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs lg:text-sm text-white/90 font-medium whitespace-nowrap">
              {heroData.trustBadge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-white max-w-4xl px-2">
            {heroData.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-2xl px-4">
            {heroData.subheadline}
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={scrollToProducts}
            className="text-sm sm:text-base lg:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 text-white font-bold"
          >
            {heroData.ctaText}
          </Button>

        </div>
      </div>
    </section>
  );
};

export default Hero;
