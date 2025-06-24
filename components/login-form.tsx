"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
// import { loginSchema, loginType } from "@/lib/validations/auth";
import Link from "next/link";
import { Icons } from "@/components/icons";
// import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
// import { login } from "@/actions/login";
// import FormsuccessMsg from "@/components/form-success-msg";
import { cn } from "@/lib/utils";
import { loginSchema, loginType } from "@/lib/schemas";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

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

  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const [successMsg, setSuccessMsg] = useState<string | undefined>("");

  const onSubmit = async (data: loginType) => {
    setErrorMsg("");
    setSuccessMsg("");

    // startTransition(() => {
    //   login(data).then((data) => {
    //     setErrorMsg(data?.error);
    //     setSuccessMsg(data?.success);
    //   });
    // });
  };

  return (
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
                    <Input type="password" placeholder="********" disabled={isPending} {...field} />
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

            {errorMsg && <p className="text-destructive text-xs mt-0">{errorMsg}</p>}
            {/* <FormsuccessMsg message={successMsg} /> */}
            <div className="flex flex-col gap-6">
              <Button disabled={isPending} type="submit" className="w-full">
                Acceder
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
