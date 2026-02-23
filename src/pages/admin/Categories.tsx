import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  LayoutGrid,
  X,
  Save,
  GripVertical,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { categoriesApi } from "@/lib/api";
import ImageUpload from "@/components/ImageUpload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Category {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  order: number;
  isActive: boolean;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  details: "",
  image: "",
  order: 0,
  isActive: true,
};

const AdminCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch {
      toast({
        title: "خطأ في التحميل",
        description: "فشل تحميل التصنيفات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM, order: categories.length });
    setFormOpen(true);
  };

  const openEditForm = (cat: Category) => {
    setEditingId(cat._id);
    setFormData({
      title: cat.title,
      description: cat.description,
      details: cat.details,
      image: cat.image,
      order: cat.order,
      isActive: cat.isActive,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "خطأ في التحقق",
        description: "اسم التصنيف مطلوب",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const updated = await categoriesApi.update(editingId, formData);
        setCategories((prev) =>
          prev.map((c) => (c._id === editingId ? updated : c))
        );
        toast({ title: "تم التحديث", description: "تم تحديث التصنيف بنجاح" });
      } else {
        const created = await categoriesApi.create(formData as any);
        setCategories((prev) => [...prev, created]);
        toast({ title: "تم الإضافة", description: "تم إضافة التصنيف بنجاح" });
      }
      closeForm();
    } catch {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل حفظ التصنيف. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (cat: Category) => {
    try {
      const updated = await categoriesApi.update(cat._id, {
        ...cat,
        isActive: !cat.isActive,
      });
      setCategories((prev) =>
        prev.map((c) => (c._id === cat._id ? updated : c))
      );
    } catch {
      toast({
        title: "خطأ",
        description: "فشل تغيير حالة التصنيف",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    setDeleting(true);
    try {
      await categoriesApi.delete(categoryToDelete);
      setCategories((prev) => prev.filter((c) => c._id !== categoryToDelete));
      toast({ title: "تم الحذف", description: "تم حذف التصنيف بنجاح" });
    } catch {
      toast({
        title: "خطأ في الحذف",
        description: "فشل حذف التصنيف",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">التصنيفات</h1>
            <p className="text-muted-foreground mt-1">
              إدارة تصنيفات المنتجات على الصفحة الرئيسية
            </p>
          </div>
          <Button onClick={openAddForm} className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة تصنيف
          </Button>
        </div>

        {/* Add/Edit Form Panel */}
        {formOpen && (
          <div className="glass-card rounded-xl p-6 border border-primary/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingId ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeForm}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cat-title">اسم التصنيف *</Label>
                  <Input
                    id="cat-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="مثال: صابون الكريستال"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cat-description">الوصف المختصر</Label>
                  <Input
                    id="cat-description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="وصف قصير يظهر فوق الصورة"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cat-details">التفاصيل</Label>
                  <Textarea
                    id="cat-details"
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    placeholder="وصف تفصيلي يظهر أسفل بطاقة التصنيف"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cat-order">ترتيب العرض</Label>
                    <Input
                      id="cat-order"
                      type="number"
                      min={0}
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, isActive: !formData.isActive })
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                        formData.isActive
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 bg-gray-50 text-gray-500"
                      }`}
                    >
                      {formData.isActive ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                      {formData.isActive ? "مرئي" : "مخفي"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column - Image */}
              <div>
                <ImageUpload
                  label="صورة التصنيف"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  placeholder="اختر صورة للتصنيف"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={closeForm}>
                إلغاء
              </Button>
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingId ? "حفظ التعديلات" : "إضافة التصنيف"}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Categories List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : categories.length === 0 ? (
          <div className="glass-card rounded-xl p-16 text-center">
            <LayoutGrid className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">لا توجد تصنيفات</h3>
            <p className="text-muted-foreground mb-6">
              ابدأ بإضافة أول تصنيف لمنتجاتك
            </p>
            <Button onClick={openAddForm} className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة تصنيف
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((cat) => (
                <div
                  key={cat._id}
                  className={`glass-card rounded-xl overflow-hidden shadow transition-shadow hover:shadow-lg ${
                    !cat.isActive ? "opacity-60" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-44 bg-muted overflow-hidden">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <LayoutGrid className="w-12 h-12 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 right-3 left-3">
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {cat.title}
                      </h3>
                      {cat.description && (
                        <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                          {cat.description}
                        </p>
                      )}
                    </div>
                    {/* Active badge */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          cat.isActive
                            ? "bg-green-500 text-white"
                            : "bg-gray-400 text-white"
                        }`}
                      >
                        {cat.isActive ? "مرئي" : "مخفي"}
                      </span>
                    </div>
                    {/* Order badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                      <GripVertical className="w-3 h-3" />
                      {cat.order}
                    </div>
                  </div>

                  {/* Details */}
                  {cat.details && (
                    <div className="px-4 pt-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {cat.details}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 p-4 pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => openEditForm(cat)}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      تعديل
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(cat)}
                      className={`gap-1.5 ${
                        cat.isActive
                          ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                          : "text-green-600 hover:text-green-700 hover:bg-green-50"
                      }`}
                    >
                      {cat.isActive ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(cat._id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا التصنيف؟ لا يمكن التراجع عن هذه العملية.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "حذف"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default AdminCategories;
