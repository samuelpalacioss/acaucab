"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginSchema, loginType } from "@/lib/schemas";
import { login } from "@/lib/server-actions";
import ErrorModal from "@/components/error-modal";
import { useUserStore } from "@/store/user-store";

/**
 * Componente de formulario de login
 * Conecta con la función fn_login de PostgreSQL para autenticación
 */
export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  /** Store de usuario con Zustand */
  const { setUsuario, setLoading } = useUserStore();

  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  /** Estados para manejo de errores y mensajes */
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const [successMsg, setSuccessMsg] = useState<string | undefined>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  /**
   * Procesar envío del formulario de login
   * Llama a la función fn_login de PostgreSQL via server action
   */
  const onSubmit = async (data: loginType) => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    startTransition(async () => {
      try {
        /** Llamar función de login del servidor */
        const resultado = await login(data.email, data.password);
        
        if (resultado.success && resultado.usuario) {
          /** Guardar usuario en el store de Zustand */
          setUsuario({
            id: resultado.usuario.id,
            email: resultado.usuario.email,
            rol: resultado.usuario.rol,
            nombre: resultado.usuario.nombre,
            permisos: resultado.usuario.permisos
          });
          
          setSuccessMsg("Inicio de sesión exitoso. Redirigiendo...");
          
          /** Manejar redirección desde el cliente */
          if (resultado.shouldRedirect && resultado.redirectTo) {
            setTimeout(() => {
              router.push(resultado.redirectTo!);
            }, 1000); // Pequeña pausa para mostrar el mensaje de éxito
          }
        } else {
          /** Mostrar error en el modal */
          setErrorMsg(resultado.error || "Error desconocido en el login");
          setShowErrorModal(true);
        }
      } catch (error: any) {
        console.error("Error en el formulario de login:", error);
        setErrorMsg("Error de conexión. Intente nuevamente.");
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    });
  };

  /**
   * Cerrar modal de error
   */
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMsg("");
  };

  return (
    <>
      <Card className="w-[24rem]">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          {/* <CardDescription>
            No tienes una cuenta?{" "}
            <Link href={"/register"} className="text-indigo-600 font-semibold">
              Registrate
            </Link>
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="anak@gmail.com"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[0.8rem]" /> {/* Form error */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage className="text-[0.8rem]" /> {/* Form error */}
                    {/* <Link
                      className={cn(buttonVariants({ variant: "link", size: "sm" }), "px-0 font-sm")}
                      href="/reset-password"
                    >
                      Olvidaste tu contraseña?
                    </Link> */}
                  </FormItem>
                )}
              />

              {/** Mensaje de éxito */}
              {successMsg && <p className="text-green-600 text-xs mt-0">{successMsg}</p>}
              
              <div className="flex flex-col gap-6">
                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? "Iniciando sesión..." : "Acceder"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/** Modal de error para mostrar errores de la base de datos */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        title="Error de Autenticación"
        errorMessage={errorMsg || "Error desconocido"}
      />
    </>
  );
}
