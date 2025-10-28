import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Sparkles, Heart, Shield, Droplet } from "lucide-react";
import { products } from "@/data/products";
import OrderForm from "@/components/OrderForm";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">المنتج غير موجود</h1>
          <Link to="/">
            <Button>العودة للصفحة الرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section with Product */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div 
          className="absolute inset-0 animate-gradient -z-10"
          style={{
            background: "var(--gradient-hero)",
            backgroundSize: "200% 200%"
          }}
        />

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                {product.discount && (
                  <Badge className="absolute top-6 left-6 z-10 text-lg px-4 py-2 bg-secondary text-secondary-foreground">
                    -{product.discount}
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-6 right-6 z-10 text-lg px-4 py-2 bg-accent text-accent-foreground">
                    عرض خاص
                  </Badge>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>

            {/* Product Info & Form */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {product.longDescription || product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-lg">
                    <Check className="w-5 h-5 text-primary" />
                    <span>منتجات طبيعية 100%</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <Check className="w-5 h-5 text-primary" />
                    <span>جودة عالية ومضمونة</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <Check className="w-5 h-5 text-primary" />
                    <span>توصيل لجميع أنحاء المغرب</span>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="glass-card rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">معلومات الطلب</h3>
                <OrderForm
                  productName={product.name}
                  productPrice={product.price}
                  options={product.options}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            فوائد المنتج 💎
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">ترطيب عميق</h3>
              <p className="text-muted-foreground text-sm">
                يرطب البشرة بعمق ويمنحها النعومة والإشراقة
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">رائحة فواحة</h3>
              <p className="text-muted-foreground text-sm">
                عطر طبيعي يدوم طويلاً ويجذب الانتباه
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">حماية البشرة</h3>
              <p className="text-muted-foreground text-sm">
                يحمي البشرة من الجفاف والعوامل الخارجية
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">امتصاص سريع</h3>
              <p className="text-muted-foreground text-sm">
                قوام خفيف يمتصه الجلد بسرعة دون ترك أثر دهني
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            المكونات الطبيعية 🌿
          </h2>
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <p className="text-center text-lg text-muted-foreground mb-8">
              نستخدم أجود المكونات الطبيعية المختارة بعناية
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">زيوت طبيعية نقية</h4>
                  <p className="text-sm text-muted-foreground">
                    مستخلصة من أفضل المصادر الطبيعية
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">فيتامينات مغذية</h4>
                  <p className="text-sm text-muted-foreground">
                    غنية بفيتامين E وC لتغذية البشرة
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">مضادات الأكسدة</h4>
                  <p className="text-sm text-muted-foreground">
                    تحارب علامات الشيخوخة وتجدد الخلايا
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">خالي من الكيماويات</h4>
                  <p className="text-sm text-muted-foreground">
                    بدون بارابين أو مواد ضارة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            طريقة الاستخدام 📝
          </h2>
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">نظفي بشرتك جيداً</h4>
                  <p className="text-muted-foreground">
                    اغسلي وجهك أو جسمك بالماء الدافئ وجففيه بلطف
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">ضعي كمية مناسبة</h4>
                  <p className="text-muted-foreground">
                    خذي 2-3 قطرات من الزيت على راحة يدك
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">دلكي بلطف</h4>
                  <p className="text-muted-foreground">
                    دلكي البشرة بحركات دائرية لمدة دقيقتين
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">استخدمي يومياً</h4>
                  <p className="text-muted-foreground">
                    للحصول على أفضل النتائج، استخدمي المنتج مرتين يومياً
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            آراء العملاء ⭐
          </h2>

          {/* Overall Rating */}
          <div className="glass-card rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-xl font-bold mr-2">(4.9/5)</span>
            </div>
            <p className="text-center text-lg text-muted-foreground">
              مئات العملاء السعداء يثقون في منتجاتنا الطبيعية
            </p>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold">
                  س
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">سلمى أحمد</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    منتج رائع! استخدمته لمدة أسبوعين والنتيجة مذهلة. بشرتي أصبحت أكثر نعومة وإشراقة. الرائحة جميلة جداً وتدوم طويلاً. أنصح به بشدة! 💕
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold">
                  ه
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">هدى المنصوري</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    كنت أبحث عن منتج طبيعي وآمن لبشرتي الحساسة، ولقيت ضالتي في هذا الزيت. ما سبب لي أي حساسية ونتيجته ممتازة. التوصيل كان سريع والتغليف محترم. شكراً Crystal Oil! 🌸
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold">
                  ن
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">نادية العلوي</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    أفضل استثمار في العناية بالبشرة! السعر معقول جداً مقارنة بالجودة العالية. جربت منتجات كثيرة ولكن هذا هو الأفضل بدون منازع. راح أطلب مرة ثانية أكيد! 👑
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            أسئلة شائعة عن المنتج 💬
          </h2>
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-3">هل المنتج مناسب لجميع أنواع البشرة؟</h4>
              <p className="text-muted-foreground leading-relaxed">
                نعم، المنتج طبيعي 100% ومناسب لجميع أنواع البشرة بما في ذلك البشرة الحساسة. إذا كنت تعانين من حساسية شديدة، يُنصح بتجربة كمية صغيرة أولاً.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-3">كم مرة يجب أن أستخدم المنتج؟</h4>
              <p className="text-muted-foreground leading-relaxed">
                للحصول على أفضل النتائج، نوصي باستخدام المنتج مرتين يومياً - مرة في الصباح ومرة في المساء. يمكنك أيضاً استخدامه حسب الحاجة.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-3">متى ألاحظ النتائج؟</h4>
              <p className="text-muted-foreground leading-relaxed">
                معظم العملاء يلاحظون تحسناً فورياً في نعومة البشرة. للحصول على نتائج كاملة، استخدمي المنتج بانتظام لمدة 2-4 أسابيع.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-3">كم تدوم الزجاجة؟</h4>
              <p className="text-muted-foreground leading-relaxed">
                حسب الاستخدام، الزجاجة عادة تدوم من 4 إلى 8 أسابيع. القليل من المنتج يكفي لكل استخدام، مما يجعله اقتصادياً جداً.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-3">هل يمكن استخدامه مع منتجات أخرى؟</h4>
              <p className="text-muted-foreground leading-relaxed">
                نعم، يمكن استخدام المنتج مع روتين العناية بالبشرة الخاص بك. ضعيه بعد تنظيف البشرة وقبل استخدام المرطب أو المكياج.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
