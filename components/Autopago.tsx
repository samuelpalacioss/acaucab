"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartList, CartItemType } from "@/components/carrito-compras/cart-list";
import { OrderSummary } from "@/components/carrito-compras/order-summary";
import CategoryFilter from "@/components/cajero/category-filter";
import CheckoutCajero from "./cajero/checkout-cajero";

// Define types for our data
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  brand?: string;
  imageSrc?: string;
  category: string;
};

type PaymentMethod = "cash" | "card" | "transfer";

// Steps enum for better type safety
enum Step {
  WELCOME = "welcome",
  ID_INPUT = "id_input",
  PRODUCT_SELECTION = "product_selection",
  PAYMENT = "payment",
}

export default function Autopago() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  const [cedula, setCedula] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Cerveza Especial",
      price: 12,
      quantity: 1,
      size: "355ml",
      brand: "Cervecería La Esquina",
      imageSrc: "/placeholder.svg?height=128&width=128",
      category: "Especial",
    },
    {
      id: 2,
      name: "Cerveza Pale",
      price: 10,
      quantity: 1,
      size: "355ml",
      brand: "Artesana",
      imageSrc: "/placeholder.svg?height=128&width=128",
      category: "Pale",
    },
    {
      id: 3,
      name: "Cerveza Negra",
      price: 11.5,
      quantity: 1,
      size: "355ml",
      brand: "Cervecería La Esquina",
      imageSrc: "/placeholder.svg?height=128&width=128",
      category: "Negra",
    },
    {
      id: 4,
      name: "Cerveza IPA",
      price: 13,
      quantity: 1,
      size: "355ml",
      brand: "Artesana",
      imageSrc: "/placeholder.svg?height=128&width=128",
      category: "IPA",
    },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ["Especial", "Pale", "Negra", "IPA"];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Calculate total
  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Handle quantity changes
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(0, newQuantity) } : product
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
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
        return <CheckoutCajero />;

      case Step.PAYMENT:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Método de Pago</h2>
            <div className="grid grid-cols-1 gap-4">
              {(["cash", "card", "transfer"] as PaymentMethod[]).map((method) => (
                <Button
                  key={method}
                  variant={selectedPaymentMethod === method ? "default" : "outline"}
                  className="h-16 text-lg"
                  onClick={() => setSelectedPaymentMethod(method)}
                >
                  {method === "cash" ? "Efectivo" : method === "card" ? "Tarjeta" : "Transferencia"}
                </Button>
              ))}
            </div>
            <div className="mt-6">
              <Button
                className="w-full"
                disabled={!selectedPaymentMethod}
                onClick={() => {
                  // Here you would handle the final payment
                  alert("Pago procesado exitosamente");
                  // Reset the state and go back to welcome
                  setCurrentStep(Step.WELCOME);
                  setCedula("");
                  setProducts(products.map((p) => ({ ...p, quantity: 0 })));
                  setSelectedPaymentMethod(null);
                }}
              >
                Confirmar Pago
              </Button>
            </div>
          </div>
        );
    }
  };

  return <div className="max-w-6xl mx-auto px-4 py-8">{renderStep()}</div>;
}
