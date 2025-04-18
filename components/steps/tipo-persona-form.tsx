"use client"

import { useFormContext } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function TipoPersonaForm() {
  const { getValues, setValue, watch } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Seleccione el tipo de persona</h2>

      <RadioGroup
        defaultValue={getValues("tipoPersona")}
        onValueChange={(value) => setValue("tipoPersona", value)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <Card
          className={`cursor-pointer border-2 ${watch("tipoPersona") === "natural" ? "border-primary" : "border-muted"}`}
        >
          <CardContent className="p-6">
            <RadioGroupItem value="natural" id="natural" className="sr-only" />
            <Label htmlFor="natural" className="flex cursor-pointer flex-col items-center gap-2">
              <div className="text-lg font-medium">Persona Natural</div>
              <div className="text-sm text-muted-foreground">Registro para personas individuales</div>
            </Label>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer border-2 ${watch("tipoPersona") === "juridica" ? "border-primary" : "border-muted"}`}
        >
          <CardContent className="p-6">
            <RadioGroupItem value="juridica" id="juridica" className="sr-only" />
            <Label htmlFor="juridica" className="flex cursor-pointer flex-col items-center gap-2">
              <div className="text-lg font-medium">Persona Jurídica</div>
              <div className="text-sm text-muted-foreground">Registro para empresas y organizaciones</div>
            </Label>
          </CardContent>
        </Card>
      </RadioGroup>
    </div>
  )
}
