"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { PaymentMethodsBanner } from "@/components/payment-methods-banner";
import { DialogClose } from "@/components/ui/dialog";

export const paymentFormSchema = z.object({
  nombreTitular: z.string().min(1, "El nombre es requerido"),
  numeroTarjeta: z.string().refine((val) => val.replace(/\s/g, "").length === 16, {
    message: "El número de tarjeta debe tener 16 dígitos",
  }),
  fechaExpiracion: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "El formato debe ser MM/AA")
    .refine(
      (val) => {
        const [monthStr, yearStr] = val.split("/");
        if (!monthStr || !yearStr) return false;

        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        const cardYear = 2000 + year;

        if (cardYear < currentYear) return false;
        if (cardYear === currentYear && month < currentMonth) return false;
        if (cardYear > currentYear + 5) return false;

        return true;
      },
      {
        message: "La tarjeta está expirada o la fecha es inválida",
      }
    ),
  codigoSeguridad: z
    .string()
    .min(3, "El CVV debe tener 3-4 dígitos")
    .max(4, "El CVV debe tener 3-4 dígitos"),
  tipoTarjeta: z.enum(["credito", "debito"]),
});

export type PaymentFormData = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  form: UseFormReturn<PaymentFormData>;
  maxWidth?: string;
  showHeader?: boolean;
  onSubmit: (data: PaymentFormData) => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
  context?: "page" | "dialog";
}

export default function PaymentForm({
  form,
  maxWidth = "max-w-2xl",
  showHeader = true,
  onSubmit,
  isSubmitting = false,
  onCancel,
  context = "page",
}: PaymentFormProps) {
  const { isValid } = form.formState;

  const handleSubmit = form.handleSubmit((data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  });

  return (
    <div>
      {showHeader && (
        <div>
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
              </div>
              <div className="flex gap-2">
                <PaymentMethodsBanner />
              </div>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="tipoTarjeta"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Tipo de Tarjeta</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="credito" />
                      </FormControl>
                      <FormLabel className="font-normal">Crédito</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="debito" />
                      </FormControl>
                      <FormLabel className="font-normal">Débito</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h3 className="text-lg font-semibold mb-4">Información de Tarjeta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

          <div className="flex justify-end gap-2 mt-6">
            {context === "dialog" && (
              <>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar tarjeta"}
                </Button>
              </>
            )}
            {context === "page" && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
