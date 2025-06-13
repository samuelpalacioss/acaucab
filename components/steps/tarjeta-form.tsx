"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { PaymentMethodsBanner } from "@/components/payment-methods-banner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the form schema
const formSchema = z.object({
  nombreTitular: z.string().min(1, "El nombre del titular es requerido"),
  numeroTarjeta: z.string().min(19, "El número de tarjeta debe tener 16 dígitos"),
  fechaExpiracion: z.string().min(5, "La fecha de expiración es requerida"),
  codigoSeguridad: z.string().min(3, "El código de seguridad es requerido"),
});

interface TarjetaFormProps {
  maxWidth?: string;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
}

export function TarjetaForm({ maxWidth = "max-w-2xl", onSubmit }: TarjetaFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreTitular: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      codigoSeguridad: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-6">Información de Tarjeta</h2>
          <div className={`space-y-6 ${maxWidth}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
      </form>
    </FormProvider>
  );
}
