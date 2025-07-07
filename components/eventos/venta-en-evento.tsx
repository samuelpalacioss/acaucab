"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import CheckoutEvento from "@/components/eventos/checkout-evento"
import PaymentView from "@/components/cajero/payment-view"
import PaymentMethodSummary from "@/components/cajero/payment-method-summary"
import { getClienteByDoc } from "@/api/get-cliente-by-doc"
import type { CarritoItemType, DocType, TarjetaDetails, PaymentMethod } from "@/lib/schemas"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader, X, ArrowLeft } from "lucide-react"
import { useVentaStore, type EfectivoDetails as StoreEfectivoDetails } from "@/store/venta-store"
import { getCardType } from "@/lib/utils"
import { inicializarTasas } from "@/lib/utils"
import { useTasaStore } from "@/store/tasa-store"
import { registrarVentaEnProceso } from "@/api/registrar-venta-en-proceso"
import { registrarDetallesVentaEnProceso } from "@/api/registrar-detalles-venta-en-proceso"
import { crearMetodoPago } from "@/api/crear-metodo-pago"
import { getPuntos } from "@/api/get-puntos"
import { llamarFuncion } from "@/lib/server-actions"
import Link from "next/link"
import type { EventProvider, EventProduct } from "@/components/eventos/event-detail"

// UI extension for event products if extra fields are needed
interface UIEventProduct extends EventProduct {
  proveedor?: string
  proveedorId1?: number
  proveedorId2?: string
  stock_disponible?: number
  nombre_cerveza?: string
  quantity?: number
  // ...add any other UI fields as needed
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

// Type guard para los detalles de efectivo
function isEfectivoDetails(details: any): details is StoreEfectivoDetails {
  return (
    details &&
    typeof details.currency === "string" &&
    typeof details.breakdown === "object" &&
    typeof details.amountInCurrency === "number"
  )
}

/** Función mejorada para debuggear el store de venta en puntos clave */
const logVentaStore = (action?: string) => {
  const state = useVentaStore.getState()
  console.group(`🛒 VENTA EVENTO ${action ? `- ${action}` : ""}`)
  console.log(
    "👤 Cliente:",
    state.cliente?.nombre_completo || state.cliente?.denominacion_comercial || "No seleccionado",
  )
  console.log("🆔 ID Cliente:", state.cliente?.id_cliente || "N/A")
  console.log("📄 Documento:", `${state.docType}-${state.documento}`)
  console.log("🛍️ Items en carrito:", state.carrito.length)
  state.carrito.forEach((item, index) => {
    console.log(`   ${index + 1}. ${item.nombre_cerveza} x${item.quantity} - $${item.precio}`)
  })
  console.log("💳 Métodos de pago:", state.metodosPago.length)
  state.metodosPago.forEach((pago, index) => {
    if (pago.method === "efectivo" && isEfectivoDetails(pago.details)) {
      const breakdownString = Object.entries(pago.details.breakdown || {})
        .map(([value, count]) => `${value}: x${count}`)
        .join(", ")
      console.log(
        `   ${index + 1}. ${pago.method}: ${pago.details.amountInCurrency} ${
          pago.details.currency
        } (Desglose: ${breakdownString || "N/A"})`,
      )
    } else {
      console.log(`   ${index + 1}. ${pago.method}:`, pago.details)
    }
  })
  console.log("🔢 Venta ID:", state.ventaId)
  console.log("⏳ Creando venta:", state.isCreatingVenta)
  console.log("❌ Error:", state.error)
  console.groupEnd()
}

export default function VentaEnEvento() {
  const params = useParams()
  const eventId = params?.id as string

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
    setVentaId,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
    crearVentaCompleta,
    resetStore,
    isCreatingVenta,
    error: storeError,
    ventaId,
  } = useVentaStore()

