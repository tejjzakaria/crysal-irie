import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Sparkles, Package } from "lucide-react";

const categories = [
  {
    title: "صابون الكريستال",
    description: "صابون فاخر مع كريستال طبيعي",
    details: "صابون مصنوع بعناية فائقة مع كريستالات طبيعية لتنظيف عميق ولطيف للبشرة",
    icon: Sparkles,
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/categories/szIhOAV42hv1q761nHoXOgU6NcM0WwoZdqhJBu26_md.jpg",
  },
  {
    title: "زيوت طبيعية",
    description: "زيوت فرمونية وعطرية طبيعية",
    details: "مجموعة فريدة من الزيوت الطبيعية مع روائح فواحة تدوم طوال اليوم",
    icon: Droplet,
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/categories/UiLgL54i2ZMj7JF1szKhmYtgWYtoFzKw8PJ2ThbE_md.jpg",
  },
  {
    title: "كتل الصابون",
    description: "قطع صابون طبيعية بأحجام مختلفة",
    details: "صابون طبيعي خالي من المواد الكيميائية، مناسب لجميع أنواع البشرة",
    icon: Package,
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/categories/2WY7GFfUsqmb0ScLOJ7Pb8raWfWxwpX1pHxCcDcq_md.jpg",
  },
];

const Categories = () => {
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
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="hover-lift overflow-hidden border-0 shadow-lg"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/90">
                      {category.description}
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {category.details}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
