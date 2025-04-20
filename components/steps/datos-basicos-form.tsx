"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

interface DatosBasicosFormProps {
  tipoPersona: "natural" | "juridica"
}

export function DatosBasicosForm({ tipoPersona }: DatosBasicosFormProps) {
  const { control } = useFormContext()

  if (tipoPersona === "natural") {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Datos Básicos - Persona Natural</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="rif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RIF</FormLabel>
                <FormControl>
                  <Input placeholder="V-12345678-9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cedula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cédula de Identidad</FormLabel>
                <FormControl>
                  <Input placeholder="V-12345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Nombres" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Datos Básicos - Persona Jurídica</h2>

      <FormField
        control={control}
        name="rif"
        render={({ field }) => (
          <FormItem>
            <FormLabel>RIF</FormLabel>
            <FormControl>
              <Input placeholder="J-12345678-9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="denominacionComercial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Denominación Comercial</FormLabel>
              <FormControl>
                <Input placeholder="Nombre comercial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="razonSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón Social</FormLabel>
              <FormControl>
                <Input placeholder="Razón social" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

     <div className="max-w-[350px]">
     <FormField
        control={control}
        name="capitalDisponible"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Capital Disponible</FormLabel>
            <FormControl>
              <Input placeholder="Capital disponible" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
     </div>
    </div>
  )
}
