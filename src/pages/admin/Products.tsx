import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Package,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { productsApi } from "@/lib/api";
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

interface Product {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  inStock: boolean;
  badge?: string;
  warrantyNumber?: string;
  rating?: number;
  reviewsCount?: number;
  salesCount?: number;
  viewsCount?: number;
  mainImage: string;
  images?: string[];
  features?: string[];
  properties?: { [key: string]: string };
}

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      toast({
        title: "خطأ في التحميل",
        description: "فشل تحميل المنتجات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setDeleting(true);
    try {
      await productsApi.delete(productToDelete);
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف المنتج بنجاح",
      });
      setProducts(products.filter((p) => p._id !== productToDelete));
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "فشل حذف المنتج. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">جاري تحميل المنتجات...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">المنتجات</h1>
            <p className="text-muted-foreground">
              إدارة المنتجات والمخزون ({products.length} منتج)
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard/products/add")}
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            إضافة منتج
          </Button>
        </div>

        {/* Products List */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">لا توجد منتجات</h3>
              <p className="text-muted-foreground mb-6">
                ابدأ بإضافة منتجك الأول
              </p>
              <Button
                onClick={() => navigate("/dashboard/products/add")}
                className="gap-2"
              >
                <Plus className="w-5 h-5" />
                إضافة منتج جديد
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex gap-4 p-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.mainImage || "/placeholder.svg"}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg truncate">
                        {product.name}
                      </h3>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(`/dashboard/products/edit/${product._id}`)
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(product._id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {product.shortDescription}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-primary">
                          {product.price} MAD
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice} MAD
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {product.badge && product.badge !== "none" && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                            {product.badge === "new" && "جديد"}
                            {product.badge === "sale" && "تخفيض"}
                            {product.badge === "hot" && "الأكثر مبيعاً"}
                          </span>
                        )}
                        {product.inStock ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            متوفر ({product.stockQuantity})
                          </span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            غير متوفر
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المنتج نهائياً من
                قاعدة البيانات.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleting ? (
                  <>
                    <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                    جاري الحذف...
                  </>
                ) : (
                  "حذف"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Products;
