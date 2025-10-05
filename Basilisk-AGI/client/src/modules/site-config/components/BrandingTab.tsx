import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimpleImageUpload } from "./SimpleImageUpload";
import { SiteConfig } from "../api";

interface BrandingTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const BrandingTab = ({ config, onUpdate }: BrandingTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="siteName">Nome do Site</Label>
        <Input
          id="siteName"
          value={config.siteName}
          onChange={(e) => onUpdate('siteName', e.target.value)}
          placeholder="Nome do seu site"
        />
      </div>

      <div>
        <Label>Logo</Label>
        <SimpleImageUpload
          value={config.logo}
          onChange={(url) => onUpdate('logo', url)}
          folder="branding"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Recomendado: PNG com fundo transparente
        </p>
      </div>

      <div>
        <Label>Favicon</Label>
        <SimpleImageUpload
          value={config.favicon}
          onChange={(url) => onUpdate('favicon', url)}
          folder="branding"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Recomendado: 32x32px ou 64x64px
        </p>
      </div>
    </div>
  );
};
