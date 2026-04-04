import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2 } from "lucide-react";
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
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        // Show only first 4 products on homepage
        setProducts(data.slice(0, 4));
      } catch (error) {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Link
                key={product._id}
                to={`/product/${product.slug}`}
                className="block"
              >
                <Card
                  className={`hover-lift overflow-hidden border-0 shadow-lg group ${
                    product.badge === "hot" ? "ring-2 ring-primary" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="relative overflow-hidden">
                    {/* Discount Badge */}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <Badge className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                    {/* Product Badge */}
                    {product.badge && product.badge !== "none" && (
                      <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground">
                        {product.badge === "new" && "جديد"}
                        {product.badge === "sale" && "تخفيض"}
                        {product.badge === "hot" && "عرض خاص"}
                      </Badge>
                    )}
                    {/* Out of Stock Badge */}
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
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary">
                        {product.price} MAD
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          {product.originalPrice} MAD
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full rounded-full group-hover:scale-105 transition-transform"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 ml-2" />
                      {product.inStock ? "أطلبي الآن" : "غير متوفر"}
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* View All Products Button */}
        {!loading && products.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                عرض جميع المنتجات
              </Button>
            </Link>
          </div>
        )}

        
      </div>
    </section>
  );
};

export default Products;
