"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FileUp, Download } from "lucide-react"

interface PayrollDetailModalProps {
  isOpen: boolean
  onClose: () => void
  employee: any
}

export function PayrollDetailModal({ isOpen, onClose, employee }: PayrollDetailModalProps) {
  const [activeTab, setActiveTab] = useState("detalles")
  const [observations, setObservations] = useState("")

  if (!employee) return null

  // Datos de ejemplo para conceptos de pago
  const paymentConcepts = [
    { concept: "Salario base", amount: employee.salarioBase },
    { concept: "Bono de asistencia", amount: employee.salarioBase * 0.05 },
    { concept: "Horas extras", amount: 0 },
    { concept: "Subtotal ingresos", amount: employee.salarioBase * 1.05, isSubtotal: true },
    { concept: "IVSS (4%)", amount: -employee.salarioBase * 0.04, isDeduction: true },
    { concept: "Impuesto sobre la renta", amount: -employee.salarioBase * 0.01, isDeduction: true },
    { concept: "Subtotal deducciones", amount: -employee.salarioBase * 0.05, isSubtotal: true, isDeduction: true },
    { concept: "Total a pagar", amount: employee.netoAPagar, isTotal: true },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Detalle de pago - {employee.nombre}</DialogTitle>
          <DialogDescription>Período: Abril 2025 - 2da Quincena</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="detalles">Detalles de pago</TabsTrigger>
            <TabsTrigger value="comprobantes">Comprobantes</TabsTrigger>
          </TabsList>

          <TabsContent value="detalles" className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              {/* Información del empleado */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium mb-1">Cédula</p>
                  <p className="text-sm">{employee.cedula}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Nombre completo</p>
                  <p className="text-sm">{employee.nombre}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Cargo</p>
                  <p className="text-sm">Analista de Sistemas</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Fecha de ingreso</p>
                  <p className="text-sm">15/01/2023</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Departamento</p>
                  <p className="text-sm">Tecnología</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Horas trabajadas</p>
                  <p className="text-sm">{employee.horasTrabajadas} horas</p>
                </div>
              </div>

              {/* Tabla de conceptos de pago */}
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Concepto</TableHead>
                      <TableHead className="text-right">Monto (Bs)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentConcepts.map((item, index) => (
                      <TableRow
                        key={index}
                        className={
                          item.isSubtotal ? "bg-gray-50 font-medium" : item.isTotal ? "bg-gray-100 font-bold" : ""
                        }
                      >
                        <TableCell>{item.concept}</TableCell>
                        <TableCell className={`text-right ${item.isDeduction ? "text-gray-600" : ""}`}>
                          {item.amount.toLocaleString("es-VE")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Observaciones */}
              <div className="mt-6">
                <Label htmlFor="observations">Observaciones</Label>
                <Textarea
                  id="observations"
                  placeholder="Añadir observaciones sobre este pago..."
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="mt-2"
                />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="comprobantes" className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              {/* Subir comprobantes */}
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <FileUp className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium mb-1">Arrastre archivos aquí o haga clic para seleccionar</p>
                  <p className="text-xs text-gray-500">Soporta PDF, JPG o PNG (máx. 5MB)</p>
                  <Input type="file" className="hidden" id="file-upload" accept=".pdf,.jpg,.jpeg,.png" />
                  <Label htmlFor="file-upload" className="mt-4 inline-block">
                    <Button variant="outline" size="sm" type="button">
                      Seleccionar archivo
                    </Button>
                  </Label>
                </div>

                {/* Lista de comprobantes */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Comprobantes adjuntos</p>
                  <div className="border rounded-md p-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">comprobante-transferencia.pdf</p>
                      <p className="text-xs text-gray-500">Subido el 15/04/2025</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onClose}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
