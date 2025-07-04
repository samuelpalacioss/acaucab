"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MapPin, Truck, Award } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddressModal from "@/components/checkout/address-modal";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentForm, {
  PaymentFormData,
  paymentFormSchema,
} from "@/components/checkout/payment-form";
import SavedPaymentMethod, {
  SavedCard,
  detectCardType,
} from "@/components/checkout/saved-payment-method";
import { useVentaStore } from "@/store/venta-store";
import { useUser } from "@/store/user-store";
import { useTasaStore } from "@/store/tasa-store";
import { SHIPPING_COST } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import { getPuntos } from "@/api/get-puntos";
import { getMetodosDePago, MetodoPagoCliente } from "@/api/get-cliente-metodos-pago";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { carrito } = useVentaStore();
  const { isAuthenticated, usuario } = useUser();
  const [userPoints, setUserPoints] = useState(0);
  const [pointsToApply, setPointsToApply] = useState<number | "">("");
  const [appliedPoints, setAppliedPoints] = useState(0);
  const { getTasa, fetchTasas, tasas } = useTasaStore();

  const tasaPunto = getTasa("PUNTO")?.monto_equivalencia || 1;
  const tasaDolar = getTasa("USD")?.monto_equivalencia;

  console.log("User object on checkout:", usuario);

  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<SavedCard | null>(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    mode: "onChange",
    defaultValues: {
      nombreTitular: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      codigoSeguridad: "",
      tipoTarjeta: "credito",
    },
  });

  useEffect(() => {
    // Initial fetch
    fetchTasas();

    // Set up polling every 5 minutes
    const intervalId = setInterval(() => {
      console.log("🔄 Refreshing exchange rates in cart...");
      fetchTasas();
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchTasas]);

  const fetchPaymentMethods = useCallback(async () => {
    if (usuario?.id) {
      try {
        const paymentMethods = await getMetodosDePago(usuario.id);
        if (paymentMethods) {
          const formattedCards: SavedCard[] = paymentMethods.map((pm: MetodoPagoCliente) => ({
            id: pm.id.toString(), // Assuming pm.id can be used as a unique key
            cardType: detectCardType(pm.numero_tarjeta.toString()),
            lastFourDigits: pm.numero_tarjeta.toString().slice(-4),
            expiryDate: pm.fecha_vencimiento,
            isDefault: false, // You might need logic to determine the default card
          }));
          setSavedCards(formattedCards);
          if (formattedCards.length > 0) {
            setSelectedCard(formattedCards[0]); // Select the first card by default
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar tus métodos de pago.",
          variant: "destructive",
        });
      }
    }
  }, [usuario?.id]);

  const fetchPoints = useCallback(async () => {
    if (usuario?.id) {
      try {
        const points = await getPuntos(usuario.id);
        setUserPoints(points ?? 0);
      } catch (error) {
        console.error("Failed to fetch points", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar tus puntos. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    }
  }, [usuario?.id]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPoints();
      fetchPaymentMethods();
    }
  }, [isAuthenticated, fetchPoints, fetchPaymentMethods]);

  const orderItems = carrito.map((item) => ({
    id: item.presentacion_id,
    name: `${item.nombre_cerveza} ${item.presentacion}`,
    price: item.precio,
    quantity: item.quantity,
    image: item.imagen ?? "/placeholder.svg", // Fallback to a placeholder image
  }));

  const subtotalInBs = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const ivaInBs = subtotalInBs * 0.16;
  const shippingInBs = SHIPPING_COST * (tasaDolar as number);
  const totalOrderInBs = subtotalInBs + ivaInBs + shippingInBs;
  const puntosAplicadosEnBs = appliedPoints * tasaPunto;
  const remainingTotalInBs = totalOrderInBs - puntosAplicadosEnBs;

  const handleApplyPoints = () => {
    const pointsValue = Number(pointsToApply);
    if (isNaN(pointsValue) || pointsValue <= 0 || !Number.isInteger(pointsValue)) {
      toast({
        title: "Cantidad Inválida",
        description: "Por favor, introduce un número entero y válido de puntos.",
        variant: "destructive",
      });
      return;
    }
    if (pointsValue > userPoints) {
      toast({
        title: "Puntos Insuficientes",
        description: "No tienes suficientes puntos para aplicar esta cantidad.",
        variant: "destructive",
      });
      return;
    }
    if (pointsValue * tasaPunto > totalOrderInBs) {
      toast({
        title: "Cantidad Excesiva",
        description: "No puedes aplicar más puntos que el total de la orden.",
        variant: "destructive",
      });
      return;
    }
    setAppliedPoints(pointsValue);
    setPointsToApply("");
    toast({
      title: "Puntos Aplicados",
      description: `${pointsValue} puntos han sido aplicados a tu orden.`,
    });
  };

  const logPaymentProcessing = () => {
    const { cliente: ventaCliente } = useVentaStore.getState();
    console.group("🛒 PAYMENT PROCESSING - Checkout");
    console.log(
      "👤 Cliente:",
      ventaCliente?.nombre_completo || ventaCliente?.denominacion_comercial || "No disponible"
    );
    console.log("🆔 ID Cliente:", usuario?.id || "N/A");
    console.log("🛍️ Items en carrito:", carrito.length);
    carrito.forEach((item, index) => {
      console.log(
        `   ${index + 1}. ${item.nombre_cerveza} x${item.quantity} - ${item.precio.toFixed(2)} Bs`
      );
    });

    console.log("💰 Totales:");
    console.log(`   - Subtotal: ${subtotalInBs.toFixed(2)} Bs`);
    console.log(`   - IVA (16%): ${ivaInBs.toFixed(2)} Bs`);
    console.log(`   - Envío: ${shippingInBs.toFixed(2)} Bs`);
    console.log(`   - Total: ${totalOrderInBs.toFixed(2)} Bs`);

    console.log("💳 Métodos de pago a procesar:");
    if (appliedPoints > 0) {
      console.log(
        `   - Puntos: ${appliedPoints} por un valor de ${puntosAplicadosEnBs.toFixed(2)} Bs`
      );
    }
    if (remainingTotalInBs > 0) {
      if (showNewCardForm) {
        console.log(`   - Nueva Tarjeta: Monto de ${remainingTotalInBs.toFixed(2)} Bs`);
      } else if (selectedCard) {
        console.log(
          `   - Tarjeta Guardada: terminada en ${
            selectedCard.lastFourDigits
          }, Monto de ${remainingTotalInBs.toFixed(2)} Bs`
        );
      }
    }
    console.groupEnd();
  };

  const handleRemovePoints = () => {
    setAppliedPoints(0);
    toast({
      title: "Puntos Eliminados",
      description: "Los puntos han sido eliminados de tu orden.",
    });
  };

  const handleProcessPayment = async (
    paymentData?: PaymentFormData | { cardId: string; lastFour: string }
  ) => {
    setIsSubmitting(true);

    let mainPaymentMethod: any = null;
    let pointsPaymentMethod: any = null;

    if (appliedPoints > 0) {
      pointsPaymentMethod = {
        method: "puntos",
        details: { pointsUsed: appliedPoints, amount: puntosAplicadosEnBs },
      };
      console.log("Processing points payment:", pointsPaymentMethod);
    }

    if (remainingTotalInBs > 0) {
      if (!paymentData) {
        toast({
          title: "Error de Pago",
          description: "No se proporcionaron los detalles del pago.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const paymentDetails =
        "cardId" in paymentData
          ? { cardId: paymentData.cardId, amount: remainingTotalInBs }
          : {
              nombreTitular: paymentData.nombreTitular,
              numeroTarjeta: paymentData.numeroTarjeta.replace(/\s/g, ""),
              fechaExpiracion: paymentData.fechaExpiracion,
              amount: remainingTotalInBs,
            };

      mainPaymentMethod = {
        method: "tarjetaCredito",
        details: paymentDetails,
      };

      if ("cardId" in paymentData) {
        console.log(
          `Processing saved card payment for card ending in ${paymentData.lastFour}:`,
          mainPaymentMethod
        );
      } else {
        console.log("Processing new card payment:", mainPaymentMethod);
        // Add the new card to saved cards
        const newCard: SavedCard = {
          id: crypto.randomUUID(),
          cardType: detectCardType(paymentData.numeroTarjeta),
          lastFourDigits: paymentData.numeroTarjeta.slice(-4),
          expiryDate: paymentData.fechaExpiracion,
          isDefault: savedCards.length === 0,
        };
        setSavedCards((prev) => [...prev, newCard]);
        setSelectedCard(newCard); // Select the newly added card
      }
    }

    logPaymentProcessing();

    // Simulate API call for payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Pago Exitoso",
      description: "Tu orden ha sido procesada correctamente.",
      variant: "default",
    });

    setIsSubmitting(false);
    setShowNewCardForm(false);
  };

  const handleFinalizeCheckout = () => {
    if (remainingTotalInBs > 0) {
      if (showNewCardForm) {
        paymentForm.handleSubmit(handleProcessPayment)();
      } else if (selectedCard) {
        handleProcessPayment({
          cardId: selectedCard.id,
          lastFour: selectedCard.lastFourDigits,
        });
      } else {
        toast({
          title: "Error de Pago",
          description: "Por favor, seleccione un método de pago.",
          variant: "destructive",
        });
      }
    } else if (appliedPoints > 0) {
      // Only points are used for payment
      handleProcessPayment();
    }
  };

  const handleCancel = () => {
    if (savedCards.length > 0) {
      setShowNewCardForm(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Acceso Requerido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Tienes que iniciar sesión para realizar el pago.</p>
            <Button asChild>
              <Link href="/login">Ir a Iniciar Sesión</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Carrito Vacío</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>No tienes artículos en tu carrito para proceder al pago.</p>
            <Button asChild>
              <Link href="/productos">Ver Productos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/carrito" className="text-md font-medium hover:underline">
        ← Volver al carrito
      </Link>

      <h1 className="text-2xl font-bold mt-6 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Address Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Dirección de Entrega</h2>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Juan Pérez</p>
                  <p className="text-sm text-muted-foreground">Av. Luis Roche, Los Palos Grandes</p>
                  <p className="text-sm text-muted-foreground">Caracas, Miranda, 1060</p>
                  <p className="text-sm text-muted-foreground">Teléfono: (0212) 555-7890</p>
                </div>
                <AddressModal isEditing={true}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </AddressModal>
              </div>
            </div>
          </div>

          {/* Shipping Method Section - More Compact */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <div>
                  <p className="font-medium">Envío Estándar (3-5 días hábiles)</p>
                </div>
              </div>
              <p className="font-medium">
                ${SHIPPING_COST.toFixed(2)}
                {tasaDolar && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({(SHIPPING_COST * tasaDolar).toFixed(2)} Bs)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Points/Gift Card Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Pagar con Puntos</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Tienes <span className="font-bold">{userPoints}</span> puntos disponibles.
                </p>
                {tasaPunto > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Cada punto equivale a {tasaPunto.toFixed(2)} Bs.
                  </p>
                )}
                {appliedPoints > 0 ? (
                  <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-3">
                    <p className="text-sm font-medium text-green-700">
                      Estás usando {appliedPoints} puntos en esta compra.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemovePoints}
                      className="text-red-500 hover:text-red-600"
                    >
                      Quitar
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-full">
                      <Label htmlFor="points" className="sr-only">
                        Puntos a aplicar
                      </Label>
                      <Input
                        id="points"
                        type="number"
                        placeholder="Introduce los puntos a usar"
                        value={pointsToApply}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9]/g, "");

                          if (numericValue === "") {
                            setPointsToApply("");
                            return;
                          }

                          let num = parseInt(numericValue, 10);
                          const maxPointsForOrder = Math.floor(totalOrderInBs / tasaPunto);

                          if (num > userPoints) num = userPoints;
                          if (num > maxPointsForOrder) num = maxPointsForOrder;

                          setPointsToApply(num);
                        }}
                        onKeyDown={(e) => {
                          // Prevent entering decimals or other non-integer characters
                          if ([".", ",", "e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        max={userPoints}
                        min={0}
                      />
                    </div>
                    <Button onClick={handleApplyPoints} disabled={Number(pointsToApply) <= 0}>
                      Aplicar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Section */}
          {remainingTotalInBs > 0 && (
            <Card>
              <CardContent className="p-4">
                {savedCards.length > 0 && !showNewCardForm ? (
                  <SavedPaymentMethod
                    initialCards={savedCards}
                    onAddNewCard={() => setShowNewCardForm(true)}
                    onCardSelect={setSelectedCard}
                    isSubmitting={isSubmitting}
                  />
                ) : (
                  <PaymentForm
                    form={paymentForm}
                    maxWidth="max-w-4xl"
                    onSubmit={handleProcessPayment}
                    isSubmitting={isSubmitting}
                    context="page"
                    onCancel={handleCancel}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="md:col-span-1">
          <OrderSummary
            orderItems={orderItems}
            puntosAplicados={puntosAplicadosEnBs}
            shippingCost={SHIPPING_COST}
            onFinalize={handleFinalizeCheckout}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
