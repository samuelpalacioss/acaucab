"use client"

import { useState } from "react"
import { MoreHorizontal, AlertTriangle, ShoppingCart, Calendar, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { DocumentsTable } from "@/components/documents-table"
import { TeamTable } from "@/components/team-table"
import { ReportsTable } from "@/components/reports-table"
import type { DateRange } from "react-day-picker"
import { SalesChart } from "@/components/sales-chart"
import { TopProductsChart } from "@/components/top-products-chart"

export default function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  return (
    <div className="space-y-4 w-full max-w-[2000px] mx-auto px-4">
    <div className="flex items-center justify-between w-full">
      <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              {/* <TabsTrigger value="documents">Documentos</TabsTrigger> */}
              <TabsTrigger value="team">Equipo</TabsTrigger>
              <TabsTrigger value="reports">Reportes</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <DateRangePicker date={date} setDate={setDate} />
            </div>
          </div>

          {/* Pestaña de Resumen */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Tasa BCV actual */}
            <div className="flex justify-between items-center border p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span className="font-medium">Tasa BCV actual:</span>
              </div>
              <div className="font-bold text-lg">80.02 Bs</div>
              <Badge variant="outline" className="ml-2">
                Tiempo real
              </Badge>
            </div>

            {/* Ventas del día y Pedidos */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas del día</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">Bs. 2,345.67</div>
                      <div className="text-xs flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15.2% vs ayer
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">342 </div>
                      <div className="text-xs flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.7% vs ayer
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 h-[100px] border-t pt-2">
                    <div className="text-xs text-center text-muted-foreground">Gráfico de ventas por día</div>
                    <SalesChart />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                  <Badge variant="outline">Tiempo real</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs mt-1">Pendientes</div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs mt-1">En preparación</div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs mt-1">Listos para entrega</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      Ver todos los pedidos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top 5 productos y Stock crítico */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top 5 productos</CardTitle>
                  <Badge variant="outline">Diario</Badge>
                </CardHeader>
                <CardContent>
                  <TopProductsChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stock crítico</CardTitle>
                  <Badge variant="outline">Día</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center h-24 w-24 rounded-full border-8">
                        <div className="text-3xl font-bold">14</div>
                      </div>
                      <div className="mt-2 text-sm">SKUs &lt; 100 </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">Cerveza Tipo A - 45 </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">Cerveza Tipo B - 78 </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">Cerveza Tipo C - 23 </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      Ver lista completa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Órdenes de compra y Promociones activas */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Órdenes de compra por aprobar</CardTitle>
                  <Badge variant="outline">Hora</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold">8</div>
                      <div className="text-sm text-muted-foreground mt-1">Órdenes</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ir a Órdenes de Compra
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">DiarioDeUnaCerveza</CardTitle>
                  <Badge variant="outline">Ventas</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold">5</div>
                      <div className="text-sm text-muted-foreground mt-1">Promociones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold">36</div>
                      <div className="text-sm text-muted-foreground mt-1">Ventas</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cerveza Lager</span>
                      <Badge variant="outline">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cerveza Ale</span>
                      <Badge variant="outline">20</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cerveza Belga</span>
                      <Badge variant="outline">5</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Eventos próximos y Puntos emitidos/canjeados */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eventos próximos</CardTitle>
                  <Badge variant="outline">Diario</Badge>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-2">
                    <div className="text-xs text-center text-muted-foreground mb-2">Tabla de eventos próximos</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs border-b pb-1">
                        <span>Festival de Cerveza Artesanal</span>
                        <span>15/05/2025</span>
                        <span>145/200</span>
                      </div>
                      <div className="flex justify-between text-xs border-b pb-1">
                        <span>Cata de Cervezas Premium</span>
                        <span>22/05/2025</span>
                        <span>32/50</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Lanzamiento Edición Especial</span>
                        <span>28/05/2025</span>
                        <span>78/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Ver calendario completo
                    </Button>
                  </div>
                </CardContent>
              </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cumplimiento horario</CardTitle>
                  <Badge variant="outline">Diario</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative h-32 w-32 border-8 rounded-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl font-bold">87%</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-center">
                      <p>Arribos puntuales hoy</p>
                      <p className="text-muted-foreground">26 de 30 empleados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cumplimiento horario e Indicador ODS */}
            <div className="grid gap-4 md:grid-cols-2">

            </div>
          </TabsContent>

          {/* Pestaña de Documentos */}
          <TabsContent value="documents" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentsTable />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Equipo */}
          <TabsContent value="team" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipo</CardTitle>
              </CardHeader>
              <CardContent>
                <TeamTable />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Reportes */}
          <TabsContent value="reports" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Reportes</CardTitle>
              </CardHeader>
              <CardContent>
                <ReportsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
