import Navbar from "@/components/shared/navbar/navbar";
import Footer from "@/components/shared/footer/footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}