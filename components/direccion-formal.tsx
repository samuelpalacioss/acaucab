"use client"

import { useFormContext } from "react-hook-form"

interface DireccionFormalProps {
  tipoPersona: "natural" | "juridica"
  tipoDireccion?: "fiscal" | "fisica"
}

const direccionData = [
  {
    "estado": "Distrito Capital",
    "municipio": "Libertador",
    "parroquias": [
      "El Valle",
      "Caricuao",
      "Catedral",
      "Coche",
      "Antímano",
      "La Vega",
      "El Paraíso",
      "San Juan",
      "Santa Teresa",
      "23 de Enero",
      "La Pastora",
      "Altagracia",
      "San José",
      "San Bernardino",
      "Candelaria",
      "San Agustín",
      "El Recreo",
      "San Pedro"
    ]
  },
  {
    "estado": "Miranda",
    "municipio": "Baruta",
    "parroquias": ["Baruta"]
  },
  {
    "estado": "Miranda",
    "municipio": "Brión",
    "parroquias": ["Higuerote"]
  },
  {
    "estado": "Miranda",
    "municipio": "Carrizal",
    "parroquias": ["Carrizal"]
  },
  {
    "estado": "Miranda",
    "municipio": "Chacao",
    "parroquias": ["Chacao"]
  },
  {
    "estado": "Miranda",
    "municipio": "El Hatillo",
    "parroquias": ["El Hatillo"]
  },
  {
    "estado": "Miranda",
    "municipio": "Guaicaipuro",
    "parroquias": ["Los Teques", "El Jarillo"]
  },
  {
    "estado": "Miranda",
    "municipio": "Los Salias",
    "parroquias": ["San Antonio de los Altos"]
  },
  {
    "estado": "Miranda",
    "municipio": "Sucre",
    "parroquias": ["Petare"]
  },
  {
    "estado": "Miranda",
    "municipio": "Plaza",
    "parroquias": ["Guarenas"]
  },
  {
    "estado": "Miranda",
    "municipio": "Zamora",
    "parroquias": ["Guatire"]
  }
]

export function DireccionFormal({ tipoPersona, tipoDireccion }: DireccionFormalProps) {
  const { register, watch, setValue, formState: { errors } } = useFormContext()

  // Get field names based on tipoPersona and tipoDireccion
  const getFieldName = (field: "estado" | "municipio" | "parroquia" | "direccion") => {
    if (tipoPersona === "natural") {
      return field === "direccion" ? "direccionDetallada" : field
    } else {
      const suffix = tipoDireccion === "fiscal" ? "Fiscal" : "Fisica"
      return `${field}${suffix}`
    }
  }

  const estadoField = getFieldName("estado")
  const municipioField = getFieldName("municipio")
  const parroquiaField = getFieldName("parroquia")
  const direccionField = getFieldName("direccion")

  const selectedEstado = watch(estadoField)
  const selectedMunicipio = watch(municipioField)

  // Get unique estados
  const estados = Array.from(new Set(direccionData.map(item => item.estado)))

  // Get municipios based on selected estado
  const municipios = direccionData
    .filter(item => item.estado === selectedEstado)
    .map(item => item.municipio)

  // Get parroquias based on selected municipio
  const parroquias = direccionData
    .find(item => item.municipio === selectedMunicipio)
    ?.parroquias || []

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const estado = e.target.value
    setValue(estadoField, estado)
    setValue(municipioField, "")
    setValue(parroquiaField, "")

    // If estado is Distrito Capital, set Libertador as default municipio
    if (estado === "Distrito Capital") {
      setValue(municipioField, "Libertador")
    }
  }

  const handleMunicipioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(municipioField, e.target.value)
    setValue(parroquiaField, "")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor={estadoField} className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id={estadoField}
            {...register(estadoField)}
            onChange={handleEstadoChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione un estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          {errors[estadoField] && (
            <p className="mt-1 text-sm text-red-600">{errors[estadoField]?.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor={municipioField} className="block text-sm font-medium text-gray-700 mb-1">
            Municipio
          </label>
          <select
            id={municipioField}
            {...register(municipioField)}
            onChange={handleMunicipioChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedEstado}
          >
            <option value="">Seleccione un municipio</option>
            {municipios.map((municipio) => (
              <option key={municipio} value={municipio}>
                {municipio}
              </option>
            ))}
          </select>
          {errors[municipioField] && (
            <p className="mt-1 text-sm text-red-600">{errors[municipioField]?.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor={parroquiaField} className="block text-sm font-medium text-gray-700 mb-1">
            Parroquia
          </label>
          <select
            id={parroquiaField}
            {...register(parroquiaField)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedMunicipio}
          >
            <option value="">Seleccione una parroquia</option>
            {parroquias.map((parroquia) => (
              <option key={parroquia} value={parroquia}>
                {parroquia}
              </option>
            ))}
          </select>
          {errors[parroquiaField] && (
            <p className="mt-1 text-sm text-red-600">{errors[parroquiaField]?.message as string}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={direccionField} className="block text-sm font-medium text-gray-700 mb-1">
          Dirección Detallada
        </label>
        <textarea
          id={direccionField}
          {...register(direccionField)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Ingrese su dirección detallada"
        />
        {errors[direccionField] && (
          <p className="mt-1 text-sm text-red-600">{errors[direccionField]?.message as string}</p>
        )}
      </div>
    </div>
  )
} 