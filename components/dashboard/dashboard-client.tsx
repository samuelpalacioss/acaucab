"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/date-range-picker";
import { ReportsTable } from "@/components/reports-table";
import type { DateRange } from "react-day-picker";
import { usePermissions } from "@/store/user-store";
import UnauthorizedPage from "@/components/auth/unauthorized-page";

/**
 * Componente cliente del dashboard principal
 * Maneja la interfaz de usuario y el estado del dashboard
 * Contiene únicamente la sección de reportes
 */
export default function DashboardClient() {
  // Estado para manejar el rango de fechas seleccionado
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const { tieneAccesoDashboard } = usePermissions();

  if (!tieneAccesoDashboard()) {
    return <UnauthorizedPage />;
  }

  return (
    <div id="dashboard-container" className="space-y-4 w-full max-w-[2000px] mx-auto px-4">
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
    </div>
  );
}
