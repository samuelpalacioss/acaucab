"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CedulaInput } from "@/components/ui/cedula-input";
import { RifInput } from "@/components/ui/rif-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DatosBasicosFormProps {
  tipoPersona: "natural" | "juridica";
}

export function DatosBasicosForm({ tipoPersona }: DatosBasicosFormProps) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const PasswordInput = ({ name, label }: { name: string; label: string }) => {
    const isConfirmPassword = name === "confirmPassword";
    const showPasswordState = isConfirmPassword ? showConfirmPassword : showPassword;
    const setPasswordState = isConfirmPassword ? setShowConfirmPassword : setShowPassword;

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="relative">
              <FormControl>
                <Input
                  type={showPasswordState ? "text" : "password"}
                  placeholder="••••••••"
                  {...field}
                />
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setPasswordState(!showPasswordState)}
              >
                {showPasswordState ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  if (tipoPersona === "natural") {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Datos Básicos - Persona Natural</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RifInput control={control} name="rif" />

          <CedulaInput control={control} name="cedula" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Nombres" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PasswordInput name="password" label="Contraseña" />
          <PasswordInput name="confirmPassword" label="Confirmar Contraseña" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Datos Básicos - Persona Jurídica</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="denominacionComercial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Denominación Comercial</FormLabel>
              <FormControl>
                <Input placeholder="Nombre comercial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="razonSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón Social</FormLabel>
              <FormControl>
                <Input placeholder="Razón social" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RifInput control={control} name="rif" />

        <FormField
          control={control}
          name="capitalDisponible"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capital Disponible</FormLabel>
              <FormControl>
                <Input placeholder="Capital disponible" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="correoElectronico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="empresa@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PasswordInput name="password" label="Contraseña" />
        <PasswordInput name="confirmPassword" label="Confirmar Contraseña" />
      </div>
    </div>
  );
}
