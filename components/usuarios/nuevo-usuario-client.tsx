"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Search, User } from "lucide-react";
import Link from "next/link";

/**
 * Datos de ejemplo para personas disponibles en el sistema
 * TODO: Esta información debería provenir de una API de personas registradas
 */
const availablePeople = [
  { id: 1, name: "Pedro Ramírez", email: "pedro.ramirez@email.com", phone: "+58 412-1111111" },
  { id: 2, name: "Laura Fernández", email: "laura.fernandez@email.com", phone: "+58 414-2222222" },
  { id: 3, name: "Roberto Silva", email: "roberto.silva@email.com", phone: "+58 416-3333333" },
  { id: 4, name: "Carmen López", email: "carmen.lopez@email.com", phone: "+58 424-4444444" },
];

/**
 * Lista de roles disponibles en el sistema
 * TODO: Esta información debería provenir de una API de configuración de roles
 */
const roles = ["Administrador", "Gerente", "Supervisor", "Empleado", "Invitado"];

/**
 * Lista de departamentos disponibles en la empresa
 * TODO: Esta información debería provenir de una API de estructura organizacional
 */
const departments = ["IT", "Ventas", "RRHH", "Logística", "Finanzas", "Marketing"];

/**
 * Interface para las props del componente
 */
interface NuevoUsuarioClientProps {
  // Aquí se pueden agregar props que vengan del servidor
  // Por ejemplo: availablePeople, availableRoles, departments, userPermissions, etc.
}

/**
 * Interface para la información de un nuevo usuario
 */
interface NewUserData {
  personId: string;
  role: string;
  department: string;
  position: string;
  notes: string;
}

/**
 * Componente cliente para la creación de nuevos usuarios del sistema
 * Maneja toda la interfaz de usuario y las interacciones para crear usuarios
 */
