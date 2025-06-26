"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Banknote,
  Smartphone,
  Award,
  ArrowRight,
  ArrowLeft,
  Eye,
  FileCheck,
  Calculator,
} from "lucide-react";
import { TarjetaForm } from "../steps/tarjeta-form";
import { BancoSelector, getBancoNombre } from "@/components/ui/banco-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import OrderSummaryCard from "./order-summary-card";
import { Separator } from "@radix-ui/react-select";
import { CarritoItemType } from "@/lib/schemas";
import type { EfectivoDetails, Currency } from "@/store/venta-store";
import { useTasaStore } from "@/store/tasa-store";
import { formatCurrency } from "@/lib/utils";

const denominationsMap = {
  bolivares: [1, 5, 10, 20, 50, 100, 200, 500],
  dolares: [1, 2, 5, 10, 20, 50, 100],
  euros: [1, 2, 5, 10, 20, 50, 100, 200],
};

const currencySymbols = {
  bolivares: "Bs",
  dolares: "$",
  euros: "€",
};

export type PaymentMethod = "tarjetaCredito" | "tarjetaDebito" | "efectivo" | "cheque" | "puntos";

type PaymentDetails = Record<string, any>;

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
  convertirADolar: (monto: number) => number | null;
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
  convertirADolar,
}: PaymentViewProps) {
  const [selectedTab, setSelectedTab] = useState<string>("tarjeta");
  const [cardType, setCardType] = useState<"credito" | "debito">("credito");
  const [cashReceived, setCashReceived] = useState("");
  const [denomination, setDenomination] = useState<Currency>("dolares");
  const [breakdown, setBreakdown] = useState<{ [value: string]: number }>({});

  const { getTasa } = useTasaStore();

  const getMontoEnDolares = (monto: number, moneda: Currency) => {
    if (moneda === "dolares") return monto;

    const tasaBs = getTasa("USD")?.monto_equivalencia;
    if (!tasaBs) return 0; // No se puede convertir sin la tasa base

    if (moneda === "bolivares") {
      return monto / tasaBs;
    }

    if (moneda === "euros") {
      const tasaEur = getTasa("EUR")?.monto_equivalencia;
      if (!tasaEur) return 0; // No se puede convertir de EUR a USD sin la tasa EUR->Bs
      const montoEnBs = monto * tasaEur;
      return montoEnBs / tasaBs;
    }

    return 0;
  };

  // Calculate cash change
  const cashReceivedNum = Number.parseFloat(cashReceived) || 0;
  const cashReceivedInUSD = getMontoEnDolares(cashReceivedNum, denomination);
  const totalInBs = total;

  // Card payment state
  const [cardData, setCardData] = useState<any>({});
  const [isCardValid, setIsCardValid] = useState(false);
  const [cardAmount, setCardAmount] = useState<number | string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  // Cheque payment state
  const [numeroCheque, setNumeroCheque] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [bancoCheque, setBancoCheque] = useState("");
  const [chequeAmount, setChequeAmount] = useState<number | string>("");

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
    if (!cardAmount) return true;
    const amount = typeof cardAmount === "number" ? cardAmount : parseFloat(cardAmount.toString());
    // Compare amounts in cents to avoid floating point issues
    const amountInCents = Math.round(amount * 100);
    const totalInCents = Math.round(totalInBs * 100);
    return amountInCents > 0 && amountInCents <= totalInCents;
  };

  const isBankSelected = () => {
    return selectedBank.length > 0;
  };

  const isCashAmountValid = () => {
    if (!cashReceived) return true;
    // Compare amounts in cents to avoid floating point issues
    const amountInCents = Math.round(cashReceivedInUSD * 100);
    const totalToCompareInUSD = convertirADolar(totalInBs) || 0;
    const totalInCents = Math.round(totalToCompareInUSD * 100);
    return amountInCents > 0 && amountInCents <= totalInCents;
  };

  const isChequeFormValid = () => {
    return numeroCheque.trim() !== "" && numeroCuenta.trim() !== "" && bancoCheque.trim() !== "";
  };

  const isChequeAmountValid = () => {
    if (!chequeAmount) return true;
    const amount =
      typeof chequeAmount === "number" ? chequeAmount : parseFloat(chequeAmount.toString());
    const amountInCents = Math.round(amount * 100);
    const totalInCents = Math.round(totalInBs * 100);
    return amountInCents > 0 && amountInCents <= totalInCents;
  };

  const isPointsAmountValid = () => {
    // Tasa: 1 punto = 1Bs.
    const totalInPoints = Math.round(totalInBs);
    return pointsToUse >= 0 && pointsToUse <= totalInPoints;
  };

  const isFormValid = () => {
    switch (selectedTab) {
      case "tarjeta":
        return isCardValid && isCardAmountValid() && isBankSelected();
      case "efectivo":
        return isCashAmountValid() && cashReceivedNum > 0;
      case "cheque":
        return isChequeFormValid() && isChequeAmountValid();
      case "puntos":
        return isPointsAmountValid() && pointsToUse > 0;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (!isFormValid()) {
      return;
    }

    let details: PaymentDetails = {};
    let amountPaid = 0;
    let paymentMethod: PaymentMethod;

    if (selectedTab === "tarjeta") {
      paymentMethod = cardType === "credito" ? "tarjetaCredito" : "tarjetaDebito";
    } else {
      paymentMethod = selectedTab as PaymentMethod;
    }

    switch (paymentMethod) {
      case "tarjetaCredito":
      case "tarjetaDebito":
        details = {
          nombreTitular: cardData.nombreTitular,
          numeroTarjeta: cardData.numeroTarjeta?.replace(/\s/g, "") || "", // Remove spaces
          fechaExpiracion: cardData.fechaExpiracion,
          banco: getBancoNombre(selectedBank),
        };
        amountPaid = parseFloat(
          (typeof cardAmount === "number" ? cardAmount : totalInBs).toFixed(2)
        );
        break;
      case "efectivo":
        details = {
          currency: denomination,
          breakdown: breakdown,
          amountInCurrency: cashReceivedNum,
        };
        const cashReceivedInBs = cashReceivedInUSD * (getTasa("USD")?.monto_equivalencia || 0);
        amountPaid = Math.min(cashReceivedInBs, totalInBs);
        break;
      case "cheque":
        details = { numeroCheque, numeroCuenta, banco: getBancoNombre(bancoCheque) };
        amountPaid =
          typeof chequeAmount === "number" && chequeAmount > 0 ? chequeAmount : totalInBs;
        break;
      case "puntos":
        details = { customerId, pointsToUse };
        amountPaid = pointsToUse; // Puntos son 1 a 1 con Bs
        break;
    }

    onComplete(paymentMethod, { ...details, amountPaid } as any);
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

  const handleAddDenomination = (amount: number) => {
    setCashReceived((prev) => (Number(prev || 0) + amount).toString());
    setBreakdown((prev) => ({
      ...prev,
      [amount.toString()]: (prev[amount.toString()] || 0) + 1,
    }));
  };

  const handleClearCash = () => {
    setCashReceived("");
    setBreakdown({});
  };

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
                onValueChange={(value) => setSelectedTab(value)}
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
                    value="cheque"
                    className="
                    flex-1 flex flex-col items-center justify-center gap-2 py-2 text-base
                    data-[state=active]:bg-transparent
                    data-[state=active]:shadow-none
                    data-[state=active]:border-none
                    data-[state=active]:py-2
                    transition
                  "
                  >
                    <FileCheck className="h-6 w-6 mb-0" />
                    <span>Cheque</span>
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

                <div className="space-y-6 max-w-2xl">
                  <TabsContent value="tarjeta" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tipo de Tarjeta</Label>
                      <RadioGroup
                        defaultValue="credito"
                        value={cardType}
                        onValueChange={(value: "credito" | "debito") => setCardType(value)}
                        className="flex items-center space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credito" id="credito" />
                          <Label htmlFor="credito">Crédito</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="debito" id="debito" />
                          <Label htmlFor="debito">Débito</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <TarjetaForm
                      onDataChange={handleCardDataChange}
                      onValidationChange={handleCardValidationChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankSelector">Banco Emisor</Label>
                        <BancoSelector
                          value={selectedBank}
                          onValueChange={setSelectedBank}
                          placeholder="Seleccione el banco"
                          className={submitted && !isBankSelected() ? "border-red-500" : ""}
                        />
                        {submitted && !isBankSelected() && (
                          <p className="text-sm text-red-500">Debe seleccionar un banco</p>
                        )}
                      </div>
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
                            El monto no puede ser mayor al restante por pagar (Bs {total.toFixed(2)}
                            )
                          </p>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="efectivo" className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="denomination">Denominación</Label>
                        <Select
                          value={denomination}
                          onValueChange={(value: Currency) => {
                            setDenomination(value);
                            setCashReceived(""); // Reset amount on currency change
                            setBreakdown({});
                          }}
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
                        <div className="h-5" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="cashReceived">Monto recibido</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="cashReceived"
                            type="number"
                            placeholder="Use la calculadora"
                            value={cashReceived}
                            readOnly
                            className={!isCashAmountValid() ? "border-red-500" : ""}
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="icon" className="shrink-0">
                                <Calculator className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Agregar Billetes/Monedas</p>
                                <div className="grid grid-cols-3 gap-2">
                                  {denominationsMap[denomination].map((value) => (
                                    <Button
                                      key={value}
                                      variant="outline"
                                      onClick={() => handleAddDenomination(value)}
                                      className="w-full"
                                    >
                                      {currencySymbols[denomination]} {value}
                                    </Button>
                                  ))}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={handleClearCash}
                                  className="w-full text-red-500 hover:text-red-600"
                                >
                                  Limpiar
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="h-5">
                          {!isCashAmountValid() && cashReceived && (
                            <p className="text-sm text-red-500">
                              El monto no puede ser mayor al restante por pagar (Bs{" "}
                              {total.toFixed(2)})
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between">
                        <span>Recibido en efectivo:</span>
                        <span>
                          {currencySymbols[denomination]} {cashReceivedNum.toFixed(2)} ($
                          {formatCurrency(cashReceivedInUSD)})
                        </span>
                      </div>
                      <hr className="my-2 border-t border-gray-200" />
                      {cashReceivedNum > 0 &&
                        amountPaid + cashReceivedInUSD < (originalTotal || total) && (
                          <div className="flex justify-between font-bold text-red-600">
                            <span>Faltaría por pagar:</span>
                            <span>
                              Bs
                              {(
                                (originalTotal || total) -
                                (amountPaid +
                                  cashReceivedInUSD * (getTasa("USD")?.monto_equivalencia || 0))
                              ).toFixed(2)}
                            </span>
                          </div>
                        )}
                    </div>
                  </TabsContent>

                  <TabsContent value="cheque" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="numeroCheque">Número de Cheque</Label>
                        <Input
                          id="numeroCheque"
                          value={numeroCheque}
                          onChange={(e) => setNumeroCheque(e.target.value)}
                          placeholder="000123456"
                          className={submitted && !numeroCheque.trim() ? "border-red-500" : ""}
                        />
                        {submitted && !numeroCheque.trim() && (
                          <p className="text-sm text-red-500">Campo requerido</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numeroCuenta">Número de Cuenta</Label>
                        <Input
                          id="numeroCuenta"
                          value={numeroCuenta}
                          onChange={(e) => setNumeroCuenta(e.target.value)}
                          placeholder="01020123456789012345"
                          className={submitted && !numeroCuenta.trim() ? "border-red-500" : ""}
                        />
                        {submitted && !numeroCuenta.trim() && (
                          <p className="text-sm text-red-500">Campo requerido</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bancoCheque">Banco Emisor</Label>
                      <BancoSelector
                        value={bancoCheque}
                        onValueChange={setBancoCheque}
                        placeholder="Seleccione el banco"
                        className={submitted && !bancoCheque.trim() ? "border-red-500" : ""}
                      />
                      {submitted && !bancoCheque.trim() && (
                        <p className="text-sm text-red-500">Debe seleccionar un banco</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chequeAmount">Monto del cheque</Label>
                      <Input
                        id="chequeAmount"
                        type="number"
                        min="0.01"
                        max={total}
                        step="0.01"
                        placeholder={total.toFixed(2)}
                        value={chequeAmount}
                        onChange={(e) =>
                          setChequeAmount(e.target.value ? Number(e.target.value) : "")
                        }
                        className={!isChequeAmountValid() ? "border-red-500" : ""}
                      />
                      {!isChequeAmountValid() && chequeAmount ? (
                        <p className="text-sm text-red-500">
                          El monto no puede ser mayor al restante por pagar (Bs {total.toFixed(2)})
                        </p>
                      ) : null}
                    </div>
                  </TabsContent>

                  <TabsContent value="puntos" className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md text-sm mb-4">
                      <p className="font-medium">Equivalencia de puntos: 1 punto = 1 Bs.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pointsToUse">Puntos a utilizar</Label>
                      <Input
                        id="pointsToUse"
                        type="number"
                        min={0}
                        max={total}
                        value={pointsToUse || ""}
                        onChange={(e) => {
                          const value = Math.min(Number(e.target.value) || 0, total);
                          setPointsToUse(value);
                        }}
                        className={!isPointsAmountValid() ? "border-red-500" : ""}
                        placeholder="Ingrese la cantidad de puntos"
                        required
                      />
                      {!isPointsAmountValid() && pointsToUse > 0 && (
                        <p className="text-sm text-red-500">
                          Los puntos no pueden exceder el restante por pagar (máx:{" "}
                          {total.toFixed(0)} puntos)
                        </p>
                      )}
                    </div>

                    {pointsToUse > 0 && (
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="flex justify-between">
                          <span>Total a pagar:</span>
                          <span>Bs {total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Descuento en puntos:</span>
                          <span>
                            -{pointsToUse.toFixed(2)} Bs. (
                            {formatCurrency(convertirADolar(pointsToUse))})
                          </span>
                        </div>
                        <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                          <span>Total final:</span>
                          <span>Bs {(total - pointsToUse).toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <Button
                    type="button"
                    className="w-full mt-6"
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
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
            convertirADolar={convertirADolar}
          />
        </div>
      </div>
    </div>
  );
}
