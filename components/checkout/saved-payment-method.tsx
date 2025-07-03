import { useState } from "react";
import { CreditCard, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import PaymentForm from "./payment-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import DialogAddInfoCard from "./dialog-add-info-card";

export type SavedCard = {
  id: string;
  cardType: "visa" | "mastercard" | "amex";
  lastFourDigits: string;
  expiryDate: string;
  isDefault?: boolean;
};

interface SavedPaymentMethodProps {
  initialCards: SavedCard[];
  onAddNewCard: () => void;
}

// Esquema para validación del formulario de tarjeta
const paymentFormSchema = z.object({
  nombreTitular: z.string().min(3, "Ingrese el nombre completo del titular"),
  numeroTarjeta: z.string().min(16, "Ingrese un número de tarjeta válido"),
  fechaExpiracion: z.string().min(5, "Ingrese una fecha válida"),
  codigoSeguridad: z.string().min(3, "Ingrese un código de seguridad válido"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export const detectCardType = (cardNumber: string): "visa" | "mastercard" | "amex" => {
  const cleanNumber = cardNumber.replace(/\D/g, "");

  // American Express: comienza con 34 o 37
  if (/^3[47]/.test(cleanNumber)) {
    return "amex";
  }

  // Mastercard: comienza con 51-55 o 2221-2720
  if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]2[0-1]/.test(cleanNumber)) {
    return "mastercard";
  }

  // Visa: comienza con 4
  if (/^4/.test(cleanNumber)) {
    return "visa";
  }

  return "visa"; // Default fallback
};

// Mock de una función que guarda la tarjeta en la "BD"
const saveCardToDatabase = async (cardData: any) => {
  // ... existing code ...
};

export default function SavedPaymentMethod({
  initialCards,
  onAddNewCard,
}: SavedPaymentMethodProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedCards, setSavedCards] = useState(initialCards);
  const [selectedCardId, setSelectedCardId] = useState(
    initialCards.find((c) => c.isDefault)?.id ?? initialCards[0]?.id ?? ""
  );

  const [selectedCard, setSelectedCard] = useState(() => {
    const defaultCard = initialCards.find((c) => c.isDefault) ?? initialCards[0];
    return defaultCard
      ? {
          cardType: defaultCard.cardType,
          lastFourDigits: defaultCard.lastFourDigits,
          expiryDate: defaultCard.expiryDate,
        }
      : null;
  });

  const getCardTypeText = (type: "visa" | "mastercard" | "amex") => {
    switch (type) {
      case "visa":
        return "Visa";
      case "mastercard":
        return "Mastercard";
      case "amex":
        return "American Express";
      default:
        return "Tarjeta";
    }
  };

  const handleConfirm = () => {
    const newSelectedCard = savedCards.find((card) => card.id === selectedCardId);
    if (newSelectedCard) {
      setSelectedCard({
        cardType: newSelectedCard.cardType,
        lastFourDigits: newSelectedCard.lastFourDigits,
        expiryDate: newSelectedCard.expiryDate,
      });
    }
    setIsExpanded(false);
  };

  const handleSaveNewCard = async (data: PaymentFormValues) => {
    console.log("Nueva tarjeta guardada:", data);

    const newCard = {
      id: crypto.randomUUID(),
      cardType: detectCardType(data.numeroTarjeta),
      lastFourDigits: data.numeroTarjeta.slice(-4),
      expiryDate: data.fechaExpiracion,
      isDefault: false,
    };

    setSavedCards((prevCards) => [...prevCards, newCard]);
    setSelectedCardId(newCard.id);

    await saveCardToDatabase(data);
    toast({
      title: "Éxito",
      description: "La nueva tarjeta ha sido guardada.",
      variant: "default",
    });
    // Aquí podrías cerrar el modal si es necesario
  };

  if (!selectedCard) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6">
        <p className="mb-4">No tienes métodos de pago guardados.</p>
        <Button onClick={onAddNewCard}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Tarjeta
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2">
        <h2 className="text-lg font-semibold">
          Pagando con {getCardTypeText(selectedCard.cardType)} terminada en{" "}
          {selectedCard.lastFourDigits}{" "}
        </h2>
        {!isExpanded && (
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(true)}>
            Cambiar
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-2">
          <div className="px-4">
            <div className="grid grid-cols-[48px_1fr_200px_100px] text-sm text-muted-foreground mb-2">
              <div></div>
              <div></div>
              <div>Expira el</div>
            </div>
            <Separator className="my-2" />
          </div>

          <RadioGroup
            defaultValue={selectedCardId}
            onValueChange={setSelectedCardId}
            className="space-y-1"
          >
            {savedCards.map((card) => (
              <div key={card.id} className="flex items-center py-3 hover:bg-accent/50 rounded-lg">
                <RadioGroupItem value={card.id} id={`card-${card.id}`} className="ml-4" />
                <label
                  htmlFor={`card-${card.id}`}
                  className="grid grid-cols-[48px_1fr_200px_100px] flex-1 items-center cursor-pointer pr-4"
                >
                  <div className="flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center">
                    <p>
                      <span className="font-semibold">{getCardTypeText(card.cardType)}</span>{" "}
                      terminada en {card.lastFourDigits}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">{card.expiryDate}</div>
                </label>
              </div>
            ))}
          </RadioGroup>

          <div className="px-4 mt-4 space-y-4">
            <DialogAddInfoCard onSubmit={handleSaveNewCard} />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsExpanded(false);
                }}
              >
                Cancelar
              </Button>
              <Button size="sm" onClick={handleConfirm}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
