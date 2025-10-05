import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { SiteConfig, QuickLink } from "../api";

interface FooterTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const FooterTab = ({ config, onUpdate }: FooterTabProps) => {
  const services = config.footerServices || [];
  const quickLinks = config.footerQuickLinks || [];

  const addService = () => {
    onUpdate('footerServices', [...services, '']);
  };

  const updateService = (index: number, value: string) => {
    const newServices = [...services];
    newServices[index] = value;
    onUpdate('footerServices', newServices);
  };

  const removeService = (index: number) => {
    const newServices = services.filter((_, i) => i !== index);
    onUpdate('footerServices', newServices);
  };

  const addQuickLink = () => {
    onUpdate('footerQuickLinks', [...quickLinks, { name: '', href: '' }]);
  };

  const updateQuickLink = (index: number, field: 'name' | 'href', value: string) => {
    const newLinks = [...quickLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onUpdate('footerQuickLinks', newLinks);
  };

  const removeQuickLink = (index: number) => {
    const newLinks = quickLinks.filter((_, i) => i !== index);
    onUpdate('footerQuickLinks', newLinks);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="footerDescription">Descrição</Label>
        <Textarea
          id="footerDescription"
          value={config.footerDescription || ''}
          onChange={(e) => onUpdate('footerDescription', e.target.value)}
          placeholder="Breve descrição sobre sua empresa no footer"
          rows={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Serviços</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addService}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Serviço
          </Button>
        </div>

        <div className="space-y-2">
          {services.map((service, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={service}
                onChange={(e) => updateService(index, e.target.value)}
                placeholder="Nome do serviço"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeService(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Links Rápidos</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addQuickLink}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Link
          </Button>
        </div>

        <div className="space-y-3">
          {quickLinks.map((link, index) => (
            <Card key={index} className="p-3">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Input
                    value={link.name}
                    onChange={(e) => updateQuickLink(index, 'name', e.target.value)}
                    placeholder="Nome do link"
                  />
                  <Input
                    value={link.href}
                    onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
                    placeholder="#secao ou /pagina"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQuickLink(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="footerCopyright">Copyright</Label>
        <Input
          id="footerCopyright"
          value={config.footerCopyright}
          onChange={(e) => onUpdate('footerCopyright', e.target.value)}
          placeholder="© 2025 Minha Empresa. Todos os direitos reservados."
        />
      </div>

      <div>
        <Label htmlFor="footerLegalText">Texto Legal (opcional)</Label>
        <Textarea
          id="footerLegalText"
          value={config.footerLegalText || ''}
          onChange={(e) => onUpdate('footerLegalText', e.target.value)}
          placeholder="Avisos legais, regulamentação, etc"
          rows={2}
        />
      </div>
    </div>
  );
};
