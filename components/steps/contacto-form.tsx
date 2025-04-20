"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, X, PencilIcon, UserIcon, PhoneIcon, MailIcon, IdCardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { AddressSelector } from "@/components/address-selector";
import { CedulaInput } from "@/components/ui/cedula-input";

interface ContactoFormProps {
  tipoPersona: "natural" | "juridica";
}

// Prefijos telefónicos comunes en Venezuela
const prefijos = [
  { value: "0424", label: "0424" },
  { value: "0414", label: "0414" },
  { value: "0412", label: "0412" },
  { value: "0416", label: "0416" },
  { value: "0426", label: "0426" },
  { value: "0212", label: "0212" },
];

// Denominaciones para los teléfonos
const denominaciones = [
  { value: "movil", label: "Móvil" },
  { value: "casa", label: "Casa" },
  { value: "trabajo", label: "Trabajo" },
  { value: "otro", label: "Otro" },
];

const roles = [
  { value: "gerente", label: "Gerente" },
  { value: "director", label: "Director" },
  { value: "supervisor", label: "Supervisor" },
  { value: "coordinador", label: "Coordinador" },
  { value: "analista", label: "Analista" },
  { value: "asistente", label: "Asistente" },
  { value: "otro", label: "Otro" },
];

interface Telefono {
  id: string;
  prefijo: string;
  numero: string;
  denominacion: string;
}

interface PersonaContacto {
  id: string;
  nombreCompleto: string;
  cedula: string;
  telefono: {
    prefijo: string;
    numero: string;
  };
  email: string;
}

