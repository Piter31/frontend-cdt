import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corazón de Trufa · Repostería Artesanal",
  description:
    "Repostería artesanal de autor. Cookies, Lemon Pie, Alfajores y más. Elaborados con ingredientes premium en Buenos Aires.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
