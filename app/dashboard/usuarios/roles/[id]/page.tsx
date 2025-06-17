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

// Mock data
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

export default function EditRolePage({ params }: { params: { id: string } }) {
  const [role, setRole] = useState(roleData);
  const [hasChanges, setHasChanges] = useState(false);

  const togglePermission = (permissionId: string) => {
    setRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log("Saving role:", role);
    setHasChanges(false);
  };

  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof allPermissions>);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/usuarios/roles">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Editar Rol: {role.name}</h1>
            <p className="text-gray-600">Configura permisos y usuarios asignados</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges}>
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Rol</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre del Rol *</label>
                <Input
                  value={role.name}
                  onChange={(e) => {
                    setRole((prev) => ({ ...prev, name: e.target.value }));
                    setHasChanges(true);
                  }}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={role.description}
                  onChange={(e) => {
                    setRole((prev) => ({ ...prev, description: e.target.value }));
                    setHasChanges(true);
                  }}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permisos del Rol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category}>
                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={role.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <label htmlFor={permission.id} className="text-sm">
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

        {/* Users with this role */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Usuarios Asignados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center p-4 bg-gray-50 rounded">
                  <div className="text-2xl font-bold">{role.userCount}</div>
                  <div className="text-sm text-gray-600">usuarios con este rol</div>
                </div>

                <div className="space-y-2">
                  {role.users.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-2 border rounded">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{user.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{user.name}</div>
                        <div className="text-xs text-gray-600 truncate">{user.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Resumen de Permisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total permisos:</span>
                  <Badge>{role.permissions.length}</Badge>
                </div>
                <div className="text-xs text-gray-600">
                  {role.permissions.length} de {allPermissions.length} permisos asignados
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
