import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Check } from "lucide-react";
import { products } from "@/data/products";
import OrderForm from "@/components/OrderForm";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">المنتج غير موجود</h1>
          <Link to="/">
            <Button>العودة للصفحة الرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowRight className="w-4 h-4" />
              العودة
            </Button>
          </Link>
          <h2 className="text-xl font-bold">
            CRYSTAL<span className="text-primary">+</span>IRIE
          </h2>
        </div>
      </header>

      {/* Hero Section with Product */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div 
          className="absolute inset-0 animate-gradient -z-10"
          style={{
            background: "var(--gradient-hero)",
            backgroundSize: "200% 200%"
          }}
        />

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                {product.discount && (
                  <Badge className="absolute top-6 left-6 z-10 text-lg px-4 py-2 bg-secondary text-secondary-foreground">
                    -{product.discount}
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-6 right-6 z-10 text-lg px-4 py-2 bg-accent text-accent-foreground">
                    عرض خاص
                  </Badge>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>

            {/* Product Info & Form */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {product.longDescription || product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-lg">
                    <Check className="w-5 h-5 text-primary" />
                    <span>منتجات طبيعية 100%</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <Check className="w-5 h-5 text-primary" />
                    <span>جودة عالية ومضمونة</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <Check className="w-5 h-5 text-primary" />
                    <span>توصيل لجميع أنحاء المغرب</span>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="glass-card rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">معلومات الطلب</h3>
                <OrderForm
                  productName={product.name}
                  productPrice={product.price}
                  options={product.options}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            آراء العملاء
          </h2>
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-xl font-bold mr-2">(4.9/5)</span>
            </div>
            <p className="text-center text-lg text-muted-foreground">
              مئات العملاء السعداء يثقون في منتجاتنا الطبيعية
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
