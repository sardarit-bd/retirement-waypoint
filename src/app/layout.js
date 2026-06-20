import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll/smooth-scroll";
import { Toaster } from "react-hot-toast";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Retirement Waypoint",
  description: "Retirement transition and readiness platform",
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        {/* <SmoothScroll /> */}
        {children}

        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(27,43,75,0.85)",
              color: "#fff",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "16px",
            },

            success: {
              style: {
                background: "rgba(27,43,75,0.9)",
                color: "#22C55E",
                border: "1px solid rgba(34,197,94,0.25)",
              },
              iconTheme: {
                primary: "#22C55E",
                secondary: "#fff",
              },
            },

            error: {
              style: {
                background: "rgba(27,43,75,0.9)",
                color: "#EF4444",
                border: "1px solid rgba(239,68,68,0.25)",
              },
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}