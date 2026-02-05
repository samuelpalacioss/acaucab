"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Plus, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaymentForm, { PaymentFormData, paymentFormSchema } from "./payment-form";
import { toast } from "@/hooks/use-toast";

interface DialogAddInfoCardProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
}

export default function DialogAddInfoCard({ onSubmit }: DialogAddInfoCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

   // Local form instance for this dialog,
   // uses the same schema and defaults as the main checkout page
  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    mode: "onChange",
    defaultValues: {
      nombreTitular: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      codigoSeguridad: "",
      tipoTarjeta: "credito",
      banco: "",
    },
  });

  const handleFormSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setDialogOpen(false);
      setIsSubmitting(false);
      toast({
        title: "Éxito",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span>Tarjeta agregada exitosamente.</span>
          </div>
        ),
      });
    } catch (error) {
      console.error("Failed to save card:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la tarjeta. Intente de nuevo.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar una nueva tarjeta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>Agregar nueva tarjeta</DialogTitle>
            <CreditCard className="h-5 w-5" />
          </div>
        </DialogHeader>

        <PaymentForm
          form={paymentForm}
          showHeader={true}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          context="dialog"
        />
      </DialogContent>
    </Dialog>
  );
}
