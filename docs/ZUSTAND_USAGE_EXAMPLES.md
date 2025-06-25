# 🚀 Guía de Uso del Store de Usuario con Zustand

Esta guía muestra cómo usar el store de usuario implementado con Zustand para manejar autenticación y permisos en toda la aplicación.

## 📋 Tabla de Contenidos

1. [Instalación y Setup](#instalación-y-setup)
2. [Hooks Disponibles](#hooks-disponibles)
3. [Verificación de Permisos](#verificación-de-permisos)
4. [Protección de Rutas](#protección-de-rutas)
5. [Componentes de Autenticación](#componentes-de-autenticación)
6. [Ejemplos Prácticos](#ejemplos-prácticos)

## 🔧 Instalación y Setup

El store ya está configurado y funcionando. Solo necesitas importar los hooks:

```tsx
import { useUser, usePermissions, useUserStore } from "@/store/user-store";
```

## 🎣 Hooks Disponibles

### `useUser()` - Datos del Usuario
```tsx
const { 
  usuario,           // Objeto completo del usuario
  isAuthenticated,   // boolean - si está autenticado
  isLoading,         // boolean - estado de carga
  nombreUsuario,     // string - nombre del usuario
  emailUsuario,      // string - email del usuario  
  rolUsuario,        // string - rol del usuario
  permisos          // string[] - array de permisos
} = useUser();
```

### `usePermissions()` - Verificación de Permisos
```tsx
const {
  // Verificaciones generales
  tienePermiso,              // (permiso: string) => boolean
  tieneAlgunPermiso,         // (permisos: string[]) => boolean
  tieneTodosPermisos,        // (permisos: string[]) => boolean
  tieneAccesoDashboard,      // () => boolean
  tieneAccesoSeccion,        // (seccion) => boolean
  
  // Helpers específicos
  puedeCrearUsuarios,        // () => boolean
  puedeEditarUsuarios,       // () => boolean
  puedeEliminarUsuarios,     // () => boolean
  puedeGestionarRoles,       // () => boolean
  puedeIniciarVentas,        // () => boolean
  puedeVerHistorialVentas,   // () => boolean
  puedeProcesarPagos,        // () => boolean
  puedeCerrarCaja,           // () => boolean
  puedeGestionarProveedores  // () => boolean
} = usePermissions();
```

### `useUserStore()` - Store Completo
```tsx
const { 
  setUsuario,        // (usuario) => void - establecer usuario
  clearUsuario,      // () => void - limpiar usuario (logout)
  setLoading         // (loading: boolean) => void
} = useUserStore();
```

## 🔐 Verificación de Permisos

### Verificar un Permiso Específico
```tsx
function CrearUsuarioButton() {
  const { puedeCrearUsuarios } = usePermissions();
  
  if (!puedeCrearUsuarios()) {
    return null; // No mostrar el botón
  }
  
  return <Button>Crear Usuario</Button>;
}
```

### Verificar Múltiples Permisos
```tsx
function GestionUsuarios() {
  const { tieneAlgunPermiso } = usePermissions();
  
  const puedeGestionarUsuarios = tieneAlgunPermiso([
    'crear_usuario', 
    'editar_usuario', 
    'eliminar_usuario'
  ]);
  
  if (!puedeGestionarUsuarios) {
    return <div>No tienes permisos para gestionar usuarios</div>;
  }
  
  return <UsuariosPanel />;
}
```

### Verificar Acceso a Secciones
```tsx
function NavigationMenu() {
  const { tieneAccesoSeccion } = usePermissions();
  
  return (
    <nav>
      {tieneAccesoSeccion('usuarios') && (
        <Link href="/dashboard/usuarios">Usuarios</Link>
      )}
      {tieneAccesoSeccion('ventas') && (
        <Link href="/dashboard/ventas">Ventas</Link>
      )}
      {tieneAccesoSeccion('inventario') && (
        <Link href="/dashboard/inventario">Inventario</Link>
      )}
    </nav>
  );
}
```

## 🛡️ Protección de Rutas

### Proteger una Página Completa
```tsx
// app/dashboard/usuarios/page.tsx
import ProtectedRoute from "@/components/auth/protected-route";

export default function UsuariosPage() {
  return (
    <ProtectedRoute requiredSection="usuarios">
      <div>
        <h1>Gestión de Usuarios</h1>
        {/* Contenido de la página */}
      </div>
    </ProtectedRoute>
  );
}
```

### Proteger con Permisos Específicos
```tsx
// app/dashboard/usuarios/nuevo/page.tsx
import ProtectedRoute from "@/components/auth/protected-route";

export default function NuevoUsuarioPage() {
  return (
    <ProtectedRoute requiredPermissions={['crear_usuario']}>
      <div>
        <h1>Crear Nuevo Usuario</h1>
        <FormularioUsuario />
      </div>
    </ProtectedRoute>
  );
}
```

### Proteger Layout del Dashboard
```tsx
// app/dashboard/layout.tsx
import ProtectedRoute from "@/components/auth/protected-route";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        <Sidebar />
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
```

## 🔑 Componentes de Autenticación

### Botón de Logout
```tsx
import LogoutButton from "@/components/auth/logout-button";

function Header() {
  return (
    <header>
      <h1>Dashboard</h1>
      <LogoutButton />
    </header>
  );
}

// Variantes del botón
<LogoutButton iconOnly={true} />
<LogoutButton variant="destructive" />
<LogoutButton showConfirmation={false} />
```

### Hook de Logout
```tsx
import { useLogout } from "@/components/auth/logout-button";

function MiComponente() {
  const { logout } = useLogout();
  
  const handleLogout = () => {
    // Lógica personalizada antes del logout
    logout();
  };
  
  return <Button onClick={handleLogout}>Salir</Button>;
}
```

## 📚 Ejemplos Prácticos

### 1. Barra de Navegación Condicionada
```tsx
function Sidebar() {
  const { tieneAccesoSeccion } = usePermissions();
  const { nombreUsuario, rolUsuario } = useUser();
  
  return (
    <aside className="sidebar">
      <div className="user-info">
        <h3>{nombreUsuario}</h3>
        <Badge>{rolUsuario}</Badge>
      </div>
      
      <nav>
        {tieneAccesoSeccion('usuarios') && (
          <NavLink href="/dashboard/usuarios">👥 Usuarios</NavLink>
        )}
        {tieneAccesoSeccion('ventas') && (
          <NavLink href="/dashboard/ventas">💰 Ventas</NavLink>
        )}
        {tieneAccesoSeccion('inventario') && (
          <NavLink href="/dashboard/inventario">📦 Inventario</NavLink>
        )}
      </nav>
      
      <LogoutButton className="mt-auto" />
    </aside>
  );
}
```

### 2. Tabla con Acciones Condicionadas
```tsx
function UsuariosTable({ usuarios }) {
  const { puedeEditarUsuarios, puedeEliminarUsuarios } = usePermissions();
  
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(usuario => (
          <tr key={usuario.id}>
            <td>{usuario.nombre}</td>
            <td>{usuario.email}</td>
            <td>{usuario.rol}</td>
            <td>
              <div className="flex gap-2">
                {puedeEditarUsuarios() && (
                  <Button size="sm">Editar</Button>
                )}
                {puedeEliminarUsuarios() && (
                  <Button size="sm" variant="destructive">
                    Eliminar
                  </Button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### 3. Dashboard con Métricas Condicionadas
```tsx
function Dashboard() {
  const { tieneAccesoSeccion, puedeVerHistorialVentas } = usePermissions();
  const { nombreUsuario } = useUser();
  
  return (
    <div className="dashboard">
      <h1>Bienvenido, {nombreUsuario}</h1>
      
      <div className="metrics-grid">
        {puedeVerHistorialVentas() && (
          <MetricCard 
            title="Ventas del Día" 
            value="$1,234.56" 
            icon="💰"
          />
        )}
        
        {tieneAccesoSeccion('inventario') && (
          <MetricCard 
            title="Stock Bajo" 
            value="12 productos" 
            icon="⚠️"
          />
        )}
        
        {tieneAccesoSeccion('usuarios') && (
          <MetricCard 
            title="Usuarios Activos" 
            value="45" 
            icon="👥"
          />
        )}
      </div>
    </div>
  );
}
```

### 4. Formulario con Validación de Permisos
```tsx
function FormularioVenta() {
  const { puedeProcesarPagos, puedeIniciarVentas } = usePermissions();
  
  if (!puedeIniciarVentas()) {
    return (
      <div className="text-center p-8">
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para iniciar ventas.</p>
      </div>
    );
  }
  
  return (
    <form>
      {/* Campos del formulario */}
      
      <div className="form-actions">
        <Button type="button" variant="outline">
          Guardar Borrador
        </Button>
        
        {puedeProcesarPagos() && (
          <Button type="submit">
            Procesar Pago
          </Button>
        )}
      </div>
    </form>
  );
}
```

## 🔄 Persistencia y Sincronización

El store se persiste automáticamente en `localStorage` con la clave `acaucab-user-storage`.

**Datos que se persisten:**
- Información del usuario
- Estado de autenticación
- Permisos

**Datos que NO se persisten:**
- Estados de carga temporales
- Mensajes de error

## 🎯 Mejores Prácticas

1. **Usar hooks específicos**: Prefiere `useUser()` y `usePermissions()` sobre `useUserStore()`
2. **Verificar permisos en el componente**: No dependas solo de la protección de rutas
3. **Manejar estados de carga**: Siempre verifica `isLoading` antes de mostrar contenido
4. **Ser específico con permisos**: Usa los helpers específicos cuando sea posible
5. **Logout limpio**: Usa `LogoutButton` o `useLogout()` para cerrar sesión correctamente

## 🐛 Troubleshooting

### El usuario no se persiste después de refrescar
- Verifica que el localStorage esté habilitado
- Revisa la consola por errores de hidratación

### Los permisos no se actualizan
- Asegúrate de llamar `setUsuario()` después del login exitoso
- Verifica que los permisos vengan correctamente de la API

### Redirecciones infinitas
- Revisa que las rutas de redirección no estén protegidas con los mismos permisos
- Verifica que `/login` y `/unauthorized` no tengan protección

---

## ✅ Checklist de Implementación

- [ ] Store configurado y funcionando
- [ ] Login integrado con store
- [ ] Logout implementado
- [ ] Protección de rutas configurada
- [ ] Verificación de permisos en componentes
- [ ] Navegación condicionada
- [ ] Persistencia funcionando
- [ ] Manejo de errores implementado 