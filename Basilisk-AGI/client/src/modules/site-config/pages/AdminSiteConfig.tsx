import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Save, Eye, Loader2, Palette, Type, Image, Mail, Share2, Layout, ExternalLink, Undo, Redo, Plus, Trash2, ChevronUp, ChevronDown, Sparkles, Maximize, MousePointer, Monitor, Search, Sliders } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { UpdateSiteConfigDto } from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import { SimpleImageUpload } from "../components/SimpleImageUpload";
import { ImageUploadWithCrop } from "../components/ImageUploadWithCrop";
import { PageShell } from "@/components/layout/PageShell";
import { useMemento } from "@/hooks/useMemento";
import { suggestHeaderColors } from "@/utils/colorHarmony";
import { useDesignSystem } from "@/hooks/useDesignSystem";
import { GOOGLE_FONTS, FONT_WEIGHTS, FONT_SIZES, LINE_HEIGHTS, LETTER_SPACINGS, loadGoogleFont } from "@/utils/googleFonts";
import { AdvancedCustomization } from "../components/AdvancedCustomization";

const AdminSiteConfig = () => {
  const { config, isLoading, updateConfig, isUpdating } = useSiteConfig();
  const { state: localConfig, setState: setLocalConfig, undo, redo, canUndo, canRedo, reset } = useMemento<UpdateSiteConfigDto>({});
  const { system, systemName, changeSystem, availableSystems } = useDesignSystem();
  const [hasChanges, setHasChanges] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [colorVariation, setColorVariation] = useState<1 | 2 | 3>(1);

  // Sincronizar com config do servidor quando carregar
  useEffect(() => {
    if (config && !hasChanges && Object.keys(localConfig).length === 0) {
      reset(config);
    }
  }, [config]);

  // Atalhos de teclado para Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      } else if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Recalcular cores do sistema quando mudar primária/secundária/tema/variação (se auto estiver ativo)
  useEffect(() => {
    const primaryColor = localConfig.primaryColor || config?.primaryColor;
    const siteTheme = (localConfig.siteTheme || config?.siteTheme || 'light') as 'light' | 'dark';
    const useAuto = localConfig.useAutoHeaderColors !== false;
    
    if (primaryColor && useAuto) {
      setIsRecalculating(true);
      
      // Simular delay para mostrar loading
      const timer = setTimeout(() => {
        const suggested = suggestHeaderColors(primaryColor, siteTheme, colorVariation);
        
        // Atualizar apenas se as cores calculadas forem diferentes das atuais
        const needsUpdate = 
          localConfig.headerBgColor !== suggested.headerBgColor ||
          localConfig.headerTextColor !== suggested.headerTextColor ||
          localConfig.headerBtnColor !== suggested.headerBtnColor ||
          localConfig.headerBtnTextColor !== suggested.headerBtnTextColor;

        if (needsUpdate) {
          setLocalConfig(prev => ({
            ...prev,
            headerBgColor: suggested.headerBgColor,
            headerTextColor: suggested.headerTextColor,
            headerBtnColor: suggested.headerBtnColor,
            headerBtnTextColor: suggested.headerBtnTextColor,
          }));
          setHasChanges(true);
        }
        
        setIsRecalculating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [localConfig.primaryColor, localConfig.secondaryColor, localConfig.siteTheme, localConfig.useAutoHeaderColors, colorVariation]);

  const handleUpdate = (field: string, value: any) => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    if (hasChanges) {
      updateConfig(localConfig);
      setHasChanges(false);
    }
  };

  const displayConfig = { ...config, ...localConfig };

  const actions = (
    <>
      {hasChanges && (
        <div 
          className="flex items-center text-sm px-3 py-1.5"
          style={{
            backgroundColor: systemName === 'minimalism' 
              ? 'rgba(251, 191, 36, 0.1)' 
              : 'rgba(251, 191, 36, 0.2)',
            color: '#fbbf24',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: systemName === 'minimalism' ? '6px' : '8px'
          }}
        >
          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
          Não salvo
        </div>
      )}
      
      {/* Undo/Redo */}
      <div className="flex gap-1.5 border-r pr-3" style={{ borderColor: 'var(--muted-border)' }}>
        <Button
          onClick={undo}
          disabled={!canUndo}
          variant="ghost"
          size="sm"
          className={`transition-all disabled:opacity-30 ${
            systemName === 'minimalism'
              ? 'hover:-translate-y-0.5'
              : 'hover:translate-x-0.5 hover:translate-y-0.5'
          }`}
          style={{
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-style)',
            borderRadius: systemName === 'minimalism' ? '6px' : '8px',
            color: 'var(--site-text-color)',
            backgroundColor: 'var(--muted-bg)'
          }}
          title="Desfazer (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          onClick={redo}
          disabled={!canRedo}
          variant="ghost"
          size="sm"
          className={`transition-all disabled:opacity-30 ${
            systemName === 'minimalism'
              ? 'hover:-translate-y-0.5'
              : 'hover:translate-x-0.5 hover:translate-y-0.5'
          }`}
          style={{
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-style)',
            borderRadius: systemName === 'minimalism' ? '6px' : '8px',
            color: 'var(--site-text-color)',
            backgroundColor: 'var(--muted-bg)'
          }}
          title="Refazer (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      <Button
        onClick={() => window.open('/', '_blank')}
        variant="ghost"
        className={`transition-all ${
          systemName === 'minimalism'
            ? 'hover:-translate-y-0.5'
            : 'hover:translate-x-0.5 hover:translate-y-0.5'
        }`}
        style={{
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-style)',
          borderRadius: systemName === 'minimalism' ? '6px' : '8px',
          color: 'var(--site-text-color)',
          backgroundColor: 'var(--muted-bg)'
        }}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Ver Site
      </Button>
      <Button
        onClick={handleSave}
        disabled={!hasChanges || isUpdating}
        className={`font-semibold transition-all disabled:opacity-50 ${
          systemName === 'minimalism'
            ? 'hover:-translate-y-0.5'
            : 'hover:translate-x-0.5 hover:translate-y-0.5'
        }`}
        style={{
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: '1px solid var(--border-color)',
          boxShadow: systemName === 'minimalism' 
            ? '0 4px 6px rgba(59, 130, 246, 0.3)' 
            : '2px 2px 0px rgba(0, 0, 0, 0.2)',
          borderRadius: systemName === 'minimalism' ? '6px' : '8px'
        }}
      >
        {isUpdating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </>
        )}
      </Button>
    </>
  );

  return (
    <PageShell
      title="Configurações do Site"
      subtitle={`Personalize ${displayConfig?.siteName || 'sua landing page'}`}
      actions={actions}
      loading={isLoading || !config}
      maxWidth="2xl"
    >
      {/* Conteúdo */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Painel Esquerdo - Configurações */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-140px)]">
            <Accordion type="multiple" className="space-y-3">
              {/* Identidade Visual */}
              <AccordionItem value="branding" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                <AccordionTrigger className="px-6 py-4" style={{ '&:hover': { backgroundColor: 'var(--muted-bg)' } }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Image className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Identidade Visual</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Logo, nome e branding</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Nome do Site</Label>
                    <Input
                      value={displayConfig.siteName || ''}
                      onChange={(e) => handleUpdate('siteName', e.target.value)}
                      className="h-11"
                      style={{
                        backgroundColor: 'var(--muted-bg)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--site-text-color)'
                      }}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Logo</Label>
                    <SimpleImageUpload
                      value={displayConfig.logo || ''}
                      onChange={(url) => handleUpdate('logo', url)}
                      folder="logos"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Sistema de Design */}
              <AccordionItem value="design-system" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                <AccordionTrigger className="px-6 py-4" style={{ '&:hover': { backgroundColor: 'var(--muted-bg)' } }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Sistema de Design</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Escolha o estilo visual do site</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium mb-3 block" style={{ color: 'var(--site-text-color)' }}>Estilo Visual</Label>
                    <p className="text-sm mb-4" style={{ color: 'var(--site-text-color)', opacity: 0.7 }}>Escolha entre diferentes sistemas de design para personalizar completamente a aparência do seu site.</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {availableSystems.map((designSystem) => (
                        <button
                          key={designSystem.id}
                          onClick={() => {
                            changeSystem(designSystem.id);
                            handleUpdate('designSystem', designSystem.id);
                          }}
                          className="p-4 rounded-lg border-2 transition-all text-left"
                          style={{
                            borderColor: systemName === designSystem.id ? '#ec4899' : 'var(--border-color)',
                            backgroundColor: systemName === designSystem.id ? 'rgba(236, 72, 153, 0.1)' : 'var(--muted-bg)'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            {/* Preview dinâmico do sistema */}
                            <div className="flex flex-col gap-2">
                              {(systemName === designSystem.id && designSystem.id === 'neobrutalism') || (systemName !== 'minimalism' && designSystem.id === 'neobrutalism') ? (
                                // Preview Neobrutalism - Ativo
                                <div className="w-16 h-12 bg-yellow-400 border-2 border-black rounded-lg relative" style={{ boxShadow: '3px 3px 0px #000000' }}>
                                  <div className="absolute top-1 left-1 w-3 h-1.5 bg-black rounded-sm"></div>
                                  <div className="absolute bottom-1 right-1 w-4 h-1.5 bg-black rounded-sm"></div>
                                </div>
                              ) : designSystem.id === 'neobrutalism' ? (
                                // Preview Neobrutalism - Inativo
                                <div className="w-16 h-12 bg-gray-300 border border-gray-400 rounded-lg relative opacity-50">
                                  <div className="absolute top-1 left-1 w-3 h-1.5 bg-gray-600 rounded-sm"></div>
                                  <div className="absolute bottom-1 right-1 w-4 h-1.5 bg-gray-600 rounded-sm"></div>
                                </div>
                              ) : (systemName === designSystem.id && designSystem.id === 'minimalism') || (systemName === 'minimalism' && designSystem.id === 'minimalism') ? (
                                // Preview Minimalism - Ativo
                                <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 rounded-lg relative" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                  <div className="absolute top-1 left-1 w-3 h-1.5 bg-blue-500 rounded-full"></div>
                                  <div className="absolute bottom-1 right-1 w-4 h-1.5 bg-purple-500 rounded-full"></div>
                                </div>
                              ) : (
                                // Preview Minimalism - Inativo
                                <div className="w-16 h-12 bg-gray-100 border border-gray-300 rounded-lg relative opacity-50">
                                  <div className="absolute top-1 left-1 w-3 h-1.5 bg-gray-400 rounded-full"></div>
                                  <div className="absolute bottom-1 right-1 w-4 h-1.5 bg-gray-400 rounded-full"></div>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium" style={{ color: 'var(--site-text-color)' }}>{designSystem.name}</div>
                              <div className="text-xs" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>{designSystem.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--muted-bg)', borderRadius: 'var(--panel-radius)' }}>
                      <h4 className="font-medium mb-2" style={{ color: 'var(--site-text-color)' }}>✨ Sistema Ativo: {system.name}</h4>
                      <p className="text-sm mb-3" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>{system.description}</p>
                      <div className="text-xs" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>
                        As mudanças são aplicadas instantaneamente em todo o site. Você pode alternar entre os estilos a qualquer momento.
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Cores */}
              <AccordionItem value="colors" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                <AccordionTrigger className="px-6 py-4" style={{ '&:hover': { backgroundColor: 'var(--muted-bg)' } }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Cores do Site</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Paleta completa e harmonia de cores</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-6">
                  {/* Cores Base */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Cor Principal</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={displayConfig.primaryColor || '#FF6B6B'}
                          onChange={(e) => handleUpdate('primaryColor', e.target.value)}
                          className="w-16 h-11 p-1 cursor-pointer"
                          style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)' }}
                        />
                        <Input
                          type="text"
                          value={displayConfig.primaryColor || ''}
                          onChange={(e) => handleUpdate('primaryColor', e.target.value)}
                          placeholder="#FF6B6B"
                          className="h-11"
                          style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Cor Secundária</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={displayConfig.secondaryColor || '#4ECDC4'}
                          onChange={(e) => handleUpdate('secondaryColor', e.target.value)}
                          className="w-16 h-11 p-1 cursor-pointer"
                          style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)' }}
                        />
                        <Input
                          type="text"
                          value={displayConfig.secondaryColor || ''}
                          onChange={(e) => handleUpdate('secondaryColor', e.target.value)}
                          placeholder="#4ECDC4"
                          className="h-11"
                          style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                        />
                      </div>
                    </div>
                  </div>


                  {/* Tema do Site */}
                  <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--muted-border)' }}>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2" style={{ color: 'var(--site-text-color)' }}>Tema do Site</h4>
                      <p className="text-sm mb-3" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Escolha entre tema claro ou escuro</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleUpdate('siteTheme', 'light')}
                          className="p-4 rounded-lg border-2 transition-all"
                          style={{
                            borderColor: (displayConfig.siteTheme || 'light') === 'light' ? '#3b82f6' : 'var(--border-color)',
                            backgroundColor: (displayConfig.siteTheme || 'light') === 'light' ? 'rgba(59, 130, 246, 0.1)' : 'var(--muted-bg)'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-gray-100 border border-gray-300" />
                            <div className="text-left">
                              <div className="font-medium" style={{ color: 'var(--site-text-color)' }}>Tema Claro</div>
                              <div className="text-xs" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>#f7f7f8</div>
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handleUpdate('siteTheme', 'dark')}
                          className="p-4 rounded-lg border-2 transition-all"
                          style={{
                            borderColor: displayConfig.siteTheme === 'dark' ? '#3b82f6' : 'var(--border-color)',
                            backgroundColor: displayConfig.siteTheme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'var(--muted-bg)'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700" />
                            <div className="text-left">
                              <div className="font-medium" style={{ color: 'var(--site-text-color)' }}>Tema Escuro</div>
                              <div className="text-xs" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>#1e293b</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cores do Sistema */}
                  <div className="border-t pt-4" style={{ borderColor: 'var(--muted-border)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={displayConfig.useAutoHeaderColors !== false}
                          onCheckedChange={(checked) => handleUpdate('useAutoHeaderColors', checked)}
                          className="data-[state=checked]:bg-blue-500"
                        />
                        <div>
                          <div className="font-medium" style={{ color: 'var(--site-text-color)' }}>Calcular automaticamente</div>
                          <p className="text-xs" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Cores harmoniosas baseadas na primária</p>
                        </div>
                      </div>
                      
                      {/* Botões de Variação */}
                      {displayConfig.useAutoHeaderColors !== false && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs mr-1" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Variação:</span>
                          <button
                            onClick={() => setColorVariation(1)}
                            className="w-8 h-8 rounded-lg font-semibold text-sm transition-all"
                            style={{
                              backgroundColor: colorVariation === 1 ? '#3b82f6' : 'var(--muted-bg)',
                              color: colorVariation === 1 ? '#ffffff' : 'var(--site-text-color)',
                              boxShadow: colorVariation === 1 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                            }}
                            title="Clássico Conservador"
                          >
                            1
                          </button>
                          <button
                            onClick={() => setColorVariation(2)}
                            className="w-8 h-8 rounded-lg font-semibold text-sm transition-all"
                            style={{
                              backgroundColor: colorVariation === 2 ? '#3b82f6' : 'var(--muted-bg)',
                              color: colorVariation === 2 ? '#ffffff' : 'var(--site-text-color)',
                              boxShadow: colorVariation === 2 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                            }}
                            title="Moderno Equilibrado"
                          >
                            2
                          </button>
                          <button
                            onClick={() => setColorVariation(3)}
                            className="w-8 h-8 rounded-lg font-semibold text-sm transition-all"
                            style={{
                              backgroundColor: colorVariation === 3 ? '#3b82f6' : 'var(--muted-bg)',
                              color: colorVariation === 3 ? '#ffffff' : 'var(--site-text-color)',
                              boxShadow: colorVariation === 3 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                            }}
                            title="Vibrante Ousado"
                          >
                            3
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Descrição da Variação Selecionada */}
                    {displayConfig.useAutoHeaderColors !== false && (
                      <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--muted-bg)' }}>
                        <p className="text-xs" style={{ color: 'var(--site-text-color)', opacity: 0.8 }}>
                          {colorVariation === 1 && '🎩 Clássico Conservador: Header muito escuro + texto branco puro. Ideal para sites corporativos e profissionais.'}
                          {colorVariation === 2 && '✨ Moderno Equilibrado: Header escuro médio + texto suave. Perfeito para sites modernos e tech.'}
                          {colorVariation === 3 && '🚀 Vibrante Ousado: Header colorido saturado + alto contraste. Ótimo para sites criativos e jovens.'}
                        </p>
                      </div>
                    )}

                    {/* Loading State */}
                    {isRecalculating && displayConfig.useAutoHeaderColors !== false && (
                      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span className="text-sm text-blue-300">Recalculando cores...</span>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Cor do Header</Label>
                        <Input
                          type="color"
                          value={displayConfig.headerBgColor || '#1e293b'}
                          onChange={(e) => handleUpdate('headerBgColor', e.target.value)}
                          disabled={displayConfig.useAutoHeaderColors !== false}
                          className="w-full h-10 p-1 cursor-pointer disabled:opacity-50"
                          style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)' }}
                        />
                      </div>

                      <div>
                        <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Cor do Texto</Label>
                        <Input
                          type="color"
                          value={displayConfig.headerTextColor || '#ffffff'}
                          onChange={(e) => handleUpdate('headerTextColor', e.target.value)}
                          disabled={displayConfig.useAutoHeaderColors !== false}
                          className="w-full h-10 p-1 cursor-pointer disabled:opacity-50"
                          style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)' }}
                        />
                      </div>

                      <div>
                        <Label className="text-sm mb-2 block" style={{ color: 'var(--site-text-color)' }}>Cor do Botão</Label>
                        <Input
                          type="color"
                          value={displayConfig.headerBtnColor || displayConfig.primaryColor || '#3b82f6'}
                          onChange={(e) => handleUpdate('headerBtnColor', e.target.value)}
                          disabled={displayConfig.useAutoHeaderColors !== false}
                          className="w-full h-10 p-1 cursor-pointer disabled:opacity-50"
                          style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                    </div>

                    {/* Botão Salvar no Final */}
                    <div className="border-t pt-4 mt-6" style={{ borderColor: 'var(--muted-border)' }}>
                      <Button
                        onClick={handleSave}
                        disabled={!hasChanges || isUpdating}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Salvando Configurações...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Salvar Todas as Cores
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 🔥 SEÇÕES DE CUSTOMIZAÇÃO AVANÇADA */}
              <AdvancedCustomization displayConfig={displayConfig} handleUpdate={handleUpdate} />

              {/* Botão Extra no Header */}
              <AccordionItem value="extra-button" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center gap-3 w-full justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Botão Extra no Header</div>
                        <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Adicione um botão customizado</div>
                      </div>
                    </div>
                    <Switch
                      checked={displayConfig.extraBtnEnabled || false}
                      onCheckedChange={(checked) => handleUpdate('extraBtnEnabled', checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  {displayConfig.extraBtnEnabled && (
                    <>
                      <div>
                        <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Texto do Botão</Label>
                        <Input
                          value={displayConfig.extraBtnLabel || ''}
                          onChange={(e) => handleUpdate('extraBtnLabel', e.target.value)}
                          placeholder="Ex: Agendar Consulta"
                          className="h-11"
                          style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                        />
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Link</Label>
                        <Input
                          value={displayConfig.extraBtnLink || ''}
                          onChange={(e) => handleUpdate('extraBtnLink', e.target.value)}
                          placeholder="https://..."
                          className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                        />
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Tipo de Link</Label>
                        <Select
                          value={displayConfig.extraBtnType || 'external'}
                          onValueChange={(val) => handleUpdate('extraBtnType', val)}
                        >
                          <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="external">Link Externo</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="section">Rolar para Seção</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Hero Section */}
              <AccordionItem value="hero" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center gap-3 w-full justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Type className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Hero Section</div>
                        <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Primeira seção do site</div>
                      </div>
                    </div>
                    <Switch
                      checked={displayConfig.heroEnabled !== false}
                      onCheckedChange={(checked) => handleUpdate('heroEnabled', checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Título</Label>
                    <Input
                      value={displayConfig.heroTitle || ''}
                      onChange={(e) => handleUpdate('heroTitle', e.target.value)}
                      placeholder="Bem-vindo ao nosso site"
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Subtítulo</Label>
                    <Input
                      value={displayConfig.heroSubtitle || ''}
                      onChange={(e) => handleUpdate('heroSubtitle', e.target.value)}
                      placeholder="Descrição do seu negócio"
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Texto do Botão</Label>
                    <Input
                      value={displayConfig.heroCtaText || ''}
                      onChange={(e) => handleUpdate('heroCtaText', e.target.value)}
                      placeholder="Entre em Contato"
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Ação do Botão</Label>
                    <Select
                      value={displayConfig.heroCtaAction || 'whatsapp'}
                      onValueChange={(value) => handleUpdate('heroCtaAction', value)}
                    >
                      <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                        <SelectValue placeholder="Selecione uma ação" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="whatsapp" className="text-slate-100 hover:bg-slate-700">
                          💬 Abrir WhatsApp
                        </SelectItem>
                        <SelectItem value="instagram" className="text-slate-100 hover:bg-slate-700">
                          📸 Abrir Instagram
                        </SelectItem>
                        <SelectItem value="section" className="text-slate-100 hover:bg-slate-700">
                          📍 Ir para uma seção
                        </SelectItem>
                        <SelectItem value="external" className="text-slate-100 hover:bg-slate-700">
                          🔗 Link externo
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Campos condicionais */}
                    {displayConfig.heroCtaAction === 'section' && (
                      <Select
                        value={displayConfig.heroCtaLink || 'sobre'}
                        onValueChange={(value) => handleUpdate('heroCtaLink', value)}
                      >
                        <SelectTrigger className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}>
                          <SelectValue placeholder="Escolha a seção" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="sobre" className="text-slate-100 hover:bg-slate-700">Sobre</SelectItem>
                          <SelectItem value="equipe" className="text-slate-100 hover:bg-slate-700">Equipe</SelectItem>
                          <SelectItem value="blog" className="text-slate-100 hover:bg-slate-700">Blog</SelectItem>
                          <SelectItem value="depoimentos" className="text-slate-100 hover:bg-slate-700">Depoimentos</SelectItem>
                          <SelectItem value="contato" className="text-slate-100 hover:bg-slate-700">Contato</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    {displayConfig.heroCtaAction === 'external' && (
                      <Input
                        value={displayConfig.heroCtaLink || ''}
                        onChange={(e) => handleUpdate('heroCtaLink', e.target.value)}
                        placeholder="https://seusite.com"
                        className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                      />
                    )}

                    {(displayConfig.heroCtaAction === 'whatsapp' || displayConfig.heroCtaAction === 'instagram') && (
                      <p className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>
                        {displayConfig.heroCtaAction === 'whatsapp' 
                          ? `📱 Usando: ${displayConfig.whatsapp || 'Configure o WhatsApp em Contato'}`
                          : `📸 Usando: ${displayConfig.instagram || 'Configure o Instagram em Redes Sociais'}`
                        }
                      </p>
                    )}
                  </div>

                  {/* Layout do Hero */}
                  <div className="border-t border-slate-700 pt-4 mt-6">
                    <Label className="text-slate-200 text-base font-medium mb-3 block">Layout do Hero</Label>
                    <p className="text-sm text-slate-400 mb-4">Escolha o estilo visual da seção Hero</p>
                    
                    <div className="grid grid-cols-5 gap-2 mb-6">
                      {[
                        { id: 'split-center', emoji: '⚖️', name: 'Split Center', desc: '50/50 clássico' },
                        { id: 'full-width', emoji: '🖼️', name: 'Full Width', desc: 'Imagem grande' },
                        { id: 'overlap', emoji: '🔄', name: 'Overlap', desc: 'Sobreposição' },
                        { id: 'zigzag', emoji: '⚡', name: 'Zigzag', desc: 'Alternado' },
                        { id: 'cards-grid', emoji: '🎴', name: 'Cards Grid', desc: 'Grid de cards' },
                        { id: 'minimal', emoji: '✨', name: 'Minimal', desc: 'Minimalista' },
                        { id: 'magazine', emoji: '📰', name: 'Magazine', desc: 'Estilo revista' },
                        { id: 'asymmetric', emoji: '🎭', name: 'Asymmetric', desc: 'Assimétrico' },
                        { id: 'split-diagonal', emoji: '📐', name: 'Diagonal', desc: 'Divisão diagonal' },
                        { id: 'floating', emoji: '🎈', name: 'Floating', desc: 'Elementos flutuantes' }
                      ].map((layout) => (
                        <button
                          key={layout.id}
                          onClick={() => handleUpdate('heroLayout', layout.id)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            (displayConfig.heroLayout || 'split-center') === layout.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-xl mb-1">{layout.emoji}</div>
                            <div className="text-slate-100 font-medium text-xs">{layout.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{layout.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Carrossel de Slides */}
                  <div className="border-t border-slate-700 pt-4 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Label className="text-slate-200 text-base font-medium">Slides do Carrossel</Label>
                        <p className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Configure até 5 slides rotativos</p>
                      </div>
                      <Button
                        onClick={() => {
                          const currentSlides = displayConfig.heroSlides || [];
                          if (currentSlides.length < 5) {
                            handleUpdate('heroSlides', [
                              ...currentSlides,
                              { title: '', subtitle: '', cta: displayConfig.heroCtaText || 'Entre em Contato' }
                            ]);
                          }
                        }}
                        disabled={(displayConfig.heroSlides || []).length >= 5}
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Adicionar Slide
                      </Button>
                    </div>

                    {/* Lista de Slides */}
                    <div className="space-y-3">
                      {(displayConfig.heroSlides || []).map((slide: any, index: number) => (
                        <Card key={index} className="bg-slate-700/30 border-slate-600 p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-semibold">Slide {index + 1}</span>
                              {index === 0 && (
                                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">Principal</span>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {/* Mover para cima */}
                              {index > 0 && (
                                <button
                                  onClick={() => {
                                    const newSlides = [...(displayConfig.heroSlides || [])];
                                    [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
                                    handleUpdate('heroSlides', newSlides);
                                  }}
                                  className="p-1 hover:bg-slate-600 rounded"
                                  title="Mover para cima"
                                >
                                  <ChevronUp className="w-4 h-4 text-slate-400" />
                                </button>
                              )}
                              {/* Mover para baixo */}
                              {index < (displayConfig.heroSlides || []).length - 1 && (
                                <button
                                  onClick={() => {
                                    const newSlides = [...(displayConfig.heroSlides || [])];
                                    [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
                                    handleUpdate('heroSlides', newSlides);
                                  }}
                                  className="p-1 hover:bg-slate-600 rounded"
                                  title="Mover para baixo"
                                >
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                </button>
                              )}
                              {/* Remover */}
                              <button
                                onClick={() => {
                                  const newSlides = (displayConfig.heroSlides || []).filter((_: any, i: number) => i !== index);
                                  handleUpdate('heroSlides', newSlides);
                                }}
                                className="p-1 hover:bg-red-500/20 rounded"
                                title="Remover slide"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label className="text-slate-300 text-sm mb-1 block">Título</Label>
                              <Input
                                value={slide.title || ''}
                                onChange={(e) => {
                                  const newSlides = [...(displayConfig.heroSlides || [])];
                                  newSlides[index] = { ...slide, title: e.target.value };
                                  handleUpdate('heroSlides', newSlides);
                                }}
                                placeholder="Ex: Resultados Comprovados"
                                className="bg-slate-700/50 border-slate-600 text-slate-100 h-10"
                              />
                            </div>
                            <div>
                              <Label className="text-slate-300 text-sm mb-1 block">Subtítulo</Label>
                              <Input
                                value={slide.subtitle || ''}
                                onChange={(e) => {
                                  const newSlides = [...(displayConfig.heroSlides || [])];
                                  newSlides[index] = { ...slide, subtitle: e.target.value };
                                  handleUpdate('heroSlides', newSlides);
                                }}
                                placeholder="Ex: Mais de 1000 clientes satisfeitos"
                                className="bg-slate-700/50 border-slate-600 text-slate-100 h-10"
                              />
                            </div>
                            
                            {/* Upload de Imagem do Slide */}
                            <div>
                              <Label className="text-slate-300 text-sm mb-1 block">Imagem do Slide (16:9)</Label>
                              <ImageUploadWithCrop
                                imageId={slide.imageId}
                                onImageSelect={(imageId, url) => {
                                  const newSlides = [...(displayConfig.heroSlides || [])];
                                  newSlides[index] = { ...slide, imageId, imageUrl: url };
                                  handleUpdate('heroSlides', newSlides);
                                }}
                                aspectRatio={16/9}
                                recommendedSize="1920x1080"
                                folder={`basilisk/hero/slide-${index + 1}`}
                              />
                            </div>
                          </div>
                        </Card>
                      ))}

                      {/* Mensagem quando não há slides */}
                      {(!displayConfig.heroSlides || displayConfig.heroSlides.length === 0) && (
                        <div className="text-center py-8 bg-slate-700/20 rounded-lg border-2 border-dashed border-slate-600">
                          <p className="text-slate-400 mb-2">Nenhum slide customizado</p>
                          <p className="text-xs text-slate-500">Usando slides padrão. Adicione slides personalizados acima.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Imagem Hero */}
                  <div className="border-t border-slate-700 pt-4 mt-6">
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Imagem Hero</Label>
                    <SimpleImageUpload
                      value={displayConfig.heroImage || ''}
                      onChange={(url) => handleUpdate('heroImage', url)}
                      folder="hero"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Contato */}
              <AccordionItem value="contact" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Contato</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Informações de contato</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>E-mail</Label>
                    <Input
                      type="email"
                      value={displayConfig.email || ''}
                      onChange={(e) => handleUpdate('email', e.target.value)}
                      placeholder="contato@seusite.com"
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Telefone</Label>
                    <Input
                      value={displayConfig.phone || ''}
                      onChange={(e) => handleUpdate('phone', e.target.value)}
                      placeholder="(00) 0000-0000"
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>WhatsApp</Label>
                    <Input
                      value={displayConfig.whatsapp || ''}
                      onChange={(e) => handleUpdate('whatsapp', e.target.value)}
                      placeholder="5500000000000"
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                    <p className="text-sm mt-2" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>📱 Formato: código + DDD + número</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Redes Sociais */}
              <AccordionItem value="social" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Redes Sociais</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Links das redes sociais</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Instagram</Label>
                    <Input
                      value={displayConfig.instagram || ''}
                      onChange={(e) => handleUpdate('instagram', e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>Facebook</Label>
                    <Input
                      value={displayConfig.facebook || ''}
                      onChange={(e) => handleUpdate('facebook', e.target.value)}
                      placeholder="https://facebook.com/..."
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block" style={{ color: 'var(--site-text-color)' }}>LinkedIn</Label>
                    <Input
                      value={displayConfig.linkedin || ''}
                      onChange={(e) => handleUpdate('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/..."
                      className="h-11" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)', color: 'var(--site-text-color)' }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Seções Ativas */}
              <AccordionItem value="sections" className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Layout className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Gerenciar Seções</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Ative/desative seções do site</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted-bg)' }}>
                    <div>
                      <div className="font-medium" style={{ color: 'var(--site-text-color)' }}>Seção Sobre</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Informações sobre a empresa</div>
                    </div>
                    <Switch
                      checked={displayConfig.aboutEnabled !== false}
                      onCheckedChange={(checked) => handleUpdate('aboutEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted-bg)' }}>
                    <div>
                      <div className="font-medium" style={{ color: 'var(--site-text-color)' }}>Equipe</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Mostrar membros da equipe</div>
                    </div>
                    <Switch
                      checked={displayConfig.teamEnabled !== false}
                      onCheckedChange={(checked) => handleUpdate('teamEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted-bg)' }}>
                    <div>
                      <div className="font-medium" style={{ color: 'var(--site-text-color)' }}>Blog</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Exibir artigos do blog</div>
                    </div>
                    <Switch
                      checked={displayConfig.blogEnabled !== false}
                      onCheckedChange={(checked) => handleUpdate('blogEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted-bg)' }}>
                    <div>
                      <div className="font-medium" style={{ color: 'var(--site-text-color)' }}>Depoimentos</div>
                      <div className="text-sm" style={{ color: 'var(--site-text-color)', opacity: 0.6 }}>Mostrar depoimentos de clientes</div>
                    </div>
                    <Switch
                      checked={displayConfig.testimonialsEnabled !== false}
                      onCheckedChange={(checked) => handleUpdate('testimonialsEnabled', checked)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Painel Direito - Preview */}
          <div className="sticky top-24 h-[calc(100vh-140px)]">
            <Card className="h-full overflow-hidden" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
              <div className="h-full flex flex-col">
                <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'var(--border-color)' }}>
                  <Eye className="w-5 h-5 text-blue-400" />
                  <h2 className="font-semibold" style={{ color: 'var(--site-text-color)' }}>Preview ao Vivo</h2>
                </div>
                <div 
                  className="flex-1 overflow-y-auto transition-colors duration-300"
                  style={{ 
                    backgroundColor: (displayConfig.siteTheme || 'light') === 'light' ? '#f7f7f8' : '#1e293b'
                  }}
                >
                  {/* Preview do Header - Dinâmico */}
                  <div 
                    className="p-4 transition-all duration-300"
                    style={
                      systemName === 'minimalism'
                        ? {
                            background: `linear-gradient(135deg, ${displayConfig.primaryColor || '#3b82f6'}15 0%, ${displayConfig.secondaryColor || '#8b5cf6'}15 100%)`,
                            backdropFilter: 'blur(20px)',
                            borderBottom: `1px solid ${(displayConfig.siteTheme || 'light') === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}`,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                          }
                        : {
                            backgroundColor: displayConfig.headerBgColor || '#FFE951',
                            borderBottom: '8px solid #000000',
                            boxShadow: '0px 8px 0px #000000'
                          }
                    }
                  >
                    <div className="flex items-center justify-between">
                      {/* Logo */}
                      <div className="flex items-center gap-3">
                        {displayConfig.logo ? (
                          <img 
                            src={displayConfig.logo} 
                            alt="Logo" 
                            className="h-10 w-auto object-contain"
                            style={
                              systemName === 'minimalism'
                                ? {}
                                : { filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.3))' }
                            }
                          />
                        ) : (
                          <div 
                            className="text-sm font-bold px-3 py-1.5 transition-colors duration-300"
                            style={
                              systemName === 'minimalism'
                                ? {
                                    background: `linear-gradient(135deg, ${displayConfig.primaryColor || '#3b82f6'} 0%, ${displayConfig.secondaryColor || '#8b5cf6'} 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                  }
                                : {
                                    color: displayConfig.headerTextColor || '#000000',
                                    backgroundColor: displayConfig.secondaryColor || '#FFFFFF',
                                    border: '4px solid #000000',
                                    boxShadow: '3px 3px 0px #000000'
                                  }
                            }
                          >
                            {displayConfig.siteName || 'Seu Site'}
                          </div>
                        )}
                      </div>

                      {/* Menu de Navegação */}
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs font-semibold px-3 py-1.5 transition-all"
                          style={
                            systemName === 'minimalism'
                              ? {
                                  background: `linear-gradient(135deg, ${displayConfig.primaryColor || '#3b82f6'} 0%, ${displayConfig.secondaryColor || '#8b5cf6'} 100%)`,
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  border: `0.5px solid ${displayConfig.primaryColor || '#3b82f6'}`,
                                  borderRadius: '6px'
                                }
                              : {
                                  color: displayConfig.headerTextColor || '#000000',
                                  border: '2px solid #000000',
                                  boxShadow: '2px 2px 0px #000000'
                                }
                          }
                        >
                          Início
                        </span>
                        
                        {/* Botão CTA */}
                        <button 
                          className="px-3 py-1.5 text-xs font-semibold transition-all duration-300"
                          style={
                            systemName === 'minimalism'
                              ? {
                                  background: `linear-gradient(135deg, ${displayConfig.primaryColor || '#3b82f6'} 0%, ${displayConfig.secondaryColor || '#8b5cf6'} 100%)`,
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  border: `0.5px solid ${displayConfig.primaryColor || '#3b82f6'}`,
                                  borderRadius: '6px'
                                }
                              : {
                                  backgroundColor: displayConfig.headerBtnColor || displayConfig.primaryColor || '#FF6B6B',
                                  color: displayConfig.headerBtnTextColor || '#000000',
                                  border: '4px solid #000000',
                                  boxShadow: '4px 4px 0px #000000'
                                }
                          }
                        >
                          Contato
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preview de Cores */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-4 transition-colors duration-300"
                        style={
                          systemName === 'minimalism'
                            ? {
                                background: `linear-gradient(135deg, ${displayConfig.primaryColor || '#3b82f6'} 0%, ${displayConfig.secondaryColor || '#8b5cf6'} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                              }
                            : {
                                color: (displayConfig.siteTheme || 'light') === 'light' ? '#111827' : '#f3f4f6'
                              }
                        }
                      >
                        Paleta de Cores
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {/* Cor Principal */}
                        <div className="space-y-2">
                          <div 
                            className="h-24 transition-all duration-300"
                            style={
                              systemName === 'minimalism'
                                ? {
                                    backgroundColor: displayConfig.primaryColor || '#3b82f6',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                                  }
                                : {
                                    backgroundColor: displayConfig.primaryColor || '#FF6B6B',
                                    border: '6px solid #000000',
                                    boxShadow: '6px 6px 0px #000000'
                                  }
                            }
                          />
                          <div className="text-center">
                            <div 
                              className="text-sm font-semibold transition-colors duration-300"
                              style={{ 
                                color: (displayConfig.siteTheme || 'light') === 'light' ? '#000000' : '#FFFFFF'
                              }}
                            >
                              Cor Principal
                            </div>
                            <div 
                              className="text-xs font-mono transition-colors duration-300"
                              style={{ 
                                color: (displayConfig.siteTheme || 'light') === 'light' ? '#000000' : '#FFFFFF',
                                opacity: 0.7
                              }}
                            >
                              {displayConfig.primaryColor || '#FF6B6B'}
                            </div>
                          </div>
                        </div>

                        {/* Cor Secundária */}
                        <div className="space-y-2">
                          <div 
                            className="h-24 transition-all duration-300"
                            style={
                              systemName === 'minimalism'
                                ? {
                                    backgroundColor: displayConfig.secondaryColor || '#8b5cf6',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                                  }
                                : {
                                    backgroundColor: displayConfig.secondaryColor || '#4ECDC4',
                                    border: '6px solid #000000',
                                    boxShadow: '6px 6px 0px #000000'
                                  }
                            }
                          />
                          <div className="text-center">
                            <div 
                              className="text-sm font-semibold transition-colors duration-300"
                              style={{ 
                                color: (displayConfig.siteTheme || 'light') === 'light' ? '#000000' : '#FFFFFF'
                              }}
                            >
                              Cor Secundária
                            </div>
                            <div 
                              className="text-xs font-mono transition-colors duration-300"
                              style={{ 
                                color: (displayConfig.siteTheme || 'light') === 'light' ? '#000000' : '#FFFFFF',
                                opacity: 0.7
                              }}
                            >
                              {displayConfig.secondaryColor || '#4ECDC4'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo de Botões */}
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-4 transition-colors duration-300"
                        style={
                          systemName === 'minimalism'
                            ? {
                                background: `linear-gradient(135deg, ${displayConfig.primaryColor || '#3b82f6'} 0%, ${displayConfig.secondaryColor || '#8b5cf6'} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                              }
                            : {
                                color: (displayConfig.siteTheme || 'light') === 'light' ? '#000000' : '#FFFFFF'
                              }
                        }
                      >
                        Exemplos de Botões
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <button 
                          className="px-6 py-3 font-semibold transition-all duration-300"
                          style={
                            systemName === 'minimalism'
                              ? {
                                  background: `linear-gradient(135deg, ${displayConfig.primaryColor || '#3b82f6'} 0%, ${displayConfig.secondaryColor || '#8b5cf6'} 100%)`,
                                  color: '#ffffff',
                                  borderRadius: '6px',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }
                              : {
                                  backgroundColor: displayConfig.primaryColor || '#FF6B6B',
                                  color: '#000000',
                                  border: '4px solid #000000',
                                  boxShadow: '6px 6px 0px #000000'
                                }
                          }
                        >
                          Botão Principal
                        </button>
                        <button 
                          className="px-6 py-3 font-semibold transition-all duration-300"
                          style={
                            systemName === 'minimalism'
                              ? {
                                  background: `linear-gradient(135deg, ${displayConfig.secondaryColor || '#8b5cf6'} 0%, ${displayConfig.primaryColor || '#3b82f6'} 100%)`,
                                  color: '#ffffff',
                                  borderRadius: '6px',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }
                              : {
                                  backgroundColor: displayConfig.secondaryColor || '#4ECDC4',
                                  color: '#000000',
                                  border: '4px solid #000000',
                                  boxShadow: '6px 6px 0px #000000'
                                }
                          }
                        >
                          Botão Secundário
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminSiteConfig;