export function ContactoForm({ tipoPersona }: ContactoFormProps) {
  const { control, setValue, register, watch } = useFormContext();
  const [telefonos, setTelefonos] = useState<Telefono[]>(() => {
    const telefonosString = watch("telefonos") || "";
    if (!telefonosString) return [{ id: "1", prefijo: "0424", numero: "", denominacion: "movil" }];

    // Parse the existing telefonos string back into the array format
    return telefonosString.split(", ").map((tel: string, index: number) => {
      const match = tel.match(/(\d+) (.+) \((.+)\)/);
      if (match) {
        const [_, prefijo, numero, denominacion] = match;
        return {
          id: index.toString(),
          prefijo,
          numero,
          denominacion: denominaciones.find((d) => d.label === denominacion)?.value || "movil",
        };
      }
      return { id: index.toString(), prefijo: "0424", numero: "", denominacion: "movil" };
    });
  });

  const [personasContacto, setPersonasContacto] = useState<PersonaContacto[]>(() => {
    const personasString = watch("personasContacto") || "";
    if (!personasString) return [];

    // Parse the existing personas string back into the array format
    return personasString.split("\n").map((persona: string, index: number) => {
      const match = persona.match(/(.+) \((.+)\) - (\d+) (.+) - (.+)/);
      if (match) {
        const [_, nombreCompleto, cedula, prefijo, numero, email] = match;
        return {
          id: index.toString(),
          nombreCompleto,
          cedula,
          telefono: { prefijo, numero },
          email,
        };
      }
      return {
        id: index.toString(),
        nombreCompleto: "",
        cedula: "",
        telefono: { prefijo: "0424", numero: "" },
        email: "",
      };
    });
  });

  const [mostrarFormContacto, setMostrarFormContacto] = useState(false);
  const [personaEnEdicion, setPersonaEnEdicion] = useState<PersonaContacto>({
    id: "",
    nombreCompleto: "",
    cedula: "",
    telefono: {
      prefijo: "0424",
      numero: "",
    },
    email: "",
  });

  // Función para agregar un nuevo teléfono
  const agregarTelefono = () => {
    const nuevoTelefono = {
      id: Date.now().toString(),
      prefijo: "0424",
      numero: "",
      denominacion: "movil",
    };
    setTelefonos([...telefonos, nuevoTelefono]);
  };

  // Función para eliminar un teléfono
  const eliminarTelefono = (id: string) => {
    if (telefonos.length <= 1) return; // Mantener al menos un teléfono
    setTelefonos(telefonos.filter((tel) => tel.id !== id));
  };

  // Actualizar el campo telefonos en el formulario cuando cambian los teléfonos
  useEffect(() => {
    const telefonosString = telefonos
      .map(
        (tel) =>
          `${tel.prefijo} ${tel.numero} (${
            denominaciones.find((d) => d.value === tel.denominacion)?.label
          })`
      )
      .join(", ");
    setValue("telefonos", telefonosString);
  }, [telefonos, setValue]);

  // Función para agregar/actualizar una persona de contacto
  const guardarPersonaContacto = () => {
    if (personaEnEdicion.id) {
      setPersonasContacto(
        personasContacto.map((p) => (p.id === personaEnEdicion.id ? personaEnEdicion : p))
      );
    } else {
      setPersonasContacto([
        ...personasContacto,
        { ...personaEnEdicion, id: Date.now().toString() },
      ]);
    }
    setMostrarFormContacto(false);
    setPersonaEnEdicion({
      id: "",
      nombreCompleto: "",
      cedula: "",
      telefono: {
        prefijo: "0424",
        numero: "",
      },
      email: "",
    });
  };

  // Función para eliminar una persona de contacto
  const eliminarPersonaContacto = (id: string) => {
    setPersonasContacto(personasContacto.filter((persona) => persona.id !== id));
  };

  // Función para editar una persona de contacto
  const editarPersonaContacto = (persona: PersonaContacto) => {
    setPersonaEnEdicion(persona);
    setMostrarFormContacto(true);
  };

  // Actualizar el campo personasContacto en el formulario
  useEffect(() => {
    const personasString = personasContacto
      .map(
        (persona) =>
          `${persona.nombreCompleto} (${persona.cedula}) - ${persona.telefono.prefijo} ${persona.telefono.numero} - ${persona.email}`
      )
      .join("\n");
    setValue("personasContacto", personasString);
  }, [personasContacto, setValue]);

  const renderTelefonosSection = () => (
    <div className="space-y-4">
      <div>
        <FormLabel>Teléfonos</FormLabel>
        <div className="space-y-3">
          {telefonos.map((telefono) => (
            <div key={telefono.id} className="flex items-center gap-4">
              <div className="w-[80px] shrink-0">
                <Select
                  defaultValue={telefono.prefijo}
                  onValueChange={(value: string) => {
                    setTelefonos(
                      telefonos.map((tel) => {
                        if (tel.id === telefono.id) {
                          // If changing from 0212 to another prefix and denominacion is "casa", change it to "movil"
                          const newDenominacion =
                            value !== "0212" && tel.denominacion === "casa"
                              ? "movil"
                              : tel.denominacion;
                          return { ...tel, prefijo: value, denominacion: newDenominacion };
                        }
                        return tel;
                      })
                    );
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Prefijo" />
                  </SelectTrigger>
                  <SelectContent>
                    {prefijos.map((prefijo) => (
                      <SelectItem key={prefijo.value} value={prefijo.value}>
                        {prefijo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-[255px] shrink-0">
                <Input
                  placeholder="Número"
                  value={telefono.numero}
                  onChange={(e) => {
                    setTelefonos(
                      telefonos.map((tel) =>
                        tel.id === telefono.id ? { ...tel, numero: e.target.value } : tel
                      )
                    );
                  }}
                />
              </div>

              <Select
                defaultValue={telefono.denominacion}
                onValueChange={(value: string) => {
                  setTelefonos(
                    telefonos.map((tel) =>
                      tel.id === telefono.id ? { ...tel, denominacion: value } : tel
                    )
                  );
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {denominaciones.map((denominacion) => (
                    <SelectItem
                      key={denominacion.value}
                      value={denominacion.value}
                      disabled={denominacion.value === "casa" && telefono.prefijo !== "0212"}
                    >
                      {denominacion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => eliminarTelefono(telefono.id)}
                disabled={telefonos.length <= 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={agregarTelefono}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar otro teléfono
          </Button>
        </div>
      </div>

      {/* Campo oculto para mantener la validación */}
      <FormField
        control={control}
        name="telefonos"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderPersonasContactoSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Personas de Contacto</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMostrarFormContacto(true)}
          disabled={mostrarFormContacto}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar persona de contacto
        </Button>
      </div>

      {mostrarFormContacto && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel>Nombre Completo</FormLabel>
              <Input
                value={personaEnEdicion.nombreCompleto}
                onChange={(e) =>
                  setPersonaEnEdicion({ ...personaEnEdicion, nombreCompleto: e.target.value })
                }
                placeholder="Nombre y Apellido"
              />
            </div>
            <div>
              <FormLabel>Cédula</FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={control}
                  name="nacionalidadContacto"
                  render={({ field }) => (
                    <FormItem className="w-[80px]">
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setPersonaEnEdicion({
                            ...personaEnEdicion,
                            cedula: `${value}-${personaEnEdicion.cedula.split("-")[1] || ""}`,
                          });
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="V" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="V">V</SelectItem>
                          <SelectItem value="E">E</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Input
                  value={personaEnEdicion.cedula.split("-")[1] || ""}
                  onChange={(e) =>
                    setPersonaEnEdicion({
                      ...personaEnEdicion,
                      cedula: `${watch("nacionalidadContacto") || "V"}-${e.target.value}`,
                    })
                  }
                  placeholder="12345678"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[80px_255px_1fr] items-end gap-4">
            <div>
              <FormLabel>Teléfono</FormLabel>
              <Select
                value={personaEnEdicion.telefono.prefijo}
                onValueChange={(value) =>
                  setPersonaEnEdicion({
                    ...personaEnEdicion,
                    telefono: { ...personaEnEdicion.telefono, prefijo: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Prefijo" />
                </SelectTrigger>
                <SelectContent>
                  {prefijos.map((prefijo) => (
                    <SelectItem key={prefijo.value} value={prefijo.value}>
                      {prefijo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                value={personaEnEdicion.telefono.numero}
                onChange={(e) =>
                  setPersonaEnEdicion({
                    ...personaEnEdicion,
                    telefono: { ...personaEnEdicion.telefono, numero: e.target.value },
                  })
                }
                placeholder="Número"
              />
            </div>
            <div>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={personaEnEdicion.email}
                onChange={(e) =>
                  setPersonaEnEdicion({ ...personaEnEdicion, email: e.target.value })
                }
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setMostrarFormContacto(false);
                setPersonaEnEdicion({
                  id: "",
                  nombreCompleto: "",
                  cedula: "",
                  telefono: {
                    prefijo: "0424",
                    numero: "",
                  },
                  email: "",
                });
              }}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={guardarPersonaContacto}>
              {personaEnEdicion.id ? "Actualizar" : "Agregar"}
            </Button>
          </div>
        </div>
      )}

      {personasContacto.length > 0 && (
        <div className="space-y-2">
          {personasContacto.map((persona) => (
            <div
              key={persona.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
            >
              <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-8">
                <div className="flex items-center gap-2 text-sm">
                  <UserIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">{persona.nombreCompleto}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <IdCardIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{persona.cedula}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PhoneIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">
                    {persona.telefono.prefijo} {persona.telefono.numero}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm truncate">
                  <MailIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground truncate">{persona.email}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => editarPersonaContacto(persona)}
                  className="hover:bg-accent"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => eliminarPersonaContacto(persona.id)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campo oculto para mantener la validación */}
      <FormField
        control={control}
        name="personasContacto"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  if (tipoPersona === "natural") {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-6">Información de Contacto</h2>
          <div className="space-y-8 max-w-2xl">
            {renderTelefonosSection()}

            <FormField
              control={control}
              name="correoElectronico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h3 className="text-lg font-medium mb-4">Dirección de Habitación</h3>
              <AddressSelector
                name="direccionHabitacion"
                label="Dirección de Habitación"
                initialValues={watch("direccionHabitacion")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Información de Contacto Principal</h2>
        <div className="space-y-6">
          {renderTelefonosSection()}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name="paginaWeb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Página Web (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-8">{renderPersonasContactoSection()}</div>
    </div>
  );
}
