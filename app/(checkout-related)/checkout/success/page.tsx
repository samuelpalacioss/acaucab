import { getVentaById } from "@/api/get-venta-by-id";
import CheckoutSuccess from "@/components/checkout/checkout-success";
import { notFound } from "next/navigation";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const ventaIdStr = searchParams?.ventaId;
  if (!ventaIdStr || Array.isArray(ventaIdStr)) {
    notFound();
  }

  const ventaId = parseInt(ventaIdStr, 10);
  if (isNaN(ventaId)) {
    notFound();
  }

  const venta = await getVentaById(ventaId);

  if (!venta) {
    notFound();
  }

  return <CheckoutSuccess venta={venta} />;
}
