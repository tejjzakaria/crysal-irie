import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "كيف أعرف أن المنتج مناسب لبشرتي؟",
      answer: "جميع منتجاتنا طبيعية 100% ومناسبة لجميع أنواع البشرة حتى الحساسة منها. إذا كان لديك حساسية معينة، يمكنك التواصل معنا وسنساعدك في اختيار المنتج الأنسب."
    },
    {
      question: "كم من الوقت يستغرق التوصيل؟",
      answer: "عادة ما يستغرق التوصيل من 2 إلى 4 أيام عمل داخل المدن الرئيسية، و3 إلى 5 أيام للمناطق الأخرى. نوفر خدمة التتبع لجميع الطلبيات."
    },
    {
      question: "هل يمكنني الدفع عند الاستلام؟",
      answer: "نعم بالطبع! نوفر خدمة الدفع عند الاستلام لجميع مدن المغرب. كما نقبل الدفع الإلكتروني والتحويل البنكي."
    },
    {
      question: "متى ألاحظ النتائج؟",
      answer: "معظم عملائنا يلاحظون تحسناً ملحوظاً من أول استخدام. للحصول على أفضل النتائج، ننصح بالاستخدام المنتظم لمدة 2-4 أسابيع."
    },
    {
      question: "هل المنتجات مختبرة؟",
      answer: "نعم، جميع منتجاتنا مختبرة طبياً ومعتمدة. نلتزم بأعلى معايير الجودة والسلامة في جميع مراحل الإنتاج."
    },
    {
      question: "هل يمكنني إرجاع المنتج؟",
      answer: "نعم، نوفر ضمان استرجاع المال خلال 14 يوماً من تاريخ الاستلام إذا لم تكوني راضية تماماً عن المنتج (بشرط عدم فتحه)."
    },
    {
      question: "كيف أحافظ على المنتجات؟",
      answer: "يُنصح بحفظ المنتجات في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة. معظم منتجاتنا تدوم من 12 إلى 18 شهراً عند التخزين الصحيح."
    },
    {
      question: "هل تقدمون خصومات للطلبيات الكبيرة؟",
      answer: "نعم، نقدم خصومات خاصة وعروض حصرية للطلبيات الكبيرة والعملاء الدائمين. تواصلي معنا للحصول على عرض خاص."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background" dir="rtl">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            الأسئلة الشائعة 💬
          </h2>
          <p className="text-xl text-muted-foreground">
            إجابات عن أكثر الأسئلة تداولًا بين عملائنا.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-right flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-bold text-lg">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center glass-card rounded-2xl p-8">
          <h3 className="font-bold text-xl mb-3">
            هل ترغبين في معرفة المزيد؟ 

          </h3>
          <p className="text-muted-foreground mb-4">
            تواصلي معنا وسنجيبك في أقرب وقتيسعدنا تواصلك معنا للإجابة عن جميع أسئلتك بسرعة واهتمام.
 تواصلي معنا الآن
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
          >
            تواصلي معنا الآن ←
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
