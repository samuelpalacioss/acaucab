"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { obtenerTodasLasOrdenesDeCompra } from "@/lib/server-actions";
import { OrdenCompraResumen } from "@/models/orden-compra";
import { ArrowRight } from "lucide-react";
import { useUserStore } from "@/store/user-store";

export function OrdenesCompraClient() {
  const [ordenes, setOrdenes] = useState<OrdenCompraResumen[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();
  
  /** Obtener datos del store directamente */
  const { usuario, tienePermiso, esMiembro, getMiembroInfo } = useUserStore();
  
  /** Verificar permisos para el renderizado */
  const puedeEditarOrdenesDeCompra = tienePermiso('editar_orden_de_compra');
  const puedeEditarOrdenesDeCompraProveedor = tienePermiso('editar_orden_de_compra_proveedor');
  
  /** Función para cargar datos */
  const fetchOrdenes = async () => {
    if (dataLoaded || loading) return; // Evitar múltiples cargas
    
    try {
      setLoading(true);
      console.log("Cargando órdenes de compra...");
      const data = await obtenerTodasLasOrdenesDeCompra();
      console.log("Datos obtenidos:", data);
      
      // Verificar permisos al momento de filtrar
      const puedeEditarOrdenesDeCompra = tienePermiso('editar_orden_de_compra');
      const puedeEditarOrdenesDeCompraProveedor = tienePermiso('editar_orden_de_compra_proveedor');
      const esUsuarioMiembro = esMiembro();
      const miembroInfo = getMiembroInfo();
      
      // Filtrar órdenes según permisos del usuario
      let ordenesFiltradas = data;
      
      // Si el usuario solo tiene permisos de proveedor y es un miembro
      if (!puedeEditarOrdenesDeCompra && puedeEditarOrdenesDeCompraProveedor && esUsuarioMiembro && miembroInfo) {
        // Filtrar solo las órdenes que pertenecen a este miembro
        ordenesFiltradas = data.filter(orden => 
          orden.proveedor_rif === miembroInfo.rif && 
          orden.proveedor_naturaleza_rif === miembroInfo.naturaleza_rif
        );
        console.log("Órdenes filtradas para miembro:", ordenesFiltradas);
      }
      
      setOrdenes(ordenesFiltradas);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error al obtener las órdenes de compra:", error);
    } finally {
      setLoading(false);
    }
  };

  /** Cargar datos cuando el componente se monta y el usuario está disponible */
  useEffect(() => {
    if (usuario && !dataLoaded && !loading) {
      fetchOrdenes();
    }
  }, [usuario?.id]); // Solo depender del ID del usuario, que es estable

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
                  <TableCell>{orden.proveedor_razon_social || "Administrador"}</TableCell>
                  <TableCell>{orden.usuario_nombre || "Administrador"}</TableCell>
                  <TableCell className="text-right">{formatCurrency(orden.precio_total)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusBadgeColor(orden.estado_actual)}>
                      {orden.estado_actual}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    { (puedeEditarOrdenesDeCompra || puedeEditarOrdenesDeCompraProveedor) && (
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
