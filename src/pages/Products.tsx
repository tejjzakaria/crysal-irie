import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { productsApi } from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  mainImage: string;
  badge?: string;
  inStock: boolean;
  stockQuantity: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data);
      } catch (error) {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">جاري تحميل المنتجات...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-semibold mb-2">لا توجد منتجات</h3>
              <p className="text-muted-foreground">
                لم يتم إضافة منتجات بعد. تحقق لاحقاً!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product.slug}`}
                  className="block"
                >
                  <Card className="hover-lift overflow-hidden border-0 shadow-lg group cursor-pointer">
                    <div className="relative h-80 overflow-hidden">
                      {/* Badge */}
                      {product.badge && product.badge !== "none" && (
                        <Badge className="absolute top-4 right-4 z-10 text-base px-3 py-1 bg-accent text-accent-foreground">
                          {product.badge === "new" && "جديد"}
                          {product.badge === "sale" && "تخفيض"}
                          {product.badge === "hot" && "الأكثر مبيعاً"}
                        </Badge>
                      )}

                      {/* Discount Badge */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <Badge className="absolute top-4 left-4 z-10 text-base px-3 py-1">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}

                      {/* Stock Badge */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                          <Badge variant="destructive" className="text-lg px-4 py-2">
                            غير متوفر
                          </Badge>
                        </div>
                      )}

                      <img
                        src={product.mainImage || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">
                            {product.price} MAD
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-lg text-muted-foreground line-through">
                              {product.originalPrice} MAD
                            </span>
                          )}
                        </div>
                        <Button size="lg" disabled={!product.inStock}>
                          {product.inStock ? "أطلبي الآن" : "غير متوفر"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
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
