import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { categoriesApi } from "@/lib/api";

interface Category {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  order: number;
  isActive: boolean;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoriesApi
      .getAll()
      .then((data: Category[]) => {
        const active = data
          .filter((c) => c.isActive)
          .sort((a, b) => a.order - b.order);
        setCategories(active);
      })
      .catch(() => {
        // Silently fail — section simply won't render
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4" dir="rtl">
        <div className="container mx-auto flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-20 px-4" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            تصفحي مجموعتنا
          </h2>
          <p className="text-xl text-muted-foreground">
            منتجات طبيعية بجودة عالية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category._id}
              to={`/products?category=${encodeURIComponent(category.title)}`}
              className="block"
              aria-label={`عرض منتجات فئة ${category.title}`}
            >
              <Card
                className="hover-lift overflow-hidden border-0 shadow-lg cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-white/90">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
                {category.details && (
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {category.details}
                    </p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
