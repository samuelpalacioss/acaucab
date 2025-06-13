"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Banknote, Smartphone, Award, ArrowRight, ArrowLeft } from "lucide-react";
import { TarjetaForm } from "../steps/tarjeta-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaymentMethod = "tarjeta" | "efectivo" | "pagoMovil" | "puntos";

interface PaymentDetails {
  cardNumber?: string;
  cardExpiry?: string;
  cardName?: string;
  cashReceived?: number;
  cashChange?: number;
  phoneNumber?: string;
  confirmationCode?: string;
  customerId?: string;
  pointsToUse?: number;
}

interface PaymentViewItem {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  brand: string;
  imageSrc: string;
  category: string;
}

interface PaymentViewProps {
  items: PaymentViewItem[];
  total: number;
  onComplete: (paymentMethod: PaymentMethod, details: PaymentDetails) => void;
  onCancel: () => void;
}

export default function PaymentView({ items, total, onComplete, onCancel }: PaymentViewProps) {
  const [selectedTab, setSelectedTab] = useState<PaymentMethod>("tarjeta");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("efectivo");
  const [cashReceived, setCashReceived] = useState("");
  const [denomination, setDenomination] = useState<"dolares" | "euros" | "bolivares">("bolivares");

  // Calculate cash change
  const cashChange =
    Number.parseFloat(cashReceived) > 0 ? Number.parseFloat(cashReceived) - total : 0;

  // Card payment state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Mobile payment state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("0424");
  const [confirmationCode, setConfirmationCode] = useState("");

  // Points payment state
  const [customerId, setCustomerId] = useState("");
  const [pointsAvailable, setPointsAvailable] = useState(0);
  const [pointsToUse, setPointsToUse] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let details: PaymentDetails = {};

    switch (selectedTab) {
      case "tarjeta":
        details = { cardNumber, cardExpiry, cardName };
        break;
      case "efectivo":
        details = { cashReceived: Number.parseFloat(cashReceived), cashChange };
        break;
      case "pagoMovil":
        details = { phoneNumber, confirmationCode };
        break;
      case "puntos":
        details = { customerId, pointsToUse };
        break;
    }

    onComplete(selectedTab, details);
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
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onCancel} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        <h1 className="text-2xl font-bold">Método de pago</h1>
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
                    value="pagoMovil"
                    className="
                    flex-1 flex flex-col items-center justify-center gap-2 py-2 text-base
                    data-[state=active]:bg-transparent
                    data-[state=active]:shadow-none
                    data-[state=active]:border-none
                    data-[state=active]:py-2
                    transition
                  "
                  >
                    <Smartphone className="h-6 w-6 mb-0" />
                    <span>Pago móvil</span>
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <TabsContent value="tarjeta" className="space-y-4">
                    <TarjetaForm />
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
                          step="0.01"
                          placeholder={`${total.toFixed(2)}`}
                          value={cashReceived}
                          onChange={(e) => setCashReceived(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recibido:</span>
                        <span>${(Number.parseFloat(cashReceived) || 0).toFixed(2)}</span>
                      </div>
                      {Number.parseFloat(cashReceived) > total && (
                        <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                          <span>Cambio:</span>
                          <span>${cashChange.toFixed(2)}</span>
                        </div>
                      )}
                      {Number.parseFloat(cashReceived) > 0 &&
                        Number.parseFloat(cashReceived) < total && (
                          <div className="flex justify-between font-bold mt-2 pt-2 border-t text-red-600">
                            <span>Falta por pagar:</span>
                            <span>${(total - Number.parseFloat(cashReceived)).toFixed(2)}</span>
                          </div>
                        )}
                    </div>
                  </TabsContent>

                  <TabsContent value="pagoMovil" className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md text-sm mb-4">
                      <p>
                        1. El cliente debe realizar la transferencia al número{" "}
                        <strong>0414-1234567</strong>
                      </p>
                      <p>2. Ingrese el número del cliente y el código de confirmación recibido</p>
                      <p>
                        3. Verifique que el monto transferido sea{" "}
                        <strong>${total.toFixed(2)}</strong>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Número de teléfono</Label>
                      <div className="flex gap-2">
                        <Select value={phonePrefix} onValueChange={setPhonePrefix}>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Prefijo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0424">0424</SelectItem>
                            <SelectItem value="0414">0414</SelectItem>
                            <SelectItem value="0412">0412</SelectItem>
                            <SelectItem value="0416">0416</SelectItem>
                            <SelectItem value="0426">0426</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="phoneNumber"
                          placeholder="1234567"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 7);
                            setPhoneNumber(value);
                          }}
                          maxLength={7}
                          required
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmationCode">
                        Últimos 6 dígitos del número de referencia
                      </Label>
                      <Input
                        id="confirmationCode"
                        placeholder="Últimos 6 dígitos"
                        value={confirmationCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                          setConfirmationCode(value);
                        }}
                        maxLength={6}
                        required
                      />
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
                        placeholder="Ingrese la cantidad de puntos"
                        required
                      />
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

                  <Button type="submit" className="w-full mt-6">
                    Completar pago <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Productos ({itemCount})</span>
                  <span>{items.length} items</span>
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${(total - total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (8%)</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
