"use client";

import type React from "react";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  Users,
  DollarSign,
  ChevronDown,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  submenu?: { title: string; path: string }[];
}

export function MainSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Inventario",
      icon: Package,
      submenu: [
        { title: "Detalle de Inventario", path: "/dashboard/inventario/detalle" },
        { title: "Orden de Compra", path: "/dashboard/inventario/ordenes" },
      ],
    },
    {
      title: "Finanzas",
      icon: DollarSign,
      submenu: [
        { title: "Ventas", path: "/dashboard/finanzas/ventas" },
      ],
    },
    {
      title: "Usuarios",
      icon: Users,
      submenu: [
        { title: "Todos los usuarios", path: "/dashboard/usuarios" },
        { title: "Nuevo usuario", path: "/dashboard/usuarios/nuevo" },
        { title: "Roles y Permisos", path: "/dashboard/usuarios/roles" },
      ],
    },
    {
      title: "Proveedores",
      icon: Truck,
      submenu: [
        { title: "Solicitudes de Compra", path: "/dashboard/proveedores/ordenes" },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 justify-center ">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
            A
          </div>
          <Image src="/acaucab-logo.svg" alt="ACAUCAB Logo" width={100} height={35} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.submenu ? (
                <Collapsible className="w-full">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={activeItem === item.title} onClick={() => setActiveItem(item.title)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.submenu.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.path}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={activeItem === item.title}
                  onClick={() => setActiveItem(item.title)}
                >
                  <Link href={item.path || "#"}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">© 2025 CRM Dashboard</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
