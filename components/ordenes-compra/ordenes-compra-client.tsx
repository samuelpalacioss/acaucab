"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrdenesCompraTable } from "@/components/ordenes-compra-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrdenesCompraClientProps {
  pageTitle?: string;
  actions?: ReactNode;
}

export function OrdenesCompraClient({ pageTitle = "Órdenes de Compra", actions }: OrdenesCompraClientProps) {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        <div className="flex gap-2">{actions}</div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filtros</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por número o proveedor..." className="pl-8" />
            </div>

            <DateRangePicker
              date={{
                from: date.from,
                to: date.to,
              }}
              setDate={(newDate) => {
                if (newDate) {
                  setDate({
                    from: newDate.from,
                    to: newDate.to,
                  });
                }
              }}
            />

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="enviada">Enviada</SelectItem>
                <SelectItem value="aprobada">Aprobada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="enviadas">Enviadas</TabsTrigger>
              <TabsTrigger value="aprobadas">Aprobadas</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <OrdenesCompraTable />
        </CardContent>
      </Card>
    </div>
  );
}
