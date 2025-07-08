"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import PaymentView from "@/components/cajero/payment-view"
import PaymentMethodSummary from "@/components/cajero/payment-method-summary"
import { getClienteByDoc } from "@/api/get-cliente-by-doc"
import type { DocType, TarjetaDetails, PaymentMethod } from "@/lib/schemas"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader, X, ArrowLeft, Ticket, Calendar, MapPin, Clock, User } from "lucide-react"
import { useVentaStore, type EfectivoDetails as StoreEfectivoDetails } from "@/store/venta-store"
import { getCardType } from "@/lib/utils"
import { inicializarTasas } from "@/lib/utils"
import { useTasaStore } from "@/store/tasa-store"
import { registrarVentaEventoEnProceso } from "@/api/registrar-venta-evento-en-proceso";
import { getPuntos } from "@/api/get-puntos"
import { llamarFuncion } from "@/lib/server-actions"
import Link from "next/link"
import { crearMetodoPago } from "@/api/crear-metodo-pago"

// Steps enum for ticket sales
enum TicketStep {
  WELCOME = "welcome",
  ID_INPUT = "id_input",
  TICKET_SUMMARY = "ticket_summary",
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

export default function VentaEntradas() {
  const params = useParams()
  const eventId = params?.id as string

  /** Estado del store de venta */
  const {
    cliente,
    docType,
    documento,
    metodosPago,
    setCliente,
    setDocType,
    setDocumento,
    setMetodosPago,
    setVentaId,
    crearVentaEntradaCompleta,
    resetStore,
    isCreatingVenta,
    error: storeError,
    ventaId,
  } = useVentaStore()

  /** Estado local del componente */
  const [currentStep, setCurrentStep] = useState<TicketStep>(TicketStep.WELCOME)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [puntosDisponibles, setPuntosDisponibles] = useState(0)
  const [eventInfo, setEventInfo] = useState<any>(null)

  /** Hook para acceder al estado de las tasas */
  const { getTasa } = useTasaStore()

  /** Cargar y sondear tasas de cambio */
  useEffect(() => {
    console.log("🎫 Obteniendo tasas de cambio iniciales...")
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

  /** Cargar información del evento al montar el componente */
  useEffect(() => {
    async function fetchEventData() {
      if (!eventId) return

      try {
        // Cargar información básica del evento
        const eventData = await llamarFuncion("fn_get_evento_by_id", { p_evento_id: Number(eventId) })
        if (eventData && eventData.length > 0) {
          setEventInfo(eventData[0])
        }
      } catch (error) {
        console.error("Failed to fetch event data:", error)
        setError("Error al cargar los datos del evento")
      }
    }

    fetchEventData()
  }, [eventId])

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
        // Usar función de venta evento
        const tipoCliente = cliente.tipo_cliente === 'natural' ? 'Natural' : 'Juridico';
        const newVentaId = await registrarVentaEventoEnProceso(Number(eventId), cliente.id_cliente, tipoCliente)
        if (newVentaId) {
          setVentaId(newVentaId)
          currentVentaId = newVentaId
        } else {
          throw new Error("No se pudo iniciar la venta. Por favor, intente de nuevo.")
        }
      }
      if (currentVentaId) {
        // Para tickets, no necesitamos registrar detalles de productos
        console.log("🎫 Venta de ticket iniciada con ID:", currentVentaId)
        setCurrentStep(TicketStep.PAYMENT)
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al iniciar la venta.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  /** Calcular totales para el ticket */
  const ticketPrice = eventInfo?.precio || 0
  const iva = ticketPrice * 0.16
  const total = ticketPrice + iva
  const ticketPriceUSD = convertirADolar(ticketPrice)
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
        console.log("🎫 Cliente autenticado para venta de tickets")
        setCurrentStep(TicketStep.TICKET_SUMMARY)
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
      case TicketStep.WELCOME:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-8">
              <Ticket className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Venta de Entradas</h1>
              {eventInfo && (
                <div className="text-lg text-muted-foreground">
                  <p className="font-semibold">{eventInfo.nombre}</p>
                  <p>{new Date(eventInfo.fechaHoraInicio).toLocaleDateString()}</p>
                  {eventInfo.tieneTickets && (
                    <p className="text-2xl font-bold text-green-600 mt-2">Bs. {eventInfo.precio?.toFixed(2)}</p>
                  )}
                </div>
              )}
            </div>
            {eventInfo?.tieneTickets ? (
              <Button size="lg" onClick={() => setCurrentStep(TicketStep.ID_INPUT)}>
                <Ticket className="h-5 w-5 mr-2" />
                Vender Entrada
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-red-600 mb-4">Este evento no tiene entradas disponibles para la venta</p>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/eventos/${eventId}`}>Volver al Evento</Link>
                </Button>
              </div>
            )}
          </div>
        )

      case TicketStep.ID_INPUT:
        return (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/dashboard/eventos/${eventId}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="text-center mb-6">
              <Ticket className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Venta de Entrada</h2>
              <p className="text-muted-foreground">Ingrese el documento del cliente</p>
            </div>
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

      case TicketStep.TICKET_SUMMARY: {
        const clientName =
          cliente?.tipo_cliente === "natural" ? cliente.nombre_completo : cliente?.denominacion_comercial

        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">¡Hola, {clientName}!</h2>
              <p className="text-muted-foreground">Confirma la compra de tu entrada</p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Resumen de Entrada
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Info */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">{eventInfo?.nombre}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {eventInfo?.fechaHoraInicio
                          ? new Date(eventInfo.fechaHoraInicio).toLocaleDateString()
                          : "Fecha no disponible"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {eventInfo?.fechaHoraInicio
                          ? new Date(eventInfo.fechaHoraInicio).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Hora no disponible"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                      <MapPin className="h-4 w-4" />
                      <span>{eventInfo?.direccion || "Ubicación no disponible"}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cantidad de entradas:</span>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      1 entrada
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Precio de entrada:</span>
                      <div className="text-right">
                        <div>Bs. {ticketPrice.toFixed(2)}</div>
                        {ticketPriceUSD && (
                          <div className="text-sm text-muted-foreground">${ticketPriceUSD.toFixed(2)}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (16%):</span>
                      <div className="text-right">
                        <div>Bs. {iva.toFixed(2)}</div>
                        {ivaUSD && <div className="text-sm text-muted-foreground">${ivaUSD.toFixed(2)}</div>}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total a pagar:</span>
                      <div className="text-right">
                        <div>Bs. {total.toFixed(2)}</div>
                        {totalUSD && (
                          <div className="text-sm text-muted-foreground font-normal">${totalUSD.toFixed(2)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Información del Cliente</h4>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Nombre:</strong> {clientName}
                    </p>
                    <p>
                      <strong>Documento:</strong> {docType}-{documento}
                    </p>
                    {cliente?.tipo_cliente === "natural" && cliente?.telefono && (
                      <p>
                        <strong>Teléfono:</strong> {cliente.telefono}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setCurrentStep(TicketStep.ID_INPUT)} className="flex-1">
                Volver
              </Button>
              <Button onClick={handleProceedToPayment} disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Ticket className="h-4 w-4 mr-2" />
                    Proceder al Pago
                  </>
                )}
              </Button>
            </div>
          </div>
        )
      }

      case TicketStep.PAYMENT:
        return (
          <PaymentView
            items={[
              {
                sku: "TICKET-001",
                nombre_cerveza: `Entrada - ${eventInfo?.nombre || "Evento"}`,
                precio: total,
                quantity: 1,
                presentacion: "Digital",
                presentacion_id: 0,
                cerveza_id: 0,
                id_tipo_cerveza: 0,
                tipo_cerveza: "Entrada",
                stock_total: 0,
                marca: "",
                imagen: null,
              },
            ]}
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

                // Solo registrar la venta principal, sin detalles
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
                  console.log("🎫 Pago en efectivo agregado para ticket")
                } else {
                  // Lógica para otros métodos de pago
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
                    console.log(`🎫 Pago agregado - ${method.toUpperCase()} para ticket`)
                  }
                }
                setCurrentStep(TicketStep.PAYMENT_SUMMARY)
              } catch (err: any) {
                setError(err.message || "Error al procesar el método de pago.")
                console.error(err)
              } finally {
                setIsProcessingPayment(false)
              }
            }}
            onCancel={() => setCurrentStep(TicketStep.TICKET_SUMMARY)}
            onViewSummary={() => setCurrentStep(TicketStep.PAYMENT_SUMMARY)}
          />
        )

      case TicketStep.PAYMENT_SUMMARY:
        return (
          <PaymentMethodSummary
            payments={metodosPago}
            items={[
              {
                sku: "TICKET-001",
                nombre_cerveza: `Entrada - ${eventInfo?.nombre || "Evento"}`,
                precio: total,
                quantity: 1,
                presentacion: "Digital",
                presentacion_id: 0,
                cerveza_id: 0,
                id_tipo_cerveza: 0,
                tipo_cerveza: "Entrada",
                stock_total: 0,
                marca: "",
                imagen: null,
              },
            ]}
            total={total}
            convertirADolar={convertirADolar}
            onConfirm={async () => {
              console.log("🎫 Creando venta de ticket con:", metodosPago)
              // Solo registrar la venta principal, sin detalles
              const success = await crearVentaEntradaCompleta(total)
              if (success) {
                console.log("✅ Venta de ticket creada exitosamente")
                setCurrentStep(TicketStep.WELCOME)
                resetStore()
              } else {
                setError(storeError)
                console.error("❌ Error al crear la venta de ticket:", storeError)
              }
            }}
            onBack={() => setCurrentStep(TicketStep.PAYMENT)}
            onDeletePayment={(paymentIndex) => {
              const paymentToDelete = metodosPago[paymentIndex]
              const updatedPayments = metodosPago.filter((_, index) => index !== paymentIndex)
              setMetodosPago(updatedPayments)
              console.log(`🎫 Pago eliminado - ${paymentToDelete?.method?.toUpperCase()}`)
            }}
          />
        )
    }
  }

  return <div className="max-w-7xl mx-auto px-4 py-8">{renderStep()} {error && <div className="text-red-600 mt-4 text-center">{error}</div>}</div>
}
