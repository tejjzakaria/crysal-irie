import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { settingsApi } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }).max(100, { message: "الاسم طويل جداً" }),
  phone: z.string().trim().min(10, { message: "رقم الهاتف غير صحيح" }).max(20, { message: "رقم الهاتف طويل جداً" }),
  address: z.string().trim().min(5, { message: "العنوان يجب أن يكون واضحاً" }).max(200, { message: "العنوان طويل جداً" }),
});

const DEFAULT_FOOTER_DESCRIPTION = "كريستال أويل هي علامة متخصصة في العناية الذاتية الطبيعية، تقدم صابونًا وزيوتًا فاخرة مصنوعة يدويًا من مكونات نباتية نقية. تم تصميم كل منتج ليغذي البشرة ويحوّل روتينك اليومي إلى لحظة من الهدوء والدلال. بلمسات أنيقة وروائح لطيفة وملمس غني، تجمع كريستال أويل بين الطبيعة والفخامة لتمنحك تجربة عناية حسية وأصيلة.";

const Footer = () => {
  const { toast } = useToast();
  const [footerDescription, setFooterDescription] = useState(DEFAULT_FOOTER_DESCRIPTION);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || "";

  useEffect(() => {
    settingsApi.get().then((data) => {
      if (data.footerDescription) setFooterDescription(data.footerDescription);
    }).catch(() => {});
  }, []);

  const sendToGoogleSheets = async (contactData: {
    name: string;
    phone: string;
    address: string;
  }) => {
    if (!GOOGLE_SHEETS_URL) {
      return { success: false, error: 'URL not configured' };
    }


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

      return { success: true };
    } catch (error) {
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

      // Track lead form submission
      const ttq = (window as any).ttq;
      if (ttq?.track) {
        ttq.track("SubmitForm", {
          content_name: "Footer Contact Form",
          content_type: "lead",
        });
      }

      const fbq = (window as any).fbq;
      if (fbq) {
        fbq('track', 'Lead', {
          content_name: "Footer Contact Form",
          content_category: "lead",
        });
      }

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
              {footerDescription}
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
