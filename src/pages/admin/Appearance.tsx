import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settingsApi } from "@/lib/api";
import { applyThemeColor } from "@/lib/theme";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_PRIMARY_COLOR = "#28bdbd";

const PRESETS = [
  { label: "تركواز (افتراضي)", color: "#28bdbd" },
  { label: "وردي", color: "#d6336c" },
  { label: "بنفسجي", color: "#7048e8" },
  { label: "أخضر زمردي", color: "#12b886" },
  { label: "كهرماني", color: "#f59f00" },
  { label: "أزرق", color: "#1c7ed6" },
];

const Appearance = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedColor, setSavedColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);

  useEffect(() => {
    settingsApi.get().then((data) => {
      const color = data.primaryColor || DEFAULT_PRIMARY_COLOR;
      setSavedColor(color);
      setPrimaryColor(color);
    }).catch(() => {
      toast({ title: "خطأ", description: "فشل تحميل الإعدادات", variant: "destructive" });
    }).finally(() => setLoading(false));
  }, []);

  const handleChange = (color: string) => {
    setPrimaryColor(color);
    applyThemeColor(color);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsApi.update({ primaryColor });
      setSavedColor(primaryColor);
      toast({ title: "تم الحفظ", description: "تم تحديث لون الموقع بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "فشل حفظ الإعدادات", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setPrimaryColor(savedColor);
    applyThemeColor(savedColor);
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

  const hasChanges = primaryColor !== savedColor;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">مظهر الموقع</h1>
          <p className="text-muted-foreground mt-1">
            تحكم في اللون الأساسي المستخدم في الأزرار والروابط والتفاصيل في الموقع
          </p>
        </div>

        <div className="bg-white rounded-xl border p-6 space-y-6">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => handleChange(e.target.value)}
              className="h-14 w-20 rounded-lg border cursor-pointer"
              aria-label="اختر اللون الأساسي"
            />
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="primaryColorHex">كود اللون</Label>
              <Input
                id="primaryColorHex"
                value={primaryColor}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="#28bdbd"
                dir="ltr"
                className="font-mono"
                maxLength={7}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>ألوان جاهزة</Label>
            <div className="flex flex-wrap gap-3">
              {PRESETS.map((preset) => (
                <button
                  key={preset.color}
                  type="button"
                  onClick={() => handleChange(preset.color)}
                  title={preset.label}
                  aria-label={preset.label}
                  className="h-10 w-10 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: preset.color,
                    borderColor: primaryColor === preset.color ? preset.color : "transparent",
                    outline: primaryColor === preset.color ? `2px solid ${preset.color}` : "none",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4 flex flex-wrap items-center gap-3">
            <Button>زر تجريبي</Button>
            <Button variant="outline">زر ثانوي</Button>
            <span className="text-primary font-semibold">نص بلون أساسي</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving || !hasChanges} className="flex-1">
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin ml-2" />
            ) : (
              <Save className="w-4 h-4 ml-2" />
            )}
            حفظ التغييرات
          </Button>
          {hasChanges && (
            <Button variant="outline" onClick={handleCancel} disabled={saving}>
              إلغاء
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appearance;
