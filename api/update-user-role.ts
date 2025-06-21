'use server';
import { llamarFuncion } from "@/lib/server-actions";


async function updateUserRole(userId: number, newRole: string): Promise<void> {
    await llamarFuncion("fn_update_user_role", {
        p_usuario_id: userId,
        p_rol_id: newRole,
    });
}

export { updateUserRole };
