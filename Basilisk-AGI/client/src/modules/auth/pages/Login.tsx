import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useToast } from "@/components/ui/use-toast";
import { useRateLimit, RATE_LIMIT_CONFIGS } from "@/utils/rateLimiter";

export const Login = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();
  const { config: siteConfig } = useSiteConfig();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // Redirecionar se já estiver logado (apenas no mount inicial)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, []); // Apenas uma vez no mount

  const validateEmail = (email: string): { valid: boolean; message: string } => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email) {
      return { valid: false, message: 'Email é obrigatório' };
    }
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Email inválido' };
    }
    if (email.length < 5) {
      return { valid: false, message: 'Email muito curto' };
    }
    return { valid: true, message: '' };
  };

  const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Senha deve ter no mínimo 8 caracteres' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Senha deve ter pelo menos uma letra maiúscula' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Senha deve ter pelo menos um número' };
    }
    return { valid: true, message: '' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      toast({
        title: "Email inválido",
        description: emailValidation.message,
        variant: "destructive",
      });
      return;
    }
    
    // Validar senha no registro
    if (!isLogin) {
      const validation = validatePassword(formData.password);
      if (!validation.valid) {
        setPasswordError(validation.message);
        toast({
          title: "Senha inválida",
          description: validation.message,
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsLoading(true);
    setPasswordError("");

    try {
      if (isLogin) {
        // Login
        await login(formData.email, formData.password);
        
        // Disparar evento para atualizar componentes
        window.dispatchEvent(new CustomEvent('authChange'));
        
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!",
        });
        
        // Pequeno delay para garantir que todos os componentes processem o evento
        await new Promise(resolve => setTimeout(resolve, 100));
        
        navigate("/admin");
      } else {
        // Register
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        
        // Disparar evento para atualizar componentes
        window.dispatchEvent(new CustomEvent('authChange'));
        
        toast({
          title: "Conta criada!",
          description: "Sua conta foi criada com sucesso.",
        });
        
        // Pequeno delay para garantir que todos os componentes processem o evento
        await new Promise(resolve => setTimeout(resolve, 100));
        
        navigate("/admin/site-config");
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Auth error:", error);
      }
      
      let errorMessage = 'Erro desconhecido';
      
      if (error.message === 'Credenciais inválidas') {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.message?.includes('network') || error.message?.includes('Failed to fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet';
      } else if (error.message?.includes('já existe') || error.message?.includes('already exists')) {
        errorMessage = 'Este email já está cadastrado';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: isLogin ? "Erro ao fazer login" : "Erro ao registrar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl bg-slate-800/90 backdrop-blur-sm border-slate-700">
        <CardHeader className="text-center space-y-4">
          <div className="flex flex-col items-center gap-4">
            {siteConfig?.logo ? (
              <img
                src={siteConfig.logo}
                alt={`${siteConfig.siteName} Logo`}
                className="w-24 h-24 object-contain drop-shadow-2xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                {siteConfig?.siteName?.charAt(0)?.toUpperCase() || 'M'}
              </div>
            )}
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent py-2 px-6 rounded-lg border-2 border-blue-400/30 shadow-lg shadow-blue-500/20">
                {siteConfig?.siteName || 'Meu Site'}
              </h1>
            </div>
          </div>
          <CardTitle className="text-2xl text-slate-100">
            {isLogin ? "Entre com as suas credenciais" : "Criar conta"}
          </CardTitle>
          <CardDescription className="text-slate-300">
            {isLogin
              ? ""
              : "Preencha os dados para criar sua conta"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-slate-200 text-base font-medium mb-2 block">
                  Nome Completo <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Seu nome"
                  required={!isLogin}
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-slate-200 text-base font-medium mb-2 block">
                E-mail <span className="text-rose-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="seu@email.com"
                required
                className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-200 text-base font-medium mb-2 block">
                Senha <span className="text-rose-400">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => {
                  updateField("password", e.target.value);
                  if (!isLogin) {
                    const validation = validatePassword(e.target.value);
                    setPasswordError(validation.message);
                  }
                }}
                placeholder="••••••••"
                required
                minLength={isLogin ? 6 : 8}
                className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
              />
              {!isLogin && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-slate-400">Requisitos da senha:</p>
                  <ul className="text-xs text-slate-400 space-y-1 ml-4">
                    <li className={formData.password.length >= 8 ? 'text-green-400' : ''}>
                      • Mínimo 8 caracteres
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}>
                      • Pelo menos uma letra maiúscula
                    </li>
                    <li className={/[0-9]/.test(formData.password) ? 'text-green-400' : ''}>
                      • Pelo menos um número
                    </li>
                  </ul>
                  {passwordError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{passwordError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white h-11 shadow-lg shadow-blue-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : isLogin ? (
                "Entrar"
              ) : (
                "Criar Conta"
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white h-11"
            >
              {isLogin ? "Criar nova conta" : "Já tenho uma conta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
