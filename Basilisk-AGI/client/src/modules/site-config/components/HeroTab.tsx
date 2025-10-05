import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SimpleImageUpload } from "./SimpleImageUpload";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { SiteConfig, HeroHighlight } from "../api";

interface HeroTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const HeroTab = ({ config, onUpdate }: HeroTabProps) => {
  const highlights = config.heroHighlights || [];

  const addHighlight = () => {
    const newHighlights = [...highlights, { icon: "Award", text: "" }];
    onUpdate('heroHighlights', newHighlights);
  };

  const updateHighlight = (index: number, field: 'icon' | 'text', value: string) => {
    const newHighlights = [...highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    onUpdate('heroHighlights', newHighlights);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = highlights.filter((_, i) => i !== index);
    onUpdate('heroHighlights', newHighlights);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="heroTitle">Título Principal</Label>
        <Input
          id="heroTitle"
          value={config.heroTitle}
          onChange={(e) => onUpdate('heroTitle', e.target.value)}
          placeholder="Bem-vindo ao nosso site"
        />
      </div>

      <div>
        <Label htmlFor="heroSubtitle">Subtítulo</Label>
        <Textarea
          id="heroSubtitle"
          value={config.heroSubtitle}
          onChange={(e) => onUpdate('heroSubtitle', e.target.value)}
          placeholder="Descrição do seu negócio"
          rows={3}
        />
      </div>

      <div>
        <Label>Imagem Hero</Label>
        <SimpleImageUpload
          value={config.heroImage}
          onChange={(url) => onUpdate('heroImage', url)}
          folder="hero"
        />
      </div>

      <div>
        <Label htmlFor="heroCtaText">Texto do Botão</Label>
        <Input
          id="heroCtaText"
          value={config.heroCtaText}
          onChange={(e) => onUpdate('heroCtaText', e.target.value)}
          placeholder="Entre em Contato"
        />
      </div>

      <div>
        <Label htmlFor="heroCtaLink">Link do Botão (opcional)</Label>
        <Input
          id="heroCtaLink"
          value={config.heroCtaLink || ''}
          onChange={(e) => onUpdate('heroCtaLink', e.target.value)}
          placeholder="https://wa.me/..."
        />
        <p className="text-sm text-muted-foreground mt-1">
          Se vazio, usará o WhatsApp configurado
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Destaques (Cards)</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addHighlight}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Destaque
          </Button>
        </div>

        <div className="space-y-3">
          {highlights.map((highlight, index) => (
            <Card key={index} className="p-4">
              <div className="flex gap-3">
                <div className="flex-1 space-y-3">
                  <Input
                    value={highlight.icon}
                    onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                    placeholder="Nome do ícone (ex: Award, Shield)"
                  />
                  <Input
                    value={highlight.text}
                    onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                    placeholder="Texto do destaque"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHighlight(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}

          {highlights.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum destaque adicionado. Clique em "Adicionar Destaque" para criar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
