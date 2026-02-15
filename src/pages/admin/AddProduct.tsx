import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Save, Loader2, Plus, X, Upload, Tag, FileText, DollarSign, Image as ImageIcon, Star, Gift, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { productsApi } from "@/lib/api";
import ImageUpload from "@/components/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor";

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [productData, setProductData] = useState({
    // Basic Information
    name: "",
    slug: "",
    sku: "",
    category: "",

    // Descriptions
    shortDescription: "",
    fullDescription: "",

    // Pricing
    price: "",
    originalPrice: "",

    // Inventory
    stockQuantity: "",

    // Badge
    badge: "none",

    // Additional Info
    warrantyNumber: "",

    // Metrics
    rating: "0",
    reviewsCount: "0",
    salesCount: "0",
    viewsCount: "0",

    // Images (S3 URLs)
    mainImage: "",
    images: [""],

    // Features
    features: [""],

    // Properties (will be stored as Map)
    properties: [{ key: "", value: "" }],

    // Offers
    offers: [] as Array<{ title: string; description: string; price: string; validUntil: string }>,

    // Reviews
    reviews: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setProductData({ ...productData, [name]: value });
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setProductData({ ...productData, name, slug });
  };

  // Image handlers
  const handleAddImage = () => {
    setProductData({ ...productData, images: [...productData.images, ""] });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = productData.images.filter((_, i) => i !== index);
    setProductData({ ...productData, images: newImages });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...productData.images];
    newImages[index] = value;
    setProductData({ ...productData, images: newImages });
  };

  // Feature handlers
  const handleAddFeature = () => {
    setProductData({ ...productData, features: [...productData.features, ""] });
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = productData.features.filter((_, i) => i !== index);
    setProductData({ ...productData, features: newFeatures });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...productData.features];
    newFeatures[index] = value;
    setProductData({ ...productData, features: newFeatures });
  };

  // Property handlers
  const handleAddProperty = () => {
    setProductData({
      ...productData,
      properties: [...productData.properties, { key: "", value: "" }],
    });
  };

  const handleRemoveProperty = (index: number) => {
    const newProperties = productData.properties.filter((_, i) => i !== index);
    setProductData({ ...productData, properties: newProperties });
  };

  const handlePropertyChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newProperties = [...productData.properties];
    newProperties[index][field] = value;
    setProductData({ ...productData, properties: newProperties });
  };

  // Offer handlers
  const handleAddOffer = () => {
    setProductData({
      ...productData,
      offers: [...productData.offers, { title: "", description: "", price: "", validUntil: "" }],
    });
  };

  const handleRemoveOffer = (index: number) => {
    const newOffers = productData.offers.filter((_, i) => i !== index);
    setProductData({ ...productData, offers: newOffers });
  };

  const handleOfferChange = (
    index: number,
    field: "title" | "description" | "price" | "validUntil",
    value: string
  ) => {
    const newOffers = [...productData.offers];
    newOffers[index][field] = value;
    setProductData({ ...productData, offers: newOffers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate required fields
      if (
        !productData.name ||
        !productData.slug ||
        !productData.category ||
        !productData.shortDescription ||
        !productData.fullDescription ||
        !productData.price ||
        !productData.stockQuantity
      ) {
        toast({
          title: "خطأ في البيانات",
          description: "الرجاء ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      // Convert properties array to Map object
      const propertiesMap: { [key: string]: string } = {};
      productData.properties.forEach((prop) => {
        if (prop.key && prop.value) {
          propertiesMap[prop.key] = prop.value;
        }
      });

      // Convert offers array to proper format
      const offersArray = productData.offers
        .filter((offer) => offer.title && offer.price)
        .map((offer) => ({
          title: offer.title,
          description: offer.description,
          price: parseFloat(offer.price),
          validUntil: offer.validUntil ? new Date(offer.validUntil) : null,
        }));

      // Prepare data for API
      const productPayload = {
        name: productData.name,
        slug: productData.slug,
        sku: productData.sku,
        category: productData.category,
        shortDescription: productData.shortDescription,
        fullDescription: productData.fullDescription,
        price: parseFloat(productData.price),
        originalPrice: productData.originalPrice
          ? parseFloat(productData.originalPrice)
          : null,
        stockQuantity: parseInt(productData.stockQuantity),
        inStock: parseInt(productData.stockQuantity) > 0,
        badge: productData.badge,
        warrantyNumber: productData.warrantyNumber,
        rating: parseFloat(productData.rating),
        reviewsCount: parseInt(productData.reviewsCount),
        salesCount: parseInt(productData.salesCount),
        viewsCount: parseInt(productData.viewsCount),
        mainImage: productData.mainImage,
        images: productData.images.filter((img) => img.trim() !== ""),
        features: productData.features.filter((f) => f.trim() !== ""),
        properties: propertiesMap,
        offers: offersArray,
        reviews: productData.reviews,
      };

      await productsApi.create(productPayload);

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم إضافة المنتج بنجاح",
      });

      navigate("/dashboard/products");
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل حفظ المنتج. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/products")}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            رجوع
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              إضافة منتج جديد
            </h1>
            <p className="text-muted-foreground">املأ تفاصيل المنتج أدناه</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">المعلومات الأساسية</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    اسم المنتج <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleNameChange}
                    placeholder="أدخل اسم المنتج"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">
                    الرابط <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={productData.slug}
                    onChange={handleChange}
                    placeholder="رابط-المنتج"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">رمز المنتج</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={productData.sku}
                    onChange={handleChange}
                    placeholder="SKU-001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">
                    نوع الفئة <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={productData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="زيوت طبيعية">زيوت طبيعية</SelectItem>
                      <SelectItem value="عطور">عطور</SelectItem>
                      <SelectItem value="مستحضرات تجميل">
                        مستحضرات تجميل
                      </SelectItem>
                      <SelectItem value="عناية بالبشرة">
                        عناية بالبشرة
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">الأوصاف</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shortDescription">
                  الوصف المختصر <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={productData.shortDescription}
                  onChange={handleChange}
                  placeholder="وصف قصير للمنتج يظهر في القوائم..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">
                  الوصف الكامل <span className="text-red-500">*</span>
                </Label>
                <RichTextEditor
                  content={productData.fullDescription}
                  onChange={(content) => setProductData({ ...productData, fullDescription: content })}
                  placeholder="وصف تفصيلي كامل عن المنتج، فوائده، طريقة الاستخدام..."
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">التسعير والمخزون</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    السعر (درهم) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="299.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">
                    السعر الأصلي (درهم)
                  </Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    step="0.01"
                    value={productData.originalPrice}
                    onChange={handleChange}
                    placeholder="399.00 (للمنتجات المخفضة)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockQuantity">
                    كمية المخزون <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="stockQuantity"
                    name="stockQuantity"
                    type="number"
                    value={productData.stockQuantity}
                    onChange={handleChange}
                    placeholder="100"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="badge">الشارة</Label>
                  <Select
                    value={productData.badge}
                    onValueChange={(value) => handleSelectChange("badge", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="بدون شارة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">بدون شارة</SelectItem>
                      <SelectItem value="new">جديد</SelectItem>
                      <SelectItem value="sale">تخفيض</SelectItem>
                      <SelectItem value="hot">الأكثر مبيعاً</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warrantyNumber">رقم الضمان</Label>
                  <Input
                    id="warrantyNumber"
                    name="warrantyNumber"
                    value={productData.warrantyNumber}
                    onChange={handleChange}
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">التقييم</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={productData.rating}
                    onChange={handleChange}
                    placeholder="4.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviewsCount">عدد المراجعات</Label>
                  <Input
                    id="reviewsCount"
                    name="reviewsCount"
                    type="number"
                    value={productData.reviewsCount}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salesCount">عدد المبيعات</Label>
                  <Input
                    id="salesCount"
                    name="salesCount"
                    type="number"
                    value={productData.salesCount}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="viewsCount">عدد المشاهدين</Label>
                  <Input
                    id="viewsCount"
                    name="viewsCount"
                    type="number"
                    value={productData.viewsCount}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">صور المنتج</h2>
            </div>

            <div className="space-y-6">
              {/* Main Image Upload */}
              <ImageUpload
                value={productData.mainImage}
                onChange={(url) =>
                  setProductData({ ...productData, mainImage: url })
                }
                label="الصورة الرئيسية *"
                placeholder="انقر أو اسحب الصورة الرئيسية هنا"
              />

              {/* Additional Images */}
              <div className="space-y-4">
                <Label>صور إضافية</Label>
                {productData.images.map((image, index) => (
                  <div key={index}>
                    <ImageUpload
                      value={image}
                      onChange={(url) => handleImageChange(index, url)}
                      onRemove={() => handleRemoveImage(index)}
                      placeholder={`انقر أو اسحب الصورة ${index + 1} هنا`}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddImage}
                  className="w-full gap-2"
                >
                  <Plus className="w-4 h-4" />
                  إضافة صورة إضافية
                </Button>
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">مميزات المنتج</h2>
            </div>

            <div className="space-y-3">
              {productData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`الميزة ${index + 1} (مثال: "تصميم مقاوم للماء")`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFeature(index)}
                    disabled={productData.features.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddFeature}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة ميزة
              </Button>
            </div>
          </div>

          {/* Product Properties */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">خصائص المنتج</h2>
            </div>

            <div className="space-y-3">
              {productData.properties.map((property, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={property.key}
                    onChange={(e) =>
                      handlePropertyChange(index, "key", e.target.value)
                    }
                    placeholder="الخاصية (مثال: الحجم)"
                    className="flex-1"
                  />
                  <Input
                    value={property.value}
                    onChange={(e) =>
                      handlePropertyChange(index, "value", e.target.value)
                    }
                    placeholder="القيمة (مثال: 50 مل)"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveProperty(index)}
                    disabled={productData.properties.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddProperty}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة خاصية
              </Button>
            </div>
          </div>

          {/* Product Offers */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Gift className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">عروض المنتج</h2>
            </div>

            <div className="space-y-4">
              {productData.offers.map((offer, index) => (
                <div key={index} className="border-2 border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-muted-foreground">
                      عرض #{index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveOffer(index)}
                      disabled={productData.offers.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>عنوان العرض *</Label>
                      <Input
                        value={offer.title}
                        onChange={(e) =>
                          handleOfferChange(index, "title", e.target.value)
                        }
                        placeholder="مثال: عبوة واحدة"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>السعر (MAD) *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={offer.price}
                        onChange={(e) =>
                          handleOfferChange(index, "price", e.target.value)
                        }
                        placeholder="299"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>وصف العرض</Label>
                    <Input
                      value={offer.description}
                      onChange={(e) =>
                        handleOfferChange(index, "description", e.target.value)
                      }
                      placeholder="مثال: توصيل مجاني"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>صالح حتى</Label>
                    <Input
                      type="date"
                      value={offer.validUntil}
                      onChange={(e) =>
                        handleOfferChange(index, "validUntil", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddOffer}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة عرض
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/products")}
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button type="submit" className="flex-1" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="ml-2 w-5 h-5" />
                    إنهاء المنتج
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
