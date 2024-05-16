import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Layout } from "@/components";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shoppe",
  description: "An ecommerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateContext>
          <Layout />
          <Toaster />
          {children}
          <Footer />
        </StateContext>
      </body>
    </html>
  );
}
