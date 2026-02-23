import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LayoutGrid,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";
import { clearAuthentication } from "@/lib/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      name: "لوحة التحكم",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "الطلبات",
      path: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      name: "المنتجات",
      path: "/dashboard/products",
      icon: Package,
    },
    {
      name: "التصنيفات",
      path: "/dashboard/categories",
      icon: LayoutGrid,
    },
  ];

  const handleLogout = () => {
    clearAuthentication();
    navigate("/admin/login");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(180,30%,97%)] to-[hsl(180,20%,92%)]" dir="rtl">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 right-0 left-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold">لوحة الإدارة</h1>
        </div>
      </div>

      <div className="flex h-screen pt-16 lg:pt-0">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-16 lg:top-0 right-0 h-[calc(100vh-4rem)] lg:h-screen w-64 bg-white shadow-lg flex flex-col z-50 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Logo - Desktop only */}
          <div className="hidden lg:block p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  لوحة الإدارة
                </h1>
                <p className="text-xs text-muted-foreground">Crystal Oil</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Button
                    variant={active ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      active
                        ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                        : "text-foreground hover:bg-primary/10 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t space-y-2">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <Button variant="outline" className="w-full justify-start gap-3 text-foreground hover:text-foreground">
                <Home className="w-5 h-5" />
                <span>العودة للموقع</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
