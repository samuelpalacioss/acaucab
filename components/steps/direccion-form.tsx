"use client"

import { DireccionFormal } from "@/components/direccion-formal"

interface DireccionFormProps {
  tipoPersona: "natural" | "juridica"
}

export function DireccionForm({ tipoPersona }: DireccionFormProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Información de Dirección</h2>
        <DireccionFormal tipoPersona={tipoPersona} />
      </div>
    </div>
  )
} 