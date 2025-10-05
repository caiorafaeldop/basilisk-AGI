import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SimpleImageUpload } from "./SimpleImageUpload";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { SiteConfig } from "../api";

interface AboutTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const AboutTab = ({ config, onUpdate }: AboutTabProps) => {
  const qualifications = config.qualifications || [];

  const addQualification = () => {
    const newQuals = [...qualifications, { icon: "GraduationCap", text: "" }];
    onUpdate('qualifications', newQuals);
  };

  const updateQualification = (index: number, field: 'icon' | 'text', value: string) => {
    const newQuals = [...qualifications];
    newQuals[index] = { ...newQuals[index], [field]: value };
    onUpdate('qualifications', newQuals);
  };

  const removeQualification = (index: number) => {
    const newQuals = qualifications.filter((_, i) => i !== index);
    onUpdate('qualifications', newQuals);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label htmlFor="aboutEnabled">Seção Sobre Ativa</Label>
          <p className="text-sm text-muted-foreground">
            Exibir a seção "Sobre" na página inicial
          </p>
        </div>
        <Switch
          id="aboutEnabled"
          checked={config.aboutEnabled}
          onCheckedChange={(checked) => onUpdate('aboutEnabled', checked)}
        />
      </div>

      <div>
        <Label htmlFor="aboutTitle">Título</Label>
        <Input
          id="aboutTitle"
          value={config.aboutTitle}
          onChange={(e) => onUpdate('aboutTitle', e.target.value)}
          placeholder="Sobre Nós"
        />
      </div>

      <div>
        <Label htmlFor="aboutSubtitle">Subtítulo (opcional)</Label>
        <Input
          id="aboutSubtitle"
          value={config.aboutSubtitle || ''}
          onChange={(e) => onUpdate('aboutSubtitle', e.target.value)}
          placeholder="Profissional"
        />
      </div>

      <div>
        <Label htmlFor="aboutContent">Conteúdo</Label>
        <Textarea
          id="aboutContent"
          value={config.aboutContent || ''}
          onChange={(e) => onUpdate('aboutContent', e.target.value)}
          placeholder="Descrição sobre você ou sua empresa"
          rows={5}
        />
      </div>

      <div>
        <Label>Imagem Desktop</Label>
        <SimpleImageUpload
          value={config.aboutImage}
          onChange={(url) => onUpdate('aboutImage', url)}
          folder="about"
        />
      </div>

      <div>
        <Label>Imagem Mobile (opcional)</Label>
        <SimpleImageUpload
          value={config.aboutImageMobile}
          onChange={(url) => onUpdate('aboutImageMobile', url)}
          folder="about"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Qualificações</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addQualification}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Qualificação
          </Button>
        </div>

        <div className="space-y-3">
          {qualifications.map((qual, index) => (
            <Card key={index} className="p-4">
              <div className="flex gap-3">
                <div className="flex-1 space-y-3">
                  <Input
                    value={qual.icon}
                    onChange={(e) => updateQualification(index, 'icon', e.target.value)}
                    placeholder="Nome do ícone (ex: GraduationCap)"
                  />
                  <Input
                    value={qual.text}
                    onChange={(e) => updateQualification(index, 'text', e.target.value)}
                    placeholder="Texto da qualificação"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQualification(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}

          {qualifications.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma qualificação adicionada. Clique em "Adicionar Qualificação" para criar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
