"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * Interface para las props del modal de error
 */
interface ErrorModalProps {
  /**
   * Controla si el modal está abierto o cerrado
   */
  isOpen: boolean;
  /**
   * Función para cerrar el modal
   */
  onClose: () => void;
  /**
   * Título del error (opcional, por defecto "Error")
   */
  title?: string;
  /**
   * Mensaje de error a mostrar
   */
  errorMessage: string;
}

/**
 * Componente modal para mostrar errores de la base de datos
 * Diseñado para ser reutilizable en toda la aplicación
 */
export default function ErrorModal({ 
  isOpen, 
  onClose, 
  title = "Error", 
  errorMessage 
}: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" id="error-modal-dialog">
        <DialogHeader>
          <DialogTitle id="error-modal-title" className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Se ha producido un error en la operación solicitada.
          </DialogDescription>
        </DialogHeader>
        
        <div id="error-modal-content" className="space-y-4">
          {/* Alert con el mensaje de error */}
          <Alert variant="destructive" id="error-alert">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription id="error-message">
              {errorMessage}
            </AlertDescription>
          </Alert>
          
          {/* Botón para cerrar el modal */}
          <div id="error-modal-actions" className="flex justify-end">
            <Button 
              onClick={onClose} 
              variant="outline"
              id="close-error-button"
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 