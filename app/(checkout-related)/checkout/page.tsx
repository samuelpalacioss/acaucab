"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, Truck, Award } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddressModal from "@/components/checkout/address-modal";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentForm, { PaymentFormData } from "@/components/checkout/payment-form";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CheckoutPage() {
  const [hasStoredPaymentMethod, setHasStoredPaymentMethod] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { carrito } = useVentaStore();
  const { isAuthenticated, usuario } = useUser();
  const [userPoints, setUserPoints] = useState(0);
  const [pointsToApply, setPointsToApply] = useState<number | "">("");
  const [appliedPoints, setAppliedPoints] = useState(0);
  const { getTasa, fetchTasas, tasas } = useTasaStore();

  const tasaPunto = getTasa("PUNTO")?.monto_equivalencia || 1;
  const tasaDolar = getTasa("USD")?.monto_equivalencia;
  const pointValueInDollars = tasaPunto / (tasaDolar ?? 1);

  console.log("User object on checkout:", usuario);

  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

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
    }
  }, [isAuthenticated, fetchPoints]);

  const orderItems = carrito.map((item) => ({
    id: item.presentacion_id,
    name: `${item.nombre_cerveza} ${item.presentacion}`,
    price: item.precio,
    quantity: item.quantity,
    image: item.imagen ?? "/placeholder.svg", // Fallback to a placeholder image
  }));

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const iva = subtotal * 0.16;
  const totalOrder = subtotal + iva + SHIPPING_COST;
  const remainingTotal = totalOrder - appliedPoints * pointValueInDollars;

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
    if (pointsValue > totalOrder) {
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

  const handleAddNewCard = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    console.log("Submitting new card:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newCard: SavedCard = {
      id: crypto.randomUUID(),
      cardType: detectCardType(data.numeroTarjeta),
      lastFourDigits: data.numeroTarjeta.slice(-4),
      expiryDate: data.fechaExpiracion,
      isDefault: savedCards.length === 0,
    };

    setSavedCards((prev) => [...prev, newCard]);

    toast({
      title: "Éxito",
      description: "La nueva tarjeta ha sido guardada exitosamente.",
      variant: "default",
    });

    setIsSubmitting(false);
    setHasStoredPaymentMethod(true); // Switch back to the saved method view
  };

  const handleCancel = () => {
    if (savedCards.length > 0) {
      setHasStoredPaymentMethod(true);
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
              <p className="font-medium">${SHIPPING_COST.toFixed(2)}</p>
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
                        // Sanitize to only allow digits.
                        const numericValue = value.replace(/[^0-9]/g, "");

                        if (numericValue === "") {
                          setPointsToApply("");
                          return;
                        }

                        // parseInt will handle leading zeros (e.g., "05" becomes 5)
                        let num = parseInt(numericValue, 10);

                        if (num > userPoints) {
                          num = userPoints;
                        }

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
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Section */}
          {remainingTotal > 0 && (
            <Card>
              <CardContent className="p-4">
                {hasStoredPaymentMethod || savedCards.length > 0 ? (
                  <SavedPaymentMethod
                    initialCards={savedCards}
                    onAddNewCard={() => setHasStoredPaymentMethod(false)}
                  />
                ) : (
                  <PaymentForm
                    maxWidth="max-w-4xl"
                    onSubmit={handleAddNewCard}
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
            puntosAplicados={appliedPoints * pointValueInDollars}
          />
        </div>
      </div>
    </div>
  );
}
