"use client"

import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

const metodosPago = [
  { id: "transferencia", label: "Transferencia Bancaria" },
  { id: "efectivo", label: "Efectivo" },
  { id: "tarjeta", label: "Tarjeta de Crédito/Débito" },
  { id: "paypal", label: "PayPal" },
  { id: "zelle", label: "Zelle" },
  { id: "cripto", label: "Criptomonedas" },
]

export function MetodosPagoForm() {
  const { control } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Métodos de Pago</h2>
      <p className="text-sm text-muted-foreground">Seleccione los métodos de pago que desea utilizar</p>

      <FormField
        control={control}
        name="metodosPago"
        render={() => (
          <FormItem>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {metodosPago.map((metodo) => (
                <FormField
                  key={metodo.id}
                  control={control}
                  name="metodosPago"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={metodo.id}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(metodo.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || []
                              return checked
                                ? field.onChange([...currentValue, metodo.id])
                                : field.onChange(currentValue.filter((value: string) => value !== metodo.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{metodo.label}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
