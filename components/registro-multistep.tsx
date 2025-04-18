"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

import { TipoPersonaForm } from "@/components/steps/tipo-persona-form"
import { DatosBasicosForm } from "@/components/steps/datos-basicos-form"
import { ContactoForm } from "@/components/steps/contacto-form"
import { MetodosPagoForm } from "@/components/steps/metodos-pago-form"
import { ResumenForm } from "@/components/steps/resumen-form"
import { StepIndicator } from "@/components/step-indicator"

// Esquema de validación para persona natural
const personaNaturalSchema = z.object({
  tipoPersona: z.literal("natural"),
  rif: z.string().min(1, "RIF es requerido"),
  cedula: z.string().min(1, "Cédula es requerida"),
  nombres: z.string().min(1, "Nombres son requeridos"),
  apellidos: z.string().min(1, "Apellidos son requeridos"),
  telefonos: z.string().min(1, "Al menos un teléfono es requerido"),
  correoElectronico: z.string().email("Correo electrónico inválido"),
  direccionHabitacion: z.string().min(1, "Dirección de habitación es requerida"),
  metodosPago: z.array(z.string()).min(1, "Seleccione al menos un método de pago"),
})

// Esquema de validación para persona jurídica
const personaJuridicaSchema = z.object({
  tipoPersona: z.literal("juridica"),
  rif: z.string().min(1, "RIF es requerido"),
  denominacionComercial: z.string().min(1, "Denominación comercial es requerida"),
  razonSocial: z.string().min(1, "Razón social es requerida"),
  telefonos: z.string().min(1, "Al menos un teléfono es requerido"),
  correoElectronico: z.string().email("Correo electrónico inválido"),
  paginaWeb: z.string().optional(),
  capitalDisponible: z.string().min(1, "Capital disponible es requerido"),
  personasContacto: z.string().min(1, "Personas de contacto son requeridas"),
  metodosPago: z.array(z.string()).min(1, "Seleccione al menos un método de pago"),
  direccionFiscal: z.string().min(1, "Dirección fiscal es requerida"),
  direccionFisica: z.string().min(1, "Dirección física es requerida"),
})

// Esquema combinado
const formSchema = z.discriminatedUnion("tipoPersona", [personaNaturalSchema, personaJuridicaSchema])

type FormValues = z.infer<typeof formSchema>

const STEPS = ["Tipo de Persona", "Datos Básicos", "Información de Contacto", "Métodos de Pago", "Resumen"]

export function RegistroMultistep() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoPersona: "natural",
      metodosPago: [],
    },
    mode: "onChange",
  })

  const tipoPersona = methods.watch("tipoPersona")

  const nextStep = async () => {
    const fields = getFieldsForStep(step)

    const isValid = await methods.trigger(fields as any)
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const getFieldsForStep = (currentStep: number): (keyof FormValues)[] => {
    switch (currentStep) {
      case 0:
        return ["tipoPersona"]
      case 1:
        return tipoPersona === "natural"
          ? ["rif", "cedula", "nombres", "apellidos"]
          : ["rif", "denominacionComercial", "razonSocial", "capitalDisponible"]
      case 2:
        return tipoPersona === "natural"
          ? ["telefonos", "correoElectronico", "direccionHabitacion"]
          : ["telefonos", "correoElectronico", "paginaWeb", "personasContacto", "direccionFiscal", "direccionFisica"]
      case 3:
        return ["metodosPago"]
      default:
        return []
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log("Datos del formulario:", data)

      // Simulamos una petición al servidor
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Registro completado",
        description: "Su información ha sido registrada exitosamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar su registro.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <TipoPersonaForm />
      case 1:
        return <DatosBasicosForm tipoPersona={tipoPersona} />
      case 2:
        return <ContactoForm tipoPersona={tipoPersona} />
      case 3:
        return <MetodosPagoForm />
      case 4:
        return <ResumenForm />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={step} steps={STEPS} />

      <Card>
        <CardContent className="pt-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {renderStepContent()}

              <div className="mt-8 flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} disabled={step === 0 || isSubmitting}>
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
  )
}
