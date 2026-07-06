import Navbar from "@/components/shared/navbar/navbar";
import Footer from "@/components/shared/footer/footer";
import { CartProvider } from "@/context/CartContext";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <CartProvider>{children}</CartProvider>
      </main>
      <Footer />
    </>
  );
}
