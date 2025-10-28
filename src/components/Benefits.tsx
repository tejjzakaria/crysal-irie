import { Sparkles, Heart, Shield, Zap } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: "مكونات طبيعية 100%",
      description: "مستخلصات نقية من الطبيعة، خالية من المواد الكيميائية الضارة"
    },
    {
      icon: Heart,
      title: "مناسبة لجميع أنواع البشرة",
      description: "منتجات آمنة وفعالة لكل أنواع البشرة حتى الحساسة منها"
    },
    {
      icon: Shield,
      title: "مختبرة ومعتمدة",
      description: "منتجات مختبرة طبياً ومعتمدة من جهات صحية موثوقة"
    },
    {
      icon: Zap,
      title: "نتائج سريعة ومضمونة",
      description: "لاحظي الفرق من أول استخدام، نتائج مذهلة في الحين"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            لماذا منتجاتنا الأفضل؟ ✨
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نقدم لك منتجات طبيعية فاخرة بجودة عالية ونتائج مضمونة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
