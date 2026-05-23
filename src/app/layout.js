import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll/smooth-scroll";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* <SmoothScroll /> */}
        {children}
        <Toaster
          position="button-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(27,43,75,0.85)",
              color: "#fff",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}
