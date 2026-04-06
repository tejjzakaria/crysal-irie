import { Sparkles, Heart, Shield, Users } from "lucide-react";

const About = () => {
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
            من نحن
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            قصة Crystal Oil: رحلة نحو الجمال الطبيعي
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              قصتنا
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                بدأت رحلتنا من حلم بسيط: تقديم منتجات طبيعية فاخرة بجودة عالية لكل امرأة تبحث عن الأفضل لبشرتها.
              </p>
              <p>
                في Crystal Oil، نؤمن بأن الجمال الحقيقي يأتي من الطبيعة. لذلك نختار بعناية فائقة أجود المكونات الطبيعية من مختلف أنحاء العالم لنقدم لك منتجات تجمع بين الفخامة والفعالية.
              </p>
              <p>
                كل منتج نصنعه يحمل حباً وشغفاً بالتفاصيل، من اختيار المكونات إلى التغليف الأنيق. نحن لا نبيع منتجات فحسب، بل نقدم تجربة فريدة للعناية بالجمال الطبيعي.
              </p>
              <p>
                اليوم، نفخر بثقة آلاف العميلات اللواتي اخترن Crystal Oil رفيقاً في رحلتهن نحو جمال طبيعي وإشراقة دائمة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            قيمنا
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">الجودة</h3>
              <p className="text-muted-foreground">
                نلتزم بأعلى معايير الجودة في كل منتج نقدمه
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">الشغف</h3>
              <p className="text-muted-foreground">
                نعشق ما نقوم به ونضع قلوبنا في كل تفصيلة
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">الأمان</h3>
              <p className="text-muted-foreground">
                منتجات آمنة ومختبرة لراحة بالك
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">الثقة</h3>
              <p className="text-muted-foreground">
                نبني علاقات طويلة الأمد مع عملائنا
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            لماذا Crystal Oil؟
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">✓ مكونات طبيعية 100%</h3>
              <p className="text-muted-foreground">
                نستخدم فقط مكونات طبيعية نقية خالية من الكيماويات الضارة
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">✓ جودة مضمونة</h3>
              <p className="text-muted-foreground">
                جميع منتجاتنا مختبرة طبياً ومعتمدة من جهات صحية موثوقة
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">✓ نتائج فعالة</h3>
              <p className="text-muted-foreground">
                آلاف العميلات السعيدات شاهدن نتائج مذهلة
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">✓ خدمة ممتازة</h3>
              <p className="text-muted-foreground">
                دعم متواصل وتوصيل سريع لجميع أنحاء المغرب
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">✓ أسعار منافسة</h3>
              <p className="text-muted-foreground">
                جودة عالية بأسعار معقولة مع عروض وخصومات دائمة
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">✓ ضمان الرضا</h3>
              <p className="text-muted-foreground">
                ضمان استرجاع المال إذا لم تكوني راضية تماماً
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              أرقام تتحدث عن نفسها
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  5000+
                </div>
                <div className="text-muted-foreground">عميلة راضية</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  4.9/5
                </div>
                <div className="text-muted-foreground">تقييم العملاء</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  100%
                </div>
                <div className="text-muted-foreground">طبيعي</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  24/7
                </div>
                <div className="text-muted-foreground">دعم متواصل</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
