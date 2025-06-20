"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartList, CartItemType } from "@/components/carrito-compras/cart-list";
import { OrderSummary } from "@/components/carrito-compras/order-summary";
import CategoryFilter from "@/components/cajero/category-filter";
import CheckoutCajero from "./cajero/checkout-cajero";
import PaymentView from "./cajero/payment-view";
import { beers } from "@/app/(marketing)/productos/page";
import PaymentMethodSummary from "./cajero/payment-method-summary";

type PaymentMethod = "tarjeta" | "efectivo" | "pagoMovil" | "puntos";

interface Payment {
  method: PaymentMethod;
  details: any; // Debería ser PaymentDetails, pero lo mantenemos flexible
}

// Steps enum for better type safety
enum Step {
  WELCOME = "welcome",
  ID_INPUT = "id_input",
  PRODUCT_SELECTION = "product_selection",
  PAYMENT = "payment",
  PAYMENT_SUMMARY = "payment_summary",
}

export default function Autopago() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  const [cedula, setCedula] = useState("");
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

  // Render different screens based on current step
  const renderStep = () => {
    switch (currentStep) {
      case Step.WELCOME:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-8">Bienvenido al Autopago</h1>
            <Button size="lg" onClick={() => setCurrentStep(Step.ID_INPUT)}>
              Empezar
            </Button>
          </div>
        );

      case Step.ID_INPUT:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Ingrese su Cédula</h2>
            <div className="w-full max-w-md">
              <input
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                className="w-full p-4 text-center text-2xl border rounded-lg mb-4"
                placeholder="Ingrese cédula"
              />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Borrar", 0, "Enter"].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    className="h-12 text-xl"
                    onClick={() => {
                      if (num === "Borrar") {
                        setCedula((prev) => prev.slice(0, -1));
                      } else if (num === "Enter" && cedula.length > 0) {
                        setCurrentStep(Step.PRODUCT_SELECTION);
                      } else if (typeof num === "number") {
                        setCedula((prev) => prev + num);
                      }
                    }}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

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
            onComplete={(method, details) => {
              setPayments([...payments, { method, details }]);
              // Si el pago no cubre el total, vuelve a la vista de pago.
              // Esta lógica necesita ser más robusta, calculando si el total ha sido cubierto.
              // Por ahora, siempre vamos al resumen.
              setCurrentStep(Step.PAYMENT_SUMMARY);
            }}
            onCancel={() => setCurrentStep(Step.PRODUCT_SELECTION)}
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
              setCedula("");
              setPayments([]);
            }}
            onBack={() => setCurrentStep(Step.PAYMENT)}
          />
        );
    }
  };

  return <div className="max-w-6xl mx-auto px-4 py-8">{renderStep()}</div>;
}
