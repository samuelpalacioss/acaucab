"use client"

import { Search, User, LogOut, Settings, UserIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import { getBCV } from "@/lib/bcv"
import { useState } from "react"
import { useEffect } from "react"
import { useUser } from "@/store/user-store"
import { useLogout } from "@/components/auth/logout-button"

export function TopNavbar() {
  const [bcv, setBcv] = useState<number>(0);
  
  /** Datos del usuario logueado desde el store */
  const { nombreUsuario, emailUsuario, rolUsuario, isAuthenticated } = useUser();
  const { logout } = useLogout();

  useEffect(() => {
    getBCV().then((data) => setBcv(data.price));
  }, []);

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 w-full">
        <SidebarTrigger className="mr-2" />
        <div className="flex items-center gap-2">
          <div className="font-semibold text-lg"></div>
          <Image src="/acaucab-logo.svg" alt="ACAUCAB Logo" width={100} height={35} />
          <div className="text-muted-foreground">•</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Tasa BCV: {bcv} Bs
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Seleccionar Tasa</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>BCV: {bcv} Bs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {/* <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar..." className="pl-8 w-full" />
          </div> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {isAuthenticated && nombreUsuario ? 
                      nombreUsuario.charAt(0).toUpperCase() :
                      <User className="h-4 w-4" />
                    }
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {isAuthenticated ? nombreUsuario : "Usuario"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {isAuthenticated ? emailUsuario : "No autenticado"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/** Mostrar rol si está autenticado */}
              {isAuthenticated && rolUsuario && (
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
            
              <DropdownMenuSeparator />
              
              {/** Logout con confirmación */}
              <DropdownMenuItem 
                onClick={logout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
