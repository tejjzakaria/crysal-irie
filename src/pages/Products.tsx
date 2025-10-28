import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";

const Products = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient -z-10"
          style={{
            background: "var(--gradient-hero)",
            backgroundSize: "200% 200%"
          }}
        />
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            منتجاتنا الفاخرة 💎
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            اكتشفي مجموعتنا الكاملة من الزيوت والصابون الطبيعي الفاخر
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block"
              >
                <Card className="hover-lift overflow-hidden border-0 shadow-lg group cursor-pointer">
                  <div className="relative h-80 overflow-hidden">
                    {product.discount && (
                      <Badge className="absolute top-4 left-4 z-10 text-base px-3 py-1">
                        -{product.discount}
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="absolute top-4 right-4 z-10 text-base px-3 py-1 bg-accent text-accent-foreground">
                        عرض خاص
                      </Badge>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                          {product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            {product.oldPrice}
                          </span>
                        )}
                      </div>
                      <Button size="lg">
                        أطلبي الآن
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto text-center">
          <div className="glass-card rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              محتارة في الاختيار؟ 🤔
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              تواصلي معنا وسنساعدك في اختيار المنتج المناسب لك
            </p>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8">
                اتصلي بنا الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
