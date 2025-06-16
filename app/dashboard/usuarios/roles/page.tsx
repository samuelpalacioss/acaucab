"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Edit, Trash2, Shield, Users } from "lucide-react";
import Link from "next/link";

// Mock data
const roles = [
  {
    id: 1,
    name: "Administrador",
    description: "Acceso completo al sistema",
    userCount: 3,
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Gerente",
    description: "Gestión de equipos y reportes",
    userCount: 5,
    permissions: ["users.read", "reports.all", "sales.all"],
  },
  {
    id: 3,
    name: "Supervisor",
    description: "Supervisión de operaciones",
    userCount: 8,
    permissions: ["users.read", "inventory.all", "orders.read"],
  },
  {
    id: 4,
    name: "Empleado",
    description: "Acceso básico al sistema",
    userCount: 12,
    permissions: ["profile.read", "orders.read"],
  },
];

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

export default function RolesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const handleCreateRole = () => {
    console.log("Creating role:", newRole);
    setIsCreateModalOpen(false);
    setNewRole({ name: "", description: "", permissions: [] });
  };

  const handleEditRole = (role: any) => {
    setEditingRole(role);
  };

  const handleDeleteRole = (roleId: number) => {
    console.log("Deleting role:", roleId);
  };

  const togglePermission = (permissionId: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
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
          <Link href="/usuarios">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Gestión de Roles</h1>
            <p className="text-gray-600">Configura roles y permisos del sistema</p>
          </div>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Rol
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{roles.length}</div>
            <div className="text-sm text-gray-600">Roles Configurados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{allPermissions.length}</div>
            <div className="text-sm text-gray-600">Permisos Disponibles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</div>
            <div className="text-sm text-gray-600">Usuarios Asignados</div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rol</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Usuarios</TableHead>
                <TableHead>Permisos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">{role.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{role.userCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {role.permissions.includes("all") ? "Todos" : `${role.permissions.length} permisos`}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Link href={`/usuarios/roles/${role.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRole(role.id)}
                        disabled={role.userCount > 0}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Role Dialog */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Rol</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre del Rol *</label>
              <Input
                value={newRole.name}
                onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Coordinador"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Descripción</label>
              <Input
                value={newRole.description}
                onChange={(e) => setNewRole((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción del rol"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">Permisos</label>
              <div className="space-y-4">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category}>
                    <h4 className="font-medium text-sm mb-2">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={newRole.permissions.includes(permission.id)}
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
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateRole} disabled={!newRole.name}>
                Crear Rol
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
