"use client";

import { useState } from "react";
import { MapPin, Truck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AddressModal from "@/components/checkout/address-modal";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentForm, { PaymentFormData } from "@/components/checkout/payment-form";
import SavedPaymentMethod from "@/components/checkout/saved-payment-method";
import { useVentaStore } from "@/store/venta-store";
import { SHIPPING_COST } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  // const [hasStoredPaymentMethod, setHasStoredPaymentMethod] = useState(true);
  const [hasStoredPaymentMethod, setHasStoredPaymentMethod] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { carrito } = useVentaStore();

  const orderItems = carrito.map((item) => ({
    id: item.presentacion_id,
    name: `${item.nombre_cerveza} ${item.presentacion}`,
    price: item.precio,
    quantity: item.quantity,
    image: item.imagen ?? "/placeholder.svg", // Fallback to a placeholder image
  }));

  const handleAddNewCard = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    console.log("Submitting new card:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Éxito",
      description: "La nueva tarjeta ha sido guardada exitosamente.",
      variant: "default",
    });

    setIsSubmitting(false);
    setHasStoredPaymentMethod(true); // Switch back to the saved method view
  };

  const handleCancel = () => {
    setHasStoredPaymentMethod(true);
  };

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

          {/* Payment Method Section */}
          <Card>
            <CardContent className="p-4">
              {hasStoredPaymentMethod ? (
                <SavedPaymentMethod
                  cardType="visa"
                  lastFourDigits="4242"
                  expiryDate="04/26"
                  isDefault={true}
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
        </div>

        {/* Order Summary Section */}
        <div className="md:col-span-1">
          <OrderSummary orderItems={orderItems} />
        </div>
      </div>
    </div>
  );
}
