import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Link, ShieldAlert } from "lucide-react";
import { usePermissions } from "@/store/user-store";

export default function UnauthorizedPage() {
  const { tieneAccesoDashboard } = usePermissions();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <ShieldAlert className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Acceso Denegado</CardTitle>
          <CardDescription className="text-center">
            No tienes los permisos necesarios para acceder a esta página.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-600">
            <p>Si crees que esto es un error, contacta al administrador del sistema.</p>
          </div>

          <div className="flex flex-col gap-3">
            {tieneAccesoDashboard() && (
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  Volver al Dashboard
                </Link>
              </Button>
            )}

            <Button asChild variant="outline" className="w-full">
              <Link href="/login">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
