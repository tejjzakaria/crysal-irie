import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, Clock, Truck, Phone } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Retrieve order data from sessionStorage
    const data = sessionStorage.getItem("lastOrder");
    if (data) {
      setOrderData(JSON.parse(data));
      // Clear after retrieving
      sessionStorage.removeItem("lastOrder");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center px-4 py-20" dir="rtl">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 animate-pulse">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">شكراً لك! 🎉</h1>
          <p className="text-xl text-muted-foreground mb-2">تم استقبال طلبك بنجاح</p>
          <p className="text-sm text-muted-foreground">رقم الطلب: <span className="font-mono font-bold text-primary">{orderData?._id?.slice(-8) || "---"}</span></p>
        </div>

        {/* Order Details Card */}
        {orderData && (
          <div className="bg-white rounded-3xl border-2 border-primary/20 p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">تفاصيل الطلب</h2>

            <div className="space-y-4">
              {/* Product */}
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-border/50">
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">المنتج</p>
                  <p className="font-semibold">{orderData.productName}</p>
                  <p className="text-sm text-muted-foreground">{orderData.productVariant}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">السعر</p>
                  <p className="font-bold text-lg text-primary">{orderData.variantPrice}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4 py-4 border-b border-border/50">
                <div>
                  <p className="text-sm text-muted-foreground">الاسم</p>
                  <p className="font-semibold">{orderData.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الهاتف</p>
                  <p className="font-semibold" dir="ltr">{orderData.customerPhone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="py-4 border-b border-border/50">
                <p className="text-sm text-muted-foreground">عنوان التوصيل</p>
                <p className="font-semibold">{orderData.customerAddress}</p>
              </div>

              {/* Status */}
              <div className="py-4">
                <p className="text-sm text-muted-foreground">حالة الطلب</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <p className="font-semibold text-yellow-700">قيد المراجعة</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Boxes */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <Clock className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-blue-900 mb-1">قريباً</h3>
            <p className="text-sm text-blue-700">سيتم التواصل معك خلال 24 ساعة</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <Truck className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold text-green-900 mb-1">التوصيل</h3>
            <p className="text-sm text-green-700">توصيل خلال 24-48 ساعة كحد أقصى</p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
            <Phone className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-900 mb-1">التواصل</h3>
            <p className="text-sm text-purple-700">رقمك محفوظ لديك</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={() => navigate("/products")}
            variant="outline"
            size="lg"
            className="flex-1 rounded-2xl py-7"
          >
            <ShoppingBag className="w-5 h-5 ml-2" />
            تصفح المنتجات الأخرى
          </Button>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="flex-1 rounded-2xl py-7"
          >
            العودة للرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
