"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Users, Shield, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PermisoSistema, UsuarioPorRol } from "@/models/roles";
import { llamarFuncion } from "@/lib/server-actions";
import { toast } from "sonner";
import ErrorModal from "@/components/error-modal";
import { usePermissions } from "@/store/user-store";

/**
 * Interface para las props del componente
 */
interface EditarRolClientProps {
  roleId: string;
  /**
   * Información del rol obtenida desde la base de datos
   */
  roleInfo: {
    id: number;
    nombre: string;
    cantidad_usuarios: number;
    permisos_asignados: Array<{
      id: number;
      nombre: string;
      descripcion: string;
    }>;
  };
  /**
   * Lista de todos los permisos disponibles en el sistema
   */
  todosLosPermisos: PermisoSistema[];
  /**
   * Lista de usuarios asignados a este rol
   */
  usuariosDelRol: UsuarioPorRol[];
}

/**
 * Interface para la información del rol en edición
 */
interface RoleData {
  id: number;
  nombre: string;
  cantidad_usuarios: number;
  permisos: number[];
}

/**
 * Componente cliente para la edición de roles del sistema
 * Maneja toda la interfaz de usuario y las interacciones de edición de roles y permisos
 */
export default function EditarRolClient({ roleInfo, todosLosPermisos, usuariosDelRol }: EditarRolClientProps) {
  const { puedeEditarRoles, puedeAsignarPermisoRol } = usePermissions();

  /*
   * BLOQUE DE COMENTARIOS: ESTADOS DEL COMPONENTE
   *
   * Estados para controlar la funcionalidad de edición de roles:
   * - role: Datos del rol actual en edición
   * - hasChanges: Indica si hay cambios pendientes por guardar
   * - isLoading: Indica si se está procesando la actualización
   * - searchPermissions: Término de búsqueda para filtrar permisos
   */
  const [role, setRole] = useState<RoleData>({
    id: roleInfo.id,
    nombre: roleInfo.nombre,
    cantidad_usuarios: roleInfo.cantidad_usuarios,
    permisos: roleInfo.permisos_asignados.map((p) => p.id),
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPermissions, setSearchPermissions] = useState("");
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  });
  const router = useRouter();

  /**
   * Función para filtrar permisos basándose en el término de búsqueda
   */
  const filteredPermissions = todosLosPermisos.filter(
    (permission) =>
      permission.nombre.toLowerCase().includes(searchPermissions.toLowerCase()) ||
      permission.descripcion.toLowerCase().includes(searchPermissions.toLowerCase())
  );

  /**
   * Función para agrupar permisos por categoría
   * Agrupa los permisos basándose en la entidad/tabla a la que pertenecen
   */
  const groupedPermissions = filteredPermissions.reduce((acc, permission) => {
    // Extraer el nombre de la entidad del nombre del permiso
    // El formato es 'acción_entidad', ejemplo: 'crear_usuario' -> 'usuario'
    const entityName = permission.nombre.split("_").slice(1).join("_");

    // Determinar la categoría basada en la entidad
    let category = "Gestión de " + entityName.charAt(0).toUpperCase() + entityName.slice(1);

    // Casos especiales de pluralización y nombres compuestos
    if (entityName.includes("usuario")) category = "Gestión de Usuarios";
    if (entityName.includes("rol")) category = "Gestión de Roles";
    if (entityName.includes("permiso")) category = "Gestión de Permisos";
    if (entityName.includes("cliente")) category = "Gestión de Clientes";
    if (entityName.includes("empleado")) category = "Gestión de Empleados";
    if (entityName.includes("venta")) category = "Gestión de Ventas";
    if (entityName.includes("pago")) category = "Gestión de Pagos";
    if (entityName.includes("orden_de_compra")) category = "Gestión de Órdenes de Compra";
    if (entityName.includes("orden_de_reposicion")) category = "Gestión de Órdenes de Reposición";
    if (entityName.includes("inventario")) category = "Gestión de Inventario";
    if (entityName.includes("evento")) category = "Gestión de Eventos";
    if (entityName.includes("miembro")) category = "Gestión de Miembros";
    if (entityName.includes("beneficio")) category = "Gestión de Beneficios";
    if (entityName.includes("nomina")) category = "Gestión de Nómina";
    if (entityName.includes("horario")) category = "Gestión de Horarios";
    if (entityName.includes("vacacion")) category = "Gestión de Vacaciones";
    if (entityName.includes("registro_biometrico")) category = "Gestión de Registros Biométricos";
    if (entityName.includes("cerveza")) category = "Gestión de Cervezas";
    if (entityName.includes("presentacion")) category = "Gestión de Presentaciones";
    if (entityName.includes("almacen")) category = "Gestión de Almacenes";
    if (entityName.includes("tienda")) category = "Gestión de Tiendas";
    if (entityName.includes("descuento")) category = "Gestión de Descuentos";
    if (entityName.includes("status")) category = "Gestión de Estados";
    if (entityName.includes("tasa")) category = "Gestión de Tasas";
    if (entityName.includes("lugar")) category = "Gestión de Lugares";

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, PermisoSistema[]>);

  /**
   * Función para alternar permisos del rol
   */
  const togglePermission = (permissionId: number) => {
    setRole((prev) => ({
      ...prev,
      permisos: prev.permisos.includes(permissionId)
        ? prev.permisos.filter((p) => p !== permissionId)
        : [...prev.permisos, permissionId],
    }));
    setHasChanges(true);
  };

  /**
   * Función para actualizar el nombre del rol
   */
  const updateRoleName = (nombre: string) => {
    setRole((prev) => ({ ...prev, nombre }));
    setHasChanges(true);
  };

  /**
   * Función para guardar los cambios del rol
   * Llama a la función fn_update_rol de PostgreSQL
   */
  const handleSave = async () => {
    // Validar que el nombre no esté vacío
    if (!role.nombre.trim()) {
      setErrorModal({
        isOpen: true,
        message: "El nombre del rol no puede estar vacío",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Llamar a la función de PostgreSQL con los parámetros necesarios
      const result = await llamarFuncion("fn_update_rol", {
        p_rol_id: role.id,
        p_nuevo_nombre: role.nombre.trim(),
        p_permisos_ids: role.permisos,
      });

      if (result) {
        // Mostrar mensaje de éxito
        toast.success("Rol actualizado correctamente", {
          description: `El rol "${role.nombre}" ha sido actualizado con ${role.permisos.length} permisos.`,
        });

        // Resetear el estado de cambios
        setHasChanges(false);

        // Refrescar la página para obtener los datos actualizados
        router.refresh();
      }
    } catch (error: any) {
      // Manejar errores
      console.error("Error al actualizar el rol:", error);
      setErrorModal({
        isOpen: true,
        message: error.message || "Ocurrió un error inesperado al actualizar el rol",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              Editar Rol: {role.nombre}
            </h1>
            <p id="editar-rol-description" className="text-gray-600">
              Configura permisos y usuarios asignados
            </p>
          </div>
        </div>
        {(puedeEditarRoles() || puedeAsignarPermisoRol()) && (
          <Button onClick={handleSave} disabled={!hasChanges || isLoading} id="guardar-cambios-button">
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </>
            )}
          </Button>
        )}
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
                {puedeEditarRoles() ? (
                  <Input
                    id="rol-name-input"
                    value={role.nombre}
                    onChange={(e) => updateRoleName(e.target.value)}
                    placeholder="Nombre del rol"
                    disabled={isLoading}
                  />
                ) : (
                  <Input id="rol-name-input" value={role.nombre} disabled={true} />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sección de permisos del rol */}
          {puedeAsignarPermisoRol() ? (
            <Card id="rol-permisos-card">
              <CardHeader>
                <CardTitle id="rol-permisos-title">Permisos del Rol</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Campo de búsqueda de permisos */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar permisos por nombre o descripción..."
                      value={searchPermissions}
                      onChange={(e) => setSearchPermissions(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  {searchPermissions && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Mostrando {filteredPermissions.length} de {todosLosPermisos.length} permisos
                    </div>
                  )}
                </div>

                {/*\
                Botón para seleccionar o deseleccionar todos los permisos
                Si ya están todos seleccionados, permite deseleccionar todos y viceversa
              */}
                {/**
                 * Determinar si todos los permisos están seleccionados
                 */}
                {(() => {
                  const allPermissionIds = filteredPermissions.map((p) => p.id);
                  const allSelected = allPermissionIds.every((id) => role.permisos.includes(id));
                  return (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mb-4"
                      disabled={isLoading || filteredPermissions.length === 0}
                      onClick={() => {
                        setRole((prev) => ({
                          ...prev,
                          permisos: allSelected
                            ? prev.permisos.filter((id) => !allPermissionIds.includes(id))
                            : [...new Set([...prev.permisos, ...allPermissionIds])],
                        }));
                        setHasChanges(true);
                      }}
                    >
                      {allSelected ? "Deseleccionar mostrados" : "Seleccionar mostrados"}
                    </Button>
                  );
                })()}

                {filteredPermissions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron permisos que coincidan con "{searchPermissions}"
                  </div>
                ) : (
                  <div id="permisos-categories" className="space-y-6">
                    {Object.entries(groupedPermissions).map(([category, permissions]) => (
                      <div key={category} id={`category-${category.toLowerCase()}`}>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-medium">
                          <Shield className="h-4 w-4" />
                          {category}
                        </h4>
                        <div
                          id={`permissions-grid-${category.toLowerCase()}`}
                          className="grid grid-cols-1 gap-3 md:grid-cols-2 ml-6"
                        >
                          {permissions.map((permission) => (
                            <div
                              key={permission.id}
                              id={`permission-${permission.id}`}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`checkbox-${permission.id}`}
                                checked={role.permisos.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                                disabled={isLoading}
                              />
                              <label htmlFor={`checkbox-${permission.id}`} className="text-sm">
                                {permission.descripcion}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}
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
                    {role.cantidad_usuarios}
                  </div>
                  <div className="text-sm text-gray-600">usuarios con este rol</div>
                </div>

                {/* Lista de usuarios asignados */}
                {usuariosDelRol.length > 0 ? (
                  <div id="usuarios-list" className="space-y-2 max-h-64 overflow-y-auto">
                    {usuariosDelRol.slice(0, 10).map((user) => (
                      <div
                        key={user.id}
                        id={`user-item-${user.id}`}
                        className="flex items-center gap-3 p-2 border rounded"
                      >
                        <div
                          id={`user-avatar-${user.id}`}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <span className="text-xs font-bold">{user.nombre_completo.charAt(0).toUpperCase()}</span>
                        </div>
                        <div id={`user-info-${user.id}`} className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{user.nombre_completo}</div>
                          <div className="text-xs text-gray-600 truncate">{user.correo}</div>
                          <div className="text-xs text-gray-500">{user.tipo_persona}</div>
                        </div>
                      </div>
                    ))}
                    {usuariosDelRol.length > 10 && (
                      <div className="text-xs text-gray-500 text-center pt-2">
                        y {usuariosDelRol.length - 10} usuarios más...
                      </div>
                    )}
                  </div>
                ) : (
                  <div id="usuarios-empty" className="text-sm text-gray-600 text-center p-4">
                    No hay usuarios asignados a este rol
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Resumen de permisos actuales */}
          {puedeAsignarPermisoRol() ? (
            <Card id="permisos-actuales-card">
              <CardHeader>
                <CardTitle id="permisos-actuales-title" className="text-sm">
                  Permisos Actuales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div id="permisos-actuales-count" className="p-2 mb-2 text-center bg-gray-50 rounded">
                  <div className="text-lg font-bold">{role.permisos.length}</div>
                  <div className="text-xs text-gray-600">permisos asignados</div>
                </div>
                <div id="permisos-actuales-list" className="space-y-1 overflow-y-auto text-xs text-gray-600 max-h-32">
                  {todosLosPermisos
                    .filter((p) => role.permisos.includes(p.id))
                    .map((p) => (
                      <div key={p.id} className="truncate">
                        • {p.nombre}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ) : null}

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

      {/* Modal de error */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        title="Error al editar rol"
        errorMessage={errorModal.message}
      />
    </div>
  );
}
