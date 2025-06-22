'use server';

import { RolDetalle } from "@/models/roles";
import { llamarFuncion } from "@/lib/server-actions";

export async function getRoleById(roleId: number): Promise<RolDetalle[]> {
  const rolePermissions = await llamarFuncion(
    'fn_get_role_by_id',
    { p_id: roleId }
  );

  return (rolePermissions as RolDetalle[]) || [];
}
