"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

import { TipoPersonaForm } from "@/components/steps/tipo-persona-form";
import { DatosBasicosForm } from "@/components/steps/datos-basicos-form";
import { ContactoForm } from "@/components/steps/contacto-form";

import { ResumenForm } from "@/components/steps/resumen-form";
import { StepIndicator } from "@/components/step-indicator";
import { DireccionesForm } from "@/components/steps/direcciones-form";
import { TarjetaForm } from "@/components/steps/tarjeta-form";
// Common payment fields for both schemas
const paymentFields = {
  numeroTarjeta: z.string().min(16, "Número de tarjeta es requerido y debe tener 16 dígitos"),
  nombreTitular: z.string().min(1, "Nombre del titular es requerido"),
  fechaExpiracion: z.string().min(4, "Fecha de expiración es requerida"),
  codigoSeguridad: z.string().min(3, "Código de seguridad es requerido"),
};

// Esquema de validación para persona natural
const personaNaturalSchema = z.object({
  tipoPersona: z.literal("natural"),
  rif: z.string().min(1, "RIF es requerido"),
  cedula: z.string().min(1, "Cédula es requerida"),
  nombres: z.string().min(1, "Nombres son requeridos"),
  apellidos: z.string().min(1, "Apellidos son requeridos"),
  telefonosNatural: z.string().min(1, "Al menos un teléfono es requerido"),
  correoElectronico: z.string().email("Correo electrónico inválido"),
  direccionHabitacion: z.object({
    estado: z.string().min(1, "Estado es requerido"),
    municipio: z.string().min(1, "Municipio es requerido"),
    parroquia: z.string().min(1, "Parroquia es requerida"),
    direccion: z.string().min(1, "Dirección detallada es requerida"),
  }),
  ...paymentFields,
});

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

// Esquema combinado
const formSchema = z.discriminatedUnion("tipoPersona", [
  personaNaturalSchema,
  personaJuridicaSchema,
]);

type FormValues = z.infer<typeof formSchema>;

type AddressFields = {
  estado: string;
  municipio: string;
  parroquia: string;
  direccion: string;
};

type FormValuesWithAddress = {
  tipoPersona: "natural" | "juridica";
  rif: string;
  telefonosNatural?: string;
  telefonosJuridica?: string;
  correoElectronico: string;
  metodosPago: string[];
  numeroTarjeta?: string;
  nombreTitular?: string;
  fechaExpiracion?: string;
  codigoSeguridad?: string;
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  direccionHabitacion?: {
    estado: string;
    municipio: string;
    parroquia: string;
    direccion: string;
  };
  denominacionComercial?: string;
  razonSocial?: string;
  capitalDisponible?: string;
  paginaWeb?: string;
  personasContacto?: string;
  direccionFiscal?: {
    estado: string;
    municipio: string;
    parroquia: string;
    direccion: string;
  };
  direccionFisica?: {
    estado: string;
    municipio: string;
    parroquia: string;
    direccion: string;
  };
};

const STEPS = [
  "Tipo de Persona",
  "Datos Básicos",
  "Información de Contacto",
  "Método de Pago",
  "Resumen",
];

export function RegistroMultistep() {
  const [step, setStep] = useState(0);
  const [contactSubstep, setContactSubstep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormValuesWithAddress>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoPersona: "natural",
      metodosPago: [],
      direccionHabitacion: {
        estado: "",
        municipio: "",
        parroquia: "",
        direccion: "",
      },
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

  const tipoPersona = methods.watch("tipoPersona");

  const nextStep = async () => {
    if (step === 2 && tipoPersona === "natural") {
      const fields = ["telefonosNatural", "correoElectronico", "direccionHabitacion"];
      const isValid = await methods.trigger(fields as any);
      if (isValid) {
        setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      }
      return;
    }

    if (step === 2 && contactSubstep === 0) {
      const fields = ["telefonosJuridica", "correoElectronico", "paginaWeb", "personasContacto"];
      const isValid = await methods.trigger(fields as any);
      if (isValid) {
        setContactSubstep(1);
      }
      return;
    }

    if (step === 2 && contactSubstep === 1) {
      const fields = ["direccionFiscal", "direccionFisica"];
      const isValid = await methods.trigger(fields as any);
      if (isValid) {
        setContactSubstep(0);
        setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      }
      return;
    }

    const fields = getFieldsForStep(step);
    const isValid = await methods.trigger(fields as any);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    if (step === 3 && tipoPersona === "juridica") {
      setStep(2);
      setContactSubstep(1);
      return;
    }
    if (step === 2 && contactSubstep === 1) {
      setContactSubstep(0);
      return;
    }
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const getFieldsForStep = (currentStep: number): Array<keyof FormValuesWithAddress> => {
    switch (currentStep) {
      case 0:
        return ["tipoPersona"];
      case 1:
        return tipoPersona === "natural"
          ? ["rif", "cedula", "nombres", "apellidos"]
          : ["rif", "denominacionComercial", "razonSocial", "capitalDisponible"];
      case 2:
        if (tipoPersona === "natural") {
          return ["telefonosNatural", "correoElectronico", "direccionHabitacion"];
        }
        return contactSubstep === 0
          ? ["telefonosJuridica", "correoElectronico", "paginaWeb", "personasContacto"]
          : ["direccionFiscal", "direccionFisica"];
      case 3:
        return ["numeroTarjeta", "nombreTitular", "fechaExpiracion", "codigoSeguridad"];
      case 4:
        return ["metodosPago"];
      default:
        return [];
    }
  };

  const onSubmit = async (data: FormValuesWithAddress) => {
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
    if (step === 2) {
      if (tipoPersona === "natural") {
        return <ContactoForm tipoPersona={tipoPersona} />;
      }
      return contactSubstep === 0 ? (
        <ContactoForm tipoPersona={tipoPersona} />
      ) : (
        <DireccionesForm tipoPersona={tipoPersona} />
      );
    }

    switch (step) {
      case 0:
        return <TipoPersonaForm />;
      case 1:
        return <DatosBasicosForm tipoPersona={tipoPersona} />;
      case 3:
        return <TarjetaForm />;
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 0 || isSubmitting}
                >
                  Anterior
                </Button>

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
