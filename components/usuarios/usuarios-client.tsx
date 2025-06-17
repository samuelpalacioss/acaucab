"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Settings, Edit, Eye, UserCheck, UserX } from "lucide-react";
import Link from "next/link";

/**
 * Datos de ejemplo para usuarios del sistema
 * TODO: Esta información debería provenir de una API
 */
const users = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@empresa.com",
    role: "Administrador",
    status: "Activo",
    lastLogin: "2024-01-15 10:30",
    department: "IT",
    phone: "+58 412-1234567",
  },
  {
    id: 2,
    name: "María González",
    email: "maria.gonzalez@empresa.com",
    role: "Gerente",
    status: "Activo",
    lastLogin: "2024-01-15 09:15",
    department: "Ventas",
    phone: "+58 414-2345678",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    role: "Empleado",
    status: "Inactivo",
    lastLogin: "2024-01-10 16:45",
    department: "Logística",
    phone: "+58 416-3456789",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana.martinez@empresa.com",
    role: "Supervisor",
    status: "Activo",
    lastLogin: "2024-01-15 11:20",
    department: "RRHH",
    phone: "+58 424-4567890",
  },
];

/**
 * Lista de roles disponibles en el sistema
 * TODO: Esta información debería provenir de una API de configuración
 */
const roles = ["Administrador", "Gerente", "Supervisor", "Empleado", "Invitado"];

/**
 * Interface para las props del componente
 */
interface UsuariosClientProps {
  // Aquí se pueden agregar props que vengan del servidor
  // Por ejemplo: initialUsers, userPermissions, availableRoles, etc.
}

/**
 * Interface para el estado de edición de roles
 */
interface EditingRole {
  userId: number;
  currentRole: string;
}

/**
 * Componente cliente para la gestión de usuarios del sistema
 * Maneja toda la interfaz de usuario y las interacciones de gestión de usuarios
 */
export default function UsuariosClient({}: UsuariosClientProps) {
  /*
   * BLOQUE DE COMENTARIOS: ESTADOS DEL COMPONENTE
   *
   * Estados para controlar la funcionalidad de gestión de usuarios:
   * - searchTerm: Término de búsqueda para filtrar usuarios
   * - roleFilter: Filtro por rol seleccionado
   * - statusFilter: Filtro por estado (activo/inactivo)
   * - editingRole: Estado para el modal de edición de roles
   */
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingRole, setEditingRole] = useState<EditingRole | null>(null);

  /**
   * Función para filtrar usuarios según los criterios de búsqueda
   */
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  /**
   * Función para manejar el cambio de rol de un usuario
   * TODO: Implementar llamada a API para actualizar el rol
   */
  const handleRoleChange = (userId: number, newRole: string) => {
    console.log(`Changing role for user ${userId} to ${newRole}`);
    // Aquí se debería implementar la llamada a la API
    setEditingRole(null);
  };

  /**
   * Función para alternar el estado (activo/inactivo) de un usuario
   * TODO: Implementar llamada a API para cambiar el estado
   */
  const toggleUserStatus = (userId: number) => {
    console.log(`Toggling status for user ${userId}`);
    // Aquí se debería implementar la llamada a la API
  };

  /**
   * Función para manejar la búsqueda de usuarios
   */
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  /**
   * Función para cerrar el modal de edición de roles
   */
  const closeEditModal = () => {
    setEditingRole(null);
  };

  return (
    <div id="usuarios-container" className="p-6 space-y-6">
      {/* Encabezado con título y acciones principales */}
      <div id="usuarios-header" className="flex justify-between items-center">
        <div id="header-info">
          <h1 id="usuarios-title" className="text-2xl font-bold">
            Gestión de Usuarios
          </h1>
          <p id="usuarios-description" className="text-gray-600">
            Administra usuarios, roles y permisos del sistema
          </p>
        </div>
        <div id="header-actions" className="flex gap-2">
          <Link href="/dashboard/usuarios/roles">
            <Button variant="outline" id="gestionar-roles-button">
              <Settings className="w-4 h-4 mr-2" />
              Gestionar Roles
            </Button>
          </Link>
          <Link href="/usuarios/nuevo">
            <Button id="nuevo-usuario-button">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </Link>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div id="stats-grid" className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card id="total-usuarios-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-gray-600">Total Usuarios</div>
          </CardContent>
        </Card>
        <Card id="usuarios-activos-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">18</div>
            <div className="text-sm text-gray-600">Usuarios Activos</div>
          </CardContent>
        </Card>
        <Card id="usuarios-inactivos-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-gray-600">Usuarios Inactivos</div>
          </CardContent>
        </Card>
        <Card id="roles-configurados-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-gray-600">Roles Configurados</div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de filtros */}
      <Card id="filtros-card">
        <CardContent className="p-4">
          <div id="filtros-container" className="flex flex-col md:flex-row gap-4">
            <div id="search-container" className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search-input"
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48" id="role-filter">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48" id="status-filter">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de usuarios */}
      <Card id="usuarios-table-card">
        <CardHeader>
          <CardTitle id="tabla-titulo">Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table id="usuarios-table">
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} id={`usuario-row-${user.id}`}>
                  <TableCell id={`usuario-info-${user.id}`}>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell id={`usuario-rol-${user.id}`}>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={user.role === "Administrador" ? "default" : "secondary"}
                        id={`badge-rol-${user.id}`}
                      >
                        {user.role}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingRole({ userId: user.id, currentRole: user.role })}
                        id={`edit-rol-${user.id}`}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell id={`usuario-acciones-${user.id}`}>
                    <div className="flex gap-1">
                      <Link href={`/dashboard/usuarios/${user.id}`}>
                        <Button variant="ghost" size="sm" id={`ver-usuario-${user.id}`}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                        id={`toggle-status-${user.id}`}
                      >
                        {user.status === "Activo" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de edición de roles */}
      <Dialog open={!!editingRole} onOpenChange={closeEditModal}>
        <DialogContent id="edit-role-dialog">
          <DialogHeader>
            <DialogTitle id="edit-role-title">Cambiar Rol de Usuario</DialogTitle>
          </DialogHeader>
          <div id="edit-role-content" className="space-y-4">
            <div id="role-selector-container">
              <label className="text-sm font-medium">Nuevo Rol</label>
              <Select onValueChange={(value) => handleRoleChange(editingRole?.userId || 0, value)}>
                <SelectTrigger id="new-role-selector">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div id="modal-actions" className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeEditModal} id="cancelar-button">
                Cancelar
              </Button>
              <Button onClick={closeEditModal} id="guardar-cambios-button">
                Guardar Cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
