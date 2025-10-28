import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Crystalirie 💗👑",
    text: "هاد زيت Crystalirie راه خطير بزاف 😍",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/others/L4RcVSBxwSS2Oe4Jgp2nvTcCb5oDlM2KoSY8HJoz.jpg",
  },
  {
    name: "وااااعر 🔥",
    text: "كلهم فيهم لمسة واقعية + جاذبية 😍",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/others/iWQsTRIPwRjNWoqrGUxbZuH2mIPFflCK7ZJvNA7r.jpg",
  },
  {
    name: "majda madouni",
    text: "منين كنحط هاد الزيت، كولشي كيبدا يسول: \"شنو هاد الريحة الزوينة؟\" 😍 كنقول ليهم بكل ثقة: \"هاد سحر Crystalirie، ماشي غير عطر!\" ✨🧴",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/others/3azbof3ZhkMf6bB0XusJ9Yg7kKIMTZsBvW4yRjmX.jpg",
  },
  {
    name: "imane aalillat",
    text: "عمري ما جربت شي حاجة كتخلي الناس يسولوني على الريحة بحال Crystalirie 👃🔥 ماشي غير زيت… هادي تجربة 💎",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/others/AUAzJp5T12cLZdgl5j6ZKITz2uPrZ824Uk33MRAu.jpg",
  },
  {
    name: "مريم",
    text: "منين كندير زيت Crystalirie، كنحس بحالي مبدّلة 😏 الثقة كتطلع، والناس كيتقربو بلا ما تسولهم! ريحة كتبقى فالبال… كتبدا القصص بلا كلام 😮‍💨💋",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/others/h6hrKMoLJ6CG4mPhMnR7iXRPAIoN51zB0HYCMrls.jpg",
  },
  {
    name: "سلمى ✨",
    text: "كنت كنشك فأول، لكن من بعد ما جربت Crystalirie، بديت كنعرف شنو يعني زيت فاخر! بشرتي ولات ناعمة وريحة رائعة كتدوم طول النهار 💕",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/others/L4RcVSBxwSS2Oe4Jgp2nvTcCb5oDlM2KoSY8HJoz.jpg",
  },
  {
    name: "هدى 🌸",
    text: "جربت بزاف ديال المنتجات ولكن Crystalirie كانت فعلا مختلفة! جودة عالية وثمن معقول. دابا ولات ديالي كل يوم 💯",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/others/iWQsTRIPwRjNWoqrGUxbZuH2mIPFflCK7ZJvNA7r.jpg",
  },
  {
    name: "نادية 👑",
    text: "والله حتى صحابي لاحظو الفرق! كيسولوني دائماً شنو كنستعمل. Crystalirie هي السر ديالي 🤫 التوصيل كان سريع والمنتج أصلي 100% 🎁",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/others/3azbof3ZhkMf6bB0XusJ9Yg7kKIMTZsBvW4yRjmX.jpg",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            آراء زبناءنا
          </h2>
          <p className="text-xl text-muted-foreground">
            تجارب حقيقية من عملائنا المميزين
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover-lift border-0 shadow-lg"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {testimonial.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
