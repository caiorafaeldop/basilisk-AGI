import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteConfig } from "../api";

interface ThemeTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const ThemeTab = ({ config, onUpdate }: ThemeTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="primaryColor">Cor Primária</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="primaryColor"
              type="color"
              value={config.primaryColor}
              onChange={(e) => onUpdate('primaryColor', e.target.value)}
              className="w-20 h-10 p-1"
            />
            <Input
              type="text"
              value={config.primaryColor}
              onChange={(e) => onUpdate('primaryColor', e.target.value)}
              placeholder="#8B4513"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Cor principal do site
          </p>
        </div>

        <div>
          <Label htmlFor="secondaryColor">Cor Secundária</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="secondaryColor"
              type="color"
              value={config.secondaryColor}
              onChange={(e) => onUpdate('secondaryColor', e.target.value)}
              className="w-20 h-10 p-1"
            />
            <Input
              type="text"
              value={config.secondaryColor}
              onChange={(e) => onUpdate('secondaryColor', e.target.value)}
              placeholder="#D4AF37"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Cor de destaque
          </p>
        </div>

        <div>
          <Label htmlFor="accentColor">Cor de Acento</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="accentColor"
              type="color"
              value={config.accentColor}
              onChange={(e) => onUpdate('accentColor', e.target.value)}
              className="w-20 h-10 p-1"
            />
            <Input
              type="text"
              value={config.accentColor}
              onChange={(e) => onUpdate('accentColor', e.target.value)}
              placeholder="#4A5568"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Cor complementar
          </p>
        </div>
      </div>

      <div className="p-6 border rounded-lg bg-muted/30">
        <h3 className="font-semibold mb-4">Preview das Cores</h3>
        <div className="flex gap-4">
          <div 
            className="w-24 h-24 rounded-lg shadow-md"
            style={{ backgroundColor: config.primaryColor }}
          />
          <div 
            className="w-24 h-24 rounded-lg shadow-md"
            style={{ backgroundColor: config.secondaryColor }}
          />
          <div 
            className="w-24 h-24 rounded-lg shadow-md"
            style={{ backgroundColor: config.accentColor }}
          />
        </div>
      </div>
    </div>
  );
};
