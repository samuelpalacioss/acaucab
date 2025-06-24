"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Banknote, Smartphone, Award, ArrowRight, ArrowLeft, Eye } from "lucide-react";
import { TarjetaForm } from "../steps/tarjeta-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderSummaryCard from "./order-summary-card";
import { Separator } from "@radix-ui/react-select";
import { CarritoItemType } from "@/lib/schemas";

type PaymentMethod = "tarjeta" | "efectivo" | "pagoMovil" | "puntos";

interface PaymentDetails {
  // Tarjeta properties matching TarjetaDetails
  nombreTitular?: string;
  numeroTarjeta?: string;
  fechaExpiracion?: string;
  // Efectivo properties
  cashReceived?: number;
  cashChange?: number;
  // Pago móvil properties
  phoneNumber?: string;
  confirmationCode?: string;
  // Puntos properties
  customerId?: string;
  pointsToUse?: number;
  // Common property
  amountPaid?: number;
}

/** Interfaz para un pago existente */
interface ExistingPayment {
  method: PaymentMethod;
  details: PaymentDetails;
}

interface PaymentViewProps {
  items: CarritoItemType[];
  total: number;
  /** Total original de la compra (para mostrar correctamente en order summary) */
  originalTotal?: number;
  /** Monto ya pagado en transacciones anteriores */
  amountPaid?: number;
  /** Pagos existentes para mostrar botón condicional */
  existingPayments?: ExistingPayment[];
  onComplete: (paymentMethod: PaymentMethod, details: PaymentDetails) => void;
  onCancel: () => void;
  /** Callback para ir al resumen de pagos */
  onViewSummary?: () => void;
}

