"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Lista de bancos venezolanos con sus códigos */
export const bancos = [
  { codigo: "0172", nombre: "Bancamiga" },
  { codigo: "0134", nombre: "Banesco" },
  { codigo: "0105", nombre: "Mercantil" },
  { codigo: "0108", nombre: "Provincial" },
  { codigo: "0102", nombre: "Banco de Venezuela" },
  { codigo: "0138", nombre: "Banco Plaza" },
  { codigo: "0151", nombre: "Fondo Común" },
  { codigo: "0174", nombre: "Banplus" },
  { codigo: "0191", nombre: "Banco Nacional de Crédito" },
];

interface BancoSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Componente reutilizable para seleccionar bancos venezolanos
 * Muestra el código y nombre del banco en el formato "0000 - Nombre"
 */
export function BancoSelector({
  value,
  onValueChange,
  placeholder = "Seleccione el banco",
  disabled = false,
  className,
}: BancoSelectorProps) {
  return (
    <div className="w-full">
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className={`w-full ${className ?? ""}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent side="bottom">
          {bancos.map((banco) => (
            <SelectItem key={banco.codigo} value={banco.codigo}>
              {banco.codigo} - {banco.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Función auxiliar para obtener el nombre del banco por su código
 */
export function getBancoNombre(codigo: string): string {
  const banco = bancos.find((b) => b.codigo === codigo);
  return banco ? banco.nombre : codigo;
}

/**
 * Función auxiliar para obtener la información completa del banco
 */
export function getBancoInfo(codigo: string) {
  return bancos.find((b) => b.codigo === codigo);
}
