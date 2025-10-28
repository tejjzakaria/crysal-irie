import { Droplet, Hand, Clock, Sparkles } from "lucide-react";

const HowToUse = () => {
  const steps = [
    {
      icon: Hand,
      number: "1",
      title: "نظفي البشرة",
      description: "اغسلي بشرتك بالماء الدافئ وجففيها بلطف بمنشفة ناعمة"
    },
    {
      icon: Droplet,
      number: "2",
      title: "ضعي القليل من الزيت",
      description: "خذي 2-3 قطرات من الزيت على راحة يدك، كمية قليلة تكفي"
    },
    {
      icon: Clock,
      number: "3",
      title: "دلكي بحركات دائرية",
      description: "دلكي البشرة بحركات دائرية لطيفة لمدة دقيقتين حتى يتشرب الزيت"
    },
    {
      icon: Sparkles,
      number: "4",
      title: "استمتعي بالنتائج",
      description: "استخدمي يومياً صباحاً ومساءً للحصول على أفضل النتائج"
    }
  ];

  return (
    <section className="py-20 px-4" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            طريقة الاستخدام 📖
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اتبعي هذه الخطوات البسيطة للحصول على أفضل النتائج
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
            >
              <div className="glass-card rounded-2xl p-8 h-full hover:scale-105 transition-transform duration-300">
                {/* Step number badge */}
                <div className="absolute -top-4 right-1/2 transform translate-x-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {step.number}
                </div>

                <div className="mt-6 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -left-4 w-8 h-0.5 bg-gradient-to-l from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            نصائح إضافية للاستخدام الأمثل ⭐
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <span className="text-primary text-xl">✓</span>
              <div>
                <h4 className="font-bold mb-1">الاستخدام المنتظم</h4>
                <p className="text-muted-foreground text-sm">
                  استخدمي المنتج يومياً للحصول على أفضل النتائج
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-xl">✓</span>
              <div>
                <h4 className="font-bold mb-1">الكمية المناسبة</h4>
                <p className="text-muted-foreground text-sm">
                  القليل يكفي، لا تستخدمي كمية كبيرة
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-xl">✓</span>
              <div>
                <h4 className="font-bold mb-1">الحفظ الصحيح</h4>
                <p className="text-muted-foreground text-sm">
                  احفظي المنتج في مكان بارد بعيداً عن الشمس
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-xl">✓</span>
              <div>
                <h4 className="font-bold mb-1">اختبار الحساسية</h4>
                <p className="text-muted-foreground text-sm">
                  جربي كمية صغيرة أولاً إذا كانت بشرتك حساسة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
