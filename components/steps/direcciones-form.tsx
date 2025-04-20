import { AddressSelector } from "@/components/address-selector"
import { useFormContext } from "react-hook-form"
import { useState, useEffect } from "react"

interface DireccionesFormProps {
  tipoPersona: "natural" | "juridica"
}

export function DireccionesForm({ tipoPersona }: DireccionesFormProps) {
  const { control, setValue, watch } = useFormContext()

  // Obtener los valores actuales del formulario
  const direccionHabitacion = watch("direccionHabitacion")
  const direccionFiscal = watch("direccionFiscal")
  const direccionFisica = watch("direccionFisica")

  // Inicializar los estados con los valores del formulario
  const [selectedEstado, setSelectedEstado] = useState(direccionHabitacion?.estado || "")
  const [selectedMunicipio, setSelectedMunicipio] = useState(direccionHabitacion?.municipio || "")
  const [selectedParroquia, setSelectedParroquia] = useState(direccionHabitacion?.parroquia || "")

  const [selectedEstadoFiscal, setSelectedEstadoFiscal] = useState(direccionFiscal?.estado || "")
  const [selectedMunicipioFiscal, setSelectedMunicipioFiscal] = useState(direccionFiscal?.municipio || "")
  const [selectedParroquiaFiscal, setSelectedParroquiaFiscal] = useState(direccionFiscal?.parroquia || "")

  const [selectedEstadoFisica, setSelectedEstadoFisica] = useState(direccionFisica?.estado || "")
  const [selectedMunicipioFisica, setSelectedMunicipioFisica] = useState(direccionFisica?.municipio || "")
  const [selectedParroquiaFisica, setSelectedParroquiaFisica] = useState(direccionFisica?.parroquia || "")

  // Actualizar el formulario cuando cambian los selects
  useEffect(() => {
    if (tipoPersona === "natural") {
      setValue("direccionHabitacion.estado", selectedEstado)
      setValue("direccionHabitacion.municipio", selectedMunicipio)
      setValue("direccionHabitacion.parroquia", selectedParroquia)
    } else {
      setValue("direccionFiscal.estado", selectedEstadoFiscal)
      setValue("direccionFiscal.municipio", selectedMunicipioFiscal)
      setValue("direccionFiscal.parroquia", selectedParroquiaFiscal)
      setValue("direccionFisica.estado", selectedEstadoFisica)
      setValue("direccionFisica.municipio", selectedMunicipioFisica)
      setValue("direccionFisica.parroquia", selectedParroquiaFisica)
    }
  }, [
    selectedEstado,
    selectedMunicipio,
    selectedParroquia,
    selectedEstadoFiscal,
    selectedMunicipioFiscal,
    selectedParroquiaFiscal,
    selectedEstadoFisica,
    selectedMunicipioFisica,
    selectedParroquiaFisica,
    setValue,
    tipoPersona,
  ])

  if (tipoPersona === "natural") {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-6">Dirección de Habitación</h2>
          <div className="max-w-2xl">
            <AddressSelector 
              name="direccionHabitacion" 
              label="Dirección de Habitación"
              initialValues={{
                estado: selectedEstado,
                municipio: selectedMunicipio,
                parroquia: selectedParroquia,
                direccion: direccionHabitacion?.direccion || ""
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Direcciones</h2>
        <div className="space-y-8 max-w-2xl">
          <AddressSelector 
            name="direccionFiscal" 
            label="Dirección Fiscal"
            initialValues={{
              estado: selectedEstadoFiscal,
              municipio: selectedMunicipioFiscal,
              parroquia: selectedParroquiaFiscal,
              direccion: direccionFiscal?.direccion || ""
            }}
          />
          <AddressSelector 
            name="direccionFisica" 
            label="Dirección Física"
            initialValues={{
              estado: selectedEstadoFisica,
              municipio: selectedMunicipioFisica,
              parroquia: selectedParroquiaFisica,
              direccion: direccionFisica?.direccion || ""
            }}
          />
        </div>
      </div>
    </div>
  )
} 