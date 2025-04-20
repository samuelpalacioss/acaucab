"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { PaymentMethodsBanner } from "@/components/payment-methods-banner";

interface MetodosPagoFormProps {
  maxWidth?: string;
}

export function MetodosPagoForm({ maxWidth = "max-w-2xl" }: MetodosPagoFormProps) {
  const { control } = useFormContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Información de Tarjeta</h2>
        <div className={`space-y-6 ${maxWidth}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="nombreTitular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Titular</FormLabel>
                  <FormControl>
                    <Input placeholder="Como aparece en la tarjeta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="numeroTarjeta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Tarjeta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="fechaExpiracion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Expiración</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MM/AA"
                      maxLength={5}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        let formatted = value;
                        if (value.length > 2) {
                          formatted = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="codigoSeguridad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Seguridad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CVV"
                      maxLength={4}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
