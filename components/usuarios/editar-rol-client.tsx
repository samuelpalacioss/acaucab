"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Users, Shield } from "lucide-react";
import Link from "next/link";

/**
 * Datos de ejemplo para un rol específico
 * TODO: Esta información debería provenir de una API que reciba el ID del rol
 */
const roleData = {
  id: 1,
  name: "Gerente",
  description: "Gestión de equipos y reportes",
  userCount: 5,
  permissions: ["users.read", "reports.all", "sales.all"],
  users: [
    { id: 1, name: "María González", email: "maria.gonzalez@empresa.com" },
    { id: 2, name: "Carlos Rodríguez", email: "carlos.rodriguez@empresa.com" },
    { id: 3, name: "Ana Martínez", email: "ana.martinez@empresa.com" },
  ],
};

/**
 * Lista completa de permisos disponibles en el sistema
 * TODO: Esta información debería provenir de una API de configuración de permisos
 */
const allPermissions = [
  { id: "users.read", name: "Ver usuarios", category: "Usuarios" },
  { id: "users.write", name: "Gestionar usuarios", category: "Usuarios" },
  { id: "roles.read", name: "Ver roles", category: "Roles" },
  { id: "roles.write", name: "Gestionar roles", category: "Roles" },
  { id: "reports.read", name: "Ver reportes", category: "Reportes" },
  { id: "reports.write", name: "Crear reportes", category: "Reportes" },
  { id: "sales.read", name: "Ver ventas", category: "Ventas" },
  { id: "sales.write", name: "Gestionar ventas", category: "Ventas" },
  { id: "inventory.read", name: "Ver inventario", category: "Inventario" },
  { id: "inventory.write", name: "Gestionar inventario", category: "Inventario" },
  { id: "orders.read", name: "Ver pedidos", category: "Pedidos" },
  { id: "orders.write", name: "Gestionar pedidos", category: "Pedidos" },
];

/**
 * Interface para las props del componente
 */
interface EditarRolClientProps {
  roleId: string;
  // Aquí se pueden agregar props que vengan del servidor
  // Por ejemplo: initialRoleData, availablePermissions, userPermissions, etc.
}

/**
 * Interface para la información del rol
 */
interface RoleData {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  users: Array<{
    id: number;
    name: string;
    email: string;
  }>;
}

/**
 * Componente cliente para la edición de roles del sistema
 * Maneja toda la interfaz de usuario y las interacciones de edición de roles y permisos
 */
