"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useFormContext } from "react-hook-form"
import { useState } from "react"

// Estructura de datos para ubicaciones
const ubicaciones = [
  { "estado": "Distrito Capital", "municipio": "Libertador", "parroquias": [ "El Valle", "Caricuao", "Catedral", "Coche", "Antímano", "La Vega", "El Paraíso", "San Juan", "Santa Teresa", "23 de Enero", "La Pastora", "Altagracia", "San José", "San Bernardino", "Candelaria", "San Agustín", "El Recreo", "San Pedro" ] },
  { "estado": "Miranda", "municipio": "Baruta", "parroquias": ["Baruta"] },
  { "estado": "Miranda", "municipio": "Brión", "parroquias": ["Higuerote"] },
  { "estado": "Miranda", "municipio": "Carrizal", "parroquias": ["Carrizal"] },
  { "estado": "Miranda", "municipio": "Chacao", "parroquias": ["Chacao"] },
  { "estado": "Miranda", "municipio": "El Hatillo", "parroquias": ["El Hatillo"] },
  { "estado": "Miranda", "municipio": "Guaicaipuro", "parroquias": ["Los Teques", "El Jarillo"] },
  { "estado": "Miranda", "municipio": "Los Salias", "parroquias": ["San Antonio de los Altos"] },
  { "estado": "Miranda", "municipio": "Sucre", "parroquias": ["Petare"] },
  { "estado": "Miranda", "municipio": "Plaza", "parroquias": ["Guarenas"] },
  { "estado": "Miranda", "municipio": "Zamora", "parroquias": ["Guatire"] }
]

// Obtener estados únicos
const estados = [...new Set(ubicaciones.map(u => u.estado))]

interface DireccionSelectorProps {
  tipoPersona: "natural" | "juridica"
}

export function DireccionSelector({ tipoPersona }: DireccionSelectorProps) {
  const { control, setValue } = useFormContext()
  // Estado para dirección principal/fiscal
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("")
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("")
  const [parroquiaSeleccionada, setParroquiaSeleccionada] = useState("")

  // Estado para dirección física
  const [estadoFisicoSeleccionado, setEstadoFisicoSeleccionado] = useState("")
  const [municipioFisicoSeleccionado, setMunicipioFisicoSeleccionado] = useState("")
  const [parroquiaFisicaSeleccionada, setParroquiaFisicaSeleccionada] = useState("")

  // Obtener municipios filtrados por estado (principal/fiscal)
  const municipiosFiltrados = estadoSeleccionado
    ? [...new Set(ubicaciones
        .filter(u => u.estado === estadoSeleccionado)
        .map(u => u.municipio))]
    : []

  // Obtener parroquias filtradas por municipio (principal/fiscal)
  const parroquiasFiltradas = municipioSeleccionado
    ? ubicaciones.find(u => u.municipio === municipioSeleccionado)?.parroquias || []
    : []

  // Obtener municipios filtrados por estado (físico)
  const municipiosFisicosFiltrados = estadoFisicoSeleccionado
    ? [...new Set(ubicaciones
        .filter(u => u.estado === estadoFisicoSeleccionado)
        .map(u => u.municipio))]
    : []

  // Obtener parroquias filtradas por municipio (físico)
  const parroquiasFisicasFiltradas = municipioFisicoSeleccionado
    ? ubicaciones.find(u => u.municipio === municipioFisicoSeleccionado)?.parroquias || []
    : []

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormLabel>{tipoPersona === "natural" ? "Dirección de Habitación" : "Dirección Fiscal"}</FormLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  value={estadoSeleccionado}
                  onValueChange={(value) => {
                    setEstadoSeleccionado(value)
                    // Si el estado es Distrito Capital, seleccionar automáticamente Libertador
                    if (value === "Distrito Capital") {
                      setMunicipioSeleccionado("Libertador")
                      setValue("municipio", "Libertador")
                    } else {
                      setMunicipioSeleccionado("")
                      setValue("municipio", "")
                    }
                    setParroquiaSeleccionada("")
                    setValue("estado", value)
                    setValue("parroquia", "")
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={4}>
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="municipio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipio</FormLabel>
                <Select
                  value={municipioSeleccionado}
                  onValueChange={(value) => {
                    setMunicipioSeleccionado(value)
                    setParroquiaSeleccionada("")
                    setValue("municipio", value)
                    setValue("parroquia", "")
                  }}
                  disabled={!estadoSeleccionado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un municipio" />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={4}>
                    {municipiosFiltrados.map((municipio) => (
                      <SelectItem key={municipio} value={municipio}>
                        {municipio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="parroquia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parroquia</FormLabel>
                <Select
                  value={parroquiaSeleccionada}
                  onValueChange={(value) => {
                    setParroquiaSeleccionada(value)
                    setValue("parroquia", value)
                  }}
                  disabled={!municipioSeleccionado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una parroquia" />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={4}>
                    {parroquiasFiltradas.map((parroquia) => (
                      <SelectItem key={parroquia} value={parroquia}>
                        {parroquia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name={tipoPersona === "natural" ? "direccionHabitacion" : "direccionFiscal"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalle de la Dirección</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={tipoPersona === "natural" ? "Dirección completa de habitación" : "Dirección fiscal completa"} 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {tipoPersona === "juridica" && (
        <>
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <FormLabel>Dirección Física Principal</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={control}
                name="estadoFisico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      value={estadoFisicoSeleccionado}
                      onValueChange={(value) => {
                        setEstadoFisicoSeleccionado(value)
                        if (value === "Distrito Capital") {
                          setMunicipioFisicoSeleccionado("Libertador")
                          setValue("municipioFisico", "Libertador")
                        } else {
                          setMunicipioFisicoSeleccionado("")
                          setValue("municipioFisico", "")
                        }
                        setParroquiaFisicaSeleccionada("")
                        setValue("estadoFisico", value)
                        setValue("parroquiaFisica", "")
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={4}>
                        {estados.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="municipioFisico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Municipio</FormLabel>
                    <Select
                      value={municipioFisicoSeleccionado}
                      onValueChange={(value) => {
                        setMunicipioFisicoSeleccionado(value)
                        setParroquiaFisicaSeleccionada("")
                        setValue("municipioFisico", value)
                        setValue("parroquiaFisica", "")
                      }}
                      disabled={!estadoFisicoSeleccionado}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un municipio" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={4}>
                        {municipiosFisicosFiltrados.map((municipio) => (
                          <SelectItem key={municipio} value={municipio}>
                            {municipio}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="parroquiaFisica"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parroquia</FormLabel>
                    <Select
                      value={parroquiaFisicaSeleccionada}
                      onValueChange={(value) => {
                        setParroquiaFisicaSeleccionada(value)
                        setValue("parroquiaFisica", value)
                      }}
                      disabled={!municipioFisicoSeleccionado}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una parroquia" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={4}>
                        {parroquiasFisicasFiltradas.map((parroquia) => (
                          <SelectItem key={parroquia} value={parroquia}>
                            {parroquia}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="direccionFisica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detalle de la Dirección</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Dirección física principal" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      )}
    </div>
  )
} 