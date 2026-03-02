import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { settingsApi } from "@/lib/api";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PixelSettings {
  facebookPixelId: string;
  facebookPixelEnabled: boolean;
  tiktokPixelId: string;
  tiktokPixelEnabled: boolean;
  snapchatPixelId: string;
  snapchatPixelEnabled: boolean;
  googleTagManagerId: string;
  googleTagManagerEnabled: boolean;
}

const PIXELS = [
  {
    key: "facebook",
    label: "فيسبوك (Meta) Pixel",
    idField: "facebookPixelId" as const,
    enabledField: "facebookPixelEnabled" as const,
    placeholder: "مثال: 1234567890123456",
    description: "ضع معرف الـ Pixel الخاص بحساب الإعلانات على فيسبوك/ميتا",
    color: "bg-blue-100 text-blue-700",
    logo: "f",
  },
  {
    key: "tiktok",
    label: "تيك توك Pixel",
    idField: "tiktokPixelId" as const,
    enabledField: "tiktokPixelEnabled" as const,
    placeholder: "مثال: ABCDE1FGHIJ2KLMNO",
    description: "ضع معرف الـ Pixel الخاص بحساب الإعلانات على تيك توك",
    color: "bg-gray-100 text-gray-800",
    logo: "T",
  },
  {
    key: "snapchat",
    label: "سناب شات Pixel",
    idField: "snapchatPixelId" as const,
    enabledField: "snapchatPixelEnabled" as const,
    placeholder: "مثال: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    description: "ضع معرف الـ Pixel الخاص بحساب الإعلانات على سناب شات",
    color: "bg-yellow-100 text-yellow-700",
    logo: "S",
  },
  {
    key: "gtm",
    label: "Google Tag Manager",
    idField: "googleTagManagerId" as const,
    enabledField: "googleTagManagerEnabled" as const,
    placeholder: "مثال: GTM-XXXXXXX",
    description: "ضع معرف حاوية Google Tag Manager (GTM)",
    color: "bg-green-100 text-green-700",
    logo: "G",
  },
];

const Pixels = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<PixelSettings>({
    facebookPixelId: "",
    facebookPixelEnabled: false,
    tiktokPixelId: "",
    tiktokPixelEnabled: false,
    snapchatPixelId: "",
    snapchatPixelEnabled: false,
    googleTagManagerId: "",
    googleTagManagerEnabled: false,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await settingsApi.get();
        setSettings({
          facebookPixelId: data.facebookPixelId || "",
          facebookPixelEnabled: !!data.facebookPixelEnabled,
          tiktokPixelId: data.tiktokPixelId || "",
          tiktokPixelEnabled: !!data.tiktokPixelEnabled,
          snapchatPixelId: data.snapchatPixelId || "",
          snapchatPixelEnabled: !!data.snapchatPixelEnabled,
          googleTagManagerId: data.googleTagManagerId || "",
          googleTagManagerEnabled: !!data.googleTagManagerEnabled,
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
      toast({ title: "تم الحفظ", description: "تم حفظ إعدادات البكسل بنجاح" });
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
          <h1 className="text-2xl font-bold">إعدادات البكسل</h1>
          <p className="text-muted-foreground mt-1">
            أضف معرفات البكسل لتتبع الزوار وقياس أداء الإعلانات
          </p>
        </div>

        <div className="space-y-4">
          {PIXELS.map((pixel) => (
            <div key={pixel.key} className="bg-white rounded-xl border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${pixel.color}`}>
                    {pixel.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold">{pixel.label}</h3>
                    <p className="text-sm text-muted-foreground">{pixel.description}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[pixel.enabledField]}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({ ...prev, [pixel.enabledField]: checked }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label>معرف البكسل (Pixel ID)</Label>
                <Input
                  value={settings[pixel.idField]}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, [pixel.idField]: e.target.value }))
                  }
                  placeholder={pixel.placeholder}
                  dir="ltr"
                  className="font-mono"
                />
              </div>
            </div>
          ))}
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

export default Pixels;
