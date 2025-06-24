"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Search, User, Lock, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PersonaSinUsuario } from "@/models/users";
import { Rol, RolDetalle } from "@/models/roles";
import { PasswordInput } from "@/components/ui/password-input";
import { Badge } from "@/components/ui/badge";
import { llamarFuncion } from "@/lib/server-actions";
import { toast } from "@/components/ui/use-toast";
import ErrorModal from "@/components/error-modal";

/**
 * Interface para las props del componente
 */
interface NuevoUsuarioClientProps {
  personasDisponibles: PersonaSinUsuario[];
  roles: Rol[];
}

/**
 * Interface para la información de un nuevo usuario
 */
interface NewUserData {
  personId: string;
  role: string;
  roleId: number | null;
  password: string;
  newEmail?: string;
}

/**
 * Componente cliente para la creación de nuevos usuarios del sistema
 * Maneja toda la interfaz de usuario y las interacciones para crear usuarios
 */
export default function NuevoUsuarioClient({
  personasDisponibles,
  roles
}: NuevoUsuarioClientProps) {
  const router = useRouter();
  const [selectedPerson, setSelectedPerson] = useState<PersonaSinUsuario | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState<NewUserData>({
    personId: "",
    role: "",
    roleId: null,
    password: "",
    newEmail: "",
  });
  const [rolePermissions, setRolePermissions] = useState<RolDetalle[]>([]);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ""
  });

  /**
   * Función para filtrar personas según el término de búsqueda
   */
  const filteredPeople = personasDisponibles.filter((person) => {
    const searchLower = searchTerm.toLowerCase();
    
    return (
      person.nombre_completo?.toLowerCase().includes(searchLower) ||
      (person.email && person.email.toLowerCase().includes(searchLower)) ||
      (person.telefono && person.telefono.toLowerCase().includes(searchLower)) ||
      (person.documento && person.documento.toLowerCase().includes(searchLower)) ||
      person.tipo_persona.toLowerCase().includes(searchLower)
    );
  });

  /**
   * Función para seleccionar una persona y asignarla al nuevo usuario
   */
  const handlePersonSelect = (person: PersonaSinUsuario) => {
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
  const updateNewUser = (field: keyof NewUserData, value: string | number) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Función para manejar el cambio de rol y cargar sus permisos
   */
  const handleRoleChange = async (roleName: string) => {
    const selectedRole = roles.find(r => r.nombre === roleName);
    if (!selectedRole) return;

    updateNewUser("role", roleName);
    updateNewUser("roleId", selectedRole.id);

    // Cargar permisos del rol
    setLoadingPermissions(true);
    try {
      const data = await llamarFuncion('fn_get_role_by_id', { p_id: selectedRole.id });
      setRolePermissions(data || []);
    } catch (error) {
      console.error("Error loading role permissions:", error);
      setRolePermissions([]);
    } finally {
      setLoadingPermissions(false);
    }
  };

  /**
   * Función para crear el nuevo usuario
   * Llama a la función fn_create_user de PostgreSQL
   */
  const handleCreateUser = async () => {
    if (!selectedPerson || !newUser.role || !newUser.password) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    // Validar que el email esté disponible
    const finalEmail = selectedPerson.email || newUser.newEmail;
    if (!finalEmail) {
      toast({
        title: "Error",
        description: "El usuario debe tener un email. Por favor ingrese uno.",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingUser(true);

    try {
      // Preparar parámetros para la función PostgreSQL
      const parametros = {
        p_person_id: selectedPerson.id,
        p_person_type: selectedPerson.tipo_persona,
        p_person_naturaleza: selectedPerson.nacionalidad_naturaleza || null,
        p_rol_id: newUser.roleId,
        p_email: finalEmail,
        p_password: newUser.password
      };

      console.log("Creando usuario con parámetros:", parametros);

      // Llamar a la función de PostgreSQL
      const resultado = await llamarFuncion('fn_create_user', parametros);

      console.log("Resultado completo de fn_create_user:", resultado);

      // Verificar si la operación fue exitosa
      // La función puede retornar el ID del usuario directamente o en un array
      const userCreated = resultado && (
        (Array.isArray(resultado) && resultado.length > 0) ||
        (typeof resultado === 'number' && resultado > 0) ||
        (typeof resultado === 'string' && resultado !== '')
      );

      if (userCreated) {
        toast({
          title: "¡Éxito!",
          description: `Usuario creado exitosamente`,
        });
        
        // Limpiar los campos del formulario
        setSelectedPerson(null);
        setSearchTerm("");
        setNewUser({
          personId: "",
          role: "",
          roleId: null,
          password: "",
          newEmail: "",
        });
        setRolePermissions([]);

        // Forzar recarga completa de la página para actualizar la lista de personas
        window.location.reload();

      } else {
        setErrorModal({
          isOpen: true,
          message: "Error al crear el usuario. Por favor intente de nuevo."
        });
      }
    } catch (error: any) {
      console.error("Error al crear usuario:", error);
      setErrorModal({
        isOpen: true,
        message: error.message || "Error desconocido al crear el usuario"
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

  /**
   * Función para validar si se puede crear el usuario
   */
  const canCreateUser = selectedPerson && newUser.role && newUser.password;

  /**
   * Obtener permisos únicos del rol
   */
  const uniquePermissions = rolePermissions.filter(
    (permission, index, self) =>
      permission.permiso_id !== null &&
      index === self.findIndex((p) => p.permiso_id === permission.permiso_id)
  );

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
        <Button 
          onClick={handleCreateUser} 
          id="crear-usuario-button"
          disabled={!canCreateUser || isCreatingUser}
        >
          {isCreatingUser ? (
            <>
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Crear Usuario
            </>
          )}
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
                placeholder="Buscar por nombre, email, documento..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Contador de resultados */}
            <div className="text-sm text-gray-600">
              {filteredPeople.length} personas encontradas
            </div>

            {/* Lista de personas disponibles */}
            <div id="personas-list" className="space-y-2 max-h-64 overflow-y-auto">
              {filteredPeople.map((person) => (
                <div
                  key={`${person.tipo_persona}-${person.id}`}
                  id={`persona-item-${person.id}`}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedPerson?.id === person.id && selectedPerson?.tipo_persona === person.tipo_persona
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
                      <div className="text-xs text-gray-500 font-medium">{person.tipo_persona}</div>
                      <div className="font-medium">{person.nombre_completo}</div>
                      <div className="text-sm text-gray-600">
                        {person.nacionalidad_naturaleza}-{person.documento}
                      </div>
                      <div className="text-sm text-gray-600">{person.email || 'Sin email'}</div>
                      <div className="text-sm text-gray-500">{person.telefono || 'Sin teléfono'}</div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPeople.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No se encontraron personas con ese criterio
                </div>
              )}
            </div>

            {/* Confirmación de persona seleccionada */}
            {selectedPerson && (
              <div id="persona-selected-confirmation" className="p-4 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">Persona Seleccionada:</div>
                <div className="text-xs text-green-600">{selectedPerson.tipo_persona}</div>
                <div id="selected-person-name" className="text-green-700">
                  {selectedPerson.nombre_completo}
                </div>
                <div id="selected-person-document" className="text-sm text-green-600">
                  {selectedPerson.nacionalidad_naturaleza}-{selectedPerson.documento}
                </div>
                <div id="selected-person-email" className="text-sm text-green-600">
                  {selectedPerson.email || 'Sin email'}
                </div>
                <div id="selected-person-phone" className="text-sm text-green-600">
                  {selectedPerson.telefono || 'Sin teléfono'}
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
              <Select value={newUser.role} onValueChange={handleRoleChange}>
                <SelectTrigger id="rol-selector">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.nombre}>
                      {role.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campo de email */}
            <div id="email-field">
              <label className="text-sm font-medium">Email</label>
              <div className="text-xs text-gray-500 mb-1">
                {selectedPerson?.email 
                  ? "Email existente (no editable)" 
                  : "Agregar email para este usuario (opcional)"
                }
              </div>
              <Input
                id="email-input"
                type="email"
                value={selectedPerson?.email || newUser.newEmail || ""}
                onChange={(e) => updateNewUser("newEmail", e.target.value)}
                placeholder={selectedPerson?.email ? "" : "ejemplo@correo.com"}
                disabled={!!selectedPerson?.email}
                className={selectedPerson?.email ? "bg-gray-50 text-gray-600" : ""}
              />
            </div>

            {/* Campo de contraseña */}
            <div id="password-field">
              <label className="text-sm font-medium">Contraseña *</label>
              <PasswordInput
                id="password-input"
                value={newUser.password}
                onChange={(e) => updateNewUser("password", e.target.value)}
                placeholder="Ingrese una contraseña segura"
              />
            </div>

            {/* Permisos del rol seleccionado */}
            {newUser.role && (
              <div id="permisos-section" className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <label className="text-sm font-medium">Permisos del Rol</label>
                </div>
                {loadingPermissions ? (
                  <div className="text-sm text-gray-500">Cargando permisos...</div>
                ) : uniquePermissions.length > 0 ? (
                  <div className="space-y-1 max-h-48 overflow-y-auto border rounded p-2">
                    {uniquePermissions.map((permission) => (
                      <div key={permission.permiso_id} className="flex items-start gap-2 p-1">
                        <Badge variant="secondary" className="text-xs">
                          {permission.permiso_nombre}
                        </Badge>
                        <span className="text-xs text-gray-600">{permission.permiso_descripcion}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Este rol no tiene permisos asignados</div>
                )}
              </div>
            )}
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
                <div className="text-xs text-gray-500">{selectedPerson.tipo_persona}</div>
                <div id="resumen-persona-name">{selectedPerson.nombre_completo}</div>
                <div id="resumen-persona-document" className="text-sm text-gray-600">
                  {selectedPerson.nacionalidad_naturaleza}-{selectedPerson.documento}
                </div>
                <div id="resumen-persona-email" className="text-sm text-gray-600">
                  {selectedPerson.email || newUser.newEmail || 'Sin email'}
                  {!selectedPerson.email && newUser.newEmail && (
                    <span className="text-green-600 ml-1">(Nuevo)</span>
                  )}
                </div>
              </div>
              <div id="resumen-configuracion">
                <div className="text-sm font-medium text-gray-600">Configuración</div>
                <div id="resumen-rol">Rol: {newUser.role}</div>
                <div id="resumen-permisos" className="text-sm text-gray-600">
                  {uniquePermissions.length} permisos asignados
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de error */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        title="Error al crear usuario"
        errorMessage={errorModal.message}
      />
    </div>
  );
}
