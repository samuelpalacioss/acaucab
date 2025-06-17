"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useState } from "react"

// Datos de ejemplo para los gráficos
const revenueData = [
  { month: "Ene", ingresos: 4000, perdidas: 2400 },
  { month: "Feb", ingresos: 3000, perdidas: 1398 },
  { month: "Mar", ingresos: 2000, perdidas: 9800 },
  { month: "Abr", ingresos: 2780, perdidas: 3908 },
  { month: "May", ingresos: 1890, perdidas: 4800 },
  { month: "Jun", ingresos: 2390, perdidas: 3800 },
  { month: "Jul", ingresos: 3490, perdidas: 4300 },
  { month: "Ago", ingresos: 4000, perdidas: 2400 },
  { month: "Sep", ingresos: 3000, perdidas: 1398 },
  { month: "Oct", ingresos: 2000, perdidas: 9800 },
  { month: "Nov", ingresos: 2780, perdidas: 3908 },
  { month: "Dic", ingresos: 1890, perdidas: 4800 },
]

const growthData = [
  { month: "Ene", tasa: 2.5 },
  { month: "Feb", tasa: 1.8 },
  { month: "Mar", tasa: -0.5 },
  { month: "Abr", tasa: 0.7 },
  { month: "May", tasa: 1.2 },
  { month: "Jun", tasa: 2.0 },
  { month: "Jul", tasa: 2.8 },
  { month: "Ago", tasa: 3.2 },
  { month: "Sep", tasa: 2.7 },
  { month: "Oct", tasa: 1.5 },
  { month: "Nov", tasa: 0.8 },
  { month: "Dic", tasa: 1.9 },
]

const topProductsData = [
  { name: "Producto A", value: 400 },
  { name: "Producto B", value: 300 },
  { name: "Producto C", value: 300 },
  { name: "Producto D", value: 200 },
  { name: "Producto E", value: 100 },
]

// Modificamos los colores para usar escala de grises
const COLORS = ["#333333", "#666666", "#999999", "#CCCCCC", "#EEEEEE"]

const orderStats = {
  weekly: 145,
  monthly: 632,
  yearly: 7584,
}

export default function FinancialStatsPage() {
  // Estados para controlar los valores de los Select
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedPeriod, setSelectedPeriod] = useState("all")

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estadísticas Financieras</h1>
        <div className="flex items-center gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1">Q1</SelectItem>
              <SelectItem value="q2">Q2</SelectItem>
              <SelectItem value="q3">Q3</SelectItem>
              <SelectItem value="q4">Q4</SelectItem>
              <SelectItem value="all">Todo el año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bs. 1,245,300.00</div>
            <p className="text-xs text-muted-foreground">+12.5% respecto al período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pérdidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bs. 345,800.00</div>
            <p className="text-xs text-muted-foreground">-5.2% respecto al período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Beneficio Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bs. 899,500.00</div>
            <p className="text-xs text-muted-foreground">+18.7% respecto al período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ingresos" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="ingresos">Ingresos vs Pérdidas</TabsTrigger>
          <TabsTrigger value="crecimiento">Tasa de Crecimiento</TabsTrigger>
        </TabsList>
        <TabsContent value="ingresos">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos vs Pérdidas</CardTitle>
              <CardDescription>Comparativa mensual de ingresos y pérdidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ingresos" fill="#333333" name="Ingresos" />
                    <Bar dataKey="perdidas" fill="#666666" name="Pérdidas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="crecimiento">
          <Card>
            <CardHeader>
              <CardTitle>Tasa de Crecimiento</CardTitle>
              <CardDescription>Evolución mensual de la tasa de crecimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="tasa" stroke="#333333" name="Tasa de Crecimiento (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
            <CardDescription>Top 5 productos por volumen de ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProductsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#333333"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {topProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de Pedidos</CardTitle>
            <CardDescription>Resumen de pedidos por período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                <span className="text-sm text-muted-foreground">Semanal</span>
                <span className="text-3xl font-bold">{orderStats.weekly}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                <span className="text-sm text-muted-foreground">Mensual</span>
                <span className="text-3xl font-bold">{orderStats.monthly}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                <span className="text-sm text-muted-foreground">Anual</span>
                <span className="text-3xl font-bold">{orderStats.yearly}</span>
              </div>
            </div>
            <div className="mt-6 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { period: "Sem", pedidos: orderStats.weekly },
                    { period: "Mes", pedidos: orderStats.monthly },
                    { period: "Año", pedidos: orderStats.yearly / 12 }, // Promedio mensual
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pedidos" fill="#333333" name="Pedidos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}
