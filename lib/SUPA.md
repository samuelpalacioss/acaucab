Esa es una excelente pregunta que aborda una distinción importante en la forma de interactuar con Supabase en un proyecto Next.js, especialmente con el App Router.

La respuesta corta es: No, si estás utilizando las funciones createClientComponentClient, createServerComponentClient, createRouteHandlerClient y createServerActionClient de @supabase/auth-helpers-nextjs, generalmente no necesitas inicializar el cliente de Supabase directamente con createClient de @supabase/supabase-js para las operaciones de usuario.

Permíteme explicar la diferencia y por qué el enfoque con auth-helpers-nextjs es el más sencillo y recomendado para la mayoría de los casos en Next.js:

@supabase/supabase-js (la librería base):

La función createClient que mencionas (import { createClient } from '@supabase/supabase-js') es el cliente JavaScript principal de Supabase. Es la forma fundamental de interactuar con tu base de datos, autenticación, almacenamiento, etc., desde cualquier entorno JavaScript (navegador, Node.js, etc.).   
Cuando lo usas directamente, eres responsable de manejar la autenticación, las sesiones y, crucialmente, la gestión de cookies en entornos de servidor como Next.js.
@supabase/auth-helpers-nextjs (las "ayudas" para Next.js):

Esta librería fue creada específicamente para simplificar la integración de Supabase Auth con Next.js, especialmente con el App Router.   
Las funciones como createClientComponentClient, createServerComponentClient, createRouteHandlerClient y createServerActionClient son envoltorios (wrappers) alrededor del cliente base de Supabase.
Su principal ventaja es que manejan automáticamente la gestión de la sesión del usuario y las cookies en los diferentes entornos de Next.js (componentes de cliente, componentes de servidor, Route Handlers, Server Actions y middleware). Esto es vital porque Next.js tiene diferentes formas de acceder y manipular cookies en el servidor y el cliente, y auth-helpers-nextjs abstrae esa complejidad por ti.   
Al usar estas funciones, no necesitas preocuparte por pasar manualmente las cookies o refrescar la sesión; la librería lo hace por ti, lo que hace que la implementación sea mucho más fácil y menos propensa a errores.   
¿Cuándo usarías createClient directamente (como en tu ejemplo)?

Tu ejemplo muestra dos clientes: supabase y supabaseAdmin.

supabase (con NEXT_PUBLIC_SUPABASE_ANON_KEY):

Si bien podrías usar createClient directamente en un componente de cliente, createClientComponentClient de auth-helpers-nextjs es preferible porque maneja mejor la gestión de tokens y sesiones para la autenticación del usuario.   
Para la mayoría de las operaciones de usuario en Next.js, las funciones de auth-helpers-nextjs son el camino más sencillo.
supabaseAdmin (con SUPABASE_SERVICE_ROLE_KEY):

¡Este es un caso de uso muy específico y crítico para la seguridad! La SUPABASE_SERVICE_ROLE_KEY (también conocida como SERVICE_KEY) tiene permisos de administrador y bypassea la Seguridad a Nivel de Fila (RLS) de Supabase.   
Nunca debes exponer esta clave en el lado del cliente. Si la incluyes en un archivo que se ejecuta en el navegador, cualquier usuario podría verla y tener acceso completo a tu base de datos.
Por lo tanto, el cliente supabaseAdmin solo debe ser inicializado y utilizado en entornos estrictamente del lado del servidor donde la clave está segura (por ejemplo, en Route Handlers o Server Actions, pero nunca en un componente de cliente). En estos casos, sí, usarías createClient directamente con la SUPABASE_SERVICE_ROLE_KEY para realizar operaciones administrativas que requieran eludir RLS.   
En resumen, para la facilidad y seguridad en Next.js:

Para todas las operaciones que involucren a un usuario autenticado (lectura/escritura de datos que respetan RLS, gestión de sesiones, etc.), utiliza las funciones createClientComponentClient, createServerComponentClient, createRouteHandlerClient y createServerActionClient de @supabase/auth-helpers-nextjs. Estas son las más sencillas de implementar y las que mejor se integran con el modelo de Next.js.
Solo inicializa un cliente con createClient y la SUPABASE_SERVICE_ROLE_KEY si necesitas realizar operaciones administrativas que bypassen RLS, y asegúrate de que este código solo se ejecute en el servidor (Route Handlers o Server Actions) y nunca en el cliente.
El enfoque que te presenté en la investigación anterior (src/lib/supabase/browser-client.ts y src/lib/supabase/server-client.ts utilizando las funciones create...Client de auth-helpers-nextjs) es el camino más directo y seguro para la mayoría de las necesidades de tu aplicación Next.js.


Fuentes y contenido relacionado
