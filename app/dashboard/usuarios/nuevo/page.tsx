"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Search, User } from "lucide-react";
import Link from "next/link";

// Mock data
const availablePeople = [
  { id: 1, name: "Pedro Ramírez", email: "pedro.ramirez@email.com", phone: "+58 412-1111111" },
  { id: 2, name: "Laura Fernández", email: "laura.fernandez@email.com", phone: "+58 414-2222222" },
  { id: 3, name: "Roberto Silva", email: "roberto.silva@email.com", phone: "+58 416-3333333" },
  { id: 4, name: "Carmen López", email: "carmen.lopez@email.com", phone: "+58 424-4444444" },
];

const roles = ["Administrador", "Gerente", "Supervisor", "Empleado", "Invitado"];
const departments = ["IT", "Ventas", "RRHH", "Logística", "Finanzas", "Marketing"];

export default function NewUserPage() {
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    personId: "",
    role: "",
    department: "",
    position: "",
    notes: "",
  });

  const filteredPeople = availablePeople.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePersonSelect = (person: any) => {
    setSelectedPerson(person);
    setNewUser((prev) => ({ ...prev, personId: person.id.toString() }));
  };

  const handleCreateUser = () => {
    if (!selectedPerson || !newUser.role || !newUser.department) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    console.log("Creating user:", {
      person: selectedPerson,
      ...newUser,
    });

    // Redirect to users list after creation
    // router.push('/usuarios')
  };

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
            <h1 className="text-2xl font-bold">Crear Nuevo Usuario</h1>
            <p className="text-gray-600">Asigna una persona registrada como usuario del sistema</p>
          </div>
        </div>
        <Button onClick={handleCreateUser}>
          <Save className="w-4 h-4 mr-2" />
          Crear Usuario
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Person Selection */}
        <Card>
          <CardHeader>
            <CardTitle>1. Seleccionar Persona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar persona por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredPeople.map((person) => (
                <div
                  key={person.id}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedPerson?.id === person.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePersonSelect(person)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{person.name}</div>
                      <div className="text-sm text-gray-600">{person.email}</div>
                      <div className="text-sm text-gray-500">{person.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedPerson && (
              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">Persona Seleccionada:</div>
                <div className="text-green-700">{selectedPerson.name}</div>
                <div className="text-sm text-green-600">{selectedPerson.email}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>2. Configuración de Usuario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Rol *</label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}>
                <SelectTrigger>
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

            <div>
              <label className="text-sm font-medium">Departamento *</label>
              <Select
                value={newUser.department}
                onValueChange={(value) => setNewUser((prev) => ({ ...prev, department: value }))}
              >
                <SelectTrigger>
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

            <div>
              <label className="text-sm font-medium">Cargo/Posición</label>
              <Input
                value={newUser.position}
                onChange={(e) => setNewUser((prev) => ({ ...prev, position: e.target.value }))}
                placeholder="Ej: Desarrollador Senior"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Notas Adicionales</label>
              <Textarea
                value={newUser.notes}
                onChange={(e) => setNewUser((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Información adicional sobre el usuario..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      {selectedPerson && newUser.role && newUser.department && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Creación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-600">Persona</div>
                <div>{selectedPerson.name}</div>
                <div className="text-sm text-gray-600">{selectedPerson.email}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Configuración</div>
                <div>Rol: {newUser.role}</div>
                <div>Departamento: {newUser.department}</div>
                {newUser.position && <div>Cargo: {newUser.position}</div>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
