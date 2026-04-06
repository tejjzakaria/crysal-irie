import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }).max(100, { message: "الاسم طويل جداً" }),
  email: z.string().trim().email({ message: "البريد الإلكتروني غير صحيح" }),
  phone: z.string().trim().min(10, { message: "رقم الهاتف غير صحيح" }).max(20, { message: "رقم الهاتف طويل جداً" }),
  subject: z.string().trim().min(3, { message: "الموضوع يجب أن يكون 3 أحرف على الأقل" }).max(200, { message: "الموضوع طويل جداً" }),
  message: z.string().trim().min(10, { message: "الرسالة يجب أن تكون 10 أحرف على الأقل" }).max(1000, { message: "الرسالة طويلة جداً" }),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || "";

  const sendToGoogleSheets = async (contactData: typeof formData) => {
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
          type: 'message',
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
      contactSchema.parse(formData);

      setErrors({});
      setIsSubmitting(true);

      const result = await sendToGoogleSheets(formData);

      if (!result.success) {
        toast({
          title: "تحذير",
          description: "تم إرسال الرسالة ولكن قد يكون هناك مشكلة في الحفظ.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "تم إرسال رسالتك بنجاح! ✅",
        description: "سنتواصل معك في أقرب وقت ممكن",
      });

      // Track lead form submission
      const ttq = (window as any).ttq;
      if (ttq?.track) {
        ttq.track("SubmitForm", {
          content_name: "Contact Form",
          content_type: "lead",
        });
      }

      const fbq = (window as any).fbq;
      if (fbq) {
        fbq('track', 'Lead', {
          content_name: "Contact Form",
          content_category: "lead",
        });
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
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
            اتصلي بنا
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتك
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6">أرسلي لنا رسالة</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg">الاسم الكامل</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="أدخلي اسمك"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`text-lg py-6 ${errors.name ? "border-destructive" : ""}`}
                      maxLength={100}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`text-lg py-6 ${errors.email ? "border-destructive" : ""}`}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="أدخلي رقم الهاتف"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`text-lg py-6 ${errors.phone ? "border-destructive" : ""}`}
                      maxLength={20}
                      required
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-lg">الموضوع</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="موضوع الرسالة"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`text-lg py-6 ${errors.subject ? "border-destructive" : ""}`}
                      maxLength={200}
                      required
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-lg">رسالتك</Label>
                    <Textarea
                      id="message"
                      placeholder="اكتبي رسالتك هنا..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`text-lg min-h-[150px] ${errors.message ? "border-destructive" : ""}`}
                      maxLength={1000}
                      required
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الإرسال..." : "أرسلي الرسالة"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6">معلومات التواصل</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">الهاتف</h3>
                      <p className="text-muted-foreground">0632454694</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">البريد الإلكتروني</h3>
                      <p className="text-muted-foreground">info@crystaloil.ma</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">الموقع</h3>
                      <p className="text-muted-foreground">المغرب</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">ساعات العمل</h3>
                      <p className="text-muted-foreground">
                        السبت - الخميس: 9:00 - 18:00
                        <br />
                        الجمعة: 14:00 - 18:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">أسئلة سريعة؟</h3>
                <p className="text-muted-foreground mb-4">
                  تحققي من صفحة الأسئلة الشائعة للحصول على إجابات فورية
                </p>
                <a href="/#faq">
                  <Button variant="outline" className="w-full">
                    الأسئلة الشائعة
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
