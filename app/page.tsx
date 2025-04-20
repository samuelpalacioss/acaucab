import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a Nuestro Sistema</h1>
          <p className="text-lg text-muted-foreground">
            Seleccione una de las opciones disponibles para comenzar.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild className="px-8 py-6 text-lg">
            <Link href="/registro">Ir a Registro</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
