"use client"

import type React from "react"

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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FileUp, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ImportAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImportAttendanceModal({ isOpen, onClose }: ImportAttendanceModalProps) {
  const [fileSelected, setFileSelected] = useState(false)
  const [fileName, setFileName] = useState("")
  const [previewData, setPreviewData] = useState<any[]>([])
  const [importStatus, setImportStatus] = useState<"idle" | "preview" | "success" | "error">("idle")

  // Función para manejar la selección de archivo
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFileSelected(true)
      // Simulamos la lectura del archivo y generamos datos de vista previa
      setTimeout(() => {
        const mockData = [
          { cedula: "V-12345678", nombre: "Juan Pérez", entrada: "08:00", salida: "17:00", horas: 9 },
          { cedula: "V-23456789", nombre: "María González", entrada: "08:15", salida: "17:30", horas: 9.25 },
          { cedula: "V-34567890", nombre: "Carlos Rodríguez", entrada: "07:45", salida: "16:45", horas: 9 },
          { cedula: "V-45678901", nombre: "Ana Martínez", entrada: "08:30", salida: "17:15", horas: 8.75 },
          { cedula: "V-56789012", nombre: "Luis Sánchez", entrada: "08:00", salida: "16:30", horas: 8.5 },
        ]
        setPreviewData(mockData)
        setImportStatus("preview")
      }, 1000)
    }
  }

  // Función para confirmar la importación
  const handleConfirmImport = () => {
    setImportStatus("success")
    // Aquí iría la lógica para procesar los datos importados
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Importar datos de asistencia</DialogTitle>
          <DialogDescription>
            Importe el archivo de asistencia del sistema biométrico para actualizar las horas trabajadas.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          {importStatus === "idle" && (
            <div className="border-2 border-dashed rounded-md p-8 text-center">
              <FileUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">Arrastre el archivo aquí o haga clic para seleccionar</p>
              <p className="text-sm text-gray-500 mb-6">Soporta archivos .txt o .csv del sistema biométrico</p>
              <Input
                type="file"
                className="hidden"
                id="attendance-file"
                accept=".txt,.csv"
                onChange={handleFileSelect}
              />
              <Label htmlFor="attendance-file" className="inline-block">
                <Button variant="outline" type="button">
                  Seleccionar archivo
                </Button>
              </Label>
            </div>
          )}

          {importStatus === "preview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Archivo seleccionado:</p>
                  <p className="text-sm">{fileName}</p>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  id="attendance-file-change"
                  accept=".txt,.csv"
                  onChange={handleFileSelect}
                />
                <Label htmlFor="attendance-file-change" className="inline-block">
                  <Button variant="outline" size="sm" type="button">
                    Cambiar archivo
                  </Button>
                </Label>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Vista previa de datos:</p>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cédula</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Hora entrada</TableHead>
                        <TableHead>Hora salida</TableHead>
                        <TableHead>Horas trabajadas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.cedula}</TableCell>
                          <TableCell>{row.nombre}</TableCell>
                          <TableCell>{row.entrada}</TableCell>
                          <TableCell>{row.salida}</TableCell>
                          <TableCell>{row.horas}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Información</AlertTitle>
                <AlertDescription>
                  Se actualizarán las horas trabajadas para {previewData.length} empleados. Esta acción afectará el
                  cálculo de la nómina actual.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {importStatus === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
              <p className="text-xl font-medium mb-2">Importación exitosa</p>
              <p className="text-sm text-gray-500">
                Los datos de asistencia han sido importados correctamente y las horas trabajadas han sido actualizadas.
              </p>
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          {importStatus === "idle" && (
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          )}

          {importStatus === "preview" && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmImport}>Confirmar importación</Button>
            </>
          )}

          {importStatus === "success" && <Button onClick={onClose}>Cerrar</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
