"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { obtenerTodasLasOrdenesDeCompra } from "@/lib/server-actions";
import { OrdenCompraResumen } from "@/models/orden-compra";
import { ArrowRight } from "lucide-react";
import { usePermissions } from "@/store/user-store";

export function OrdenesCompraClient() {
  const [ordenes, setOrdenes] = useState<OrdenCompraResumen[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { puedeEditarOrdenesDeCompra, puedeEditarOrdenesDeCompraProveedor } = usePermissions();
  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        setLoading(true);
        const data = await obtenerTodasLasOrdenesDeCompra();
        setOrdenes(data);
      } catch (error) {
        console.error("Error al obtener las órdenes de compra:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  const handleViewDetails = (id: number) => {
    router.push(`/dashboard/inventario/ordenes/${id}`);
  };

  /** Formatear moneda */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency: "VES",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  /** Formatear fecha */
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /** Color del badge según el estado */
  const getStatusBadgeColor = (estado: string): "default" | "secondary" | "destructive" | "outline" => {
    const estadoLower = estado.toLowerCase();
    switch (estadoLower) {
      case "finalizado": return "default";
      case "aprobado": return "secondary";
      case "en proceso": return "outline";
      case "cancelado": return "destructive";
      default: return "outline";
    }
  };

  if (loading) {
    return <div>Cargando órdenes de compra...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Órdenes de Compra</CardTitle>
        <CardDescription>
          Aquí puedes ver un resumen de todas las órdenes de compra registradas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Orden</TableHead>
              <TableHead>Fecha Solicitud</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead className="text-right">Monto Total</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordenes.length > 0 ? (
              ordenes.map((orden) => (
                <TableRow key={orden.orden_id}>
                  <TableCell className="font-medium">#{orden.orden_id}</TableCell>
                  <TableCell>{formatDate(orden.fecha_solicitud)}</TableCell>
                  <TableCell>{orden.proveedor_razon_social || "N/A"}</TableCell>
                  <TableCell>{orden.usuario_nombre || "N/A"}</TableCell>
                  <TableCell className="text-right">{formatCurrency(orden.precio_total)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusBadgeColor(orden.estado_actual)}>
                      {orden.estado_actual}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    { puedeEditarOrdenesDeCompra() && (
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(orden.orden_id)}>
                      Ver Detalles
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No se encontraron órdenes de compra.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
