"use client";

import { useFormContext } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

const metodosPagoMap: Record<string, string> = {
  transferencia: "Transferencia Bancaria",
  efectivo: "Efectivo",
  tarjeta: "Tarjeta de Crédito/Débito",
  paypal: "PayPal",
  zelle: "Zelle",
  cripto: "Criptomonedas",
};

export function ResumenForm() {
  const { getValues } = useFormContext();
  const formValues = getValues();
  const tipoPersona = formValues.tipoPersona;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Resumen de Registro</h2>
      <p className="text-sm text-muted-foreground">
        Por favor revise la información antes de completar el registro
      </p>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {tipoPersona === "natural" ? "Persona Natural" : "Persona Jurídica"}
        </h3>

        {tipoPersona === "natural" ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">RIF</p>
                <p>{`${formValues.tipoRif}-${formValues.rif}`}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cédula</p>
                <p>{`${formValues.nacionalidad}-${formValues.cedula}`}</p>
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
              <p className="break-words whitespace-normal">{`${formValues.direccionHabitacion?.direccion}, ${formValues.direccionHabitacion?.parroquia}, ${formValues.direccionHabitacion?.municipio}, ${formValues.direccionHabitacion?.estado}`}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm font-medium text-muted-foreground">RIF</p>
              <p>{`${formValues.tipoRif}-${formValues.rif}`}</p>
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
              <div className="space-y-4 mt-2">
                {formValues.personasContacto?.split("\n").map((persona: string, index: number) => (
                  <div key={index}>
                    <p className="break-words whitespace-normal">{persona.trim()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dirección Fiscal</p>
                <p className="break-words whitespace-normal">{`${formValues.direccionFiscal?.direccion}, ${formValues.direccionFiscal?.parroquia}, ${formValues.direccionFiscal?.municipio}, ${formValues.direccionFiscal?.estado}`}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dirección Física</p>
                <p className="break-words whitespace-normal">{`${formValues.direccionFisica?.direccion}, ${formValues.direccionFisica?.parroquia}, ${formValues.direccionFisica?.municipio}, ${formValues.direccionFisica?.estado}`}</p>
              </div>
            </div>
          </>
        )}

        <Separator />

        <div>
          <p className="text-sm font-medium text-muted-foreground">Información de Tarjeta</p>
          <div className="mt-2 space-y-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p>Nombre del Titular: {formValues.nombreTitular}</p>
              <p>
                Número de Tarjeta:{" "}
                {formValues.numeroTarjeta
                  ? `•••• •••• •••• ${formValues.numeroTarjeta.slice(-4)}`
                  : ""}
              </p>
            </div>
            <p>Fecha de Expiración: {formValues.fechaExpiracion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
