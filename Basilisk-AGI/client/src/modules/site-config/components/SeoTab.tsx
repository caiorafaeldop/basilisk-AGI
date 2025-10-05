import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteConfig } from "../api";

interface SeoTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const SeoTab = ({ config, onUpdate }: SeoTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          value={config.metaTitle || ''}
          onChange={(e) => onUpdate('metaTitle', e.target.value)}
          placeholder="Título que aparece nos resultados de busca"
          maxLength={60}
        />
        <p className="text-sm text-muted-foreground mt-1">
          Máximo 60 caracteres. {(config.metaTitle || '').length}/60
        </p>
      </div>

      <div>
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={config.metaDescription || ''}
          onChange={(e) => onUpdate('metaDescription', e.target.value)}
          placeholder="Descrição que aparece nos resultados de busca"
          rows={3}
          maxLength={160}
        />
        <p className="text-sm text-muted-foreground mt-1">
          Máximo 160 caracteres. {(config.metaDescription || '').length}/160
        </p>
      </div>

      <div>
        <Label htmlFor="metaKeywords">Meta Keywords</Label>
        <Input
          id="metaKeywords"
          value={config.metaKeywords || ''}
          onChange={(e) => onUpdate('metaKeywords', e.target.value)}
          placeholder="palavra1, palavra2, palavra3"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Palavras-chave separadas por vírgula
        </p>
      </div>

      <div className="p-4 border rounded-lg bg-muted/30">
        <h3 className="font-semibold mb-2">Preview do Google</h3>
        <div className="space-y-1">
          <div className="text-blue-600 text-lg">
            {config.metaTitle || config.siteName}
          </div>
          <div className="text-sm text-green-700">
            {typeof window !== 'undefined' ? window.location.origin : 'https://seusite.com'}
          </div>
          <div className="text-sm text-gray-600">
            {config.metaDescription || 'Adicione uma meta description para visualizar aqui'}
          </div>
        </div>
      </div>
    </div>
  );
};
