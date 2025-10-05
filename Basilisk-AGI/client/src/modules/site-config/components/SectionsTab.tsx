import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { SiteConfig } from "../api";

interface SectionsTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const SectionsTab = ({ config, onUpdate }: SectionsTabProps) => {
  const sections = [
    { key: 'heroEnabled', label: 'Hero Section', description: 'Seção principal com destaque' },
    { key: 'teamEnabled', label: 'Equipe', description: 'Seção de membros da equipe' },
    { key: 'blogEnabled', label: 'Blog/Artigos', description: 'Seção de artigos e blog' },
    { key: 'testimonialsEnabled', label: 'Depoimentos', description: 'Seção de testemunhos' },
    { key: 'faqEnabled', label: 'FAQ', description: 'Perguntas frequentes' },
    { key: 'ctaEnabled', label: 'Contato/CTA', description: 'Formulário de contato' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Ative ou desative seções específicas da landing page
      </p>

      {sections.map((section) => (
        <Card key={section.key} className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor={section.key}>{section.label}</Label>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </div>
            <Switch
              id={section.key}
              checked={config[section.key as keyof SiteConfig] as boolean}
              onCheckedChange={(checked) => onUpdate(section.key, checked)}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
