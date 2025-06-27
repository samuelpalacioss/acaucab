"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Settings, Edit, Eye, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { User, UsuariosClientProps } from "@/models/users";
import { llamarFuncion } from "@/lib/server-actions";
import { deleteUser } from "@/api/delete-user";
import { toast } from "sonner";
import ErrorModal from "@/components/error-modal";
import ProtectedRoute from "@/components/auth/protected-route";
import { usePermissions } from "@/store/user-store";

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
  const { puedeCrearUsuarios, puedeVerRoles, puedeEditarUsuarios, puedeEliminarUsuarios } = usePermissions();
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
  const [userList, setUserList] = useState(users);
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  });
  const router = useRouter();

  /**
   * Obtener roles únicos de los usuarios para el filtro, excluyendo Empleado y Cliente
   * Tipos: string[] - Array de nombres de roles únicos filtrados
   */
  const availableRoles = roles
    .filter((role) => !["Miembro", "Cliente", "Administrador"].includes(role.nombre))
    .map((role) => role.nombre);

  /**
   * Función para filtrar usuarios según los criterios de búsqueda y tipo
   * Tipos: User[] - Array de usuarios filtrados
   */
  const getFilteredUsers = (tipoUsuario: string) => {
    return userList.filter((user) => {
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
      todos: userList.length,
      cliente: userList.filter((user) => user.tipo_usuario === "Cliente").length,
      miembro: userList.filter((user) => user.tipo_usuario === "Miembro").length,
      empleado: userList.filter((user) => user.tipo_usuario === "Empleado").length,
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
      setErrorModal({
        isOpen: true,
        message: `El rol "${newRoleName}" no fue encontrado.`,
      });
      return;
    }

    try {
      const success = await llamarFuncion("fn_update_user_role", {
        p_id_usuario: userId,
        p_id_nuevo_rol: role.id,
      });

      if (success) {
        toast.success(`Rol del usuario actualizado a ${newRoleName}`);
        // Actualizar el estado local del usuario
        setUserList((prevUsers) =>
          prevUsers.map((user) => (user.id_usuario === userId ? { ...user, rol_nombre: newRoleName } : user))
        );
      }
    } catch (error: any) {
      console.error("Error al actualizar el rol:", error);
      setErrorModal({
        isOpen: true,
        message: error.message || "Error desconocido al actualizar el rol del usuario",
      });
    } finally {
      setEditingRole(null);
    }
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
   * Función para eliminar un usuario y sus relaciones.
   * Llama a la server action `deleteUser`.
   */
  const handleDeleteUser = async (userId: number) => {
    const confirmation = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario? Esta acción es irreversible."
    );

    if (confirmation) {
      try {
        toast.loading("Eliminando usuario...");
        await deleteUser(userId);
        setUserList((prevUsers) => prevUsers.filter((user) => user.id_usuario !== userId));
        router.refresh();
        toast.success("Usuario eliminado con éxito.");
      } catch (error: any) {
        console.error("Error al eliminar usuario:", error);
        setErrorModal({
          isOpen: true,
          message: error.message || "Error desconocido al eliminar el usuario",
        });
      }
    }
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
            {/* Mostrar columna de puntos solo para clientes */}
            {(tipoUsuario === "todos" || tipoUsuario === "cliente") && (
              <TableHead>Puntos</TableHead>
            )}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id_usuario} id={`usuario-row-${user.id_usuario}`}>
              <TableCell id={`usuario-info-${user.id_usuario}`}>
                <div>
                  <div className="font-medium">{user.nombre_completo || "Sin nombre"}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.telefono || "Sin teléfono"}</div>
                </div>
              </TableCell>
              <TableCell id={`usuario-tipo-${user.id_usuario}`}>
                <Badge variant="outline">{user.tipo_usuario}</Badge>
              </TableCell>
              <TableCell id={`usuario-rol-${user.id_usuario}`}>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={user.rol_nombre === "Administrador" ? "default" : "secondary"}
                    id={`badge-rol-${user.id_usuario}`}
                  >
                    {user.rol_nombre}
                  </Badge>
                  {/* Mostrar botón de editar rol para todos los tipos de usuario */}
                  {puedeEditarUsuarios() && (
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
              {/* Mostrar puntos solo para clientes */}
              {(tipoUsuario === "todos" || tipoUsuario === "cliente") && (
                <TableCell id={`usuario-puntos-${user.id_usuario}`}>
                  {user.tipo_usuario === "Cliente" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {user.puntos} pts
                    </Badge>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
              )}
              <TableCell id={`usuario-acciones-${user.id_usuario}`}>
                <div className="flex gap-1">
                  <Link href={`/dashboard/usuarios/${user.id_usuario}`}>
                    <Button variant="ghost" size="sm" id={`ver-usuario-${user.id_usuario}`}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {puedeEliminarUsuarios() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id_usuario)}
                      id={`toggle-status-${user.id_usuario}`}
                    >
                      <UserX className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <ProtectedRoute requiredPermissions={["leer_usuario"]} redirectTo="/unauthorized">
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
            {puedeVerRoles() && (
              <Link href="/dashboard/usuarios/roles">
                <Button variant="outline" id="gestionar-roles-button">
                  <Settings className="w-4 h-4 mr-2" />
                  Gestionar Roles
                </Button>
              </Link>
            )}
            {puedeCrearUsuarios() && (
              <Link href="/dashboard/usuarios/nuevo">
                <Button id="nuevo-usuario-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Usuario
                </Button>
              </Link>
            )}
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
              <DialogDescription>Selecciona el nuevo rol para este usuario.</DialogDescription>
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

        {/* Modal de error */}
        <ErrorModal
          isOpen={errorModal.isOpen}
          onClose={() => setErrorModal({ isOpen: false, message: "" })}
          title="Error en la operación"
          errorMessage={errorModal.message}
        />
      </div>
    </ProtectedRoute>
  );
}
