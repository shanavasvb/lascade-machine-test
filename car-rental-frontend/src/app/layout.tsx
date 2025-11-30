import type { Metadata } from "next";
import "./globals.css";
import "../app/css/calender-custom.css";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Airport Rental Cars",
  description: "Quick car hire, No delays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-5">{children}</main>
      </body>
    </html>
  );
}