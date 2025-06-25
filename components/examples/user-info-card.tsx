"use client";

import { User, Shield, Eye, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser, usePermissions } from "@/store/user-store";
import LogoutButton from "@/components/auth/logout-button";

/**
 * Componente de ejemplo que muestra cómo usar el store de usuario
 * Demuestra verificación de permisos y acceso a datos del usuario
 */
export default function UserInfoCard() {
  /** Datos del usuario desde el store */
  const { usuario, nombreUsuario, emailUsuario, rolUsuario, permisos } = useUser();
  
  /** Hooks de permisos para verificaciones */
  const {
    puedeCrearUsuarios,
    puedeEditarUsuarios,
    puedeEliminarUsuarios,
    puedeVerHistorialVentas,
    puedeProcesarPagos,
    tieneAccesoSeccion
  } = usePermissions();

  if (!usuario) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No hay usuario autenticado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <CardTitle>Información del Usuario</CardTitle>
        </div>
        <CardDescription>
          Datos del usuario autenticado y permisos disponibles
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/** Información básica del usuario */}
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Nombre:</p>
            <p className="text-base">{nombreUsuario}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600">Email:</p>
            <p className="text-base">{emailUsuario}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600">Rol:</p>
            <Badge variant="secondary" className="mt-1">
              <Shield className="w-3 h-3 mr-1" />
              {rolUsuario}
            </Badge>
          </div>
        </div>

        <Separator />

        {/** Secciones del dashboard accesibles */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Acceso a Secciones:</p>
          <div className="flex flex-wrap gap-1">
            {tieneAccesoSeccion('usuarios') && (
              <Badge variant="outline">Usuarios</Badge>
            )}
            {tieneAccesoSeccion('ventas') && (
              <Badge variant="outline">Ventas</Badge>
            )}
            {tieneAccesoSeccion('compras') && (
              <Badge variant="outline">Compras</Badge>
            )}
            {tieneAccesoSeccion('inventario') && (
              <Badge variant="outline">Inventario</Badge>
            )}
            {tieneAccesoSeccion('reportes') && (
              <Badge variant="outline">Reportes</Badge>
            )}
          </div>
        </div>

        <Separator />

        {/** Acciones específicas permitidas */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Acciones Permitidas:</p>
          <div className="grid grid-cols-2 gap-2">
            {puedeCrearUsuarios() && (
              <Button variant="outline" size="sm" className="justify-start">
                <Plus className="w-3 h-3 mr-1" />
                Crear Usuarios
              </Button>
            )}
            
            {puedeEditarUsuarios() && (
              <Button variant="outline" size="sm" className="justify-start">
                <Edit className="w-3 h-3 mr-1" />
                Editar Usuarios
              </Button>
            )}
            
            {puedeEliminarUsuarios() && (
              <Button variant="outline" size="sm" className="justify-start">
                <Trash2 className="w-3 h-3 mr-1" />
                Eliminar Usuarios
              </Button>
            )}
            
            {puedeVerHistorialVentas() && (
              <Button variant="outline" size="sm" className="justify-start">
                <Eye className="w-3 h-3 mr-1" />
                Ver Ventas
              </Button>
            )}
          </div>
        </div>

        <Separator />

        {/** Todos los permisos */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            Permisos ({permisos.length}):
          </p>
          <div className="max-h-32 overflow-y-auto">
            <div className="flex flex-wrap gap-1">
              {permisos.map((permiso: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {permiso}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/** Botón de logout */}
        <div className="pt-2">
          <LogoutButton 
            className="w-full" 
            variant="destructive"
            showConfirmation={true}
          />
        </div>
      </CardContent>
    </Card>
  );
} 