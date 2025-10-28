import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { products } from "@/data/products";

const Products = () => {
  return (
    <section id="products" className="py-20 px-4 bg-muted/30" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            المنتجات المميزة
          </h2>
          <p className="text-xl text-muted-foreground">
            الأكثر طلباً من زبناءنا
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.id}`}
              className="block"
            >
              <Card
                className={`hover-lift overflow-hidden border-0 shadow-lg group ${
                  product.featured ? "ring-2 ring-primary" : ""
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative overflow-hidden">
                  {product.discount && (
                    <Badge className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground">
                      -{product.discount}
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground">
                      عرض خاص
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button className="w-full rounded-full group-hover:scale-105 transition-transform">
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    أطلبي الآن
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Special Bundle Section */}
        <div className="mt-16 glass-card rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            عرض خاص محدود 🎁
          </h3>
          <p className="text-xl text-muted-foreground mb-6">
            اشتري 4 زجاجات بـ 399 درهم فقط بدل 690 درهم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">اختاري الحجم:</div>
              <div className="space-y-2">
                <div className="glass-card px-4 py-2 rounded-lg">4 زجاجات (15مل) ب 199 درهم</div>
                <div className="glass-card px-4 py-2 rounded-lg">4 زجاجات (30مل) ب 299 درهم</div>
                <div className="glass-card px-4 py-2 rounded-lg bg-primary/10">4 زجاجات (118مل) ب 399 درهم ⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
