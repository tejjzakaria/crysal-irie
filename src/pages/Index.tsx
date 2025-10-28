import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <Products />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
