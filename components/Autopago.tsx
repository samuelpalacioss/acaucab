"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

import CheckoutCajero from "./cajero/checkout-cajero";
import PaymentView from "./cajero/payment-view";
import { beers } from "@/app/(marketing)/productos/page";
import PaymentMethodSummary from "./cajero/payment-method-summary";
import { getClienteByDoc } from "@/api/get-cliente-by-doc";
import {
  ClienteType,
  CarritoItemType,
  DocType,
  TarjetaDetails,
  EfectivoDetails,
  PuntosDetails,
  PaymentMethod,
  PaymentMethodType,
  PresentacionType,
} from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, X } from "lucide-react";
import { getPresentacionesDisponibles } from "@/api/get-presentaciones-disponibles";
import { useVentaStore, EfectivoDetails as StoreEfectivoDetails } from "@/store/venta-store";
import { getCardType, convertir } from "@/lib/utils";
import { inicializarTasas } from "@/lib/utils";
import { useTasaStore } from "@/store/tasa-store";

// Steps enum for better type safety
enum Step {
  WELCOME = "welcome",
  ID_INPUT = "id_input",
  CLIENT_WELCOME = "client_welcome",
  PRODUCT_SELECTION = "product_selection",
  PAYMENT = "payment",
  PAYMENT_SUMMARY = "payment_summary",
}

// Type guard para los detalles de efectivo
function isEfectivoDetails(details: any): details is StoreEfectivoDetails {
  return (
    details &&
    typeof details.currency === "string" &&
    typeof details.breakdown === "object" &&
    typeof details.amountInCurrency === "number"
  );
}

/** Función mejorada para debuggear el store de venta en puntos clave */
const logVentaStore = (action?: string) => {
  const state = useVentaStore.getState();
  console.group(`🛒 VENTA STORE ${action ? `- ${action}` : ""}`);
  console.log(
    "👤 Cliente:",
    state.cliente?.nombre_completo || state.cliente?.denominacion_comercial || "No seleccionado"
  );
  console.log("📄 Documento:", `${state.docType}-${state.documento}`);
  console.log("🛍️ Items en carrito:", state.carrito.length);
  state.carrito.forEach((item, index) => {
    console.log(`   ${index + 1}. ${item.nombre_cerveza} x${item.quantity} - $${item.precio}`);
  });
  console.log("💳 Métodos de pago:", state.metodosPago.length);
  state.metodosPago.forEach((pago, index) => {
    if (pago.method === "efectivo" && isEfectivoDetails(pago.details)) {
      const breakdownString = Object.entries(pago.details.breakdown || {})
        .map(([value, count]) => `${value}: x${count}`)
        .join(", ");
      console.log(
        `   ${index + 1}. ${pago.method}: ${pago.details.amountInCurrency} ${
          pago.details.currency
        } (Desglose: ${breakdownString || "N/A"})`
      );
    } else {
      console.log(`   ${index + 1}. ${pago.method}:`, pago.details);
    }
  });
  console.log("🔢 Venta ID:", state.ventaId);
  console.log("⏳ Creando venta:", state.isCreatingVenta);
  console.log("❌ Error:", state.error);
  console.groupEnd();
};

