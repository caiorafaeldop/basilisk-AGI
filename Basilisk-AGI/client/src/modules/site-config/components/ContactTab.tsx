import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteConfig } from "../api";

interface ContactTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const ContactTab = ({ config, onUpdate }: ContactTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={config.phone || ''}
            onChange={(e) => onUpdate('phone', e.target.value)}
            placeholder="(00) 0000-0000"
          />
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            value={config.whatsapp || ''}
            onChange={(e) => onUpdate('whatsapp', e.target.value)}
            placeholder="5500000000000"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Formato: código do país + DDD + número (sem espaços)
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={config.email || ''}
          onChange={(e) => onUpdate('email', e.target.value)}
          placeholder="contato@seusite.com"
        />
      </div>

      <div>
        <Label htmlFor="address">Endereço</Label>
        <Input
          id="address"
          value={config.address || ''}
          onChange={(e) => onUpdate('address', e.target.value)}
          placeholder="Rua, Avenida, número"
        />
      </div>

      <div>
        <Label htmlFor="addressComplement">Complemento</Label>
        <Input
          id="addressComplement"
          value={config.addressComplement || ''}
          onChange={(e) => onUpdate('addressComplement', e.target.value)}
          placeholder="Sala, Andar, etc"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            value={config.city || ''}
            onChange={(e) => onUpdate('city', e.target.value)}
            placeholder="São Paulo"
          />
        </div>

        <div>
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            value={config.state || ''}
            onChange={(e) => onUpdate('state', e.target.value)}
            placeholder="SP"
            maxLength={2}
          />
        </div>

        <div>
          <Label htmlFor="zipCode">CEP</Label>
          <Input
            id="zipCode"
            value={config.zipCode || ''}
            onChange={(e) => onUpdate('zipCode', e.target.value)}
            placeholder="00000-000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="businessHours">Horário de Atendimento</Label>
        <Input
          id="businessHours"
          value={config.businessHours}
          onChange={(e) => onUpdate('businessHours', e.target.value)}
          placeholder="Segunda a Sexta: 9h às 18h"
        />
      </div>

      <div>
        <Label htmlFor="mapEmbedUrl">URL do Google Maps Embed</Label>
        <Textarea
          id="mapEmbedUrl"
          value={config.mapEmbedUrl || ''}
          onChange={(e) => onUpdate('mapEmbedUrl', e.target.value)}
          placeholder="https://www.google.com/maps/embed?pb=..."
          rows={3}
        />
        <p className="text-sm text-muted-foreground mt-1">
          Cole o link de incorporação do Google Maps
        </p>
      </div>
    </div>
  );
};
