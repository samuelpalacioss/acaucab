✅ Correct approach: move the server action to a separate file

1. Create the server action in a separate file

// lib/actions/toggleFavorito.ts
'use server'

import { crearClienteServerAction } from '@/lib/supabase'

export async function toggleFavorito(id: number) {
const supabase = crearClienteServerAction()
await supabase.rpc('toggle_favorito', { id })
}

2. Call it from your client form

'use client'

import { toggleFavorito } from '@/lib/actions/toggleFavorito'

export function ToggleFavorito({ id }: { id: number }) {
return (
<form action={() => toggleFavorito(id)}>
<button type="submit">⭐</button>
</form>
)
}

🧠 Summary
❌ Invalid ✅ Valid
server action declared in 'use client' server action in 'use server' file
Inline action={async () => { 'use server' }} inside 'use client' but tries to call another fn action={toggleFavorito} where toggleFavorito is in a separate server file

Let me know if you want me to organize these patterns into a reusable setup for your ACAUCAB dashboard (like lib/actions/clientes.ts).
