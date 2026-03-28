import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ShoppingBag, Package, TrendingUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { heroApi, ordersApi, productsApi, settingsApi } from "@/lib/api";

interface HeroData {
  trustBadge: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  backgroundImage: string;
}

const DEFAULT_HERO_DATA: HeroData = {
  trustBadge: "4.9/5 من أكثر من 10,000+ عميلة",
  headline: "جاذبية طبيعية لا تُقاوم",
  subheadline: "زيوت طبيعية فاخرة مُعززة بالفيرمونات، مصممة لتترك انطباعاً لا يُنسى وإطلالة متألقة",
  ctaText: "تسوقي الآن",
  backgroundImage: "/crystal images/GODDESS_ROSE_Mockup_Style1 copy 2.png",
};

const Dashboard = () => {
  const [heroData, setHeroData] = useState<HeroData>(DEFAULT_HERO_DATA);
  const [saving, setSaving] = useState(false);
  const [footerDescription, setFooterDescription] = useState("");
  const [savingFooter, setSavingFooter] = useState(false);
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    sales: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadHeroData();
    loadStats();
    loadFooterDescription();
  }, []);

  const loadHeroData = async () => {
    try {
      const data = await heroApi.get();
      setHeroData({
        trustBadge: data.trustBadge,
        headline: data.headline,
        subheadline: data.subheadline,
        ctaText: data.ctaText,
        backgroundImage: data.backgroundImage,
      });
    } catch (error) {
      // Silently handle error
    }
  };

  const loadFooterDescription = async () => {
    try {
      const data = await settingsApi.get();
      setFooterDescription(data.footerDescription || "");
    } catch (error) {
      // Silently handle error
    }
  };

  const handleSaveFooter = async () => {
    setSavingFooter(true);
    try {
      await settingsApi.update({ footerDescription });
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ وصف المتجر في الفوتر",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل حفظ التغييرات. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setSavingFooter(false);
    }
  };

  const loadStats = async () => {
    try {
      const [orderStats, productsData] = await Promise.all([
        ordersApi.getStats(),
        productsApi.getAll(),
      ]);

      setStats({
        orders: orderStats.totalOrders || 0,
        products: productsData.length || 0,
        sales: orderStats.totalSales || 0,
      });
    } catch (error) {
      // Silently handle error
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await heroApi.update(heroData);
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ التغييرات على القسم الرئيسي",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل حفظ التغييرات. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-muted-foreground mt-1">مرحباً بك في لوحة الإدارة</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-3xl font-bold mt-2">{stats.orders}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المنتجات</p>
                <p className="text-3xl font-bold mt-2">{stats.products}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المبيعات</p>
                <p className="text-3xl font-bold mt-2">{stats.sales} MAD</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Description Editor */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">وصف المتجر في الفوتر</h2>
            <Button onClick={handleSaveFooter} disabled={savingFooter}>
              {savingFooter ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ التغييرات
                </>
              )}
            </Button>
          </div>
          <div>
            <Label htmlFor="footerDescription">وصف المتجر</Label>
            <Textarea
              id="footerDescription"
              value={footerDescription}
              onChange={(e) => setFooterDescription(e.target.value)}
              placeholder="أدخل وصف المتجر الذي يظهر في أسفل الصفحة..."
              rows={4}
            />
          </div>
        </div>

        {/* Hero Section Editor */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">تحرير القسم الرئيسي</h2>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ التغييرات
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="trustBadge">شارة الثقة</Label>
              <Input
                id="trustBadge"
                value={heroData.trustBadge}
                onChange={(e) =>
                  setHeroData({ ...heroData, trustBadge: e.target.value })
                }
                placeholder="4.9/5 من أكثر من 10,000+ عميلة"
              />
            </div>

            <div>
              <Label htmlFor="headline">العنوان الرئيسي</Label>
              <Input
                id="headline"
                value={heroData.headline}
                onChange={(e) =>
                  setHeroData({ ...heroData, headline: e.target.value })
                }
                placeholder="جاذبية طبيعية لا تُقاوم"
              />
            </div>

            <div>
              <Label htmlFor="subheadline">العنوان الفرعي</Label>
              <Textarea
                id="subheadline"
                value={heroData.subheadline}
                onChange={(e) =>
                  setHeroData({ ...heroData, subheadline: e.target.value })
                }
                placeholder="زيوت طبيعية فاخرة..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="ctaText">نص الزر</Label>
              <Input
                id="ctaText"
                value={heroData.ctaText}
                onChange={(e) =>
                  setHeroData({ ...heroData, ctaText: e.target.value })
                }
                placeholder="تسوقي الآن"
              />
            </div>

            <div>
              <Label htmlFor="backgroundImage">رابط صورة الخلفية</Label>
              <Input
                id="backgroundImage"
                value={heroData.backgroundImage}
                onChange={(e) =>
                  setHeroData({ ...heroData, backgroundImage: e.target.value })
                }
                placeholder="/crystal images/..."
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