  /** Estado local del componente */
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [providers, setProviders] = useState<EventProvider[]>([])
  const [productosEvento, setProductosEvento] = useState<UIEventProduct[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [puntosDisponibles, setPuntosDisponibles] = useState(0)
  const [eventInfo, setEventInfo] = useState<any>(null)

  /** Hook para acceder al estado de las tasas */
  const { getTasa } = useTasaStore()

  /** Cargar y sondear tasas de cambio */
  useEffect(() => {
    console.log("🚀 Obteniendo tasas de cambio iniciales...")
    inicializarTasas()
    const intervalId = setInterval(
      () => {
        console.log("🔄 Refrescando tasas de cambio...")
        inicializarTasas()
      },
      5 * 60 * 1000,
    )
    return () => clearInterval(intervalId)
  }, [])

  /** Función para convertir a USD, con fallback */
  const convertirADolar = (monto: number) => {
    const tasa = getTasa("USD")
    if (!tasa?.monto_equivalencia) return null
    return monto / tasa.monto_equivalencia
  }

  /** Cargar información del evento y productos al montar el componente */
  useEffect(() => {
    async function fetchEventData() {
      if (!eventId) return

      try {
        // Cargar información básica del evento
        const eventData = await llamarFuncion("fn_get_evento_by_id", { p_evento_id: Number(eventId) })
        if (eventData && eventData.length > 0) {
          setEventInfo(eventData[0])
        }

        // Cargar proveedores y productos del evento
        const providersData = await llamarFuncion("fn_get_evento_proveedores", { p_evento_id: Number(eventId) })
        setProviders(providersData || [])

        // Mapear productos con información del proveedor
        const mappedProducts: UIEventProduct[] = []
        providersData?.forEach((provider: EventProvider) => {
          provider.productos?.forEach((product: EventProduct) => {
            mappedProducts.push({
              id1: product.id1,
              id2: product.id2,
              sku: product.sku,
              nombre: product.nombre,
              precio: product.precio,
              cantidad: product.cantidad,
              // UI/cart fields:
              nombre_cerveza: product.nombre,
              proveedor: provider.nombre,
              proveedorId1: provider.id1,
              proveedorId2: provider.id2,
              stock_disponible: product.cantidad,
              quantity: 1,
              // ...add other UI/cart fields as needed
            } as UIEventProduct)
          })
        })
        setProductosEvento(mappedProducts)
      } catch (error) {
        console.error("Failed to fetch event data:", error)
        setError("Error al cargar los datos del evento")
      }
    }

    logVentaStore("VENTA EVENTO INICIADA - ESTADO INICIAL")
    fetchEventData()
  }, [eventId])

  // Carga los productos cuando se muestra la bienvenida al cliente y luego avanza
  useEffect(() => {
    if (currentStep === Step.CLIENT_WELCOME) {
      const loadProductsAndProceed = async () => {
        setIsLoadingProducts(true)
        try {
          // Los productos ya están cargados, solo simular delay
          await new Promise((resolve) => setTimeout(resolve, 1000))
        } catch (error) {
          console.error("Failed to process products:", error)
        } finally {
          setIsLoadingProducts(false)
          setCurrentStep(Step.PRODUCT_SELECTION)
        }
      }

      loadProductsAndProceed()
    }
  }, [currentStep])

  const handleProceedToPayment = async () => {
    if (!cliente?.id_cliente) {
      setError("No se ha podido identificar al cliente. Por favor, reinicie el proceso.")
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      let currentVentaId = ventaId
      if (!currentVentaId) {
        const newVentaId = await registrarVentaEnProceso(cliente.id_cliente, "cliente")
        if (newVentaId) {
          setVentaId(newVentaId)
          currentVentaId = newVentaId
        } else {
          throw new Error("No se pudo iniciar la venta. Por favor, intente de nuevo.")
        }
      }

      if (currentVentaId) {
        await registrarDetallesVentaEnProceso(currentVentaId, carrito)
        logVentaStore("VENTA EVENTO INICIADA Y DETALLES REGISTRADOS")
        setCurrentStep(Step.PAYMENT)
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al iniciar la venta.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  /** Calcular totales usando datos del store */
  const subtotal = carrito.reduce((sum, product) => sum + product.precio * product.quantity, 0)
  const iva = subtotal * 0.16
  const total = subtotal + iva
  const subtotalUSD = convertirADolar(subtotal)
  const ivaUSD = convertirADolar(iva)
  const totalUSD = convertirADolar(total)

  const totalPaid = metodosPago.reduce((acc, p) => {
    const details = p.details as any
    const amount = details.amountPaid || 0
    if (p.method === "efectivo" && details.currency && details.currency !== "bolivares") {
      const currency = details.currency === "dolares" ? "USD" : "EUR"
      const tasa = getTasa(currency)
      const montoEnBs = amount * (tasa?.monto_equivalencia || 0)
      return acc + montoEnBs
    }
    return acc + amount
  }, 0)

  const remainingTotal = total - totalPaid

  /** Funciones del carrito usando el store */
  const handleUpdateQuantity = (sku: string, newQuantity: number) => {
    console.log("🔄 handleUpdateQuantity called with:", { sku, newQuantity })
    console.log("🔄 Current carrito:", carrito)
    console.log(
      "🔄 Products available:",
      productosEvento.map((p) => ({ sku: p.sku, name: p.nombre_cerveza })),
    )

    if (newQuantity <= 0) {
      eliminarDelCarrito(sku)
      logVentaStore("PRODUCTO ELIMINADO")
    } else {
      const existingItem = carrito.find((item) => item.sku === sku)
      if (existingItem) {
        // Validar stock disponible antes de actualizar cantidad
        const productInfo = productosEvento.find((p) => p.sku === sku)
        const stockDisponible = productInfo?.stock_disponible ?? productInfo?.cantidad ?? 0;
        if (newQuantity > stockDisponible) {
          alert("No puedes agregar más de la cantidad disponible para este producto.");
          return;
        }
        console.log("🔄 Updating existing cart item")
        actualizarCantidad(sku, newQuantity)
        logVentaStore("CANTIDAD ACTUALIZADA")
      } else {
        const productToAdd = productosEvento.find((p) => p.sku === sku)
        console.log("🔄 Product to add:", productToAdd)
        if (productToAdd) {
          // Validar stock disponible antes de agregar
          const stockDisponible = productToAdd.stock_disponible ?? productToAdd.cantidad ?? 0
          if (newQuantity > stockDisponible) {
            alert("No puedes agregar más de la cantidad disponible para este producto.")
            return
          }
          // Map UIEventProduct to CarritoItemType
          agregarAlCarrito({
            sku: productToAdd.sku,
            nombre_cerveza: productToAdd.nombre_cerveza || productToAdd.nombre,
            presentacion: (productToAdd as any).presentacion || "Botella",
            precio: productToAdd.precio,
            presentacion_id: (productToAdd as any).presentacion_id ?? productToAdd.id1,
            cerveza_id: (productToAdd as any).cerveza_id ??  productToAdd.id2,
            id_tipo_cerveza: (productToAdd as any).id_tipo_cerveza ?? 0,
            tipo_cerveza: (productToAdd as any).tipo_cerveza || "Evento",
            stock_total: (productToAdd as any).stock_total ?? productToAdd.cantidad ?? 0,
            marca: (productToAdd as any).marca || "",
            imagen: (productToAdd as any).imagen || null,
            quantity: newQuantity,
          })
          logVentaStore("PRODUCTO AGREGADO")
        } else {
          console.log("❌ Product not found in products list!")
        }
      }
    }
  }

  const handleRemoveItem = (sku: string) => {
    eliminarDelCarrito(sku)
    logVentaStore("ITEM REMOVIDO DEL CARRITO")
  }

  const handleClearCart = () => {
    limpiarCarrito()
    logVentaStore("CARRITO LIMPIADO")
  }

  async function handleDocumentoSubmit() {
    if (documento.length === 0) return
    setIsLoading(true)
    setError(null)
    try {
      const clienteEncontrado = await getClienteByDoc(docType, Number.parseInt(documento))
      if (clienteEncontrado !== null) {
        setCliente(clienteEncontrado)
        if (clienteEncontrado.id_usuario) {
          const puntos = await getPuntos(clienteEncontrado.id_usuario)
          if (puntos !== null) {
            setPuntosDisponibles(puntos)
          }
        }
        logVentaStore("CLIENTE AUTENTICADO EN EVENTO")
        setCurrentStep(Step.CLIENT_WELCOME)
      } else {
        setError("Cliente no encontrado. Por favor, verifique los datos.")
      }
    } catch (err) {
      setError("Ocurrió un error al buscar el cliente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Render different screens based on current step
  const renderStep = () => {
    switch (currentStep) {
      case Step.WELCOME:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Venta en Evento</h1>
              {eventInfo && (
                <div className="text-lg text-muted-foreground">
                  <p className="font-semibold">{eventInfo.nombre}</p>
                  <p>{new Date(eventInfo.fechaHoraInicio).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            <Button size="lg" onClick={() => setCurrentStep(Step.ID_INPUT)}>
              Empezar Venta
            </Button>
          </div>
        )

      case Step.ID_INPUT:
        return (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/dashboard/eventos/${eventId}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Ingrese Documento del Cliente</h2>
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
                  className="h-12 text-xl bg-transparent"
                  disabled={isLoading}
                  onClick={() => {
                    if (num === "Borrar") {
                      setDocumento(documento.slice(0, -1))
                    } else if (num === "Enter") {
                      handleDocumentoSubmit()
                    } else if (typeof num === "number") {
                      setDocumento(documento + num)
                    }
                  }}
                >
                  {isLoading && num === "Enter" ? "Buscando..." : num}
                </Button>
              ))}
            </div>
          </div>
        )

      case Step.CLIENT_WELCOME: {
        const clientName =
          cliente?.tipo_cliente === "natural" ? cliente.nombre_completo : cliente?.denominacion_comercial
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-4xl font-bold mb-4">Hola, {clientName}!</h1>
            <p className="text-lg text-muted-foreground mb-8">Preparando los productos del evento para ti.</p>
            <Loader className="animate-spin" />
          </div>
        )
      }

      case Step.PRODUCT_SELECTION:
        if (isLoadingProducts) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <h2 className="text-2xl font-semibold mb-4">Cargando productos del evento...</h2>
              <Loader className="animate-spin" />
            </div>
          )
        }
        return (
          <CheckoutEvento
            onCheckout={handleProceedToPayment}
            cart={carrito}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            providers={providers}
            productosEvento={productosEvento}
            convertirADolar={convertirADolar}
            eventInfo={eventInfo}
          />
        )

      case Step.PAYMENT:
        return (
          <PaymentView
            items={carrito}
            total={remainingTotal > 0 ? remainingTotal : total}
            originalTotal={total}
            amountPaid={totalPaid}
            existingPayments={metodosPago as any}
            convertirADolar={convertirADolar}
            isProcessing={isProcessingPayment}
            puntosDisponibles={puntosDisponibles}
            onComplete={async (method: any, details: any) => {
              setIsProcessingPayment(true)
              setError(null)
              try {
                if (!cliente || !cliente.id_cliente || !cliente.tipo_cliente) {
                  throw new Error("Información del cliente no disponible. Por favor, reinicie el proceso.")
                }
                const p_id_cliente = cliente.id_cliente
                const p_tipo_cliente = cliente.tipo_cliente

                // Misma lógica de pago que en autopago
                if (method === "efectivo") {
                  const efectivoDetails = details as StoreEfectivoDetails
                  const result = await crearMetodoPago(
                    {
                      tipo: "efectivo",
                      details: {
                        breakdown: efectivoDetails.breakdown,
                        currency: efectivoDetails.currency,
                      },
                    },
                    p_id_cliente,
                    p_tipo_cliente,
                  )
                  if (!Array.isArray(result) || result.length === 0) {
                    throw new Error("No se pudieron crear los métodos de pago para el efectivo.")
                  }
                  const newPayments: PaymentMethod[] = []
                  let idIndex = 0
                  for (const [denominacion, cantidad] of Object.entries(efectivoDetails.breakdown)) {
                    for (let i = 0; i < cantidad; i++) {
                      if (idIndex < result.length) {
                        newPayments.push({
                          method: "efectivo",
                          details: {
                            amountPaid: Number.parseFloat(denominacion),
                            currency: efectivoDetails.currency,
                            breakdown: { [denominacion]: 1 },
                            metodo_pago_id: result[idIndex],
                            montoRecibido: Number.parseFloat(denominacion),
                            cambio: 0,
                          },
                        })
                        idIndex++
                      }
                    }
                  }
                  setMetodosPago([...metodosPago, ...newPayments])
                  logVentaStore(`PAGO EN EFECTIVO AGREGADO (EVENTO)`)
                } else {
                  // Lógica para otros métodos de pago (igual que autopago)
                  let metodoPagoParams: any = null
                  const formatExpiryDateForDB = (expiryDate: string): string => {
                    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
                      throw new Error("Formato de fecha de expiración inválido. Debe ser MM/YY.")
                    }
                    const [month, year] = expiryDate.split("/")
                    const fullYear = `20${year}`
                    const date = new Date(Number(fullYear), Number(month), 0)
                    const lastDay = date.getDate()
                    return `${fullYear}-${month.padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`
                  }

                  switch (method) {
                    case "tarjetaCredito": {
                      const cardDetails = details as TarjetaDetails
                      const expiryDate = formatExpiryDateForDB(cardDetails.fechaExpiracion)
                      metodoPagoParams = {
                        tipo: "tarjeta_credito",
                        details: {
                          tipo_tarjeta: getCardType(cardDetails.numeroTarjeta || ""),
                          numero: Number.parseInt(cardDetails.numeroTarjeta.replace(/\s/g, "")),
                          banco: cardDetails.banco,
                          fecha_vencimiento: expiryDate,
                        },
                      }
                      break
                    }
                    case "tarjetaDebito": {
                      const cardDetails = details as TarjetaDetails
                      const expiryDate = formatExpiryDateForDB(cardDetails.fechaExpiracion)
                      metodoPagoParams = {
                        tipo: "tarjeta_debito",
                        details: {
                          numero: Number.parseInt(cardDetails.numeroTarjeta.replace(/\s/g, "")),
                          banco: cardDetails.banco,
                          fecha_vencimiento: expiryDate,
                        },
                      }
                      break
                    }
                    case "puntos": {
                      metodoPagoParams = { tipo: "punto", details: {} }
                      break
                    }
                    case "cheque": {
                      metodoPagoParams = {
                        tipo: "cheque",
                        details: {
                          numeroCheque: Number.parseInt(details.numeroCheque),
                          banco: details.banco,
                        },
                      }
                      break
                    }
                    default:
                      throw new Error(`Método de pago desconocido: ${method}`)
                  }

                  if (metodoPagoParams) {
                    const result = await crearMetodoPago(metodoPagoParams, p_id_cliente, p_tipo_cliente)
                    if (typeof result !== "number") {
                      throw new Error("No se pudo crear el método de pago en la base de datos.")
                    }
                    const newPayment: PaymentMethod = {
                      method,
                      details: { ...details, metodo_pago_id: result },
                    }
                    setMetodosPago([...metodosPago, newPayment])
                    logVentaStore(`PAGO AGREGADO - ${method.toUpperCase()} (EVENTO)`)
                  }
                }
                setCurrentStep(Step.PAYMENT_SUMMARY)
              } catch (err: any) {
                setError(err.message || "Error al procesar el método de pago.")
                console.error(err)
              } finally {
                setIsProcessingPayment(false)
              }
            }}
            onCancel={() => setCurrentStep(Step.PRODUCT_SELECTION)}
            onViewSummary={() => setCurrentStep(Step.PAYMENT_SUMMARY)}
          />
        )

      case Step.PAYMENT_SUMMARY:
        return (
          <PaymentMethodSummary
            payments={metodosPago}
            items={carrito}
            total={total}
            convertirADolar={convertirADolar}
            onConfirm={async () => {
              console.log("Creando venta de evento con:", metodosPago)
              logVentaStore("INICIANDO CREACIÓN DE VENTA EVENTO")
              const success = await crearVentaCompleta(total)
              if (success) {
                console.log("✅ Venta de evento creada exitosamente")
                logVentaStore("VENTA EVENTO CREADA EXITOSAMENTE")
                setCurrentStep(Step.WELCOME)
                resetStore()
                logVentaStore("STORE RESETEADO")
              } else {
                console.error("❌ Error al crear la venta de evento")
                logVentaStore("ERROR AL CREAR VENTA EVENTO")
                setError(storeError || "Error al procesar la venta")
              }
            }}
            onBack={() => setCurrentStep(Step.PAYMENT)}
            onDeletePayment={(paymentIndex) => {
              const paymentToDelete = metodosPago[paymentIndex]
              const updatedPayments = metodosPago.filter((_, index) => index !== paymentIndex)
              setMetodosPago(updatedPayments)
              logVentaStore(`PAGO ELIMINADO - ${paymentToDelete?.method?.toUpperCase()} (EVENTO)`)
            }}
          />
        )
    }
  }

  return <div className="max-w-7xl mx-auto px-4 py-8">{renderStep()}</div>
}
