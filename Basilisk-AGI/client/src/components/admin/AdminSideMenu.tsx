import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePublicPage } from "@/contexts/PublicPageContext";
import { 
  Settings, FileText, MessageSquare, Users, Quote, LogOut, LogIn, ChevronRight, Loader2,
  LayoutDashboard, Image, Video, DollarSign, HelpCircle, Phone, MapPin, Home
} from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useAuth } from "@/hooks/useAuth";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import { useToast } from "@/components/ui/use-toast";

interface SubMenuItem {
  label: string;
  path: string;
}

interface MenuItem {
  icon: any;
  label: string;
  color: string;
  subItems: SubMenuItem[];
}

export const AdminSideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPublicPage } = usePublicPage();
  const { config: siteConfig } = useSiteConfig();
  const { logout, isAuthenticated } = useAuth();
  const { systemName } = useDesignSystem();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  // Se for página pública, não renderizar
  if (isPublicPage) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
      
      // Se o site tem conteúdo público, ir para home. Senão, login
      const hasContent = siteConfig && (
        siteConfig.siteName !== 'Meu Site' ||
        siteConfig.heroTitle ||
        siteConfig.logo
      );
      
      navigate(hasContent ? '/' : '/login');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Erro ao fazer logout:', error);
      }
      toast({
        title: "Erro ao sair",
        description: "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Forçar re-render quando autenticação mudar
  const [authKey, setAuthKey] = useState(0);
  
  useEffect(() => {
    const handleAuthChange = () => {
      setAuthKey(prev => prev + 1);
    };
    
    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setOpenSubmenu(null);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as any);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as any);
    };
  }, [isExpanded]);

  const menuItems: MenuItem[] = [
    {
      icon: Home,
      label: "Início",
      color: "text-cyan-400",
      subItems: [
        { label: "Ver Site", path: "/" }
      ]
    },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      color: "text-blue-400",
      subItems: [
        { label: "Visão Geral", path: "/admin" }
      ]
    },
    {
      icon: Settings,
      label: "Configurações",
      color: "text-indigo-400",
      subItems: [
        { label: "Configurações do Site", path: "/admin/site-config" },
        { label: "Configurações Gerais", path: "/admin/configuracoes" }
      ]
    },
    {
      icon: FileText,
      label: "Artigos",
      color: "text-green-400",
      subItems: [
        { label: "Todos os Artigos", path: "/admin/artigos" },
        { label: "Novo Artigo", path: "/admin/artigos/novo" }
      ]
    },
    {
      icon: MessageSquare,
      label: "Leads",
      color: "text-purple-400",
      subItems: [
        { label: "Ver Leads", path: "/admin/leads" }
      ]
    },
    {
      icon: Users,
      label: "Equipe",
      color: "text-orange-400",
      subItems: [
        { label: "Gerenciar Equipe", path: "/admin/equipe" }
      ]
    },
    {
      icon: Quote,
      label: "Depoimentos",
      color: "text-pink-400",
      subItems: [
        { label: "Gerenciar Depoimentos", path: "/admin/depoimentos" }
      ]
    }
  ];

  const handleItemClick = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
    setOpenSubmenu(null);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Verificar se uma rota está ativa
  const isRouteActive = (subItems: SubMenuItem[]) => {
    return subItems.some(item => location.pathname === item.path);
  };

  // Filtrar menu items baseado na autenticação
  const getVisibleMenuItems = () => {
    if (!isAuthenticated) {
      // Usuário não logado: apenas Início e Dashboard
      return menuItems.filter(item => 
        item.label === "Início" || item.label === "Dashboard"
      );
    }
    // Usuário logado: todos os menus
    return menuItems;
  };

  const visibleMenuItems = getVisibleMenuItems();

  return (
    <>
      {/* Sidebar - NEOBRUTALISM */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-screen border-r z-50 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
        style={{ 
          background: 'var(--sidebar-bg)',
          borderColor: 'var(--sidebar-border-color)',
          boxShadow: 'var(--sidebar-shadow)'
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false);
          setOpenSubmenu(null);
        }}
        role="navigation"
        aria-label="Menu lateral de administração"
      >
        <div className="flex flex-col h-full">
          {/* Logo - Altura fixa para não causar deslocamento */}
          <div className="h-24 flex items-center justify-center flex-shrink-0">
            {siteConfig?.logo ? (
              <div 
                className="w-10 h-10 overflow-hidden border transition-all duration-300"
                style={{ 
                  borderColor: 'var(--sidebar-border-color)',
                  borderRadius: systemName === 'minimalism' ? '8px' : '12px',
                  boxShadow: 'var(--sidebar-shadow)'
                }}
              >
                <img
                  src={siteConfig.logo}
                  alt={siteConfig.siteName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div 
                className="w-10 h-10 flex items-center justify-center font-bold text-lg border"
                style={{ 
                  backgroundColor: siteConfig?.primaryColor || '#FFE951', 
                  color: 'var(--sidebar-text-color)',
                  borderColor: 'var(--sidebar-border-color)',
                  borderRadius: systemName === 'minimalism' ? '8px' : '12px',
                  boxShadow: 'var(--sidebar-shadow)'
                }}
              >
                {siteConfig?.siteName?.charAt(0)?.toUpperCase() || 'M'}
              </div>
            )}
          </div>

          {/* Site Name (só aparece expandido) - Altura fixa */}
          <div className="h-8 flex items-center justify-center px-4 flex-shrink-0">
            {isExpanded && (
              <p 
                className="font-bold text-sm truncate w-full text-center" 
                style={{ color: 'var(--sidebar-text-color)' }}
              >
                {siteConfig?.siteName || 'Meu Site'}
              </p>
            )}
          </div>

          <div className="border-t flex-shrink-0" style={{ borderColor: 'var(--sidebar-border-color)' }} />

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-2 py-4">
            <div className="space-y-1">
              {visibleMenuItems.map((item) => {
                const Icon = item.icon;
                const isOpen = openSubmenu === item.label;
                const isActive = isRouteActive(item.subItems);
                
                return (
                  <div key={item.label} className="relative">
                    {/* Main Button - Altura fixa */}
                    <button
                      onClick={() => handleItemClick(item.label)}
                      className={`w-full h-12 flex items-center ${
                        isExpanded ? 'gap-3 px-3' : 'justify-center px-2'
                      } border font-bold transition-all ${
                        systemName === 'minimalism'
                          ? 'rounded-lg hover:-translate-y-0.5'
                          : 'rounded-xl hover:translate-x-0.5 hover:translate-y-0.5'
                      } ${isOpen || isActive ? (systemName === 'minimalism' ? '-translate-y-0.5' : 'translate-x-0.5 translate-y-0.5') : ''}`}
                      style={{
                        backgroundColor: (isOpen || isActive) ? 'var(--sidebar-item-hover-bg)' : 'transparent',
                        color: 'var(--sidebar-text-color)',
                        borderColor: 'var(--sidebar-border-color)',
                        boxShadow: 'var(--sidebar-shadow)'
                      }}
                      title={!isExpanded ? item.label : ''}
                      aria-expanded={isOpen}
                      aria-controls={`submenu-${item.label}`}
                      aria-label={item.label}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--sidebar-icon-color)' }} />
                      {isExpanded && (
                        <>
                          <span className="text-sm flex-1 text-left">{item.label}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </>
                      )}
                    </button>

                    {/* Submenu Dropdown */}
                    {isOpen && isExpanded && (
                      <div 
                        id={`submenu-${item.label}`}
                        role="menu"
                        aria-label={`${item.label} submenu`}
                        className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200"
                      >
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.path}
                            onClick={() => handleSubItemClick(subItem.path)}
                            role="menuitem"
                            aria-label={subItem.label}
                            className={`w-full flex items-center gap-2 px-3 py-2 border font-bold transition-all text-sm ${
                              systemName === 'minimalism'
                                ? 'rounded-md hover:-translate-y-0.5'
                                : 'rounded-lg hover:translate-x-0.5'
                            }`}
                            style={{
                              backgroundColor: 'var(--accent-color)',
                              color: systemName === 'minimalism' ? '#ffffff' : '#000000',
                              borderColor: 'var(--sidebar-border-color)',
                              boxShadow: 'var(--sidebar-shadow)'
                            }}
                          >
                            <div className="w-1.5 h-1.5 bg-black" />
                            <span>{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t my-2" style={{ borderColor: 'var(--sidebar-border-color)' }} />

          {/* Login/Logout Button - Altura fixa */}
          <div className="p-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`w-full h-12 flex items-center ${
                  isExpanded ? 'gap-3 px-3' : 'justify-center px-2'
                } border font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  systemName === 'minimalism'
                    ? 'rounded-lg hover:-translate-y-0.5'
                    : 'rounded-xl hover:translate-x-0.5 hover:translate-y-0.5'
                }`}
                style={{
                  backgroundColor: '#FF6B6B',
                  color: systemName === 'minimalism' ? '#ffffff' : '#000000',
                  borderColor: 'var(--sidebar-border-color)',
                  boxShadow: 'var(--sidebar-shadow)'
                }}
                title={!isExpanded ? 'Sair' : ''}
                aria-label="Sair do sistema"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" aria-hidden="true" />
                    {isExpanded && (
                      <span className="text-sm">Saindo...</span>
                    )}
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    {isExpanded && (
                      <span className="text-sm">Sair</span>
                    )}
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className={`w-full h-12 flex items-center ${
                  isExpanded ? 'gap-3 px-3' : 'justify-center px-2'
                } border font-bold transition-all ${
                  systemName === 'minimalism'
                    ? 'rounded-lg hover:-translate-y-0.5'
                    : 'rounded-xl hover:translate-x-0.5 hover:translate-y-0.5'
                }`}
                style={{
                  backgroundColor: '#4ECDC4',
                  color: systemName === 'minimalism' ? '#ffffff' : '#000000',
                  borderColor: 'var(--sidebar-border-color)',
                  boxShadow: 'var(--sidebar-shadow)'
                }}
                title={!isExpanded ? 'Entrar' : ''}
                aria-label="Fazer login no sistema"
              >
                <LogIn className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {isExpanded && (
                  <span className="text-sm">Entrar</span>
                )}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
