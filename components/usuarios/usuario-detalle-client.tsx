"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import Link from "next/link";
import { UserDetail } from "@/models/users";
import { RolDetalle } from "@/models/roles";

/**
 * Interface para las props del componente
 */
interface UsuarioDetalleClientProps {
  userId: string;
  userData: UserDetail | null;
  userPermissions: RolDetalle[];
}


/**
 * Componente cliente para el detalle de usuario del sistema
 * Maneja toda la interfaz de usuario y las interacciones del detalle de usuario
 */
export default function UsuarioDetalleClient({ userId, userData, userPermissions }: UsuarioDetalleClientProps) {
  /*
   * BLOQUE DE COMENTARIOS: ESTADOS DEL COMPONENTE
   *
   * Estados para controlar la funcionalidad del detalle de usuario:
   * - isEditing: Controla si el usuario está en modo de edición
   */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Si no hay datos del usuario, mostramos mensaje de error
   */
  if (!userData) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">No se encontró información del usuario.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  /**
   * Función para alternar el modo de edición
   * TODO: Implementar validaciones y guardado de datos
   */
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  /**
   * Función para guardar los cambios del usuario
   * TODO: Implementar llamada a API para actualizar los datos del usuario
   */
  const handleSaveChanges = () => {
    console.log(`Saving changes for user ${userId}`);
    // Aquí se debería implementar la llamada a la API
    setIsEditing(false);
  };

  /**
   * Determinar si mostrar información laboral
   */
  const isEmpleado = userData.tipo_usuario === 'Empleado';

  /**
   * Obtener permisos únicos del rol
   */
  const uniquePermissions = userPermissions
    .filter(p => p.permiso_nombre)
    .map(p => ({
      id: p.permiso_id,
      nombre: p.permiso_nombre,
      descripcion: p.permiso_descripcion
    }))
    .filter((p, index, self) => 
      index === self.findIndex((t) => t.id === p.id)
    );

  return (
    <div id="usuario-detalle-container" className="p-6 space-y-6">
      {/* 
        BLOQUE DE COMENTARIOS: ENCABEZADO DEL DETALLE
        
        Sección principal que muestra el encabezado con navegación de retorno,
        información básica del usuario y controles de edición
      */}
      <div id="usuario-detalle-header" className="flex items-center justify-between">
        <div id="header-info" className="flex items-center gap-4">
          <Link href="/dashboard/usuarios">
            <Button variant="ghost" size="sm" id="volver-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div id="usuario-title-info">
            <h1 id="usuario-name-title" className="text-2xl font-bold">
              {userData.nombre_completo}
            </h1>
            <p id="usuario-position-department" className="text-gray-600">
              {isEmpleado && userData.cargo ? `${userData.cargo} - ${userData.departamento}` : userData.tipo_usuario}
            </p>
          </div>
        </div>
      </div>

      {/* 
        BLOQUE DE COMENTARIOS: TARJETA DE ESTADO DEL USUARIO
        
        Muestra la información principal del usuario incluyendo avatar,
        datos de contacto, estado y último acceso al sistema
      */}
      <Card id="usuario-status-card">
        <CardContent className="p-6">
          <div id="status-card-content" className="flex items-center justify-between">
            <div id="usuario-main-info" className="flex items-center gap-4">
              <div id="usuario-avatar" className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span id="avatar-initial" className="text-xl font-bold">
                  {userData.nombre_completo.charAt(0)}
                </span>
              </div>
              <div id="usuario-contact-info">
                <h2 id="usuario-display-name" className="text-xl font-semibold">
                  {userData.nombre_completo}
                </h2>
                <div id="contact-details" className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span id="email-display" className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {userData.email}
                  </span>
                  <span id="phone-display" className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {userData.telefono}
                  </span>
                </div>
              </div>
            </div>
             
          </div>
        </CardContent>
      </Card>

      {/* 
        BLOQUE DE COMENTARIOS: SISTEMA DE PESTAÑAS
        
        Organiza la información del usuario en pestañas:
        - Información Personal: Datos básicos y laborales
        - Permisos y Rol: Configuración de accesos
        - Actividad Reciente: Registro de acciones del usuario
      */}
      <Tabs defaultValue="info" className="space-y-4" id="usuario-tabs">
        <TabsList id="tabs-list">
          <TabsTrigger value="info" id="info-tab">
            Información Personal
          </TabsTrigger>
          <TabsTrigger value="permissions" id="permissions-tab">
            Permisos y Rol
          </TabsTrigger>
        
        </TabsList>

        {/* Pestaña de Información Personal */}
        <TabsContent value="info" id="info-tab-content">
          <div id="info-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Básica */}
            <Card id="informacion-basica-card">
              <CardHeader>
                <CardTitle id="basic-info-title">Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="email-info" className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div id="email-value">{userData.email}</div>
                  </div>
                </div>
                <div id="phone-info" className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Teléfono</div>
                    <div id="phone-value">{userData.telefono}</div>
                  </div>
                </div>
                {userData.direccion && (
                  <div id="address-info" className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Dirección</div>
                      <div id="address-value">{userData.direccion}</div>
                    </div>
                  </div>
                )}
                <div id="identification-info" className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Identificación</div>
                    <div id="identification-value">{userData.identificacion}</div>
                  </div>
                </div>
 
              </CardContent>
            </Card>

            {/* Información Laboral - Solo para empleados */}
            {isEmpleado ? (
              <Card id="informacion-laboral-card">
                <CardHeader>
                  <CardTitle id="work-info-title">Información Laboral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div id="role-info" className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Rol</div>
                      <Badge id="role-badge">{userData.rol_nombre}</Badge>
                    </div>
                  </div>
                  {userData.fecha_inicio_nomina && (
                    <div id="hire-date-info" className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Fecha de Contratación</div>
                        <div id="hire-date-value">{new Date(userData.fecha_inicio_nomina).toLocaleDateString()}</div>
                      </div>
                    </div>
                  )}
                  {userData.cargo && (
                    <div id="position-info" className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Cargo</div>
                        <div id="position-value">{userData.cargo}</div>
                      </div>
                    </div>
                  )}
                  {userData.departamento && (
                    <div id="department-info" className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Departamento</div>
                        <div id="department-value">{userData.departamento}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Información adicional para clientes */
              <Card id="informacion-adicional-card">
                <CardHeader>
                  <CardTitle id="additional-info-title">Información Adicional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div id="user-type-info" className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Tipo de Usuario</div>
                      <Badge id="user-type-badge">{userData.tipo_usuario}</Badge>
                    </div>
                  </div>
                  {userData.razon_social && (
                    <div id="razon-social-info" className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Razón Social</div>
                        <div id="razon-social-value">{userData.razon_social}</div>
                      </div>
                    </div>
                  )}
                  {userData.fecha_nacimiento && (
                    <div id="birth-date-info" className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Fecha de Nacimiento</div>
                        <div id="birth-date-value">{new Date(userData.fecha_nacimiento).toLocaleDateString()}</div>
                      </div>
                    </div>
                  )}
                  {userData.pc_nombre_completo && (
                    <div id="contact-person-info" className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Persona de Contacto</div>
                        <div id="contact-person-value">{userData.pc_nombre_completo} - {userData.pc_telefono}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Pestaña de Permisos y Rol */}
        <TabsContent value="permissions" id="permissions-tab-content">
          <Card id="permisos-rol-card">
            <CardHeader>
              <CardTitle id="permissions-title">Rol y Permisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="permissions-content" className="space-y-4">
                <div id="current-role-section">
                  <div className="text-sm font-medium mb-2">Rol Actual</div>
                  <Badge variant="default" className="text-base px-3 py-1" id="current-role-badge">
                    {userData.rol_nombre}
                  </Badge>
                </div>
                {uniquePermissions.length > 0 && (
                  <div id="permissions-section">
                    <div className="text-sm font-medium mb-3">Permisos Asignados</div>
                    <div id="permissions-grid" className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {uniquePermissions.map((permission) => (
                        <div
                          key={permission.id}
                          id={`permission-${permission.id}`}
                          className="flex items-center gap-2 p-2 border rounded"
                        >
                          <Shield className="w-4 h-4 text-green-600" />
                          <div>
                            <span className="text-sm font-medium">{permission.nombre}</span>
                            {permission.descripcion && (
                              <p className="text-xs text-gray-600">{permission.descripcion}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(!isEmpleado || uniquePermissions.length === 0) && (
                  <div className="text-sm text-gray-500">
                    {isEmpleado 
                      && "Este rol no tiene permisos específicos asignados." }
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

         
      </Tabs>
    </div>
  );
}
