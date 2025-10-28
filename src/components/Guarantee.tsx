import { ShieldCheck, Truck, RefreshCcw, HeadphonesIcon } from "lucide-react";

const Guarantee = () => {
  const guarantees = [
    {
      icon: ShieldCheck,
      title: "ضمان الجودة",
      description: "منتجات أصلية 100% مع شهادات الجودة والاعتماد"
    },
    {
      icon: Truck,
      title: "توصيل مجاني",
      description: "توصيل مجاني لجميع الطلبيات فوق 300 درهم"
    },
    {
      icon: RefreshCcw,
      title: "ضمان الاسترجاع",
      description: "استرجاع المال خلال 14 يوم إذا لم تكوني راضية"
    },
    {
      icon: HeadphonesIcon,
      title: "دعم 24/7",
      description: "فريق خدمة العملاء جاهز لمساعدتك في أي وقت"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            راحة بالك أولويتنا 🛡️
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نضمن لك تجربة تسوق آمنة ومريحة مع أفضل الخدمات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-8">
            موثوق بها من طرف آلاف العميلات 💝
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-sm text-muted-foreground">عميلة راضية</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">تقييم العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">طبيعي</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">دعم متواصل</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