export default function EditarRolClient({ roleId }: EditarRolClientProps) {
  /*
   * BLOQUE DE COMENTARIOS: ESTADOS DEL COMPONENTE
   *
   * Estados para controlar la funcionalidad de edición de roles:
   * - role: Datos del rol actual en edición
   * - hasChanges: Indica si hay cambios pendientes por guardar
   */
  const [role, setRole] = useState<RoleData>(roleData);
  const [hasChanges, setHasChanges] = useState(false);

  /**
   * Función para agrupar permisos por categoría
   */
  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof allPermissions>);

  /**
   * Función para alternar permisos del rol
   */
  const togglePermission = (permissionId: string) => {
    setRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
    setHasChanges(true);
  };

  /**
   * Función para actualizar el nombre del rol
   */
  const updateRoleName = (name: string) => {
    setRole((prev) => ({ ...prev, name }));
    setHasChanges(true);
  };

  /**
   * Función para actualizar la descripción del rol
   */
  const updateRoleDescription = (description: string) => {
    setRole((prev) => ({ ...prev, description }));
    setHasChanges(true);
  };

  /**
   * Función para guardar los cambios del rol
   * TODO: Implementar llamada a API para actualizar el rol
   */
  const handleSave = () => {
    console.log("Saving role:", role);
    setHasChanges(false);
    // TODO: Implementar llamada a API y manejo de errores
  };

  /**
   * Cálculo del porcentaje de permisos asignados
   */
  const permissionsPercentage = Math.round((role.permissions.length / allPermissions.length) * 100);

  return (
    <div id="editar-rol-container" className="p-6 space-y-6">
      {/* 
        BLOQUE DE COMENTARIOS: ENCABEZADO DE EDICIÓN
        
        Sección principal que muestra el encabezado con navegación de retorno,
        información del rol y botón de guardar cambios
      */}
      <div id="editar-rol-header" className="flex items-center justify-between">
        <div id="header-info" className="flex items-center gap-4">
          <Link href="/dashboard/usuarios/roles">
            <Button variant="ghost" size="sm" id="volver-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div id="header-title-info">
            <h1 id="editar-rol-title" className="text-2xl font-bold">
              Editar Rol: {role.name}
            </h1>
            <p id="editar-rol-description" className="text-gray-600">
              Configura permisos y usuarios asignados
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges} id="guardar-cambios-button">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      {/* 
        BLOQUE DE COMENTARIOS: GRID PRINCIPAL DE EDICIÓN
        
        Contiene dos columnas principales:
        1. Información del rol y permisos: Formulario de edición y configuración de permisos
        2. Usuarios asignados y resumen: Lista de usuarios y estadísticas del rol
      */}
      <div id="edicion-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal: Información y permisos del rol */}
        <div id="rol-info-permisos" className="lg:col-span-2 space-y-6">
          {/* Sección de información básica del rol */}
          <Card id="rol-info-card">
            <CardHeader>
              <CardTitle id="rol-info-title">Información del Rol</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Campo de nombre del rol */}
              <div id="rol-name-field">
                <label className="text-sm font-medium">Nombre del Rol *</label>
                <Input
                  id="rol-name-input"
                  value={role.name}
                  onChange={(e) => updateRoleName(e.target.value)}
                  placeholder="Nombre del rol"
                />
              </div>

              {/* Campo de descripción del rol */}
              <div id="rol-description-field">
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  id="rol-description-textarea"
                  value={role.description}
                  onChange={(e) => updateRoleDescription(e.target.value)}
                  rows={3}
                  placeholder="Descripción del rol y sus responsabilidades"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sección de permisos del rol */}
          <Card id="rol-permisos-card">
            <CardHeader>
              <CardTitle id="rol-permisos-title">Permisos del Rol</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="permisos-categories" className="space-y-6">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category} id={`category-${category.toLowerCase()}`}>
                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {category}
                    </h4>
                    <div
                      id={`permissions-grid-${category.toLowerCase()}`}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6"
                    >
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          id={`permission-${permission.id}`}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`checkbox-${permission.id}`}
                            checked={role.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <label htmlFor={`checkbox-${permission.id}`} className="text-sm">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral: Usuarios asignados y resumen */}
        <div id="usuarios-resumen" className="space-y-4">
          {/* Sección de usuarios asignados */}
          <Card id="usuarios-asignados-card">
            <CardHeader>
              <CardTitle id="usuarios-asignados-title" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Usuarios Asignados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div id="usuarios-content" className="space-y-3">
                {/* Estadística de usuarios */}
                <div id="usuarios-stats" className="text-center p-4 bg-gray-50 rounded">
                  <div id="usuarios-count" className="text-2xl font-bold">
                    {role.userCount}
                  </div>
                  <div className="text-sm text-gray-600">usuarios con este rol</div>
                </div>

                {/* Lista de usuarios asignados */}
                <div id="usuarios-list" className="space-y-2">
                  {role.users.map((user) => (
                    <div
                      key={user.id}
                      id={`user-item-${user.id}`}
                      className="flex items-center gap-3 p-2 border rounded"
                    >
                      <div
                        id={`user-avatar-${user.id}`}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        <span className="text-xs font-bold">{user.name.charAt(0)}</span>
                      </div>
                      <div id={`user-info-${user.id}`} className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{user.name}</div>
                        <div className="text-xs text-gray-600 truncate">{user.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sección de resumen de permisos */}
          <Card id="resumen-permisos-card">
            <CardHeader>
              <CardTitle id="resumen-permisos-title">Resumen de Permisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="resumen-content" className="space-y-3">
                {/* Estadísticas de permisos */}
                <div id="permisos-stats" className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total permisos:</span>
                    <Badge id="total-permisos-badge">{role.permissions.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Disponibles:</span>
                    <Badge variant="outline" id="disponibles-permisos-badge">
                      {allPermissions.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cobertura:</span>
                    <Badge variant="secondary" id="cobertura-permisos-badge">
                      {permissionsPercentage}%
                    </Badge>
                  </div>
                </div>

                {/* Descripción de permisos */}
                <div id="permisos-description" className="text-xs text-gray-600">
                  {role.permissions.length} de {allPermissions.length} permisos asignados
                </div>

                {/* Indicador visual de cobertura */}
                <div id="cobertura-visual" className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    id="cobertura-bar"
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${permissionsPercentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indicador de cambios pendientes */}
          {hasChanges && (
            <Card id="cambios-pendientes-card" className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div id="cambios-pendientes-content" className="text-center">
                  <div className="text-sm font-medium text-orange-800">Cambios Pendientes</div>
                  <div className="text-xs text-orange-600">Hay modificaciones sin guardar</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
