"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MetodosPagoForm } from "@/components/steps/metodos-pago-form";
import { CreditCard } from "lucide-react";
import { PaymentMethodsBanner } from "@/components/payment-methods-banner";

const formSchema = z.object({
  nombreTitular: z.string().min(3, "Ingrese el nombre completo del titular"),
  numeroTarjeta: z.string().min(16, "Ingrese un número de tarjeta válido"),
  fechaExpiracion: z.string().min(5, "Ingrese una fecha válida"),
  codigoSeguridad: z.string().min(3, "Ingrese un código de seguridad válido"),
});

interface PaymentFormProps {
  maxWidth?: string;
}

export default function PaymentForm({ maxWidth = "max-w-2xl" }: PaymentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreTitular: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      codigoSeguridad: "",
    },
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Método de Pago</h2>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Tarjeta de Crédito/Débito</p>
            <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
          </div>
          <div className="flex gap-2">
            <PaymentMethodsBanner className="mt-4" />
          </div>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <MetodosPagoForm maxWidth={maxWidth} />
        </form>
      </Form>
    </div>
  );
}
