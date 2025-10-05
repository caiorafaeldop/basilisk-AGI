import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { SimpleImageUpload } from "./SimpleImageUpload";
import { ArrowRight, ArrowLeft, Check, Rocket } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const STEPS = [
  { id: 1, title: "Identidade Visual", description: "Logo, cores e branding" },
  { id: 2, title: "Informações de Contato", description: "Como as pessoas podem te encontrar" },
  { id: 3, title: "Conteúdo Principal", description: "Primeira impressão do seu site" },
  { id: 4, title: "Finalizar", description: "Tudo pronto para começar!" },
];

export const FirstSetupWizard = ({ onComplete }: { onComplete: () => void }) => {
  const { updateConfig, isUpdating } = useSiteConfig();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    siteName: "",
    logo: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    phone: "",
    email: "",
    whatsapp: "",
    heroTitle: "",
    heroSubtitle: "",
    heroCtaText: "Entre em Contato",
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    updateConfig(formData);
    onComplete();
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.siteName.trim() !== "";
      case 2:
        return formData.email.trim() !== "" || formData.phone.trim() !== "";
      case 3:
        return formData.heroTitle.trim() !== "";
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl bg-slate-800/90 backdrop-blur-sm border-slate-700">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex flex-col items-center justify-center gap-4 mb-2">
            <img 
              src="/basilisk.png" 
              alt="Basilisk Logo" 
              className="w-28 h-28 object-contain drop-shadow-2xl"
            />
            <div className="relative">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent py-2 px-6 rounded-lg border-2 border-blue-400/30 shadow-lg shadow-blue-500/20">
                Primeiros Passos
              </h1>
            </div>
          </div>
          <CardTitle className="text-xl text-slate-100 font-semibold">
            {STEPS[currentStep - 1].title}
          </CardTitle>
          <CardDescription className="text-slate-300 text-base">
            {STEPS[currentStep - 1].description}
          </CardDescription>
          <div className="pt-4">
            <Progress value={progress} className="h-2.5 bg-slate-700" />
            <p className="text-sm text-slate-400 mt-3 font-medium">
              Passo {currentStep} de {STEPS.length}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Identidade Visual */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Label htmlFor="siteName" className="text-slate-200 text-base font-medium mb-2 block">
                  Nome do seu Site/Negócio <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="siteName"
                  value={formData.siteName}
                  onChange={(e) => updateField('siteName', e.target.value)}
                  placeholder="Ex: Minha Empresa"
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                />
              </div>

              <div>
                <Label className="text-slate-200 text-base font-medium mb-2 block">
                  Logo (opcional)
                </Label>
                <SimpleImageUpload
                  value={formData.logo}
                  onChange={(url) => updateField('logo', url)}
                />
                <p className="text-sm text-slate-400 mt-2">
                  📸 Recomendado: PNG com fundo transparente
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor" className="text-slate-200 text-base font-medium mb-2 block">
                    Cor Principal
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateField('primaryColor', e.target.value)}
                      className="w-16 h-11 p-1 bg-slate-700 border-slate-600 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => updateField('primaryColor', e.target.value)}
                      placeholder="#3B82F6"
                      className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor" className="text-slate-200 text-base font-medium mb-2 block">
                    Cor Secundária
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField('secondaryColor', e.target.value)}
                      className="w-16 h-11 p-1 bg-slate-700 border-slate-600 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField('secondaryColor', e.target.value)}
                      placeholder="#1E40AF"
                      className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 h-11"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contato */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Label htmlFor="email" className="text-slate-200 text-base font-medium mb-2 block">
                  E-mail <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="contato@seusite.com"
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-slate-200 text-base font-medium mb-2 block">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="(00) 0000-0000"
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                />
              </div>

              <div>
                <Label htmlFor="whatsapp" className="text-slate-200 text-base font-medium mb-2 block">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => updateField('whatsapp', e.target.value)}
                  placeholder="5500000000000"
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                />
                <p className="text-sm text-slate-400 mt-2">
                  📱 Formato: código do país + DDD + número (sem espaços)
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Conteúdo Principal */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Label htmlFor="heroTitle" className="text-slate-200 text-base font-medium mb-2 block">
                  Título Principal <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="heroTitle"
                  value={formData.heroTitle}
                  onChange={(e) => updateField('heroTitle', e.target.value)}
                  placeholder="Bem-vindo ao nosso site"
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                />
              </div>

              <div>
                <Label htmlFor="heroSubtitle" className="text-slate-200 text-base font-medium mb-2 block">Subtítulo</Label>
                <Input
                  id="heroSubtitle"
                  value={formData.heroSubtitle}
                  onChange={(e) => updateField('heroSubtitle', e.target.value)}
                  placeholder="Descrição do seu negócio"
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                />
              </div>

              <div>
                <Label htmlFor="heroCtaText" className="text-slate-200 text-base font-medium mb-2 block">Texto do Botão Principal</Label>
                <Input
                  id="heroCtaText"
                  value={formData.heroCtaText}
                  onChange={(e) => updateField('heroCtaText', e.target.value)}
                  placeholder="Entre em Contato"
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                />
              </div>
            </div>
          )}

          {/* Step 4: Finalizar */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-100">
                Tudo Pronto!
              </h3>
              <p className="text-slate-300 text-lg">
                Seu site está configurado e pronto para ser personalizado ainda mais.
                Você pode acessar o painel de configurações a qualquer momento.
              </p>
              <div className="bg-slate-700/50 border border-slate-600 p-6 rounded-lg text-left">
                <h4 className="font-semibold mb-3 text-slate-100 text-lg">✨ Configurações salvas:</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Nome: <span className="font-medium">{formData.siteName}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Email: <span className="font-medium">{formData.email}</span>
                  </li>
                  {formData.phone && (
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> Telefone: <span className="font-medium">{formData.phone}</span>
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Título: <span className="font-medium">{formData.heroTitle}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-slate-700">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white disabled:opacity-30 h-11 px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            {currentStep < STEPS.length ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-30 h-11 px-6 shadow-lg shadow-blue-500/20"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={isUpdating}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white h-11 px-6 shadow-lg shadow-green-500/30"
              >
                {isUpdating ? "Salvando..." : "Finalizar"}
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
