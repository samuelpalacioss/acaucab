"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useCallback, useRef } from "react";

// Define the form schema
const formSchema = z.object({
  nombreTitular: z.string().min(1, "El nombre del titular es requerido"),
  numeroTarjeta: z.string().min(19, "El número de tarjeta debe tener 16 dígitos"),
  fechaExpiracion: z
    .string()
    .min(5, "La fecha de expiración es requerida")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "El formato debe ser MM/AA")
    .refine(
      (val) => {
        const [monthStr, yearStr] = val.split("/");
        if (!monthStr || !yearStr) return false;

        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // 1-12

        const cardYear = 2000 + year;

        if (cardYear < currentYear) {
          return false; // Year en el pasado
        }

        if (cardYear === currentYear && month < currentMonth) {
          return false; // Mes en el year actual pero mes pasado
        }

        // Validar que no sea más de 5 años en el futuro
        if (cardYear > currentYear + 5) {
          return false; // Más de 5 años en el futuro
        }

        return true;
      },
      {
        message: "La tarjeta está expirada o la fecha es inválida",
      }
    ),
  codigoSeguridad: z.string().min(3, "El código de seguridad es requerido"),
});

interface TarjetaFormProps {
  maxWidth?: string;
  onDataChange?: (data: z.infer<typeof formSchema>) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function TarjetaForm({
  maxWidth = "max-w-2xl",
  onDataChange,
  onValidationChange,
}: TarjetaFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nombreTitular: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      codigoSeguridad: "",
    },
  });

  const { isValid } = form.formState;

  /** Referencias para evitar bucles infinitos */
  const lastDataRef = useRef<string>("");
  const lastValidRef = useRef<boolean>(false);

  /** Función estable para notificar cambios de datos */
  const notifyDataChange = useCallback(() => {
    if (onDataChange) {
      const currentData = form.getValues();
      const currentDataString = JSON.stringify(currentData);

      // Solo notificar si los datos realmente cambiaron
      if (currentDataString !== lastDataRef.current) {
        lastDataRef.current = currentDataString;
        onDataChange(currentData);
      }
    }
  }, [onDataChange, form]);

  /** Función estable para notificar cambios de validación */
  const notifyValidationChange = useCallback(() => {
    if (onValidationChange && isValid !== lastValidRef.current) {
      lastValidRef.current = isValid;
      onValidationChange(isValid);
    }
  }, [onValidationChange, isValid]);

  /** Suscripción a cambios del formulario */
  useEffect(() => {
    const subscription = form.watch(() => {
      notifyDataChange();
      notifyValidationChange();
    });

    // Notificar estado inicial
    notifyDataChange();
    notifyValidationChange();

    return () => subscription.unsubscribe();
  }, [form, notifyDataChange, notifyValidationChange]);

  // handleSubmit ya no es necesario - el submit se maneja desde el componente padre

  return (
    <FormProvider {...form}>
      <div className="space-y-8">
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
      </div>
    </FormProvider>
  );
}
