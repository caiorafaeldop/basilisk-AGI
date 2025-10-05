/**
 * Seções de Customização Avançada
 * Componente separado para manter o AdminSiteConfig organizado
 */

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Type, Maximize, MousePointer, Monitor, Search, Sliders, Image as ImageIcon } from "lucide-react";
import { GOOGLE_FONTS, FONT_WEIGHTS, FONT_SIZES, LINE_HEIGHTS, LETTER_SPACINGS, loadGoogleFont } from "@/utils/googleFonts";
import { SimpleImageUpload } from "./SimpleImageUpload";

interface AdvancedCustomizationProps {
  displayConfig: any;
  handleUpdate: (field: string, value: any) => void;
}

export const AdvancedCustomization = ({ displayConfig, handleUpdate }: AdvancedCustomizationProps) => {
  return (
    <>
      {/* 🔥 TIPOGRAFIA COMPLETA */}
      <AccordionItem value="typography" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
        <AccordionTrigger className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Type className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Tipografia</div>
              <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Fontes, tamanhos e espaçamentos</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 space-y-4">
          {/* Seletor de Fonte */}
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Família da Fonte</Label>
            <Select
              value={displayConfig.fontFamily || 'Inter'}
              onValueChange={(value) => {
                handleUpdate('fontFamily', value);
                loadGoogleFont(value, [100, 200, 300, 400, 500, 600, 700, 800, 900]);
              }}
            >
              <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GOOGLE_FONTS.map(font => (
                  <SelectItem key={font.name} value={font.name}>
                    <span style={{ fontFamily: font.name }}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Títulos */}
          <div className="border-t pt-4" style={{ borderColor: 'var(--muted-border)' }}>
            <h4 className="font-medium mb-3" style={{ color: 'var(--site-text-color)' }}>Títulos</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Tamanho</Label>
                <Select
                  value={displayConfig.titleFontSize || '3rem'}
                  onValueChange={(value) => handleUpdate('titleFontSize', value)}
                >
                  <SelectTrigger className="h-10" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_SIZES.title.map(size => (
                      <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Peso</Label>
                <Select
                  value={displayConfig.titleFontWeight || '700'}
                  onValueChange={(value) => handleUpdate('titleFontWeight', value)}
                >
                  <SelectTrigger className="h-10" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_WEIGHTS.map(weight => (
                      <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Altura da Linha</Label>
                <Select
                  value={displayConfig.titleLineHeight || '1.2'}
                  onValueChange={(value) => handleUpdate('titleLineHeight', value)}
                >
                  <SelectTrigger className="h-10" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LINE_HEIGHTS.map(lh => (
                      <SelectItem key={lh.value} value={lh.value}>{lh.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Espaçamento</Label>
                <Select
                  value={displayConfig.titleLetterSpacing || '0'}
                  onValueChange={(value) => handleUpdate('titleLetterSpacing', value)}
                >
                  <SelectTrigger className="h-10" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LETTER_SPACINGS.map(ls => (
                      <SelectItem key={ls.value} value={ls.value}>{ls.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Subtítulos */}
          <div className="border-t pt-4" style={{ borderColor: 'var(--muted-border)' }}>
            <h4 className="font-medium mb-3" style={{ color: 'var(--site-text-color)' }}>Subtítulos</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Tamanho</Label>
                <Select
                  value={displayConfig.subtitleFontSize || '1.25rem'}
                  onValueChange={(value) => handleUpdate('subtitleFontSize', value)}
                >
                  <SelectTrigger className="h-10" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_SIZES.subtitle.map(size => (
                      <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Peso</Label>
                <Select
                  value={displayConfig.subtitleFontWeight || '500'}
                  onValueChange={(value) => handleUpdate('subtitleFontWeight', value)}
                >
                  <SelectTrigger className="h-10" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_WEIGHTS.map(weight => (
                      <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Texto Corpo */}
          <div className="border-t pt-4" style={{ borderColor: 'var(--muted-border)' }}>
            <h4 className="font-medium mb-3" style={{ color: 'var(--site-text-color)' }}>Texto Corpo</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Tamanho</Label>
                <Select
                  value={displayConfig.bodyFontSize || '1rem'}
                  onValueChange={(value) => handleUpdate('bodyFontSize', value)}
                >
                  <SelectTrigger className="h-10" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_SIZES.body.map(size => (
                      <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Peso</Label>
                <Select
                  value={displayConfig.bodyFontWeight || '400'}
                  onValueChange={(value) => handleUpdate('bodyFontWeight', value)}
                >
                  <SelectTrigger className="h-10" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_WEIGHTS.map(weight => (
                      <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 🔥 ESPAÇAMENTOS */}
      <AccordionItem value="spacing" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
        <AccordionTrigger className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <Maximize className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Espaçamentos</div>
              <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Controle total de padding e margins</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Espaçamento entre Seções (rem)</Label>
              <Input
                type="number"
                step="0.5"
                value={displayConfig.sectionSpacing?.replace('rem', '') || '4'}
                onChange={(e) => handleUpdate('sectionSpacing', `${e.target.value}rem`)}
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Padding dos Cards (rem)</Label>
              <Input
                type="number"
                step="0.5"
                value={displayConfig.cardPadding?.replace('rem', '') || '2'}
                onChange={(e) => handleUpdate('cardPadding', `${e.target.value}rem`)}
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Padding dos Botões</Label>
              <Input
                value={displayConfig.buttonPadding || '0.875rem 2rem'}
                onChange={(e) => handleUpdate('buttonPadding', e.target.value)}
                placeholder="0.875rem 2rem"
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Padding do Header</Label>
              <Input
                value={displayConfig.headerPadding || '1rem 2rem'}
                onChange={(e) => handleUpdate('headerPadding', e.target.value)}
                placeholder="1rem 2rem"
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Hero Padding Top (rem)</Label>
              <Input
                type="number"
                step="0.5"
                value={displayConfig.heroPaddingTop?.replace('rem', '') || '4'}
                onChange={(e) => handleUpdate('heroPaddingTop', `${e.target.value}rem`)}
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Hero Padding Bottom (rem)</Label>
              <Input
                type="number"
                step="0.5"
                value={displayConfig.heroPaddingBottom?.replace('rem', '') || '4'}
                onChange={(e) => handleUpdate('heroPaddingBottom', `${e.target.value}rem`)}
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 🔥 BOTÕES AVANÇADOS */}
      <AccordionItem value="buttons-advanced" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
        <AccordionTrigger className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <MousePointer className="w-5 h-5 text-rose-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Botões Avançados</div>
              <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Tamanho, sombra, hover e mais</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Tamanho do Botão</Label>
              <Select
                value={displayConfig.buttonSize || 'md'}
                onValueChange={(value) => handleUpdate('buttonSize', value)}
              >
                <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Pequeno</SelectItem>
                  <SelectItem value="md">Médio</SelectItem>
                  <SelectItem value="lg">Grande</SelectItem>
                  <SelectItem value="xl">Gigante</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Border Radius (px)</Label>
              <Input
                type="number"
                value={displayConfig.buttonRadius?.replace('px', '') || '6'}
                onChange={(e) => handleUpdate('buttonRadius', `${e.target.value}px`)}
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Cor da Sombra</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={displayConfig.buttonShadowColor || '#000000'}
                  onChange={(e) => handleUpdate('buttonShadowColor', e.target.value)}
                  className="w-16 h-11 p-1 cursor-pointer"
                  style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)' }}
                />
                <Input
                  type="text"
                  value={displayConfig.buttonShadowColor || '#000000'}
                  onChange={(e) => handleUpdate('buttonShadowColor', e.target.value)}
                  className="h-11"
                  style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                />
              </div>
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Efeito de Hover</Label>
              <Select
                value={displayConfig.buttonHoverEffect || 'lift'}
                onValueChange={(value) => handleUpdate('buttonHoverEffect', value)}
              >
                <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lift">Levitar</SelectItem>
                  <SelectItem value="scale">Aumentar</SelectItem>
                  <SelectItem value="glow">Brilhar</SelectItem>
                  <SelectItem value="pulse">Pulsar</SelectItem>
                  <SelectItem value="none">Nenhum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Sombra Customizada</Label>
              <Input
                value={displayConfig.buttonShadow || '0 4px 12px rgba(0, 0, 0, 0.1)'}
                onChange={(e) => handleUpdate('buttonShadow', e.target.value)}
                placeholder="0 4px 12px rgba(0, 0, 0, 0.1)"
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 🔥 HEADER AVANÇADO */}
      <AccordionItem value="header-advanced" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
        <AccordionTrigger className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Header Avançado</div>
              <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Transparência, blur, animação</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 space-y-4">
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Opacidade ({displayConfig.headerOpacity || 1})</Label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={displayConfig.headerOpacity || 1}
              onChange={(e) => handleUpdate('headerOpacity', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Blur ({displayConfig.headerBlur || 20}px)</Label>
            <input
              type="range"
              min="0"
              max="50"
              value={displayConfig.headerBlur || 20}
              onChange={(e) => handleUpdate('headerBlur', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Posição</Label>
              <Select
                value={displayConfig.headerPosition || 'fixed'}
                onValueChange={(value) => handleUpdate('headerPosition', value)}
              >
                <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixo</SelectItem>
                  <SelectItem value="sticky">Sticky</SelectItem>
                  <SelectItem value="static">Estático</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Animação ao Scroll</Label>
              <Select
                value={displayConfig.headerAnimation || 'none'}
                onValueChange={(value) => handleUpdate('headerAnimation', value)}
              >
                <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="slide">Slide</SelectItem>
                  <SelectItem value="shrink">Encolher</SelectItem>
                  <SelectItem value="none">Nenhuma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Altura do Header</Label>
              <Input
                value={displayConfig.headerHeight || 'auto'}
                onChange={(e) => handleUpdate('headerHeight', e.target.value)}
                placeholder="auto ou 80px"
                className="h-11"
                style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 🔥 IMAGENS COM FILTROS */}
      <AccordionItem value="image-filters" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
        <AccordionTrigger className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Filtros de Imagem</div>
              <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Brilho, contraste, saturação e mais</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 space-y-4">
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Brilho ({displayConfig.imageBrightness || 100}%)</Label>
            <input
              type="range"
              min="0"
              max="200"
              value={displayConfig.imageBrightness || 100}
              onChange={(e) => handleUpdate('imageBrightness', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Contraste ({displayConfig.imageContrast || 100}%)</Label>
            <input
              type="range"
              min="0"
              max="200"
              value={displayConfig.imageContrast || 100}
              onChange={(e) => handleUpdate('imageContrast', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Saturação ({displayConfig.imageSaturation || 100}%)</Label>
            <input
              type="range"
              min="0"
              max="200"
              value={displayConfig.imageSaturation || 100}
              onChange={(e) => handleUpdate('imageSaturation', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Blur ({displayConfig.imageBlur || 0}px)</Label>
            <input
              type="range"
              min="0"
              max="20"
              value={displayConfig.imageBlur || 0}
              onChange={(e) => handleUpdate('imageBlur', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'var(--muted-border)' }}>
            <h4 className="font-medium mb-3" style={{ color: 'var(--site-text-color)' }}>Overlay Colorido</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Cor do Overlay</Label>
                <Input
                  type="color"
                  value={displayConfig.imageOverlayColor || '#000000'}
                  onChange={(e) => handleUpdate('imageOverlayColor', e.target.value)}
                  className="w-full h-11 p-1 cursor-pointer"
                  style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)' }}
                />
              </div>
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Opacidade ({displayConfig.imageOverlayOpacity || 0}%)</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={displayConfig.imageOverlayOpacity || 0}
                  onChange={(e) => handleUpdate('imageOverlayOpacity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 🔥 ANIMAÇÕES */}
      <AccordionItem value="animations" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
        <AccordionTrigger className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-violet-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Animações</div>
              <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Velocidade, delay, parallax e efeitos</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Velocidade de Transição</Label>
              <Select
                value={displayConfig.transitionSpeed || '300ms'}
                onValueChange={(value) => handleUpdate('transitionSpeed', value)}
              >
                <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150ms">Rápida (150ms)</SelectItem>
                  <SelectItem value="300ms">Normal (300ms)</SelectItem>
                  <SelectItem value="500ms">Lenta (500ms)</SelectItem>
                  <SelectItem value="700ms">Muito Lenta (700ms)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Delay de Animação</Label>
              <Select
                value={displayConfig.animationDelay || '0ms'}
                onValueChange={(value) => handleUpdate('animationDelay', value)}
              >
                <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0ms">Sem Delay</SelectItem>
                  <SelectItem value="100ms">100ms</SelectItem>
                  <SelectItem value="200ms">200ms</SelectItem>
                  <SelectItem value="300ms">300ms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'var(--muted-border)' }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label className="text-base font-medium" style={{ color: 'var(--site-text-color)' }}>Parallax no Hero</Label>
                <p className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Efeito de profundidade ao scrollar</p>
              </div>
              <input
                type="checkbox"
                checked={displayConfig.enableParallax || false}
                onChange={(e) => handleUpdate('enableParallax', e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium" style={{ color: 'var(--site-text-color)' }}>Fade In ao Aparecer</Label>
                <p className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Elementos aparecem suavemente</p>
              </div>
              <input
                type="checkbox"
                checked={displayConfig.enableFadeIn || false}
                onChange={(e) => handleUpdate('enableFadeIn', e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'var(--muted-border)' }}>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Efeito de Hover nos Cards</Label>
            <Select
              value={displayConfig.cardHoverEffect || 'lift'}
              onValueChange={(value) => handleUpdate('cardHoverEffect', value)}
            >
              <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lift">Levitar</SelectItem>
                <SelectItem value="scale">Aumentar</SelectItem>
                <SelectItem value="glow">Brilhar</SelectItem>
                <SelectItem value="none">Nenhum</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 🔥 SEO AVANÇADO */}
      <AccordionItem value="seo-advanced" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
        <AccordionTrigger className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>SEO & Analytics</div>
              <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Meta tags, OG, Analytics</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 space-y-4">
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Open Graph Title</Label>
            <Input
              value={displayConfig.ogTitle || ''}
              onChange={(e) => handleUpdate('ogTitle', e.target.value)}
              placeholder="Título para compartilhamento"
              className="h-11"
              style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
            />
          </div>
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Open Graph Description</Label>
            <Input
              value={displayConfig.ogDescription || ''}
              onChange={(e) => handleUpdate('ogDescription', e.target.value)}
              placeholder="Descrição para compartilhamento"
              className="h-11"
              style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
            />
          </div>
          <div>
            <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Open Graph Image</Label>
            <SimpleImageUpload
              value={displayConfig.ogImage || ''}
              onChange={(url) => handleUpdate('ogImage', url)}
              folder="og-images"
            />
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'var(--muted-border)' }}>
            <h4 className="font-medium mb-3" style={{ color: 'var(--site-text-color)' }}>Analytics & Tracking</h4>
            <div className="space-y-3">
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Google Analytics ID</Label>
                <Input
                  value={displayConfig.googleAnalyticsId || ''}
                  onChange={(e) => handleUpdate('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="h-11"
                  style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                />
              </div>
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Facebook Pixel ID</Label>
                <Input
                  value={displayConfig.facebookPixelId || ''}
                  onChange={(e) => handleUpdate('facebookPixelId', e.target.value)}
                  placeholder="123456789"
                  className="h-11"
                  style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                />
              </div>
              <div>
                <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Twitter Card</Label>
                <Select
                  value={displayConfig.twitterCard || 'summary_large_image'}
                  onValueChange={(value) => handleUpdate('twitterCard', value)}
                >
                  <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};
