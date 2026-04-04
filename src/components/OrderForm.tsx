import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { User, Phone, MapPin, ShoppingBag, Sparkles } from "lucide-react";
import { ordersApi } from "@/lib/api";

interface OrderFormProps {
  productName: string;
  productPrice: string;
  productSlug?: string;
  options?: {
    label: string;
    price: string;
    description?: string;
    highlighted?: boolean;
  }[];
}

const orderSchema = z.object({
  name: z.string().trim().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }).max(100, { message: "الاسم طويل جداً" }),
  phone: z.string().trim().min(10, { message: "رقم الهاتف غير صحيح" }).max(20, { message: "رقم الهاتف طويل جداً" }),
  address: z.string().trim().min(5, { message: "العنوان يجب أن يكون واضحاً" }).max(200, { message: "العنوان طويل جداً" }),
});

const parsePriceValue = (price: string) => {
  const normalized = price.replace(/[^0-9.]/g, "");
  return Number(normalized) || 0;
};

const trackTikTokCompletePayment = (payload: Record<string, any>) => {
  const ttq = (window as any).ttq;
  if (ttq?.track) {
    ttq.track("CompletePayment", payload);
  }
};

const OrderForm = ({ productName, productPrice, productSlug, options }: OrderFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    selectedOption: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update selected option when options change
  useEffect(() => {
    if (options && options.length > 0 && !formData.selectedOption) {
      setFormData(prev => ({
        ...prev,
        selectedOption: options[options.length - 1]?.label || ""
      }));
    }
  }, [options]);

  // Google Sheets URL from environment variables
  const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || "";

  const sendToGoogleSheets = async (orderData: {
    orderId: string;
    orderDate: string;
    firstName: string;
    phone: string;
    city: string;
    variantPrice: string;
    productVariant: string;
    productName: string;
    productUrl: string;
  }) => {
    if (!GOOGLE_SHEETS_URL) {
      return { success: false, error: 'URL not configured' };
    }

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      // Note: With 'no-cors' mode, we can't read the response
      // but the request will still reach Google Sheets
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      // Validate form data
      orderSchema.parse({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      // Clear errors and set loading state
      setErrors({});
      setIsSubmitting(true);

      // Prepare order data
      const selectedOffer = options?.find(opt => opt.label === formData.selectedOption);
      const selectedPrice = selectedOffer?.price || productPrice;
      const selectedVariant = formData.selectedOption || productName;

      // Extract city from address (first word/part before comma)
      const city = formData.address.split(',')[0].trim();

      // Create product URL
      const productUrl = productSlug
        ? `${window.location.origin}/product/${productSlug}`
        : window.location.href;

      // Save to MongoDB
      const dbOrderData = {
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        productName,
        productVariant: selectedVariant,
        variantPrice: selectedPrice,
        productUrl,
        status: "pending",
      };

      const savedOrder = await ordersApi.create(dbOrderData);

      // Prepare Google Sheets data with specific columns
      const sheetsOrderData = {
        orderId: savedOrder._id,
        orderDate: new Date().toISOString(),
        firstName: formData.name,
        phone: formData.phone,
        city: city,
        variantPrice: selectedPrice,
        productVariant: selectedVariant,
        productName: productName,
        productUrl: productUrl,
      };

      // Send to Google Sheets
      await sendToGoogleSheets(sheetsOrderData);

      toast({
        title: "تم إرسال الطلب بنجاح! ✅",
        description: "تم حفظ طلبك وسيتم التواصل معك في أقرب وقت",
      });

      trackTikTokCompletePayment({
        value: parsePriceValue(selectedPrice),
        currency: "USD",
        content_name: productName,
        content_type: "product",
        content_id: productSlug || productName,
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        selectedOption: options?.[options.length - 1]?.label || "",
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
      } else {
        toast({
          title: "خطأ في إرسال الطلب",
          description: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-3xl border-2 border-primary/20 shadow-2xl overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShoppingBag className="w-6 h-6 text-white" />
            <h3 className="text-2xl font-bold text-white">أطلبي الآن</h3>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/90 text-sm">احصلي على منتجك في أقرب وقت</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {options && options.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                اختاري العرض المناسب
              </Label>
              <RadioGroup
                value={formData.selectedOption}
                onValueChange={(value) => setFormData({ ...formData, selectedOption: value })}
                className="space-y-2"
              >
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                      formData.selectedOption === option.label
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
                    } ${option.highlighted ? "ring-2 ring-accent ring-offset-2" : ""}`}
                  >
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <RadioGroupItem value={option.label} id={`option-${index}`} className="shrink-0 mt-1" />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-base">{option.label}</span>
                          <span className="text-primary font-bold text-lg">{option.price}</span>
                        </div>
                        {option.description && (
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        )}
                      </Label>
                    </div>
                    {option.highlighted && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-bold">
                        الأكثر طلباً
                      </span>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              الاسم الكامل
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder="أدخلي اسمك الكامل"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`text-base py-6 pr-4 border-2 rounded-xl transition-all focus:scale-[1.02] ${
                  errors.name
                    ? "border-destructive focus:border-destructive"
                    : "border-border/50 focus:border-primary"
                }`}
                maxLength={100}
                required
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              رقم الهاتف
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder="0612345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`text-base py-6 pr-4 border-2 rounded-xl transition-all focus:scale-[1.02] text-right ${
                  errors.phone
                    ? "border-destructive focus:border-destructive"
                    : "border-border/50 focus:border-primary"
                }`}
                maxLength={20}
                required
                dir="ltr"
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <span>⚠️</span> {errors.phone}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-base font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              عنوان التوصيل
            </Label>
            <div className="relative">
              <Input
                id="address"
                type="text"
                placeholder="المدينة، الحي، الشارع..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`text-base py-6 pr-4 border-2 rounded-xl transition-all focus:scale-[1.02] ${
                  errors.address
                    ? "border-destructive focus:border-destructive"
                    : "border-border/50 focus:border-primary"
                }`}
                maxLength={200}
                required
              />
            </div>
            {errors.address && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <span>⚠️</span> {errors.address}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg py-7 rounded-2xl font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-105 relative overflow-hidden group"
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  جاري إرسال الطلب...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  أطلبي الآن - توصيل سريع
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] group-hover:animate-shimmer"></div>
          </Button>

          {/* Trust Badges */}
          <div className="pt-4 border-t border-primary/10 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>توصيل سريع لجميع المدن</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>الدفع عند الاستلام</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>ضمان الجودة والأصالة</span>
            </div>
          </div>
        </form>
    </div>
  );
};

export default OrderForm;
