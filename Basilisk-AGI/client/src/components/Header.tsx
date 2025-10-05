import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, Phone, Mail, X, Eye, EyeOff, LogOut, Shield, ChevronDown, FileText, MessageSquare, Quote, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { config } from "@/config/env";
import { authApi } from "@/modules/auth/api";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { nb } from "@/styles/neobrutalism";
import { useDesignSystem } from "@/hooks/useDesignSystem";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, isAuthenticated, user, logout } = useAuth();
  const { showError } = useModal();
  const { config: siteConfig } = useSiteConfig();
  const { systemName } = useDesignSystem();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Verificar se o usuário está logado ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Gerar menu dinâmico baseado nas seções ativas
  const navItems = [
    { name: "Início", href: "#inicio", enabled: true },
    { name: "Sobre", href: "#sobre", enabled: siteConfig?.aboutEnabled },
    { name: "Equipe", href: "#equipe", enabled: siteConfig?.teamEnabled },
    { name: "Blog", href: "#blog", enabled: siteConfig?.blogEnabled },
    { name: "FAQ", href: "#faq", enabled: siteConfig?.faqEnabled },
    { name: "Contato", href: "#contato", enabled: siteConfig?.ctaEnabled },
  ].filter(item => item.enabled);

  // Adicionar botão extra se habilitado
  if (siteConfig?.extraBtnEnabled && siteConfig?.extraBtnLabel) {
    navItems.push({
      name: siteConfig.extraBtnLabel,
      href: siteConfig.extraBtnLink || '#',
      enabled: true,
      isExtra: true
    } as any);
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      // Usar a API de auth real
      const response = await authApi.login({
        email: adminCredentials.email,
        password: adminCredentials.password
      });
      
      // Salvar token no localStorage
      localStorage.setItem('authToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Atualizar estado de login
      setIsLoggedIn(true);
      
      // Fechar modal e limpar campos
      setShowAdminModal(false);
      setAdminCredentials({ email: '', password: '' });
      
      // Disparar evento para outros componentes
      window.dispatchEvent(new CustomEvent('authChange'));
      
    } catch (error) {
      console.error('Erro no login:', error);
      showError('Credenciais inválidas. Verifique email e senha.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    // Limpar tokens do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Atualizar estado
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    
    // Disparar evento para outros componentes
    window.dispatchEvent(new CustomEvent('authChange'));
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setShowLogoutModal(true);
    } else {
      setShowAdminModal(true);
    }
  };

  const handleNavClick = (href: string) => {
    // Se estamos na página inicial, usar scroll suave para âncoras
    if (location.pathname === '/') {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const headerHeight = 80; // Altura reduzida do header
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Se estamos em outra página, navegar para a home com a âncora
      navigate(`/${href}`);
    }
    setIsMenuOpen(false);
  };

  // Função para clarear cor
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  };
  
  // Função para escurecer cor
  const darkenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  };

  // Cores dinâmicas do header
  const headerBg = siteConfig?.headerBgColor || '#1e293b';
  const headerText = siteConfig?.headerTextColor || '#ffffff';
  const headerBtn = siteConfig?.headerBtnColor || siteConfig?.primaryColor || '#3b82f6';
  const headerBtnText = siteConfig?.headerBtnTextColor || '#ffffff';
  const isDarkTheme = siteConfig?.siteTheme === 'dark';
  const primaryColor = siteConfig?.primaryColor || '#3b82f6';
  
  return (
    <>
    {/* Header Flutuante com Configurações Avançadas */}
    <header 
      className={`z-40 transition-all duration-300 ${
        systemName === 'minimalism' 
          ? 'top-0 left-0 right-0 w-full' 
          : 'top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-3/4'
      }`}
      style={{
        position: siteConfig?.headerPosition || 'fixed',
        backgroundColor: 'var(--header-bg)',
        backdropFilter: `blur(${siteConfig?.headerBlur || 20}px)`,
        border: '1px solid var(--border-color)',
        borderRadius: systemName === 'minimalism' ? '0' : '9999px',
        boxShadow: siteConfig?.headerShadow || 'var(--shadow-style)',
        paddingLeft: systemName === 'minimalism' ? '4rem' : undefined,
        opacity: siteConfig?.headerOpacity || 1,
        height: siteConfig?.headerHeight || 'auto',
        padding: siteConfig?.headerPadding || undefined,
        transitionDuration: siteConfig?.transitionSpeed || '300ms'
      }}
    >
      {/* Main navigation */}
      <div className={systemName === 'minimalism' ? 'px-4 md:px-6' : 'px-4 md:px-6'}>
        <div className="flex justify-between items-center py-2 md:py-2.5">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            {siteConfig?.logo && (
              <img
                src={siteConfig.logo}
                alt={`${siteConfig.siteName} - Logo`}
                className="h-12 md:h-14 w-auto object-contain"
                style={{
                  filter: systemName === 'minimalism' ? 'none' : 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.3))'
                }}
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center ${
            systemName === 'minimalism' ? 'space-x-4 ml-auto' : 'space-x-2'
          }`}>
            {navItems.map((item: any) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`font-semibold px-5 py-2.5 text-sm transition-all ${
                  systemName === 'minimalism' 
                    ? 'hover:-translate-y-0.5 rounded-md' 
                    : 'hover:translate-x-0.5 hover:translate-y-0.5 rounded-full'
                }`}
                style={
                  systemName === 'minimalism'
                    ? {
                        background: isDarkTheme
                          ? `linear-gradient(135deg, ${primaryColor} 0%, ${lightenColor(primaryColor, 20)} 100%)`
                          : `linear-gradient(135deg, ${primaryColor} 0%, ${darkenColor(primaryColor, 15)} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        backgroundColor: 'transparent',
                        border: `0.5px solid ${primaryColor}`,
                        boxShadow: 'none'
                      }
                    : {
                        color: headerText,
                        backgroundColor: 'transparent',
                        border: '1px solid var(--border-color)',
                        boxShadow: 'var(--shadow-style)'
                      }
                }
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button (somente para não logados) */}
          <div className={`hidden lg:flex items-center gap-2 ${
            systemName === 'minimalism' ? 'ml-4' : ''
          }`}>
            {!isLoggedIn && siteConfig?.whatsapp && (
              <Button 
                variant="default"
                size="sm"
                style={
                  systemName === 'minimalism'
                    ? {
                        background: isDarkTheme
                          ? `linear-gradient(135deg, ${primaryColor} 0%, ${lightenColor(primaryColor, 20)} 100%)`
                          : `linear-gradient(135deg, ${primaryColor} 0%, ${darkenColor(primaryColor, 15)} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        backgroundColor: 'transparent',
                        border: `0.5px solid ${primaryColor}`,
                        borderRadius: '6px',
                        boxShadow: 'none',
                        padding: '0.625rem 1.25rem'
                      }
                    : {
                        backgroundColor: headerBtn,
                        color: headerBtnText,
                        border: '1px solid var(--border-color)',
                        borderRadius: '9999px',
                        boxShadow: 'var(--shadow-style)'
                      }
                }
                className={`font-semibold transition-all ${
                  systemName === 'minimalism' 
                    ? 'hover:-translate-y-0.5' 
                    : 'hover:translate-x-0.5 hover:translate-y-0.5'
                }`}
                onClick={() => {
                  window.open(`https://wa.me/${siteConfig.whatsapp}?text=Olá, gostaria de entrar em contato.`, '_blank');
                }}
              >
                Entre em Contato
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full hover:opacity-80 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              color: headerText,
              backgroundColor: 'transparent'
            }}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pt-4 pb-4 border-t border-black/20 mt-2 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item: any) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="font-bold text-left px-4 py-2 rounded-full hover:opacity-80 transition-all"
                  style={{ 
                    color: headerText,
                    backgroundColor: 'transparent'
                  }}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Contact info for mobile */}
              <div className="border-t pt-4 mt-4 md:hidden">
                <div className="flex flex-col space-y-3 text-sm text-muted-foreground">
                  {siteConfig?.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{siteConfig.phone}</span>
                    </div>
                  )}
                  {siteConfig?.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{siteConfig.email}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* CTA button for mobile (apenas não logados) */}
              {!isLoggedIn && siteConfig?.whatsapp && (
                <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--border-color)' }}>
                  <Button 
                    variant="default"
                    style={{
                      backgroundColor: headerBtn,
                      color: headerBtnText,
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-style)',
                      borderRadius: systemName === 'minimalism' ? '8px' : '12px'
                    }}
                    className={`font-bold transition-all w-full ${
                      systemName === 'minimalism' 
                        ? 'hover:-translate-y-0.5' 
                        : 'hover:translate-x-1 hover:translate-y-1'
                    }`}
                    onClick={() => {
                      window.open(`https://wa.me/${siteConfig.whatsapp}?text=Olá, gostaria de entrar em contato.`, '_blank');
                      setIsMenuOpen(false);
                    }}
                  >
                    Entre em Contato
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
    
    {/* Modais removidos - Admin login não é mais necessário */}
    {false && showAdminModal && (
      <div 
        className="fixed inset-0 z-[100] bg-black/50"
        onClick={() => setShowAdminModal(false)}
      >
        {/* Modal - Posicionado próximo à chave */}
        <Card 
          className="absolute top-12 left-4 w-64 border-6 border-black bg-white"
          style={{ boxShadow: '12px 12px 0px #000000' }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="pb-3 border-b-4 border-black" style={{ backgroundColor: siteConfig?.primaryColor || '#FFE951' }}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold" style={{ color: '#000000' }}>
                Admin
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 border-2 border-black hover:bg-black/10"
                onClick={() => setShowAdminModal(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <div className="space-y-1">
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="Email"
                  value={adminCredentials.email}
                  onChange={(e) => setAdminCredentials(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  className="h-8 text-sm"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                    className="h-8 text-sm pr-8"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-8 w-8 px-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full font-bold h-8 text-sm disabled:opacity-50 border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] transition-all"
                style={{
                  backgroundColor: siteConfig?.secondaryColor || '#4ECDC4',
                  color: '#000000',
                  boxShadow: '4px 4px 0px #000000'
                }}
              >
                {isLoggingIn ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-black"></div>
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )}

    {/* Admin Logout Modal */}
    {showLogoutModal && (
      <div 
        className="fixed inset-0 z-[100] bg-black/50"
        onClick={() => setShowLogoutModal(false)}
      >
        {/* Modal - Posicionado próximo à chave */}
        <Card 
          className="absolute top-12 left-4 w-64 border-6 border-black bg-white"
          style={{ boxShadow: '12px 12px 0px #000000' }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="pb-3 border-b-4 border-black" style={{ backgroundColor: siteConfig?.primaryColor || '#FFE951' }}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold" style={{ color: '#000000' }}>
                Modo Administrador
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 border-2 border-black hover:bg-black/10"
                onClick={() => setShowLogoutModal(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-3">
            <div className="space-y-3">
              <p className="text-sm font-bold" style={{ color: '#000000' }}>
                Você está conectado como administrador.
              </p>
              
              <Button 
                onClick={handleLogout}
                className="w-full h-8 text-sm flex items-center justify-center space-x-2 font-bold border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] transition-all"
                style={{
                  backgroundColor: '#FF6B6B',
                  color: '#000000',
                  boxShadow: '4px 4px 0px #000000'
                }}
              >
                <LogOut className="h-3 w-3" />
                <span>Desconectar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )}
    </>
  );
};

export default Header;