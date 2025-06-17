# Supabase Simplificado - Proyecto Educativo

## ¿Qué tienes?

**UN SOLO ARCHIVO**: `lib/server-actions.ts`

Este archivo tiene **todo lo que necesitas** para trabajar con Supabase y PostgreSQL.

## Variables de Entorno (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role
```

## Funciones en PostgreSQL

Primero crea estas funciones en tu base de datos:

```sql
-- Obtener lista de usuarios
CREATE OR REPLACE FUNCTION obtener_usuarios()
RETURNS TABLE (
  id UUID,
  email TEXT,
  nombre TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.email, p.nombre
  FROM auth.users u
  LEFT JOIN profiles p ON u.id = p.user_id;
END;
$$;

-- Crear un post
CREATE OR REPLACE FUNCTION crear_post(
  user_id UUID,
  titulo TEXT,
  contenido TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO posts (user_id, titulo, contenido)
  VALUES (user_id, titulo, contenido);

  RETURN json_build_object('success', true);
END;
$$;
```

## Cómo Usar (Solo 3 formas)

### 1. Mostrar Datos en una Página

```tsx
// app/usuarios/page.tsx
import { llamarFuncion } from "@/lib/server-actions";

export default async function PaginaUsuarios() {
  // Llamar función de PostgreSQL
  const usuarios = await llamarFuncion("obtener_usuarios");

  return (
    <div>
      <h1 id="titulo-usuarios">Lista de Usuarios</h1>

      <ul id="lista-usuarios">
        {usuarios.map((usuario: any) => (
          <li key={usuario.id} id={`usuario-${usuario.id}`}>
            {usuario.email} - {usuario.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. Crear un Formulario Simple

````tsx
// app/posts/nuevo/page.tsx
import { procesarFormulario } from "@/lib/server-actions";

// Action para el formulario
async function crearPost(formData: FormData) {
  "use server";

  await procesarFormulario(
    formData,
    "crear_post", // función de PostgreSQL
    ["titulo", "contenido"], // campos obligatorios
    "/posts" // redirigir aquí al terminar
  );
}

export default function NuevoPost() {
  return (
    <form action={crearPost} id="form-nuevo-post">
      <div id="campo-titulo">
        <label htmlFor="titulo">Título:</label>
        <input id="titulo" name="titulo" type="text" required />
      </div>

      <div id="campo-contenido">
        <label htmlFor="contenido">Contenido:</label>
        <textarea id="contenido" name="contenido" required />
      </div>

      <button type="submit" id="btn-crear-post">
        Crear Post
      </button>
    </form>
  );
}
## Funciones Disponibles

### Para cargar datos:

- `llamarFuncion(nombreFuncion, parametros)` - Para múltiples resultados
- `llamarFuncionSingle(nombreFuncion, parametros)` - Para un solo resultado

### Para formularios:

- `procesarFormulario(formData, nombreFuncion, camposRequeridos, redirigirA)`

## Ejemplo Completo: Página con Datos y Formulario

```tsx
// app/dashboard/page.tsx
import { llamarFuncion, obtenerUsuario, procesarFormulario } from "@/lib/server-actions";
import { redirect } from "next/navigation";

// Action para crear post
async function crearPost(formData: FormData) {
  "use server";
  await procesarFormulario(formData, "crear_post", ["titulo"], "/dashboard");
}

export default async function Dashboard() {
  // Verificar si hay usuario
  const usuario = await obtenerUsuario();
  if (!usuario) {
    redirect("/login");
  }

  // Cargar posts del usuario
  const posts = await llamarFuncion("obtener_posts_usuario", { user_id: usuario.id });

  return (
    <div id="dashboard">
      <h1 id="titulo-dashboard">Dashboard de {usuario.email}</h1>

      {/* Formulario para crear post */}
      <form action={crearPost} id="form-crear-post">
        <div id="campo-titulo-post">
          <label htmlFor="titulo">Título del Post:</label>
          <input id="titulo" name="titulo" type="text" required />
        </div>

        <div id="campo-contenido-post">
          <label htmlFor="contenido">Contenido:</label>
          <textarea id="contenido" name="contenido"></textarea>
        </div>

        <button type="submit" id="btn-crear">
          Crear Post
        </button>
      </form>

      {/* Lista de posts */}
      <div id="lista-posts">
        <h2 id="titulo-mis-posts">Mis Posts</h2>
        {posts.map((post: any) => (
          <div key={post.id} id={`post-${post.id}`}>
            <h3 id={`titulo-${post.id}`}>{post.titulo}</h3>
            <p id={`contenido-${post.id}`}>{post.contenido}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
````

## Ventajas de Esta Configuración

✅ **Un solo archivo** - Todo está en `server-actions.ts`  
✅ **Sin useEffect** - No hay hooks complicados  
✅ **Solo funciones de PostgreSQL** - Máxima seguridad  
✅ **Formularios simples** - Directo con Server Actions  
✅ **IDs en todos los elementos** - Fácil para CSS y desarrollo  
✅ **Educativo** - Perfecto para aprender

## ¿Qué NO tienes?

❌ No hooks complicados  
❌ No useEffect  
❌ No gestión de estado compleja  
❌ No múltiples archivos confusos

**Solo un archivo, funciones simples, formularios directos. ¡Perfecto para aprender!**
