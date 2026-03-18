import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
