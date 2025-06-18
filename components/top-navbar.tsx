"use client"

import { Search } from "lucide-react"
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
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import { getBCV } from "@/lib/bcv"
import { useState } from "react"
import { useEffect } from "react"

export function TopNavbar() {
  const [bcv, setBcv] = useState<number>(0);

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
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
