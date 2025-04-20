"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

import { DatosBasicosForm } from "@/components/steps/datos-basicos-form";
import { ContactoForm } from "@/components/steps/contacto-form";
import { DireccionesForm } from "@/components/steps/direcciones-form";
import { MetodosPagoForm } from "@/components/steps/metodos-pago-form";
import { ResumenForm } from "@/components/steps/resumen-form";
import { StepIndicator } from "@/components/step-indicator";
import { PaymentMethodsBanner } from "./payment-methods-banner";

// Common payment fields schema
const paymentFields = {
  numeroTarjeta: z.string().min(16, "Número de tarjeta es requerido y debe tener 16 dígitos"),
  nombreTitular: z.string().min(1, "Nombre del titular es requerido"),
  fechaExpiracion: z.string().min(4, "Fecha de expiración es requerida"),
  codigoSeguridad: z.string().min(3, "Código de seguridad es requerido"),
};

// Esquema de validación para persona jurídica
const personaJuridicaSchema = z.object({
  tipoPersona: z.literal("juridica"),
  rif: z.string().min(1, "RIF es requerido"),
  denominacionComercial: z.string().min(1, "Denominación comercial es requerida"),
  razonSocial: z.string().min(1, "Razón social es requerida"),
  telefonosJuridica: z.string().min(1, "Al menos un teléfono es requerido"),
  correoElectronico: z.string().email("Correo electrónico inválido"),
  paginaWeb: z.string().optional(),
  capitalDisponible: z.string().min(1, "Capital disponible es requerido"),
  personasContacto: z.string().min(1, "Personas de contacto son requeridas"),
  direccionFiscal: z.object({
    estado: z.string().min(1, "Estado es requerido"),
    municipio: z.string().min(1, "Municipio es requerido"),
    parroquia: z.string().min(1, "Parroquia es requerida"),
    direccion: z.string().min(1, "Dirección detallada es requerida"),
  }),
  direccionFisica: z.object({
    estado: z.string().min(1, "Estado es requerido"),
    municipio: z.string().min(1, "Municipio es requerido"),
    parroquia: z.string().min(1, "Parroquia es requerida"),
    direccion: z.string().min(1, "Dirección detallada es requerida"),
  }),
  ...paymentFields,
});

type FormValues = z.infer<typeof personaJuridicaSchema>;

const STEPS = [
  "Datos Básicos",
  "Información de Contacto",
  "Direcciones",
  "Método de Pago",
  "Resumen",
];

export function RegistroPersonaJuridica() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(personaJuridicaSchema),
    defaultValues: {
      tipoPersona: "juridica",
      direccionFiscal: {
        estado: "",
        municipio: "",
        parroquia: "",
        direccion: "",
      },
      direccionFisica: {
        estado: "",
        municipio: "",
        parroquia: "",
        direccion: "",
      },
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await methods.trigger(fields as any);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const getFieldsForStep = (currentStep: number): Array<keyof FormValues> => {
    switch (currentStep) {
      case 0:
        return ["rif", "denominacionComercial", "razonSocial", "capitalDisponible"];
      case 1:
        return ["telefonosJuridica", "correoElectronico", "paginaWeb", "personasContacto"];
      case 2:
        return ["direccionFiscal", "direccionFisica"];
      case 3:
        return ["numeroTarjeta", "nombreTitular", "fechaExpiracion", "codigoSeguridad"];
      case 4:
        return [];
      default:
        return [];
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log("Datos del formulario:", data);

      // Simulamos una petición al servidor
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Registro completado",
        description: "Su información ha sido registrada exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar su registro.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <DatosBasicosForm tipoPersona="juridica" />;
      case 1:
        return <ContactoForm tipoPersona="juridica" />;
      case 2:
        return <DireccionesForm tipoPersona="juridica" />;
      case 3:
        return (
          <>
            <MetodosPagoForm />
            <PaymentMethodsBanner className="mt-4" />
          </>
        );
      case 4:
        return <ResumenForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={step} steps={STEPS} />

      <Card>
        <CardContent className="pt-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {renderStepContent()}

              <div className="mt-8 flex justify-between">
                {step > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    Anterior
                  </Button>
                ) : (
                  <div></div>
                )}

                {step === STEPS.length - 1 ? (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Completar Registro
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep}>
                    Siguiente
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
