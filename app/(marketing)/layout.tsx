import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={``}>
      <header className="sticky top-0 bg-gray-50 shadow inset-x-0 z-[50]">
        <Navbar />
      </header>

      {children}
      <Footer />
    </div>
  );
}
