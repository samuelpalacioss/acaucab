import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MainSidebar } from "@/components/main-sidebar"
import { TopNavbar } from "@/components/top-navbar"

/** 
 * Layout principal para la sección de dashboard
 * @param {React.ReactNode} children - Componentes hijos que se renderizarán dentro del layout
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <div className="grid grid-cols-[250px_2fr] w-full min-h-screen">
        <MainSidebar />
        <div className="flex flex-col flex-1">
          <TopNavbar />
          <main className="flex-1 p-10">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export const metadata = {
  generator: 'v0.dev'
};
