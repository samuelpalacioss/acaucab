"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, LogOut, Settings, UserIcon, LayoutDashboard } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, usePermissions } from "@/store/user-store";
import { useLogout } from "@/components/auth/logout-button";
import { useVentaStore } from "@/store/venta-store";

const navLinks = [
  { href: "/eventos", label: "Eventos" },
  // { href: "/diario-de-cerveza", label: "DiarioDeCerveza" },
  { href: "/productos", label: "Productos" },
];

export default function Navbar() {
  /** Datos del usuario y permisos desde el store */
  const { nombreUsuario, emailUsuario, rolUsuario, isAuthenticated } = useUser();
  const { tieneAccesoDashboard } = usePermissions();
  const { logout } = useLogout();
  const { carrito } = useVentaStore();

  const totalItems = carrito.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full py-4 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 flex items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-black">
            <Image src="/acaucab-logo.svg" alt="Logo" width={130} height={50} />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8 ml-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-black hover:text-gray-600 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4 ml-auto">
          {/** Carrito de compras */}
          <Link href="/carrito" className="relative text-black hover:text-gray-600 p-2">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs p-1"
              >
                {totalItems}
              </Badge>
            )}
          </Link>

          {/** Si no está autenticado, mostrar botón de login */}
          {!isAuthenticated ? (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", className: "font-medium" })}
            >
              Iniciar Sesión
            </Link>
          ) : (
            <div className="flex items-center space-x-3">
              {/** Botón de Dashboard si tiene permisos */}
              {tieneAccesoDashboard() && (
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "default",
                    className: "font-medium bg-blue-600 hover:bg-blue-700",
                  })}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              )}

              {/** Dropdown del usuario autenticado */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-100 text-gray-800">
                        {nombreUsuario ? (
                          nombreUsuario.charAt(0).toUpperCase()
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {nombreUsuario || "Usuario"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {emailUsuario || "No disponible"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/** Mostrar rol si está disponible */}
                  {rolUsuario && (
                    <>
                      <DropdownMenuItem disabled>
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4" />
                          <span>Rol:</span>
                          <Badge variant="secondary" className="ml-auto">
                            {rolUsuario}
                          </Badge>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {/** Logout con confirmación */}
                  <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
