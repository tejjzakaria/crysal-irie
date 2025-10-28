import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }).max(100, { message: "الاسم طويل جداً" }),
  phone: z.string().trim().min(10, { message: "رقم الهاتف غير صحيح" }).max(20, { message: "رقم الهاتف طويل جداً" }),
  address: z.string().trim().min(5, { message: "العنوان يجب أن يكون واضحاً" }).max(200, { message: "العنوان طويل جداً" }),
});

const Footer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || "";

  const sendToGoogleSheets = async (contactData: {
    name: string;
    phone: string;
    address: string;
  }) => {
    if (!GOOGLE_SHEETS_URL) {
      console.error('Google Sheets URL is not configured');
      return { success: false, error: 'URL not configured' };
    }

    console.log('Sending contact to Google Sheets:', contactData);
    console.log('URL:', GOOGLE_SHEETS_URL);

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          ...contactData
        }),
      });

      console.log('Request sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      return { success: false, error };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      contactSchema.parse({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      setErrors({});
      setIsSubmitting(true);

      const result = await sendToGoogleSheets(formData);

      if (!result.success) {
        toast({
          title: "تحذير",
          description: "تم إرسال الطلب ولكن قد يكون هناك مشكلة في الحفظ. تحقق من وحدة التحكم.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "تم إرسال الطلب بنجاح! ✅",
        description: "تم حفظ طلبك وسيتم التواصل معك في أقرب وقت",
      });

      setFormData({
        name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);

        toast({
          title: "خطأ في البيانات",
          description: "يرجى التحقق من المعلومات المدخلة",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted/50 pt-20 pb-10 px-4" dir="rtl">
      <div className="container mx-auto">
        {/* CTA Section */}
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            هل ترغبين بتجربة منتجاتنا؟🛍️
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          املئي المعلومات التالية وسنتواصل معك لتأكيد الطلب في أقرب وقت.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
              <Input
                placeholder="أدخلي إسمك هنا 🙋‍♀️"
                className={`text-center text-lg py-6 rounded-full ${errors.name ? "border-destructive" : ""}`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                required
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="أدخلي رقم الهاتف 📲"
                className={`text-center text-lg py-6 rounded-full ${errors.phone ? "border-destructive" : ""}`}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                type="tel"
                maxLength={20}
                required
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="أدخلي عنوان السكن 🏠"
                className={`text-center text-lg py-6 rounded-full ${errors.address ? "border-destructive" : ""}`}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                maxLength={200}
                required
              />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">{errors.address}</p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full text-lg py-6 rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري إرسال الطلب..." : "أطلبي الآن | لا تترددي ✨"}
            </Button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-start mb-4">
              <img
                src="/CRYSTAL OIL LOGO.png"
                alt="Crystal Oil Logo"
                className="h-6 w-auto"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              كريستال أويل هي علامة متخصصة في العناية الذاتية الطبيعية، تقدم صابونًا وزيوتًا فاخرة مصنوعة يدويًا من مكونات نباتية نقية. تم تصميم كل منتج ليغذي البشرة ويحوّل روتينك اليومي إلى لحظة من الهدوء والدلال. بلمسات أنيقة وروائح لطيفة وملمس غني، تجمع كريستال أويل بين الطبيعة والفخامة لتمنحك تجربة عناية حسية وأصيلة.
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-bold text-lg mb-4">تواصلي معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>
                  0632454694
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@crystaloil.ma</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>المغرب</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h4 className="font-bold text-lg mb-4">تابعينا</h4>
            <div className="flex gap-3 justify-center">
              <a href="https://www.instagram.com/crystaloil.ma/" target="_blank">
              <Button size="icon" variant="outline" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Instagram className="w-5 h-5" />
              </Button></a>
              <a href="https://web.facebook.com/crystaloil.MA" target="_blank">
              <Button size="icon" variant="outline" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Facebook className="w-5 h-5" />
              </Button></a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>© 2025 Crystal Oil. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
