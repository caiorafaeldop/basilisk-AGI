import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Settings, FileText, Users, MessageSquare, User, Layout } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { PageShell } from "@/components/layout/PageShell";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { config: siteConfig, isLoading } = useSiteConfig();

  const menuItems = [
    {
      icon: Settings,
      title: "Configurações do Site",
      description: "Personalize cores, logo e conteúdo",
      path: "/admin/site-config",
      color: "blue"
    },
    {
      icon: FileText,
      title: "Artigos",
      description: "Gerenciar blog e conteúdo",
      path: "/admin/artigos",
      color: "green"
    },
    {
      icon: MessageSquare,
      title: "Leads",
      description: "Ver mensagens de contato",
      path: "/admin/leads",
      color: "purple"
    },
    {
      icon: User,
      title: "Equipe",
      description: "Gerenciar membros da equipe",
      path: "/admin/equipe",
      color: "orange"
    },
    {
      icon: Layout,
      title: "Depoimentos",
      description: "Gerenciar depoimentos de clientes",
      path: "/admin/depoimentos",
      color: "pink"
    }
  ];

  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600"
  };

  return (
    <PageShell
      title={`${siteConfig?.siteName || 'Painel'} - Administração`}
      subtitle="Gerencie todos os aspectos do seu site"
      loading={isLoading}
    >
      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.path}
                onClick={() => navigate(item.path)}
                className="group relative overflow-hidden bg-slate-800/90 border-slate-700 hover:border-slate-600 transition-all cursor-pointer hover:scale-105"
              >
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[item.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {item.description}
                  </p>
                </div>
                
                {/* Efeito de hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all" />
              </Card>
            );
          })}
        </div>

      {/* Quick Stats (opcional) */}
      <div className="mt-16">
        <div className="grid grid-cols-3 gap-6">
          <Card className="bg-slate-800/90 border-slate-700 p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
            <div className="text-sm text-slate-400">Seções Ativas</div>
          </Card>
          <Card className="bg-slate-800/90 border-slate-700 p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">✓</div>
            <div className="text-sm text-slate-400">Site Configurado</div>
          </Card>
          <Card className="bg-slate-800/90 border-slate-700 p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
            <div className="text-sm text-slate-400">Possibilidades</div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminDashboard;
