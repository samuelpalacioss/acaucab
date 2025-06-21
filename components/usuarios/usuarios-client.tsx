"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Settings, Edit, Eye, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { User, UsuariosClientProps } from "@/models/users";
import { llamarFuncion } from "@/lib/server-actions";
import { updateUserRole } from "@/api/update-user-role";

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
export default function UsuariosClient({ users, roles }: UsuariosClientProps) {
  /*
   * BLOQUE DE COMENTARIOS: ESTADOS DEL COMPONENTE
   *
   * Estados para controlar la funcionalidad de gestión de usuarios:
   * - searchTerm: Término de búsqueda para filtrar usuarios
   * - roleFilter: Filtro por rol seleccionado
   * - editingRole: Estado para el modal de edición de roles
   * - activeTab: Tab activo para filtrar por tipo de usuario
   */
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editingRole, setEditingRole] = useState<EditingRole | null>(null);
  const [activeTab, setActiveTab] = useState("todos");

  /**
   * Obtener roles únicos de los usuarios para el filtro, excluyendo Empleado y Cliente
   * Tipos: string[] - Array de nombres de roles únicos filtrados
   */
  const availableRoles = roles
    .filter(role => !['Miembro', 'Cliente', 'Administrador'].includes(role.nombre))
    .map(role => role.nombre);

  /**
   * Función para filtrar usuarios según los criterios de búsqueda y tipo
   * Tipos: User[] - Array de usuarios filtrados
   */
  const getFilteredUsers = (tipoUsuario: string) => {
    return users.filter((user) => {
      const matchesSearch =
        (user.nombre_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.rol_nombre === roleFilter;
      const matchesType = tipoUsuario === "todos" || user.tipo_usuario.toLowerCase() === tipoUsuario.toLowerCase();

      return matchesSearch && matchesRole && matchesType;
    });
  };

  /**
   * Obtener conteos por tipo de usuario para mostrar en los tabs
   * Tipos: Record<string, number> - Objeto con conteos por tipo
   */
  const getUserCounts = () => {
    const counts = {
      todos: users.length,
      cliente: users.filter(user => user.tipo_usuario === "Cliente").length,
      miembro: users.filter(user => user.tipo_usuario === "Miembro").length,
      empleado: users.filter(user => user.tipo_usuario === "Empleado").length,
    };
    return counts;
  };

  const userCounts = getUserCounts();

  /**
   * Función para manejar el cambio de rol de un usuario
   * Llama a una acción del servidor para actualizar el rol en la base de datos
   */
  const handleRoleChange = async (userId: number, newRoleName: string) => {
    const role = roles.find((r) => r.nombre === newRoleName);
    if (!role) {
      console.error(`El rol "${newRoleName}" no fue encontrado.`);
      // TODO: Mostrar notificación de error al usuario
      return;
    }

    try {
      const success = await llamarFuncion("fn_update_user_role", {
        p_id_usuario: userId,
        p_id_nuevo_rol: role.id,
      });

      if (success) {
        console.log(`Rol del usuario ${userId} actualizado a ${newRoleName}`);
        // TODO: Mostrar notificación de éxito y actualizar el estado local
      }
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      // TODO: Mostrar notificación de error al usuario
    } finally {
      setEditingRole(null);
    }
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

  /**
   * Componente para renderizar la tabla de usuarios
   * Tipos: tipoUsuario (string) - Tipo de usuario a mostrar
   */
  const renderUserTable = (tipoUsuario: string) => {
    const filteredUsers = getFilteredUsers(tipoUsuario);

    return (
      <Table id={`usuarios-table-${tipoUsuario}`}>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id_usuario} id={`usuario-row-${user.id_usuario}`}>
              <TableCell id={`usuario-info-${user.id_usuario}`}>
                <div>
                  <div className="font-medium">{user.nombre_completo || 'Sin nombre'}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.telefono || 'Sin teléfono'}</div>
                </div>
              </TableCell>
              <TableCell id={`usuario-tipo-${user.id_usuario}`}>
                <Badge variant="outline">
                  {user.tipo_usuario}
                </Badge>
              </TableCell>
              <TableCell id={`usuario-rol-${user.id_usuario}`}>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={user.rol_nombre === "Administrador" ? "default" : "secondary"}
                    id={`badge-rol-${user.id_usuario}`}
                  >
                    {user.rol_nombre}
                  </Badge>
                  {/* Solo mostrar botón de editar rol para empleados */}
                  {user.tipo_usuario === "Empleado" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingRole({ userId: user.id_usuario, currentRole: user.rol_nombre })}
                      id={`edit-rol-${user.id_usuario}`}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </TableCell>
              <TableCell id={`usuario-acciones-${user.id_usuario}`}>
                <div className="flex gap-1">
                  <Link href={`/dashboard/usuarios/${user.id_usuario}`}>
                    <Button variant="ghost" size="sm" id={`ver-usuario-${user.id_usuario}`}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleUserStatus(user.id_usuario)}
                    id={`toggle-status-${user.id_usuario}`}
                  >
                    <UserX className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
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
            <div className="text-2xl font-bold">{userCounts.todos}</div>
            <div className="text-sm text-gray-600">Total Usuarios</div>
          </CardContent>
        </Card>
        
        <Card id="clientes-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{userCounts.cliente}</div>
            <div className="text-sm text-gray-600">Clientes</div>
          </CardContent>
        </Card>

        <Card id="miembros-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{userCounts.miembro}</div>
            <div className="text-sm text-gray-600">Miembros</div>
          </CardContent>
        </Card>

        <Card id="empleados-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{userCounts.empleado}</div>
            <div className="text-sm text-gray-600">Empleados</div>
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
            
          </div>
        </CardContent>
      </Card>

      {/* Lista de usuarios con tabs */}
      <Card id="usuarios-table-card">
        <CardHeader>
          <CardTitle id="tabla-titulo">Lista de Usuarios</CardTitle>
          <p className="text-gray-600">Administra usuarios registrados en el sistema</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="empleado">Empleados</TabsTrigger>
              <TabsTrigger value="cliente">Clientes</TabsTrigger>
              <TabsTrigger value="miembro">Miembros</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="mt-0">
              {renderUserTable("todos")}
            </TabsContent>
            
            <TabsContent value="empleado" className="mt-0">
              {renderUserTable("empleado")}
            </TabsContent>
            
            <TabsContent value="cliente" className="mt-0">
              {renderUserTable("cliente")}
            </TabsContent>
            
            <TabsContent value="miembro" className="mt-0">
              {renderUserTable("miembro")}
            </TabsContent>
          </Tabs>
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
                  {availableRoles.map((role) => (
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
