import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface OrderFormProps {
  productName: string;
  productPrice: string;
  options?: {
    label: string;
    price: string;
    highlighted?: boolean;
  }[];
}

const orderSchema = z.object({
  name: z.string().trim().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }).max(100, { message: "الاسم طويل جداً" }),
  phone: z.string().trim().min(10, { message: "رقم الهاتف غير صحيح" }).max(20, { message: "رقم الهاتف طويل جداً" }),
  address: z.string().trim().min(5, { message: "العنوان يجب أن يكون واضحاً" }).max(200, { message: "العنوان طويل جداً" }),
});

const OrderForm = ({ productName, productPrice, options }: OrderFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    selectedOption: options?.[options.length - 1]?.label || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Sheets URL from environment variables
  const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || "";

  const sendToGoogleSheets = async (orderData: {
    productName: string;
    productPrice: string;
    selectedOption: string;
    name: string;
    phone: string;
    address: string;
  }) => {
    if (!GOOGLE_SHEETS_URL) {
      console.error('Google Sheets URL is not configured');
      return { success: false, error: 'URL not configured' };
    }

    console.log('Sending order to Google Sheets:', orderData);
    console.log('URL:', GOOGLE_SHEETS_URL);

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('Request sent successfully');
      // Note: With 'no-cors' mode, we can't read the response
      // but the request will still reach Google Sheets
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
      const selectedPrice = options?.find(opt => opt.label === formData.selectedOption)?.price || productPrice;
      const orderData = {
        productName,
        productPrice: selectedPrice,
        selectedOption: formData.selectedOption,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      };

      // Send to Google Sheets
      const result = await sendToGoogleSheets(orderData);

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
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {options && options.length > 0 && (
        <div className="space-y-3">
          <Label className="text-lg font-bold">اختاري العرض المناسب:</Label>
          <RadioGroup
            value={formData.selectedOption}
            onValueChange={(value) => setFormData({ ...formData, selectedOption: value })}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 space-x-reverse p-4 rounded-xl border-2 transition-all ${
                  formData.selectedOption === option.label
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                } ${option.highlighted ? "ring-2 ring-accent ring-offset-2" : ""}`}
              >
                <RadioGroupItem value={option.label} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg">الاسم الكامل 🙋‍♀️</Label>
        <Input
          id="name"
          type="text"
          placeholder="أدخلي إسمك هنا"
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
        <Label htmlFor="phone" className="text-lg">رقم الهاتف 📲</Label>
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
        <Label htmlFor="address" className="text-lg">عنوان السكن 🏠</Label>
        <Input
          id="address"
          type="text"
          placeholder="أدخلي عنوان السكن"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={`text-lg py-6 ${errors.address ? "border-destructive" : ""}`}
          maxLength={200}
          required
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address}</p>
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

      <p className="text-sm text-center text-muted-foreground">
        سيتم حفظ طلبك والتواصل معك في أقرب وقت 💚
      </p>
    </form>
  );
};

export default OrderForm;
