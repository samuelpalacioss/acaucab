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
import { getClienteByUsuarioId } from "@/api/get-cliente-by-usuario-id";
import { crearMetodoPago } from "@/api/crear-metodo-pago";
import { getCardType } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isPuntosDetails, isTarjetaDetails, PuntosDetails, TarjetaDetails } from "@/lib/schemas";
import { finalizarDetallesVenta } from "@/api/finalizar-detalles-venta";
import { registrarPagos } from "@/api/registrar-pagos";
import { CompletarVenta } from "@/api/completar-venta";
import { DespacharVenta } from "@/api/despachar-venta";

// Helper to format date for DB
const formatExpiryDateForDB = (expiryDate: string): string => {
  if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
    throw new Error("Formato de fecha de expiración inválido. Debe ser MM/YY.");
  }
  const [month, year] = expiryDate.split("/");
  const fullYear = `20${year}`;
  const date = new Date(Number(fullYear), Number(month), 0);
  const lastDay = date.getDate();
  return `${fullYear}-${month.padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
};

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { carrito, setMetodosPago, cliente, setCliente, ventaId, metodosPago } = useVentaStore();
  const { isAuthenticated, usuario } = useUser();
  const [userPoints, setUserPoints] = useState(0);
  const [pointsToApply, setPointsToApply] = useState<number | "">("");
  const [appliedPoints, setAppliedPoints] = useState(0);
  const { getTasa, fetchTasas, tasas } = useTasaStore();

  const tasaPunto = getTasa("PUNTO")?.monto_equivalencia || 1;
  const tasaDolar = getTasa("USD")?.monto_equivalencia;

  console.log("User object on checkout:", usuario);

  const [savedPaymentMethods, setSavedPaymentMethods] = useState<MetodoPagoCliente[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<MetodoPagoCliente | null>(
    null
  );

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

  useEffect(() => {
    const fetchInitialData = async () => {
      if (isAuthenticated && usuario?.id) {
        // Fetch client data first
        const clienteData = await getClienteByUsuarioId(usuario.id);
        if (clienteData) {
          setCliente(clienteData);
          // Now fetch data that depends on the client
          getMetodosDePago(usuario.id).then((paymentMethods) => {
            if (paymentMethods) {
              setSavedPaymentMethods(paymentMethods);
              if (paymentMethods.length > 0) {
                setSelectedPaymentMethod(paymentMethods[0]);
              }
            }
          });
          getPuntos(usuario.id).then((points) => {
            setUserPoints(points ?? 0);
          });
        }
      }
    };

    fetchInitialData().catch((error) => {
      console.error("Failed to fetch initial checkout data:", error);
      toast({
        title: "Error de Carga",
        description: "No se pudieron cargar los datos necesarios para el checkout.",
        variant: "destructive",
      });
    });
  }, [isAuthenticated, usuario?.id, setCliente]);

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

  const logCheckoutState = (action: string) => {
    const state = useVentaStore.getState();
    console.group(`🛒 CHECKOUT STORE - ${action}`);
    console.log(
      "👤 Cliente:",
      usuario?.nombre || state.cliente?.nombre_completo || "No disponible"
    );
    console.log("🆔 ID Cliente:", state.cliente?.id_cliente || "N/A");
    console.log("🆔 ID Usuario:", usuario?.id || "N/A");
    console.log("Tipo de cliente:", state.cliente?.tipo_cliente || "N/A");
    console.log("🛍️ Items en carrito:", state.carrito.length);
    state.carrito.forEach((item, index) => {
      console.log(
        `   ${index + 1}. ${item.nombre_cerveza} x${item.quantity} - ${item.precio.toFixed(2)} Bs`
      );
    });

    console.log("💳 Métodos de pago:", state.metodosPago.length);
    state.metodosPago.forEach((pago, index) => {
      console.log(`   ${index + 1}. ${pago.method}:`, pago.details);
    });

    console.log("🔢 Venta ID:", state.ventaId || "N/A (se genera al procesar)");
    console.groupEnd();
  };

  const handleRemovePoints = () => {
    setAppliedPoints(0);
    toast({
      title: "Puntos Eliminados",
      description: "Los puntos han sido eliminados de tu orden.",
    });
  };

  const handleCardSelect = (card: SavedCard) => {
    const fullMethod = savedPaymentMethods.find((pm) => pm.id.toString() === card.id);
    setSelectedPaymentMethod(fullMethod || null);
  };

  const handleNewCardSubmit = (data: PaymentFormData) => {
    // This will trigger the main payment processing logic
    handleProcessPayment(data);
  };

  const handleProcessPayment = async (
    paymentData?: PaymentFormData | { cardId: string; lastFour: string }
  ) => {
    if (!usuario) {
      toast({
        title: "Error",
        description: "No se ha podido identificar al usuario para el pago.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    let mainPaymentMethod: any = null;
    let pointsPaymentMethod: { method: string; details: PuntosDetails } | null = null;

    try {
      if (appliedPoints > 0) {
        if (!cliente) throw new Error("Cliente no seleccionado para el pago con puntos.");
        const result = await crearMetodoPago(
          { tipo: "punto", details: {} },
          cliente.id_cliente,
          cliente.tipo_cliente
        );
        if (typeof result !== "number") {
          throw new Error("No se pudo registrar el pago con puntos.");
        }
        pointsPaymentMethod = {
          method: "puntos",
          details: {
            puntosUtilizados: appliedPoints,
            amountPaid: puntosAplicadosEnBs,
            equivalenciaBs: tasaPunto,
            metodo_pago_id: result,
          },
        };
      }

      if (remainingTotalInBs > 0) {
        if (!paymentData) {
          throw new Error("No se proporcionaron los detalles del pago con tarjeta.");
        }

        let details: TarjetaDetails;
        let metodo_pago_id: number;

        if ("cardId" in paymentData && selectedPaymentMethod) {
          // Using a saved card
          const p_id_cliente =
            selectedPaymentMethod.fk_cliente_natural ?? selectedPaymentMethod.fk_cliente_juridico;
          const p_tipo_cliente = selectedPaymentMethod.fk_cliente_natural ? "natural" : "juridico";

          if (!p_id_cliente) {
            throw new Error("No se pudo determinar el cliente para el método de pago guardado.");
          }
          metodo_pago_id = selectedPaymentMethod.id;
          details = {
            cardId: selectedPaymentMethod.id.toString(),
            amountPaid: remainingTotalInBs,
            numeroTarjeta: selectedPaymentMethod.numero_tarjeta.toString(),
            fechaExpiracion: selectedPaymentMethod.fecha_vencimiento,
            banco: selectedPaymentMethod.banco,
            metodo_pago_id: metodo_pago_id,
          };
        } else {
          if (!cliente) throw new Error("Cliente no seleccionado para el pago con tarjeta nueva.");
          // Using a new card
          const newCardData = paymentData as PaymentFormData;
          const expiryDate = formatExpiryDateForDB(newCardData.fechaExpiracion);
          const tipo_metodo_pago =
            newCardData.tipoTarjeta === "credito" ? "tarjeta_credito" : "tarjeta_debito";

          const metodoPagoParamsDetails: any = {
            numero: parseInt(newCardData.numeroTarjeta.replace(/\s/g, "")),
            banco: "N/A", // Not collected in this form
            fecha_vencimiento: expiryDate,
          };

          if (tipo_metodo_pago === "tarjeta_credito") {
            metodoPagoParamsDetails.tipo_tarjeta = getCardType(newCardData.numeroTarjeta || "");
          }

          const result = await crearMetodoPago(
            {
              tipo: tipo_metodo_pago,
              details: metodoPagoParamsDetails,
            },
            cliente.id_cliente,
            cliente.tipo_cliente
          );

          if (typeof result !== "number") {
            throw new Error("No se pudo crear el método de pago para la nueva tarjeta.");
          }
          metodo_pago_id = result;
          details = {
            nombreTitular: newCardData.nombreTitular,
            numeroTarjeta: newCardData.numeroTarjeta.replace(/\s/g, ""),
            fechaExpiracion: newCardData.fechaExpiracion,
            amountPaid: remainingTotalInBs,
            banco: "N/A",
            metodo_pago_id: metodo_pago_id,
          };

          // Visually add new card to the list (doesn't refetch from DB)
          const newCardToDisplay: MetodoPagoCliente = {
            id: metodo_pago_id,
            fk_metodo_pago: metodo_pago_id,
            fk_cliente_natural: cliente.tipo_cliente === "natural" ? cliente.id_cliente : null,
            fk_cliente_juridico: cliente.tipo_cliente === "juridico" ? cliente.id_cliente : null,
            tipo_cliente: cliente.tipo_cliente,
            tipo_pago: tipo_metodo_pago,
            numero_tarjeta: parseInt(newCardData.numeroTarjeta.replace(/\s/g, "")),
            banco: "N/A",
            fecha_vencimiento: expiryDate,
          };
          setSavedPaymentMethods((prev) => [...prev, newCardToDisplay]);
          setSelectedPaymentMethod(newCardToDisplay);
        }

        mainPaymentMethod = {
          method: "tarjetaCredito",
          details: details,
        };
      }

      const paymentMethodsToStore = [];
      if (pointsPaymentMethod) paymentMethodsToStore.push(pointsPaymentMethod);
      if (mainPaymentMethod) paymentMethodsToStore.push(mainPaymentMethod);

      setMetodosPago(paymentMethodsToStore);
      logCheckoutState("INICIANDO PROCESO DE PAGO");

      // Finalize the sale
      if (!ventaId) {
        throw new Error("No se encontró un ID de venta para finalizar la compra.");
      }

      // This is a redundant call if details are already finalized in cart page,
      // but can serve as a final confirmation of prices before payment.
      const detallesFinalizados = await finalizarDetallesVenta(ventaId, carrito);
      if (!detallesFinalizados) {
        throw new Error("No se pudieron confirmar los detalles finales de la venta.");
      }

      const exitoPagos = await registrarPagos(paymentMethodsToStore, ventaId);
      if (!exitoPagos) {
        throw new Error("No se pudieron registrar los pagos.");
      }

      await CompletarVenta(ventaId);
      await DespacharVenta(ventaId);

      toast({
        title: "Venta Completada y DespaDespachadachando",
        description: "Tu orden ha sido procesada y finalizada exitosamente.",
        variant: "default",
      });
      // Optionally, you could reset the venta store and redirect the user
      // resetStore();
      // router.push('/orden-confirmada');
    } catch (error: any) {
      console.error("Error processing payment:", error);
      toast({
        title: "Error de Pago",
        description: error.message || "No se pudo procesar el pago.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalizeCheckout = () => {
    if (remainingTotalInBs > 0) {
      if (selectedPaymentMethod) {
        handleProcessPayment({
          cardId: selectedPaymentMethod.id.toString(),
          lastFour: selectedPaymentMethod.numero_tarjeta.toString().slice(-4),
        });
      } else {
        // This case implies no saved cards, so we expect a new card.
        // The form inside the dialog will call handleNewCardSubmit,
        // which then calls handleProcessPayment.
        // If the dialog isn't open, we could prompt the user.
        toast({
          title: "Método de pago requerido",
          description: "Por favor, agregue una nueva tarjeta para continuar.",
          variant: "default",
        });
      }
    } else if (appliedPoints > 0) {
      // Only points are used for payment
      handleProcessPayment();
    }
  };

  const handleCancel = () => {
    // This function might no longer be needed if the form is in a dialog
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

  const formattedCards: SavedCard[] = savedPaymentMethods.map((pm) => ({
    id: pm.id.toString(),
    cardType: detectCardType(pm.numero_tarjeta.toString()),
    lastFourDigits: pm.numero_tarjeta.toString().slice(-4),
    expiryDate: pm.fecha_vencimiento,
    isDefault: false,
  }));

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
                {savedPaymentMethods.length > 0 ? (
                  <SavedPaymentMethod
                    initialCards={formattedCards}
                    onCardSelect={handleCardSelect}
                    isSubmitting={isSubmitting}
                    paymentForm={paymentForm}
                    onNewCardSubmit={handleNewCardSubmit}
                  />
                ) : (
                  <PaymentForm
                    form={paymentForm}
                    maxWidth="max-w-4xl"
                    onSubmit={handleNewCardSubmit}
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
