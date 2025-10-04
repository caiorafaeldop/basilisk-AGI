import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      label: "Telefone",
      value: "(83) 9109-0902",
      action: () => window.open('tel:+558391090902', '_self')
    },
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      label: "E-mail",
      value: "contato@maiaadvocacia.com.br",
      action: () => window.open('mailto:contato@maiaadvocacia.com.br', '_self')
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      label: "Endereço",
      value: "Green Tower - Av. Sen. Rui Carneiro 293, Sala 1301",
      action: () => window.open('https://maps.google.com/?q=Green+Tower+Av.+Sen.+Rui+Carneiro+293+sala+1301+João+Pessoa+PB', '_blank')
    },
    {
      icon: <Clock className="w-5 h-5 text-primary" />,
      label: "Horário",
      value: "Segunda a Sexta: 8h às 18h",
      action: null
    }
  ];

  return (
    <section className="block md:hidden py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-4">
            Entre em Contato
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para defender seus direitos trabalhistas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-shadow border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-primary mb-1">
                        {info.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {info.value}
                      </p>
                      {info.action && (
                        <button
                          onClick={info.action}
                          className="text-primary hover:text-primary/80 text-xs underline mt-1"
                        >
                          {info.label === "Endereço" ? "Ver no mapa" : "Contatar"}
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map */}
          <div className="h-80">
            <Card className="card-shadow border-0 overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4891234567!2d-34.865156!3d-7.116234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ae32f48f0d0d0d%3A0xabcdef1234567890!2sGreen%20Tower%20-%20Av.%20Sen.%20Rui%20Carneiro%2C%20293%20-%20Manaíra%2C%20João%20Pessoa%20-%20PB%2C%2058038-320!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Paulo Maia Advocacia"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="text-center">
          <Card className="card-shadow border-0 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-playfair font-semibold text-primary mb-3">
                Atendimento Imediato via WhatsApp
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tire suas dúvidas ou agende uma consulta agora mesmo
              </p>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white px-6"
                onClick={() => window.open('https://wa.me/558391090902?text=Olá, gostaria de agendar uma consulta sobre direitos trabalhistas.', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
