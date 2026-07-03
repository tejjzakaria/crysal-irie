import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { settingsApi } from "@/lib/api";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactSettings {
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

const ContactInfo = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<ContactSettings>({
    contactPhone: "",
    contactEmail: "",
    whatsappNumber: "",
    whatsappMessage: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await settingsApi.get();
        setSettings({
          contactPhone: data.contactPhone || "",
          contactEmail: data.contactEmail || "",
          whatsappNumber: data.whatsappNumber || "",
          whatsappMessage: data.whatsappMessage || "",
        });
      } catch {
        toast({ title: "خطأ", description: "فشل تحميل الإعدادات", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsApi.update(settings);
      toast({ title: "تم الحفظ", description: "تم حفظ معلومات التواصل بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "فشل حفظ الإعدادات", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">معلومات التواصل</h1>
          <p className="text-muted-foreground mt-1">
            تحكم في رقم الهاتف والبريد الإلكتروني ورسالة واتساب الظاهرة في الموقع
          </p>
        </div>

        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="contactPhone">رقم الهاتف الظاهر للزوار</Label>
            <Input
              id="contactPhone"
              value={settings.contactPhone}
              onChange={(e) => setSettings((prev) => ({ ...prev, contactPhone: e.target.value }))}
              placeholder="0632454694"
              dir="ltr"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contactEmail">البريد الإلكتروني</Label>
            <Input
              id="contactEmail"
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
              placeholder="info@crystaloil.ma"
              dir="ltr"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div>
            <h3 className="font-semibold">زر واتساب العائم</h3>
            <p className="text-sm text-muted-foreground">
              الرقم يجب أن يكون بصيغة دولية بدون + أو صفر في البداية (مثال: 212632454694)
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="whatsappNumber">رقم واتساب</Label>
            <Input
              id="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
              placeholder="212632454694"
              dir="ltr"
              className="font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="whatsappMessage">الرسالة الافتراضية</Label>
            <Textarea
              id="whatsappMessage"
              value={settings.whatsappMessage}
              onChange={(e) => setSettings((prev) => ({ ...prev, whatsappMessage: e.target.value }))}
              placeholder="مرحبًا! أود الاستفسار عن منتجاتكم."
              rows={3}
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin ml-2" />
          ) : (
            <Save className="w-4 h-4 ml-2" />
          )}
          حفظ الإعدادات
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default ContactInfo;