export default function NuevoUsuarioClient({}: NuevoUsuarioClientProps) {
  /*
   * BLOQUE DE COMENTARIOS: ESTADOS DEL COMPONENTE
   *
   * Estados para controlar la funcionalidad de creación de usuarios:
   * - selectedPerson: Persona seleccionada para convertir en usuario
   * - searchTerm: Término de búsqueda para filtrar personas
   * - newUser: Datos del nuevo usuario a crear
   */
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState<NewUserData>({
    personId: "",
    role: "",
    department: "",
    position: "",
    notes: "",
  });

  /**
   * Función para filtrar personas según el término de búsqueda
   */
  const filteredPeople = availablePeople.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Función para seleccionar una persona y asignarla al nuevo usuario
   */
  const handlePersonSelect = (person: any) => {
    setSelectedPerson(person);
    setNewUser((prev) => ({ ...prev, personId: person.id.toString() }));
  };

  /**
   * Función para manejar la búsqueda de personas
   */
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  /**
   * Función para actualizar los datos del nuevo usuario
   */
  const updateNewUser = (field: keyof NewUserData, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Función para crear el nuevo usuario
   * TODO: Implementar llamada a API para crear el usuario
   */
  const handleCreateUser = () => {
    if (!selectedPerson || !newUser.role || !newUser.department) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    console.log("Creating user:", {
      person: selectedPerson,
      ...newUser,
    });

    // TODO: Implementar llamada a API y redirección
    // router.push('/dashboard/usuarios')
  };

  /**
   * Función para validar si se puede crear el usuario
   */
  const canCreateUser = selectedPerson && newUser.role && newUser.department;

  return (
    <div id="nuevo-usuario-container" className="p-6 space-y-6">
      {/* 
        BLOQUE DE COMENTARIOS: ENCABEZADO DE CREACIÓN
        
        Sección principal que muestra el encabezado con navegación de retorno,
        información sobre la creación de usuarios y botón de guardar
      */}
      <div id="nuevo-usuario-header" className="flex items-center justify-between">
        <div id="header-info" className="flex items-center gap-4">
          <Link href="/dashboard/usuarios">
            <Button variant="ghost" size="sm" id="volver-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div id="header-title-info">
            <h1 id="nuevo-usuario-title" className="text-2xl font-bold">
              Crear Nuevo Usuario
            </h1>
            <p id="nuevo-usuario-description" className="text-gray-600">
              Asigna una persona registrada como usuario del sistema
            </p>
          </div>
        </div>
        <Button onClick={handleCreateUser} id="crear-usuario-button">
          <Save className="w-4 h-4 mr-2" />
          Crear Usuario
        </Button>
      </div>

      {/* 
        BLOQUE DE COMENTARIOS: GRID PRINCIPAL DE CREACIÓN
        
        Contiene dos columnas principales:
        1. Selección de persona: Búsqueda y selección de persona a convertir en usuario
        2. Configuración de usuario: Asignación de rol, departamento y datos adicionales
      */}
      <div id="creation-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección de Selección de Persona */}
        <Card id="seleccion-persona-card">
          <CardHeader>
            <CardTitle id="seleccion-persona-title">1. Seleccionar Persona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Campo de búsqueda */}
            <div id="search-container" className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search-personas-input"
                placeholder="Buscar persona por nombre o email..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Lista de personas disponibles */}
            <div id="personas-list" className="space-y-2 max-h-64 overflow-y-auto">
              {filteredPeople.map((person) => (
                <div
                  key={person.id}
                  id={`persona-item-${person.id}`}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedPerson?.id === person.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePersonSelect(person)}
                >
                  <div id={`persona-content-${person.id}`} className="flex items-center gap-3">
                    <div
                      id={`persona-avatar-${person.id}`}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      <User className="w-5 h-5" />
                    </div>
                    <div id={`persona-info-${person.id}`} className="flex-1">
                      <div className="font-medium">{person.name}</div>
                      <div className="text-sm text-gray-600">{person.email}</div>
                      <div className="text-sm text-gray-500">{person.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Confirmación de persona seleccionada */}
            {selectedPerson && (
              <div id="persona-selected-confirmation" className="p-4 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">Persona Seleccionada:</div>
                <div id="selected-person-name" className="text-green-700">
                  {selectedPerson.name}
                </div>
                <div id="selected-person-email" className="text-sm text-green-600">
                  {selectedPerson.email}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sección de Configuración de Usuario */}
        <Card id="configuracion-usuario-card">
          <CardHeader>
            <CardTitle id="configuracion-usuario-title">2. Configuración de Usuario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Campo de rol */}
            <div id="rol-field">
              <label className="text-sm font-medium">Rol *</label>
              <Select value={newUser.role} onValueChange={(value) => updateNewUser("role", value)}>
                <SelectTrigger id="rol-selector">
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

            {/* Campo de departamento */}
            <div id="departamento-field">
              <label className="text-sm font-medium">Departamento *</label>
              <Select value={newUser.department} onValueChange={(value) => updateNewUser("department", value)}>
                <SelectTrigger id="departamento-selector">
                  <SelectValue placeholder="Seleccionar departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campo de cargo/posición */}
            <div id="posicion-field">
              <label className="text-sm font-medium">Cargo/Posición</label>
              <Input
                id="posicion-input"
                value={newUser.position}
                onChange={(e) => updateNewUser("position", e.target.value)}
                placeholder="Ej: Desarrollador Senior"
              />
            </div>

            {/* Campo de notas adicionales */}
            <div id="notas-field">
              <label className="text-sm font-medium">Notas Adicionales</label>
              <Textarea
                id="notas-textarea"
                value={newUser.notes}
                onChange={(e) => updateNewUser("notes", e.target.value)}
                placeholder="Información adicional sobre el usuario..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 
        BLOQUE DE COMENTARIOS: RESUMEN DE CREACIÓN
        
        Muestra un resumen de la información seleccionada cuando todos los
        campos obligatorios están completos, permitiendo revisar antes de crear
      */}
      {canCreateUser && (
        <Card id="resumen-creacion-card">
          <CardHeader>
            <CardTitle id="resumen-title">Resumen de Creación</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="resumen-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div id="resumen-persona">
                <div className="text-sm font-medium text-gray-600">Persona</div>
                <div id="resumen-persona-name">{selectedPerson.name}</div>
                <div id="resumen-persona-email" className="text-sm text-gray-600">
                  {selectedPerson.email}
                </div>
              </div>
              <div id="resumen-configuracion">
                <div className="text-sm font-medium text-gray-600">Configuración</div>
                <div id="resumen-rol">Rol: {newUser.role}</div>
                <div id="resumen-departamento">Departamento: {newUser.department}</div>
                {newUser.position && <div id="resumen-cargo">Cargo: {newUser.position}</div>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
