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

interface SavedPaymentMethodProps {
  cardType: "visa" | "mastercard" | "amex";
  lastFourDigits: string;
  cardholderName: string;
  expiryDate: string;
  isDefault?: boolean;
}

// Esquema para validación del formulario de tarjeta
const paymentFormSchema = z.object({
  nombreTitular: z.string().min(3, "Ingrese el nombre completo del titular"),
  numeroTarjeta: z.string().min(16, "Ingrese un número de tarjeta válido"),
  fechaExpiracion: z.string().min(5, "Ingrese una fecha válida"),
  codigoSeguridad: z.string().min(3, "Ingrese un código de seguridad válido"),
});

// Datos de ejemplo de tarjetas guardadas
const savedCards = [
  {
    id: "1",
    cardType: "visa" as const,
    lastFourDigits: "4242",
    cardholderName: "Juan Pérez",
    expiryDate: "04/26",
    isDefault: true,
  },
  {
    id: "2",
    cardType: "mastercard" as const,
    lastFourDigits: "5678",
    cardholderName: "Juan Pérez",
    expiryDate: "08/25",
    isDefault: false,
  },
  {
    id: "3",
    cardType: "amex" as const,
    lastFourDigits: "9012",
    cardholderName: "Juan Pérez",
    expiryDate: "12/24",
    isDefault: false,
  },
];

export default function SavedPaymentMethod({
  cardType: initialCardType,
  lastFourDigits: initialLastFourDigits,
  cardholderName: initialCardholderName,
  expiryDate: initialExpiryDate,
  isDefault = true,
}: SavedPaymentMethodProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState("1");
  const [selectedCard, setSelectedCard] = useState({
    cardType: initialCardType,
    lastFourDigits: initialLastFourDigits,
    cardholderName: initialCardholderName,
    expiryDate: initialExpiryDate,
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
        cardholderName: newSelectedCard.cardholderName,
        expiryDate: newSelectedCard.expiryDate,
      });
    }
    setIsExpanded(false);
  };

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
              <div className="pl-4">Nombre en tarjeta</div>
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
                  <div className="pl-4 text-sm text-muted-foreground">{card.cardholderName}</div>
                  <div className="text-sm text-muted-foreground">{card.expiryDate}</div>
                </label>
              </div>
            ))}
          </RadioGroup>

          <div className="px-4 mt-4 space-y-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowNewCardForm(!showNewCardForm)}
            >
              <Plus className="h-4 w-4" />
              Agregar una nueva tarjeta
            </Button>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsExpanded(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleConfirm}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showNewCardForm && (
        <div className="mt-4">
          <PaymentForm />
        </div>
      )}
    </div>
  );
}
