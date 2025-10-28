import { CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "جودة لا تضاهى",
      description: "نستخدم أجود المكونات الطبيعية من مصادر موثوقة حول العالم"
    },
    {
      title: "خبرة سنوات",
      description: "سنوات من الخبرة في صناعة منتجات العناية الطبيعية الفاخرة"
    },
    {
      title: "تركيبات فريدة",
      description: "وصفات خاصة ومطورة بعناية لتحقيق أفضل النتائج"
    },
    {
      title: "توصيل سريع",
      description: "نوصل لجميع مدن المغرب مع خدمة الدفع عند الاستلام"
    },
    {
      title: "دعم متواصل",
      description: "فريق خدمة العملاء جاهز للرد على استفساراتك في أي وقت"
    },
    {
      title: "أسعار تنافسية",
      description: "عروض وخصومات حصرية على المجموعات والطلبيات الكبيرة"
    }
  ];

  return (
    <section className="py-20 px-4" dir="rtl">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              لماذا تختارين Crystalirie؟ 💎
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              نحن لسنا مجرد متجر للمنتجات الطبيعية، بل شريكك في رحلة العناية بجمالك الطبيعي.
              نلتزم بتقديم أفضل المنتجات وأكثرها فعالية لتحصلي على النتائج التي تستحقينها.
            </p>
            <div className="space-y-4">
              {reasons.slice(0, 3).map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {reasons.slice(3).map((reason, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
