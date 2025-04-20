import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const addressData = [
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

interface AddressSelectorProps {
  name: string
  label: string
  initialValues?: {
    estado: string
    municipio: string
    parroquia: string
    direccion: string
  }
}

export function AddressSelector({ name, label, initialValues }: AddressSelectorProps) {
  const { register, setValue, watch } = useFormContext()
  const [selectedEstado, setSelectedEstado] = useState(initialValues?.estado || "")
  const [selectedMunicipio, setSelectedMunicipio] = useState(initialValues?.municipio || "")
  const [selectedParroquia, setSelectedParroquia] = useState(initialValues?.parroquia || "")

  const estados = Array.from(new Set(addressData.map(item => item.estado))).sort()
  const municipios = addressData
    .filter(item => item.estado === selectedEstado)
    .map(item => item.municipio)
    .sort()
  const parroquias = addressData.find(item => 
    item.estado === selectedEstado && item.municipio === selectedMunicipio
  )?.parroquias.sort() || []

  useEffect(() => {
    if (selectedEstado && selectedEstado !== initialValues?.estado) {
      setSelectedMunicipio("")
      setSelectedParroquia("")
    }
  }, [selectedEstado, initialValues?.estado])

  useEffect(() => {
    if (selectedMunicipio && selectedMunicipio !== initialValues?.municipio) {
      setSelectedParroquia("")
    }
  }, [selectedMunicipio, initialValues?.municipio])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Estado</Label>
          <Select
            value={selectedEstado}
            onValueChange={(value) => {
              setSelectedEstado(value)
              setValue(`${name}.estado`, value)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un estado" />
            </SelectTrigger>
            <SelectContent>
              {estados.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Municipio</Label>
          <Select
            value={selectedMunicipio}
            onValueChange={(value) => {
              setSelectedMunicipio(value)
              setValue(`${name}.municipio`, value)
            }}
            disabled={!selectedEstado}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un municipio" />
            </SelectTrigger>
            <SelectContent>
              {municipios.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Parroquia</Label>
          <Select
            value={selectedParroquia}
            onValueChange={(value) => {
              setSelectedParroquia(value)
              setValue(`${name}.parroquia`, value)
            }}
            disabled={!selectedMunicipio}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione una parroquia" />
            </SelectTrigger>
            <SelectContent>
              {parroquias.map((parroquia) => (
                <SelectItem key={parroquia} value={parroquia}>
                  {parroquia}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>{label}</Label>
        <Textarea
          value={watch(`${name}.direccion`) || ""}
          onChange={(e) => setValue(`${name}.direccion`, e.target.value)}
          placeholder="Ingrese la dirección detallada (calle, número, edificio, piso, etc.)"
        />
      </div>
    </div>
  )
} 