import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import HowToUse from "@/components/HowToUse";
import WhyChooseUs from "@/components/WhyChooseUs";
import Guarantee from "@/components/Guarantee";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Benefits />
      <Categories />
      <Products />
      <HowToUse />
      <WhyChooseUs />
      <Guarantee />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Index;
