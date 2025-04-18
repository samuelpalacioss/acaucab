import { RegistroMultistep } from "@/components/registro-multistep"

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Registro de Cliente</h1>
          <p className="mt-2 text-muted-foreground">Complete el formulario para registrarse como cliente</p>
        </div>
        <RegistroMultistep />
      </div>
    </div>
  )
}
