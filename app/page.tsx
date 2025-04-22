import Hero from "@/components/hero";
import Interfaces from "@/components/interfaces";
import BannerMarcas from "@/components/banner-marcas";
import { NuevosProductos } from "@/components/nuevos-productos";
import DiscountBanner from "@/components/banner-diario";
import BannerEventos from "@/components/banner-eventos";
import Footer from "@/components/footer";
export default function HomePage() {
  return (
    <>
      <Hero />
      <BannerMarcas />
      <NuevosProductos />
      <DiscountBanner />
      <BannerEventos />
      <Footer />
      {/* <Interfaces /> */}
    </>
  );
}
