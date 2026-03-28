import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clinic C Concierge Widget",
  description: "Embeddable premium chatbot widget for Clinic C."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
