import { llamarFuncion } from "@/lib/server-actions"
import { ClienteType, DocType } from "@/lib/schemas"

/**
 * Obtiene un cliente por su tipo de documento y número de documento.
 * 
 * @param p_doc_type - El tipo de documento (V, E, J o P).
 * @param p_doc_number - El número de documento.
 * @returns ClienteType | null - Los datos del cliente o null si no se encuentra
 */
export async function getClienteByDoc(p_doc_type: DocType, p_doc_number: number): Promise<ClienteType | null> {
    try {
      const response = await llamarFuncion('fn_get_cliente_by_doc', { p_doc_type, p_doc_number })
      
      // Como retorna un array de un solo elemento, se accede al primer elemento
      if (response && response.length > 0) {
        console.log(response[0])
        return response[0] as ClienteType
      }
      
      return null

    } catch (error) {
      console.error(`Error al obtener el cliente:`, error)
      throw new Error('Ocurrió un error al intentar obtener el cliente.')
    }
}