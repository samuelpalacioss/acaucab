"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Clock, Shield, Activity } from "lucide-react";
import Link from "next/link";

// Mock data
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

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false);

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
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-gray-600">
              {userData.position} - {userData.department}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
          {isEditing && <Button>Guardar Cambios</Button>}
        </div>
      </div>

      {/* User Status Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">{userData.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {userData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {userData.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={userData.status === "Activo" ? "default" : "secondary"} className="mb-2">
                {userData.status}
              </Badge>
              <div className="text-sm text-gray-600">Último acceso: {userData.lastLogin}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Información Personal</TabsTrigger>
          <TabsTrigger value="permissions">Permisos y Rol</TabsTrigger>
          <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div>{userData.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Teléfono</div>
                    <div>{userData.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Dirección</div>
                    <div>{userData.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Contacto de Emergencia</div>
                    <div>{userData.emergencyContact}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información Laboral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Rol</div>
                    <Badge>{userData.role}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Fecha de Contratación</div>
                    <div>{userData.hireDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Último Acceso</div>
                    <div>{userData.lastLogin}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Rol y Permisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Rol Actual</div>
                  <Badge variant="default" className="text-base px-3 py-1">
                    {userData.role}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium mb-3">Permisos Asignados</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {userData.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
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

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
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
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-gray-500" />
                          {log.action}
                        </div>
                      </TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{log.device}</TableCell>
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
