"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, X } from "lucide-react"
import { useEffect, useState } from "react"

interface ContactoFormProps {
  tipoPersona: "natural" | "juridica"
}

// Prefijos telefónicos comunes en Venezuela
const prefijos = [
  { value: "0424", label: "0424" },
  { value: "0414", label: "0414" },
  { value: "0412", label: "0412" },
  { value: "0416", label: "0416" },
  { value: "0426", label: "0426" },
  { value: "0212", label: "0212" },
]

// Denominaciones para los teléfonos
const denominaciones = [
  { value: "movil", label: "Móvil" },
  { value: "casa", label: "Casa" },
  { value: "trabajo", label: "Trabajo" },
  { value: "otro", label: "Otro" },
]

interface Telefono {
  id: string
  prefijo: string
  numero: string
  denominacion: string
}

export function ContactoForm({ tipoPersona }: ContactoFormProps) {
  const { control, setValue } = useFormContext()
  const [telefonos, setTelefonos] = useState<Telefono[]>([
    { id: "1", prefijo: "0424", numero: "", denominacion: "movil" },
  ])

  // Función para agregar un nuevo teléfono
  const agregarTelefono = () => {
    const nuevoTelefono = {
      id: Date.now().toString(),
      prefijo: "0424",
      numero: "",
      denominacion: "movil",
    }
    setTelefonos([...telefonos, nuevoTelefono])
  }

  // Función para eliminar un teléfono
  const eliminarTelefono = (id: string) => {
    if (telefonos.length <= 1) return // Mantener al menos un teléfono
    setTelefonos(telefonos.filter((tel) => tel.id !== id))
  }

  // Actualizar el campo telefonos en el formulario cuando cambian los teléfonos
  useEffect(() => {
    const telefonosString = telefonos
      .map((tel) => `${tel.prefijo} ${tel.numero} (${denominaciones.find((d) => d.value === tel.denominacion)?.label})`)
      .join(", ")
    setValue("telefonos", telefonosString)
  }, [telefonos, setValue])

  const renderTelefonosSection = () => (
    <div className="space-y-4">
      <div>
        <FormLabel>Teléfonos</FormLabel>
        <div className="space-y-3">
          {telefonos.map((telefono) => (
            <div key={telefono.id} className="flex items-center gap-4">
              <div className="w-[80px] shrink-0">
                <Select
                  defaultValue={telefono.prefijo}
                  onValueChange={(value: string) => {
                    setTelefonos(telefonos.map((tel) => {
                      if (tel.id === telefono.id) {
                        // If changing from 0212 to another prefix and denominacion is "casa", change it to "movil"
                        const newDenominacion = value !== "0212" && tel.denominacion === "casa" ? "movil" : tel.denominacion;
                        return { ...tel, prefijo: value, denominacion: newDenominacion };
                      }
                      return tel;
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Prefijo" />
                  </SelectTrigger>
                  <SelectContent>
                    {prefijos.map((prefijo) => (
                      <SelectItem key={prefijo.value} value={prefijo.value}>
                        {prefijo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-[255px] shrink-0">
                <Input
                  placeholder="Número"
                  value={telefono.numero}
                  onChange={(e) => {
                    setTelefonos(
                      telefonos.map((tel) => (tel.id === telefono.id ? { ...tel, numero: e.target.value } : tel)),
                    )
                  }}
                />
              </div>

              <Select
                defaultValue={telefono.denominacion}
                onValueChange={(value: string) => {
                  setTelefonos(telefonos.map((tel) => (tel.id === telefono.id ? { ...tel, denominacion: value } : tel)))
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {denominaciones.map((denominacion) => (
                    <SelectItem 
                      key={denominacion.value} 
                      value={denominacion.value}
                      disabled={denominacion.value === "casa" && telefono.prefijo !== "0212"}
                    >
                      {denominacion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => eliminarTelefono(telefono.id)}
                disabled={telefonos.length <= 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={agregarTelefono}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar otro teléfono
          </Button>
        </div>
      </div>

      {/* Campo oculto para mantener la validación */}
      <FormField
        control={control}
        name="telefonos"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )

  if (tipoPersona === "natural") {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Información de Contacto - Persona Natural</h2>

        {renderTelefonosSection()}

        <FormField
          control={control}
          name="correoElectronico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="correo@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="direccionHabitacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección de Habitación</FormLabel>
              <FormControl>
                <Textarea placeholder="Dirección completa de habitación" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Información de Contacto - Persona Jurídica</h2>

      {renderTelefonosSection()}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="correoElectronico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="empresa@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="paginaWeb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Página Web (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="https://www.ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="personasContacto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Personas de Contacto</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Nombre, cargo y datos de contacto de las personas de contacto"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="direccionFiscal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección Fiscal</FormLabel>
              <FormControl>
                <Textarea placeholder="Dirección fiscal completa" className="min-h-[80px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="direccionFisica"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección Física Principal</FormLabel>
              <FormControl>
                <Textarea placeholder="Dirección física principal" className="min-h-[80px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
