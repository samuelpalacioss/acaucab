"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartList, CartItemType } from "@/components/carrito-compras/cart-list";
import { OrderSummary } from "@/components/carrito-compras/order-summary";
import CategoryFilter from "@/components/cajero/category-filter";
import CheckoutCajero from "./cajero/checkout-cajero";
import PaymentView from "./cajero/payment-view";
import { beers } from "@/app/(marketing)/productos/page";
import PaymentMethodSummary from "./cajero/payment-method-summary";
import { getClienteByDoc } from "@/api/get-cliente-by-doc";
import { ClienteType, DocType } from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, X } from "lucide-react";

type PaymentMethod = "tarjeta" | "efectivo" | "pagoMovil" | "puntos";

interface Payment {
  method: PaymentMethod;
  details: any; // Debería ser PaymentDetails, pero lo mantenemos flexible
}

// Steps enum for better type safety
enum Step {
  WELCOME = "welcome",
  ID_INPUT = "id_input",
  CLIENT_WELCOME = "client_welcome",
  PRODUCT_SELECTION = "product_selection",
  PAYMENT = "payment",
  PAYMENT_SUMMARY = "payment_summary",
}

export default function Autopago() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  const [documento, setDocumento] = useState("");
  const [docType, setDocType] = useState<DocType>("V");
  const [cliente, setCliente] = useState<ClienteType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [products, setProducts] = useState<CartItemType[]>(
    beers.map((beer) => ({
      id: beer.id,
      name: beer.name,
      price: beer.price,
      quantity: 1,
      size: beer.capacity,
      brand: beer.brand,
      imageSrc: beer.image,
      category: beer.category,
    }))
  );
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ["Especial", "Pale", "Negra", "IPA"];

  // Timer para pasar a la siguiente pantalla luego de bienvenida al cliente
  useEffect(() => {
    if (currentStep === Step.CLIENT_WELCOME) {
      const timer = setTimeout(() => {
        setCurrentStep(Step.PRODUCT_SELECTION);
      }, 4000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Calculate totals
  const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  const totalPaid = payments.reduce((sum, payment) => sum + (payment.details.amountPaid || 0), 0);
  const remainingTotal = total - totalPaid;

  // Handle quantity changes
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((product) => product.id !== id));
    } else {
      const existingItem = cart.find((item) => item.id === id);
      if (existingItem) {
        setCart(
          cart.map((product) =>
            product.id === id ? { ...product, quantity: newQuantity } : product
          )
        );
      } else {
        // Find the product in the products list and add it to cart
        const productToAdd = products.find((p) => p.id === id);
        if (productToAdd) {
          setCart([...cart, { ...productToAdd, quantity: newQuantity }]);
        }
      }
    }
  };

  const handleRemoveItem = (id: number) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  const calculateTotalItems = () => {
    return products.reduce((sum, product) => sum + product.quantity, 0);
  };

  async function handleDocumentoSubmit() {
    if (documento.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      /**
       * parseInt(documento) convierte el string 'documento' a un número entero
       */
      const clienteEncontrado = await getClienteByDoc(docType, parseInt(documento));

      if (clienteEncontrado !== null) {
        setCliente(clienteEncontrado);
        setCurrentStep(Step.CLIENT_WELCOME);
      } else {
        setError("Cliente no encontrado. Por favor, verifique los datos.");
      }
    } catch (err) {
      setError("Ocurrió un error al buscar el cliente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Render different screens based on current step
  const renderStep = () => {
    switch (currentStep) {
      case Step.WELCOME:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-8">Bienvenid@ al Autopago</h1>
            <Button size="lg" onClick={() => setCurrentStep(Step.ID_INPUT)}>
              Empezar
            </Button>
          </div>
        );

      case Step.ID_INPUT:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Ingrese su Documento de Identidad</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="w-full max-w-md flex items-center gap-2 mb-4">
              <Select value={docType} onValueChange={(value: DocType) => setDocType(value)}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="V">V</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                  <SelectItem value="J">J</SelectItem>
                  <SelectItem value="P">P</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-full">
                <label htmlFor="documento-input" className="sr-only">
                  Número de Identificación
                </label>
                <input
                  id="documento-input"
                  name="documento-input"
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  className="w-full p-2 text-center border rounded-lg pr-10"
                  placeholder="Ingrese documento"
                  disabled={isLoading}
                />
                {documento.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setDocumento("")}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full max-w-md grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Borrar", 0, "Enter"].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  className="h-12 text-xl"
                  disabled={isLoading}
                  onClick={() => {
                    if (num === "Borrar") {
                      setDocumento((prev) => prev.slice(0, -1));
                    } else if (num === "Enter") {
                      handleDocumentoSubmit();
                    } else if (typeof num === "number") {
                      setDocumento((prev) => prev + num);
                    }
                  }}
                >
                  {isLoading && num === "Enter" ? "Buscando..." : num}
                </Button>
              ))}
            </div>
          </div>
        );

      case Step.CLIENT_WELCOME: {
        const clientName =
          cliente?.tipo_usuario === "Cliente Natural"
            ? cliente.nombre_completo
            : cliente?.denominacion_comercial;
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-4xl font-bold mb-4">Hola, {clientName}!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Un momento mientras preparamos todo para ti.
            </p>
            <Loader className="animate-spin" />
          </div>
        );
      }

      case Step.PRODUCT_SELECTION:
        return (
          <CheckoutCajero
            onCheckout={() => setCurrentStep(Step.PAYMENT)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        );

      case Step.PAYMENT:
        return (
          <PaymentView
            items={cart}
            total={remainingTotal > 0 ? remainingTotal : total}
            originalTotal={total}
            amountPaid={totalPaid}
            existingPayments={payments}
            onComplete={(method, details) => {
              setPayments([...payments, { method, details }]);
              // Si el pago no cubre el total, vuelve a la vista de pago.
              // Esta lógica necesita ser más robusta, calculando si el total ha sido cubierto.
              // Por ahora, siempre vamos al resumen.
              setCurrentStep(Step.PAYMENT_SUMMARY);
            }}
            onCancel={() => setCurrentStep(Step.PRODUCT_SELECTION)}
            onViewSummary={() => setCurrentStep(Step.PAYMENT_SUMMARY)}
          />
        );

      case Step.PAYMENT_SUMMARY:
        return (
          <PaymentMethodSummary
            payments={payments}
            items={cart}
            total={total}
            onConfirm={() => {
              console.log("Pago completado con:", payments);
              // Resetear el estado
              setCurrentStep(Step.WELCOME);
              setCart([]);
              setDocumento("");
              setPayments([]);
            }}
            onBack={() => setCurrentStep(Step.PAYMENT)}
            onDeletePayment={(paymentIndex) => {
              /** Eliminar el pago específico del array de pagos */
              const updatedPayments = payments.filter((_, index) => index !== paymentIndex);
              setPayments(updatedPayments);

              // /** Si no quedan pagos, volver a la selección de productos */
              // if (updatedPayments.length === 0) {
              //   setCurrentStep(Step.PRODUCT_SELECTION);
              // }
            }}
          />
        );
    }
  };

  return <div className="max-w-6xl mx-auto px-4 py-8">{renderStep()}</div>;
}
