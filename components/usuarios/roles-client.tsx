"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft, Plus, Edit, Trash2, Shield, Users, Key } from "lucide-react";
import Link from "next/link";
import { Rol, PermisoSistema } from "@/models/roles";
import { llamarFuncion } from "@/lib/server-actions";
import { toast } from "sonner";
import ErrorModal from "@/components/error-modal";

/**
 * Interface para las props del componente
 */
interface RolesClientProps {
  /**
   * Lista de roles obtenidos desde la base de datos
   */
  roles: Rol[];
  /**
   * Lista de permisos disponibles obtenidos desde la base de datos
   */
  permisos: PermisoSistema[];
}

/**
 * Interface para la información de un nuevo rol
 */
interface NewRoleData {
  name: string;
  description: string;
  permissions: number[];
}

/**
 * Interface para la información de un nuevo permiso
 */
interface NewPermissionData {
  name: string;
  description: string;
}

/**
 * Componente cliente para la gestión de roles del sistema
 * Maneja toda la interfaz de usuario y las interacciones de gestión de roles y permisos
 */
export default function RolesClient({ roles, permisos }: RolesClientProps) {
  /*
   * BLOQUE DE COMENTARIOS: ESTADOS DEL COMPONENTE
   *
   * Estados para controlar la funcionalidad de gestión de roles:
   * - isCreateModalOpen: Controla la visibilidad del modal de creación de roles
   * - isCreatePermissionModalOpen: Controla la visibilidad del modal de creación de permisos
   * - editingRole: Rol actualmente en edición
   * - newRole: Datos del nuevo rol a crear
   * - newPermission: Datos del nuevo permiso a crear
   * - Estados de paginación para roles y permisos
   */
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreatePermissionModalOpen, setIsCreatePermissionModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Rol | null>(null);
  const [newRole, setNewRole] = useState<NewRoleData>({
    name: "",
    description: "",
    permissions: [],
  });
  const [newPermission, setNewPermission] = useState<NewPermissionData>({
    name: "",
    description: "",
  });

  // Estados para paginación
  const [currentRolePage, setCurrentRolePage] = useState(1);
  const [currentPermisoPage, setCurrentPermisoPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ""
  });

  /**
   * Función para agrupar permisos por categoría
   * Agrupa los permisos basándose en la entidad/tabla a la que pertenecen
   */
  const groupedPermissions = permisos.reduce((acc, permission) => {
    // Extraer el nombre de la entidad del nombre del permiso
    // El formato es 'acción_entidad', ejemplo: 'crear_usuario' -> 'usuario'
    const entityName = permission.nombre.split('_').slice(1).join('_');
    
    // Determinar la categoría basada en la entidad
    let category = 'Gestión de ' + entityName.charAt(0).toUpperCase() + entityName.slice(1);
    
    // Casos especiales de pluralización y nombres compuestos
    if (entityName.includes('usuario')) category = 'Gestión de Usuarios';
    if (entityName.includes('rol')) category = 'Gestión de Roles';
    if (entityName.includes('permiso')) category = 'Gestión de Permisos';
    if (entityName.includes('cliente')) category = 'Gestión de Clientes';
    if (entityName.includes('empleado')) category = 'Gestión de Empleados';
    if (entityName.includes('venta')) category = 'Gestión de Ventas';
    if (entityName.includes('pago')) category = 'Gestión de Pagos';
    if (entityName.includes('orden_de_compra')) category = 'Gestión de Órdenes de Compra';
    if (entityName.includes('orden_de_reposicion')) category = 'Gestión de Órdenes de Reposición';
    if (entityName.includes('inventario')) category = 'Gestión de Inventario';
    if (entityName.includes('evento')) category = 'Gestión de Eventos';
    if (entityName.includes('miembro')) category = 'Gestión de Miembros';
    if (entityName.includes('beneficio')) category = 'Gestión de Beneficios';
    if (entityName.includes('nomina')) category = 'Gestión de Nómina';
    if (entityName.includes('horario')) category = 'Gestión de Horarios';
    if (entityName.includes('vacacion')) category = 'Gestión de Vacaciones';
    if (entityName.includes('registro_biometrico')) category = 'Gestión de Registros Biométricos';
    if (entityName.includes('cerveza')) category = 'Gestión de Cervezas';
    if (entityName.includes('presentacion')) category = 'Gestión de Presentaciones';
    if (entityName.includes('almacen')) category = 'Gestión de Almacenes';
    if (entityName.includes('tienda')) category = 'Gestión de Tiendas';
    if (entityName.includes('descuento')) category = 'Gestión de Descuentos';
    if (entityName.includes('status')) category = 'Gestión de Estados';
    if (entityName.includes('tasa')) category = 'Gestión de Tasas';
    if (entityName.includes('lugar')) category = 'Gestión de Lugares';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, PermisoSistema[]>);

  /**
   * Función para crear un nuevo rol
   * Llama a la función fn_create_rol con el nombre y permisos seleccionados
   */
  const handleCreateRole = async () => {
    if (!newRole.name.trim()) {
      toast.error("El nombre del rol es requerido");
      return;
    }

    try {
      const response = await llamarFuncion("fn_create_rol", {
        p_nombre: newRole.name.trim(),
        p_permission_ids: newRole.permissions
      });

      if (response !== null && response !== undefined) {
        toast.success("Rol creado exitosamente");
        setIsCreateModalOpen(false);
        setNewRole({ name: "", description: "", permissions: [] });
        
        // Recargar la página para mostrar el nuevo rol
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setErrorModal({
          isOpen: true,
          message: "Error al crear el rol"
        });
      }
    } catch (error: any) {
      console.error("Error creating role:", error);
      setErrorModal({
        isOpen: true,
        message: error.message || "Error desconocido al crear el rol"
      });
    }
  };

  /**
   * Función para crear un nuevo permiso
   * Llama a la función fn_create_permission con el nombre y descripción
   */
  const handleCreatePermission = async () => {
    if (!newPermission.name.trim() || !newPermission.description.trim()) {
      toast.error("El nombre y la descripción del permiso son requeridos");
      return;
    }

    try {
      const response = await llamarFuncion("fn_create_permission", {
        p_nombre: newPermission.name.trim(),
        p_descripcion: newPermission.description.trim()
      });

      if (response !== null && response !== undefined) {
        toast.success("Permiso creado exitosamente");
        setIsCreatePermissionModalOpen(false);
        setNewPermission({ name: "", description: "" });
        
        // Recargar la página para mostrar el nuevo permiso
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setErrorModal({
          isOpen: true,
          message: "Error al crear el permiso"
        });
      }
    } catch (error: any) {
      console.error("Error creating permission:", error);
      setErrorModal({
        isOpen: true,
        message: error.message || "Error desconocido al crear el permiso"
      });
    }
  };

  /**
   * Función para editar un rol existente
   * TODO: Implementar llamada a API para editar el rol
   */
  const handleEditRole = (role: Rol) => {
    setEditingRole(role);
  };

  /**
   * Función para eliminar un rol
   * Utiliza la función fn_delete_role de PostgreSQL para eliminar el rol
   * Incluye confirmación del usuario y manejo de errores
   */
  const handleDeleteRole = async (roleId: number) => {
    // Buscar el rol para obtener su nombre
    const role = roles.find(r => r.id === roleId);
    const roleName = role ? role.nombre : `ID ${roleId}`;

    // Confirmar la eliminación con el usuario
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el rol "${roleName}"?\n\n` +
      `Esta acción no se puede deshacer y eliminará todas las asociaciones de permisos del rol.`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      // Llamar a la función de PostgreSQL para eliminar el rol
      await llamarFuncion("fn_delete_role", {
        p_id: roleId
      });

      toast.success(`Rol "${roleName}" eliminado exitosamente`);
      
      // Recargar la página para mostrar los cambios
      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (error: any) {
      console.error("Error deleting role:", error);
      
      // Mostrar mensaje de error específico
      let errorMessage = "Error desconocido al eliminar el rol";
      
      if (error.message && error.message.includes("está asignado a uno o más usuarios")) {
        errorMessage = `No se puede eliminar el rol "${roleName}" porque está asignado a uno o más usuarios. Primero reasigna o elimina los usuarios que tienen este rol.`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setErrorModal({
        isOpen: true,
        message: errorMessage
      });
    }
  };

  /**
   * Función para alternar permisos en el nuevo rol
   */
  const togglePermission = (permissionId: number) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  /**
   * Función para actualizar los datos del nuevo rol
   */
  const updateNewRole = (field: keyof NewRoleData, value: string) => {
    setNewRole((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Función para actualizar los datos del nuevo permiso
   */
  const updateNewPermission = (field: keyof NewPermissionData, value: string) => {
    setNewPermission((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Función para abrir el modal de creación de rol
   */
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  /**
   * Función para cerrar el modal de creación de rol
   */
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewRole({ name: "", description: "", permissions: [] });
  };

  /**
   * Función para abrir el modal de creación de permiso
   */
  const openCreatePermissionModal = () => {
    setIsCreatePermissionModalOpen(true);
  };

  /**
   * Función para cerrar el modal de creación de permiso
   */
  const closeCreatePermissionModal = () => {
    setIsCreatePermissionModalOpen(false);
    setNewPermission({ name: "", description: "" });
  };

  /**
   * Cálculo del total de usuarios asignados
   */
  const totalUsuariosAsignados = roles.reduce((sum, role) => sum + role.cantidad_usuarios, 0);

  /**
   * Cálculos de paginación para roles
   */
  const totalRolePages = Math.ceil(roles.length / itemsPerPage);
  const startRoleIndex = (currentRolePage - 1) * itemsPerPage;
  const endRoleIndex = startRoleIndex + itemsPerPage;
  const paginatedRoles = roles.slice(startRoleIndex, endRoleIndex);

  /**
   * Cálculos de paginación para permisos
   */
  const totalPermisoPages = Math.ceil(permisos.length / itemsPerPage);
  const startPermisoIndex = (currentPermisoPage - 1) * itemsPerPage;
  const endPermisoIndex = startPermisoIndex + itemsPerPage;
  const paginatedPermisos = permisos.slice(startPermisoIndex, endPermisoIndex);

  /**
   * Función helper para renderizar los controles de paginación
   */
  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Lógica simplificada de paginación */}
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;

              if (totalPages <= maxVisiblePages) {
                // Mostrar todas las páginas si son pocas
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(i);
                        }}
                        isActive={currentPage === i}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              } else {
                // Siempre mostrar primera página
                pages.push(
                  <PaginationItem key={1}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(1);
                      }}
                      isActive={currentPage === 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                );

                // Mostrar ellipsis si hay espacio
                if (currentPage > 3) {
                  pages.push(
                    <PaginationItem key="ellipsis-start">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                // Mostrar páginas alrededor de la actual
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);

                for (let i = start; i <= end; i++) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(i);
                        }}
                        isActive={currentPage === i}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Mostrar ellipsis si hay espacio
                if (currentPage < totalPages - 2) {
                  pages.push(
                    <PaginationItem key="ellipsis-end">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                // Siempre mostrar última página
                if (totalPages > 1) {
                  pages.push(
                    <PaginationItem key={totalPages}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(totalPages);
                        }}
                        isActive={currentPage === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              }

              return pages;
            })()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  return (
    <div id="roles-container" className="p-6 space-y-6">
      {/* 
        BLOQUE DE COMENTARIOS: ENCABEZADO DE GESTIÓN DE ROLES
        
        Sección principal que muestra el encabezado con navegación de retorno,
        información sobre la gestión de roles y botón para crear nuevos roles
      */}
      <div id="roles-header" className="flex items-center justify-between">
        <div id="header-info" className="flex items-center gap-4">
          <Link href="/dashboard/usuarios">
            <Button variant="ghost" size="sm" id="volver-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div id="header-title-info">
            <h1 id="roles-title" className="text-2xl font-bold">
              Gestión de Roles
            </h1>
            <p id="roles-description" className="text-gray-600">
              Configura roles y permisos del sistema
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={openCreateModal} id="nuevo-rol-button">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Rol
          </Button>
          <Button onClick={openCreatePermissionModal} variant="outline" id="nuevo-permiso-button">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Permiso
          </Button>
        </div>
      </div>

      {/* 
        BLOQUE DE COMENTARIOS: ESTADÍSTICAS DE ROLES
        
        Tarjetas que muestran información resumida sobre el sistema de roles:
        - Roles configurados
        - Permisos disponibles
        - Usuarios asignados
      */}
      <div id="stats-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card id="roles-configurados-card">
          <CardContent className="p-4">
            <div id="roles-count" className="text-2xl font-bold">
              {roles.length}
            </div>
            <div className="text-sm text-gray-600">Roles Configurados</div>
          </CardContent>
        </Card>
        <Card id="permisos-disponibles-card">
          <CardContent className="p-4">
            <div id="permisos-count" className="text-2xl font-bold">
              {permisos.length}
            </div>
            <div className="text-sm text-gray-600">Permisos Disponibles</div>
          </CardContent>
        </Card>
        <Card id="usuarios-asignados-card">
          <CardContent className="p-4">
            <div id="usuarios-asignados-count" className="text-2xl font-bold">
              {totalUsuariosAsignados}
            </div>
            <div className="text-sm text-gray-600">Usuarios Asignados</div>
          </CardContent>
        </Card>
      </div>

      {/* 
        BLOQUE DE COMENTARIOS: CONTROLES DE PAGINACIÓN
        
        Selector de elementos por página
      */}
      <div id="pagination-controls" className="flex justify-end items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Mostrar</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentRolePage(1);
              setCurrentPermisoPage(1);
            }}
          >
            <SelectTrigger id="items-per-page-select" className="w-[180px]">
              <SelectValue placeholder="Elementos por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 por página</SelectItem>
              <SelectItem value="10">10 por página</SelectItem>
              <SelectItem value="20">20 por página</SelectItem>
              <SelectItem value="50">50 por página</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 
        BLOQUE DE COMENTARIOS: TABLAS DE ROLES Y PERMISOS
        
        Sección con tabs para alternar entre:
        - Lista de roles del sistema
        - Lista de permisos disponibles
      */}
      <Card id="roles-permisos-card">
        <CardHeader>
          <CardTitle id="roles-permisos-title">Gestión de Roles y Permisos</CardTitle>
          <p className="text-gray-600">Administra los roles del sistema y sus permisos asociados</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Roles
              </TabsTrigger>
              <TabsTrigger value="permisos" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                Permisos
              </TabsTrigger>
            </TabsList>
            
            {/* Tab de Roles */}
            <TabsContent value="roles" className="mt-0 space-y-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {startRoleIndex + 1}-{Math.min(endRoleIndex, roles.length)} de {roles.length} roles
              </div>
              <Table id="roles-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Rol</TableHead>
                    <TableHead>Usuarios</TableHead>
                    <TableHead>Permisos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRoles.map((role) => (
                    <TableRow key={role.id} id={`role-row-${role.id}`}>
                      <TableCell id={`role-name-${role.id}`}>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span className="font-medium">{role.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell id={`role-users-${role.id}`}>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{role.cantidad_usuarios}</span>
                        </div>
                      </TableCell>
                      <TableCell id={`role-permissions-${role.id}`}>
                        <Badge variant="secondary" id={`permissions-badge-${role.id}`}>
                          {role.cantidad_permisos} permisos
                        </Badge>
                      </TableCell>
                      <TableCell id={`role-actions-${role.id}`}>
                        <div className="flex gap-1">
                          <Link href={`/dashboard/usuarios/roles/${role.id}`}>
                            <Button variant="ghost" size="sm" id={`edit-role-${role.id}`}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRole(role.id)}
                            id={`delete-role-${role.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {renderPagination(currentRolePage, totalRolePages, setCurrentRolePage)}
            </TabsContent>
            
            {/* Tab de Permisos */}
            <TabsContent value="permisos" className="mt-0 space-y-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {startPermisoIndex + 1}-{Math.min(endPermisoIndex, permisos.length)} de {permisos.length} permisos
              </div>
              <Table id="permisos-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Permiso</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Roles Asignados</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPermisos.map((permiso) => (
                    <TableRow key={permiso.id} id={`permiso-row-${permiso.id}`}>
                      <TableCell id={`permiso-name-${permiso.id}`}>
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{permiso.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell id={`permiso-descripcion-${permiso.id}`}>
                        <span className="text-sm text-gray-600">{permiso.descripcion}</span>
                      </TableCell>
                      <TableCell id={`permiso-roles-${permiso.id}`}>
                        <Badge variant="outline" id={`roles-count-badge-${permiso.id}`}>
                          {permiso.cantidad_roles} {permiso.cantidad_roles === 1 ? 'rol' : 'roles'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {renderPagination(currentPermisoPage, totalPermisoPages, setCurrentPermisoPage)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 
        BLOQUE DE COMENTARIOS: MODAL DE CREACIÓN DE ROLES
        
        Dialog modal que permite crear nuevos roles con:
        - Formulario de información básica (nombre, descripción)
        - Selector de permisos agrupados por categorías
        - Validación y confirmación de creación
      */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" id="create-role-dialog">
          <DialogHeader>
            <DialogTitle id="create-role-title">Crear Nuevo Rol</DialogTitle>
            <DialogDescription>
              Define un nuevo rol y asigna los permisos correspondientes.
            </DialogDescription>
          </DialogHeader>
          <div id="create-role-form" className="space-y-4">
            {/* Campo de nombre del rol */}
            <div id="role-name-field">
              <label className="text-sm font-medium">Nombre del Rol *</label>
              <Input
                id="role-name-input"
                value={newRole.name}
                onChange={(e) => updateNewRole("name", e.target.value)}
                placeholder="Ej: Coordinador"
              />
            </div>

            {/* Sección de permisos */}
            <div id="permissions-section">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Permisos</label>
                {/**
                 * Botón para seleccionar o deseleccionar todos los permisos
                 * Si ya están todos seleccionados, permite deseleccionar todos y viceversa
                 */}
                {(() => {
                  const allPermissionIds = permisos.map(p => p.id);
                  const allSelected = allPermissionIds.every(id => newRole.permissions.includes(id));
                  return (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setNewRole(prev => ({
                          ...prev,
                          permissions: allSelected ? [] : allPermissionIds
                        }));
                      }}
                    >
                      {allSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
                    </Button>
                  );
                })()}
              </div>
              <div id="permissions-categories" className="space-y-4">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category} id={`category-${category.toLowerCase()}`}>
                    <h4 className="font-medium text-sm mb-2">{category}</h4>
                    <div
                      id={`permissions-grid-${category.toLowerCase()}`}
                      className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4"
                    >
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          id={`permission-${permission.id}`}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`checkbox-${permission.id}`}
                            checked={newRole.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <label htmlFor={`checkbox-${permission.id}`} className="text-sm">
                            {permission.nombre}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div id="modal-actions" className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={closeCreateModal} id="cancel-create-button">
                Cancelar
              </Button>
              <Button onClick={handleCreateRole} disabled={!newRole.name} id="confirm-create-button">
                Crear Rol
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 
        BLOQUE DE COMENTARIOS: MODAL DE CREACIÓN DE PERMISOS
        
        Dialog modal que permite crear nuevos permisos con:
        - Formulario de información básica (nombre, descripción)
        - Validación y confirmación de creación
      */}
      <Dialog open={isCreatePermissionModalOpen} onOpenChange={setIsCreatePermissionModalOpen}>
        <DialogContent className="max-w-md" id="create-permission-dialog">
          <DialogHeader>
            <DialogTitle id="create-permission-title">Crear Nuevo Permiso</DialogTitle>
            <DialogDescription>
              Define un nuevo permiso que podrá ser asignado a los roles.
            </DialogDescription>
          </DialogHeader>
          <div id="create-permission-form" className="space-y-4">
            {/* Campo de nombre del permiso */}
            <div id="permission-name-field">
              <label className="text-sm font-medium">Nombre del Permiso *</label>
              <Input
                id="permission-name-input"
                value={newPermission.name}
                onChange={(e) => updateNewPermission("name", e.target.value)}
                placeholder="Ej: ver_reportes"
              />
            </div>

            {/* Campo de descripción */}
            <div id="permission-description-field">
              <label className="text-sm font-medium">Descripción *</label>
              <Input
                id="permission-description-input"
                value={newPermission.description}
                onChange={(e) => updateNewPermission("description", e.target.value)}
                placeholder="Descripción del permiso"
              />
            </div>

            {/* Botones de acción */}
            <div id="permission-modal-actions" className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={closeCreatePermissionModal} id="cancel-permission-button">
                Cancelar
              </Button>
              <Button 
                onClick={handleCreatePermission} 
                disabled={!newPermission.name || !newPermission.description} 
                id="confirm-permission-button"
              >
                Crear Permiso
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de error */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        title="Error en gestión de roles"
        errorMessage={errorModal.message}
      />
    </div>
  );
}
