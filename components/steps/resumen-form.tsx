"use client"

import { useFormContext } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const metodosPagoMap: Record<string, string> = {
  transferencia: "Transferencia Bancaria",
  efectivo: "Efectivo",
  tarjeta: "Tarjeta de Crédito/Débito",
  paypal: "PayPal",
  zelle: "Zelle",
  cripto: "Criptomonedas",
}

export function ResumenForm() {
  const { getValues } = useFormContext()
  const formValues = getValues()
  const tipoPersona = formValues.tipoPersona

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Resumen de Registro</h2>
      <p className="text-sm text-muted-foreground">Por favor revise la información antes de completar el registro</p>

      <Card>
        <CardHeader>
          <CardTitle>{tipoPersona === "natural" ? "Persona Natural" : "Persona Jurídica"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tipoPersona === "natural" ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">RIF</p>
                  <p>{formValues.rif}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cédula</p>
                  <p>{formValues.cedula}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nombres</p>
                  <p>{formValues.nombres}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Apellidos</p>
                  <p>{formValues.apellidos}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground">Teléfonos</p>
                <p>{formValues.telefonos}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Correo Electrónico</p>
                <p>{formValues.correoElectronico}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Dirección de Habitación</p>
                <p>{formValues.direccionHabitacion}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-muted-foreground">RIF</p>
                <p>{formValues.rif}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Denominación Comercial</p>
                  <p>{formValues.denominacionComercial}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Razón Social</p>
                  <p>{formValues.razonSocial}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Capital Disponible</p>
                <p>{formValues.capitalDisponible}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teléfonos</p>
                  <p>{formValues.telefonos}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Correo Electrónico</p>
                  <p>{formValues.correoElectronico}</p>
                </div>
              </div>

              {formValues.paginaWeb && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Página Web</p>
                  <p>{formValues.paginaWeb}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-muted-foreground">Personas de Contacto</p>
                <p>{formValues.personasContacto}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dirección Fiscal</p>
                  <p>{formValues.direccionFiscal}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dirección Física</p>
                  <p>{formValues.direccionFisica}</p>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground">Métodos de Pago</p>
            <ul className="mt-2 list-inside list-disc">
              {formValues.metodosPago.map((metodo: string) => (
                <li key={metodo}>{metodosPagoMap[metodo]}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
