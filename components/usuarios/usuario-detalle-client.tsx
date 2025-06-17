"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Clock, Shield, Activity } from "lucide-react";
import Link from "next/link";

/**
 * Datos de ejemplo para el usuario específico
 * TODO: Esta información debería provenir de una API utilizando el userId
 */
const userData = {
  id: 1,
  name: "Juan Pérez",
  email: "juan.perez@empresa.com",
  phone: "+58 412-1234567",
  role: "Administrador",
  status: "Activo",
  department: "IT",
  position: "Desarrollador Senior",
  hireDate: "2022-03-15",
  lastLogin: "2024-01-15 10:30",
  address: "Av. Principal, Caracas, Venezuela",
  emergencyContact: "María Pérez - +58 414-7654321",
  permissions: [
    "Gestión de usuarios",
    "Configuración del sistema",
    "Reportes avanzados",
    "Gestión de roles",
    "Acceso completo",
  ],
};

/**
 * Registro de actividad del usuario
 * TODO: Esta información debería provenir de una API de logs de actividad
 */
const activityLog = [
  {
    id: 1,
    action: "Inicio de sesión",
    timestamp: "2024-01-15 10:30:15",
    ip: "192.168.1.100",
    device: "Chrome - Windows",
  },
  {
    id: 2,
    action: "Modificó usuario: María González",
    timestamp: "2024-01-15 09:45:22",
    ip: "192.168.1.100",
    device: "Chrome - Windows",
  },
  {
    id: 3,
    action: "Generó reporte de ventas",
    timestamp: "2024-01-15 09:15:33",
    ip: "192.168.1.100",
    device: "Chrome - Windows",
  },
  {
    id: 4,
    action: "Cerró sesión",
    timestamp: "2024-01-14 18:30:45",
    ip: "192.168.1.100",
    device: "Chrome - Windows",
  },
];

/**
 * Interface para las props del componente
 */
interface UsuarioDetalleClientProps {
  userId: string;
  // Aquí se pueden agregar props que vengan del servidor
  // Por ejemplo: userData, userPermissions, activityLogs, etc.
}

/**
 * Componente cliente para el detalle de usuario del sistema
 * Maneja toda la interfaz de usuario y las interacciones del detalle de usuario
 */
export default function UsuarioDetalleClient({ userId }: UsuarioDetalleClientProps) {
  /*
   * BLOQUE DE COMENTARIOS: ESTADOS DEL COMPONENTE
   *
   * Estados para controlar la funcionalidad del detalle de usuario:
   * - isEditing: Controla si el usuario está en modo de edición
   */
  const [isEditing, setIsEditing] = useState(false);

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
              {userData.name}
            </h1>
            <p id="usuario-position-department" className="text-gray-600">
              {userData.position} - {userData.department}
            </p>
          </div>
        </div>
        <div id="header-actions" className="flex gap-2">
          <Button variant="outline" onClick={toggleEditMode} id="edit-toggle-button">
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
          {isEditing && (
            <Button onClick={handleSaveChanges} id="save-changes-button">
              Guardar Cambios
            </Button>
          )}
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
                  {userData.name.charAt(0)}
                </span>
              </div>
              <div id="usuario-contact-info">
                <h2 id="usuario-display-name" className="text-xl font-semibold">
                  {userData.name}
                </h2>
                <div id="contact-details" className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span id="email-display" className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {userData.email}
                  </span>
                  <span id="phone-display" className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {userData.phone}
                  </span>
                </div>
              </div>
            </div>
            <div id="usuario-status-info" className="text-right">
              <Badge
                variant={userData.status === "Activo" ? "default" : "secondary"}
                className="mb-2"
                id="status-badge"
              >
                {userData.status}
              </Badge>
              <div id="last-access" className="text-sm text-gray-600">
                Último acceso: {userData.lastLogin}
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
          <TabsTrigger value="activity" id="activity-tab">
            Actividad Reciente
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
                    <div id="phone-value">{userData.phone}</div>
                  </div>
                </div>
                <div id="address-info" className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Dirección</div>
                    <div id="address-value">{userData.address}</div>
                  </div>
                </div>
                <div id="emergency-contact-info" className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Contacto de Emergencia</div>
                    <div id="emergency-contact-value">{userData.emergencyContact}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información Laboral */}
            <Card id="informacion-laboral-card">
              <CardHeader>
                <CardTitle id="work-info-title">Información Laboral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="role-info" className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Rol</div>
                    <Badge id="role-badge">{userData.role}</Badge>
                  </div>
                </div>
                <div id="hire-date-info" className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Fecha de Contratación</div>
                    <div id="hire-date-value">{userData.hireDate}</div>
                  </div>
                </div>
                <div id="last-login-info" className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Último Acceso</div>
                    <div id="last-login-value">{userData.lastLogin}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                    {userData.role}
                  </Badge>
                </div>
                <div id="permissions-section">
                  <div className="text-sm font-medium mb-3">Permisos Asignados</div>
                  <div id="permissions-grid" className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {userData.permissions.map((permission, index) => (
                      <div
                        key={index}
                        id={`permission-${index}`}
                        className="flex items-center gap-2 p-2 border rounded"
                      >
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Actividad Reciente */}
        <TabsContent value="activity" id="activity-tab-content">
          <Card id="actividad-reciente-card">
            <CardHeader>
              <CardTitle id="activity-title">Registro de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <Table id="activity-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Acción</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Dispositivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLog.map((log) => (
                    <TableRow key={log.id} id={`activity-row-${log.id}`}>
                      <TableCell id={`action-${log.id}`}>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-gray-500" />
                          {log.action}
                        </div>
                      </TableCell>
                      <TableCell id={`timestamp-${log.id}`}>{log.timestamp}</TableCell>
                      <TableCell id={`ip-${log.id}`}>{log.ip}</TableCell>
                      <TableCell id={`device-${log.id}`}>{log.device}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
