import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { UserRound, Building2 } from "lucide-react";

export default function RegistroPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Registro de Usuario</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="relative">
          <CardHeader>
            <UserRound className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Persona Natural</CardTitle>
            <CardDescription>Registro para personas naturales o individuos.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Si eres una persona natural y deseas registrarte para acceder a nuestros servicios,
              selecciona esta opción.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/registro/natural">Registrarme como Persona Natural</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative">
          <CardHeader>
            <Building2 className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Persona Jurídica</CardTitle>
            <CardDescription>Registro para empresas y organizaciones.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Si representas a una empresa, organización o entidad jurídica y deseas registrarla
              para acceder a nuestros servicios, selecciona esta opción.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/registro/juridico">Registrarme como Persona Jurídica</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
