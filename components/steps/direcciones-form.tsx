import { AddressSelector } from "@/components/address-selector";
import { useFormContext } from "react-hook-form";

interface DireccionesFormProps {
  tipoPersona: "natural" | "juridica";
}

export function DireccionesForm({ tipoPersona }: DireccionesFormProps) {
  const { watch } = useFormContext();

  // Obtener los valores actuales del formulario
  const direccionHabitacion = watch("direccionHabitacion");
  const direccionFiscal = watch("direccionFiscal");
  const direccionFisica = watch("direccionFisica");

  if (tipoPersona === "natural") {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-6">Dirección de Habitación</h2>
          <div className="max-w-2xl">
            <AddressSelector
              name="direccionHabitacion"
              label="Dirección de Habitación"
              initialValues={direccionHabitacion}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Direcciones</h2>
        <div className="space-y-8 max-w-2xl">
          <AddressSelector
            name="direccionFiscal"
            label="Dirección Fiscal"
            initialValues={direccionFiscal}
          />
          <AddressSelector
            name="direccionFisica"
            label="Dirección Física"
            initialValues={direccionFisica}
          />
        </div>
      </div>
    </div>
  );
}
