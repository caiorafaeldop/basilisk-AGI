import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, X, Loader2 } from "lucide-react";
import { API_CONFIG } from "@/config/api";

interface SimpleImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
}

export const SimpleImageUpload = ({ value, onChange, folder }: SimpleImageUploadProps) => {
  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      if (folder) formData.append('folder', folder);

      const response = await fetch(`${API_CONFIG.BASE_URL}/upload/image`, {
        method: 'POST',
        body: formData,
        headers: {
          'x-api-key': API_CONFIG.API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      {value ? (
        <Card className="p-4 bg-slate-700/30 border-slate-600">
          <div className="flex items-center gap-4">
            <img
              src={value}
              alt="Preview"
              className="w-24 h-24 object-cover rounded border border-slate-600"
            />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1 text-slate-200">Imagem carregada</p>
              <p className="text-xs text-slate-400 break-all">{value}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 border-2 border-dashed border-slate-600 bg-slate-700/20">
          <div className="text-center space-y-4">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-blue-400 mx-auto animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-slate-400 mx-auto" />
            )}
            
            <div className="space-y-3">
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  {isUploading ? 'Fazendo upload...' : 'Selecionar Arquivo'}
                </Button>
              </label>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">ou</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="Cole a URL da imagem"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600"
                >
                  Adicionar
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-slate-400">
              📤 PNG, JPG ou WEBP • Máx. 5MB
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
