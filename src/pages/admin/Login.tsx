import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { validatePasscode, setAuthenticated } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (validatePasscode(passcode)) {
      setAuthenticated();
      toast({
        title: 'تم تسجيل الدخول',
        description: 'مرحباً بك في لوحة التحكم',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'خطأ في الرمز',
        description: 'الرمز المدخل غير صحيح',
        variant: 'destructive',
      });
      setPasscode('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
            <p className="text-muted-foreground">أدخل رمز الدخول المكون من 6 أرقام</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-right block">
                رمز الدخول
              </Label>
              <Input
                id="passcode"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="text-center text-2xl tracking-widest font-mono"
                required
                autoFocus
                dir="ltr"
              />
            </div>

            <Button
              type="submit"
              className="w-full text-lg py-6"
              disabled={loading || passcode.length !== 6}
            >
              {loading ? 'جاري التحقق...' : 'دخول'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              العودة للصفحة الرئيسية
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
