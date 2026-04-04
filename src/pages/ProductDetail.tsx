import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Sparkles, Heart, Shield, Droplet, Loader2, ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";
import { productsApi } from "@/lib/api";
import OrderForm from "@/components/OrderForm";

interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  mainImage: string;
  images?: string[];
  badge?: string;
  inStock: boolean;
  stockQuantity: number;
  features?: string[];
  properties?: { [key: string]: string };
  offers?: Array<{ title: string; description: string; price: number; validUntil?: Date }>;
}

// Review screenshot images from public/reviews folder
const REVIEW_IMAGES = [
  'IMG_2509.jpg',
  'IMG_4461.jpg',
  'IMG_4462.jpg',
  'IMG_4501.jpg',
  'IMG_4512.jpg',
  'IMG_4521.jpg',
  'IMG_4528.jpg',
  'IMG_4582.jpg',
  'IMG_4591.jpg',
  'IMG_4594.jpg',
  'IMG_4624 2.jpg',
  'IMG_4628.jpg',
  'IMG_4630 2.jpg',
  'IMG_4656 2.jpg',
  'IMG_4657 2.jpg',
  'IMG_4662.jpg',
  'IMG_4693.jpg',
  'IMG_4716.jpg',
  'IMG_4739.jpg',
  'IMG_4747.jpg',
  'IMG_4826.jpg',
  'IMG_4891 2.jpg',
  'IMG_4902.jpg',
  'IMG_4972.jpg',
  'IMG_5010.jpg',
  'IMG_5029.jpg',
  'IMG_5031.jpg',
  'IMG_5105.jpg',
  'IMG_5121.jpg',
  'IMG_5158.jpg',
  'IMG_5162.jpg',
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openAccordions, setOpenAccordions] = useState<{[key: string]: boolean}>({
    short: false,
    full: true
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const openLightbox = (imagePath: string) => {
    setLightboxImage(imagePath);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage('');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await productsApi.getBySlug(slug);
        setProduct(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!product) return;

    const ttq = (window as any).ttq;
    if (ttq?.track) {
      ttq.track("ViewContent", {
        content_name: product.name,
        content_type: "product",
        content_id: product.slug,
        value: product.price,
        currency: "USD",
      });
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">جاري تحميل المنتج...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">المنتج غير موجود</h1>
          <Link to="/products">
            <Button>العودة للمنتجات</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Combine mainImage and additional images
  const allImages = [
    product.mainImage,
    ...(product.images || [])
  ].filter(Boolean);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section with Product */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div 
          className="absolute inset-0 animate-gradient -z-10"
          style={{
            background: "var(--gradient-hero)",
            backgroundSize: "200% 200%"
          }}
        />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image Gallery */}
            <div className="relative space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                {/* Discount Badge */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <Badge className="absolute top-6 left-6 z-10 text-lg px-4 py-2 bg-secondary text-secondary-foreground">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}
                {/* Product Badge */}
                {product.badge && product.badge !== "none" && (
                  <Badge className="absolute top-6 right-6 z-10 text-lg px-4 py-2 bg-accent text-accent-foreground">
                    {product.badge === "new" && "جديد"}
                    {product.badge === "sale" && "تخفيض"}
                    {product.badge === "hot" && "الأكثر مبيعاً"}
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

                {/* Main Image */}
                <img
                  src={allImages[selectedImageIndex] || "/placeholder.svg"}
                  alt={`${product.name} - صورة ${selectedImageIndex + 1}`}
                  className="w-full h-[600px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                      aria-label="الصورة السابقة"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                      aria-label="الصورة التالية"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm z-10">
                      {selectedImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-primary scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - صورة مصغرة ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info & Form */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {product.price} MAD
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-2xl text-muted-foreground line-through">
                      {product.originalPrice} MAD
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {product.features && product.features.length > 0 ? (
                    product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-lg">
                        <Check className="w-5 h-5 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                {/* Short Description */}
                {product.shortDescription && (
                  <div className="glass-card rounded-xl overflow-hidden border border-primary/10 mb-4">
                    <button
                      onClick={() => toggleAccordion('short')}
                      className="w-full flex items-center justify-between p-5 hover:bg-primary/5 transition-colors"
                    >
                      <span className="text-lg font-bold">الوصف المختصر</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openAccordions.short ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        openAccordions.short ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-5 pt-0 border-t border-primary/10">
                          <p className="text-muted-foreground leading-relaxed">
                            {product.shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Form */}
              <OrderForm
                productName={product.name}
                productPrice={`${product.price} MAD`}
                productSlug={product.slug}
                options={product.offers && product.offers.length > 0
                  ? product.offers.map((offer, index) => ({
                      label: offer.title || "",
                      price: offer.price ? `${offer.price} MAD` : `${product.price} MAD`,
                      description: offer.description || "",
                      highlighted: index === product.offers!.length - 1,
                    }))
                  : []
                }
              />

              {/* Full Description */}
              {product.fullDescription && (
                <div className="glass-card rounded-xl overflow-hidden border border-primary/10">
                  <button
                    onClick={() => toggleAccordion('full')}
                    className="w-full flex items-center justify-between p-5 hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-lg font-bold">الوصف الكامل</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openAccordions.full ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openAccordions.full ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 pt-0 border-t border-primary/10">
                        <div
                          className="prose prose-sm sm:prose lg:prose-lg max-w-none text-muted-foreground leading-relaxed"
                          dir="rtl"
                          dangerouslySetInnerHTML={{ __html: product.fullDescription }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto px-4">
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
        <div className="container mx-auto max-w-4xl px-4">
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
        <div className="container mx-auto max-w-4xl px-4">
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
        <div className="container mx-auto max-w-4xl px-4">
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

          {/* Customer Review Screenshots */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-6">
              تقييمات عملائنا 📸
            </h3>
            <p className="text-center text-muted-foreground mb-8">
              شاهدي ما يقوله عملاؤنا السعداء عن منتجاتنا
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {REVIEW_IMAGES.map((image, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-xl"
                  onClick={() => openLightbox(`/reviews/${image}`)}
                >
                  <img
                    src={`/reviews/${image}`}
                    alt={`تقييم عميل ${index + 1}`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
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
        <div className="container mx-auto max-w-4xl px-4">
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

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-4xl max-h-[90vh] relative">
            <img
              src={lightboxImage}
              alt="تقييم عميل"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
