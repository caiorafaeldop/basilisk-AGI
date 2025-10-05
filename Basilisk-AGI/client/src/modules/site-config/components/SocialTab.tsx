import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Linkedin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { SiteConfig } from "../api";

interface SocialTabProps {
  config: SiteConfig;
  onUpdate: (field: string, value: any) => void;
}

export const SocialTab = ({ config, onUpdate }: SocialTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="linkedin" className="flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Label>
        <Input
          id="linkedin"
          value={config.linkedin || ''}
          onChange={(e) => onUpdate('linkedin', e.target.value)}
          placeholder="https://www.linkedin.com/in/..."
        />
      </div>

      <div>
        <Label htmlFor="instagram" className="flex items-center gap-2">
          <Instagram className="w-4 h-4" />
          Instagram
        </Label>
        <Input
          id="instagram"
          value={config.instagram || ''}
          onChange={(e) => onUpdate('instagram', e.target.value)}
          placeholder="https://www.instagram.com/..."
        />
      </div>

      <div>
        <Label htmlFor="facebook" className="flex items-center gap-2">
          <Facebook className="w-4 h-4" />
          Facebook
        </Label>
        <Input
          id="facebook"
          value={config.facebook || ''}
          onChange={(e) => onUpdate('facebook', e.target.value)}
          placeholder="https://www.facebook.com/..."
        />
      </div>

      <div>
        <Label htmlFor="twitter" className="flex items-center gap-2">
          <Twitter className="w-4 h-4" />
          Twitter/X
        </Label>
        <Input
          id="twitter"
          value={config.twitter || ''}
          onChange={(e) => onUpdate('twitter', e.target.value)}
          placeholder="https://twitter.com/..."
        />
      </div>

      <div>
        <Label htmlFor="tiktok">TikTok</Label>
        <Input
          id="tiktok"
          value={config.tiktok || ''}
          onChange={(e) => onUpdate('tiktok', e.target.value)}
          placeholder="https://www.tiktok.com/@..."
        />
      </div>

      <div>
        <Label htmlFor="youtube" className="flex items-center gap-2">
          <Youtube className="w-4 h-4" />
          YouTube
        </Label>
        <Input
          id="youtube"
          value={config.youtube || ''}
          onChange={(e) => onUpdate('youtube', e.target.value)}
          placeholder="https://www.youtube.com/@..."
        />
      </div>
    </div>
  );
};
