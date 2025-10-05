import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Upload, X, Loader2, Image as ImageIcon, ZoomIn, ZoomOut } from "lucide-react";
import { API_CONFIG } from "@/config/api";

interface ImageUploadWithCropProps {
  imageId?: string;
  onImageSelect: (imageId: string, url: string) => void;
  aspectRatio?: number; // 16/9 = 1.777...
  recommendedSize?: string;
  folder?: string;
}

export const ImageUploadWithCrop = ({
  imageId,
  onImageSelect,
  aspectRatio = 16 / 9,
  recommendedSize = "1920x1080",
  folder = "basilisk/hero",
}: ImageUploadWithCropProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem válida');
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Imagem muito grande. Máximo: 5MB');
      return;
    }

    setSelectedFile(file);

    // Ler arquivo
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
  };

  const getCroppedImage = useCallback(async (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current;
      const image = imageRef.current;

      if (!canvas || !image) {
        reject(new Error('Canvas ou imagem não encontrados'));
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Contexto do canvas não disponível'));
        return;
      }

      // Dimensões finais
      const targetWidth = 1920;
      const targetHeight = 1080;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Calcular dimensões de crop
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      const imageAspect = imageWidth / imageHeight;

      let cropWidth, cropHeight;
      if (imageAspect > aspectRatio) {
        // Imagem mais larga
        cropHeight = imageHeight / zoom;
        cropWidth = cropHeight * aspectRatio;
      } else {
        // Imagem mais alta
        cropWidth = imageWidth / zoom;
        cropHeight = cropWidth / aspectRatio;
      }

      // Centralizar crop
      const cropX = (imageWidth - cropWidth) / 2 + crop.x;
      const cropY = (imageHeight - cropHeight) / 2 + crop.y;

      // Desenhar imagem cortada
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        targetWidth,
        targetHeight
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Erro ao gerar imagem'));
          }
        },
        'image/jpeg',
        0.95
      );
    });
  }, [zoom, crop, aspectRatio]);

  const handleConfirmCrop = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Gerar imagem cortada
      const croppedBlob = await getCroppedImage();
      const croppedFile = new File([croppedBlob], selectedFile.name, {
        type: 'image/jpeg',
      });

      // Upload
      const formData = new FormData();
      formData.append('image', croppedFile);
      formData.append('folder', folder);
      formData.append('width', '1920');
      formData.append('height', '1080');

      const response = await fetch(`${API_CONFIG.BASE_URL}/images/upload`, {
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
      setImageUrl(data.url);
      onImageSelect(data.imageId, data.url);
      setShowCropModal(false);
      setSelectedFile(null);
      setImageSrc('');
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!imageId) return;

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': API_CONFIG.API_KEY,
        },
      });

      if (response.ok) {
        setImageUrl('');
        onImageSelect('', '');
      }
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
    }
  };

  // Buscar URL da imagem quando imageId mudar
  useEffect(() => {
    if (!imageId) {
      setImageUrl('');
      return;
    }

    const fetchImageUrl = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/images/${imageId}`, {
          headers: {
            'x-api-key': API_CONFIG.API_KEY,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.url);
        }
      } catch (error) {
        console.error('Erro ao buscar imagem:', error);
      }
    };

    fetchImageUrl();
  }, [imageId]);

  return (
    <>
      <div className="space-y-4">
        {imageUrl || imageId ? (
          <Card className="p-4 bg-slate-700/30 border-slate-600">
            <div className="space-y-3">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded border border-slate-600"
              />
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id={`file-upload-${folder}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                    onClick={() => document.getElementById(`file-upload-${folder}`)?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Trocar Imagem
                  </Button>
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-400 text-center">
                📐 Recomendado: {recommendedSize} (16:9)
              </p>
            </div>
          </Card>
        ) : (
          <Card className="p-6 border-2 border-dashed border-slate-600 bg-slate-700/20">
            <div className="text-center space-y-4">
              <ImageIcon className="w-12 h-12 text-slate-400 mx-auto" />
              <div>
                <p className="text-sm text-slate-300 mb-2">Adicione uma imagem ao slide</p>
                <p className="text-xs text-slate-400">
                  📐 Recomendado: {recommendedSize} (16:9)
                </p>
              </div>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id={`file-upload-${folder}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                  onClick={() => document.getElementById(`file-upload-${folder}`)?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher Imagem
                </Button>
              </label>
              <p className="text-xs text-slate-400">
                📤 PNG, JPG ou WEBP • Máx. 5MB
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Modal de Crop */}
      <Dialog open={showCropModal} onOpenChange={setShowCropModal}>
        <DialogContent className="max-w-4xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-slate-100">Ajustar Imagem (16:9)</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Preview da imagem */}
            <div className="relative bg-slate-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {imageSrc && (
                <>
                  <img
                    ref={imageRef}
                    src={imageSrc}
                    alt="Crop preview"
                    className="w-full h-full object-contain"
                    style={{
                      transform: `scale(${zoom}) translate(${crop.x}px, ${crop.y}px)`,
                      transition: 'transform 0.1s',
                    }}
                  />
                  <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
                </>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Controles de Zoom */}
            <div className="flex items-center gap-4">
              <Label className="text-slate-300 min-w-[60px]">Zoom:</Label>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <span className="text-slate-300 min-w-[60px] text-right">{(zoom * 100).toFixed(0)}%</span>
            </div>

            <p className="text-xs text-slate-400 text-center">
              💡 Use o zoom para ajustar a imagem. A área destacada será cortada em 1920x1080px (16:9)
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCropModal(false);
                setSelectedFile(null);
                setImageSrc('');
              }}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirmCrop}
              disabled={isUploading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar e Upload'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
