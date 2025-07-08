import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: "400" as const,
  style: "normal" as const,
});

export const metadata: Metadata = {
  title: "Car Listings Management",
  description:
    "Welcome to Car Listings Management App",
  keywords:
    "sell car, buy old car, buy new car,",
  robots: "index, follow",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
          <ReactQueryProvider>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff",
            },
          }}
        />
        <Header />
        {children}
        <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
