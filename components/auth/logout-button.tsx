"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Props para el componente LogoutButton
 */
interface LogoutButtonProps {
  /** Mostrar solo icono (sin texto) */
  iconOnly?: boolean;
  /** Tamaño del botón */
  size?: "default" | "sm" | "lg" | "icon";
  /** Variante del botón */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /** Mostrar diálogo de confirmación */
  showConfirmation?: boolean;
  /** ClassName personalizada */
  className?: string;
}

/**
 * Componente de botón para cerrar sesión
 * Limpia el store de usuario y redirige al login
 */
export default function LogoutButton({
  iconOnly = false,
  size = "default",
  variant = "outline",
  showConfirmation = true,
  className = ""
}: LogoutButtonProps) {
  const router = useRouter();
  const { clearUsuario } = useUserStore();

  /**
   * Manejar logout del usuario
   */
  const handleLogout = () => {
    /** Limpiar datos del usuario del store */
    clearUsuario();
    
    /** Redirigir al login */
    router.push("/login");
  };

  /** Contenido del botón */
  const buttonContent = (
    <>
      <LogOut className={iconOnly ? "h-4 w-4" : "h-4 w-4 mr-2"} />
      {!iconOnly && "Cerrar Sesión"}
    </>
  );

  /** Si no requiere confirmación, botón directo */
  if (!showConfirmation) {
    return (
      <Button
        onClick={handleLogout}
        variant={variant}
        size={size}
        className={className}
      >
        {buttonContent}
      </Button>
    );
  }

  /** Botón con diálogo de confirmación */
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
        >
          {buttonContent}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cerrar Sesión?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder al sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
            Cerrar Sesión
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/**
 * Hook personalizado para logout
 * Proporciona función de logout reutilizable
 */
export const useLogout = () => {
  const router = useRouter();
  const { clearUsuario } = useUserStore();

  const logout = () => {
    clearUsuario();
    router.push("/login");
  };

  return { logout };
}; 