export default function PaymentView({
  items,
  total,
  originalTotal,
  amountPaid = 0,
  existingPayments,
  onComplete,
  onCancel,
  onViewSummary,
}: PaymentViewProps) {
  const [selectedTab, setSelectedTab] = useState<PaymentMethod>("tarjeta");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("efectivo");
  const [cashReceived, setCashReceived] = useState("");
  const [denomination, setDenomination] = useState<"dolares" | "euros" | "bolivares">("bolivares");

  // Calculate cash change
  const cashReceivedNum = Number.parseFloat(cashReceived) || 0;
  const cashChange = cashReceivedNum > total ? cashReceivedNum - total : 0;

  // Card payment state
  const [cardData, setCardData] = useState<any>({});
  const [isCardValid, setIsCardValid] = useState(false);
  const [cardAmount, setCardAmount] = useState<number | string>("");

  // Mobile payment state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("0424");
  const [confirmationCode, setConfirmationCode] = useState("");

  // Points payment state
  const [customerId, setCustomerId] = useState("");
  const [pointsAvailable, setPointsAvailable] = useState(0);
  const [pointsToUse, setPointsToUse] = useState(0);

  // Validation functions
  const isCardAmountValid = () => {
    const amount = typeof cardAmount === "number" ? cardAmount : parseFloat(cardAmount.toString());
    return !cardAmount || (amount > 0 && amount <= total);
  };

  const isCashAmountValid = () => {
    return !cashReceived || (cashReceivedNum > 0 && cashReceivedNum <= total);
  };

  const isPointsAmountValid = () => {
    //  tasa BCV
    const pointsInDollars = pointsToUse / 100;
    return pointsToUse === 0 || (pointsToUse > 0 && pointsInDollars <= total);
  };

  const isFormValid = () => {
    switch (selectedTab) {
      case "tarjeta":
        return isCardValid && isCardAmountValid();
      case "efectivo":
        return isCashAmountValid() && cashReceivedNum > 0;
      case "puntos":
        return isPointsAmountValid() && pointsToUse > 0;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    let details: PaymentDetails = {};
    let amountPaid = 0;

    switch (selectedTab) {
      case "tarjeta":
        details = {
          nombreTitular: cardData.nombreTitular,
          numeroTarjeta: cardData.numeroTarjeta?.replace(/\s/g, "") || "", // Remove spaces
          fechaExpiracion: cardData.fechaExpiracion,
        };
        amountPaid = typeof cardAmount === "number" ? cardAmount : total;
        break;
      case "efectivo":
        const received = Number.parseFloat(cashReceived);
        details = { cashReceived: received, cashChange: cashChange };
        amountPaid = Math.min(received, total);
        break;
      case "pagoMovil":
        details = { phoneNumber, confirmationCode };
        amountPaid = total; // Pago móvil paga el total
        break;
      case "puntos":
        details = { customerId, pointsToUse };
        amountPaid = pointsToUse / 100; // Asumiendo 100 puntos = 1$
        break;
    }

    onComplete(selectedTab, { ...details, amountPaid });
  };

  // Mock function to simulate fetching customer points
  const fetchCustomerPoints = () => {
    if (customerId.trim()) {
      // Simulate API call
      setTimeout(() => {
        const mockPoints = Math.floor(Math.random() * 5000) + 1000;
        setPointsAvailable(mockPoints);
        // Set default points to use (convert from total)
        const defaultPointsToUse = Math.min(mockPoints, Math.floor(total * 100));
        setPointsToUse(defaultPointsToUse);
      }, 500);
    }
  };

  // Calculate cart summary
  const subtotal = total / 1.16;
  const iva = total - subtotal;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  /** Funciones estables para evitar bucles infinitos en TarjetaForm */
  const handleCardDataChange = useCallback((data: any) => {
    setCardData(data);
  }, []);

  const handleCardValidationChange = useCallback((isValid: boolean) => {
    setIsCardValid(isValid);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onCancel} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
          </Button>
          <h1 className="text-2xl font-bold">Método de pago</h1>
        </div>

        {/** Botón condicional para ver resumen de pagos si ya hay pagos existentes */}
        {existingPayments && existingPayments.length > 0 && onViewSummary && (
          <Button variant="ghost" onClick={onViewSummary} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Ver resumen de pagos ({existingPayments.length})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs
                defaultValue="tarjeta"
                value={selectedTab}
                onValueChange={(value) => setSelectedTab(value as PaymentMethod)}
                className="w-full"
              >
                <TabsList className="flex w-full mb-6 bg-gray-100 rounded-lg p-1 min-h-[64px]">
                  <TabsTrigger
                    value="tarjeta"
                    className="
                      flex-1 flex flex-col items-center justify-center gap-2 py-2 text-base
                      data-[state=active]:bg-transparent
                      data-[state=active]:shadow-none
                      data-[state=active]:border-none
                      data-[state=active]:py-2
                      transition
                    "
                  >
                    <CreditCard className="h-6 w-6" />
                    <span>Tarjeta</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="efectivo"
                    className="
                    flex-1 flex flex-col items-center justify-center gap-2 py-2 text-base
                    data-[state=active]:bg-transparent
                    data-[state=active]:shadow-none
                    data-[state=active]:border-none
                    data-[state=active]:py-2
                    transition
                  "
                  >
                    <Banknote className="h-6 w-6 mb-0" />
                    <span>Efectivo</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="puntos"
                    className="
                    flex-1 flex flex-col items-center justify-center gap-2 py-2 text-base
                    data-[state=active]:bg-transparent
                    data-[state=active]:shadow-none
                    data-[state=active]:border-none
                    data-[state=active]:py-2
                    transition
                  "
                  >
                    <Award className="h-6 w-6 mb-0" />
                    <span>Puntos</span>
                  </TabsTrigger>
                </TabsList>

                <div className="space-y-6">
                  <TabsContent value="tarjeta" className="space-y-4">
                    <TarjetaForm
                      onDataChange={handleCardDataChange}
                      onValidationChange={handleCardValidationChange}
                    />
                    <div className="space-y-2">
                      <Label htmlFor="cardAmount">Monto a pagar</Label>
                      <Input
                        id="cardAmount"
                        type="number"
                        min="0.01"
                        max={total}
                        step="0.01"
                        placeholder={total.toFixed(2)}
                        value={cardAmount}
                        onChange={(e) =>
                          setCardAmount(e.target.value ? Number(e.target.value) : "")
                        }
                        className={!isCardAmountValid() ? "border-red-500" : ""}
                      />
                      {!isCardAmountValid() && cardAmount && (
                        <p className="text-sm text-red-500">
                          El monto no puede ser mayor al total (${total.toFixed(2)})
                        </p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="efectivo" className="space-y-4">
                    <div className="flex gap-4 items-end">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="denomination">Denominación</Label>
                        <Select
                          value={denomination}
                          onValueChange={(value: "bolivares" | "dolares" | "euros") =>
                            setDenomination(value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione la denominación" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dolares">Dólares</SelectItem>
                            <SelectItem value="euros">Euros</SelectItem>
                            <SelectItem value="bolivares">Bolívares</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="cashReceived">Monto recibido</Label>
                        <Input
                          id="cashReceived"
                          type="number"
                          min={0.01}
                          max={total}
                          step="0.01"
                          placeholder={`${total.toFixed(2)}`}
                          value={cashReceived}
                          onChange={(e) => setCashReceived(e.target.value)}
                          className={!isCashAmountValid() ? "border-red-500" : ""}
                          required
                        />
                        {!isCashAmountValid() && cashReceived && (
                          <p className="text-sm text-red-500">
                            El monto no puede ser mayor al total (${total.toFixed(2)})
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between">
                        <span>Recibido en efectivo:</span>
                        <span>${(Number.parseFloat(cashReceived) || 0).toFixed(2)}</span>
                      </div>
                      <hr className="my-2 border-t border-gray-200" />
                      {Number.parseFloat(cashReceived) > 0 &&
                        amountPaid + Number.parseFloat(cashReceived) > (originalTotal || total) && (
                          <div className="flex justify-between font-bold text-green-600">
                            <span>Cambio:</span>
                            <span>
                              $
                              {(
                                amountPaid +
                                Number.parseFloat(cashReceived) -
                                (originalTotal || total)
                              ).toFixed(2)}
                            </span>
                          </div>
                        )}
                      {Number.parseFloat(cashReceived) > 0 &&
                        amountPaid + Number.parseFloat(cashReceived) < (originalTotal || total) && (
                          <div className="flex justify-between font-bold text-red-600">
                            <span>Faltaría por pagar:</span>
                            <span>
                              $
                              {(
                                (originalTotal || total) -
                                (amountPaid + Number.parseFloat(cashReceived))
                              ).toFixed(2)}
                            </span>
                          </div>
                        )}
                    </div>
                  </TabsContent>

                  <TabsContent value="puntos" className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md text-sm mb-4">
                      <p className="font-medium">Equivalencia de puntos: 1 punto = 1 Bs.</p>
                      <p>Tasa BCV: 1$ = 100 Bs.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pointsToUse">Puntos a utilizar</Label>
                      <Input
                        id="pointsToUse"
                        type="number"
                        min={0}
                        max={total * 100}
                        value={pointsToUse || ""}
                        onChange={(e) => {
                          const value = Math.min(Number(e.target.value) || 0, total * 100);
                          setPointsToUse(value);
                        }}
                        className={!isPointsAmountValid() ? "border-red-500" : ""}
                        placeholder="Ingrese la cantidad de puntos"
                        required
                      />
                      {!isPointsAmountValid() && pointsToUse > 0 && (
                        <p className="text-sm text-red-500">
                          Los puntos no pueden exceder el total (máximo {(total * 100).toFixed(0)}{" "}
                          puntos)
                        </p>
                      )}
                    </div>

                    {pointsToUse > 0 && (
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="flex justify-between">
                          <span>Total a pagar:</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Descuento en puntos:</span>
                          <span>
                            -{pointsToUse.toFixed(2)} Bs. (${(pointsToUse / 100).toFixed(2)})
                          </span>
                        </div>
                        <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                          <span>Total final:</span>
                          <span>${(total - pointsToUse / 100).toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <Button
                    type="button"
                    className="w-full mt-6"
                    disabled={!isFormValid()}
                    onClick={handleSubmit}
                  >
                    Completar pago <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <OrderSummaryCard
            items={items}
            total={total}
            originalTotal={originalTotal}
            amountPaid={amountPaid}
          />
        </div>
      </div>
    </div>
  );
}
