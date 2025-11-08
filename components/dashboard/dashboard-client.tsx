"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/date-range-picker";
import { ReportsTable } from "@/components/reports-table";
import type { DateRange } from "react-day-picker";
import { usePermissions, useUser } from "@/store/user-store";
import UnauthorizedPage from "@/components/auth/unauthorized-page";
import ProtectedRoute from "@/components/auth/protected-route";
import Image from "next/image";

/**
 * Componente cliente del dashboard principal
 * Maneja la interfaz de usuario y el estado del dashboard
 * Contiene únicamente la sección de reportes
 */
export default function DashboardClient() {
  // Estado para manejar el rango de fechas seleccionado
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const { tieneAccesoDashboard, tienePermiso } = usePermissions();
  const { nombreUsuario, permisos, usuario } = useUser();

  // Log user permissions when dashboard opens
  console.log("=== DASHBOARD USER PERMISSIONS ===");
  console.log("User:", nombreUsuario);
  console.log("User ID:", usuario?.id);
  console.log("Role:", usuario?.rol);
  console.log("Email:", usuario?.email);
  console.log("Permissions array:", permisos);
  console.log("Total permissions:", permisos.length);
  console.log("Permissions list:", permisos.join(", "));
  console.log("===================================");

  if (!tieneAccesoDashboard()) {
    return <UnauthorizedPage />;
  }

  /** Verificar si tiene permiso para ver reportes */
  const puedeVerReportes = tienePermiso('leer_reportes');

  /** Componente de bienvenida para usuarios sin acceso a reportes */
  const WelcomeSection = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 p-8">
      <div className="text-center space-y-6">
        {/* Logo de ACAUCAB */}
        <div className="flex justify-center mb-8">
          <Image 
            src="/acaucab-logo.svg" 
            alt="ACAUCAB Logo" 
            width={300} 
            height={115}
            className="opacity-90"
          />
        </div>
        
        {/* Mensaje de bienvenida */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            ¡Bienvenido al Dashboard!
          </h1>
          <h2 className="text-2xl text-gray-600">
            Hola, {nombreUsuario}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Has accedido exitosamente al sistema de gestión de ACAUCAB. 
            Desde aquí podrás acceder a las diferentes secciones del sistema 
            según los permisos asignados a tu rol.
          </p>
        </div>

        {/* Tarjetas informativas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <Card className="p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Sistema Seguro</h3>
              <p className="text-sm text-gray-600">
                Acceso controlado con permisos específicos para cada usuario
              </p>
            </div>
          </Card>

          <Card className="p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Gestión Eficiente</h3>
              <p className="text-sm text-gray-600">
                Herramientas modernas para administrar tu cooperativa
              </p>
            </div>
          </Card>

          <Card className="p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Colaboración</h3>
              <p className="text-sm text-gray-600">
                Trabajo en equipo para el crecimiento de ACAUCAB
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div id="dashboard-container" className="space-y-4 w-full max-w-[2000px] mx-auto px-4">
      {puedeVerReportes ? (
        <div id="dashboard-header" className="flex items-center justify-between w-full">
          <Tabs defaultValue="reports" className="w-full">
            <div id="tabs-controls" className="flex items-center justify-between">
              <TabsList id="tabs-list">
                <TabsTrigger value="reports" id="reports-tab">
                  Reportes
                </TabsTrigger>
              </TabsList>
              <div id="date-picker-container" className="flex items-center gap-2">
                <DateRangePicker date={date} setDate={setDate} />
              </div>
            </div>

            {/* Pestaña de Reportes */}
            <TabsContent value="reports" className="space-y-4 mt-4" id="reports-content">
              <Card id="reports-card">
                <CardHeader id="reports-header">
                  <CardTitle id="reports-title">Reportes</CardTitle>
                </CardHeader>
                <CardContent id="reports-card-content">
                  <ReportsTable />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <WelcomeSection />
      )}
    </div>
  );
}