export default function Autopago() {
  /** Estado del store de venta */
  const {
    cliente,
    docType,
    documento,
    carrito,
    metodosPago,
    setCliente,
    setDocType,
    setDocumento,
    setMetodosPago,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
    crearVentaCompleta,
    resetStore,
    isCreatingVenta,
    error: storeError,
  } = useVentaStore();

  /** Estado local del componente */
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<CarritoItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const categories = ["Especial", "Pale", "Negra", "IPA"];

  /** Hook para acceder al estado de las tasas */
  const { getTasa } = useTasaStore();

  /** Cargar y sondear tasas de cambio */
  useEffect(() => {
    // Carga inicial de tasas
    console.log("🚀 Obteniendo tasas de cambio iniciales...");
    inicializarTasas();

    // Establecer sondeo (polling) cada 5 minutos
    const intervalId = setInterval(() => {
      console.log("🔄 Refrescando tasas de cambio...");
      inicializarTasas();
    }, 5 * 60 * 1000); // 5 minutos

    // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []); // El array de dependencias vacío asegura que esto se ejecute solo al montar el componente

  /** Función para convertir a USD, con fallback */
  const convertirADolar = (monto: number) => {
    const tasa = getTasa("USD");
    if (!tasa?.monto_equivalencia) return null;
    return monto / tasa.monto_equivalencia;
  };

  /** Cargar productos desde la API al montar el componente */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const presentaciones = await getPresentacionesDisponibles();
        const mappedProducts: CarritoItemType[] = presentaciones.map((p: PresentacionType) => ({
          ...p,
          quantity: 1, // Default quantity
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Fallback to empty array or show error state
        setProducts([]);
      }
    }

    // Log estado inicial del store
    logVentaStore("AUTOPAGO INICIADO - ESTADO INICIAL");
    fetchProducts();
  }, []);

  // Carga los productos cuando se muestra la bienvenida al cliente y luego avanza
  useEffect(() => {
    if (currentStep === Step.CLIENT_WELCOME) {
      const loadProductsAndProceed = async () => {
        /** Cargar productos solo cuando el usuario está autenticado y va a la selección */
        setIsLoadingProducts(true);
        try {
          const presentaciones = await getPresentacionesDisponibles();
          const mappedProducts: CarritoItemType[] = presentaciones.map((p: PresentacionType) => ({
            ...p,
            quantity: 1, // Default quantity
          }));
          setProducts(mappedProducts);
        } catch (error) {
          console.error("Failed to fetch products:", error);
          setProducts([]);
        } finally {
          setIsLoadingProducts(false);
          setCurrentStep(Step.PRODUCT_SELECTION);
        }
      };

      loadProductsAndProceed();
    }
  }, [currentStep]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.tipo_cerveza === selectedCategory)
    : products;

  /** Calcular totales usando datos del store */
  const subtotal = carrito.reduce((sum, product) => sum + product.precio * product.quantity, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  const subtotalUSD = convertirADolar(subtotal);
  const ivaUSD = convertirADolar(iva);
  const totalUSD = convertirADolar(total);
  const totalPaid = metodosPago.reduce(
    (sum, payment) => sum + (payment.details.amountPaid || 0),
    0
  );
  const remainingTotal = total - totalPaid;

  /** Funciones del carrito usando el store */
  const handleUpdateQuantity = (sku: string, newQuantity: number) => {
    console.log("🔄 handleUpdateQuantity called with:", { sku, newQuantity }); // Debug log
    console.log("🔄 Current carrito:", carrito); // Debug log
    console.log(
      "🔄 Products available:",
      products.map((p) => ({ sku: p.sku, name: p.nombre_cerveza }))
    ); // Debug log

    if (newQuantity <= 0) {
      eliminarDelCarrito(sku);
      logVentaStore("PRODUCTO ELIMINADO");
    } else {
      const existingItem = carrito.find((item) => item.sku === sku);
      if (existingItem) {
        console.log("🔄 Updating existing cart item"); // Debug log
        actualizarCantidad(sku, newQuantity);
        logVentaStore("CANTIDAD ACTUALIZADA");
      } else {
        // Find the product in the products list and add it to cart
        const productToAdd = products.find((p) => p.sku === sku);
        console.log("🔄 Product to add:", productToAdd); // Debug log
        if (productToAdd) {
          console.log("🔄 Adding new product to cart"); // Debug log
          agregarAlCarrito({ ...productToAdd, quantity: newQuantity });
          logVentaStore("PRODUCTO AGREGADO");
        } else {
          console.log("❌ Product not found in products list!"); // Debug log
        }
      }
    }
  };

  const handleRemoveItem = (sku: string) => {
    eliminarDelCarrito(sku);
    logVentaStore("ITEM REMOVIDO DEL CARRITO");
  };

  const handleClearCart = () => {
    limpiarCarrito();
    logVentaStore("CARRITO LIMPIADO");
  };

  /** Las funciones de cálculo se movieron al store y se calculan directamente en el componente */

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
        logVentaStore("CLIENTE AUTENTICADO");
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
                      setDocumento(documento.slice(0, -1));
                    } else if (num === "Enter") {
                      handleDocumentoSubmit();
                    } else if (typeof num === "number") {
                      setDocumento(documento + num);
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
        /** Mostrar loading mientras se cargan los productos */
        if (isLoadingProducts) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <h2 className="text-2xl font-semibold mb-4">Cargando productos...</h2>
              <Loader className="animate-spin" />
            </div>
          );
        }

        return (
          <CheckoutCajero
            onCheckout={() => setCurrentStep(Step.PAYMENT)}
            cart={carrito}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            products={products}
            convertirADolar={convertirADolar}
          />
        );

      case Step.PAYMENT:
        return (
          <PaymentView
            items={carrito}
            total={remainingTotal > 0 ? remainingTotal : total}
            originalTotal={total}
            amountPaid={totalPaid}
            existingPayments={metodosPago as any}
            convertirADolar={convertirADolar}
            onComplete={(method: any, details: any) => {
              const newPayment: PaymentMethod = {
                method,
                details: { ...details },
              };

              // Type guard para detalles de tarjeta
              if (method === "tarjetaCredito" || method === "tarjetaDebito") {
                const cardDetails = details as TarjetaDetails;
                cardDetails.tipo = getCardType(cardDetails.numeroTarjeta || "");
                newPayment.details = cardDetails;
              } else if (method === "efectivo") {
                newPayment.details = details as EfectivoDetails;
              } else if (method === "cheque") {
                newPayment.details = details as any;
              } else if (method === "puntos") {
                newPayment.details = details as PuntosDetails;
              }

              setMetodosPago([...metodosPago, newPayment]);
              logVentaStore(`PAGO AGREGADO - ${method.toUpperCase()}`);
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
            payments={metodosPago}
            items={carrito}
            total={total}
            convertirADolar={convertirADolar}
            onConfirm={async () => {
              console.log("Creando venta con:", metodosPago);
              logVentaStore("INICIANDO CREACIÓN DE VENTA");

              /** Crear la venta completa usando el store */
              const success = await crearVentaCompleta(total);

              if (success) {
                console.log("✅ Venta creada exitosamente");
                logVentaStore("VENTA CREADA EXITOSAMENTE");
                // Resetear el estado
                setCurrentStep(Step.WELCOME);
                resetStore();
                logVentaStore("STORE RESETEADO");
              } else {
                console.error("❌ Error al crear la venta");
                logVentaStore("ERROR AL CREAR VENTA");
                // Mostrar error al usuario
                setError(storeError || "Error al procesar la venta");
              }
            }}
            onBack={() => setCurrentStep(Step.PAYMENT)}
            onDeletePayment={(paymentIndex) => {
              /** Eliminar el pago específico del array de pagos */
              const paymentToDelete = metodosPago[paymentIndex];
              const updatedPayments = metodosPago.filter((_, index) => index !== paymentIndex);
              setMetodosPago(updatedPayments);
              logVentaStore(`PAGO ELIMINADO - ${paymentToDelete?.method?.toUpperCase()}`);

              // /** Si no quedan pagos, volver a la selección de productos */
              // if (updatedPayments.length === 0) {
              //   setCurrentStep(Step.PRODUCT_SELECTION);
              // }
            }}
          />
        );
    }
  };

  return <div className="max-w-7xl mx-auto px-4 py-8">{renderStep()}</div>;
}
